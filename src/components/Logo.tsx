"use client";

import Link from "next/link";
import styles from "./ui.module.css";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  font?: "sans" | "serif";
}

export default function Logo({ className, size = "md", font: _font = "serif" }: LogoProps) {
  const sizeStyles = {
    sm: { fontSize: "24px" },
    md: { fontSize: "32px" },
    lg: { fontSize: "40px" },
  };

  // Brand wordmark stays Georgia — site UI uses self-hosted Inter elsewhere.
  const logoFont = "var(--font-logo), Georgia, serif";

  return (
    <Link
      href="/"
      className={`${styles.logoWrapper} ${className || ""}`}
      style={{
        ...sizeStyles[size],
        fontFamily: logoFont,
      }}
    >
      <span
        className={styles.logoText}
        style={{
          fontFamily: logoFont,
          fontWeight: 500,
          letterSpacing: "normal",
        }}
      >
        OpenVals
      </span>
    </Link>
  );
}
