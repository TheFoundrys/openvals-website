"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpDown,
  X,
  Eye,
  ShieldCheck,
  ExternalLink,
  Link2,
  Check,
  ListFilter,
  Rows3,
  Activity,
  FileText,
  Image as ImageIcon,
  AudioLines,
  Table,
  ChartLine,
  Database,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const TABS = [
  { key: "all", label: "Main" },
  { key: "modalities", label: "Modalities" },
  { key: "format", label: "Format" },
  { key: "type", label: "Type" },
];

/** Row-count boundaries for the size range (like Hugging Face's "Size (rows)") */
const SIZE_STOPS = [0, 1_000, 10_000, 100_000, 1_000_000, 100_000_000, Infinity];
const SIZE_LABELS = ["0", "1K", "10K", "100K", "1M", "100M", "100M+"];
const SIZE_MAX_INDEX = SIZE_STOPS.length - 1;
/** In-between labels hidden when the filter column is narrow */
const MINOR_SIZE_TICKS = new Set([2, 4, 5]);

function formatSizeRange([lo, hi]: [number, number]): string {
  if (lo === 0 && hi === SIZE_MAX_INDEX) return "Any size";
  if (lo === 0) return `Under ${SIZE_LABELS[hi]} rows`;
  if (hi === SIZE_MAX_INDEX) return `${SIZE_LABELS[lo]}+ rows`;
  return `${SIZE_LABELS[lo]}–${SIZE_LABELS[hi]} rows`;
}

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "uses", label: "Most used" },
  { value: "recent", label: "Recently updated" },
  { value: "name", label: "Name A–Z" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/** Small icon for the row avatar, by modality (Hugging Face shows one per dataset) */
function ModalityIcon({ modality, size = 13 }: { modality: string; size?: number }) {
  const props = { size, "aria-hidden": true } as const;
  switch (modality) {
    case "Image":
      return <ImageIcon {...props} />;
    case "Audio":
      return <AudioLines {...props} />;
    case "Tabular":
      return <Table {...props} />;
    case "Time-series":
      return <ChartLine {...props} />;
    case "Text":
    case "Document":
      return <FileText {...props} />;
    default:
      return <Database {...props} />;
  }
}

function formatCompact(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return num.toString();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10-10" → "Oct 10, 2026" — by hand, so server and browser render the same text */
function formatDate(dateStr: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr);
  if (!m) return dateStr;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
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
  // Size range as indexes into SIZE_STOPS: rows >= stops[lo] and rows < stops[hi]
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, SIZE_MAX_INDEX]);
  const isSizeFilterActive = sizeRange[0] > 0 || sizeRange[1] < SIZE_MAX_INDEX;

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Filter drawer (below 1024px the filter column moves into a slide-in drawer)
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

  // Close the drawer if the screen grows past the breakpoint
  useEffect(() => {
    if (!isCompact) setFiltersOpen(false);
  }, [isCompact]);

  // Drawer: lock page scroll, focus the close button, Escape closes, Tab stays inside
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

  // Details window
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  /** Element that opened the window, so focus can return to it */
  const openerRef = useRef<HTMLElement | null>(null);

  /** Keep ?dataset=<slug> in the address bar so the open dataset can be shared */
  const setDatasetParam = (slug: string | null) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("dataset", slug);
    else url.searchParams.delete("dataset");
    window.history.replaceState(window.history.state, "", url);
  };

  const openDataset = (dataset: DatasetItem) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setLinkCopied(false);
    setSelectedDataset(dataset);
    setDatasetParam(dataset.slug);
  };

  const closeDataset = useCallback(() => {
    setSelectedDataset(null);
    setDatasetParam(null);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  const copyDatasetLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };

  // Open the dataset named in ?dataset= on first load (shared links)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("dataset");
    if (!slug) return;
    const match = fullDatasetsList.find((d) => d.slug === slug);
    if (match) setSelectedDataset(match);
  }, [fullDatasetsList]);

  // While open: Escape closes, Tab stays inside, the page behind does not scroll
  useEffect(() => {
    if (!selectedDataset) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDataset();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
  }, [selectedDataset, closeDataset]);

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
      if (ds.rows < SIZE_STOPS[sizeRange[0]] || ds.rows >= SIZE_STOPS[sizeRange[1]]) {
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
  }, [allDatasets, selectedModality, selectedFormat, selectedType, sizeRange, debouncedQuery, fullText]);

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

  // Any filter, search or sort change starts again from page 1
  useEffect(() => {
    setPage(1);
  }, [selectedModality, selectedFormat, selectedType, sizeRange, debouncedQuery, fullText, sort, pageSize]);

  const totalFiltered = sortedDatasets.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const currentPage = Math.min(page, totalPages);
  const rangeStart = totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalFiltered);
  const pagedDatasets = sortedDatasets.slice(rangeStart - 1, rangeEnd);
  const paginationRange = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 2
  );

  const goToPage = (n: number) => {
    setPage(n);
    document.getElementById("datasets-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeFilterCount =
    (selectedModality ? 1 : 0) + (selectedFormat ? 1 : 0) + (selectedType ? 1 : 0) + (isSizeFilterActive ? 1 : 0);

  const hasActiveFilters = Boolean(
    selectedModality ||
    selectedFormat ||
    selectedType ||
    isSizeFilterActive ||
    debouncedQuery.trim() ||
    fullText
  );

  const clearAllFilters = () => {
    setSelectedModality(undefined);
    setSelectedFormat(undefined);
    setSelectedType(undefined);
    setSizeRange([0, SIZE_MAX_INDEX]);
    setSearchQuery("");
    setDebouncedQuery("");
    setFullText(false);
  };

  const renderChip = (
    item: FacetItem,
    active: boolean,
    onClick: () => void,
    icon?: React.ReactNode
  ) => (
    <button
      key={item.value}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      title={`${item.value} (${item.count})`}
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
    >
      {icon && (
        <span className={styles.chipIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.chipLabel}>{item.value}</span>
      <span className={styles.chipCount}>{item.count}</span>
    </button>
  );

  const modalitySection = facets.modalities.length > 0 && (
    <section className={styles.filterSection}>
      <h3 className={styles.filterSectionTitle}>Modalities</h3>
      <div className={styles.chipList}>
        {facets.modalities.map((item) =>
          renderChip(
            item,
            selectedModality === item.value,
            () => setSelectedModality(selectedModality === item.value ? undefined : item.value),
            <ModalityIcon modality={item.value} />
          )
        )}
      </div>
    </section>
  );

  const sizeSection = (
    <section className={styles.filterSection}>
      <div className={styles.filterSectionHeader}>
        <h3 className={styles.filterSectionTitle}>Size (rows)</h3>
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
          onChange={(e) => setSizeRange([Math.min(Number(e.target.value), sizeRange[1] - 1), sizeRange[1]])}
          className={styles.rangeInput}
          aria-label="Minimum rows"
          aria-valuetext={SIZE_LABELS[sizeRange[0]]}
        />
        <input
          type="range"
          min={0}
          max={SIZE_MAX_INDEX}
          step={1}
          value={sizeRange[1]}
          onChange={(e) => setSizeRange([sizeRange[0], Math.max(Number(e.target.value), sizeRange[0] + 1)])}
          className={styles.rangeInput}
          aria-label="Maximum rows"
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
  );

  const formatSection = facets.formats.length > 0 && (
    <section className={styles.filterSection}>
      <h3 className={styles.filterSectionTitle}>Format</h3>
      <div className={styles.chipList}>
        {facets.formats.map((item) =>
          renderChip(item, selectedFormat === item.value, () =>
            setSelectedFormat(selectedFormat === item.value ? undefined : item.value)
          )
        )}
      </div>
    </section>
  );

  const typeSection = facets.dtypes.length > 0 && (
    <section className={styles.filterSection}>
      <h3 className={styles.filterSectionTitle}>Type</h3>
      <div className={styles.chipList}>
        {facets.dtypes.map((item) =>
          renderChip(
            item,
            selectedType === item.value,
            () => setSelectedType(selectedType === item.value ? undefined : item.value),
            <span
              className={`${styles.typeDot} ${
                item.value === "Benchmark"
                  ? styles.typeDotBenchmark
                  : item.value === "Traces"
                    ? styles.typeDotTraces
                    : styles.typeDotRL
              }`}
            />
          )
        )}
      </div>
    </section>
  );

  // Filter UI — tabs, then the sections for the active tab
  const renderFilterContent = (idPrefix: string) => (
    <>
      <div className={styles.filterTabsRow}>
        <div className={styles.filterTabs} role="tablist" aria-label="Filter categories">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tab.key}`}
              aria-selected={activeTab === tab.key}
              aria-controls={`${idPrefix}-panel`}
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.filterTab} ${activeTab === tab.key ? styles.filterTabActive : ""}`}
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
        aria-labelledby={`${idPrefix}-tab-${activeTab}`}
        className={styles.filterPanel}
      >
        {activeTab === "all" && (
          <>
            {modalitySection}
            {sizeSection}
            {formatSection}
            {typeSection}
          </>
        )}
        {activeTab === "modalities" && modalitySection}
        {activeTab === "format" && formatSection}
        {activeTab === "type" && typeSection}
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
                  Show {totalFiltered.toLocaleString()} {totalFiltered === 1 ? "dataset" : "datasets"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Datasets</h1>
            <p className={styles.pageSubtitle}>
              Benchmarks, traces and evaluation environments used to validate AI models on OpenVals.
            </p>
          </header>

          {/* MAIN GRID: SIDEBAR + CONTENT */}
          <div className={styles.mainGrid}>
            {/* LIST HEADER: count · filter by name · search descriptions · sort */}
            <div className={styles.controlsBar}>
              <h2 className={styles.listHeading}>
                Datasets
                <span className={styles.listCount} aria-live="polite">
                  {totalFiltered.toLocaleString()}
                </span>
              </h2>

              <div className={styles.nameFilter}>
                <Search className={styles.nameFilterIcon} size={14} aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={fullText ? "Search names and descriptions" : "Filter by name"}
                  className={styles.nameFilterInput}
                  aria-label={fullText ? "Search dataset names and descriptions" : "Filter datasets by name"}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.nameFilterClear}
                    aria-label="Clear filter"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={fullText}
                onClick={() => setFullText(!fullText)}
                className={`${styles.toggleBtn} ${fullText ? styles.toggleBtnOn : ""}`}
                title="Also match descriptions and dataset types"
              >
                <span className={styles.toggleTrack} aria-hidden="true">
                  <span className={styles.toggleThumb} />
                </span>
                Search descriptions
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
                <span className={styles.sortControlPrefix} aria-hidden="true">
                  Sort:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className={styles.sortControlSelect}
                  aria-label="Sort datasets"
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

            {/* FILTER COLUMN: tabs · modality chips · size range · format · type */}
            <aside className={styles.sidebar} aria-label="Dataset filters">
              {renderFilterContent("filters")}
            </aside>

            {/* CONTENT AREA */}
            <div className={styles.contentArea}>
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
                <ul className={styles.datasetsList} id="datasets-list">
                  {pagedDatasets.map((dataset) => (
                    <li key={dataset.slug}>
                      <div
                        className={styles.datasetRow}
                        onClick={() => openDataset(dataset)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${dataset.slug} — open details`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openDataset(dataset);
                          }
                        }}
                      >
                        {/* Row 1: modality icon + owner/slug (monospace, one line) */}
                        <h3 className={styles.datasetTitle} title={dataset.name}>
                          <span className={styles.datasetAvatar} title={dataset.modality}>
                            <ModalityIcon modality={dataset.modality} />
                          </span>
                          <span className={styles.datasetTitleText}>
                            <span className={styles.datasetOwner}>{dataset.slug.split("/")[0]}</span>
                            <span className={styles.datasetDivider}>/</span>
                            <span className={styles.datasetSlugName}>
                              {dataset.slug.split("/").slice(1).join("/") || dataset.name}
                            </span>
                          </span>
                        </h3>

                        {/* Row 2: one muted meta line, "·" separated */}
                        <div className={styles.datasetMetaLine}>
                          <span className={styles.metaGroup}>
                            <span className={styles.metaItem}>
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
                            </span>
                            {dataset.preview && (
                              <span className={styles.metaItem} title="Rows can be previewed">
                                <Eye size={13} aria-hidden="true" /> Preview
                              </span>
                            )}
                            {dataset.gateReady && (
                              <span className={styles.metaItem} title="Ready to use as a release gate">
                                <ShieldCheck size={13} aria-hidden="true" /> Gate-ready
                              </span>
                            )}
                          </span>
                          <span className={styles.metaGroup}>
                            <span className={styles.metaItem}>
                              Updated{" "}
                              <time dateTime={dataset.updatedAt} className={styles.metaDateValue}>
                                {formatDate(dataset.updatedAt)}
                              </time>
                            </span>
                            <span
                              className={styles.metaItem}
                              title={`${dataset.rows.toLocaleString("en-US")} rows`}
                            >
                              <Rows3 size={13} aria-hidden="true" /> {formatCompact(dataset.rows)} rows
                            </span>
                            <span
                              className={styles.metaItem}
                              title={`Used in ${dataset.uses.toLocaleString("en-US")} evaluations`}
                            >
                              <Activity size={13} aria-hidden="true" /> {formatCompact(dataset.uses)} uses
                            </span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
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

                  {totalPages > 1 ? (
                    <nav className={styles.pagination} aria-label="Pagination">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => goToPage(currentPage - 1)}
                        className={styles.paginationNavBtn}
                      >
                        <ChevronLeft size={16} aria-hidden="true" /> Previous
                      </button>
                      <div className={styles.paginationPages}>
                        {paginationRange.map((n, i) => {
                          const prev = paginationRange[i - 1];
                          return (
                            <React.Fragment key={n}>
                              {prev && n - prev > 1 && <span className={styles.paginationEllipsis}>…</span>}
                              <button
                                type="button"
                                onClick={() => goToPage(n)}
                                className={`${styles.paginationPageBtn} ${
                                  n === currentPage ? styles.paginationPageBtnActive : ""
                                }`}
                                aria-current={n === currentPage ? "page" : undefined}
                              >
                                {n}
                              </button>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => goToPage(currentPage + 1)}
                        className={styles.paginationNavBtn}
                      >
                        Next <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    </nav>
                  ) : (
                    <span aria-hidden="true" />
                  )}

                  <label className={styles.rowsPerPage}>
                    <span>Rows per page</span>
                    <span className={styles.rowsPerPageWrap}>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className={styles.rowsPerPageSelect}
                      >
                        {PAGE_SIZE_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={styles.rowsPerPageChevron} size={14} aria-hidden="true" />
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

        {/* DATASET DETAILS MODAL */}
        {selectedDataset && (
          <div className={styles.modalOverlay} onClick={closeDataset}>
            <div
              ref={dialogRef}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dataset-dialog-title"
              aria-describedby="dataset-dialog-description"
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderLeft}>
                  <div className={styles.modalAvatar} aria-hidden="true">
                    <ModalityIcon modality={selectedDataset.modality} size={20} />
                  </div>
                  <div className={styles.modalHeading}>
                    <h2 id="dataset-dialog-title" className={styles.modalTitle}>
                      {selectedDataset.name}
                    </h2>
                    <p className={styles.modalSlug}>{selectedDataset.slug}</p>
                    <p className={styles.modalSubtitle}>
                      {selectedDataset.modality} · {selectedDataset.format} · {selectedDataset.dtype}
                    </p>
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeDataset}
                  className={styles.modalCloseBtn}
                  aria-label="Close dataset details"
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
                  <p id="dataset-dialog-description" className={styles.modalSectionText}>
                    {selectedDataset.description}
                  </p>
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
                <button type="button" onClick={copyDatasetLink} className={styles.modalCopyBtn}>
                  {linkCopied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
                  <span aria-live="polite">{linkCopied ? "Link copied" : "Copy link"}</span>
                </button>
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
