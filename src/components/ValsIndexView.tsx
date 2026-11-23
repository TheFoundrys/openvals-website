"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowUpDown,
  ChevronsUpDown,
  SlidersHorizontal,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";
import styles from "./ValsIndexView.module.css";
import ValsIndexChart from "./ValsIndexChart";
import { LAB_LEGENDS, VALS_INDEX_MODELS, ValsIndexModel } from "./valsIndexData";

function formatRealUpdatedDate(date: Date): string {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function ValsIndexView() {
  const [updatedLabel, setUpdatedLabel] = useState(() =>
    formatRealUpdatedDate(new Date())
  );

  useEffect(() => {
    setUpdatedLabel(formatRealUpdatedDate(new Date()));
  }, []);

  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"latency" | "drs">("latency");
  const [sortOrder, setSortOrder] = useState<"accuracy" | "latency" | "drs">(
    "accuracy"
  );
  const [selectedModel, setSelectedModel] = useState<ValsIndexModel | null>(
    null
  );
  const [showTable, setShowTable] = useState(false);
  const [mobileTab, setMobileTab] = useState<"chart" | "list">("chart");

  const toggleLabFilter = (labKey: string) => {
    if (selectedLab === labKey) {
      setSelectedLab(null);
    } else {
      setSelectedLab(labKey);
    }
  };

  const filteredModels = selectedLab
    ? VALS_INDEX_MODELS.filter((m) => m.labKey === selectedLab)
    : VALS_INDEX_MODELS;

  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOrder === "accuracy") {
      return b.accuracy - a.accuracy;
    }
    if (sortOrder === "latency") {
      return a.latency - b.latency;
    }
    if (sortOrder === "drs") {
      return b.drs - a.drs;
    }
    return b.accuracy - a.accuracy;
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 1. TITLE & EDITORIAL HEADER */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>OpenVals Index</h1>

          <div className={styles.metaLine}>
            <span className={styles.metaPill}>UPDATED {updatedLabel}</span>
            <span className={styles.versionDropdown}>
              <span>VERSION 0.5.5</span>
              <ChevronsUpDown size={11} />
            </span>
            <span className={styles.metaPill}>GDP-WEIGHTED AGENT BENCHMARK</span>
          </div>

          <p className={styles.description}>
            A rigorous composite measure of AI&apos;s potential economic impact — evaluating
            leading frontier and open-weight models across finance, coding, and legal tasks,
            empirically weighted by each sector&apos;s share of U.S. GDP.
          </p>
        </div>

        {/* 2. BENCHMARK SUB-BAR & SEGMENTED CONTROLS */}
        <div className={styles.controlBar}>
          <div className={styles.controlBarLeft}>
            <span className={styles.controlTitle}>Frontier Space</span>
            <span className={styles.controlSubtitle}>
              {viewMode === "latency" ? "Accuracy vs Latency Trade-Off" : "Accuracy vs Decision Reliability"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* SEGMENTED VIEW MODE TOGGLE */}
            <div className={styles.segmentedControl} role="tablist" aria-label="Index View Mode">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "latency"}
                className={`${styles.segmentBtn} ${
                  viewMode === "latency" ? styles.segmentBtnActive : ""
                }`}
                onClick={() => {
                  setViewMode("latency");
                  setSortOrder("accuracy");
                }}
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
                className={`${styles.segmentBtn} ${
                  viewMode === "drs" ? styles.segmentBtnActive : ""
                }`}
                onClick={() => {
                  setViewMode("drs");
                  setSortOrder("accuracy");
                }}
                title="View Trust Frontier: Accuracy vs Decision Reliability Score (DRS)"
              >
                <ShieldCheck size={13} color="#06b6d4" />
                <span>Accuracy vs DRS</span>
                <span className={styles.segmentTag} style={{ background: "rgba(6, 182, 212, 0.12)", color: "#06b6d4" }}>
                  Trust Frontier
                </span>
              </button>
            </div>

            {/* SORT ORDER TOGGLE */}
            <button
              type="button"
              className={styles.sortToggleBtn}
              onClick={() => {
                if (sortOrder === "accuracy") {
                  setSortOrder(viewMode === "latency" ? "latency" : "drs");
                } else {
                  setSortOrder("accuracy");
                }
              }}
              title="Toggle sorting order between Accuracy and current axis"
            >
              <ArrowUpDown size={13} />
              <span>
                Sort:{" "}
                {sortOrder === "accuracy"
                  ? "Highest Accuracy"
                  : sortOrder === "latency"
                  ? "Fastest Latency"
                  : "Highest DRS"}
              </span>
            </button>
          </div>
        </div>

        {/* 3. LAB FILTER & LEGEND ROW */}
        <div className={styles.legendRow}>
          <div className={styles.labChipsList}>
            {LAB_LEGENDS.map((item) => {
              const isActive = selectedLab === item.key;
              const modelCount = VALS_INDEX_MODELS.filter((m) => m.labKey === item.key).length;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleLabFilter(item.key)}
                  className={`${styles.labChip} ${
                    isActive ? styles.labChipActive : ""
                  }`}
                  title={`Filter by ${item.label} (${modelCount} models)`}
                >
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {selectedLab && (
              <button
                type="button"
                onClick={() => setSelectedLab(null)}
                className={styles.clearFilterBtn}
                title="Clear active filter"
              >
                <span>Clear Filter ({selectedLab}) &times;</span>
              </button>
            )}
          </div>

          <div className={styles.showingCount}>
            Showing {filteredModels.length} of {VALS_INDEX_MODELS.length} Models
          </div>
        </div>

        {/* 4. MOBILE VIEW SWITCHER (CHART vs LIST) */}
        <div className={styles.mobileViewSwitcher}>
          <button
            type="button"
            className={`${styles.mobileViewBtn} ${
              mobileTab === "chart" ? styles.mobileViewBtnActive : ""
            }`}
            onClick={() => setMobileTab("chart")}
          >
            <TrendingUp size={14} />
            <span>Interactive Chart</span>
          </button>
          <button
            type="button"
            className={`${styles.mobileViewBtn} ${
              mobileTab === "list" ? styles.mobileViewBtnActive : ""
            }`}
            onClick={() => setMobileTab("list")}
          >
            <SlidersHorizontal size={14} />
            <span>Model List ({filteredModels.length})</span>
          </button>
        </div>

        {/* 5. INTERACTIVE SCATTER PLOT & PARETO FRONTIER */}
        {mobileTab === "chart" ? (
          <ValsIndexChart
            selectedLab={selectedLab}
            onSelectModel={setSelectedModel}
            viewMode={viewMode}
          />
        ) : (
          /* MOBILE MODEL LIST VIEW */
          <div className={styles.tableMobileCardsWrapper} style={{ display: "flex" }}>
            {sortedModels.map((m, idx) => (
              <div
                key={m.id}
                className={styles.modelCardItem}
                style={{
                  borderColor:
                    selectedModel?.id === m.id ? "#10b981" : "var(--border)",
                  boxShadow:
                    selectedModel?.id === m.id
                      ? "0 0 0 1px #10b981, 0 4px 14px rgba(16, 185, 129, 0.15)"
                      : undefined,
                }}
              >
                <div className={styles.modelCardHeader}>
                  <div className={styles.modelCardName}>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      #{idx + 1}
                    </span>
                    <span>{m.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {m.onFrontier && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "rgba(16, 185, 129, 0.15)",
                          color: "#10b981",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        FRONTIER
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "2px 7px",
                        borderRadius: "4px",
                        background: m.badgeColor,
                        color: m.badgeTextColor,
                        textTransform: "uppercase",
                      }}
                    >
                      {m.lab}
                    </span>
                  </div>
                </div>

                <div className={styles.modelCardMetrics}>
                  <div className={styles.modelCardMetricCol}>
                    <span className={styles.modelCardMetricLabel}>Accuracy</span>
                    <span
                      className={styles.modelCardMetricVal}
                      style={{ color: "#10b981" }}
                    >
                      {m.accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className={styles.modelCardMetricCol}>
                    <span className={styles.modelCardMetricLabel}>Latency</span>
                    <span
                      className={styles.modelCardMetricVal}
                      style={{
                        color:
                          viewMode === "latency"
                            ? "#10b981"
                            : "var(--text-main)",
                      }}
                    >
                      {m.latencyLabel}
                    </span>
                  </div>
                  <div className={styles.modelCardMetricCol}>
                    <span className={styles.modelCardMetricLabel}>DRS Score</span>
                    <span
                      className={styles.modelCardMetricVal}
                      style={{ color: "#06b6d4" }}
                    >
                      {m.drsLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. KEY TAKEAWAYS SECTION */}
        <div className={styles.takeawaysSection}>
          <h2 className={styles.takeawaysHeading}>Key Empirical Takeaways</h2>

          <div className={styles.takeawaysGrid}>
            <div className={styles.takeawayCard}>
              <div
                className={styles.takeawayCardTopBar}
                style={{ background: "#10b981" }}
              />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}
                >
                  <TrendingUp size={18} />
                </div>
                <span>The Latency Frontier Curve</span>
              </div>
              <p className={styles.takeawayCardDesc}>
                Non-dominated champions trace the optimal trade-off boundary
                between latency and accuracy: Willow Alpha (303ms, 12.4%), Supra
                50M (581ms, 37.3%), OneLLM Doey (972ms, 47.2%), Yi-Coder (2.1s,
                69.8%), Granite 3.3 (2.4s, 96.7%), Hunyuan 1.8B (15.3s, 98.3%),
                and DeepScaler 1.5B (19.4s, 100.0%).
              </p>
            </div>

            <div className={styles.takeawayCard}>
              <div
                className={styles.takeawayCardTopBar}
                style={{ background: "#06b6d4" }}
              />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(6, 182, 212, 0.12)", color: "#06b6d4" }}
                >
                  <Zap size={18} />
                </div>
                <span>Decision Reliability (DRS) Leaders</span>
              </div>
              <p className={styles.takeawayCardDesc}>
                OpenChat 7B (63.1%), LFM 2.5 (61.6%), and Granite 3.3 (61.4%)
                demonstrate top-tier decision reliability scores, proving
                exceptional consistency and reasoning stability under complex
                multi-step agent workflows.
              </p>
            </div>

            <div className={styles.takeawayCard}>
              <div
                className={styles.takeawayCardTopBar}
                style={{ background: "#f43f5e" }}
              />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(244, 63, 94, 0.12)", color: "#f43f5e" }}
                >
                  <ShieldCheck size={18} />
                </div>
                <span>Frontier Ceiling: DeepScaler 1.5B</span>
              </div>
              <p className={styles.takeawayCardDesc}>
                Agentica&apos;s DeepScaler 1.5B commands the non-dominated
                performance ceiling with a 100.0% benchmark score across all
                evaluated workflows, combining perfect task execution with
                fast sub-20s response times and strong 57.7% DRS score.
              </p>
            </div>

            <div className={styles.takeawayCard}>
              <div
                className={styles.takeawayCardTopBar}
                style={{ background: "#eab308" }}
              />
              <div className={styles.takeawayCardTitle}>
                <div
                  className={styles.takeawayIconWrap}
                  style={{ background: "rgba(234, 179, 8, 0.12)", color: "#eab308" }}
                >
                  <Cpu size={18} />
                </div>
                <span>Ultra-Fast Sub-Second Inference</span>
              </div>
              <p className={styles.takeawayCardDesc}>
                Sub-1B parameter models like Willow Alpha (303ms) and Supra 50M
                (581ms) prove that high-throughput triage, routing, and data
                extraction can be served in mere hundreds of milliseconds.
              </p>
            </div>
          </div>

          {/* TABLE EXPANDER */}
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setShowTable(!showTable)}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "11px 22px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--text-main)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.15s ease",
              }}
            >
              <SlidersHorizontal size={14} />
              <span>
                {showTable
                  ? "Hide Benchmark Data Table"
                  : `View Full Model Data Table (${filteredModels.length} Models)`}
              </span>
            </button>
          </div>

          {/* COLLAPSIBLE DATA TABLE */}
          {showTable && (
            <>
              {/* Desktop Table */}
              <div className={styles.tableDesktopWrapper}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "var(--secondary-bg)",
                        borderBottom: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <th style={{ padding: "14px 18px" }}>Model</th>
                      <th style={{ padding: "14px 18px" }}>Lab</th>
                      <th style={{ padding: "14px 18px" }}>Cost/Task</th>
                      <th style={{ padding: "14px 18px" }}>Accuracy %</th>
                      <th style={{ padding: "14px 18px" }}>Latency</th>
                      <th style={{ padding: "14px 18px" }}>DRS Score</th>
                      <th style={{ padding: "14px 18px" }}>Frontier Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedModels.map((m, idx) => (
                      <tr
                        key={m.id}
                        style={{
                          borderBottom: "1px solid var(--border)",
                          background:
                            selectedModel?.id === m.id
                              ? "rgba(16, 185, 129, 0.12)"
                              : idx % 2 === 0
                              ? "transparent"
                              : "var(--secondary-bg)",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedModel(selectedModel?.id === m.id ? null : m)}
                      >
                        <td
                          style={{
                            padding: "12px 18px",
                            fontWeight: 600,
                            color: "var(--text-main)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: m.badgeColor,
                                display: "inline-block",
                              }}
                            />
                            <span>{m.name}</span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 18px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {m.lab}
                        </td>
                        <td
                          style={{
                            padding: "12px 18px",
                            color: "var(--text-muted)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {m.costLabel}
                        </td>
                        <td
                          style={{
                            padding: "12px 18px",
                            fontWeight: 600,
                            color: "#10b981",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {m.accuracy.toFixed(1)}%
                        </td>
                        <td
                          style={{
                            padding: "12px 18px",
                            fontWeight: 600,
                            color:
                              viewMode === "latency"
                                ? "#10b981"
                                : "var(--text-muted)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {m.latencyLabel}
                        </td>
                        <td
                          style={{
                            padding: "12px 18px",
                            fontWeight: 600,
                            color:
                              viewMode === "drs"
                                ? "#06b6d4"
                                : "var(--text-muted)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {m.drsLabel}
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          {m.onFrontier ? (
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                padding: "2px 7px",
                                borderRadius: "4px",
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10b981",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                              }}
                            >
                              CHAMPION
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                              Evaluated
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Table Cards */}
              <div className={styles.tableMobileCardsWrapper}>
                {sortedModels.map((m, idx) => (
                  <div
                    key={m.id}
                    className={styles.modelCardItem}
                    style={{
                      borderColor:
                        selectedModel?.id === m.id
                          ? "#10b981"
                          : "var(--border)",
                    }}
                  >
                    <div className={styles.modelCardHeader}>
                      <div className={styles.modelCardName}>
                        <span
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          #{idx + 1}
                        </span>
                        <span>{m.name}</span>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: "4px",
                          background: m.badgeColor,
                          color: m.badgeTextColor,
                          textTransform: "uppercase",
                        }}
                      >
                        {m.lab}
                      </span>
                    </div>

                    <div className={styles.modelCardMetrics}>
                      <div className={styles.modelCardMetricCol}>
                        <span className={styles.modelCardMetricLabel}>
                          Accuracy
                        </span>
                        <span
                          className={styles.modelCardMetricVal}
                          style={{ color: "#10b981" }}
                        >
                          {m.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div className={styles.modelCardMetricCol}>
                        <span className={styles.modelCardMetricLabel}>
                          Latency
                        </span>
                        <span
                          className={styles.modelCardMetricVal}
                          style={{
                            color:
                              viewMode === "latency"
                                ? "#10b981"
                                : "var(--text-main)",
                          }}
                        >
                          {m.latencyLabel}
                        </span>
                      </div>
                      <div className={styles.modelCardMetricCol}>
                        <span className={styles.modelCardMetricLabel}>
                          DRS Score
                        </span>
                        <span
                          className={styles.modelCardMetricVal}
                          style={{ color: "#06b6d4" }}
                        >
                          {m.drsLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
