import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeButton() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "10px 18px",
        borderRadius: "10px",
        zIndex: 100,
      }}
    >
      {dark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
