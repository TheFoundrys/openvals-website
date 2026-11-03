"use client";

import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import styles from "./Footer.module.css";

const ABOUT_NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact Us" },
  { href: "/blog", label: "Resources" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandSide}>
          <div className={styles.brandLogosRow}>
            <Logo size="sm" font="serif" />
            <a
              href="https://www.plugscale.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.plugscaleLink}
              aria-label="PlugScale"
            >
              <img
                src="/logos/plugscale.png"
                alt="PlugScale"
                className={styles.plugscaleLogo}
                width={120}
                height={36}
              />
            </a>
          </div>
          <div className={styles.footerMetaRow}>
            <span className={styles.copyright}>&copy; 2026 OpenVals. All rights reserved.</span>
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <nav className={styles.aboutNav} aria-label="About Us">
            {ABOUT_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.aboutNavLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className={styles.footerLegalRow} aria-label="Legal">
            <Link href="/privacy" className={styles.metaLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.metaLink}>
              Terms of Use
            </Link>
            <ThemeToggle className={styles.footerThemeToggle} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
