import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Check OS preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only follow OS theme if the user hasn't manually set a preference in localStorage
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const changeMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Only set manually to "stick"
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
