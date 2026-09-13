import { useEffect, useState } from "react";

function Toggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("atlas-theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("atlas-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default Toggle;
