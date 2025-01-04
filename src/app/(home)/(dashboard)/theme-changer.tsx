"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function ThemeChanger() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const lTheme = localStorage.getItem("theme");
    if (lTheme) {
      setTheme(lTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="text-2xl flex items-center">
      {theme === "light" ? (
        <FontAwesomeIcon icon={faSun} className="pr-3" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="pr-3" />
      )}
      <span>Theme</span>
    </button>
  );
}
