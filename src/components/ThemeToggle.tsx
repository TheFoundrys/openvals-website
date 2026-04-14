"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ui.module.css";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 60, height: 32 }} />;

  const isDark = resolvedTheme === "dark";

  return (
    <div className={styles.switchContainer} onClick={() => setTheme(isDark ? "light" : "dark")}>
      <div className={`${styles.switchTrack} ${isDark ? styles.trackDark : styles.trackLight}`}>
        <div className={`${styles.switchThumb} ${isDark ? styles.thumbDark : styles.thumbLight}`}>
          {isDark ? <Moon size={14} color="#00D4FF" /> : <Sun size={14} color="#FFB800" />}
        </div>
      </div>
    </div>
  );
}
