"use client";

import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Side: Brand & Copyright */}
        <div className={styles.brandSide}>
          <Logo size="sm" font="serif" />
          <div className={styles.copyright}>
            &copy; 2026 OpenVals. All rights reserved.
          </div>
          <nav className={styles.legalNav} aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/data-platform-terms">Data Platform Terms</Link>
          </nav>
        </div>

        {/* Right Side: Columns */}
        <div className={styles.columnsGroup}>
          {/* Column 1: Who We Serve */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Who We Serve</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/finance">Finance</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/healthcare">Healthcare</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/legal">Legal</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/cybersecurity">Cybersecurity</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/developer">Developer</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className={styles.col}>
            <div className={styles.colTitle}>About Us</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/about">About Us</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/blog">Resources</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
