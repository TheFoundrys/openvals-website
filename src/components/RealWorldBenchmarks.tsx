"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeftRight,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Zap,
  ChevronDown,
  Check,
  ChevronUp,
} from "lucide-react";
import styles from "./RealWorldBenchmarks.module.css";

import {
  LEADERBOARD_META,
  RANKED_MODELS,
  PRELIMINARY_COUNT,
  MIN_RUNS_TO_RANK,
  rankChange,
  type LeaderboardRow,
} from "@/lib/leaderboard";

export type MetricType =
  | "accuracy"
  | "latency"
  | "semantic"
  | "factuality"
  | "hallucination"
  | "safety"
  | "reliability"
  | "drs";

interface MetricOption {
  id: MetricType;
  label: string;
  shortLabel: string;
  description: string;
  renderIcon: (active: boolean) => React.ReactNode;
}

const METRICS: MetricOption[] = [
  {
    id: "drs",
    label: "DRS Trust Score",
    shortLabel: "DRS",
    description: "Decision Reliability Score — the leaderboard ranking",
    renderIcon: () => <Zap size={13} />,
  },
  {
    id: "accuracy",
    label: "Accuracy %",
    shortLabel: "Accuracy",
    description: "Real-world task benchmark accuracy",
    renderIcon: (active) => (
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        fill="currentColor"
        className={active ? styles.metricIconActive : ""}
      >
        <rect x="1.5" y="8" width="3" height="7" rx="0.8" />
        <rect x="6.5" y="3.5" width="3" height="11.5" rx="0.8" />
        <rect x="11.5" y="6" width="3" height="9" rx="0.8" />
      </svg>
    ),
  },
  {
    id: "latency",
    label: "Latency",
    shortLabel: "Latency",
    description: "Model response latency (ms)",
    renderIcon: () => <ArrowLeftRight size={13} />,
  },
  {
    id: "semantic",
    label: "Semantic %",
    shortLabel: "Semantic",
    description: "Semantic similarity score",
    renderIcon: () => <Layers size={13} />,
  },
  {
    id: "factuality",
    label: "Factuality %",
    shortLabel: "Factuality",
    description: "Ground truth factuality validation",
    renderIcon: () => <CheckCircle2 size={13} />,
  },
  {
    id: "hallucination",
    label: "Hallucination Risk",
    shortLabel: "Hallucination",
    description: "Estimated hallucination risk — lower is better",
    renderIcon: () => <AlertTriangle size={13} />,
  },
  {
    id: "safety",
    label: "Safety %",
    shortLabel: "Safety",
    description: "Enterprise safety guardrails score",
    renderIcon: () => <CheckCircle2 size={13} />,
  },
  {
    id: "reliability",
    label: "Reliability %",
    shortLabel: "Reliability",
    description: "Cross-run consistency and stability",
    renderIcon: () => <Activity size={13} />,
  },
];

