"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Search,
  Gauge,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowUpDown,
  ListFilter,
  X,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AGGREGATED_MODELS, AggregatedModel } from "@/components/modelBenchmarkData";
import { LEADERBOARD_META, MIN_RUNS_TO_RANK, getLeaderboardRow } from "@/lib/leaderboard";
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
  /** Parameter count in billions, parsed from `params` (null if unknown) */
  paramsB: number | null;
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
  rank: number | null;
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
}

const FACET_PREVIEW_COUNT = 8;

const SORT_OPTIONS = [
  { value: "trending", label: "DRS Trust Score" },
  { value: "accuracy", label: "Accuracy" },
  { value: "latency", label: "Fastest latency" },
  { value: "name", label: "Name A–Z" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 500, label: "All" },
];

const HIGH_RISK_LIFECYCLE = "High Risk Candidate";

type FilterTab = "main" | "providers" | "lifecycle";

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "main", label: "Main" },
  { value: "providers", label: "Providers" },
  { value: "lifecycle", label: "Lifecycle" },
];

/** Lifecycle stages are derived from the DRS Trust Score (see mapSheetModelToItem) */
const LIFECYCLE_INFO: Record<string, string> = {
  "Production Ready": "DRS 75 and above",
  "Active Benchmark": "DRS 55–74",
  "High Risk Candidate": "DRS below 55",
};

/** Parameter-size slider stops, in billions. The last stop means "and up". */
const SIZE_STOPS = [0, 1, 2, 3, 4, 7, 8, 14, Infinity];
const SIZE_LABELS = ["0", "1B", "2B", "3B", "4B", "7B", "8B", "14B", "14B+"];
const SIZE_MAX_INDEX = SIZE_STOPS.length - 1;
/** Tick labels hidden when the filter column is narrow (3B, 7B, 14B) */
const MINOR_SIZE_TICKS = new Set([3, 5, 7]);

/** "1.5b" → 1.5, "360m" → 0.36, "e2b" → 2, "7.9b total (1.3b active)" → 7.9 */
function parseParamsInBillions(raw: string): number | null {
  const match = raw?.toLowerCase().match(/(\d+(?:\.\d+)?)\s*([mb])\b/);
  if (!match) return null;
  const value = parseFloat(match[1]);
  return match[2] === "m" ? value / 1000 : value;
}

function formatSizeRange([lo, hi]: [number, number]): string {
  if (lo === 0 && hi === SIZE_MAX_INDEX) return "Any size";
  if (hi === SIZE_MAX_INDEX) return `${SIZE_LABELS[lo]} and up`;
  if (lo === 0) return `Up to ${SIZE_LABELS[hi]}`;
  if (lo === hi) return SIZE_LABELS[lo];
  return `${SIZE_LABELS[lo]} – ${SIZE_LABELS[hi]}`;
}

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
    paramsB: parseParamsInBillions(m.params),
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
    // Shared DRS leaderboard rank (same as the landing page); null while preliminary
    rank: getLeaderboardRow(m)?.rank ?? null,
    runsCount: m.runsCount,
  };
}

