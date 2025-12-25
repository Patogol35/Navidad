import { motion } from "framer-motion";
import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NewYear from "./pages/NewYear";
import SnowCanvas from "./components/SnowCanvas";
import Lights from "./components/Lights";
import MusicPlayer from "./components/MusicPlayer";
import ThemeButton from "./components/ThemeButton";
import SantaFly from "./components/SantaFly";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [page, setPage] = useState("home");

  const navBtn = (name, emoji) => (
    <button onClick={() => setPage(name)}>{emoji} {name}</button>
  );

  return (
    <ThemeProvider>
      <SnowCanvas />
      <SantaFly />
      <Lights />
      <MusicPlayer />
      <ThemeButton />

      <motion.div
        initial={{opacity:0, scale:0.8}}
        animate={{opacity:1, scale:1}}
        transition={{duration:0.4}}
      >
        <header style={{textAlign:"center", marginTop:20}}>
          {navBtn("home","🎄")}
          {navBtn("game","🎁")}
          {navBtn("newyear","🎆")}
        </header>

        {page === "home" && <Home />}
        {page === "game" && <Game />}
        {page === "newyear" && <NewYear />}
      </motion.div>
    </ThemeProvider>
  );
}