// Lab Brand Icons
function LabIcon({ lab, id }: { lab?: string; id?: string }) {
  const normLab = (lab || "").toLowerCase();
  const normId = (id || "").toLowerCase();

  if (normLab.includes("agentica") || normId.includes("deepscaler")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2.5l2.4 5.3 5.8.8-4.2 4.1 1 5.8-5-2.7-5 2.7 1-5.8-4.2-4.1 5.8-.8z" />
      </svg>
    );
  }
  if (normLab.includes("tencent") || normId.includes("hunyuan")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M11 3h2v6h5v2h-5v10h-2V11H6V9h5V3z" />;
      </svg>
    );
  }
  if (normLab.includes("ibm") || normId.includes("granite")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="3" y="4" width="18" height="2.5" rx="1" />
        <rect x="3" y="8" width="18" height="2.5" rx="1" />
        <rect x="3" y="12" width="18" height="2.5" rx="1" />
        <rect x="3" y="16" width="18" height="2.5" rx="1" />
      </svg>
    );
  }
  if (normLab.includes("prism") || normId.includes("bonsai")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 3L2 20h20L12 3zm0 4.5l6.5 11h-13L12 7.5z" />
      </svg>
    );
  }
  if (normLab.includes("liquid") || normId.includes("lfm")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2.7c-4 5.3-7 9.8-7 13.3a7 7 0 0 0 14 0c0-3.5-3-8-7-13.3z" />
      </svg>
    );
  }
  if (normLab.includes("qvac") || normId.includes("medpsy")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M3 12h4.5l2.5-6 4 12 2.5-6H21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (normLab.includes("hugging") || normId.includes("smollm")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="9" cy="10" r="1.5" />
        <circle cx="15" cy="10" r="1.5" />
        <path d="M8 14.5c1.2 1.8 4.8 1.8 6 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (normLab.includes("google") || normId.includes("gemma")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10h-10v3.8h5.9c-.8 2.2-2.9 3.8-5.9 3.8-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4c1.6 0 3 .6 4.1 1.6l2.8-2.8C17.3 3.6 14.8 2 12 2z" />
      </svg>
    );
  }
  if (normLab.includes("meta") || normId.includes("llama")) {
    return (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.267-8-12.356-8-5.096 0-5.096 8 0 8 5.09 0 7.261-8 12.356-8Z" />
      </svg>
    );
  }
  if (normLab.includes("microsoft") || normId.includes("phi")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    );
  }
  if (normLab.includes("open") || normId.includes("openchat")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.6 8.7L12 18c-3 0-5.5-2.5-5.5-5.5S9 7 12 7s5.5 2.5 5.5 5.5c0 1.5-.6 2.9-1.6 3.9l1.8 1.8A8 8 0 0 0 20 12a9 9 0 0 0-8-9z" />
      </svg>
    );
  }
  if (normLab.includes("alibaba") || normId.includes("qwen")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (normLab.includes("tii") || normId.includes("falcon")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M2.5 6.5C5 9 8 10 12 10s7-1 9.5-3.5C19 12 16 18 12 21c-4-3-7-9-9.5-14.5z" />
      </svg>
    );
  }
  if (normLab.includes("01") || normId.includes("yi")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M9 10l3-2" />
      </svg>
    );
  }
  if (normLab.includes("deepseek")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 13c1.5 2 3.5 3 5 3s3.5-1 5-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (normLab.includes("mistral")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M3 4h4v4H3zm14 0h4v4h-4zM7 8h4v4H7zm6 0h4v4h-4zm-3 4h4v4h-4zm-7 4h4v4H3zm14 0h4v4h-4z" />
      </svg>
    );
  }
  if (normLab.includes("stability")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (normLab.includes("nous") || normId.includes("hermes")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <circle cx="12" cy="16" r="3" />
        <path d="M8 8l8 0M8 8l4 8M16 8l-4 8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (normLab.includes("doey") || normId.includes("onellm")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M6 4h6a6 6 0 0 1 6 6 6 6 0 0 1-6 6H6V4zm3 3v6h3a3 3 0 0 0 3-3 3 3 0 0 0-3-3H9z" />
      </svg>
    );
  }
  if (normLab.includes("big") || normId.includes("bloom")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
      </svg>
    );
  }
  if (normLab.includes("supra")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M13 2L4 14h7v8l9-12h-7z" />
      </svg>
    );
  }
  if (normLab.includes("promtech") || normId.includes("asena")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (normLab.includes("north") || normId.includes("willow")) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

/** Generated by the tracker sync (scripts/leaderboard.js); 0–100 scales */
type LeaderRow = LeaderboardRow;
const LEADER_ROWS: LeaderRow[] = RANKED_MODELS;

/** How many ranked models share each rank (ties at one decimal) */
const RANK_COUNTS = LEADER_ROWS.reduce<Record<number, number>>((acc, r) => {
  acc[r.rank] = (acc[r.rank] || 0) + 1;
  return acc;
}, {});

// Latency bar: log scale, 100 ms (full bar) to 1000 s (empty bar)
const LATENCY_LOG_MIN = 2;
const LATENCY_LOG_MAX = 6;

function latencyFraction(ms: number): number {
  const v = Math.log10(Math.max(10 ** LATENCY_LOG_MIN, ms));
  return 1 - Math.min(1, Math.max(0, (v - LATENCY_LOG_MIN) / (LATENCY_LOG_MAX - LATENCY_LOG_MIN)));
}

/** Axis labels at 0 / 25 / 50 / 75 / 100% of the bar track */
function axisTicks(metric: MetricType): string[] {
  if (metric === "latency") return ["1000s", "100s", "10s", "1s", "0.1s"];
  if (metric === "drs") return ["0", "25", "50", "75", "100"];
  if (metric === "hallucination") return ["100%", "75%", "50%", "25%", "0%"]; // risk: bar grows as it falls
  return ["0%", "25%", "50%", "75%", "100%"];
}

function RankChange({ row }: { row: LeaderRow }) {
  if (row.isNew) return <span className={styles.rankChangeNew}>New</span>;
  const change = rankChange(row);
  if (!change) return null;
  return change > 0 ? (
    <span className={styles.rankChangeUp} title={`Up ${change} since v${LEADERBOARD_META.previousVersion}`}>
      ▲{change}
    </span>
  ) : (
    <span className={styles.rankChangeDown} title={`Down ${-change} since v${LEADERBOARD_META.previousVersion}`}>
      ▼{-change}
    </span>
  );
}

const formatPct = (n: number | null) => (n === null ? "—" : `${n.toFixed(1)}%`);

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function RealWorldBenchmarks() {
  const [activeMetric, setActiveMetric] = useState<MetricType>("drs");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState<"top10" | "top25" | "all">("top10");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isDropdownOpen]);

  const currentMetricObj = useMemo(() => {
    return METRICS.find((m) => m.id === activeMetric) || METRICS[0];
  }, [activeMetric]);

  // The ranked set is fixed (DRS leaderboard); other metrics only re-order it.
  const sortedModels = useMemo(() => {
    const metricValue = (m: LeaderRow): number | null => {
      switch (activeMetric) {
        case "accuracy":
          return m.accuracy;
        case "latency":
          return m.latencyMs === null ? null : -m.latencyMs; // faster first
        case "semantic":
          return m.semantic;
        case "factuality":
          return m.factuality;
        case "hallucination":
          return m.hallucination === null ? null : -m.hallucination; // lower risk first
        case "safety":
          return m.safety;
        case "reliability":
          return m.reliability;
        default:
          return m.drs;
      }
    };
    if (activeMetric === "drs") return LEADER_ROWS; // already in leaderboard order
    return [...LEADER_ROWS].sort((a, b) => {
      const va = metricValue(a);
      const vb = metricValue(b);
      if (va === null && vb === null) return a.rank - b.rank;
      if (va === null) return 1; // missing values last
      if (vb === null) return -1;
      return vb - va || a.rank - b.rank;
    });
  }, [activeMetric]);

  const displayedModels = useMemo(() => {
    if (selectedCount === "top10") return sortedModels.slice(0, 10);
    if (selectedCount === "top25") return sortedModels.slice(0, 25);
    return sortedModels;
  }, [sortedModels, selectedCount]);

  const barWidth = (n: number | null) => `${Math.max(4, Math.min(100, n ?? 0))}%`;

  // Bar width for the active metric (single colour bars)
  const calculateWidth = (model: LeaderRow) => {
    switch (activeMetric) {
      case "latency":
        if (model.latencyMs === null) return "4%";
        return `${Math.max(4, latencyFraction(model.latencyMs) * 100)}%`;
      case "accuracy":
        return barWidth(model.accuracy);
      case "semantic":
        return barWidth(model.semantic);
      case "factuality":
        return barWidth(model.factuality);
      case "hallucination":
        // Longer bar = lower risk, so every bar reads "longer is better"
        return model.hallucination === null ? "4%" : barWidth(100 - model.hallucination);
      case "safety":
        return barWidth(model.safety);
      case "reliability":
        return barWidth(model.reliability);
      default:
        return barWidth(model.drs);
    }
  };

  const getMetricTopLabel = (model: LeaderRow) => {
    switch (activeMetric) {
      case "accuracy":
        return formatPct(model.accuracy);
      case "latency":
        return model.latencyLabel;
      case "semantic":
        return formatPct(model.semantic);
      case "factuality":
        return formatPct(model.factuality);
      case "hallucination":
        return formatPct(model.hallucination);
      case "safety":
        return formatPct(model.safety);
      case "reliability":
        return formatPct(model.reliability);
      default:
        return model.drs.toFixed(1);
    }
  };

  const toggleRowExpansion = (modelId: string) => {
    setExpandedModelId((prev) => (prev === modelId ? null : modelId));
  };

  return (
    <div className={styles.benchmarkSection}>
      {/* HEADER SECTION */}
      <motion.div
        className={styles.headerArea}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={FADE_UP}
      >
        <div className={styles.eyebrow}>
          Independent Evaluation, Unbiased Benchmarks
        </div>
        <h2 className={styles.headline}>AI Models, Rigorously Tested.</h2>
        <p className={styles.description}>
          We benchmark the world&apos;s leading AI models on economically valuable
          tasks such as finance, software, and frontier risk like cybersecurity,
          recursive self improvement and mental health. We run all of our own
          evaluations and create many of our benchmarks in-house.
        </p>
      </motion.div>

      {/* FILTER & METRIC CONTROLS BAR */}
      <div className={styles.controlBar}>
        {/* METRIC SELECTION DROPDOWN */}
        <div className={styles.metricDropdownWrapper} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`${styles.metricDropdownTrigger} ${
              isDropdownOpen ? styles.metricDropdownTriggerOpen : ""
            }`}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            aria-label="Select benchmark metric"
          >
            <span className={styles.metricPrefix}>Metric:</span>
            <span className={styles.metricTriggerIcon}>
              {currentMetricObj.renderIcon(true)}
            </span>
            <span className={styles.metricTriggerLabel}>
              {currentMetricObj.label}
            </span>
            <ChevronDown
              size={14}
              className={`${styles.metricChevron} ${
                isDropdownOpen ? styles.metricChevronOpen : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className={styles.metricDropdownMenu} role="listbox">
              <div className={styles.metricDropdownHeader}>
                Select Evaluation Metric
              </div>
              {METRICS.map((metric) => {
                const isSelected = activeMetric === metric.id;
                return (
                  <button
                    key={metric.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveMetric(metric.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`${styles.metricOption} ${
                      isSelected ? styles.metricOptionActive : ""
                    }`}
                  >
                    <span className={styles.metricOptionIcon}>
                      {metric.renderIcon(isSelected)}
                    </span>
                    <div className={styles.metricOptionText}>
                      <span className={styles.metricOptionLabel}>
                        {metric.label}
                      </span>
                      <span className={styles.metricOptionDesc}>
                        {metric.description}
                      </span>
                    </div>
                    {isSelected && (
                      <Check size={14} className={styles.metricCheckIcon} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.metaGroup}>
          <div className={styles.indexInfoRow}>
            <Link
              href="/openvals-index"
              className={styles.valsIndexBadge}
              title="Explore full OpenVals Index benchmark"
            >
              <div className={styles.valsLogoIcon}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                  <circle cx="10" cy="10" r="8.5" stroke="#10b981" strokeWidth="1.6" />
                  <path
                    d="M6.5 7L10 14L13.5 7"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>OPENVALS INDEX ↗</span>
            </Link>

            <span className={styles.metaDot}>•</span>
            <span
              className={styles.dateLabel}
              title={`Leaderboard version ${LEADERBOARD_META.version} — date of the latest evaluation run`}
            >
              Updated {LEADERBOARD_META.date}
            </span>
          </div>

          <div className={styles.viewControlsWrapper}>
            <div className={styles.viewModeGroup} role="group" aria-label="Models display count">
              <button
                type="button"
                onClick={() => setSelectedCount("top10")}
                className={`${styles.viewModeBtn} ${
                  selectedCount === "top10" ? styles.viewModeBtnActive : ""
                }`}
                aria-pressed={selectedCount === "top10"}
              >
                Top 10
              </button>
              <button
                type="button"
                onClick={() => setSelectedCount("top25")}
                className={`${styles.viewModeBtn} ${
                  selectedCount === "top25" ? styles.viewModeBtnActive : ""
                }`}
                aria-pressed={selectedCount === "top25"}
              >
                Top 25
              </button>
              <button
                type="button"
                onClick={() => setSelectedCount("all")}
                className={`${styles.viewModeBtn} ${
                  selectedCount === "all" ? styles.viewModeBtnActive : ""
                }`}
                aria-pressed={selectedCount === "all"}
              >
                All {LEADER_ROWS.length}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL BAR GRAPH CONTAINER */}
      <div className={styles.chartOuterWrapper}>
        {/* Table Column Header */}
        <div className={styles.chartTableHeader}>
          <div className={styles.headerColLeft}>
            <span># Rank &amp; Model</span>
          </div>
          <div className={styles.headerColMid} aria-hidden="true">
            {axisTicks(activeMetric).map((tick) => (
              <span key={tick} className={styles.headerTick}>
                {tick}
              </span>
            ))}
          </div>
          <div className={styles.headerColRight}>
            <span>{activeMetric === "drs" ? "DRS ± CI" : currentMetricObj.shortLabel}</span>
          </div>
        </div>

        {/* Horizontal Model Rows */}
        <div className={styles.horizontalRowsList}>
          {displayedModels.map((model, idx) => {
            const widthVal = calculateWidth(model);
            const metricLabel = getMetricTopLabel(model);
            const isExpanded = expandedModelId === model.id;
            const position = activeMetric === "drs" ? model.rank : idx + 1;
            const isDrsView = activeMetric === "drs";
            const isTied = isDrsView && RANK_COUNTS[model.rank] > 1;

            return (
              <React.Fragment key={model.id}>
              <div
                className={`${styles.horizontalRow} ${
                  isExpanded ? styles.horizontalRowActive : ""
                }`}
              >
                {/* Main Row Content */}
                <div
                  className={styles.rowMainContent}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`${model.name}${model.params ? ` ${model.params}` : ""}, rank ${model.rank}${isTied ? " (tied)" : ""}, DRS ${model.drs.toFixed(1)}. Show details`}
                  onClick={() => toggleRowExpansion(model.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleRowExpansion(model.id);
                    }
                  }}
                  title="Click to view detailed metrics breakdown"
                >
                  {/* Left: Rank, Brand Icon, Name */}
                  <div className={styles.rowModelInfo}>
                    <span
                      className={`${styles.rankBadge} ${
                        position <= 3 ? styles.rankTop3 : ""
                      }`}
                      title={
                        isTied
                          ? `Tied for #${model.rank} with ${RANK_COUNTS[model.rank] - 1} other ${
                              RANK_COUNTS[model.rank] === 2 ? "model" : "models"
                            } (same DRS at one decimal)`
                          : undefined
                      }
                    >
                      {isTied ? "=" : "#"}
                      {position}
                    </span>
                    <div className={styles.modelIconWrap}>
                      <LabIcon lab={model.lab} id={model.id} />
                    </div>
                    <div className={styles.modelNameBlock}>
                      <div className={styles.modelTitleRow}>
                        <span className={styles.modelName}>{model.name}</span>
                        {model.params && (
                          <span className={styles.modelVersionTag}>
                            {model.params}
                          </span>
                        )}
                      </div>
                      <span className={styles.modelLabName}>
                        {model.lab} · {model.runs} runs
                        {isDrsView ? (
                          <RankChange row={model} />
                        ) : (
                          <span className={styles.drsRankHint}>DRS #{model.rank}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Center: Horizontal Bar with Single Emerald Fill */}
                  <div className={styles.barTrackCol}>
                    <div className={styles.barTrackBg}>
                      {/* Vertical Reference Grid Lines */}
                      <div className={styles.trackGridGuide} style={{ left: "25%" }} />
                      <div className={styles.trackGridGuide} style={{ left: "50%" }} />
                      <div className={styles.trackGridGuide} style={{ left: "75%" }} />

                      {/* Single Unified Color Bar Fill */}
                      <div
                        className={styles.barFill}
                        style={{ width: widthVal }}
                      />
                    </div>
                  </div>

                  {/* Right: Score Value */}
                  <div className={styles.rowScoreCol}>
                    <span className={styles.scoreValue}>
                      {metricLabel}
                      {isDrsView && model.drsCi !== null && (
                        <span
                          className={styles.scoreCi}
                          title={`95% confidence interval across ${model.runs} runs`}
                        >
                          ±{model.drsCi.toFixed(1)}
                        </span>
                      )}
                    </span>
                    <span
                      className={`${styles.expandIndicator} ${
                        isExpanded ? styles.expandIndicatorOpen : ""
                      }`}
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </div>
                </div>

                {/* Expanded Micro-Grid Details Drawer */}
                {isExpanded && (
                  <div className={styles.expandedDetailsDrawer}>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>DRS Trust Score</span>
                      <span
                        className={styles.drawerMetricVal}
                        style={{ color: "#06b6d4" }}
                      >
                        {model.drs.toFixed(1)}
                        {model.drsCi !== null && ` ± ${model.drsCi.toFixed(1)}`}
                      </span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Leaderboard Rank</span>
                      <span className={styles.drawerMetricVal}>
                        #{model.rank} of {LEADER_ROWS.length}
                      </span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Evaluation Runs</span>
                      <span className={styles.drawerMetricVal}>{model.runs}</span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Accuracy</span>
                      <span
                        className={styles.drawerMetricVal}
                        style={{ color: "#10b981" }}
                      >
                        {formatPct(model.accuracy)}
                      </span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Avg Latency</span>
                      <span className={styles.drawerMetricVal}>{model.latencyLabel}</span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Factuality</span>
                      <span className={styles.drawerMetricVal}>{formatPct(model.factuality)}</span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Hallucination Risk</span>
                      <span className={styles.drawerMetricVal}>{formatPct(model.hallucination)}</span>
                    </div>
                    <div className={styles.drawerMetricItem}>
                      <span className={styles.drawerMetricLabel}>Safety</span>
                      <span className={styles.drawerMetricVal}>{formatPct(model.safety)}</span>
                    </div>
                  </div>
                )}
              </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomInfo}>
            <span className={styles.infoIcon}>i</span>
            <span>
              Showing {displayedModels.length} of {LEADER_ROWS.length} ranked models ({MIN_RUNS_TO_RANK}+ evaluation runs), sorted by {currentMetricObj.label}.{" "}
              Scores show a 95% confidence interval (±), and &ldquo;=&rdquo; marks a
              shared rank.{" "}
              {PRELIMINARY_COUNT} more models with fewer runs are listed as preliminary in the{" "}
              <Link href="/models" className={styles.inlineLink}>
                model registry
              </Link>
              .
            </span>
          </div>

          <div className={styles.bottomActions}>
            <Link
              href="/openvals-index"
              className={styles.viewFullLink}
              title="Full leaderboard, methodology and latency chart"
            >
              <span>View full leaderboard</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
