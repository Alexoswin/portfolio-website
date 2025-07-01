// DarkModeToggle.js

import "./DarkModeToggle.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { use, useEffect , useState} from "react";
export default function DarkModeToggle() {

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeMode = () => {

    if (theme =="light"){
      setTheme("dark");
     
    }
    else {
      setTheme("light");
    }
  }

  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        onChange={changeMode}
       
      
      />
      <label htmlFor="toggle" className="toggle-label">
        <span className="icon sun"><FaSun /></span>
        <span className="icon moon"><FaMoon /></span>
        <span className="ball"></span>
      </label>
    </div>
  );
}
