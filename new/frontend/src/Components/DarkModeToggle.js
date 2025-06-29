// DarkModeToggle.js
import { useState, useEffect } from "react";
import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="toggle" className="toggle-label">
        <span className="icon sun"><FaSun /></span>
        <span className="icon moon"><FaMoon /></span>
        <span className="ball"></span>
      </label>
    </div>
  );
}
