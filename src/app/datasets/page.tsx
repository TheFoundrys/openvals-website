"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowRight,
  X,
  Eye,
  ShieldCheck,
  Download,
  Heart,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import allDatasetsJson from "@/data/allDatasetsData.json";
import styles from "./datasets.module.css";

interface DatasetItem {
  slug: string;
  name: string;
  owner: string;
  description: string;
  modality: string;
  format: string;
  dtype: string;
  sizeBucket: string;
  rows: number;
  uses: number;
  updatedAt: string;
  gateReady: boolean;
  preview: boolean;
}

interface FacetItem {
  value: string;
  count: number;
}

interface Facets {
  modalities: FacetItem[];
  formats: FacetItem[];
  dtypes: FacetItem[];
}

const DOT_COLORS = [
  "#2563eb",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#06b6d4",
  "#f43f5e",
  "#ea580c",
  "#65a30d",
  "#ec4899",
  "#3b82f6",
  "#14b8a6",
  "#e11d48",
  "#f97316",
  "#0ea5e9",
  "#84cc16",
];

const TABS = [
  { key: "all", label: "All" },
  { key: "modalities", label: "Modalities" },
  { key: "format", label: "Format" },
  { key: "type", label: "Type" },
];

const SORT_OPTIONS = [
  { value: "trending", label: "Sort: Trending" },
  { value: "uses", label: "Sort: Most used" },
  { value: "recent", label: "Sort: Recently updated" },
  { value: "name", label: "Sort: Name A–Z" },
];

