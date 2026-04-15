"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./ui.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Our Services", href: "/compass" },
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
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
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
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
