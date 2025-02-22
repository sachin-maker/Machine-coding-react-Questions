import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);

  const tracks = [
    {
      title: "Track 1",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://picsum.photos/200/200?random=1", // Random image
    },
    {
      title: "Track 2",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://picsum.photos/200/200?random=2", // Random image
    }
  ];
  

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setTrackProgress((audio.currentTime / audio.duration) * 100);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  // Play new track when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipTrack = (direction) => {
    setCurrentTrack((prev) =>
      direction === "forward"
        ? (prev + 1) % tracks.length
        : (prev - 1 + tracks.length) % tracks.length
    );
    setTrackProgress(0);
  };

  return (
    <div className="music-player">
      <h1>Music Player</h1>
      <h2>{tracks[currentTrack].title}</h2>
      <img src={tracks[currentTrack].image} alt={tracks[currentTrack].title} />
      
      <audio ref={audioRef} src={tracks[currentTrack].source} />

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${trackProgress}%`,
            background: isPlaying ? "#3498db" : "#a43636",
            height: "10px",
          }}
        ></div>
      </div>

      <div className="track-controls">
        <button onClick={() => handleSkipTrack("backward")}>⏪ Previous</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={() => handleSkipTrack("forward")}>⏩ Next</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
