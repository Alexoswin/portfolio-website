import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("dark"); // Set default to dark

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        onChange={changeMode}
        checked={theme === "dark"} // Ensure UI reflects the dark mode default
      />
      <label htmlFor="toggle" className="toggle-label">
        <span className="icon sun"><FaSun /></span>
        <span className="icon moon"><FaMoon /></span>
        <span className="ball"></span>
      </label>
    </div>
  );
}
