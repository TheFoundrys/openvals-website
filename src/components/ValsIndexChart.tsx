"use client";

import React, { useState, useMemo } from "react";
import { ValsIndexModel, VALS_INDEX_MODELS } from "./valsIndexData";

interface ValsIndexChartProps {
  selectedLab: string | null;
  onSelectModel?: (model: ValsIndexModel | null) => void;
  viewMode?: "latency" | "drs";
}

export default function ValsIndexChart({
  selectedLab,
  onSelectModel,
  viewMode = "latency",
}: ValsIndexChartProps) {
  const [hoveredModel, setHoveredModel] = useState<ValsIndexModel | null>(null);

  // SVG dimensions & coordinate bounds
  const width = 1140;
  const height = 540;
  const margin = { top: 45, right: 45, bottom: 50, left: 65 };

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // Real accuracy ranges from 12.4% to 100.0%; max scale set to 108%
  const maxAcc = 108.0;

  // X scale parameters
  const maxLatency = 50000; // ms (50s)
  const minDRS = 20; // %
  const maxDRS = 70; // %

  // Scale helpers
  const scaleX = React.useCallback(
    (val: number) => {
      if (viewMode === "latency") {
        return margin.left + (val / maxLatency) * plotWidth;
      }
      return margin.left + ((val - minDRS) / (maxDRS - minDRS)) * plotWidth;
    },
    [margin.left, plotWidth, viewMode]
  );

  const scaleY = React.useCallback(
    (acc: number) => {
      return margin.top + plotHeight - (acc / maxAcc) * plotHeight;
    },
    [margin.top, maxAcc, plotHeight]
  );

  const getModelX = React.useCallback(
    (m: ValsIndexModel) => {
      return scaleX(viewMode === "latency" ? m.latency : m.drs);
    },
    [scaleX, viewMode]
  );

  // Quadrant dividers
  const midX = scaleX(viewMode === "latency" ? 20000 : 45.0);
  const midY = scaleY(50.0);

  // Grid tick marks
  const xTicks =
    viewMode === "latency"
      ? [0, 10000, 20000, 30000, 40000, 50000]
      : [20, 30, 40, 50, 60, 70];
  const yTicks = [0, 20, 40, 60, 80, 100];

  const formatXTick = (tick: number) => {
    if (viewMode === "latency") {
      return `${(tick / 1000).toFixed(0)}s`;
    }
    return `${tick}%`;
  };

  // Pareto Frontier models calculation
  const latencyFrontier = useMemo(() => {
    const sorted = [...VALS_INDEX_MODELS].sort((a, b) => a.latency - b.latency);
    let max = -1;
    const frontier: ValsIndexModel[] = [];
    for (const m of sorted) {
      if (m.accuracy > max) {
        frontier.push(m);
        max = m.accuracy;
      }
    }
    return frontier;
  }, []);

  const drsFrontier = useMemo(() => {
    const sorted = [...VALS_INDEX_MODELS].sort((a, b) => a.drs - b.drs);
    let max = -1;
    const frontier: ValsIndexModel[] = [];
    for (const m of sorted) {
      if (m.accuracy > max) {
        frontier.push(m);
        max = m.accuracy;
      }
    }
    return frontier;
  }, []);

  const activeFrontierModels =
    viewMode === "latency" ? latencyFrontier : drsFrontier;
  const frontierSet = useMemo(
    () => new Set(activeFrontierModels.map((m) => m.id)),
    [activeFrontierModels]
  );

  // Frontier smooth bezier curve
  const frontierPathD = useMemo(() => {
    if (activeFrontierModels.length === 0) return "";
    let d = "";
    activeFrontierModels.forEach((m, idx) => {
      const x = getModelX(m);
      const y = scaleY(m.accuracy);
      if (idx === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prev = activeFrontierModels[idx - 1];
        const prevX = getModelX(prev);
        const prevY = scaleY(prev.accuracy);
        const cpx1 = prevX + (x - prevX) * 0.45;
        const cpy1 = prevY;
        const cpx2 = prevX + (x - prevX) * 0.55;
        const cpy2 = y;
        d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x} ${y}`;
      }
    });

    const last = activeFrontierModels[activeFrontierModels.length - 1];
    if (last) {
      const endX = scaleX(viewMode === "latency" ? maxLatency : maxDRS);
      const lastY = scaleY(last.accuracy);
      d += ` L ${endX} ${lastY}`;
    }

    return d;
  }, [activeFrontierModels, getModelX, scaleX, scaleY, viewMode]);

  // Callouts customized for each mode
  const latencyCallouts: Record<string, { text: string; dx: number; dy: number }> = {
    "deepscaler-1-5b": { text: "DeepScaler 1.5B (100%)", dx: 26, dy: -12 },
    "hunyuan-instruct-1-8b": { text: "Hunyuan 1.8B", dx: 26, dy: 14 },
    "granite3-3-2-0b": { text: "Granite 3.3", dx: 26, dy: -10 },
    "yi-coder-1-5b": { text: "Yi-Coder 1.5B", dx: 26, dy: 10 },
    "lfm2-5-thinking-1-2b": { text: "LFM 2.5", dx: 26, dy: -12 },
    "llama2-0-1-0b": { text: "LLaMA 2.0", dx: -74, dy: 2 },
    "qwen3-0-6b": { text: "Qwen 3", dx: 24, dy: 12 },
    "phi3-latest-3-8b": { text: "Phi-3 3.8B", dx: -80, dy: -8 },
    "openchat-latest-7b": { text: "OpenChat 7B", dx: -88, dy: 12 },
    "bloom-560m-0-8b": { text: "Bloom 560M", dx: 26, dy: -8 },
    "supra-50m-instruct-0-0518b": { text: "Supra 50M", dx: 26, dy: 8 },
    "onellm-doey-v1-1-0b": { text: "OneLLM Doey", dx: 24, dy: -10 },
    "willow-alpha-0-3b": { text: "Willow Alpha", dx: 24, dy: 8 },
  };

  const drsCallouts: Record<string, { text: string; dx: number; dy: number }> = {
    "deepscaler-1-5b": { text: "DeepScaler 1.5B (100%)", dx: 26, dy: -12 },
    "hunyuan-instruct-1-8b": { text: "Hunyuan 1.8B", dx: -94, dy: 12 },
    "granite3-3-2-0b": { text: "Granite 3.3", dx: -84, dy: -10 },
    "lfm2-5-thinking-1-2b": { text: "LFM 2.5", dx: 26, dy: -10 },
    "openchat-latest-7b": { text: "OpenChat 7B", dx: 26, dy: 8 },
    "bloom-560m-0-8b": { text: "Bloom 560M", dx: 26, dy: -8 },
    "supra-50m-instruct-0-0518b": { text: "Supra 50M", dx: 26, dy: 8 },
    "deepseek-r1-distill-qwen-1-5b": { text: "DeepSeek R1", dx: 26, dy: -8 },
    "onellm-doey-v1-1-0b": { text: "OneLLM Doey", dx: 24, dy: -8 },
    "willow-alpha-0-3b": { text: "Willow Alpha", dx: 24, dy: 8 },
  };

  const currentCallouts = viewMode === "latency" ? latencyCallouts : drsCallouts;

  const renderLabIcon = (model: ValsIndexModel) => {
    const normLab = (model.lab || "").toLowerCase();
    const normId = (model.id || "").toLowerCase();

    const renderInnerIcon = () => {
      if (normLab.includes("agentica") || normId.includes("deepscaler")) {
        return (
          <path d="M12 2.5l2.4 5.3 5.8.8-4.2 4.1 1 5.8-5-2.7-5 2.7 1-5.8-4.2-4.1 5.8-.8z" />
        );
      }
      if (normLab.includes("tencent") || normId.includes("hunyuan")) {
        return <path d="M11 3h2v6h5v2h-5v10h-2V11H6V9h5V3z" />;
      }
      if (normLab.includes("ibm") || normId.includes("granite")) {
        return (
          <g>
            <rect x="3" y="4" width="18" height="2.5" rx="1" />
            <rect x="3" y="8" width="18" height="2.5" rx="1" />
            <rect x="3" y="12" width="18" height="2.5" rx="1" />
            <rect x="3" y="16" width="18" height="2.5" rx="1" />
          </g>
        );
      }
      if (normLab.includes("prism") || normId.includes("bonsai")) {
        return <path d="M12 3L2 20h20L12 3zm0 4.5l6.5 11h-13L12 7.5z" />;
      }
      if (normLab.includes("liquid") || normId.includes("lfm")) {
        return (
          <path d="M12 2.7c-4 5.3-7 9.8-7 13.3a7 7 0 0 0 14 0c0-3.5-3-8-7-13.3z" />
        );
      }
      if (normLab.includes("qvac") || normId.includes("medpsy")) {
        return (
          <path
            d="M3 12h4.5l2.5-6 4 12 2.5-6H21"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
          />
        );
      }
      if (normLab.includes("hugging") || normId.includes("smollm")) {
        return (
          <g>
            <circle
              cx="12"
              cy="12"
              r="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="9" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
            <path
              d="M8.5 14.5c1.2 1.8 4.8 1.8 6 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (normLab.includes("google") || normId.includes("gemma")) {
        return (
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10h-10v3.8h5.9c-.8 2.2-2.9 3.8-5.9 3.8-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4c1.6 0 3 .6 4.1 1.6l2.8-2.8C17.3 3.6 14.8 2 12 2z" />
        );
      }
      if (normLab.includes("meta") || normId.includes("llama")) {
        return (
          <path
            d="M16.5 6C14.7 6 13.1 7.1 12 8.7 10.9 7.1 9.3 6 7.5 6 4.5 6 2 8.5 2 11.5c0 4.1 4.7 7.7 9.3 11 0.4.3.9.5 1.4.5s1-.2 1.4-.5c4.6-3.3 9.3-6.9 9.3-11C23.5 8.5 21 6 16.5 6z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
        );
      }
      if (normLab.includes("microsoft") || normId.includes("phi")) {
        return (
          <g>
            <rect x="3" y="3" width="8" height="8" />
            <rect x="13" y="3" width="8" height="8" />
            <rect x="3" y="13" width="8" height="8" />
            <rect x="13" y="13" width="8" height="8" />
          </g>
        );
      }
      if (normLab.includes("open source") || normId.includes("openchat")) {
        return (
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        );
      }
      if (normLab.includes("alibaba") || normId.includes("qwen")) {
        return (
          <path
            d="M6 9l6-6 6 6-6 6-6-6zm0 6l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
          />
        );
      }
      if (normLab.includes("tii") || normId.includes("falcon")) {
        return (
          <path d="M12 2L3 9l3 13h12l3-13-9-7zm0 4.5l5 4-1.5 8h-7l-1.5-8 5-4z" />
        );
      }
      if (normLab.includes("01.ai") || normId.includes("yi")) {
        return (
          <g>
            <circle cx="7" cy="12" r="3.5" />
            <circle cx="17" cy="12" r="3.5" />
            <line
              x1="10.5"
              y1="12"
              x2="13.5"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        );
      }
      if (normLab.includes("deepseek")) {
        return (
          <g>
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <circle cx="12" cy="12" r="3" />
          </g>
        );
      }
      if (normLab.includes("mistral")) {
        return (
          <g>
            <rect x="3" y="4" width="4" height="4" />
            <rect x="17" y="4" width="4" height="4" />
            <rect x="7" y="10" width="10" height="4" />
            <rect x="3" y="16" width="4" height="4" />
            <rect x="17" y="16" width="4" height="4" />
          </g>
        );
      }
      if (normLab.includes("stability")) {
        return (
          <g>
            <circle cx="12" cy="7" r="3" />
            <circle cx="7" cy="15" r="3" />
            <circle cx="17" cy="15" r="3" />
          </g>
        );
      }
      if (normLab.includes("nous")) {
        return (
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 3.5L4 10.5V17l8 4.5 8-4.5v-6.5l-8 4z" />
        );
      }
      if (normLab.includes("doey")) {
        return (
          <g>
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
          </g>
        );
      }
      if (normLab.includes("big science") || normLab.includes("bloom")) {
        return (
          <g>
            <circle cx="12" cy="12" r="7" />
            <line
              x1="5"
              y1="5"
              x2="19"
              y2="19"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="19"
              x2="19"
              y2="5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        );
      }
      if (normLab.includes("supra")) {
        return (
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
        );
      }
      if (normLab.includes("promtech") || normId.includes("asena")) {
        return (
          <g>
            <circle
              cx="12"
              cy="12"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="22"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="12"
              x2="5"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="19"
              y1="12"
              x2="22"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        );
      }
      if (normLab.includes("north") || normId.includes("willow")) {
        return (
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        );
      }

      // Default icon
      return <circle cx="12" cy="12" r="6" />;
    };

    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={model.badgeTextColor || "#ffffff"}
        color={model.badgeTextColor || "#ffffff"}
        style={{
          transform: "translate(-10px, -10px)",
          pointerEvents: "none",
        }}
      >
        {renderInnerIcon()}
      </svg>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${width}px`,
        margin: "0 auto",
        overflowX: "auto",
        background: "var(--card-bg)",
        borderRadius: "12px",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--border)",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "auto",
          minWidth: "860px",
          display: "block",
        }}
      >
        <defs>
          {/* Subtle Grid Dots pattern */}
          <pattern
            id="valsGridDots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.9" fill="var(--text-muted)" opacity="0.3" />
          </pattern>

          {/* Glow filter for frontier line */}
          <filter
            id="frontierGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. QUADRANT BACKGROUND FILLS */}
        {viewMode === "latency" ? (
          <>
            {/* Top-Left Quadrant: EFFICIENT (Fast & High Accuracy) */}
            <rect
              x={margin.left}
              y={margin.top}
              width={midX - margin.left}
              height={midY - margin.top}
              fill="rgba(16, 185, 129, 0.08)"
            />
            {/* Bottom-Right Quadrant: INEFFICIENT (Slow & Low Accuracy) */}
            <rect
              x={midX}
              y={midY}
              width={margin.left + plotWidth - midX}
              height={margin.top + plotHeight - midY}
              fill="rgba(239, 68, 68, 0.06)"
            />
          </>
        ) : (
          <>
            {/* Top-Right Quadrant: OPTIMAL (High DRS & High Accuracy) */}
            <rect
              x={midX}
              y={margin.top}
              width={margin.left + plotWidth - midX}
              height={midY - margin.top}
              fill="rgba(16, 185, 129, 0.08)"
            />
            {/* Bottom-Left Quadrant: SUB-OPTIMAL (Low DRS & Low Accuracy) */}
            <rect
              x={margin.left}
              y={midY}
              width={midX - margin.left}
              height={margin.top + plotHeight - midY}
              fill="rgba(239, 68, 68, 0.06)"
            />
          </>
        )}

        {/* Background Dot Pattern across entire plot */}
        <rect
          x={margin.left}
          y={margin.top}
          width={plotWidth}
          height={plotHeight}
          fill="url(#valsGridDots)"
        />

        {/* Quadrant dividing lines */}
        <line
          x1={midX}
          y1={margin.top}
          x2={midX}
          y2={margin.top + plotHeight}
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <line
          x1={margin.left}
          y1={midY}
          x2={margin.left + plotWidth}
          y2={midY}
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* 2. QUADRANT ANNOTATIONS */}
        {viewMode === "latency" ? (
          <>
            <text
              x={(margin.left + midX) / 2}
              y={margin.top + 24}
              textAnchor="middle"
              fill="#16a34a"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.12em"
              fontFamily="monospace, sans-serif"
            >
              EFFICIENT (FAST &amp; ACCURATE)
            </text>
            <text
              x={(midX + margin.left + plotWidth) / 2}
              y={margin.top + plotHeight - 14}
              textAnchor="middle"
              fill="#dc2626"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.12em"
              fontFamily="monospace, sans-serif"
            >
              INEFFICIENT (SLOW &amp; LOWER ACCURACY)
            </text>
            <text
              x={margin.left + 14}
              y={margin.top + plotHeight - 20}
              textAnchor="start"
              fill="#64748b"
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.08em"
              fontFamily="sans-serif"
              transform={`rotate(-90 ${margin.left + 14} ${
                margin.top + plotHeight - 20
              })`}
            >
              FASTEST (LOW LATENCY)
            </text>
          </>
        ) : (
          <>
            <text
              x={(midX + margin.left + plotWidth) / 2}
              y={margin.top + 24}
              textAnchor="middle"
              fill="#16a34a"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.12em"
              fontFamily="monospace, sans-serif"
            >
              OPTIMAL (HIGH DRS &amp; ACCURACY)
            </text>
            <text
              x={(margin.left + midX) / 2}
              y={margin.top + plotHeight - 14}
              textAnchor="middle"
              fill="#dc2626"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.12em"
              fontFamily="monospace, sans-serif"
            >
              SUB-OPTIMAL (LOW DRS &amp; ACCURACY)
            </text>
            <text
              x={margin.left + 14}
              y={margin.top + plotHeight - 20}
              textAnchor="start"
              fill="#64748b"
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.08em"
              fontFamily="sans-serif"
              transform={`rotate(-90 ${margin.left + 14} ${
                margin.top + plotHeight - 20
              })`}
            >
              LOWER DRS %
            </text>
          </>
        )}

        {/* BEST PERFORMANCE corner label */}
        <text
          x={margin.left + plotWidth - 10}
          y={margin.top + 50}
          textAnchor="end"
          fill="#64748b"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.08em"
          fontFamily="sans-serif"
        >
          {viewMode === "latency" ? "BEST ACCURACY" : "HIGHEST DRS & ACCURACY"}
        </text>

        {/* Top-Right OPENVALS Logo Emblem */}
        <g
          transform={`translate(${margin.left + plotWidth - 85}, ${
            margin.top + 10
          })`}
        >
          <circle
            cx="10"
            cy="10"
            r="8.5"
            stroke="#10b981"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M6.5 7L10 14L13.5 7"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="24"
            y="14"
            fill="var(--text-main)"
            fontSize="12"
            fontWeight="800"
            letterSpacing="0.06em"
            fontFamily="sans-serif"
          >
            OPENVALS
          </text>
        </g>

        {/* 3. GRID LINES & AXIS TICKS */}
        {/* Horizontal grid lines and Y-axis tick labels */}
        {yTicks.map((acc) => {
          const y = scaleY(acc);
          return (
            <g key={`y-${acc}`}>
              <line
                x1={margin.left}
                y1={y}
                x2={margin.left + plotWidth}
                y2={y}
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
              <text
                x={margin.left - 8}
                y={y + 4}
                textAnchor="end"
                fill="var(--text-muted)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                {acc}%
              </text>
            </g>
          );
        })}

        {/* Vertical grid lines and X-axis tick labels */}
        {xTicks.map((val) => {
          const x = scaleX(val);
          return (
            <g key={`x-${val}`}>
              <line
                x1={x}
                y1={margin.top}
                x2={x}
                y2={margin.top + plotHeight}
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
              <text
                x={x}
                y={margin.top + plotHeight + 20}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                {formatXTick(val)}
              </text>
            </g>
          );
        })}

        {/* 4. PARETO FRONTIER CURVE */}
        <path
          d={frontierPathD}
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.4"
          filter="url(#frontierGlow)"
          opacity="0.9"
        />

        {/* 5. MODEL CALLOUT LINES & LABELS */}
        {VALS_INDEX_MODELS.map((model) => {
          const callout = currentCallouts[model.id];
          if (!callout) return null;
          const x = getModelX(model);
          const y = scaleY(model.accuracy);
          const labelX = x + callout.dx;
          const labelY = y + callout.dy;

          const isFaded =
            selectedLab &&
            selectedLab !== "All Models" &&
            model.labKey !== selectedLab;

          return (
            <g
              key={`callout-${model.id}`}
              opacity={isFaded ? 0.2 : 1}
              style={{ transition: "opacity 0.2s" }}
            >
              <line
                x1={x}
                y1={y - 8}
                x2={labelX}
                y2={labelY + 4}
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={callout.dx < 0 ? "end" : "start"}
                fill="var(--text-main)"
                fontSize="11"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                {callout.text}
              </text>
            </g>
          );
        })}

        {/* 6. MODEL BADGES / POINTS */}
        {VALS_INDEX_MODELS.map((model) => {
          const x = getModelX(model);
          const y = scaleY(model.accuracy);

          const isHovered = hoveredModel?.id === model.id;
          const isFaded =
            selectedLab &&
            selectedLab !== "All Models" &&
            model.labKey !== selectedLab;
          const isOnActiveFrontier = frontierSet.has(model.id);

          return (
            <g
              key={model.id}
              transform={`translate(${x}, ${y})`}
              opacity={isFaded ? 0.2 : 1}
              cursor="pointer"
              onMouseEnter={() => {
                setHoveredModel(model);
                onSelectModel?.(model);
              }}
              onMouseLeave={() => {
                setHoveredModel(null);
                onSelectModel?.(null);
              }}
              style={{
                transition: "transform 0.15s ease, opacity 0.2s ease",
              }}
            >
              {/* Outer halo on hover */}
              {isHovered && (
                <circle
                  cx="0"
                  cy="0"
                  r="20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  opacity="0.85"
                />
              )}

              {/* Frontier champion highlight ring */}
              {isOnActiveFrontier && (
                <circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  opacity="0.75"
                />
              )}

              {/* Main Badge Background */}
              <circle
                cx="0"
                cy="0"
                r="12"
                fill={model.badgeColor}
                stroke="#ffffff"
                strokeWidth="2"
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 4px 10px rgba(0,0,0,0.35))"
                    : "drop-shadow(0 2px 5px rgba(0,0,0,0.15))",
                }}
              />

              {/* Lab Badge Icon */}
              {renderLabIcon(model)}
            </g>
          );
        })}
      </svg>

      {/* FLOATING HOVER TOOLTIP */}
      {hoveredModel && (
        <div
          style={{
            position: "absolute",
            top:
              scaleY(hoveredModel.accuracy) < 180
                ? `${scaleY(hoveredModel.accuracy) + 20}px`
                : `${scaleY(hoveredModel.accuracy) - 10}px`,
            left: `${Math.min(
              Math.max(20, getModelX(hoveredModel) + 20),
              width - 250
            )}px`,
            transform:
              scaleY(hoveredModel.accuracy) < 180
                ? "none"
                : "translateY(-100%)",
            background: "#0f172a",
            color: "#ffffff",
            padding: "12px 16px",
            borderRadius: "10px",
            boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
            zIndex: 30,
            pointerEvents: "none",
            fontSize: "12px",
            lineHeight: 1.5,
            minWidth: "220px",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: "6px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "13px" }}>
              {hoveredModel.name}
            </span>
            <span
              style={{
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "4px",
                background: hoveredModel.badgeColor,
                color: hoveredModel.badgeTextColor,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {hoveredModel.lab}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px 4px",
              borderRadius: "4px",
              marginBottom: "2px",
            }}
          >
            <span style={{ color: "#94a3b8" }}>Accuracy:</span>
            <span style={{ fontWeight: 700, color: "#4ade80" }}>
              {hoveredModel.accuracy.toFixed(1)}%
            </span>
          </div>

          {viewMode === "latency" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(16, 185, 129, 0.15)",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  color: "#34d399",
                  fontWeight: 700,
                }}
              >
                Average Latency:
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#34d399",
                }}
              >
                {hoveredModel.latencyLabel}
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(56, 189, 248, 0.15)",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  color: "#38bdf8",
                  fontWeight: 700,
                }}
              >
                Decision Reliability (DRS):
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#38bdf8",
                }}
              >
                {hoveredModel.drsLabel}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
