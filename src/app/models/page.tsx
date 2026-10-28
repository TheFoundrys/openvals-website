"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { AGGREGATED_MODELS, AggregatedModel } from "@/components/modelBenchmarkData";
import styles from "./models.module.css";

export interface ModelItem {
  id: string;
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
  // Sheet benchmark evaluation data
  params: string;
  size: string;
  accuracy: string;
  accuracyNum: number;
  semantic: string;
  latency: string;
  factuality: string;
  hallucination: string;
  safety: string;
  reliability: string;
  drs: string;
  drsNum: number;
  rank: string;
  runsCount: number;
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
  Alibaba: { bg: "rgba(243, 131, 43, 0.12)", text: "#f3832b", border: "rgba(243, 131, 43, 0.3)" },
  "Alibaba Cloud": { bg: "rgba(243, 131, 43, 0.12)", text: "#f3832b", border: "rgba(243, 131, 43, 0.3)" },
  Deepseek: { bg: "rgba(30, 64, 175, 0.12)", text: "#3b82f6", border: "rgba(30, 64, 175, 0.3)" },
  Google: { bg: "rgba(70, 177, 124, 0.12)", text: "#10b981", border: "rgba(70, 177, 124, 0.3)" },
  Meta: { bg: "rgba(82, 142, 240, 0.12)", text: "#3b82f6", border: "rgba(82, 142, 240, 0.3)" },
  Microsoft: { bg: "rgba(0, 164, 239, 0.12)", text: "#0ea5e9", border: "rgba(0, 164, 239, 0.3)" },
  IBM: { bg: "rgba(15, 98, 254, 0.12)", text: "#2563eb", border: "rgba(15, 98, 254, 0.3)" },
  "Liquid AI": { bg: "rgba(2, 132, 199, 0.12)", text: "#0284c7", border: "rgba(2, 132, 199, 0.3)" },
  "Hugging Face": { bg: "rgba(245, 158, 11, 0.12)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.3)" },
  "Mistral AI": { bg: "rgba(216, 179, 53, 0.12)", text: "#d97706", border: "rgba(216, 179, 53, 0.3)" },
  "Stability AI": { bg: "rgba(168, 85, 247, 0.12)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" },
  "Nous Research": { bg: "rgba(84, 109, 136, 0.12)", text: "#64748b", border: "rgba(84, 109, 136, 0.3)" },
  "Open Source": { bg: "rgba(100, 116, 139, 0.12)", text: "#94a3b8", border: "rgba(100, 116, 139, 0.3)" },
  TII: { bg: "rgba(14, 165, 233, 0.12)", text: "#0ea5e9", border: "rgba(14, 165, 233, 0.3)" },
  "01.AI": { bg: "rgba(73, 143, 240, 0.12)", text: "#3b82f6", border: "rgba(73, 143, 240, 0.3)" },
  Agentica: { bg: "rgba(223, 139, 124, 0.12)", text: "#f87171", border: "rgba(223, 139, 124, 0.3)" },
  Tencent: { bg: "rgba(58, 58, 58, 0.12)", text: "#a3a3a3", border: "rgba(58, 58, 58, 0.3)" },
  "Prism ML": { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" },
  QVAC: { bg: "rgba(124, 58, 237, 0.12)", text: "#8b5cf6", border: "rgba(124, 58, 237, 0.3)" },
  "Big Science": { bg: "rgba(112, 128, 146, 0.12)", text: "#64748b", border: "rgba(112, 128, 146, 0.3)" },
  NVIDIA: { bg: "rgba(118, 185, 0, 0.15)", text: "#4d7c0f", border: "rgba(118, 185, 0, 0.35)" },
  Apple: { bg: "rgba(163, 163, 163, 0.12)", text: "#a3a3a3", border: "rgba(163, 163, 163, 0.3)" },
  AMD: { bg: "rgba(239, 68, 68, 0.12)", text: "#ef4444", border: "rgba(239, 68, 68, 0.3)" },
  Baidu: { bg: "rgba(37, 99, 235, 0.12)", text: "#2563eb", border: "rgba(37, 99, 235, 0.3)" },
  Cohere: { bg: "rgba(147, 51, 234, 0.12)", text: "#9333ea", border: "rgba(147, 51, 234, 0.3)" },
  "Doey LLM": { bg: "rgba(231, 164, 79, 0.12)", text: "#e7a44f", border: "rgba(231, 164, 79, 0.3)" },
  Supra: { bg: "rgba(142, 200, 76, 0.12)", text: "#8ec84c", border: "rgba(142, 200, 76, 0.3)" },
  "PROMTECH Inc": { bg: "rgba(234, 179, 8, 0.12)", text: "#eab308", border: "rgba(234, 179, 8, 0.3)" },
  "North ML": { bg: "rgba(91, 102, 112, 0.12)", text: "#5b6670", border: "rgba(91, 102, 112, 0.3)" },
  "Open BMB": { bg: "rgba(99, 102, 241, 0.12)", text: "#6366f1", border: "rgba(99, 102, 241, 0.3)" },
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

const SORT_OPTIONS = [
  { value: "trending", label: "Sort: DRS Trust Score" },
  { value: "accuracy", label: "Sort: Accuracy (High to Low)" },
  { value: "latency", label: "Sort: Fastest Latency" },
  { value: "name", label: "Sort: Name A–Z" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 20, label: "20 / page" },
  { value: 50, label: "50 / page" },
  { value: 100, label: "100 / page" },
  { value: 500, label: "Show All" },
];

function cleanProviderName(rawLab: string): string {
  if (!rawLab) return "Open Source";
  const l = rawLab.trim();
  if (l.includes("Alibaba") || l.toLowerCase().includes("qwen")) return "Alibaba";
  if (l.includes("Technology Innovation Institute") || l === "TII") return "TII";
  if (l.startsWith("Stability")) return "Stability AI";
  if (l.includes("Google Gemma") || l === "Google") return "Google";
  if (l.toLowerCase().includes("bigscience") || l.toLowerCase().includes("big science")) return "Big Science";
  if (l.toLowerCase().includes("open-source") || l.toLowerCase().includes("open source")) return "Open Source";
  return l;
}

function cleanParamSize(rawParam: string): string {
  if (!rawParam) return "Other";
  const p = rawParam.toLowerCase().trim();
  if (
    p.includes("350m") ||
    p.includes("500m") ||
    p.includes("560m") ||
    p.includes("494") ||
    p.includes("45b") ||
    p.includes("41b") ||
    p.includes("360m") ||
    p.includes("270m") ||
    p.includes("135m") ||
    p.includes("121m") ||
    p.includes("0.27") ||
    p.includes("0.3") ||
    p.includes("0.5b") ||
    p.includes("0.6b") ||
    p.includes("0.8b") ||
    p.includes("0.05")
  ) {
    return "< 1B";
  }
  if (p === "1b" || p === "1.0b" || p === "1 b" || p.includes("1.1b") || p.includes("1.2b") || p.includes("1.24b") || p.includes("1.3b")) {
    return "1B";
  }
  if (p.includes("1.5b") || p.includes("1.54b") || p.includes("1.6b") || p.includes("1.6 billion") || p.includes("1.7b") || p.includes("1.8b")) {
    return "1.5B - 2B";
  }
  if (p === "2b" || p === "2.0b" || p.includes("2.2b") || p.includes("2.4b") || p.includes("2.7b") || p.includes("e2b")) {
    return "2B - 3B";
  }
  if (p.startsWith("3b") || p.startsWith("3.0b") || p.startsWith("3.8b") || p.startsWith("4b") || p.startsWith("4.0b")) {
    return "3B - 4B";
  }
  if (p.startsWith("7b") || p.startsWith("7.9b")) {
    return "7B";
  }
  if (p.startsWith("8b") || p.startsWith("12b")) {
    return "8B+";
  }
  return rawParam.toUpperCase();
}

function mapSheetModelToItem(m: AggregatedModel, index: number): ModelItem {
  const drsNum = m.drsNum || 0;
  const status =
    drsNum >= 0.75 ? "Approved" : drsNum >= 0.55 ? "In Review" : "Needs Review";

  const lifecycle =
    drsNum >= 0.75
      ? "Production Ready"
      : drsNum >= 0.55
      ? "Active Benchmark"
      : "High Risk Candidate";

  const provider = cleanProviderName(m.lab);

  return {
    id: m.id || `sheet-model-${index + 1}`,
    name: m.name,
    version: m.params,
    provider,
    architecture: m.params ? `${m.params.toUpperCase()}${m.size ? ` • ${m.size}` : ""}` : "Dense LLM",
    primaryUseCase: `Accuracy ${m.accuracy} • DRS ${m.drs} • Factuality ${m.factuality} • Latency ${m.latency}`,
    tags: [
      m.params,
      m.size,
      provider,
      `${m.accuracy} Acc`,
      `DRS ${m.drs}`,
      `HPI ${m.hallucination}`,
    ].filter(Boolean),
    decisionStatus: status,
    overallFitScore: Math.round(drsNum * 100),
    lastAssessedAt: "2026-10-27T10:00:00Z",
    lifecycle,
    bestUse: `Evaluated across multi-turn benchmarks with ${m.accuracy} accuracy, ${m.factuality} factuality alignment, and ${m.latency} latency.`,
    params: m.params,
    size: m.size,
    accuracy: m.accuracy,
    accuracyNum: m.accuracyNum,
    semantic: m.semantic,
    latency: m.latency,
    factuality: m.factuality,
    hallucination: m.hallucination,
    safety: m.safety,
    reliability: m.reliability,
    drs: m.drs,
    drsNum: m.drsNum,
    rank: m.rank,
    runsCount: m.runsCount,
  };
}

function computeFacetsFromModels(models: ModelItem[]): Facets {
  const providerCounts: Record<string, number> = {};
  const lifecycleCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};
  const archCounts: Record<string, number> = {};

  for (const m of models) {
    if (m.provider) {
      providerCounts[m.provider] = (providerCounts[m.provider] || 0) + 1;
    }
    const lc = m.lifecycle || "Active";
    lifecycleCounts[lc] = (lifecycleCounts[lc] || 0) + 1;

    if (m.decisionStatus) {
      statusCounts[m.decisionStatus] = (statusCounts[m.decisionStatus] || 0) + 1;
    }
    const paramKey = cleanParamSize(m.params);
    archCounts[paramKey] = (archCounts[paramKey] || 0) + 1;
  }

  const toFacetList = (counts: Record<string, number>) =>
    Object.entries(counts)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);

