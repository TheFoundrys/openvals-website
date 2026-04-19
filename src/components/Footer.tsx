"use client";

import Link from "next/link";
import Logo from "./Logo";
import styles from "./ui.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Logo size="sm" />
        <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          © 2026 OpenVals. All rights reserved.
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <Link href="/about">About Us</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
      </div>
    </footer>
  );
}
