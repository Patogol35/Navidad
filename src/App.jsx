import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewYear from "./pages/NewYear";
import SnowCSS from "./components/SnowCSS"; // ⬅️ usamos esta
import Lights from "./components/Lights";
import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        {/* ❄ Nieve sin lag */}
        <SnowCSS />

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
