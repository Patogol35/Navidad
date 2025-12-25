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
        zIndex: 100,
        padding: "12px 20px",
        borderRadius: "8px",
      }}
    >
      {dark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
