import { Howl } from "howler";
import { useState } from "react";

const music = new Howl({
  src: ["https://www.bensound.com/bensound-music/bensound-christmastime.mp3"],
  loop: true,
  volume: 0.4
});

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  const playMusic = () => {
    music.play();
    setPlaying(true);
  };

  if (playing) return null;

  return (
    <button
      onClick={playMusic}
      style={{ position: "fixed", bottom: 20, left: 20, zIndex: 100 }}
    >
      🔊 Música
    </button>
  );
    }
