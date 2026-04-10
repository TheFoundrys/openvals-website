"use client";

import Link from "next/link";
import styles from "./ui.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© 2026 OpenVals. All rights reserved.</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/about">About Us</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
      </div>
    </footer>
  );
}
