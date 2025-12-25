import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NewYear from "./pages/NewYear";
import SnowCanvas from "./components/SnowCanvas";
import Lights from "./components/Lights";
import SantaFly from "./components/SantaFly";
import MusicPlayer from "./components/MusicPlayer";
import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        <MusicPlayer />
        <SnowCanvas />
        <Lights />
        <SantaFly />
        <ThemeButton />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego" element={<Game />} />
          <Route path="/nuevo-ano" element={<NewYear />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}
