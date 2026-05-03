"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProviders({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mindcare-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    setSoundOn(localStorage.getItem("mindcare-sound") === "on");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("mindcare-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("mindcare-sound", soundOn ? "on" : "off");
  }, [soundOn]);

  const playSoftTone = () => {
    if (!soundOn || typeof window === "undefined") return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 528;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.48);
  };

  const value = useMemo(
    () => ({ darkMode, setDarkMode, soundOn, setSoundOn, playSoftTone }),
    [darkMode, soundOn]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppSettings must be used inside AppProviders");
  }
  return context;
}
