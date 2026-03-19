import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
