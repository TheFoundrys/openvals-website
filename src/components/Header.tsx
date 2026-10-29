"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";
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

const QUICK_SEARCH_LINKS = [
  { name: "Models", category: "Explore", href: "/models", desc: "117+ validated models & benchmarks" },
  { name: "Datasets", category: "Explore", href: "/datasets", desc: "Domain-specific AI datasets" },
  { name: "Spaces", category: "Explore", href: "/spaces", desc: "Interactive validation spaces" },
  { name: "AIxLence", category: "Solutions", href: "/aixlence", desc: "Evaluation & benchmarking engine" },
  { name: "OpenLxM", category: "Solutions", href: "/openlxm", desc: "Autonomous agent evaluation" },
  { name: "RedShield", category: "Solutions", href: "/redshield", desc: "AI red teaming & security defense" },
  { name: "Pricing", category: "General", href: "/pricing", desc: "Enterprise & developer tiers" },
  { name: "Docs", category: "Documentation", href: "/docs", desc: "All OpenVals technical guides & API references" },
  { name: "Research & Blog", category: "Insights", href: "/blog", desc: "Technical papers & security briefs" },
];

const POPULAR_MODELS = [
  { name: "Llama 3.2", category: "Model", href: "/models?search=Llama" },
  { name: "DeepSeek R1", category: "Model", href: "/models?search=DeepSeek" },
  { name: "Granite 3.2", category: "Model", href: "/models?search=Granite" },
  { name: "Gemma 3", category: "Model", href: "/models?search=Gemma" },
  { name: "Mistral Nemo", category: "Model", href: "/models?search=Mistral" },
  { name: "Qwen 2.5", category: "Model", href: "/models?search=Qwen" },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/models?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      searchInputRef.current?.blur();
    }
  };

  const handleSelectResult = (href: string) => {
    router.push(href);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const matchedPages = trimmedQuery
    ? QUICK_SEARCH_LINKS.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmedQuery) ||
          item.desc?.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery)
      )
    : QUICK_SEARCH_LINKS.slice(0, 4);

  const matchedModels = trimmedQuery
    ? POPULAR_MODELS.filter((item) =>
        item.name.toLowerCase().includes(trimmedQuery)
      )
    : POPULAR_MODELS.slice(0, 3);

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
      name: "Docs",
      href: "/docs",
      highlight: true,
    },
    {
      name: "Pricing",
      href: "/pricing",
      highlight: true,
    },
    // {
    //   name: "Enterprise",
    //   href: "/enterprise",
    //   highlight: true,
    // },
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
          {/* SEARCH BAR IN FRONT OF SIGN UP / LOGIN */}
          <div ref={searchContainerRef} className={styles.headerSearchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.headerSearchWrap}>
              <Search size={15} className={styles.headerSearchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className={styles.headerSearchInput}
                aria-label="Search OpenVals"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.headerSearchClearBtn}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              ) : (
                <kbd className={styles.headerSearchKbd}>⌘K</kbd>
              )}
            </form>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.12 }}
                  className={styles.headerSearchDropdown}
                >
                  <div className={styles.headerSearchDropdownSection}>
                    {trimmedQuery ? "Pages & Solutions" : "Quick Access"}
                  </div>
                  {matchedPages.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleSelectResult(item.href)}
                      className={styles.headerSearchItem}
                    >
                      <div className={styles.headerSearchItemLeft}>
                        <span className={styles.headerSearchItemName}>{item.name}</span>
                        {item.desc && (
                          <span className={styles.headerSearchItemDesc}>{item.desc}</span>
                        )}
                      </div>
                      <span className={styles.headerSearchItemBadge}>{item.category}</span>
                    </button>
                  ))}

                  {matchedModels.length > 0 && (
                    <>
                      <div className={styles.headerSearchDropdownSection} style={{ marginTop: "6px" }}>
                        Models
                      </div>
                      {matchedModels.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleSelectResult(item.href)}
                          className={styles.headerSearchItem}
                        >
                          <div className={styles.headerSearchItemLeft}>
                            <span className={styles.headerSearchItemName}>{item.name}</span>
                          </div>
                          <span className={styles.headerSearchItemBadge}>Model</span>
                        </button>
                      ))}
                    </>
                  )}

                  {trimmedQuery && (
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className={styles.headerSearchActionItem}
                    >
                      <span>Search models for &quot;{searchQuery}&quot;</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
      <div className={styles.headerSpacer} aria-hidden="true" />

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
