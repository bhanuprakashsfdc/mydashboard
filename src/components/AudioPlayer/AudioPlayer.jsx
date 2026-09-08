import { useAudio } from "./useAudio";
import Icon from "../Icon/Icon";
import "./AudioPlayer.css";

export default function AudioPlayer() {
  const {
    isPlaying,
    hasStarted,
    volume,
    shuffle,
    currentTrackMeta,
    trackCount,
    currentTrack,
    playerReady,
    togglePlay,
    start,
    stop,
    next,
    prev,
    toggleShuffle,
    setVolume,
  } = useAudio();

  const pct = Math.round(volume * 100);

  const handleVolume = (dir) => {
    const step = 0.1;
    setVolume(volume + (dir === "up" ? step : -step));
  };

  return (
    <div className="audio-player" role="region" aria-label="Music player">
      <div className="audio-player-track">
        <div className="audio-player-info">
          <span className="audio-player-emoji" aria-hidden="true">
            {isPlaying ? "🎵" : "🔇"}
          </span>
          <div className="audio-player-meta">
            <span className="audio-player-title">{currentTrackMeta.title}</span>
            <span className="audio-player-sub">
              Track {currentTrack + 1} of {trackCount}
            </span>
          </div>
        </div>

        <div className="audio-player-controls">
          <button
            type="button"
            className="audio-btn audio-btn-prev"
            onClick={prev}
            aria-label="Previous track"
            title="Previous track"
            disabled={!playerReady}
          >
            <Icon name="SkipBack" size={16} />
          </button>

          <button
            type="button"
            className="audio-btn audio-btn-play"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause" : "Play"}
            disabled={!playerReady}
          >
            {isPlaying ? (
              <Icon name="Pause" size={18} />
            ) : (
              <Icon name="Play" size={18} />
            )}
          </button>

          <button
            type="button"
            className="audio-btn audio-btn-next"
            onClick={next}
            aria-label="Next track"
            title="Next track"
            disabled={!playerReady}
          >
            <Icon name="SkipForward" size={16} />
          </button>

          <button
            type="button"
            className={`audio-btn audio-btn-shuffle ${shuffle ? "audio-btn-active" : ""}`}
            onClick={toggleShuffle}
            aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
            title="Toggle shuffle"
          >
            <Icon name="Shuffle" size={16} />
          </button>
        </div>

        <div className="audio-player-volume">
          <button
            type="button"
            className="audio-btn audio-btn-vol"
            onClick={() => handleVolume("down")}
            aria-label="Volume down"
            title="Volume down"
          >
            <Icon name={volume === 0 ? "VolumeOff" : "Volume2"} size={16} />
          </button>
          <input
            type="range"
            className="audio-volume-slider"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label={`Volume ${pct}%`}
          />
          <span className="audio-volume-pct">{pct}</span>
          <button
            type="button"
            className="audio-btn audio-btn-vol"
            onClick={() => handleVolume("up")}
            aria-label="Volume up"
            title="Volume up"
          >
            <Icon name="Volume2" size={16} />
          </button>
        </div>
      </div>

      <a
        href={currentTrackMeta.url}
        target="_blank"
        rel="noopener noreferrer"
        className="audio-open-link"
        title="Open on YouTube"
      >
        <Icon name="ExternalLink" size={14} />
        Open on YouTube
      </a>

      {!hasStarted && (
        <button type="button" className="audio-start" onClick={start}>
          <Icon name="Music" size={16} />
          Play music
        </button>
      )}
    </div>
  );
}