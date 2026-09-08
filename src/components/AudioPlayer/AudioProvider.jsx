import { useEffect, useRef, useState } from "react";
import { AudioContext } from "./AudioContext";
import { allTracks } from "../../data/music";

const TRACKS = allTracks;

// YouTube IFrame API is loaded lazily and only once.
let ytApiReady = false;
const ytApiQueue = [];

function loadYouTubeAPI() {
  if (typeof window === "undefined") return;
  if (ytApiReady) return;
  if (document.querySelector('script[data-yt-api="1"]')) return;
  const tag = document.createElement("script");
  tag.setAttribute("data-yt-api", "1");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("audioVolume");
    return saved === null ? 0.5 : Math.max(0, Math.min(1, Number(saved) || 0.5));
  });
  const [shuffle, setShuffle] = useState(() => {
    return localStorage.getItem("audioShuffle") === "true";
  });
  const [currentTrack, setCurrentTrack] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState([]);
  const [playerReady, setPlayerReady] = useState(false);

  // Hold the YouTube player instance in a ref so it survives re-renders
  // and StrictMode double-mounts.
  const ytRef = useRef(null);
  const readyRef = useRef(false);
  const advanceRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("audioVolume", String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("audioShuffle", String(shuffle));
  }, [shuffle]);

  const buildShuffledOrder = () => {
    const order = TRACKS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  };

  const resolveNext = (current) => {
    if (shuffle) {
      const order = shuffledOrder.length ? shuffledOrder : buildShuffledOrder();
      const pos = order.indexOf(current);
      return order[(pos + 1) % order.length];
    }
    return (current + 1) % TRACKS.length;
  };

  const resolvePrev = (current) => {
    if (shuffle) {
      const order = shuffledOrder.length ? shuffledOrder : buildShuffledOrder();
      const pos = order.indexOf(current);
      return order[(pos - 1 + order.length) % order.length];
    }
    return (current - 1 + TRACKS.length) % TRACKS.length;
  };

  const safeCall = (method, ...args) => {
    const player = ytRef.current;
    if (!player || typeof player[method] !== "function") return;
    try {
      player[method](...args);
    } catch {
      // Ignore transient YouTube API errors (e.g. during teardown).
    }
  };

  const advance = () => {
    if (!ytRef.current || !readyRef.current) return;
    const nextIdx = resolveNext(currentTrack);
    setCurrentTrack(nextIdx);
    safeCall("loadVideoById", TRACKS[nextIdx].videoId);
  };

  useEffect(() => {
    advanceRef.current = advance;
  });

  // Build the YouTube player once on mount.
  useEffect(() => {
    if (ytRef.current) return; // already created (StrictMode re-run guard)
    loadYouTubeAPI();

    const onReady = () => {
      readyRef.current = true;
      setPlayerReady(true);
      safeCall("setVolume", Math.round(volume * 100));
      safeCall("loadVideoById", TRACKS[currentTrack].videoId);
    };

    const onStateChange = (e) => {
      if (
        e.data === window.YT &&
        window.YT.PlayerState &&
        e.data === window.YT.PlayerState.ENDED
      ) {
        if (advanceRef.current) advanceRef.current();
      }
    };

    const tryCreate = () => {
      if (ytRef.current) return;
      if (!window.YT || !window.YT.Player) {
        ytApiQueue.push(tryCreate);
        return;
      }
      ytRef.current = new window.YT.Player("yt-player", {
        videoId: TRACKS[currentTrack].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
        },
        events: {
          onReady,
          onStateChange,
        },
      });
    };

    if (ytApiReady) {
      tryCreate();
    } else {
      ytApiQueue.push(tryCreate);
      window.onYouTubeIframeAPIReady = () => {
        ytApiReady = true;
        while (ytApiQueue.length) ytApiQueue.shift()();
      };
    }

    return () => {
      // On unmount, tear down the player cleanly.
      if (ytRef.current) {
        try {
          ytRef.current.stopVideo();
        } catch {}
        ytRef.current = null;
      }
      readyRef.current = false;
      setPlayerReady(false);
    };
    // intentionally mount-only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply volume whenever it changes.
  useEffect(() => {
    if (readyRef.current) {
      safeCall("setVolume", Math.round(volume * 100));
    }
  }, [volume]);

  // Load the current track into the player when it changes.
  useEffect(() => {
    if (readyRef.current) {
      safeCall("loadVideoById", TRACKS[currentTrack].videoId);
    }
  }, [currentTrack]);

  // Play/pause when toggled.
  useEffect(() => {
    if (!readyRef.current || !hasStarted) return;
    if (!isPlaying || volume <= 0) {
      safeCall("pauseVideo");
    } else {
      safeCall("playVideo");
    }
  }, [isPlaying, hasStarted, volume]);

  // Pause when the tab/window is hidden so playback doesn't continue
  // in the background.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
        safeCall("pauseVideo");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const togglePlay = () => {
    if (volume <= 0) return; // muted — don't play
    setHasStarted(true);
    setIsPlaying((prev) => !prev);
  };

  const start = () => {
    if (volume <= 0) return; // muted — don't start
    setHasStarted(true);
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    safeCall("pauseVideo");
  };

  const next = () => advance();

  const prev = () => {
    if (!ytRef.current || !readyRef.current) return;
    const prevIdx = resolvePrev(currentTrack);
    setCurrentTrack(prevIdx);
    safeCall("loadVideoById", TRACKS[prevIdx].videoId);
  };

  const toggleShuffle = () => {
    setShuffle((prev) => {
      const next = !prev;
      if (next) {
        setShuffledOrder(buildShuffledOrder());
      } else {
        setShuffledOrder([]);
      }
      return next;
    });
  };

  const setVolumeSafe = (v) => {
    setVolume(Math.max(0, Math.min(1, v)));
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        hasStarted,
        volume,
        shuffle,
        currentTrack,
        currentTrackMeta: TRACKS[currentTrack],
        trackCount: TRACKS.length,
        playerReady,
        togglePlay,
        start,
        stop,
        next,
        prev,
        toggleShuffle,
        setVolume: setVolumeSafe,
      }}
    >
      {children}
      <div
        id="yt-player"
        style={{ position: "fixed", left: "-9999px", width: "0", height: "0" }}
        aria-hidden="true"
      />
    </AudioContext.Provider>
  );
}