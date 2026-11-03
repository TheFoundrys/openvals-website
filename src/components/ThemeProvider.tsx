"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "openvals-theme";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function useSystemTheme() {
  return useContext(ThemeContext);
}

function applyTheme(active: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(active);
  root.style.colorScheme = active;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", active === "dark" ? "#0b0f19" : "#ffffff");
  }
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const setAndPersist = useCallback((active: Theme) => {
    setTheme(active);
    applyTheme(active);
    try {
      localStorage.setItem(STORAGE_KEY, active);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setAndPersist(theme === "dark" ? "light" : "dark");
  }, [theme, setAndPersist]);

  useEffect(() => {
    try {
      localStorage.removeItem("theme");
      localStorage.removeItem("next-themes");
    } catch {}

    const stored = readStoredTheme();
    if (stored) {
      setAndPersist(stored);
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = (matches: boolean) => {
      const active: Theme = matches ? "dark" : "light";
      setTheme(active);
      applyTheme(active);
    };

    syncSystem(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      syncSystem(e.matches);
    };

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [setAndPersist]);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
