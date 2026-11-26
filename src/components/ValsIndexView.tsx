"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Cpu, Search, ShieldCheck, TrendingUp, X, Zap } from "lucide-react";
import styles from "./ValsIndexView.module.css";
import ValsIndexChart from "./ValsIndexChart";
import ValsIndexTable from "./ValsIndexTable";
import { LAB_LEGENDS, VALS_INDEX_MODELS } from "./valsIndexData";
import { LEADERBOARD_META } from "@/lib/leaderboard";

// ── Takeaways, computed from the synced leaderboard (never hand-written numbers) ──
const formatLatency = (ms: number) =>
  ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;

const LATENCY_FRONTIER = VALS_INDEX_MODELS.filter((m) => m.onFrontier).sort(
  (a, b) => a.latency - b.latency
);
const TOP_DRS = [...VALS_INDEX_MODELS].sort((a, b) => a.rank - b.rank).slice(0, 3);
const FASTEST = [...VALS_INDEX_MODELS]
  .filter((m) => m.latency > 0)
  .sort((a, b) => a.latency - b.latency)
  .slice(0, 3);

/** Searchable lab picker — replaces 34 colour chips (a scatter can't carry 34 hues) */
function LabFilter({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (lab: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const labs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of VALS_INDEX_MODELS) counts.set(m.labKey, (counts.get(m.labKey) || 0) + 1);
    return LAB_LEGENDS.map((l) => ({ key: l.key, label: l.label, count: counts.get(l.key) || 0 }));
  }, []);

  const visible = labs.filter((l) => l.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (lab: string | null) => {
    onChange(lab);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={styles.labFilter} ref={rootRef}>
      <button
        type="button"
        className={`${styles.labFilterTrigger} ${value ? styles.labFilterTriggerActive : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.labFilterPrefix}>Lab:</span>
        <span className={styles.labFilterValue}>{value ?? `All labs (${labs.length})`}</span>
        <ChevronDown size={14} className={open ? styles.chevronOpen : ""} />
      </button>
      {value && (
        <button
          type="button"
          className={styles.labFilterClear}
          onClick={() => onChange(null)}
          aria-label={`Clear lab filter (${value})`}
          title="Clear lab filter"
        >
          <X size={14} />
        </button>
      )}

      {open && (
        <div className={styles.labMenu}>
          <div className={styles.labSearch}>
            <Search size={14} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search labs"
              aria-label="Search labs"
            />
          </div>
          <ul className={styles.labList} role="listbox" aria-label="Labs">
            {!query && (
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === null}
                  className={styles.labOption}
                  onClick={() => pick(null)}
                >
                  <span>All labs</span>
                  <span className={styles.labCount}>{VALS_INDEX_MODELS.length}</span>
                  {value === null && <Check size={14} className={styles.labCheck} />}
                </button>
              </li>
            )}
            {visible.map((l) => (
              <li key={l.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === l.key}
                  className={styles.labOption}
                  onClick={() => pick(l.key)}
                >
                  <span>{l.label}</span>
                  <span className={styles.labCount}>{l.count}</span>
                  {value === l.key && <Check size={14} className={styles.labCheck} />}
                </button>
              </li>
            ))}
            {visible.length === 0 && <li className={styles.labEmpty}>No lab matches “{query}”</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ValsIndexView() {
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"latency" | "drs">("latency");

  const highlightedCount = selectedLab
    ? VALS_INDEX_MODELS.filter((m) => m.labKey === selectedLab).length
    : VALS_INDEX_MODELS.length;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 1. TITLE & EDITORIAL HEADER */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>OpenVals Index</h1>

          <div className={styles.metaLine}>
            <span className={styles.metaPill}>UPDATED {LEADERBOARD_META.date}</span>
            <span className={styles.versionDropdown}>
              <span>VERSION {LEADERBOARD_META.version}</span>
            </span>
            <span className={styles.metaPill}>{LEADERBOARD_META.rankedCount} RANKED MODELS</span>
          </div>

          <p className={styles.description}>
            Every model with {LEADERBOARD_META.minRuns}+ OpenVals evaluation runs, plotted by accuracy
            against response speed or DRS Trust Score. The frontier marks the models that no faster
            (or more reliable) model beats on accuracy.
          </p>
        </div>

        {/* 2. VIEW + LAB CONTROLS */}
        <div className={styles.controlBar}>
          <div className={styles.controlBarLeft}>
            <span className={styles.controlTitle}>Frontier Space</span>
            <span className={styles.controlSubtitle}>
              {viewMode === "latency" ? "Accuracy vs Latency Trade-Off" : "Accuracy vs Decision Reliability"}
            </span>
          </div>

          <div className={styles.controlBarRight}>
            <div className={styles.segmentedControl} role="tablist" aria-label="Index View Mode">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "latency"}
                className={`${styles.segmentBtn} ${viewMode === "latency" ? styles.segmentBtnActive : ""}`}
                onClick={() => setViewMode("latency")}
                title="View Speed Frontier: Accuracy vs Latency"
              >
                <Zap size={13} color="#10b981" />
                <span>Accuracy vs Latency</span>
                <span className={styles.segmentTag}>Speed Frontier</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "drs"}
                className={`${styles.segmentBtn} ${viewMode === "drs" ? styles.segmentBtnActive : ""}`}
                onClick={() => setViewMode("drs")}
                title="View Trust Frontier: Accuracy vs Decision Reliability Score (DRS)"
              >
                <ShieldCheck size={13} color="#06b6d4" />
                <span>Accuracy vs DRS</span>
                <span
                  className={styles.segmentTag}
                  style={{ background: "rgba(6, 182, 212, 0.12)", color: "#06b6d4" }}
                >
                  Trust Frontier
                </span>
              </button>
            </div>

            <LabFilter value={selectedLab} onChange={setSelectedLab} />
          </div>
        </div>

        {selectedLab && (
          <p className={styles.showingCount}>
            Highlighting {highlightedCount} of {VALS_INDEX_MODELS.length} models from {selectedLab}
          </p>
        )}

        {/* 3. SCATTER PLOT & PARETO FRONTIER */}
        <ValsIndexChart selectedLab={selectedLab} viewMode={viewMode} />

        {/* 4. KEY TAKEAWAYS — computed from the synced leaderboard */}
        <section className={styles.takeawaysSection} aria-labelledby="takeaways-heading">
          <h2 id="takeaways-heading" className={styles.takeawaysHeading}>
            Key Takeaways
          </h2>

          <div className={styles.takeawaysGrid}>
            <article className={styles.takeawayCard}>
              <div className={styles.takeawayCardTopBar} style={{ background: "#10b981" }} />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}
                >
                  <TrendingUp size={18} />
                </div>
                <h3>Speed frontier</h3>
              </div>
              <p className={styles.takeawayLead}>No faster ranked model beats these on accuracy.</p>
              <ul className={styles.takeawayList}>
                {LATENCY_FRONTIER.slice(0, 5).map((m) => (
                  <li key={m.id}>
                    <span className={styles.takeawayName}>{m.name}</span>
                    <span className={styles.takeawayValue}>
                      {formatLatency(m.latency)} · {m.accuracy.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.takeawayCard}>
              <div className={styles.takeawayCardTopBar} style={{ background: "#06b6d4" }} />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(6, 182, 212, 0.12)", color: "#06b6d4" }}
                >
                  <Zap size={18} />
                </div>
                <h3>Top DRS</h3>
              </div>
              <p className={styles.takeawayLead}>
                Highest mean DRS Trust Score of {VALS_INDEX_MODELS.length} ranked models.
              </p>
              <ul className={styles.takeawayList}>
                {TOP_DRS.map((m) => (
                  <li key={m.id}>
                    <span className={styles.takeawayName}>{m.name}</span>
                    <span className={styles.takeawayValue}>
                      {m.drs.toFixed(1)}
                      {m.drsCi !== null && ` ±${m.drsCi.toFixed(1)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.takeawayCard}>
              <div className={styles.takeawayCardTopBar} style={{ background: "#eab308" }} />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(234, 179, 8, 0.12)", color: "#eab308" }}
                >
                  <Cpu size={18} />
                </div>
                <h3>Fastest</h3>
              </div>
              <p className={styles.takeawayLead}>Quickest average response, with accuracy.</p>
              <ul className={styles.takeawayList}>
                {FASTEST.map((m) => (
                  <li key={m.id}>
                    <span className={styles.takeawayName}>{m.name}</span>
                    <span className={styles.takeawayValue}>
                      {formatLatency(m.latency)} · {m.accuracy.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.takeawayCard}>
              <div className={styles.takeawayCardTopBar} style={{ background: "#f43f5e" }} />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(244, 63, 94, 0.12)", color: "#f43f5e" }}
                >
                  <ShieldCheck size={18} />
                </div>
                <h3>How ranking works</h3>
              </div>
              <ul className={styles.takeawayRules}>
                <li>{LEADERBOARD_META.minRuns}+ evaluation runs to be ranked</li>
                <li>Ranked by mean DRS, with a 95% confidence interval</li>
                <li>Equal scores share a rank (shown as “=”)</li>
                <li>{LEADERBOARD_META.preliminaryCount} models are still preliminary</li>
              </ul>
            </article>
          </div>
        </section>

        {/* 5. FULL LEADERBOARD */}
        <ValsIndexTable selectedLab={selectedLab} />
      </div>
    </div>
  );
}
