"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  centeredHeader?: boolean;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks: NavLink[] = [
    {
      name: "Our Solutions",
      href: "#",
      highlight: true,
      subItems: [
        { name: "AIxLence", href: "/aixlence" },
        { name: "OpenLxM", href: "/openlxm" },
        { name: "OpenVals", href: "/openvals" },
        { name: "RedShield", href: "/redshield" },
      ],
    },
    {
      name: "Models",
      href: "/models",
      highlight: true,
    },
    {
      name: "Datasets",
      href: "/datasets",
      highlight: true,
    },
    {
      name: "Spaces",
      href: "/spaces",
      highlight: true,
    },
    {
      name: "Pricing",
      href: "/pricing",
      highlight: true,
    },
    {
      name: "Enterprise",
      href: "/enterprise",
      highlight: true,
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
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
                {link.name} {(link.subItems || link.megaGroups) && <ChevronDown size={15} />}
              </Link>

              {(link.subItems || link.megaGroups) && openDropdown === link.name && (
                <motion.div
                  key={`dropdown-${link.name}`}
                  className={
                    link.megaGroups
                      ? link.centeredHeader
                        ? `${styles.dropdownContent} ${styles.dropdownMega} ${styles.dropdownMegaCentered}`
                        : `${styles.dropdownContent} ${styles.dropdownMega}`
                      : styles.dropdownContent
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {link.megaGroups ? (
                    link.centeredHeader ? (
                      <div className={styles.dropdownMegaCenteredContainer}>
                        <div className={styles.dropdownMegaTitleCentered}>
                          {link.megaGroups[0].title}
                        </div>
                        <div className={styles.dropdownMegaColsGrid}>
                          {link.megaGroups.map((group, idx) => (
                            <div key={group.title || idx} className={styles.dropdownMegaColumn}>
                              {group.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href || "#"}
                                  className={styles.dropdownMegaItem}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span>{item.name}</span>
                                  {item.description && <small>{item.description}</small>}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      link.megaGroups.map((group) => (
                        <div key={group.title} className={styles.dropdownMegaColumn}>
                          <div className={styles.dropdownMegaTitle}>{group.title}</div>
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href || "#"}
                              className={styles.dropdownMegaItem}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span>{item.name}</span>
                              {item.description && <small>{item.description}</small>}
                            </Link>
                          ))}
                        </div>
                      ))
                    )
                  ) : (
                    link.subItems?.map((sub) => (
                      sub.isHeader ? (
                        <div key={sub.name} className={`${styles.dropdownSectionLabel} ${sub.hasMargin ? styles.dropdownSection : ""}`}>
                          {sub.name}
                        </div>
                      ) : (
                        <Link
                          key={sub.name}
                          href={sub.href || "#"}
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      )
                    ))
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
        </div>
        <div className={styles.headerCTAContainer}>
          <Link
            href="https://dev.openvalidations.com/auth/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.headerCtaButton} ${styles.headerDesktopCta}`}
          >
            Sign Up / Login
          </Link>
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          key="mobile-nav-panel"
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={styles.mobileCtaWrapper}>
            <Link
              href="https://dev.openvalidations.com/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileCtaButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up / Login
            </Link>
          </div>
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link href={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600 }}>
                {link.name}
              </Link>
              {(link.subItems || link.megaGroups) && (
                <div style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {link.megaGroups ? (
                    link.megaGroups.map((group, idx) => (
                      <div key={group.title || idx} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {group.title && (
                          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", letterSpacing: "0.1em" }}>
                            {group.title}
                          </div>
                        )}
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
    </>
  );
}
