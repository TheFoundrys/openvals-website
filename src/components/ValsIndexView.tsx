"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function ValsIndexView() {
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"latency" | "drs">("latency");
  const [sortOrder, setSortOrder] = useState<"accuracy" | "latency" | "drs">(
    "accuracy"
  );
  const [selectedModel, setSelectedModel] = useState<ValsIndexModel | null>(
    null
  );
  const [showTable, setShowTable] = useState(false);

  const toggleLabFilter = (labKey: string) => {
    if (selectedLab === labKey) {
      setSelectedLab(null);
    } else {
      setSelectedLab(labKey);
    }
  };

  const sortedModels = [...VALS_INDEX_MODELS].sort((a, b) => {
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
        {/* 2. TITLE & EDITORIAL HEADER */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>OpenVals Index</h1>

          <div className={styles.metaLine}>
            <span>UPDATED 9/23/2026</span>
            <span>|</span>
            <div className={styles.versionDropdown}>
              <span>VERSION 0.5.5</span>
              <ChevronsUpDown size={11} />
            </div>
          </div>

          <p className={styles.description}>
            A single measure of AI&apos;s potential economic impact — agentic
            model performance across finance, coding, and legal tasks, weighted
            by each sector&apos;s share of U.S. GDP.
          </p>
        </div>

        {/* 3. BENCHMARK SUB-BAR & CONTROLS */}
        <div className={styles.controlBar}>
          <div className={styles.controlBarLeft}>
            <span className={styles.controlTitle}>OpenVals Index</span>
            <span className={styles.controlSubtitle}>
              GDP-weighted benchmark
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* ACCURACY ↔ LATENCY MODE TOGGLE */}
            <button
              type="button"
              className={`${styles.axisToggle} ${
                viewMode === "latency" ? styles.axisToggleActive : ""
              }`}
              onClick={() => {
                if (viewMode === "latency") {
                  setSortOrder((prev) =>
                    prev === "accuracy" ? "latency" : "accuracy"
                  );
                } else {
                  setViewMode("latency");
                  setSortOrder("accuracy");
                }
              }}
              title="View and sort by Accuracy vs Latency"
            >
              <ArrowUpDown size={12} />
              <span>
                {viewMode === "latency" && sortOrder === "latency"
                  ? "↔ LATENCY  ↕ ACCURACY ↕"
                  : "↕ ACCURACY  ↔ LATENCY ↕"}
              </span>
            </button>

            {/* ACCURACY ↔ DRS MODE TOGGLE */}
            <button
              type="button"
              className={`${styles.axisToggle} ${
                viewMode === "drs" ? styles.axisToggleActive : ""
              }`}
              onClick={() => {
                if (viewMode === "drs") {
                  setSortOrder((prev) =>
                    prev === "accuracy" ? "drs" : "accuracy"
                  );
                } else {
                  setViewMode("drs");
                  setSortOrder("accuracy");
                }
              }}
              title="View and sort by Accuracy vs Decision Reliability Score (DRS)"
            >
              <ArrowUpDown size={12} />
              <span>
                {viewMode === "drs" && sortOrder === "drs"
                  ? "↔ DRS  ↕ ACCURACY ↕"
                  : "↕ ACCURACY  ↔ DRS ↕"}
              </span>
            </button>
          </div>
        </div>

        {/* 4. LAB FILTER & LEGEND ROW */}
        <div className={styles.legendRow}>
          <div className={styles.labChipsList}>
            {LAB_LEGENDS.map((item) => {
              const isActive = selectedLab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleLabFilter(item.key)}
                  className={`${styles.labChip} ${
                    isActive ? styles.labChipActive : ""
                  }`}
                  title={`Filter by ${item.label}`}
                >
                  <span
                    className={styles.colorSquare}
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
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "11px",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Clear Filter &times;
              </button>
            )}
          </div>

          <div className={styles.showingCount}>
            SHOWING LATEST, TOP &amp; FRONTIER MODELS ({VALS_INDEX_MODELS.length})
          </div>
        </div>

        {/* 5. INTERACTIVE SCATTER PLOT & PARETO FRONTIER */}
        <ValsIndexChart
          selectedLab={selectedLab}
          onSelectModel={setSelectedModel}
          viewMode={viewMode}
        />

        {/* 6. KEY TAKEAWAYS SECTION */}
        <div className={styles.takeawaysSection}>
          <h2 className={styles.takeawaysHeading}>Key Takeaways</h2>

          <div className={styles.takeawaysGrid}>
            <div className={styles.takeawayCard}>
              <div className={styles.takeawayCardTitle}>
                <TrendingUp size={18} color="#16a34a" />
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
              <div className={styles.takeawayCardTitle}>
                <Zap size={18} color="#0284c7" />
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
              <div className={styles.takeawayCardTitle}>
                <ShieldCheck size={18} color="#9333ea" />
                <span>Frontier Ceiling: DeepScaler 1.5B</span>
              </div>
              <p className={styles.takeawayCardDesc}>
                Agentica&apos;s DeepScaler 1.5B commands the non-dominated
                performance ceiling with 100.0% benchmark score across all
                evaluated workflows, combining perfect task execution with
                fast sub-20s response times and strong 57.7% DRS score.
              </p>
            </div>

            <div className={styles.takeawayCard}>
              <div className={styles.takeawayCardTitle}>
                <Cpu size={18} color="#f97316" />
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
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setShowTable(!showTable)}
              style={{
                background: "var(--secondary-bg)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-main)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
            >
              <SlidersHorizontal size={14} />
              <span>
                {showTable
                  ? "Hide Model Data Table"
                  : `View Full Model Data Table (${VALS_INDEX_MODELS.length} Models)`}
              </span>
            </button>
          </div>

          {/* COLLAPSIBLE DATA TABLE */}
          {showTable && (
            <div
              style={{
                marginTop: "20px",
                overflowX: "auto",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
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
                    <th style={{ padding: "12px 16px" }}>Model</th>
                    <th style={{ padding: "12px 16px" }}>Lab</th>
                    <th style={{ padding: "12px 16px" }}>Accuracy %</th>
                    <th style={{ padding: "12px 16px" }}>Latency</th>
                    <th style={{ padding: "12px 16px" }}>DRS Score</th>
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
                            ? "rgba(59, 130, 246, 0.15)"
                            : idx % 2 === 0
                            ? "transparent"
                            : "var(--secondary-bg)",
                      }}
                    >
                      <td style={{ padding: "10px 16px", fontWeight: 700, color: "var(--text-main)" }}>
                        {m.name}
                      </td>
                      <td style={{ padding: "10px 16px", color: "var(--text-muted)" }}>
                        {m.lab}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          fontWeight: 700,
                          color: "#16a34a",
                        }}
                      >
                        {m.accuracy.toFixed(1)}%
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          fontWeight: 600,
                          color:
                            viewMode === "latency" ? "#16a34a" : "var(--text-muted)",
                        }}
                      >
                        {m.latencyLabel}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          fontWeight: 600,
                          color: viewMode === "drs" ? "#38bdf8" : "var(--text-muted)",
                        }}
                      >
                        {m.drsLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
