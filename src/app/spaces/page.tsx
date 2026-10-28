"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Search,
  ChevronDown,
  ArrowRight,
  X,
  Flame,
  Heart,
  Sparkles,
  ExternalLink,
  Mic,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import allSpacesJson from "@/data/allSpacesData.json";
import styles from "./spaces.module.css";

interface SpaceItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  runtime: string;
  uses: number;
  daysAgo: number;
  featured: boolean;
  gradient: string;
}

const CATEGORIES = [
  { name: "Agents", icon: "🤖" },
  { name: "Audio", icon: "📢" },
  { name: "Comparison", icon: "🔀" },
  { name: "Compliance", icon: "📋" },
  { name: "Fairness", icon: "⚖️" },
  { name: "FinOps", icon: "💰" },
  { name: "Grounding", icon: "📚" },
  { name: "Image", icon: "🖼️" },
  { name: "Infra", icon: "⚙️" },
  { name: "Multilingual", icon: "🌐" },
  { name: "Observability", icon: "📈" },
  { name: "Performance", icon: "⚡" },
];

const GRADIENTS: Record<string, string> = {
  blue: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
  red: "linear-gradient(135deg, #881337 0%, #be123c 50%, #e11d48 100%)",
  purple: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)",
  violet: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%)",
  indigo: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #4f46e5 100%)",
  rose: "linear-gradient(135deg, #9f1239 0%, #be123c 50%, #e11d48 100%)",
  amber: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)",
  slate: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  teal: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #0d9488 100%)",
  emerald: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)",
  sky: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
  green: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #16a34a 100%)",
  pink: "linear-gradient(135deg, #831843 0%, #be185d 50%, #db2777 100%)",
  orange: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
};

const SORT_OPTIONS = [
  { value: "trending", label: "Sort: Trending" },
  { value: "uses", label: "Sort: Most used" },
  { value: "recent", label: "Sort: Recently updated" },
  { value: "name", label: "Sort: Name A–Z" },
];

