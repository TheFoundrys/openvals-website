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
          <Logo size="sm" />
          <div className={styles.copyright}>
            &copy; 2026 OpenVals. All rights reserved.
          </div>
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
              {/* <li className={styles.linkItem}>
                <Link href="/enterprise-ops">Enterprise Ops</Link>
              </li> */}
              {/* <li className={styles.linkItem}>
                <Link href="/reasoning">Reasoning</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/math">Math</Link>
              </li> */}
            </ul>
          </div>

          {/* Column 2: One AI Platform */}
          <div className={styles.col}>
            <div className={styles.colTitle}>One AI Platform</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/products/onecrm">OneCRM</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/products/onehrms">OneHrms</Link>
              </li>
              <li className={styles.linkItem}>
                <Link
                  href="https://compass.thefoundrys.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Skill Compass
                </Link>
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
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/blog">Blog</Link>
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
