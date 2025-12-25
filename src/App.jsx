import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewYear from "./pages/NewYear";
import SnowCSS from "./components/SnowCSS"; // ❄ nieve suave para móviles
import SnowCanvas from "./components/SnowCanvas"; // ❄ copos grandes para desktop
import Lights from "./components/Lights";
import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const isMobile = window.innerWidth < 768;

  return (
    <ThemeProvider>
      <BrowserRouter>

        {/* ❄ Solo un tipo de nieve según dispositivo */}
        {isMobile ? <SnowCSS /> : <SnowCanvas />}

        {/* ✨ Efectos navideños */}
        <Lights />
        <ThemeButton />

        {/* 📌 Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-ano" element={<NewYear />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}
