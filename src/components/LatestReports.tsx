"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Search,
} from "lucide-react";
import styles from "./LatestReports.module.css";
import {
  AGGREGATED_MODELS,
  ALL_BENCHMARK_RUNS,
} from "./modelBenchmarkData";

const LAB_FILTER_TABS: string[] = [
  "All Models",
  "Alibaba",
  "Deepseek",
  "Google",
  "Meta",
  "Microsoft",
  "IBM",
  "Liquid AI",
  "Hugging Face",
  "Mistral AI",
  "Stability AI",
  "01.AI",
  "Agentica",
  "Big Science",
  "BigScience",
  "Doey LLM",
  "North ML",
  "Nous Research",
  "Open BMB",
  "Open Source",
  "Open-Source",
  "Prism ML",
  "PROMTECH Inc",
  "QVAC",
  "Supra",
  "TII",
  "Tencent",
  "VLTX",
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function formatPercent(val: string | number | undefined | null): string {
  if (val === undefined || val === null || val === "") return "-";
  const str = String(val).trim();
  if (str.endsWith("%")) return str;
  const num = parseFloat(str);
  if (isNaN(num)) return str;
  return `${(num * 100).toFixed(1)}%`;
}


export default function LatestReports() {
  const [selectedLab, setSelectedLab] = useState<string>("All Models");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"aggregated" | "all">("aggregated");
  const tabListRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({
        left: direction === "left" ? -240 : 240,
        behavior: "smooth",
      });
    }
  };

  // Filter aggregated models
  const filteredAggregated = useMemo(() => {
    return AGGREGATED_MODELS.filter((model) => {
      const matchesLab =
        selectedLab === "All Models" ||
        model.lab.toLowerCase() === selectedLab.toLowerCase() ||
        (selectedLab === "Open Source" && model.lab.toLowerCase().includes("open")) ||
        (selectedLab === "Big Science" && model.lab.toLowerCase().includes("big"));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        model.name.toLowerCase().includes(query) ||
        model.lab.toLowerCase().includes(query) ||
        model.params.toLowerCase().includes(query);

      return matchesLab && matchesSearch;
    });
  }, [selectedLab, searchQuery]);

  // Filter raw runs
  const filteredRuns = useMemo(() => {
    return ALL_BENCHMARK_RUNS.filter((run) => {
      const matchesLab =
        selectedLab === "All Models" ||
        run.lab.toLowerCase() === selectedLab.toLowerCase() ||
        (selectedLab === "Open Source" && run.lab.toLowerCase().includes("open")) ||
        (selectedLab === "Big Science" && run.lab.toLowerCase().includes("big"));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        run.name.toLowerCase().includes(query) ||
        run.lab.toLowerCase().includes(query) ||
        run.params.toLowerCase().includes(query);

      return matchesLab && matchesSearch;
    });
  }, [selectedLab, searchQuery]);

  return (
    <div className={styles.reportsContainer} style={{ width: "100%" }}>
      {/* SECTION HEADER */}
      <motion.div
        className={styles.headerSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={FADE_UP}
      >
        <h2 className={styles.title}>Latest Reports</h2>
        <p className={styles.subtitle}>
          Recent benchmark releases and model evaluations across open-weight and enterprise AI.
        </p>
      </motion.div>

      {/* CAROUSEL TABS FOR LABS */}
      <div className={styles.carouselBar}>
        <button
          onClick={() => scrollTabs("left")}
          className={styles.navArrowBtn}
          title="Scroll Left"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={16} />
        </button>

        <div className={styles.tabList} ref={tabListRef}>
          {LAB_FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedLab(tab)}
              className={`${styles.tabPill} ${
                selectedLab === tab ? styles.tabPillActive : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTabs("right")}
          className={styles.navArrowBtn}
          title="Scroll Right"
          aria-label="Scroll Right"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* FILTER & CONTROLS ROW */}
      <div className={styles.filterRow}>
        <h3 className={styles.reportHeadline}>
          {selectedLab === "All Models"
            ? `Validated Model Registry (${
                viewMode === "aggregated" ? filteredAggregated.length : filteredRuns.length
              })`
            : `${selectedLab} Evaluations (${
                viewMode === "aggregated" ? filteredAggregated.length : filteredRuns.length
              })`}
        </h3>

        <div className={styles.filterControlsRight}>
          {/* Toggle between Aggregated View and All Benchmark Runs */}
          <div className={styles.toggleGroup}>
            <button
              onClick={() => setViewMode("aggregated")}
              className={`${styles.toggleBtn} ${
                viewMode === "aggregated" ? styles.toggleBtnActive : ""
              }`}
              title="Show consolidated metrics per model"
            >
              Aggregated Models ({filteredAggregated.length})
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`${styles.toggleBtn} ${
                viewMode === "all" ? styles.toggleBtnActive : ""
              }`}
              title="Show all individual benchmark evaluation runs"
            >
              All Runs ({filteredRuns.length})
            </button>
          </div>

          {/* Search box */}
          <div className={styles.searchBoxWrap}>
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search models, sizes, labs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* REPORT CARD */}
      <div className={styles.reportCard}>
        {/* TOP BAR / LEGEND */}
        <div className={styles.cardTopBar}>
          <div className={styles.valsLogoBadge}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#10b981" strokeWidth="1.6" />
              <path
                d="M6.5 7L10 13.5L13.5 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Latest Openvals Validation Metrics</span>
          </div>
        </div>

        {/* VALIDATION METRICS MULTI-TIER TABLE */}
        <div className={styles.tableResponsiveWrapper}>
          <table
            className={styles.reportTable}
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
            }}
          >
            <thead>
              {/* TIER 1: GROUP HEADERS */}
              <tr className={styles.superHeaderRow}>
                <th
                  className={styles.groupHeaderBenchmarks}
                  style={{ width: "240px" }}
                >
                  MODELS
                </th>
                <th colSpan={3} className={styles.groupHeaderPerformance}>
                  Performance
                </th>
                <th colSpan={5} className={styles.groupHeaderTrust}>
                  Trust
                </th>
                <th
                  className={styles.groupHeaderRankings}
                  style={{ width: "80px" }}
                >
                  RANKINGS
                </th>
              </tr>

              {/* TIER 2: METRIC COLUMNS */}
              <tr className={styles.subHeaderRow}>
                <th
                  className={styles.groupHeaderBenchmarksSub}
                  style={{ width: "240px" }}
                />
                {/* Performance columns */}
                <th className={styles.subPerfTh} style={{ width: "110px" }}>
                  Accuracy
                </th>
                <th className={styles.subPerfTh} style={{ width: "80px" }}>
                  Semantic
                </th>
                <th className={styles.subPerfTh} style={{ width: "95px" }}>
                  Latency
                </th>

                {/* Trust columns */}
                <th className={styles.subTrustTh} style={{ width: "85px" }}>
                  Factuality
                </th>
                <th className={styles.subTrustTh} style={{ width: "95px" }}>
                  Hallucination
                </th>
                <th className={styles.subTrustTh} style={{ width: "75px" }}>
                  Safety
                </th>
                <th className={styles.subTrustTh} style={{ width: "85px" }}>
                  Reliability
                </th>
                <th
                  className={`${styles.subTrustTh} ${styles.drsHeader}`}
                  style={{ width: "75px" }}
                >
                  DRS
                </th>
                <th
                  className={styles.groupHeaderRankingsSub}
                  style={{ width: "80px" }}
                />
              </tr>
            </thead>
            <tbody>
              {viewMode === "aggregated" ? (
                filteredAggregated.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      No models found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredAggregated.map((row) => {
                    const solidWidth = Math.min(100, Math.max(2, row.accuracyNum * 100));

                    return (
                      <tr key={row.id} className={styles.tableDataRow}>
                        {/* Model Name, Params, Size, Lab */}
                        <td>
                          <div className={styles.modelCell}>
                            <span className={styles.modelIconWrap}>
                              {row.name.includes("coder") || row.name.includes("instruct") ? (
                                <Code2 size={14} />
                              ) : (
                                <Cpu size={14} />
                              )}
                            </span>
                            <span style={{ fontFamily: "var(--font-inter), monospace", fontWeight: 700 }}>
                              {row.name}
                            </span>
                            <span className={styles.paramBadge}>{row.params}</span>
                            <span className={styles.sizeBadge}>{row.size}</span>
                          </div>
                        </td>

                        {/* PERFORMANCE: Accuracy with micro bar */}
                        <td className={styles.numCell}>
                          <div className={styles.accuracyCellWrapper}>
                            <span className={styles.accuracyScore}>{row.accuracy}</span>
                            <div className={styles.microBarTrack}>
                              <div
                                className={styles.microBarFill}
                                style={{
                                  width: `${solidWidth}%`,
                                  backgroundColor: "#10b981",
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* PERFORMANCE: Semantic */}
                        <td className={styles.numCell}>{formatPercent(row.semantic)}</td>

                        {/* PERFORMANCE: Latency */}
                        <td className={styles.numCell}>{row.latency}</td>

                        {/* TRUST: Factuality */}
                        <td className={styles.numCell}>{formatPercent(row.factuality)}</td>

                        {/* TRUST: Hallucination */}
                        <td className={styles.numCell}>{formatPercent(row.hallucination)}</td>

                        {/* TRUST: Safety */}
                        <td className={styles.numCell}>{formatPercent(row.safety)}</td>

                        {/* TRUST: Reliability */}
                        <td className={styles.numCell}>{formatPercent(row.reliability)}</td>

                        {/* TRUST: DRS (Decision Reliability Score) */}
                        <td className={styles.drsCell}>{formatPercent(row.drs)}</td>

                        {/* Rankings */}
                        <td className={styles.rankingsCell}>{row.rank}</td>
                      </tr>
                    );
                  })
                )
              ) : (
                /* RAW BENCHMARK RUNS VIEW (All 173 rows) */
                filteredRuns.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      No evaluation runs found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredRuns.map((row) => {
                    const solidWidth = Math.min(100, Math.max(2, row.accuracyNum * 100));

                    return (
                      <tr key={row.id} className={styles.tableDataRow}>
                        {/* Model Name, Params, Size */}
                        <td>
                          <div className={styles.modelCell}>
                            <span className={styles.modelIconWrap}>
                              <Layers size={13} />
                            </span>
                            <span style={{ fontFamily: "var(--font-inter), monospace", fontWeight: 700 }}>
                              {row.name}
                            </span>
                            <span className={styles.paramBadge}>{row.params}</span>
                            <span className={styles.sizeBadge}>{row.size}</span>
                            <span className={styles.modelTag}>{row.lab}</span>
                          </div>
                        </td>

                        {/* PERFORMANCE: Accuracy with micro bar */}
                        <td className={styles.numCell}>
                          <div className={styles.accuracyCellWrapper}>
                            <span className={styles.accuracyScore}>{row.accuracy}</span>
                            <div className={styles.microBarTrack}>
                              <div
                                className={styles.microBarFill}
                                style={{
                                  width: `${solidWidth}%`,
                                  backgroundColor: "#0284c7",
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* PERFORMANCE: Semantic */}
                        <td className={styles.numCell}>{formatPercent(row.semantic)}</td>

                        {/* PERFORMANCE: Latency */}
                        <td className={styles.numCell}>{row.latency}</td>

                        {/* TRUST: Factuality */}
                        <td className={styles.numCell}>{formatPercent(row.factuality)}</td>

                        {/* TRUST: Hallucination */}
                        <td className={styles.numCell}>{formatPercent(row.hallucination)}</td>

                        {/* TRUST: Safety */}
                        <td className={styles.numCell}>{formatPercent(row.safety)}</td>

                        {/* TRUST: Reliability */}
                        <td className={styles.numCell}>{formatPercent(row.reliability)}</td>

                        {/* TRUST: DRS */}
                        <td className={styles.drsCell}>{formatPercent(row.drs)}</td>

                        {/* Rankings */}
                        <td className={styles.rankingsCell}>{row.rank}</td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className={styles.cardFooter}>
          <div className={styles.summaryInfo}>
            <span className={styles.infoCircle}>i</span>
            <span>
              Showing{" "}
              {viewMode === "aggregated" ? filteredAggregated.length : filteredRuns.length}{" "}
              evaluated records from OpenVals Performance & Trust validation suite.
            </span>
          </div>

          <Link
            href="/methodology"
            className={styles.viewModelLink}
            title="View complete evaluation methodology & documentation"
          >
            <span>VIEW METHODOLOGY</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
