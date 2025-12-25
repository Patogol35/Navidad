import { Howl } from "howler";
import { useEffect } from "react";

const music = new Howl({
  src: ["https://www.bensound.com/bensound-music/bensound-christmastime.mp3"],
  loop: true,
  volume: 0.4
});

export default function MusicPlayer() {
  useEffect(() => {
    music.play();
    return () => music.stop();
  }, []);
  return null;
}
