"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import styles from "./ui.module.css";

type NavSubItem = {
  name: string;
  href?: string;
  description?: string;
  isHeader?: boolean;
  hasMargin?: boolean;
};

type NavGroup = {
  title: string;
  items: NavSubItem[];
};

type NavLink = {
  name: string;
  href: string;
  highlight?: boolean;
  subItems?: NavSubItem[];
  megaGroups?: NavGroup[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks: NavLink[] = [

    {
      name: "Who We Serve",
      href: "/services",
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
      megaGroups: [
        {
          title: "Ways We Help",
          items: [
            { name: "AI Compass", description: "Strategic AI direction and clarity", href: "/services/ai-compass" },
            { name: "AI Engineering & Data Analytics", description: "Build scalable AI and data systems", href: "/services/ai-engineering-data" },
            { name: "AI Quality & Assurance", description: "Validate safety, quality, and reliability", href: "/services/ai-quality-assurance" },
          ]
        },
        {
          title: "Most Popular Tools",
          items: [
            { name: "Openvals", description: "Open-source AI evaluation toolkit", href: "/docs" },
            { name: "OptSearch", description: "Intelligent discovery and search", href: "https://optsearch.in/" },
          ]
        },
      ]
    },
    {
      name: "One AI Platform",
      href: "#",
      highlight: true,
      subItems: [
        { name: "OneCRM", href: "/products/onecrm" },
        { name: "OneHrms", href: "/products/onehrms" },
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
              onMouseEnter={() => (link.subItems || link.megaGroups) && setOpenDropdown(link.name)}
              onMouseLeave={() => (link.subItems || link.megaGroups) && setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={`${styles.dropdownTrigger} ${link.highlight ? styles.navLinkHighlighted : ""}`}
              >
                {link.name} {(link.subItems || link.megaGroups) && <ChevronDown size={14} />}
              </Link>

              {(link.subItems || link.megaGroups) && (
                <AnimatePresence>
                  {openDropdown === link.name && (
                    <motion.div
                      className={link.megaGroups ? `${styles.dropdownContent} ${styles.dropdownMega}` : styles.dropdownContent}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.megaGroups ? (
                        link.megaGroups.map((group) => (
                          <div key={group.title} className={styles.dropdownMegaColumn}>
                            <div className={styles.dropdownMegaTitle}>{group.title}</div>
                            {group.items.map((item) => (
                              <Link key={item.name} href={item.href || "#"} className={styles.dropdownMegaItem}>
                                <span>{item.name}</span>
                                {item.description && <small>{item.description}</small>}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        link.subItems?.map((sub) => (
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
                {(link.subItems || link.megaGroups) && (
                  <div style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {link.megaGroups ? (
                      link.megaGroups.map((group) => (
                        <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", letterSpacing: "0.1em" }}>
                            {group.title}
                          </div>
                          {group.items.map((item) => (
                            <Link key={item.name} href={item.href || "#"} onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      link.subItems?.map((sub) => (
                        sub.isHeader ? (
                          <div key={sub.name} style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", marginTop: sub.hasMargin ? "12px" : "0", letterSpacing: "0.1em" }}>
                            {sub.name}
                          </div>
                        ) : (
                          <Link key={sub.name} href={sub.href || "#"} onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                            {sub.name}
                          </Link>
                        )
                      ))
                    )}
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
