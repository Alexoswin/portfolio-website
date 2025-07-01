// DarkModeToggle.js

import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkModeToggle() {
 

  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
       
       
      
      />
      <label htmlFor="toggle" className="toggle-label">
        <span className="icon sun"><FaSun /></span>
        <span className="icon moon"><FaMoon /></span>
        <span className="ball"></span>
      </label>
    </div>
  );
}
