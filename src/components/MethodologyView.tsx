"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  METHODOLOGY_MODELS,
  ModelMethodologyDetail,
  OUR_BENCHMARK_RUNS,
  OurBenchmarkRun,
} from "./methodologyData";
import styles from "./MethodologyView.module.css";
import {
  Search,
  ExternalLink,
  ChevronsUpDown,
  Download,
  ArrowRight,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Check,
} from "lucide-react";

export default function MethodologyView() {
  const [selectedModelId, setSelectedModelId] = useState<string>(
    METHODOLOGY_MODELS[0]?.id || "deepscaler-1-5b"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [runSearchQuery, setRunSearchQuery] = useState<string>("");
  const [weightFilter, setWeightFilter] = useState<"ALL" | "OPEN" | "PRIVATE">("ALL");
  const [companyFilter, setCompanyFilter] = useState<string>("ALL");
  const [weightDropdownOpen, setWeightDropdownOpen] = useState<boolean>(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"ACCURACY" | "LATENCY">("ACCURACY");
  const [viewScope, setViewScope] = useState<"SELECTED" | "ALL">("SELECTED");

  const weightDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        weightDropdownRef.current &&
        !weightDropdownRef.current.contains(event.target as Node)
      ) {
        setWeightDropdownOpen(false);
      }
      if (
        companyDropdownRef.current &&
        !companyDropdownRef.current.contains(event.target as Node)
      ) {
        setCompanyDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Selected Model detail
  const currentModel = useMemo(() => {
    return (
      METHODOLOGY_MODELS.find((m) => m.id === selectedModelId) ||
      METHODOLOGY_MODELS[0]
    );
  }, [selectedModelId]);

  // Unique companies list for dropdown
  const companiesList = useMemo(() => {
    const list = Array.from(new Set(METHODOLOGY_MODELS.map((m) => m.developer)));
    return ["ALL", ...list];
  }, []);

  // Filtered sidebar models
  const filteredModels = useMemo(() => {
    return METHODOLOGY_MODELS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.developer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWeight =
        weightFilter === "ALL" || m.weights === weightFilter;
      const matchesCompany =
        companyFilter === "ALL" || m.developer === companyFilter;
      return matchesSearch && matchesWeight && matchesCompany;
    });
  }, [searchQuery, weightFilter, companyFilter]);

  // Helper to match a benchmark run to the current selected model
  const runMatchesModel = (
    run: OurBenchmarkRun,
    model: ModelMethodologyDetail | undefined
  ) => {
    if (!model) return false;
    const clean = (s: string) =>
      (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const rName = clean(run.name);
    const mName = clean(model.name);
    const mId = clean(model.id);

    if (rName === mId || mId.includes(rName) || rName.includes(mId)) return true;
    if (mName.includes(rName) || rName.includes(mName)) return true;

    if (
      run.lab &&
      model.developer &&
      clean(run.lab) === clean(model.developer)
    ) {
      const rTokens = run.name.toLowerCase().split(/[^a-z0-9]+/);
      const mTokens = model.name.toLowerCase().split(/[^a-z0-9]+/);
      if (rTokens.some((t) => t.length >= 3 && mTokens.includes(t))) return true;
    }
    return false;
  };

  // Count of runs corresponding to current selected model
  const selectedModelRunsCount = useMemo(() => {
    return OUR_BENCHMARK_RUNS.filter((r) => runMatchesModel(r, currentModel))
      .length;
  }, [currentModel]);

  // Compute table rows based on OUR_BENCHMARK_RUNS
  const benchmarkTableRows = useMemo(() => {
    // 1. Sort all 173 runs first to establish true overall rankings
    const sortedAll = [...OUR_BENCHMARK_RUNS];
    if (activeTab === "ACCURACY") {
      sortedAll.sort((a, b) => b.accuracy - a.accuracy);
    } else {
      sortedAll.sort((a, b) => a.latencyMs - b.latencyMs);
    }

    // 2. Filter strictly to selected model if viewScope === "SELECTED"
    let baseList = sortedAll;
    if (viewScope === "SELECTED") {
      const matched = sortedAll.filter((r) => runMatchesModel(r, currentModel));
      if (matched.length > 0) {
        baseList = matched;
      }
    }

    // 3. Search query filter
    const filtered = runSearchQuery
      ? baseList.filter(
          (r) =>
            r.name.toLowerCase().includes(runSearchQuery.toLowerCase()) ||
            r.lab.toLowerCase().includes(runSearchQuery.toLowerCase()) ||
            r.params.toLowerCase().includes(runSearchQuery.toLowerCase())
        )
      : baseList;

    const total = OUR_BENCHMARK_RUNS.length; // 173

    return filtered.map((run) => {
      const overallRank = sortedAll.findIndex((x) => x.id === run.id) + 1;
      const barWidth =
        activeTab === "ACCURACY"
          ? Math.max(3, Math.min(100, run.accuracy))
          : Math.max(
              4,
              Math.min(
                100,
                Math.round(100 - (Math.min(run.latencyMs, 70000) / 70000) * 92)
              )
            );

      return {
        id: run.id,
        runIndex: run.runIndex,
        name: run.name,
        params: run.params,
        size: run.size,
        lab: run.lab,
        category: run.category,
        barWidthPercent: barWidth,
        mainValue:
          activeTab === "ACCURACY"
            ? run.accuracyFormatted
            : run.latencyFormatted,
        subValue:
          activeTab === "ACCURACY" ? `± 0.85` : `(${run.params})`,
        rankText: `#${overallRank} / ${total}`,
        isCurrent: true,
      };
    });
  }, [activeTab, runSearchQuery, currentModel, viewScope]);

  // Helper to render confidence/density meter
  const renderMeter = (percent: number) => {
    const totalTicks = 42;
    const activeCount = Math.round((percent / 100) * totalTicks);

    return (
      <div className={styles.meterTrack}>
        {Array.from({ length: totalTicks }).map((_, i) => (
          <span
            key={i}
            className={`${styles.meterTick} ${
              i < activeCount ? styles.meterTickActive : ""
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. TOP SUB-NAVIGATION BAR */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          {/* Weight / License Filter Dropdown */}
          <div className={styles.dropdownWrapper} ref={weightDropdownRef}>
            <button
              type="button"
              className={`${styles.filterSelect} ${
                weightDropdownOpen ? styles.filterSelectOpen : ""
              }`}
              onClick={() => {
                setWeightDropdownOpen((prev) => !prev);
                setCompanyDropdownOpen(false);
              }}
              aria-expanded={weightDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>
                {weightFilter === "ALL"
                  ? "OPEN WEIGHTS & PROPRIETARY"
                  : weightFilter === "OPEN"
                  ? "OPEN WEIGHTS ONLY"
                  : "PROPRIETARY ONLY"}
              </span>
              <ChevronsUpDown size={12} className={styles.chevronIcon} />
            </button>

            {weightDropdownOpen && (
              <div className={styles.dropdownMenu} role="listbox">
                {[
                  {
                    label: "OPEN WEIGHTS & PROPRIETARY",
                    value: "ALL" as const,
                  },
                  {
                    label: "OPEN WEIGHTS ONLY",
                    value: "OPEN" as const,
                  },
                  {
                    label: "PROPRIETARY ONLY",
                    value: "PRIVATE" as const,
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.dropdownOption} ${
                      weightFilter === opt.value ? styles.dropdownOptionActive : ""
                    }`}
                    onClick={() => {
                      setWeightFilter(opt.value);
                      setWeightDropdownOpen(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    {weightFilter === opt.value && (
                      <Check size={13} className={styles.checkIcon} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Company / Lab Filter Dropdown */}
          <div className={styles.dropdownWrapper} ref={companyDropdownRef}>
            <button
              type="button"
              className={`${styles.filterSelect} ${
                companyDropdownOpen ? styles.filterSelectOpen : ""
              }`}
              onClick={() => {
                setCompanyDropdownOpen((prev) => !prev);
                setWeightDropdownOpen(false);
              }}
              aria-expanded={companyDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>
                {companyFilter === "ALL"
                  ? "ALL COMPANIES"
                  : companyFilter.toUpperCase()}
              </span>
              <ChevronsUpDown size={12} className={styles.chevronIcon} />
            </button>

            {companyDropdownOpen && (
              <div
                className={`${styles.dropdownMenu} ${styles.dropdownMenuScrollable}`}
                role="listbox"
              >
                {companiesList.map((company) => (
                  <button
                    key={company}
                    type="button"
                    className={`${styles.dropdownOption} ${
                      companyFilter === company ? styles.dropdownOptionActive : ""
                    }`}
                    onClick={() => {
                      setCompanyFilter(company);
                      setCompanyDropdownOpen(false);
                    }}
                  >
                    <span>
                      {company === "ALL"
                        ? "ALL COMPANIES"
                        : company.toUpperCase()}
                    </span>
                    {companyFilter === company && (
                      <Check size={13} className={styles.checkIcon} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.topBarRight}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => {
              const jsonStr = JSON.stringify(currentModel, null, 2);
              const blob = new Blob([jsonStr], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${currentModel.id}-evaluation-methodology.json`;
              a.click();
            }}
            title="Download full evaluation metrics as JSON"
          >
            <Download size={13} />
            <span>DOWNLOAD</span>
          </button>

          <Link
            href="/openvals-index"
            className={styles.actionBtn}
            style={{ textDecoration: "none" }}
          >
            <SlidersHorizontal size={13} />
            <span>COMPARE MODELS</span>
          </Link>

          <Link href="/" className={styles.backHomeLink}>
            <span>&larr; Back to Home</span>
          </Link>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN CONTAINER */}
      <div className={styles.mainLayout}>
        {/* LEFT SIDEBAR: MODEL DIRECTORY */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.searchWrap}>
              <Search size={13} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tableHeaderRow}>
            <span>RELEASE DATE ↕</span>
            <span>MODEL</span>
          </div>

          <div className={styles.modelList}>
            {filteredModels.map((model) => {
              const isActive = model.id === currentModel.id;
              return (
                <div
                  key={model.id}
                  className={`${styles.modelRow} ${
                    isActive ? styles.modelRowActive : ""
                  }`}
                  onClick={() => setSelectedModelId(model.id)}
                >
                  <div className={styles.modelRowLeft}>
                    <span className={styles.rowDate}>{model.releaseDate}</span>
                    <div className={styles.rowNameWrap}>
                      <span>{model.name}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className={styles.countryBadge}>{model.country}</span>
                    {isActive && <ArrowRight size={13} color="#ffffff" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.sidebarFooter}>
            <button
              type="button"
              className={styles.viewMoreBtn}
              onClick={() => {
                setSearchQuery("");
                setWeightFilter("ALL");
                setCompanyFilter("ALL");
              }}
            >
              SHOWING {filteredModels.length} MODELS ⌵
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: MODEL DEEP DIVE & METHODOLOGY */}
        <main className={styles.contentArea}>
          {/* MODEL HEADER */}
          <div className={styles.modelHeader}>
            <div className={styles.developerSubtitle}>{currentModel.developer}</div>
            <h1 className={styles.modelTitle}>
              {currentModel.name}
              <ExternalLink size={18} color="#78716c" />
            </h1>
            <div className={styles.metaLine}>
              RELEASE DATE: {currentModel.releaseDate}
            </div>
          </div>


          {/* THREE STAT CARDS */}
          <div className={styles.statCardsRow}>
            {/* 1. Accuracy Card */}
            <div
              className={`${styles.statCard} ${styles.statCardAcc} ${
                activeTab === "ACCURACY" ? styles.statCardActive : ""
              }`}
              onClick={() => setActiveTab("ACCURACY")}
              title="Click to view Accuracy benchmarks"
            >
              <div className={styles.statCardLabel}>ACCURACY</div>
              <div className={styles.statCardValue}>
                <span>{currentModel.accuracy.toFixed(2)}%</span>
                <span className={styles.statCardStd}>
                  ± {currentModel.accuracyStdDev}
                </span>
              </div>
              {renderMeter(currentModel.accuracy)}
            </div>

            {/* 2. Latency Card */}
            <div
              className={`${styles.statCard} ${styles.statCardLat} ${
                activeTab === "LATENCY" ? styles.statCardActive : ""
              }`}
              onClick={() => setActiveTab("LATENCY")}
              title="Click to view Latency benchmarks"
            >
              <div className={styles.statCardLabel}>LATENCY</div>
              <div className={styles.statCardValue} style={{ fontSize: "22px" }}>
                <span>{currentModel.latencyFormatted}</span>
              </div>
              {renderMeter(65)}
            </div>
          </div>

          <div className={styles.statCardFooterLogo}>
            <div className={styles.valsMiniBadge}>
              <svg viewBox="0 0 20 20" width="13" height="13" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#10b981" strokeWidth="1.6" />
                <path
                  d="M6.5 7L10 13.5L13.5 7"
                  stroke="#10b981"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>OPENVALS INDEX</span>
            </div>
          </div>

          {/* BENCHMARK CATEGORY TABS & RUN SEARCH */}
          <div
            className={styles.benchmarkTabs}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${
                    activeTab === "ACCURACY" ? styles.tabBtnActive : ""
                  }`}
                  onClick={() => setActiveTab("ACCURACY")}
                >
                  ACCURACY
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${
                    activeTab === "LATENCY" ? styles.tabBtnActive : ""
                  }`}
                  onClick={() => setActiveTab("LATENCY")}
                >
                  LATENCY
                </button>
              </div>

              <div className={styles.scopeGroup}>
                <button
                  type="button"
                  className={`${styles.scopeBtn} ${
                    viewScope === "SELECTED" ? styles.scopeBtnActive : ""
                  }`}
                  onClick={() => setViewScope("SELECTED")}
                  title={`Show only runs for ${currentModel.name}`}
                >
                  {currentModel ? currentModel.name : "SELECTED"} ({selectedModelRunsCount})
                </button>
                <button
                  type="button"
                  className={`${styles.scopeBtn} ${
                    viewScope === "ALL" ? styles.scopeBtnActive : ""
                  }`}
                  onClick={() => setViewScope("ALL")}
                  title="Show all 173 runs across all models"
                >
                  ALL RUNS (173)
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingRight: "12px",
              }}
            >
              <Search size={12} color="var(--text-muted)" />
              <input
                type="text"
                placeholder={
                  viewScope === "SELECTED"
                    ? `Filter ${selectedModelRunsCount} run${selectedModelRunsCount === 1 ? "" : "s"}...`
                    : "Filter 173 runs..."
                }
                value={runSearchQuery}
                onChange={(e) => setRunSearchQuery(e.target.value)}
                style={{
                  fontSize: "11px",
                  padding: "4px 8px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  outline: "none",
                  background: "var(--card-bg)",
                  color: "var(--text-main)",
                }}
              />
              {runSearchQuery && (
                <button
                  type="button"
                  onClick={() => setRunSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* BENCHMARK BREAKDOWN TABLE */}
          <div className={styles.benchmarkTableWrap}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th style={{ width: "240px" }}>
                    {viewScope === "SELECTED" ? "MODEL RUNS" : "BENCHMARKS"} ({benchmarkTableRows.length})
                  </th>
                  <th>
                    {activeTab === "ACCURACY"
                      ? "SCORE DISTRIBUTION"
                      : "LATENCY DISTRIBUTION"}
                  </th>
                  <th style={{ textAlign: "right", width: "135px" }}>
                    {activeTab === "ACCURACY" ? "ACCURACY" : "LATENCY"}
                  </th>
                  <th style={{ textAlign: "right", width: "90px" }}>RANKINGS</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkTableRows.map((bench) => {
                  const barClass =
                    bench.category === "proprietary"
                      ? styles.barFillProprietary
                      : bench.category === "academic"
                      ? styles.barFillAcademic
                      : styles.barFillPartner;

                  return (
                    <tr key={bench.id}>
                      <td>
                        <div className={styles.benchmarkNameCell}>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "12px",
                              color: "var(--text-main)",
                            }}
                          >
                            {bench.name}
                          </span>
                          <span
                            style={{
                              fontSize: "10.5px",
                              color: "var(--text-muted)",
                              fontWeight: 600,
                              marginLeft: "6px",
                            }}
                          >
                            {bench.params}
                          </span>
                          <span
                            style={{
                              fontSize: "9px",
                              padding: "1px 5px",
                              background: "var(--secondary-bg)",
                              borderRadius: "3px",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                              marginLeft: "6px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                            }}
                          >
                            {bench.lab}
                          </span>
                          {bench.runIndex && (
                            <span
                              style={{
                                fontSize: "9px",
                                color: "#38bdf8",
                                fontWeight: 600,
                                marginLeft: "6px",
                                background: "rgba(56, 189, 248, 0.12)",
                                border: "1px solid rgba(56, 189, 248, 0.3)",
                                padding: "1px 4px",
                                borderRadius: "3px",
                              }}
                            >
                              Run #{bench.runIndex}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.barTrack}>
                          <div
                            className={barClass}
                            style={{ width: `${bench.barWidthPercent}%` }}
                          />
                        </div>
                      </td>
                      <td className={styles.accValCell}>
                        {bench.mainValue}{" "}
                        {bench.subValue && (
                          <span
                            style={{
                              fontSize: "10.5px",
                              color: "#78716c",
                              fontWeight: 400,
                            }}
                          >
                            {bench.subValue}
                          </span>
                        )}
                      </td>
                      <td className={styles.rankCell}>{bench.rankText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* BENCHMARK FOOTER LEGEND */}
            <div className={styles.tableLegendBar}>
              <div className={styles.legendItemsList}>
                <div className={styles.legendTag}>
                  <span
                    className={styles.legendSquare}
                    style={{ backgroundColor: "#cb6555" }}
                  />
                  <span>PROPRIETARY LABS</span>
                </div>
                <div className={styles.legendTag}>
                  <span
                    className={styles.legendSquare}
                    style={{ backgroundColor: "#2a4365" }}
                  />
                  <span>OPEN-SOURCE &amp; ACADEMIC</span>
                </div>
                <div className={styles.legendTag}>
                  <span
                    className={styles.legendSquare}
                    style={{ backgroundColor: "#5ab576" }}
                  />
                  <span>FRONTIER PARTNERS</span>
                </div>
              </div>

              <div className={styles.valsMiniBadge}>
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#10b981" strokeWidth="1.6" />
                  <path
                    d="M6.5 7L10 13.5L13.5 7"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>OPENVALS (173 RUNS)</span>
              </div>
            </div>
          </div>


          {/* EDITORIAL UPDATES SECTION */}
          <div className={styles.updatesSection}>
            <h2 className={styles.updatesHeading}>Updates</h2>
            <div className={styles.updateDateBadge}>
              {currentModel.updates.date}
            </div>

            <div className={styles.updateSummary}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{currentModel.updates.summary}</span>
            </div>

            <ul className={styles.bulletList}>
              {currentModel.updates.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>

            <div className={styles.fallbackNote}>
              {currentModel.updates.fallbackPolicy}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
