"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Check,
  Sparkles,
  Box,
  Database,
  BookOpen,
} from "lucide-react";
import Logo from "./Logo";
import styles from "./ui.module.css";

function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}


const QUICK_SEARCH_LINKS = [
  { name: "Models", category: "Explore", href: "/models", desc: "117+ validated models & benchmarks" },
  { name: "Datasets", category: "Explore", href: "/datasets", desc: "Domain-specific AI datasets" },
  { name: "Spaces", category: "Explore", href: "/spaces", desc: "Interactive validation spaces" },
  { name: "AIxLence", category: "Solutions", href: "/aixlence", desc: "Evaluation & benchmarking engine" },
  { name: "OpenLxM", category: "Solutions", href: "/openlxm", desc: "Autonomous agent evaluation" },
  { name: "RedShield", category: "Solutions", href: "/redshield", desc: "AI red teaming & security defense" },
  { name: "Pricing", category: "General", href: "/pricing", desc: "Enterprise & developer tiers" },
  { name: "OpenVals Docs", category: "Documentation", href: "/openvals-docs", desc: "Trust infrastructure, DRS & API references" },
  { name: "AIxLence Docs", category: "Documentation", href: "/aixlence-docs", desc: "Enterprise AI readiness & capability diagnostics" },
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

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMenuOpen]);

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



  return (
    <>
      <header className={styles.header}>
        {/* ── LEFT CLUSTER: LOGO + SEARCH BAR ── */}
        <div className={styles.headerLeftCluster}>
          <Logo size="sm" />

          {/* Search Box */}
          <div ref={searchContainerRef} className={styles.headerSearchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.headerSearchWrap}>
              <Search size={15} className={styles.headerSearchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search models, datasets, users..."
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
        </div>

        {/* ── RIGHT CLUSTER: NAV LINKS WITH ICONS + DIVIDER + AUTH ACTIONS ── */}
        <div className={styles.headerRightCluster}>
          <nav className={styles.navBarWithIcons} aria-label="Main Navigation">
            {/* 0. AIxLence */}
            <Link
              href="/aixlence"
              className={`${styles.navIconLink} ${pathname?.startsWith("/aixlence") && !pathname?.startsWith("/aixlence-docs") ? styles.navIconLinkActive : ""}`}
            >
              <Sparkles size={15} className={styles.navItemIcon} />
              <span>AIxLence</span>
            </Link>

            {/* 1. Models */}
            <Link
              href="/models"
              className={`${styles.navIconLink} ${pathname?.startsWith("/models") ? styles.navIconLinkActive : ""}`}
            >
              <Box size={15} className={styles.navItemIcon} />
              <span>Models</span>
            </Link>

            {/* 2. Datasets */}
            <Link
              href="/datasets"
              className={`${styles.navIconLink} ${pathname?.startsWith("/datasets") ? styles.navIconLinkActive : ""}`}
            >
              <Database size={15} className={styles.navItemIcon} />
              <span>Datasets</span>
            </Link>

            {/* 3. Spaces */}
            {/* <Link
              href="/spaces"
              className={`${styles.navIconLink} ${pathname?.startsWith("/spaces") ? styles.navIconLinkActive : ""}`}
            >
              <LayoutGrid size={15} className={styles.navItemIcon} />
              <span>Spaces</span>
            </Link> */}

            {/* 5. Docs */}
            <div
              className={styles.dropdown}
              onMouseEnter={() => setOpenDropdown("Docs")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/openvals-docs"
                className={`${styles.navIconLink} ${pathname?.includes("docs") ? styles.navIconLinkActive : ""}`}
              >
                <BookOpen size={15} className={styles.navItemIcon} />
                <span>Docs</span>
              </Link>

              {openDropdown === "Docs" && (
                <motion.div
                  key="dropdown-docs"
                  className={styles.dropdownContent}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href="/openvals-docs"
                    className={styles.dropdownItem}
                    onClick={() => setOpenDropdown(null)}
                    style={{
                      background: pathname?.startsWith("/openvals-docs") ? "rgba(59, 130, 246, 0.1)" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", width: "100%" }}>
                      <div style={{ fontWeight: 600, color: pathname?.startsWith("/openvals-docs") ? "#3b82f6" : "var(--text-main)" }}>
                        OpenVals Docs
                      </div>
                      {pathname?.startsWith("/openvals-docs") && <Check size={14} style={{ color: "#3b82f6", flexShrink: 0, strokeWidth: 2.4 }} />}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px", whiteSpace: "normal" }}>
                      AI evaluation, DRS & benchmarking
                    </div>
                  </Link>

                  <Link
                    href="/aixlence-docs"
                    className={styles.dropdownItem}
                    onClick={() => setOpenDropdown(null)}
                    style={{
                      background: pathname?.startsWith("/aixlence-docs") ? "rgba(59, 130, 246, 0.1)" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", width: "100%" }}>
                      <div style={{ fontWeight: 600, color: pathname?.startsWith("/aixlence-docs") ? "#3b82f6" : "var(--text-main)" }}>
                        AIxLence Docs
                      </div>
                      {pathname?.startsWith("/aixlence-docs") && <Check size={14} style={{ color: "#3b82f6", flexShrink: 0, strokeWidth: 2.4 }} />}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px", whiteSpace: "normal" }}>
                      Readiness diagnostics & roadmap
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
            
            {/* 7. Pricing */}
            <Link
              href="/pricing"
              className={`${styles.navIconLink} ${pathname?.startsWith("/pricing") ? styles.navIconLinkActive : ""}`}
            >
              <span>Pricing</span>
            </Link>

            {/* 8. More Dropdown (˅≡) */}
            <div
              className={styles.dropdown}
              onMouseEnter={() => setOpenDropdown("More")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={styles.navMoreBtn}
                aria-label="More navigation items"
                onClick={() => setOpenDropdown(openDropdown === "More" ? null : "More")}
              >
                <ChevronDown size={12} />
                <Menu size={13} />
              </button>

              {openDropdown === "More" && (
                <motion.div
                  key="dropdown-more"
                  className={styles.dropdownContent}
                  style={{ right: 0, left: "auto", minWidth: "240px" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className={`${styles.dropdownSectionLabel} ${styles.dropdownSection}`}>Resources</div>
                  <Link href="/blog" className={styles.dropdownItem} onClick={() => setOpenDropdown(null)}>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>Research & Blog</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Technical papers & security briefs</div>
                  </Link>
                  <a
                    href="https://github.com/vishwanathakuthota/openvals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.dropdownItem}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", fontWeight: 600, color: "var(--text-main)" }}>
                      <span>GitHub</span>
                      <GithubIcon size={15} />
                    </div>
                  </a>
                </motion.div>
              )}
            </div>
          </nav>

          {/* Vertical Divider */}
          <div className={styles.headerVerticalDivider} aria-hidden="true" />

          {/* Log In */}
          <Link
              href="https://github.com/vishwanathakuthota/openvals"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileGithubBtn}
              aria-label="OpenVals on GitHub"
              title="OpenVals on GitHub"
              onClick={() => setIsMenuOpen(false)}
            >
              <GithubIcon size={18} />
            </Link>
          <Link
            href="https://dev.openvalidations.com/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.headerLoginTextBtn}
          >
            Log In
          </Link>

          {/* Sign Up */}
          <Link
            href="https://dev.openvalidations.com/auth/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.headerSignUpPillBtn}
          >
            Sign Up
          </Link>

          {/* Mobile Menu Toggle Button */}
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

      {/* ── MOBILE MENU DRAWER ── */}
      {isMenuOpen && (
        <motion.div
          key="mobile-nav-panel"
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Mobile Search Input */}
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setIsMenuOpen(false);
            }}
            className={styles.mobileSearchForm}
          >
            <Search size={16} className={styles.headerSearchIcon} />
            <input
              type="text"
              placeholder="Search models, datasets, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInputField}
              aria-label="Search OpenVals"
            />
          </form>

          {/* Mobile CTA Buttons */}
          <div className={styles.mobileCtaWrapper}>
            <Link
              href="https://dev.openvalidations.com/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileCtaButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              href="https://dev.openvalidations.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerGithubBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="https://github.com/vishwanathakuthota/openvals"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileGithubBtn}
              aria-label="OpenVals on GitHub"
              title="OpenVals on GitHub"
              onClick={() => setIsMenuOpen(false)}
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </Link>
          </div>

          {/* Mobile Nav Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href="/aixlence"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}
            >
              <Sparkles size={18} color="var(--text-muted)" />
              <span>AIxLence</span>
            </Link>

            <Link
              href="/models"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}
            >
              <Box size={18} color="var(--text-muted)" />
              <span>Models</span>
            </Link>

            <Link
              href="/datasets"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}
            >
              <Database size={18} color="var(--text-muted)" />
              <span>Datasets</span>
            </Link>

            {/* <Link
              href="/spaces"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}
            >
              <LayoutGrid size={18} color="var(--text-muted)" />
              <span>Spaces</span>
            </Link> */}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}>
                <BookOpen size={18} color="var(--text-muted)" />
                <span>Docs</span>
              </div>
              <div style={{ paddingLeft: "28px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
                <Link
                  href="/openvals-docs"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: "14.5px", color: pathname?.startsWith("/openvals-docs") ? "#3b82f6" : "var(--text-muted)" }}
                >
                  OpenVals Docs
                </Link>
                <Link
                  href="/aixlence-docs"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: "14.5px", color: pathname?.startsWith("/aixlence-docs") ? "#3b82f6" : "var(--text-muted)" }}
                >
                  AIxLence Docs
                </Link>
              </div>
            </div>
            
            <Link
              href="/pricing"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}
            >
              <span>Pricing</span>
            </Link>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", letterSpacing: "0.08em" }}>
                Solutions & Insights
              </div>
              <Link href="/aixlence" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                AIxLence
              </Link>
              <Link href="/openlxm" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                OpenLxM
              </Link>
              <Link href="/redshield" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                RedShield
              </Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                Research & Blog
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
