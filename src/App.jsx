import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewYear from "./pages/NewYear";
import SnowCSS from "./components/SnowCSS";
import SnowCanvas from "./components/SnowCanvas";

import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const isMobile = window.innerWidth < 768;

  return (
    <ThemeProvider>
      <BrowserRouter>

        {/* ❄️ Nieve optimizada según dispositivo */}
        {isMobile ? <SnowCSS /> : <SnowCanvas />}

        <Lights />
        <ThemeButton />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-ano" element={<NewYear />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}
