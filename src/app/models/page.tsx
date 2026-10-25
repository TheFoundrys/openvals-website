"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Gauge,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import allModelsJson from "@/data/allModelsData.json";
import styles from "./models.module.css";

interface ModelItem {
  id: number;
  name: string;
  version?: string;
  provider: string;
  architecture: string;
  primaryUseCase: string;
  tags?: string[];
  decisionStatus: string;
  overallFitScore: number | null;
  lastAssessedAt: string;
  lifecycle?: string;
  bestUse?: string;
  guardrailsActive?: number;
  benchmarks?: Record<string, number>;
}

interface FacetItem {
  value: string;
  count: number;
}

interface Facets {
  providers: FacetItem[];
  lifecycles: FacetItem[];
  decisionStatuses: FacetItem[];
  architectures: FacetItem[];
}

const PROVIDER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  OpenAI: { bg: "rgba(16, 185, 129, 0.12)", text: "#059669", border: "rgba(16, 185, 129, 0.3)" },
  Anthropic: { bg: "rgba(249, 115, 22, 0.12)", text: "#ea580c", border: "rgba(249, 115, 22, 0.3)" },
  Mistral: { bg: "rgba(245, 158, 11, 0.12)", text: "#d97706", border: "rgba(245, 158, 11, 0.3)" },
  Meta: { bg: "rgba(59, 130, 246, 0.12)", text: "#2563eb", border: "rgba(59, 130, 246, 0.3)" },
  "Hugging Face": { bg: "rgba(234, 179, 8, 0.15)", text: "#ca8a04", border: "rgba(234, 179, 8, 0.35)" },
  "AWS Bedrock": { bg: "rgba(249, 115, 22, 0.12)", text: "#ea580c", border: "rgba(249, 115, 22, 0.3)" },
  "Azure AI": { bg: "rgba(14, 165, 233, 0.12)", text: "#0284c7", border: "rgba(14, 165, 233, 0.3)" },
  "Google Vertex AI": { bg: "rgba(34, 197, 94, 0.12)", text: "#16a34a", border: "rgba(34, 197, 94, 0.3)" },
  "Google Gemini": { bg: "rgba(59, 130, 246, 0.12)", text: "#2563eb", border: "rgba(59, 130, 246, 0.3)" },
  "NVIDIA NIM": { bg: "rgba(118, 185, 0, 0.15)", text: "#4d7c0f", border: "rgba(118, 185, 0, 0.35)" },
  Cohere: { bg: "rgba(147, 51, 234, 0.12)", text: "#9333ea", border: "rgba(147, 51, 234, 0.3)" },
  CivitAI: { bg: "rgba(236, 72, 153, 0.12)", text: "#db2777", border: "rgba(236, 72, 153, 0.3)" },
  Ollama: { bg: "rgba(99, 102, 241, 0.12)", text: "#4f46e5", border: "rgba(99, 102, 241, 0.3)" },
  "Custom / In-House": { bg: "rgba(100, 116, 139, 0.12)", text: "#475569", border: "rgba(100, 116, 139, 0.3)" },
  "Z.Ai": { bg: "rgba(168, 85, 247, 0.12)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" },
};

const DOT_COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#f43f5e",
  "#06b6d4",
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
  { key: "provider", label: "Providers" },
  { key: "lifecycle", label: "Lifecycle" },
  { key: "architecture", label: "Architecture" },
];

const SORT_OPTIONS = [
  { value: "trending", label: "Sort: Trending" },
  { value: "recent", label: "Sort: Recently assessed" },
  { value: "name", label: "Sort: Name A–Z" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 20, label: "20 / page" },
  { value: 50, label: "50 / page" },
  { value: 100, label: "100 / page" },
  { value: 500, label: "Show All" },
];

