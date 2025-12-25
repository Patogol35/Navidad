import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(localStorage.getItem("dark") === "true");
  const toggleTheme = () => setDark(prev => !prev);

  useEffect(() => {
    localStorage.setItem("dark", dark);
    document.body.style.background = dark ? "#111" : "#1b3f5a";
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