function formatCompact(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return num.toString();
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function DatasetsPage() {
  const fullDatasetsList = useMemo(() => {
    return (allDatasetsJson?.data?.items as DatasetItem[]) || [];
  }, []);

  const [allDatasets, setAllDatasets] = useState<DatasetItem[]>(fullDatasetsList);
  const [facets, setFacets] = useState<Facets>(
    (allDatasetsJson?.data?.facets as Facets) || {
      modalities: [],
      formats: [],
      dtypes: [],
    }
  );

  // Filters & State
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [fullText, setFullText] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("trending");

  const [selectedModality, setSelectedModality] = useState<string | undefined>(undefined);
  const [selectedFormat, setSelectedFormat] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [sizeFilter, setSizeFilter] = useState<number>(0); // 0: any, 1: <1k, 2: 1k-100k, 3: >100k

  // Modal State
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);

  // Debounce search query
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
        const res = await fetch("/api/datasets?page=1&pageSize=500");
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.items && json.data.items.length > 0) {
            setAllDatasets(json.data.items);
            if (json.data.facets) {
              setFacets(json.data.facets);
            }
          }
        }
      } catch (err) {
        console.warn("Using offline cached datasets registry", err);
      }
    }
    syncRemoteData();
  }, []);

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    return allDatasets.filter((ds) => {
      if (selectedModality && ds.modality !== selectedModality) {
        return false;
      }
      if (selectedFormat && ds.format !== selectedFormat) {
        return false;
      }
      if (selectedType && ds.dtype !== selectedType) {
        return false;
      }
      if (sizeFilter === 1 && ds.rows >= 1000) {
        return false;
      }
      if (sizeFilter === 3 && ds.rows < 100000) {
        return false;
      }

      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase();
        const matchesName = ds.name.toLowerCase().includes(q);
        const matchesOwner = ds.owner.toLowerCase().includes(q);
        const matchesDesc = ds.description.toLowerCase().includes(q);
        const matchesType = ds.dtype.toLowerCase().includes(q);

        if (fullText) {
          if (!matchesName && !matchesOwner && !matchesDesc && !matchesType) {
            return false;
          }
        } else {
          if (!matchesName && !matchesOwner) {
            return false;
          }
        }
      }
      return true;
    });
  }, [allDatasets, selectedModality, selectedFormat, selectedType, sizeFilter, debouncedQuery, fullText]);

  // Sort datasets
  const sortedDatasets = useMemo(() => {
    const list = [...filteredDatasets];
    if (sort === "trending") {
      list.sort((a, b) => b.uses * 2 + b.rows - (a.uses * 2 + a.rows));
    } else if (sort === "uses") {
      list.sort((a, b) => b.uses - a.uses);
    } else if (sort === "recent") {
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sort === "name") {
      list.sort((a, b) => `${a.owner} ${a.name}`.localeCompare(`${b.owner} ${b.name}`));
    }
    return list;
  }, [filteredDatasets, sort]);

  const hasActiveFilters = Boolean(
    selectedModality ||
    selectedFormat ||
    selectedType ||
    sizeFilter > 0 ||
    debouncedQuery.trim() ||
    fullText
  );

  const clearAllFilters = () => {
    setSelectedModality(undefined);
    setSelectedFormat(undefined);
    setSelectedType(undefined);
    setSizeFilter(0);
    setSearchQuery("");
    setDebouncedQuery("");
    setFullText(false);
  };

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        <div className={styles.container}>
          {/* TOP NAVIGATION TABS */}
          <div className={styles.tabBar}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                }}
                className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN GRID: SIDEBAR + CONTENT */}
          <div className={styles.mainGrid}>
            {/* SIDEBAR FILTERS */}
            <aside className={styles.sidebar}>
              {/* Modalities facet */}
              {(activeTab === "all" || activeTab === "modalities") && facets.modalities.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Modalities</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.modalities.map((item, idx) => {
                      const isSelected = selectedModality === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedModality(isSelected ? undefined : item.value);
                          }}
                          className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ""}`}
                          title={`${item.value} (${item.count})`}
                        >
                          <span
                            className={styles.filterDot}
                            style={{ backgroundColor: DOT_COLORS[idx % DOT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className={styles.filterPillText}>{item.value}</span>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Format facet */}
              {(activeTab === "all" || activeTab === "format") && facets.formats.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Format</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.formats.map((item, idx) => {
                      const isSelected = selectedFormat === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedFormat(isSelected ? undefined : item.value);
                          }}
                          className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ""}`}
                          title={`${item.value} (${item.count})`}
                        >
                          <span
                            className={styles.filterDot}
                            style={{ backgroundColor: DOT_COLORS[(idx + 3) % DOT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className={styles.filterPillText}>{item.value}</span>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Type facet */}
              {(activeTab === "all" || activeTab === "type") && facets.dtypes.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Type</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.dtypes.map((item, idx) => {
                      const isSelected = selectedType === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedType(isSelected ? undefined : item.value);
                          }}
                          className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ""}`}
                          title={`${item.value} (${item.count})`}
                        >
                          <span
                            className={styles.filterDot}
                            style={{ backgroundColor: DOT_COLORS[(idx + 6) % DOT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className={styles.filterPillText}>{item.value}</span>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size (rows) Slider */}
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Size (rows)</h3>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(Number(e.target.value))}
                  className={styles.sliderInput}
                  aria-label="Size rows"
                />
                <div className={styles.sliderLabels}>
                  <span>&lt;1K</span>
                  <span className={styles.sliderValue}>{sizeFilter === 0 ? "any" : sizeFilter === 1 ? "<1K" : sizeFilter === 2 ? "1K-100K" : ">100M"}</span>
                  <span>&gt;100M</span>
                </div>
              </div>

              {/* Clear all filters */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className={styles.clearFiltersBtn}
                >
                  Clear all filters
                </button>
              )}
            </aside>

            {/* CONTENT AREA */}
            <div className={styles.contentArea}>
              {/* HEADER CONTROLS BAR */}
              <div className={styles.controlsBar}>
                <div className={styles.datasetsCountHeading}>
                  <h1>Datasets</h1>
                  <span className={styles.datasetsCountBadge}>{sortedDatasets.length}</span>
                </div>

                <div className={styles.rightControls}>
                  {/* SEARCH INPUT */}
                  <div className={styles.searchInputWrap}>
                    <Search className={styles.searchIcon} size={15} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by name"
                      className={styles.searchInput}
                      aria-label="Filter datasets by name"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className={styles.clearSearchBtn}
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* FULL TEXT SEARCH TOGGLE */}
                  <button
                    type="button"
                    onClick={() => setFullText(!fullText)}
                    aria-pressed={fullText}
                    className={`${styles.fullTextBtn} ${fullText ? styles.fullTextBtnActive : ""}`}
                  >
                    Full-text search
                  </button>

                  {/* SORT DROPDOWN */}
                  <div className={styles.sortSelectWrap}>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className={styles.sortSelect}
                      aria-label="Sort datasets"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className={styles.sortSelectIcon} size={14} />
                  </div>
                </div>
              </div>

              {/* DATASET CARDS GRID */}
              {sortedDatasets.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>No datasets match the current filters</p>
                  <p className={styles.emptySubtitle}>Try clearing filters or using a different search term.</p>
                  {hasActiveFilters && (
                    <button type="button" onClick={clearAllFilters} className={styles.emptyClearBtn}>
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.datasetsGrid}>
                  {sortedDatasets.map((dataset) => (
                    <div
                      key={dataset.slug}
                      className={styles.datasetCard}
                      onClick={() => setSelectedDataset(dataset)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedDataset(dataset);
                        }
                      }}
                    >
                      {/* Avatar */}
                      <div className={styles.datasetAvatar}>
                        {dataset.name.slice(0, 1).toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className={styles.datasetInfo}>
                        <h3 className={styles.datasetTitle}>
                          {dataset.owner}/{dataset.name}
                        </h3>

                        <div className={styles.datasetMeta}>
                          {dataset.preview && (
                            <span className={styles.metaBadge}>
                              <Eye size={13} /> Preview
                            </span>
                          )}

                          {dataset.gateReady && (
                            <span className={styles.metaBadge}>
                              <ShieldCheck size={13} /> Gate-ready
                            </span>
                          )}

                          <span
                            className={`${styles.typeBadge} ${
                              dataset.dtype === "Benchmark"
                                ? styles.typeBenchmark
                                : dataset.dtype === "Traces"
                                ? styles.typeTraces
                                : styles.typeRL
                            }`}
                          >
                            {dataset.dtype}
                          </span>

                          <span className={styles.metaDate}>
                            Updated {formatDate(dataset.updatedAt)}
                          </span>

                          <span className={styles.metaStat}>
                            <Download size={13} /> {formatCompact(dataset.rows)}
                          </span>

                          <span className={styles.metaStat}>
                            <Heart size={13} /> {formatCompact(dataset.uses)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
            </div>
          </div>
        </div>

        {/* DATASET DETAILS MODAL */}
        {selectedDataset && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedDataset(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderLeft}>
                  <div className={styles.modalAvatar}>
                    {selectedDataset.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h2 className={styles.modalTitle}>
                      {selectedDataset.owner} / {selectedDataset.name}
                    </h2>
                    <p className={styles.modalSubtitle}>
                      {selectedDataset.modality} • {selectedDataset.format.toUpperCase()} • {selectedDataset.dtype}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDataset(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.modalBody}>
                {/* STATS GRID */}
                <div className={styles.modalStatsGrid}>
                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Rows / Examples</div>
                    <div className={styles.statValue}>
                      {selectedDataset.rows.toLocaleString()}
                    </div>
                  </div>

                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Total Uses</div>
                    <div className={styles.statValue}>
                      {selectedDataset.uses.toLocaleString()}
                    </div>
                  </div>

                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Gate Status</div>
                    <div
                      className={`${styles.statValue} ${
                        selectedDataset.gateReady ? styles.statusGateReady : ""
                      }`}
                    >
                      {selectedDataset.gateReady ? "Gate-Ready" : "Standard"}
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Description</h4>
                  <p className={styles.modalSectionText}>{selectedDataset.description}</p>
                </div>

                {/* DETAILS */}
                <div className={styles.modalDetailsRow}>
                  <div>
                    <span className={styles.detailLabel}>Modality:</span>{" "}
                    <span className={styles.detailValue}>{selectedDataset.modality}</span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Format:</span>{" "}
                    <span className={styles.detailValue}>{selectedDataset.format}</span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Size Bucket:</span>{" "}
                    <span className={styles.detailValue}>{selectedDataset.sizeBucket}</span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Last Updated:</span>{" "}
                    <span className={styles.detailValue}>{formatDate(selectedDataset.updatedAt)}</span>
                  </div>
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
