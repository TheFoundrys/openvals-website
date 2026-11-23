"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  const [selectedPointModel, setSelectedPointModel] =
    useState<ValsIndexModel | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // SVG dimensions & coordinate bounds (adaptive for mobile & desktop)
  const width = isMobile ? 540 : 1140;
  const height = isMobile ? 500 : 560;
  const margin = isMobile
    ? { top: 40, right: 24, bottom: 46, left: 50 }
    : { top: 48, right: 48, bottom: 56, left: 72 };

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

  // Desktop Callouts
  const latencyCallouts: Record<
    string,
    { text: string; dx: number; dy: number }
  > = {
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

  const drsCallouts: Record<string, { text: string; dx: number; dy: number }> =
    {
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

  const mobileLatencyCallouts: Record<
    string,
    { text: string; dx: number; dy: number }
  > = {
    "deepscaler-1-5b": { text: "DeepScaler (100%)", dx: -18, dy: -14 },
    "hunyuan-instruct-1-8b": { text: "Hunyuan 1.8B", dx: -70, dy: 14 },
    "granite3-3-2-0b": { text: "Granite 3.3", dx: 16, dy: -8 },
    "yi-coder-1-5b": { text: "Yi-Coder", dx: 16, dy: 10 },
    "lfm2-5-thinking-1-2b": { text: "LFM 2.5", dx: 16, dy: -10 },
    "onellm-doey-v1-1-0b": { text: "OneLLM", dx: 16, dy: -8 },
    "supra-50m-instruct-0-0518b": { text: "Supra 50M", dx: 16, dy: 8 },
    "willow-alpha-0-3b": { text: "Willow Alpha", dx: 16, dy: 8 },
  };

  const mobileDrsCallouts: Record<
    string,
    { text: string; dx: number; dy: number }
  > = {
    "deepscaler-1-5b": { text: "DeepScaler (100%)", dx: -18, dy: -14 },
    "granite3-3-2-0b": { text: "Granite 3.3", dx: -68, dy: -10 },
    "lfm2-5-thinking-1-2b": { text: "LFM 2.5", dx: 16, dy: -10 },
    "openchat-latest-7b": { text: "OpenChat 7B", dx: 16, dy: 8 },
    "bloom-560m-0-8b": { text: "Bloom 560M", dx: 16, dy: -8 },
    "supra-50m-instruct-0-0518b": { text: "Supra 50M", dx: 16, dy: 8 },
    "willow-alpha-0-3b": { text: "Willow Alpha", dx: 16, dy: 8 },
  };

  const currentCallouts = isMobile
    ? viewMode === "latency"
      ? mobileLatencyCallouts
      : mobileDrsCallouts
    : viewMode === "latency"
    ? latencyCallouts
    : drsCallouts;

  const activeModel = selectedPointModel || hoveredModel;

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

      return <circle cx="12" cy="12" r="6" />;
    };

    return (
      <svg
        viewBox="0 0 24 24"
        width={isMobile ? "18" : "20"}
        height={isMobile ? "18" : "20"}
        fill={model.badgeTextColor || "#ffffff"}
        color={model.badgeTextColor || "#ffffff"}
        style={{
          transform: isMobile ? "translate(-9px, -9px)" : "translate(-10px, -10px)",
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
        maxWidth: `${isMobile ? 720 : 1140}px`,
        margin: "0 auto",
        overflow: "hidden",
        background: "var(--card-bg)",
        borderRadius: "16px",
        boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--border)",
        border: "1px solid var(--border)",
        boxSizing: "border-box",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          display: "block",
        }}
      >
        <defs>
          {/* Subtle Grid Dots pattern */}
          <pattern
            id="valsGridDots"
            x="0"
            y="0"
            width={isMobile ? "18" : "20"}
            height={isMobile ? "18" : "20"}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r={isMobile ? "0.75" : "0.85"}
              fill="var(--text-muted)"
              opacity="0.22"
            />
          </pattern>

          {/* Smooth frontier gradient */}
          <linearGradient id="frontierGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Glow filter for frontier line */}
          <filter
            id="frontierGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Quadrant gradient fills */}
          <radialGradient id="efficientQuadrantGlow" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="inefficientQuadrantGlow" cx="100%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="optimalDrsGlow" cx="100%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          {/* Drop shadow for points */}
          <filter id="pointDropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
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
              fill="url(#efficientQuadrantGlow)"
            />
            {/* Bottom-Right Quadrant: INEFFICIENT (Slow & Low Accuracy) */}
            <rect
              x={midX}
              y={midY}
              width={margin.left + plotWidth - midX}
              height={margin.top + plotHeight - midY}
              fill="url(#inefficientQuadrantGlow)"
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
              fill="url(#optimalDrsGlow)"
            />
            {/* Bottom-Left Quadrant: SUB-OPTIMAL (Low DRS & Low Accuracy) */}
            <rect
              x={margin.left}
              y={midY}
              width={midX - margin.left}
              height={margin.top + plotHeight - midY}
              fill="url(#inefficientQuadrantGlow)"
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
          opacity="0.7"
        />
        <line
          x1={margin.left}
          y1={midY}
          x2={margin.left + plotWidth}
          y2={midY}
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.7"
        />

        {/* 2. QUADRANT ANNOTATIONS WITH MODERN PILLS */}
        {viewMode === "latency" ? (
          <>
            <g transform={`translate(${(margin.left + midX) / 2}, ${margin.top + (isMobile ? 18 : 22)})`}>
              <rect
                x="-86"
                y="-11"
                width="172"
                height="22"
                rx="6"
                fill="rgba(16, 185, 129, 0.12)"
                stroke="rgba(16, 185, 129, 0.3)"
                strokeWidth="1"
              />
              <text
                textAnchor="middle"
                y="3.5"
                fill="#10b981"
                fontSize={isMobile ? "9.5" : "10.5"}
                fontWeight="700"
                letterSpacing="0.08em"
                fontFamily="var(--font-serif-main)"
              >
                ⚡ EFFICIENT (FAST &amp; ACCURATE)
              </text>
            </g>
            <g transform={`translate(${(midX + margin.left + plotWidth) / 2}, ${margin.top + plotHeight - (isMobile ? 14 : 18)})`}>
              <rect
                x="-90"
                y="-11"
                width="180"
                height="22"
                rx="6"
                fill="rgba(244, 63, 94, 0.08)"
                stroke="rgba(244, 63, 94, 0.25)"
                strokeWidth="1"
              />
              <text
                textAnchor="middle"
                y="3.5"
                fill="#f43f5e"
                fontSize={isMobile ? "9" : "10"}
                fontWeight="700"
                letterSpacing="0.08em"
                fontFamily="var(--font-serif-main)"
              >
                {isMobile ? "INEFFICIENT" : "SLOW &amp; LOWER ACCURACY"}
              </text>
            </g>
            <text
              x={margin.left + (isMobile ? 12 : 14)}
              y={margin.top + plotHeight - (isMobile ? 14 : 20)}
              textAnchor="start"
              fill="var(--text-muted)"
              fontSize={isMobile ? "9" : "10"}
              fontWeight="600"
              letterSpacing="0.06em"
              fontFamily="var(--font-serif-main)"
              transform={`rotate(-90 ${margin.left + (isMobile ? 12 : 14)} ${
                margin.top + plotHeight - (isMobile ? 14 : 20)
              })`}
            >
              FASTEST (LOW LATENCY)
            </text>
          </>
        ) : (
          <>
            <g transform={`translate(${(midX + margin.left + plotWidth) / 2}, ${margin.top + (isMobile ? 18 : 22)})`}>
              <rect
                x="-96"
                y="-11"
                width="192"
                height="22"
                rx="6"
                fill="rgba(6, 182, 212, 0.12)"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
              />
              <text
                textAnchor="middle"
                y="3.5"
                fill="#06b6d4"
                fontSize={isMobile ? "9.5" : "10.5"}
                fontWeight="700"
                letterSpacing="0.08em"
                fontFamily="var(--font-serif-main)"
              >
                🛡️ OPTIMAL (HIGH DRS &amp; ACCURACY)
              </text>
            </g>
            <g transform={`translate(${(margin.left + midX) / 2}, ${margin.top + plotHeight - (isMobile ? 14 : 18)})`}>
              <rect
                x="-80"
                y="-11"
                width="160"
                height="22"
                rx="6"
                fill="rgba(244, 63, 94, 0.08)"
                stroke="rgba(244, 63, 94, 0.25)"
                strokeWidth="1"
              />
              <text
                textAnchor="middle"
                y="3.5"
                fill="#f43f5e"
                fontSize={isMobile ? "9" : "10"}
                fontWeight="700"
                letterSpacing="0.08em"
                fontFamily="var(--font-serif-main)"
              >
                {isMobile ? "SUB-OPTIMAL" : "LOW DRS &amp; ACCURACY"}
              </text>
            </g>
            <text
              x={margin.left + (isMobile ? 12 : 14)}
              y={margin.top + plotHeight - (isMobile ? 14 : 20)}
              textAnchor="start"
              fill="var(--text-muted)"
              fontSize={isMobile ? "9" : "10"}
              fontWeight="600"
              letterSpacing="0.06em"
              fontFamily="var(--font-serif-main)"
              transform={`rotate(-90 ${margin.left + (isMobile ? 12 : 14)} ${
                margin.top + plotHeight - (isMobile ? 14 : 20)
              })`}
            >
              LOWER DRS %
            </text>
          </>
        )}

        {/* Top-Right OPENVALS Logo Emblem & Benchmark Badge */}
        <g
          transform={`translate(${
            margin.left + plotWidth - (isMobile ? 86 : 106)
          }, ${margin.top + (isMobile ? 10 : 12)})`}
        >
          <rect
            x="0"
            y="0"
            width={isMobile ? "86" : "106"}
            height={isMobile ? "24" : "28"}
            rx="6"
            fill="var(--secondary-bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle
            cx={isMobile ? "12" : "14"}
            cy={isMobile ? "12" : "14"}
            r={isMobile ? "6" : "7"}
            stroke="#10b981"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d={isMobile ? "M9.5 10L12 14.5L14.5 10" : "M11 11.5L14 17L17 11.5"}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={isMobile ? "24" : "28"}
            y={isMobile ? "15.5" : "18"}
            fill="var(--text-main)"
            fontSize={isMobile ? "9.5" : "11"}
            fontWeight="700"
            letterSpacing="0.06em"
            fontFamily="var(--font-serif-main)"
          >
            OPENVALS
          </text>
        </g>

        {/* 3. GRID LINES & AXIS TICKS */}
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
                opacity="0.6"
              />
              <text
                x={margin.left - (isMobile ? 8 : 10)}
                y={y + 4}
                textAnchor="end"
                fill="var(--text-muted)"
                fontSize={isMobile ? "10" : "11"}
                fontFamily="var(--font-serif-main)"
              >
                {acc}%
              </text>
            </g>
          );
        })}

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
                opacity="0.6"
              />
              <text
                x={x}
                y={margin.top + plotHeight + (isMobile ? 18 : 22)}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize={isMobile ? "10" : "11"}
                fontFamily="var(--font-serif-main)"
              >
                {formatXTick(val)}
              </text>
            </g>
          );
        })}

        {/* Axis Titles */}
        <text
          x={margin.left + plotWidth / 2}
          y={margin.top + plotHeight + (isMobile ? 36 : 44)}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={isMobile ? "10" : "11"}
          fontWeight="600"
          letterSpacing="0.05em"
          fontFamily="var(--font-serif-main)"
        >
          {viewMode === "latency" ? "Average Response Latency (Milliseconds)" : "Decision Reliability Score — DRS (%)"}
        </text>

        <text
          x={14}
          y={margin.top + plotHeight / 2}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={isMobile ? "10" : "11"}
          fontWeight="600"
          letterSpacing="0.05em"
          fontFamily="var(--font-serif-main)"
          transform={`rotate(-90 14 ${margin.top + plotHeight / 2})`}
        >
          Benchmark Accuracy (%)
        </text>

        {/* 4. PARETO FRONTIER CURVE */}
        <path
          d={frontierPathD}
          fill="none"
          stroke="url(#frontierGradient)"
          strokeWidth={isMobile ? "2.8" : "2.6"}
          filter="url(#frontierGlow)"
          opacity="0.95"
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
              opacity={isFaded ? 0.18 : 1}
              style={{ transition: "opacity 0.2s" }}
            >
              <line
                x1={x}
                y1={y - (isMobile ? 6 : 8)}
                x2={labelX}
                y2={labelY + (isMobile ? 3 : 4)}
                stroke="var(--border)"
                strokeWidth={isMobile ? "1" : "1.2"}
                strokeDasharray="2 2"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={callout.dx < 0 ? "end" : "start"}
                fill="var(--text-main)"
                fontSize={isMobile ? "10" : "11"}
                fontWeight="700"
                fontFamily="var(--font-serif-main)"
                stroke="var(--card-bg)"
                strokeWidth={isMobile ? "2.5" : "2"}
                paintOrder="stroke fill"
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
          const isSelected = selectedPointModel?.id === model.id;
          const isActive = isHovered || isSelected;
          const isFaded =
            selectedLab &&
            selectedLab !== "All Models" &&
            model.labKey !== selectedLab;
          const isOnActiveFrontier = frontierSet.has(model.id);
          const badgeRadius = isMobile ? 12 : 12.5;

          return (
            <g
              key={model.id}
              transform={`translate(${x}, ${y})`}
              opacity={isFaded ? 0.2 : 1}
              cursor="pointer"
              onClick={() => {
                if (selectedPointModel?.id === model.id) {
                  setSelectedPointModel(null);
                  onSelectModel?.(null);
                } else {
                  setSelectedPointModel(model);
                  onSelectModel?.(model);
                }
              }}
              onMouseEnter={() => {
                if (!isMobile) {
                  setHoveredModel(model);
                  onSelectModel?.(model);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredModel(null);
                  onSelectModel?.(null);
                }
              }}
              style={{
                transition: "transform 0.15s ease, opacity 0.2s ease",
              }}
            >
              {/* Invisible large touch target for mobile (44px target) */}
              <circle
                cx="0"
                cy="0"
                r={isMobile ? "22" : "16"}
                fill="transparent"
              />

              {/* Outer halo on hover or selected */}
              {isActive && (
                <circle
                  cx="0"
                  cy="0"
                  r={isMobile ? "18" : "20"}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  opacity="0.9"
                />
              )}

              {/* Frontier champion highlight ring */}
              {isOnActiveFrontier && (
                <circle
                  cx="0"
                  cy="0"
                  r={isMobile ? "15" : "15.5"}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.85"
                />
              )}

              {/* Main Badge Background */}
              <circle
                cx="0"
                cy="0"
                r={badgeRadius}
                fill={model.badgeColor}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#pointDropShadow)"
              />

              {/* Lab Badge Icon */}
              {renderLabIcon(model)}
            </g>
          );
        })}
      </svg>

      {/* MOBILE DOCKED MODEL CARD */}
      {isMobile && activeModel && (
        <div
          style={{
            padding: "14px 16px",
            background: "var(--card-bg)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "var(--text-main)",
                }}
              >
                {activeModel.name}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: activeModel.badgeColor,
                  color: activeModel.badgeTextColor,
                  textTransform: "uppercase",
                }}
              >
                {activeModel.lab}
              </span>
              {frontierSet.has(activeModel.id) && (
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  FRONTIER CHAMPION
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedPointModel(null);
                setHoveredModel(null);
                onSelectModel?.(null);
              }}
              style={{
                background: "var(--secondary-bg)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "var(--text-muted)",
                cursor: "pointer",
                flexShrink: 0,
              }}
              aria-label="Close details"
            >
              &times;
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              background: "var(--secondary-bg)",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Accuracy
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#10b981",
                }}
              >
                {activeModel.accuracy.toFixed(1)}%
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Avg Latency
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color:
                    viewMode === "latency" ? "#10b981" : "var(--text-main)",
                }}
              >
                {activeModel.latencyLabel}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                DRS Score
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#06b6d4",
                }}
              >
                {activeModel.drsLabel}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE TAP HINT */}
      {isMobile && !activeModel && (
        <div
          style={{
            padding: "9px 12px",
            background: "var(--secondary-bg)",
            borderTop: "1px solid var(--border)",
            fontSize: "11px",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            textAlign: "center",
          }}
        >
          <span>Tap any model badge to inspect task accuracy, latency &amp; DRS score</span>
        </div>
      )}

      {/* FLOATING HOVER TOOLTIP (DESKTOP) */}
      {!isMobile && hoveredModel && (
        <div
          style={{
            position: "absolute",
            top:
              scaleY(hoveredModel.accuracy) < 200
                ? `${scaleY(hoveredModel.accuracy) + 24}px`
                : `${scaleY(hoveredModel.accuracy) - 12}px`,
            left: `${Math.min(
              Math.max(24, getModelX(hoveredModel) + 24),
              width - 290
            )}px`,
            transform:
              scaleY(hoveredModel.accuracy) < 200
                ? "none"
                : "translateY(-100%)",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            color: "#ffffff",
            padding: "14px 16px",
            borderRadius: "12px",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)",
            zIndex: 40,
            pointerEvents: "none",
            fontSize: "12px",
            lineHeight: 1.5,
            minWidth: "260px",
            borderTop: `3px solid ${hoveredModel.badgeColor}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              paddingBottom: "8px",
              marginBottom: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#f8fafc" }}>
                {hoveredModel.name}
              </div>
              <div style={{ fontSize: "10.5px", color: "#94a3b8" }}>
                {hoveredModel.lab} • {hoveredModel.costLabel} per task
              </div>
            </div>
            {frontierSet.has(hoveredModel.id) && (
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: "4px",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Frontier
              </span>
            )}
          </div>

          {/* Core Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "6px 8px",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#94a3b8" }}>Accuracy</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#34d399" }}>
                {hoveredModel.accuracy.toFixed(1)}%
              </div>
            </div>

            <div
              style={{
                background:
                  viewMode === "latency"
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(6, 182, 212, 0.15)",
                padding: "6px 8px",
                borderRadius: "6px",
                border:
                  viewMode === "latency"
                    ? "1px solid rgba(16, 185, 129, 0.25)"
                    : "1px solid rgba(6, 182, 212, 0.25)",
              }}
            >
              <div style={{ fontSize: "10px", color: viewMode === "latency" ? "#6ee7b7" : "#67e8f9" }}>
                {viewMode === "latency" ? "Average Latency" : "DRS Reliability"}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: viewMode === "latency" ? "#34d399" : "#38bdf8",
                }}
              >
                {viewMode === "latency" ? hoveredModel.latencyLabel : hoveredModel.drsLabel}
              </div>
            </div>
          </div>

          {/* Sector Breakdown Bars */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "6px",
              fontSize: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
              <span>Sectoral GDP Weights</span>
              <span style={{ color: "#cbd5e1" }}>Finance: {hoveredModel.breakdown.finance}% • Coding: {hoveredModel.breakdown.coding}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
              <span>Legal Tasks:</span>
              <span style={{ color: "#cbd5e1" }}>{hoveredModel.breakdown.legal}% • Tokens: {hoveredModel.tokenLabel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
