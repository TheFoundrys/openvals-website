"use client";

import Link from "next/link";
import Logo from "./Logo";
import styles from "./ui.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <Logo size="sm" />
        <div className={styles.footerCopyright}>
          &copy; 2026 OpenVals. All rights reserved.
        </div>
      </div>
      <div className={styles.footerLinks}>
        <Link href="/faqs">FAQs</Link>
        <Link href="/about">About Us</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
      </div>
    </footer>
  );
}