export default function SpacesPage() {
  const fullSpacesList = useMemo(() => {
    return (allSpacesJson?.data?.items as SpaceItem[]) || [];
  }, []);

  const [allSpaces, setAllSpaces] = useState<SpaceItem[]>(fullSpacesList);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("trending");

  // Modal State
  const [selectedSpace, setSelectedSpace] = useState<SpaceItem | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync with live server API proxy in background
  useEffect(() => {
    async function syncRemoteData() {
      try {
        const res = await fetch("/api/spaces?page=1&pageSize=500");
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.items && json.data.items.length > 0) {
            setAllSpaces(json.data.items);
          }
        }
      } catch (err) {
        console.warn("Using offline cached spaces registry", err);
      }
    }
    syncRemoteData();
  }, []);

  // Filtered spaces
  const filteredSpaces = useMemo(() => {
    return allSpaces.filter((sp) => {
      if (selectedCategory && sp.category !== selectedCategory) {
        return false;
      }
      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase();
        const matchesTitle = sp.title.toLowerCase().includes(q);
        const matchesDesc = sp.description.toLowerCase().includes(q);
        const matchesCategory = sp.category.toLowerCase().includes(q);
        const matchesRuntime = sp.runtime.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesRuntime) {
          return false;
        }
      }
      return true;
    });
  }, [allSpaces, selectedCategory, debouncedQuery]);

  // Sorted spaces
  const sortedSpaces = useMemo(() => {
    const list = [...filteredSpaces];
    if (sort === "trending") {
      list.sort((a, b) => b.uses * 2 - a.daysAgo - (a.uses * 2 - b.daysAgo));
    } else if (sort === "uses") {
      list.sort((a, b) => b.uses - a.uses);
    } else if (sort === "recent") {
      list.sort((a, b) => a.daysAgo - b.daysAgo);
    } else if (sort === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredSpaces, sort]);

  // Featured "Spaces of the week" (top 4 featured)
  const featuredSpaces = useMemo(() => {
    return allSpaces.filter((sp) => sp.featured).slice(0, 4);
  }, [allSpaces]);

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        <div className={styles.container}>
          {/* HEADER TOP BAR */}
          <div className={styles.headerBar}>
            <div className={styles.headerLeft}>
              <LayoutGrid size={22} className={styles.headerIcon} />
              <h1 className={styles.headerTitle}>Spaces</h1>
              <span className={styles.headerSubtitle}>The AI Validation App Directory</span>
            </div>

            <div className={styles.headerRight}>
              <Link
                href="https://dev.openvalidations.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newSpaceBtn}
              >
                <Sparkles size={15} /> New Space
              </Link>
              <Link
                href="/pricing"
                className={styles.getProBtn}
              >
                Get PRO
              </Link>
            </div>
          </div>

          {/* MAIN PROMPT SEARCH BAR */}
          <div className={styles.mainSearchWrap}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything you want to validate..."
              className={styles.mainSearchInput}
              aria-label="Ask anything you want to validate"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.mainSearchActionBtn}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.mainSearchActionBtn}
                aria-label="Voice input"
              >
                <Mic size={18} />
              </button>
            )}
          </div>

          {/* CATEGORIES PILLS BAR */}
          <div className={styles.categoriesBar}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(isActive ? null : cat.name);
                  }}
                  className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ""}`}
                >
                  <span className={styles.categoryIcon}>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* SPACES OF THE WEEK */}
          {!selectedCategory && !debouncedQuery && (
            <section className={styles.featuredSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <Flame size={18} className={styles.flameIcon} />
                  <h2 className={styles.sectionTitle}>Spaces of the week</h2>
                </div>
                <span className={styles.sectionDate}>Oct 2026</span>
              </div>

              <div className={styles.featuredGrid}>
                {featuredSpaces.map((space) => {
                  const bg = GRADIENTS[space.gradient] || GRADIENTS.blue;
                  return (
                    <div
                      key={`feat-${space.slug}`}
                      className={styles.featuredCard}
                      style={{ background: bg }}
                      onClick={() => setSelectedSpace(space)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedSpace(space);
                        }
                      }}
                    >
                      <div className={styles.cardTopRow}>
                        <div className={styles.cardBadges}>
                          <span className={styles.runtimeBadge}>
                            <span className={styles.statusDot} /> Running on {space.runtime}
                          </span>
                          <span className={styles.featuredTag}>★ Featured</span>
                        </div>
                        <span className={styles.usesBadge}>
                          <Heart size={13} /> {space.uses}
                        </span>
                      </div>

                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{space.title}</h3>
                        <p className={styles.cardDesc}>{space.description}</p>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.ownerWrap}>
                          <span className={styles.ownerDot} /> OpenVals
                        </span>
                        <span className={styles.daysAgo}>{space.daysAgo} days ago</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ALL VALIDATION APPS SECTION */}
          <section className={styles.allAppsSection}>
            <div className={styles.allAppsHeader}>
              <h2 className={styles.allAppsTitle}>
                {selectedCategory ? `${selectedCategory} Spaces` : "All validation apps, trending first"}
              </h2>

              <div className={styles.allAppsControls}>
                <span className={styles.spacesCount}>{sortedSpaces.length} Spaces</span>

                <div className={styles.searchInputWrap}>
                  <Search size={15} className={styles.searchIcon} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by name"
                    className={styles.searchInput}
                    aria-label="Filter spaces by name"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className={styles.clearSearchBtn}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className={styles.sortSelectWrap}>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.sortSelect}
                    aria-label="Sort spaces"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className={styles.sortSelectIcon} />
                </div>
              </div>
            </div>

            {/* SPACES GRID (4 COLUMNS) */}
            {sortedSpaces.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>No validation spaces found</p>
                <p className={styles.emptySubtitle}>Try clearing your search or category filter.</p>
                {(selectedCategory || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                    className={styles.emptyClearBtn}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.spacesGrid}>
                {sortedSpaces.map((space) => {
                  const bg = GRADIENTS[space.gradient] || GRADIENTS.blue;
                  return (
                    <div
                      key={space.slug}
                      className={styles.spaceCard}
                      style={{ background: bg }}
                      onClick={() => setSelectedSpace(space)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedSpace(space);
                        }
                      }}
                    >
                      <div className={styles.cardTopRow}>
                        <div className={styles.cardBadges}>
                          <span className={styles.runtimeBadge}>
                            <span className={styles.statusDot} /> Running on {space.runtime}
                          </span>
                          {space.featured && <span className={styles.featuredTag}>★ Featured</span>}
                        </div>
                        <span className={styles.usesBadge}>
                          <Heart size={13} /> {space.uses}
                        </span>
                      </div>

                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{space.title}</h3>
                        <p className={styles.cardDesc}>{space.description}</p>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.ownerWrap}>
                          <span className={styles.ownerDot} /> OpenVals
                        </span>
                        <span className={styles.daysAgo}>{space.daysAgo} days ago</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* BOTTOM WORKSPACE PROMO CARD */}
            <div className={styles.workspacePromoCard}>
              <p className={styles.promoText}>
                Full benchmarks, trade-off lenses, and audit trails are available in the workspace.
              </p>
              <Link
                href="https://dev.openvalidations.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.promoLink}
              >
                Create a free workspace <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>

        {/* SPACE DETAILS MODAL */}
        {selectedSpace && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedSpace(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={styles.modalHeader}
                style={{ background: GRADIENTS[selectedSpace.gradient] || GRADIENTS.blue }}
              >
                <div>
                  <div className={styles.modalHeaderBadges}>
                    <span className={styles.modalRuntimeBadge}>
                      ● Running on {selectedSpace.runtime}
                    </span>
                    <span className={styles.modalCategoryBadge}>
                      {selectedSpace.category}
                    </span>
                  </div>
                  <h2 className={styles.modalTitle}>{selectedSpace.title}</h2>
                  <p className={styles.modalSubtitle}>By OpenVals • {selectedSpace.daysAgo} days ago</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSpace(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalStatsGrid}>
                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Category</div>
                    <div className={styles.statValue}>{selectedSpace.category}</div>
                  </div>
                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Total Uses</div>
                    <div className={styles.statValue}>{selectedSpace.uses}</div>
                  </div>
                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Runtime</div>
                    <div className={styles.statValue}>{selectedSpace.runtime}</div>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Description</h4>
                  <p className={styles.modalSectionText}>{selectedSpace.description}</p>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <Link
                  href="https://dev.openvalidations.com/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalCtaBtn}
                >
                  Open in Validation Workspace <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
