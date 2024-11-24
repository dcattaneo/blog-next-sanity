"use client";
import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode !== "dark";
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isLightMode]);

  const toggleToLightMode = () => {
    setIsLightMode(true);
    localStorage.setItem("theme", "light");
  };

  const toggleToDarkMode = () => {
    setIsLightMode(false);
    localStorage.setItem("theme", "dark");
  };

  return { isLightMode, toggleToLightMode, toggleToDarkMode };
}