  return {
    providers: toFacetList(providerCounts),
    lifecycles: toFacetList(lifecycleCounts),
    decisionStatuses: toFacetList(statusCounts),
    architectures: toFacetList(archCounts),
  };
}

export default function ModelsRegistryPage() {
  // Load models from the SharePoint tracker sheet via AGGREGATED_MODELS
  const sheetModels = useMemo(() => {
    return AGGREGATED_MODELS.map(mapSheetModelToItem);
  }, []);

  const [allModels] = useState<ModelItem[]>(sheetModels);
  const facets = useMemo(() => computeFacetsFromModels(allModels), [allModels]);

  // Filters & State
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

  // Read search query param from URL on initial load if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search") || params.get("q");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
      // Architecture / Param bucket filter
      if (selectedArchitecture) {
        const bucket = cleanParamSize(model.params);
        if (bucket !== selectedArchitecture) {
          return false;
        }
      }
      // Min score filter (DRS * 100)
      if (
        minFitScore > 0 &&
        (model.overallFitScore === null || model.overallFitScore < minFitScore)
      ) {
        return false;
      }
      // Search query filter
      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase();
        const matchesName = model.name.toLowerCase().includes(q);
        const matchesProvider = model.provider.toLowerCase().includes(q);
        const matchesParams = model.params.toLowerCase().includes(q);
        const matchesUseCase = model.primaryUseCase?.toLowerCase().includes(q);
        const matchesTags = model.tags?.some((t) => t.toLowerCase().includes(q));

        if (fullText) {
          if (!matchesName && !matchesProvider && !matchesParams && !matchesUseCase && !matchesTags) {
            return false;
          }
        } else {
          if (!matchesName && !matchesProvider && !matchesParams) {
            return false;
          }
        }
      }
      return true;
    });
  }, [
    allModels,
    selectedProvider,
    selectedLifecycle,
    selectedArchitecture,
    minFitScore,
    debouncedQuery,
    fullText,
  ]);

  // Sort the filtered models
  const sortedModels = useMemo(() => {
    const list = [...filteredModels];
    if (sort === "trending") {
      list.sort((a, b) => (b.drsNum ?? 0) - (a.drsNum ?? 0));
    } else if (sort === "accuracy") {
      list.sort((a, b) => (b.accuracyNum ?? 0) - (a.accuracyNum ?? 0));
    } else if (sort === "latency") {
      const parseLat = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 999999;
      list.sort((a, b) => parseLat(a.latency) - parseLat(b.latency));
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
          {/* MAIN GRID: SIDEBAR + CONTENT */}
          <div className={styles.mainGrid}>
            {/* SIDEBAR FILTERS */}
            <aside className={styles.sidebar}>
              {/* Providers facet */}
              {facets.providers.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Providers / Labs</h3>
                  <div className={styles.filterPillsList}>
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
                          <div className={styles.filterPillLeft}>
                            <span
                              className={styles.filterDot}
                              style={{ backgroundColor: DOT_COLORS[idx % DOT_COLORS.length] }}
                              aria-hidden="true"
                            />
                            <span className={styles.filterPillText}>{item.value}</span>
                          </div>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Architecture / Param size facet */}
              {facets.architectures.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Parameters / Size</h3>
                  <div className={styles.filterPillsList}>
                    {facets.architectures.map((item, idx) => {
                      const isSelected =
                        selectedArchitecture?.toLowerCase() === item.value.toLowerCase();
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
                          <div className={styles.filterPillLeft}>
                            <span
                              className={styles.filterDot}
                              style={{ backgroundColor: DOT_COLORS[(idx + 4) % DOT_COLORS.length] }}
                              aria-hidden="true"
                            />
                            <span className={styles.filterPillText}>{item.value}</span>
                          </div>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Lifecycle facet */}
              {facets.lifecycles.length > 0 && (
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Lifecycle</h3>
                  <div className={styles.filterPillsList}>
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
                          <div className={styles.filterPillLeft}>
                            <span
                              className={styles.filterDot}
                              style={{ backgroundColor: DOT_COLORS[(idx + 8) % DOT_COLORS.length] }}
                              aria-hidden="true"
                            />
                            <span className={styles.filterPillText}>{item.value}</span>
                          </div>
                          <span className={styles.filterCount}>{item.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Min DRS Fit Score Slider */}
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Min DRS Trust Score</h3>
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

            {/* MAIN CONTENT AREA */}
            <div className={styles.contentArea}>
              {/* TOP CONTROLS BAR */}
              <div className={styles.controlsBar}>
                {/* SEARCH INPUT */}
                <div className={styles.searchInputWrap}>
                  <Search className={styles.searchIcon} size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search models by name, provider, or size..."
                    className={styles.searchInput}
                    aria-label="Search models"
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

                {/* RIGHT ACTIONS: FULL TEXT, PAGE SIZE, SORT */}
                <div className={styles.rightControls}>
                  {/* FULL TEXT TOGGLE */}
                  <button
                    type="button"
                    onClick={() => setFullText(!fullText)}
                    className={`${styles.fullTextBtn} ${fullText ? styles.fullTextBtnActive : ""}`}
                    title="Toggle full-text search across all benchmark metadata"
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

                          {/* META: ARCHITECTURE + DRS FIT SCORE */}
                          <div className={styles.modelMeta}>
                            <span className={styles.metaArchitecture}>{model.architecture}</span>
                            {model.overallFitScore !== null && (
                              <span className={styles.fitScore} title="Decision Reliability Score">
                                <Gauge size={13} className={styles.gaugeIcon} />
                                <span>{Math.round(model.overallFitScore)}</span>
                              </span>
                            )}
                          </div>

                          {/* Mini metrics row directly from sheet */}
                          <div className={styles.modelMetricsRow}>
                            <span className={styles.modelMetricBadge}>
                              Acc: {model.accuracy}
                            </span>
                            <span className={styles.modelMetricBadge}>
                              DRS: {model.drs}
                            </span>
                            <span className={styles.modelMetricBadge}>
                              HPI: {model.hallucination}
                            </span>
                            <span className={styles.modelMetricBadge}>
                              Lat: {model.latency}
                            </span>
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
                  <div className={styles.modalHeaderMeta}>
                    <h2 className={styles.modalTitle}>
                      {selectedModel.provider} / {selectedModel.name}
                    </h2>
                    <p className={styles.modalSubtitle}>
                      {selectedModel.params ? selectedModel.params.toUpperCase() : "LLM"} • {selectedModel.size}
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
                    <div className={styles.statLabel}>DRS Trust Score</div>
                    <div className={styles.statValueScore}>
                      <Gauge size={18} />
                      <span>{selectedModel.overallFitScore !== null && selectedModel.overallFitScore !== undefined ? Math.round(selectedModel.overallFitScore) : "N/A"}/100</span>
                    </div>
                  </div>

                  <div className={styles.modalStatCard}>
                    <div className={styles.statLabel}>Benchmark Rank</div>
                    <div className={styles.statValue}>#{selectedModel.rank}</div>
                  </div>
                </div>

                {/* 8-METRIC EVALUATION GRID (FROM SHEET) */}
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Evaluation Benchmark Signals</h4>
                  <div className={styles.modalMetricsGrid}>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Accuracy</span>
                      <span className={styles.modalMetricVal}>{selectedModel.accuracy}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Semantic</span>
                      <span className={styles.modalMetricVal}>{selectedModel.semantic}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Latency</span>
                      <span className={styles.modalMetricVal}>{selectedModel.latency}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Factuality</span>
                      <span className={styles.modalMetricVal}>{selectedModel.factuality}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Hallucination</span>
                      <span className={styles.modalMetricVal}>{selectedModel.hallucination}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Safety</span>
                      <span className={styles.modalMetricVal}>{selectedModel.safety}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>Reliability</span>
                      <span className={styles.modalMetricVal}>{selectedModel.reliability}</span>
                    </div>
                    <div className={styles.modalMetricCard}>
                      <span className={styles.modalMetricLabel}>DRS Score</span>
                      <span className={styles.modalMetricVal}>{selectedModel.drs}</span>
                    </div>
                  </div>
                </div>

                {/* DETAILS SECTIONS */}
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Lifecycle &amp; Best Use</h4>
                  <p className={styles.modalSectionText}>
                    <strong>{selectedModel.lifecycle}</strong>: {selectedModel.bestUse}
                  </p>
                </div>

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
