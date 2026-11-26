"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { VALS_INDEX_MODELS, type ValsIndexModel } from "./valsIndexData";
import { LEADERBOARD_META } from "@/lib/leaderboard";
import styles from "./ValsIndexTable.module.css";

type SortKey = "rank" | "name" | "lab" | "drs" | "accuracy" | "latency" | "runs";
type SortDir = "asc" | "desc";

interface Column {
  key: SortKey;
  label: string;
  /** Direction used the first time the column is clicked */
  firstDir: SortDir;
  numeric?: boolean;
}

const COLUMNS: Column[] = [
  { key: "rank", label: "Rank", firstDir: "asc" },
  { key: "name", label: "Model", firstDir: "asc" },
  { key: "lab", label: "Lab", firstDir: "asc" },
  { key: "drs", label: "DRS ± 95% CI", firstDir: "desc", numeric: true },
  { key: "accuracy", label: "Accuracy", firstDir: "desc", numeric: true },
  { key: "latency", label: "Latency", firstDir: "asc", numeric: true },
  { key: "runs", label: "Runs", firstDir: "desc", numeric: true },
];

const PAGE_SIZE = 25;

/** How many models share each rank (ties at one decimal) */
const RANK_COUNTS = VALS_INDEX_MODELS.reduce<Record<number, number>>((acc, m) => {
  acc[m.rank] = (acc[m.rank] || 0) + 1;
  return acc;
}, {});

const formatLatency = (ms: number) =>
  ms <= 0 ? "—" : ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(ms < 10000 ? 1 : 0)} s`;

function compare(a: ValsIndexModel, b: ValsIndexModel, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name);
    case "lab":
      return a.lab.localeCompare(b.lab);
    case "drs":
      return a.drs - b.drs;
    case "accuracy":
      return a.accuracy - b.accuracy;
    case "latency":
      // Missing latency always sorts last
      return (a.latency || Infinity) - (b.latency || Infinity);
    case "runs":
      return a.runs - b.runs;
    default:
      return a.rank - b.rank;
  }
}

export default function ValsIndexTable({ selectedLab }: { selectedLab: string | null }) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = VALS_INDEX_MODELS.filter(
      (m) =>
        (!selectedLab || m.labKey === selectedLab) &&
        (!q || m.name.toLowerCase().includes(q) || m.lab.toLowerCase().includes(q))
    );
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => compare(a, b, sortKey) * dir || a.rank - b.rank);
  }, [selectedLab, query, sortKey, sortDir]);

  const visible = showAll ? rows : rows.slice(0, PAGE_SIZE);

  const sortBy = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(COLUMNS.find((c) => c.key === key)!.firstDir);
    }
  };

  const sortLabel = `${COLUMNS.find((c) => c.key === sortKey)!.label}, ${
    sortDir === "asc" ? "ascending" : "descending"
  }`;

  return (
    <section className={styles.section} aria-labelledby="index-leaderboard-heading">
      <div className={styles.headerRow}>
        <div>
          <h2 id="index-leaderboard-heading" className={styles.heading}>
            Leaderboard
          </h2>
          <p className={styles.meta}>
            Version {LEADERBOARD_META.version} · {LEADERBOARD_META.rankedCount} ranked models ·{" "}
            {LEADERBOARD_META.preliminaryCount} preliminary (fewer than {LEADERBOARD_META.minRuns} runs) in the{" "}
            <Link href="/models" className={styles.inlineLink}>
              model registry
            </Link>
          </p>
        </div>

        <div className={styles.controls}>
          <label className={styles.search}>
            <Search size={14} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models"
              aria-label="Search the leaderboard"
            />
          </label>

          {/* Phones have no column headers, so sorting is a select */}
          <label className={styles.mobileSort}>
            <span>Sort</span>
            <select
              value={`${sortKey}:${sortDir}`}
              onChange={(e) => {
                const [key, dir] = e.target.value.split(":") as [SortKey, SortDir];
                setSortKey(key);
                setSortDir(dir);
              }}
            >
              <option value="rank:asc">Rank</option>
              <option value="drs:desc">Highest DRS</option>
              <option value="accuracy:desc">Highest accuracy</option>
              <option value="latency:asc">Fastest</option>
              <option value="runs:desc">Most runs</option>
              <option value="name:asc">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <caption className={styles.srOnly}>
            OpenVals leaderboard, {rows.length} models, sorted by {sortLabel}
          </caption>
          <thead>
            <tr>
              {COLUMNS.map((col) => {
                const active = col.key === sortKey;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`${styles[`col_${col.key}`]} ${col.numeric ? styles.numeric : ""}`}
                    aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button type="button" className={styles.sortButton} onClick={() => sortBy(col.key)}>
                      <span>{col.label}</span>
                      {active ? (
                        sortDir === "asc" ? (
                          <ArrowUp size={12} aria-hidden="true" />
                        ) : (
                          <ArrowDown size={12} aria-hidden="true" />
                        )
                      ) : (
                        <ArrowUpDown size={12} aria-hidden="true" className={styles.sortIdle} />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className={styles.empty}>
                  No ranked model matches “{query}”.
                </td>
              </tr>
            )}
            {visible.map((m) => {
              const tied = RANK_COUNTS[m.rank] > 1;
              return (
                <tr key={m.id}>
                  <td className={styles.col_rank}>
                    <span
                      className={m.rank <= 3 ? styles.rankTop : styles.rank}
                      title={tied ? `Tied for #${m.rank}` : undefined}
                    >
                      {tied ? "=" : "#"}
                      {m.rank}
                    </span>
                  </td>
                  <td className={styles.col_name}>
                    <div className={styles.modelCell}>
                      <Link href={`/models?model=${encodeURIComponent(m.id)}`} className={styles.modelLink}>
                        {m.name}
                      </Link>
                      {m.version && <span className={styles.params}>{m.version}</span>}
                      {m.onFrontier && (
                        <span className={styles.frontierTag} title="On the accuracy vs latency frontier">
                          Frontier
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={styles.col_lab}>{m.lab}</td>
                  <td className={`${styles.col_drs} ${styles.numeric}`}>
                    <span className={styles.drs}>{m.drs.toFixed(1)}</span>
                    {m.drsCi !== null && <span className={styles.ci}> ±{m.drsCi.toFixed(1)}</span>}
                  </td>
                  <td className={`${styles.col_accuracy} ${styles.numeric}`}>{m.accuracy.toFixed(1)}%</td>
                  <td className={`${styles.col_latency} ${styles.numeric}`}>{formatLatency(m.latency)}</td>
                  <td className={`${styles.col_runs} ${styles.numeric}`}>{m.runs}</td>
                  {/* Phones only: accuracy · latency · runs on one line */}
                  <td className={styles.col_phoneStats} aria-hidden="true">
                    {m.accuracy.toFixed(1)}% accuracy · {formatLatency(m.latency)} · {m.runs} runs
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={styles.footer}>
          <span>
            Showing {visible.length} of {rows.length}
            {selectedLab ? ` ${selectedLab} models` : " ranked models"}. “=” marks a shared rank; ± is the 95%
            confidence interval across runs.
          </span>
          {rows.length > PAGE_SIZE && (
            <button type="button" className={styles.moreButton} onClick={() => setShowAll((s) => !s)}>
              {showAll ? `Show top ${PAGE_SIZE}` : `Show all ${rows.length}`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