function computeFacetsFromModels(models: ModelItem[]): Facets {
  const providerCounts: Record<string, number> = {};
  const lifecycleCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};

  for (const m of models) {
    if (m.provider) {
      providerCounts[m.provider] = (providerCounts[m.provider] || 0) + 1;
    }
    const lc = m.lifecycle || "Active";
    lifecycleCounts[lc] = (lifecycleCounts[lc] || 0) + 1;

    if (m.decisionStatus) {
      statusCounts[m.decisionStatus] = (statusCounts[m.decisionStatus] || 0) + 1;
    }
  }

  const toFacetList = (counts: Record<string, number>) =>
    Object.entries(counts)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);

  return {
    providers: toFacetList(providerCounts),
    lifecycles: toFacetList(lifecycleCounts),
    decisionStatuses: toFacetList(statusCounts),
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
  const [sort, setSort] = useState<string>("trending");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string | undefined>(undefined);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, SIZE_MAX_INDEX]);
  const [minFitScore, setMinFitScore] = useState<number>(0);

  // Filter column: tabs, provider search (Providers tab)
  const [filterTab, setFilterTab] = useState<FilterTab>("main");
  const [providerQuery, setProviderQuery] = useState<string>("");

  // Compact screens (< 1024px): filters live in a slide-in drawer
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const filtersBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const closeFilters = useCallback(() => {
    setFiltersOpen(false);
    filtersBtnRef.current?.focus();
  }, []);

  // Drawer: close when the screen grows past the breakpoint
  useEffect(() => {
    if (!isCompact) setFiltersOpen(false);
  }, [isCompact]);

  // Drawer: lock page scroll, focus the close button, Esc closes, Tab stays inside
  useEffect(() => {
    if (!filtersOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeFilters();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen, closeFilters]);

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
      // Deep link from Latest Reports: /models?model=<id> opens that model's details
      const modelId = params.get("model");
      if (modelId) {
        const match = allModels.find((m) => m.id === modelId);
        if (match) setSelectedModel(match);
      }
    }
  }, [allModels]);

  // Close the details modal with Escape
  useEffect(() => {
    if (!selectedModel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedModel(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedModel]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isSizeFilterActive = sizeRange[0] > 0 || sizeRange[1] < SIZE_MAX_INDEX;

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
      // Parameter-size range filter (models with unknown size only match "Any size")
      if (isSizeFilterActive) {
        const p = model.paramsB;
        if (p === null || p < SIZE_STOPS[sizeRange[0]] || p > SIZE_STOPS[sizeRange[1]]) {
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
        if (!matchesName && !matchesProvider && !matchesParams) {
          return false;
        }
      }
      return true;
    });
  }, [
    allModels,
    selectedProvider,
    selectedLifecycle,
    isSizeFilterActive,
    sizeRange,
    minFitScore,
    debouncedQuery,
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
  const isHighRiskOnly = selectedLifecycle === HIGH_RISK_LIFECYCLE;
  const rangeStart = totalFiltered === 0 ? 0 : pageSize >= 500 ? 1 : (page - 1) * pageSize + 1;
  const rangeEnd = pageSize >= 500 ? totalFiltered : Math.min(page * pageSize, totalFiltered);

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const hasActiveFilters = Boolean(
    selectedProvider ||
      selectedLifecycle ||
      isSizeFilterActive ||
      minFitScore > 0 ||
      debouncedQuery.trim()
  );

  const activeFilterCount =
    (selectedProvider ? 1 : 0) +
    (selectedLifecycle ? 1 : 0) +
    (isSizeFilterActive ? 1 : 0) +
    (minFitScore > 0 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedProvider(undefined);
    setSelectedLifecycle(undefined);
    setSizeRange([0, SIZE_MAX_INDEX]);
    setProviderQuery("");
    setMinFitScore(0);
    setSearchQuery("");
    setDebouncedQuery("");
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

  // Filter column helpers
  const toggleProvider = (value: string) => {
    setSelectedProvider((prev) => (prev === value ? undefined : value));
    setPage(1);
  };
  const toggleLifecycle = (value: string) => {
    setSelectedLifecycle((prev) => (prev === value ? undefined : value));
    setPage(1);
  };
  // Main tab shows the top providers; keep the selected one visible even if it ranks lower
  const providerPreview = (() => {
    const top = facets.providers.slice(0, FACET_PREVIEW_COUNT);
    const selected = facets.providers.find((p) => p.value === selectedProvider);
    return selected && !top.includes(selected) ? [...top, selected] : top;
  })();
  const hiddenProviderCount = facets.providers.length - providerPreview.length;
  const matchingProviders = providerQuery.trim()
    ? facets.providers.filter((p) => p.value.toLowerCase().includes(providerQuery.trim().toLowerCase()))
    : facets.providers;
  const renderChip = (item: FacetItem, active: boolean, onClick: () => void, withAvatar = false) => (
    <button
      key={item.value}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      title={`${item.value} (${item.count})`}
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
    >
      {withAvatar && (
        <span className={styles.chipAvatar} aria-hidden="true">
          {item.value.slice(0, 1)}
        </span>
      )}
      <span className={styles.chipLabel}>{item.value}</span>
      <span className={styles.chipCount}>{item.count}</span>
    </button>
  );

  // Filter UI, shared by the desktop column and the compact-screen drawer
  const renderFilterContent = (idPrefix: string) => (
    <>
              <div className={styles.filterTabsRow}>
                <div className={styles.filterTabs} role="tablist" aria-label="Filter categories">
                  {FILTER_TABS.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      role="tab"
                      id={`${idPrefix}-tab-${tab.value}`}
                      aria-selected={filterTab === tab.value}
                      aria-controls={`${idPrefix}-panel`}
                      onClick={() => setFilterTab(tab.value)}
                      className={`${styles.filterTab} ${filterTab === tab.value ? styles.filterTabActive : ""}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {hasActiveFilters && (
                  <button type="button" onClick={clearAllFilters} className={styles.clearFiltersBtn}>
                    Clear all
                  </button>
                )}
              </div>

              <div
                id={`${idPrefix}-panel`}
                role="tabpanel"
                aria-labelledby={`${idPrefix}-tab-${filterTab}`}
                className={styles.filterPanel}
              >
                {filterTab === "main" && (
                  <>
                    {/* Providers — top few + "+N" opens the Providers tab */}
                    <section className={styles.filterSection}>
                      <h3 className={styles.filterSectionTitle}>Providers</h3>
                      <div className={styles.chipList}>
                        {providerPreview.map((item) =>
                          renderChip(item, selectedProvider === item.value, () => toggleProvider(item.value), true)
                        )}
                        {hiddenProviderCount > 0 && (
                          <button
                            type="button"
                            className={`${styles.chip} ${styles.chipMore}`}
                            onClick={() => setFilterTab("providers")}
                            aria-label={`Show all ${facets.providers.length} providers`}
                          >
                            +{hiddenProviderCount}
                          </button>
                        )}
                      </div>
                    </section>

                    {/* Parameters — two-handle range slider */}
                    <section className={styles.filterSection}>
                      <div className={styles.filterSectionHeader}>
                        <h3 className={styles.filterSectionTitle}>Parameters</h3>
                        <span className={styles.filterSectionValue}>{formatSizeRange(sizeRange)}</span>
                      </div>
                      <div
                        className={styles.rangeSlider}
                        style={
                          {
                            "--range-lo": `${(sizeRange[0] / SIZE_MAX_INDEX) * 100}%`,
                            "--range-hi": `${(sizeRange[1] / SIZE_MAX_INDEX) * 100}%`,
                          } as React.CSSProperties
                        }
                      >
                        <div className={styles.rangeTrack} aria-hidden="true">
                          <div className={styles.rangeFill} />
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={SIZE_MAX_INDEX}
                          step={1}
                          value={sizeRange[0]}
                          onChange={(e) => {
                            const lo = Math.min(Number(e.target.value), sizeRange[1]);
                            setSizeRange([lo, sizeRange[1]]);
                            setPage(1);
                          }}
                          className={styles.rangeInput}
                          aria-label="Minimum parameters"
                          aria-valuetext={SIZE_LABELS[sizeRange[0]]}
                        />
                        <input
                          type="range"
                          min={0}
                          max={SIZE_MAX_INDEX}
                          step={1}
                          value={sizeRange[1]}
                          onChange={(e) => {
                            const hi = Math.max(Number(e.target.value), sizeRange[0]);
                            setSizeRange([sizeRange[0], hi]);
                            setPage(1);
                          }}
                          className={styles.rangeInput}
                          aria-label="Maximum parameters"
                          aria-valuetext={SIZE_LABELS[sizeRange[1]]}
                        />
                      </div>
                      <div className={styles.rangeTicks} aria-hidden="true">
                        {SIZE_LABELS.map((label, i) => (
                          <span
                            key={label}
                            className={`${styles.rangeTick} ${
                              i >= sizeRange[0] && i <= sizeRange[1] ? styles.rangeTickActive : ""
                            } ${MINOR_SIZE_TICKS.has(i) ? styles.rangeTickMinor : ""}`}
                            style={{ left: `${(i / SIZE_MAX_INDEX) * 100}%` }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Lifecycle */}
                    {facets.lifecycles.length > 0 && (
                      <section className={styles.filterSection}>
                        <h3 className={styles.filterSectionTitle}>Lifecycle</h3>
                        <div className={styles.chipList}>
                          {facets.lifecycles.map((item) =>
                            renderChip(item, selectedLifecycle === item.value, () => toggleLifecycle(item.value))
                          )}
                        </div>
                      </section>
                    )}

                    {/* Min DRS Trust Score */}
                    <section className={styles.filterSection}>
                      <div className={styles.filterSectionHeader}>
                        <h3 className={styles.filterSectionTitle}>Min DRS Trust Score</h3>
                        <span className={styles.filterSectionValue}>
                          {minFitScore > 0 ? `${minFitScore}+` : "Any"}
                        </span>
                      </div>
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
                        aria-label="Minimum DRS Trust Score"
                      />
                      <div className={styles.sliderLabels} aria-hidden="true">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </section>
                  </>
                )}

                {filterTab === "providers" && (
                  <section className={styles.filterSection}>
                    <div className={styles.filterSectionHeader}>
                      <h3 className={styles.filterSectionTitle}>All providers</h3>
                      <span className={styles.filterSectionValue}>{facets.providers.length}</span>
                    </div>
                    <div className={styles.providerSearch}>
                      <Search size={14} className={styles.searchIcon} aria-hidden="true" />
                      <input
                        type="text"
                        value={providerQuery}
                        onChange={(e) => setProviderQuery(e.target.value)}
                        placeholder="Filter providers"
                        className={styles.searchInput}
                        aria-label="Filter providers"
                      />
                      {providerQuery && (
                        <button
                          type="button"
                          onClick={() => setProviderQuery("")}
                          className={styles.clearSearchBtn}
                          aria-label="Clear provider filter"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                    <div className={styles.chipList}>
                      {matchingProviders.map((item) =>
                        renderChip(item, selectedProvider === item.value, () => toggleProvider(item.value), true)
                      )}
                      {matchingProviders.length === 0 && (
                        <p className={styles.filterEmpty}>No providers match “{providerQuery}”.</p>
                      )}
                    </div>
                  </section>
                )}

                {filterTab === "lifecycle" && (
                  <section className={styles.filterSection}>
                    <h3 className={styles.filterSectionTitle}>Lifecycle stage</h3>
                    <p className={styles.filterHint}>Stages are assigned from each model&apos;s DRS Trust Score.</p>
                    <div className={styles.lifecycleList}>
                      {Object.keys(LIFECYCLE_INFO).map((stage) => {
                        const count = facets.lifecycles.find((l) => l.value === stage)?.count ?? 0;
                        const isSelected = selectedLifecycle === stage;
                        return (
                          <button
                            key={stage}
                            type="button"
                            aria-pressed={isSelected}
                            disabled={count === 0}
                            onClick={() => toggleLifecycle(stage)}
                            className={`${styles.lifecycleOption} ${isSelected ? styles.lifecycleOptionActive : ""}`}
                          >
                            <span className={styles.lifecycleOptionText}>
                              <span className={styles.lifecycleOptionName}>{stage}</span>
                              <span className={styles.lifecycleOptionRule}>{LIFECYCLE_INFO[stage]}</span>
                            </span>
                            <span className={styles.chipCount}>{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
    </>
  );

  return (
    <>
      <Header />
      {filtersOpen &&
        isCompact &&
        createPortal(
          <div className={styles.drawerRoot}>
            <div className={styles.drawerBackdrop} onClick={closeFilters} aria-hidden="true" />
            <div
              ref={drawerRef}
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-labelledby="filters-drawer-title"
            >
              <div className={styles.drawerHeader}>
                <h2 id="filters-drawer-title" className={styles.drawerTitle}>
                  Filters
                </h2>
                <button
                  ref={drawerCloseRef}
                  type="button"
                  onClick={closeFilters}
                  className={styles.drawerCloseBtn}
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              <div className={styles.drawerBody}>{renderFilterContent("drawer-filters")}</div>
              <div className={styles.drawerFooter}>
                <button type="button" onClick={closeFilters} className={styles.drawerApplyBtn}>
                  Show {totalFiltered.toLocaleString()} {totalFiltered === 1 ? "model" : "models"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Validated Model Registry</h1>
            <p className={styles.pageSubtitle}>
              Browse trust-scored models across providers, sizes, and lifecycle stages.
            </p>
          </header>
          {/* MAIN GRID: SIDEBAR + CONTENT */}
          <div className={styles.mainGrid}>
            {/* LIST HEADER: count · filter by name · high-risk toggle · sort */}
            <div className={styles.modelsToolbar}>
              <h2 className={styles.listHeading}>
                Models
                <span className={styles.listCount} aria-live="polite">
                  {totalFiltered.toLocaleString()}
                </span>
              </h2>

              <div className={styles.nameFilter}>
                <Search className={styles.searchIcon} size={14} aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name"
                  className={styles.searchInput}
                  aria-label="Filter models by name, provider, or size"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.clearSearchBtn}
                    aria-label="Clear filter"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isHighRiskOnly}
                onClick={() => {
                  setSelectedLifecycle(isHighRiskOnly ? undefined : HIGH_RISK_LIFECYCLE);
                  setPage(1);
                }}
                className={`${styles.toggleBtn} ${isHighRiskOnly ? styles.toggleBtnOn : ""}`}
              >
                <span className={styles.toggleTrack} aria-hidden="true">
                  <span className={styles.toggleThumb} />
                </span>
                High risk only
              </button>

              <button
                ref={filtersBtnRef}
                type="button"
                className={styles.filtersBtn}
                onClick={() => setFiltersOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={filtersOpen}
              >
                <ListFilter size={14} aria-hidden="true" />
                Filters
                {activeFilterCount > 0 && (
                  <span className={styles.filtersBtnBadge} aria-label={`${activeFilterCount} active`}>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className={styles.sortControl}>
                <ArrowUpDown size={14} className={styles.sortControlIcon} aria-hidden="true" />
                <span className={styles.sortControlPrefix} aria-hidden="true">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className={styles.sortControlSelect}
                  aria-label="Sort models"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className={styles.sortControlChevron} size={14} aria-hidden="true" />
              </div>
            </div>

            {/* FILTER COLUMN: tabs · chips · size range · min DRS */}
            <aside className={styles.sidebar} aria-label="Model filters">
              {renderFilterContent("filters")}
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className={styles.contentArea}>
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
                    const drsScore =
                      model.overallFitScore !== null
                        ? Math.max(0, Math.min(100, Math.round(model.overallFitScore)))
                        : null;
                    return (
                      <div
                        key={model.id}
                        className={styles.modelCard}
                        onClick={() => setSelectedModel(model)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${model.provider}/${model.name} — open details`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedModel(model);
                          }
                        }}
                      >
                        {/* Row 1: avatar + provider/name (monospace, one line) */}
                        <h3 className={styles.modelTitle}>
                          <span className={styles.providerAvatar} aria-hidden="true">
                            {model.provider.slice(0, 1)}
                          </span>
                          <span className={styles.modelTitleText}>
                            <span className={styles.modelProvider}>{model.provider}</span>
                            <span className={styles.modelDivider}>/</span>
                            <span className={styles.modelName}>{model.name}</span>
                          </span>
                        </h3>

                        {/* Row 2: one muted meta line, "·" separated */}
                        <div className={styles.modelMeta}>
                          <span className={styles.metaGroup}>
                            <span className={styles.metaItem}>
                              <span className={styles.metaArchitecture}>{model.architecture}</span>
                            </span>
                            {drsScore !== null && (
                              <span className={styles.metaItem}>
                                <span
                                  className={styles.fitScore}
                                  title={`DRS Trust Score (Decision Reliability Score): ${drsScore} out of 100`}
                                  aria-label={`DRS Trust Score ${drsScore} out of 100`}
                                >
                                  <Gauge size={13} className={styles.gaugeIcon} aria-hidden="true" />
                                  <span className={styles.fitScoreLabel}>DRS</span>
                                  <span className={styles.fitScoreValue}>{drsScore}</span>
                                  <span className={styles.fitScoreMax}>/100</span>
                                  <span className={styles.fitScoreMeter} aria-hidden="true">
                                    <span
                                      className={styles.fitScoreMeterFill}
                                      style={{ width: `${drsScore}%` }}
                                    />
                                  </span>
                                </span>
                              </span>
                            )}
                          </span>
                          <span className={styles.metaGroup}>
                            <span className={styles.metaItem} title="Accuracy">
                              <span className={styles.metaLabel}>Acc</span> {model.accuracy}
                            </span>
                            <span className={styles.metaItem} title="Hallucination (HPI)">
                              <span className={styles.metaLabel}>HPI</span> {model.hallucination}
                            </span>
                            <span className={styles.metaItem} title="Latency">
                              <span className={styles.metaLabel}>Lat</span> {model.latency}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* LIST FOOTER: range · pagination (centred) · rows per page */}
              {totalFiltered > 0 && (
              <div className={styles.listFooter}>
                <p className={styles.listFooterRange}>
                  Showing{" "}
                  <strong>
                    {rangeStart}–{rangeEnd}
                  </strong>{" "}
                  of <strong>{totalFiltered.toLocaleString()}</strong>
                </p>

              {totalPages > 1 && pageSize < 500 ? (
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
              ) : (
                <span aria-hidden="true" />
              )}

                <label className={styles.rowsPerPage}>
                  <span>Rows per page</span>
                  <span className={styles.sortSelectWrap}>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className={styles.sortSelect}
                    >
                      {PAGE_SIZE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className={styles.sortSelectIcon} size={14} aria-hidden="true" />
                  </span>
                </label>
              </div>
              )}

              {/* BOTTOM WORKSPACE PROMO CARD */}
              <div className={styles.workspacePromoCard}>
                <p className={styles.promoText}>
                  Full benchmarks, trade-off lenses, and audit trails are available in the workspace.
                </p>
                <Link
                  href="https://prod.openvalidations.com/auth/signup"
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
                  <div className={styles.modalAvatar}>
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
                    <div className={styles.statLabel}>Leaderboard Rank</div>
                    {selectedModel.rank !== null ? (
                      <div className={styles.statValue}>
                        #{selectedModel.rank}/{LEADERBOARD_META.rankedCount}
                      </div>
                    ) : (
                      <div
                        className={styles.statValue}
                        title={`${MIN_RUNS_TO_RANK} evaluation runs are needed to be ranked`}
                      >
                        Preliminary · {selectedModel.runsCount}/{MIN_RUNS_TO_RANK} runs
                      </div>
                    )}
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
                  href="https://prod.openvalidations.com/auth/signup"
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
