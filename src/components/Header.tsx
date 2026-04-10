"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./ui.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Framework", href: "/#framework" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
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
          <Link href="/contact" style={{ color: "var(--text-main)", fontWeight: 500 }}>
            Contact
          </Link>
        </nav>
        <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
