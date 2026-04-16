"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./ui.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { 
      name: "Our Services", 
      href: "/services/ai-compass",
      subItems: [
        { name: "AI Compass Overview", href: "/services/ai-compass" },
        { name: "AI Engineering & Analytics", href: "/services/ai-engineering-analytics" },
        { name: "AI Assurance & Data", href: "/services/ai-assurance-data" },
      ]
    },
    { 
      name: "Our Solutions", 
      href: "/#services",
      /* subItems: [
        { name: "AI Red Teaming", href: "/solutions/ai-red-teaming" },
        { name: "Model Validation", href: "/solutions/ai-model-validation" },
        { name: "AI Security", href: "/solutions/ai-security" },
        { name: "AI Compliance", href: "/solutions/ai-compliance" },
      ] */
    },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link href="/">OpenVals</Link>
        </h1>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className={styles.dropdown}
              onMouseEnter={() => link.subItems && setOpenDropdown(link.name)}
              onMouseLeave={() => link.subItems && setOpenDropdown(null)}
            >
              <Link href={link.href} className={styles.dropdownTrigger}>
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
                      {link.subItems.map((sub) => (
                        <Link key={sub.name} href={sub.href} className={styles.dropdownItem}>
                          {sub.name}
                        </Link>
                      ))}
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
                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                        {sub.name}
                      </Link>
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
