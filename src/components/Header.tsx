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
        { name: "Ways We Help Clients", isHeader: true },
        { name: "AI Compass", href: "/services/ai-compass" },
        { name: "AI Engineering & Data", href: "/services/ai-engineering-data" },
        { name: "AI Quality & Assurance", href: "/services/ai-quality-assurance" },
        { name: "Our Most Popular Tools", isHeader: true, hasMargin: true },
        { name: "OptGPT", href: "https://optgpt.in/" },
        { name: "OptSearch", href: "https://optsearch.in/" },
        { name: "Radius", href: "/products/radius" },
        { name: "OptGrad", href: "https://compass.thefoundrys.com/" },
      ]
    },
    { name: "About Us", href: "/about", highlight: true },
    { name: "Blog", href: "/blog", highlight: true },
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
                      style={link.name === "Our Solutions" ? { minWidth: "500px", flexDirection: "row", padding: "20px", gap: "40px" } : {}}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name === "Our Solutions" ? (
                        <>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                            <div className={styles.dropdownSectionLabel}>Ways We Help</div>
                            {link.subItems.filter(sub => !sub.isHeader && (sub.href?.includes("/services") || sub.href?.includes("/solutions"))).map((sub) => (
                              <Link key={sub.name} href={sub.href || "#"} className={styles.dropdownItem}>
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                          <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                            <div className={styles.dropdownSectionLabel}>Most Popular Tools</div>
                            {link.subItems.filter(sub => !sub.isHeader && (sub.href?.includes("opt") || sub.href?.includes("radius") || sub.href?.includes("thefoundrys") || sub.name.includes("Opt"))).map((sub) => (
                              <Link key={sub.name} href={sub.href || "#"} className={styles.dropdownItem}>
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        link.subItems.map((sub, idx) => (
                          sub.isHeader ? (
                            <div key={sub.name} className={`${styles.dropdownSectionLabel} ${sub.hasMargin ? styles.dropdownSection : ""}`}>
                              {sub.name}
                            </div>
                          ) : (
                            <Link key={sub.name} href={sub.href || "#"} className={styles.dropdownItem}>
                              {sub.name}
                            </Link>
                          )
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
