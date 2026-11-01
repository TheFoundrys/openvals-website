"use client";

import Link from "next/link";
import styles from "./ui.module.css";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  font?: "sans" | "serif";
}

export default function Logo({ className, size = "md", font = "sans" }: LogoProps) {
  const sizeStyles = {
    sm: { fontSize: "24px" },
    md: { fontSize: "32px" },
    lg: { fontSize: "40px" },
  };

  const isSans = font === "sans";
  const sansFontStack =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Outfit", "Helvetica Neue", Arial, sans-serif';
  const serifFontStack = 'var(--font-serif-main), "Georgia", "Times New Roman", serif';
  const activeFont = isSans ? sansFontStack : serifFontStack;

  return (
    <Link
      href="/"
      className={`${styles.logoWrapper} ${className || ""}`}
      style={{
        ...sizeStyles[size],
        fontFamily: activeFont,
      }}
    >
      <span
        className={styles.logoText}
        style={{
          fontFamily: activeFont,
          fontWeight: 700,
          letterSpacing: isSans ? "-0.025em" : "normal",
        }}
      >
        OpenVals
      </span>
    </Link>
  );
}
