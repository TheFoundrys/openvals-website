"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  isDark: false,
});

export function useSystemTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // 6. Remove conflicting localStorage or hardcoded theme preferences
    try {
      localStorage.removeItem("theme");
      localStorage.removeItem("next-themes");
      localStorage.removeItem("openvals-theme");
    } catch {}

    // 2. In React, use window.matchMedia('(prefers-color-scheme: dark)')
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (matches: boolean) => {
      const active: Theme = matches ? "dark" : "light";
      setTheme(active);

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(active);
      root.style.colorScheme = active;

      // Also keep viewport meta theme-color in sync
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute("content", matches ? "#0b0f19" : "#ffffff");
      }
    };

    // 3. Automatically apply the correct theme when the website loads
    updateTheme(mql.matches);

    // 4. Listen for system theme changes and update without requiring a refresh
    const handleChange = (e: MediaQueryListEvent) => {
      updateTheme(e.matches);
    };

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}