function formatDate(dateStr: string) {
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

export default function ModelsRegistryPage() {
  // Load full 376 models dataset
  const fullModelsList = useMemo(() => {
    return ((allModelsJson?.data?.items as ModelItem[]) || []);
  }, []);

  const [allModels, setAllModels] = useState<ModelItem[]>(fullModelsList);
  const [facets, setFacets] = useState<Facets>(
    (allModelsJson?.data?.facets as Facets) || {
      providers: [],
      lifecycles: [],
      decisionStatuses: [],
      architectures: [],
    }
  );

  // Filters & State
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [fullText, setFullText] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("trending");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string | undefined>(undefined);
  const [selectedArchitecture, setSelectedArchitecture] = useState<string | undefined>(undefined);
  const [minFitScore, setMinFitScore] = useState<number>(0);

  // Detail Modal State
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync with live server API proxy in background (no CORS issues)
  useEffect(() => {
    async function syncRemoteData() {
      try {
        const res = await fetch("/api/models?page=1&pageSize=500");
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.items && json.data.items.length > 0) {
            setAllModels(json.data.items);
            if (json.data.facets) {
              setFacets(json.data.facets);
            }
          }
        }
      } catch (err) {
        console.warn("Using offline complete models registry", err);
      }
    }
    syncRemoteData();
  }, []);

  // Filter and sort the models
  const filteredModels = useMemo(() => {
    return allModels.filter((model) => {
      // Provider filter
      if (selectedProvider && model.provider !== selectedProvider) {
        return false;
      }
      // Lifecycle filter
      if (selectedLifecycle && (model.lifecycle || "Active") !== selectedLifecycle) {
        return false;
      }
      // Architecture filter
      if (selectedArchitecture && model.architecture !== selectedArchitecture) {
        return false;
      }
      // Min score filter
      if (minFitScore > 0 && (model.overallFitScore === null || model.overallFitScore < minFitScore)) {
        return false;
      }
      // Search query filter
      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase();
        const matchesName = model.name.toLowerCase().includes(q);
        const matchesProvider = model.provider.toLowerCase().includes(q);
        const matchesUseCase = model.primaryUseCase?.toLowerCase().includes(q);
        const matchesArch = model.architecture?.toLowerCase().includes(q);
        const matchesTags = model.tags?.some((t) => t.toLowerCase().includes(q));

        if (fullText) {
          if (!matchesName && !matchesProvider && !matchesUseCase && !matchesArch && !matchesTags) {
            return false;
          }
        } else {
          if (!matchesName && !matchesProvider) {
            return false;
          }
        }
      }
      return true;
    });
  }, [allModels, selectedProvider, selectedLifecycle, selectedArchitecture, minFitScore, debouncedQuery, fullText]);

  // Sort the filtered models
  const sortedModels = useMemo(() => {
    const list = [...filteredModels];
    if (sort === "trending") {
      list.sort((a, b) => (b.overallFitScore ?? 0) - (a.overallFitScore ?? 0));
    } else if (sort === "recent") {
      list.sort((a, b) => new Date(b.lastAssessedAt).getTime() - new Date(a.lastAssessedAt).getTime());
    } else if (sort === "name") {
      list.sort((a, b) => `${a.provider} ${a.name}`.localeCompare(`${b.provider} ${b.name}`));
    }
    return list;
  }, [filteredModels, sort]);

  // Paginate models
  const paginatedModels = useMemo(() => {
    if (pageSize >= 500) {
      return sortedModels;
    }
    const start = (page - 1) * pageSize;
    return sortedModels.slice(start, start + pageSize);
  }, [sortedModels, page, pageSize]);

  const totalFiltered = sortedModels.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const hasActiveFilters = Boolean(
    selectedProvider ||
    selectedLifecycle ||
    selectedArchitecture ||
    minFitScore > 0 ||
    debouncedQuery.trim() ||
    fullText
  );

  const clearAllFilters = () => {
    setSelectedProvider(undefined);
    setSelectedLifecycle(undefined);
    setSelectedArchitecture(undefined);
    setMinFitScore(0);
    setSearchQuery("");
    setDebouncedQuery("");
    setFullText(false);
    setPage(1);
  };

  // Pagination page numbers generator
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }
    return range;
  }, [page, totalPages]);

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
              {/* Providers facet */}
              {(activeTab === "all" || activeTab === "provider") && facets.providers.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Providers</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.providers.map((item, idx) => {
                      const isSelected = selectedProvider === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedProvider(isSelected ? undefined : item.value);
                            setPage(1);
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
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Lifecycle facet */}
              {(activeTab === "all" || activeTab === "lifecycle") && facets.lifecycles.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Lifecycle</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.lifecycles.map((item, idx) => {
                      const isSelected = selectedLifecycle === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedLifecycle(isSelected ? undefined : item.value);
                            setPage(1);
                          }}
                          className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ""}`}
                          title={`${item.value} (${item.count})`}
                        >
                          <span
                            className={styles.filterDot}
                            style={{ backgroundColor: DOT_COLORS[(idx + 4) % DOT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className={styles.filterPillText}>{item.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Architecture facet */}
              {(activeTab === "all" || activeTab === "architecture") && facets.architectures.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Architecture</h3>
                  <div className={styles.filterPillsGrid}>
                    {facets.architectures.map((item, idx) => {
                      const isSelected = selectedArchitecture === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setSelectedArchitecture(isSelected ? undefined : item.value);
                            setPage(1);
                          }}
                          className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ""}`}
                          title={`${item.value} (${item.count})`}
                        >
                          <span
                            className={styles.filterDot}
                            style={{ backgroundColor: DOT_COLORS[(idx + 8) % DOT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className={styles.filterPillText}>{item.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Min Fit Score Slider */}
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Min fit score</h3>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={minFitScore}
                  onChange={(e) => {
                    setMinFitScore(Number(e.target.value));
                    setPage(1);
                  }}
                  className={styles.sliderInput}
                  aria-label="Minimum fit score"
                />
                <div className={styles.sliderLabels}>
                  <span>0</span>
                  <span className={styles.sliderValue}>{minFitScore}+</span>
                  <span>100</span>
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
                <div className={styles.modelsCountHeading}>
                  <h1>Models</h1>
                  <span className={styles.modelsCountBadge}>
                    {totalFiltered.toLocaleString()}
                    {totalFiltered !== allModels.length && ` (of ${allModels.length})`}
                  </span>
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
                      aria-label="Filter models by name"
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
                    onClick={() => {
                      setFullText(!fullText);
                      setPage(1);
                    }}
                    aria-pressed={fullText}
                    className={`${styles.fullTextBtn} ${fullText ? styles.fullTextBtnActive : ""}`}
                  >
                    Full-text search
                  </button>

                  {/* PAGE SIZE SELECTOR */}
                  <div className={styles.sortSelectWrap}>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className={styles.sortSelect}
                      aria-label="Models per page"
                    >
                      {PAGE_SIZE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className={styles.sortSelectIcon} size={14} />
                  </div>

                  {/* SORT DROPDOWN */}
                  <div className={styles.sortSelectWrap}>
                    <select
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                      }}
                      className={styles.sortSelect}
                      aria-label="Sort models"
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

              {/* MODELS LIST */}
              {paginatedModels.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>No models match the current filters</p>
                  <p className={styles.emptySubtitle}>Try clearing filters or using a different search term.</p>
                  {hasActiveFilters && (
                    <button type="button" onClick={clearAllFilters} className={styles.emptyClearBtn}>
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.modelsList}>
                  {paginatedModels.map((model) => {
                    const providerStyle =
                      PROVIDER_COLORS[model.provider] || {
                        bg: "rgba(99, 102, 241, 0.12)",
                        text: "#4f46e5",
                        border: "rgba(99, 102, 241, 0.3)",
                      };

                    return (
                      <div
                        key={model.id}
                        className={styles.modelCard}
                        onClick={() => setSelectedModel(model)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedModel(model);
                          }
                        }}
                      >
                        {/* Provider Avatar */}
                        <div
                          className={styles.providerAvatar}
                          style={{
                            backgroundColor: providerStyle.bg,
                            color: providerStyle.text,
                            borderColor: providerStyle.border,
                          }}
                        >
                          {model.provider.slice(0, 1)}
                        </div>

                        {/* Model Info */}
                        <div className={styles.modelInfo}>
                          <h3 className={styles.modelTitle}>
                            <span className={styles.modelProvider}>{model.provider}</span>
                            <span className={styles.modelDivider}>/</span>
                            <span className={styles.modelName}>{model.name}</span>
                          </h3>

                          <div className={styles.modelMeta}>
                            <span className={styles.metaArchitecture}>{model.architecture}</span>
                            <span className={styles.metaBullet}>•</span>
                            <span className={styles.metaUseCase} title={model.primaryUseCase}>
                              {model.primaryUseCase}
                            </span>
                            {model.lastAssessedAt && (
                              <>
                                <span className={styles.metaBullet}>•</span>
                                <span className={styles.metaDate}>
                                  Assessed {formatDate(model.lastAssessedAt)}
                                </span>
                              </>
                            )}
                            <span className={styles.metaBullet}>•</span>
                            <span
                              className={`${styles.decisionStatus} ${
                                model.decisionStatus === "Approved"
                                  ? styles.statusApproved
                                  : model.decisionStatus === "Rejected"
                                  ? styles.statusRejected
                                  : styles.statusReview
                              }`}
                            >
                              ● {model.decisionStatus}
                            </span>
                            {model.overallFitScore !== null && (
                              <span className={styles.fitScore}>
                                <Gauge size={13} className={styles.gaugeIcon} />
                                <span>{Math.round(model.overallFitScore)}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow Right */}
                        <div className={styles.modelArrowWrap}>
                          <ArrowRight size={16} className={styles.modelArrow} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && pageSize < 500 && (
                <nav className={styles.pagination} aria-label="Pagination">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => {
                      setPage(page - 1);
                      window.scrollTo({ top: 180, behavior: "smooth" });
                    }}
                    className={styles.paginationNavBtn}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <div className={styles.paginationPages}>
                    {paginationRange.map((pageNum, idx) => {
                      const prev = paginationRange[idx - 1];
                      const showEllipsis = prev && pageNum - prev > 1;
                      return (
                        <React.Fragment key={pageNum}>
                          {showEllipsis && <span className={styles.paginationEllipsis}>…</span>}
                          <button
                            type="button"
                            onClick={() => {
                              setPage(pageNum);
                              window.scrollTo({ top: 180, behavior: "smooth" });
                            }}
                            className={`${styles.paginationPageBtn} ${
                              page === pageNum ? styles.paginationPageBtnActive : ""
                            }`}
                            aria-current={page === pageNum ? "page" : undefined}
                          >
                            {pageNum}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage(page + 1);
                      window.scrollTo({ top: 180, behavior: "smooth" });
                    }}
                    className={styles.paginationNavBtn}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </nav>
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

        {/* MODEL DETAILS MODAL */}
        {selectedModel && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedModel(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderLeft}>
                  <div
                    className={styles.modalAvatar}
                    style={{
                      backgroundColor:
                        PROVIDER_COLORS[selectedModel.provider]?.bg || "rgba(99, 102, 241, 0.12)",
                      color:
                        PROVIDER_COLORS[selectedModel.provider]?.text || "#4f46e5",
                    }}
                  >
                    {selectedModel.provider.slice(0, 1)}
                  </div>
                  <div>
                    <h2 className={styles.modalTitle}>
                      {selectedModel.provider} / {selectedModel.name}
                    </h2>
                    <p className={styles.modalSubtitle}>
                      {selectedModel.architecture} {selectedModel.version ? `• v${selectedModel.version}` : ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModel(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={styles.modalBody}>
                {/* STATUS & SCORE ROW */}
                <div className={styles.modalStatsGrid}>
                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Decision Status</div>
                    <div
                      className={`${styles.statValue} ${
                        selectedModel.decisionStatus === "Approved"
                          ? styles.statusApproved
                          : selectedModel.decisionStatus === "Rejected"
                          ? styles.statusRejected
                          : styles.statusReview
                      }`}
                    >
                      ● {selectedModel.decisionStatus}
                    </div>
                  </div>

                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Overall Fit Score</div>
                    <div className={styles.statValueScore}>
                      <Gauge size={18} />
                      <span>{selectedModel.overallFitScore ? Math.round(selectedModel.overallFitScore) : "N/A"}/100</span>
                    </div>
                  </div>

                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Lifecycle</div>
                    <div className={styles.statValue}>{selectedModel.lifecycle || "Active"}</div>
                  </div>
                </div>

                {/* DETAILS SECTIONS */}
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Primary Use Case</h4>
                  <p className={styles.modalSectionText}>{selectedModel.primaryUseCase}</p>
                </div>

                {selectedModel.bestUse && (
                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Best Use Scenario</h4>
                    <p className={styles.modalSectionText}>{selectedModel.bestUse}</p>
                  </div>
                )}

                {selectedModel.tags && selectedModel.tags.length > 0 && (
                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Tags &amp; Capabilities</h4>
                    <div className={styles.modalTagsWrap}>
                      {selectedModel.tags.map((tag) => (
                        <span key={tag} className={styles.modalTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Assessed Information</h4>
                  <p className={styles.modalSectionText}>
                    Last validated: {formatDate(selectedModel.lastAssessedAt)}
                  </p>
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
