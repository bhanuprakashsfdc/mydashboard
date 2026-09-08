// Music catalog for the dashboard.
//
// Tracks are YouTube videos played in-app via the YouTube IFrame API
// (see components/AudioPlayer/YouTubePlayer). The `videoId` field is the
// short YouTube ID extracted from the full watch / youtu.be URL.

export const youTubeTracks = [
  {
    id: "yt-1",
    title: "Ambient Relaxation",
    url: "https://youtu.be/-I1TLepFQ3Y?si=tlZ1PJNyJ03NFqrM",
    videoId: "-I1TLepFQ3Y",
    type: "youtube",
  },
  {
    id: "yt-2",
    title: "Calm Instrumental",
    url: "https://youtu.be/hV2ouq7HZ3o?si=jznFFht7cDotePhn",
    videoId: "hV2ouq7HZ3o",
    type: "youtube",
  },
];

export const allTracks = youTubeTracks;

export default {
  youTubeTracks,
  allTracks,
};