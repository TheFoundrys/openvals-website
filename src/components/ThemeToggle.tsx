"use client";

import { Moon, Sun } from "lucide-react";
import { useSystemTheme } from "./ThemeProvider";
import styles from "./Footer.module.css";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useSystemTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className ?? ""}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={16} strokeWidth={2} aria-hidden /> : <Moon size={16} strokeWidth={2} aria-hidden />}
    </button>
  );
}
