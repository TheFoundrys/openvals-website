"use client";

import Link from "next/link";
import styles from "./ui.module.css";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, size = "md" }: LogoProps) {
  const sizeStyles = {
    sm: { fontSize: "24px" },
    md: { fontSize: "32px" },
    lg: { fontSize: "40px" },
  };

  return (
    <Link href="/" className={`${styles.logoWrapper} ${className || ""}`} style={sizeStyles[size]}>
      <span className={styles.logoText}>OpenVals</span>
    </Link>
  );
}
