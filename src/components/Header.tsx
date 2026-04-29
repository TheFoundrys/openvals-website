"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import styles from "./ui.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [

    {
      name: "Our Services",
      href: "/#services",
      highlight: true,
      subItems: [
        // { name: "AI Red Teaming", href: "/solutions/ai-red-teaming" },
        { name: "AI/ML Model Validation", href: "/solutions/ai-model-validation" },
        { name: "AI/ML Security", href: "/solutions/ai-security" },
        { name: "AI/ML Compliance", href: "/solutions/ai-compliance" },
      ]
    },
    {
      name: "Our Solutions",
      href: "/services/ai-compass",
      highlight: true,
      subItems: [
        { name: "Ways We Help", isHeader: true },
        { name: "AI Compass", href: "/services/ai-compass" },
        { name: "AI Engineering & Data Analytics", href: "/services/ai-engineering-data" },
        { name: "AI Quality & Assurance", href: "/services/ai-quality-assurance" },
        { name: "Most Popular Tools", isHeader: true, hasMargin: true },
        // { name: "OptGPT", href: "https://optgpt.in/" },
        // { name: "OptSearch", href: "https://optsearch.in/" },
        // { name: "Radius", href: "/products/radius" },
        { name: "Skill Compass", href: "https://compass.thefoundrys.com/" },
      ]
    },
    { name: "About Us", href: "/about", highlight: true },
    { name: "Resources", href: "/blog", highlight: true },
    { name: "Contact", href: "/contact", highlight: true },
  ];

  return (
    <>
      <header className={styles.header}>
        <Logo size="sm" />
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <div
              key={link.name}
              className={styles.dropdown}
              onMouseEnter={() => link.subItems && setOpenDropdown(link.name)}
              onMouseLeave={() => link.subItems && setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={`${styles.dropdownTrigger} ${link.highlight ? styles.navLinkHighlighted : ""}`}
              >
                {link.name} {link.subItems && <ChevronDown size={14} />}
              </Link>

              {link.subItems && (
                <AnimatePresence>
                  {openDropdown === link.name && (
                    <motion.div
                      className={styles.dropdownContent}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.subItems.map((sub, idx) => (
                        sub.isHeader ? (
                          <div key={sub.name} className={`${styles.dropdownSectionLabel} ${sub.hasMargin ? styles.dropdownSection : ""}`}>
                            {sub.name}
                          </div>
                        ) : (
                          <Link key={sub.name} href={sub.href || "#"} className={styles.dropdownItem}>
                            {sub.name}
                          </Link>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
        <div className={styles.headerCTAContainer}>
          <Link href="/apply" className={`${styles.button} ${styles.primary} ${styles.headerCTA} ${styles.headerCTAHeader}`} style={{ padding: "8px 16px", fontSize: "14px" }}>
            Get Your AI/ML Validated
          </Link>
          <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link
              href="/apply"
              className={`${styles.button} ${styles.primary}`}
              style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Your AI/ML Validated
            </Link>
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600 }}>
                  {link.name}
                </Link>
                {link.subItems && (
                  <div style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {link.subItems.map((sub) => (
                      sub.isHeader ? (
                        <div key={sub.name} style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", marginTop: sub.hasMargin ? "12px" : "0", letterSpacing: "0.1em" }}>
                          {sub.name}
                        </div>
                      ) : (
                        <Link key={sub.name} href={sub.href || "#"} onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
