"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ValsIndexModel, VALS_INDEX_MODELS } from "./valsIndexData";
import styles from "./ValsIndexChart.module.css";

interface ValsIndexChartProps {
  /** Lab to highlight; other models fade */
  selectedLab: string | null;
  onSelectModel?: (model: ValsIndexModel | null) => void;
  viewMode?: "latency" | "drs";
}

/** Round SVG coordinates so server (Node) and browser render identical values
 *  — Math.log10 can differ in the last floating-point digit, which breaks hydration. */
const round = (v: number) => Math.round(v * 100) / 100;

const ACCENT_FRONTIER = "#10b981"; // theme emerald
const ACCENT_SELECTED = "var(--accent-light)";

const formatLatency = (ms: number) =>
  ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(ms < 10000 ? 1 : 0)} s`;

/** Pareto frontier: models no other model beats on both axes */
function frontierFor(viewMode: "latency" | "drs"): ValsIndexModel[] {
  if (viewMode === "latency") {
    // Lower latency is better: walk from fastest, keep each accuracy record
    const sorted = VALS_INDEX_MODELS.filter((m) => m.latency > 0).sort(
      (a, b) => a.latency - b.latency || b.accuracy - a.accuracy
    );
    const out: ValsIndexModel[] = [];
    let best = -Infinity;
    for (const m of sorted) {
      if (m.accuracy > best) {
        out.push(m);
        best = m.accuracy;
      }
    }
    return out; // latency ascending, accuracy ascending
  }
  // Higher DRS is better: walk from most reliable, keep each accuracy record
  const sorted = [...VALS_INDEX_MODELS].sort((a, b) => b.drs - a.drs || b.accuracy - a.accuracy);
  const out: ValsIndexModel[] = [];
  let best = -Infinity;
  for (const m of sorted) {
    if (m.accuracy > best) {
      out.push(m);
      best = m.accuracy;
    }
  }
  return out.reverse(); // DRS ascending, accuracy descending
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export default function ValsIndexChart({
  selectedLab,
  onSelectModel,
  viewMode = "latency",
}: ValsIndexChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Render at the real pixel width so text and the tooltip are never scaled
  const [width, setWidth] = useState(1000);
  const [hovered, setHovered] = useState<ValsIndexModel | null>(null);
  const [pinned, setPinned] = useState<ValsIndexModel | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clear a pinned model when the view changes
  useEffect(() => {
    setPinned(null);
    setHovered(null);
  }, [viewMode]);

  const isCompact = width < 640;
  const height = isCompact ? 400 : 500;
  const margin = isCompact
    ? { top: 20, right: 14, bottom: 44, left: 44 }
    : { top: 24, right: 24, bottom: 52, left: 60 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const plotRight = margin.left + plotW;
  const plotBottom = margin.top + plotH;

  // ── Scales ────────────────────────────────────────────────────────────────
  const latencyDomain = useMemo(() => {
    const max = Math.max(...VALS_INDEX_MODELS.map((m) => m.latency).filter((l) => l > 0), 10000);
    const p = 10 ** Math.floor(Math.log10(max));
    const niceMax = [1, 2, 5, 10].map((k) => k * p).find((v) => v >= max) ?? 10 * p;
    return { min: 100, max: niceMax };
  }, []);

  const drsDomain = useMemo(() => {
    const values = VALS_INDEX_MODELS.map((m) => m.drs);
    return { min: Math.floor(Math.min(...values) / 5) * 5, max: Math.ceil(Math.max(...values) / 5) * 5 };
  }, []);

  const xOf = (m: ValsIndexModel) => {
    if (viewMode === "latency") {
      const { min, max } = latencyDomain;
      const v = Math.min(max, Math.max(min, m.latency || min));
      const t = (Math.log10(v) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
      return round(margin.left + t * plotW);
    }
    const { min, max } = drsDomain;
    return round(margin.left + ((m.drs - min) / (max - min)) * plotW);
  };
  const xAt = (v: number) =>
    viewMode === "latency"
      ? round(
          margin.left +
            ((Math.log10(v) - Math.log10(latencyDomain.min)) /
              (Math.log10(latencyDomain.max) - Math.log10(latencyDomain.min))) *
              plotW
        )
      : round(margin.left + ((v - drsDomain.min) / (drsDomain.max - drsDomain.min)) * plotW);
  const yOf = (accuracy: number) => round(margin.top + plotH - (Math.max(0, Math.min(100, accuracy)) / 100) * plotH);

  const xTicks = useMemo(() => {
    if (viewMode === "latency") {
      const ticks: number[] = [];
      for (let t = latencyDomain.min; t <= latencyDomain.max; t *= 10) ticks.push(t);
      // The end tick (e.g. 200s) collides with 100s on narrow charts
      if (!isCompact && ticks[ticks.length - 1] !== latencyDomain.max) ticks.push(latencyDomain.max);
      return ticks;
    }
    const step = isCompact || drsDomain.max - drsDomain.min > 30 ? 10 : 5;
    const ticks: number[] = [];
    for (let t = drsDomain.min; t <= drsDomain.max; t += step) ticks.push(t);
    return ticks;
  }, [viewMode, latencyDomain, drsDomain, isCompact]);
  const yTicks = [0, 20, 40, 60, 80, 100];

  const formatXTick = (t: number) =>
    viewMode === "latency" ? (t < 1000 ? `${t / 1000}s` : `${Math.round(t / 1000)}s`) : `${t}`;

  // ── Frontier ──────────────────────────────────────────────────────────────
  const frontier = useMemo(() => frontierFor(viewMode), [viewMode]);
  const frontierIds = useMemo(() => new Set(frontier.map((m) => m.id)), [frontier]);

  // Step line: the best accuracy reachable at each x (a Pareto frontier is a staircase)
  const frontierPath = (() => {
    if (!frontier.length) return "";
    const pts = frontier.map((m) => ({ x: xOf(m), y: yOf(m.accuracy) }));
    if (viewMode === "latency") {
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) d += ` H ${pts[i].x} V ${pts[i].y}`;
      return `${d} H ${plotRight}`;
    }
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) d += ` V ${pts[i].y} H ${pts[i].x}`;
    return d;
  })();

  // ── Direct labels for frontier models, placed without collisions ─────────
  const labels = (() => {
    const fontSize = isCompact ? 10 : 11;
    const charW = fontSize * 0.58;
    const placed: Box[] = [];
    // Keep labels off every frontier dot
    const dots: Box[] = frontier.map((m) => ({ x: xOf(m) - 6, y: yOf(m.accuracy) - 6, w: 12, h: 12 }));
    const out: { id: string; x: number; y: number; anchor: "start" | "end" | "middle"; text: string }[] = [];
    // Label the highest-accuracy models first so they win space
    const order = [...frontier].sort((a, b) => b.accuracy - a.accuracy);
    for (const m of order) {
      const text = m.name;
      const w = text.length * charW + 4;
      const h = fontSize + 4;
      const px = xOf(m);
      const py = yOf(m.accuracy);
      const candidates: { box: Box; x: number; y: number; anchor: "start" | "end" | "middle" }[] = [
        { box: { x: px + 9, y: py - h / 2, w, h }, x: px + 9, y: py + fontSize / 3, anchor: "start" },
        { box: { x: px - 9 - w, y: py - h / 2, w, h }, x: px - 9, y: py + fontSize / 3, anchor: "end" },
        { box: { x: px - w / 2, y: py - 10 - h, w, h }, x: px, y: py - 13, anchor: "middle" },
        { box: { x: px - w / 2, y: py + 10, w, h }, x: px, y: py + 10 + fontSize, anchor: "middle" },
      ];
      const fit = candidates.find(
        (c) =>
          c.box.x >= margin.left &&
          c.box.x + c.box.w <= plotRight &&
          c.box.y >= margin.top &&
          c.box.y + c.box.h <= plotBottom &&
          !placed.some((p) => overlaps(p, c.box)) &&
          !dots.some((d) => overlaps(d, c.box))
      );
      if (fit) {
        placed.push(fit.box);
        out.push({ id: m.id, x: fit.x, y: fit.y, anchor: fit.anchor, text });
      }
    }
    return out;
  })();

  const active = pinned || hovered;

  const setActive = (m: ValsIndexModel | null, pin: boolean) => {
    if (pin) {
      const next = pinned?.id === m?.id ? null : m;
      setPinned(next);
      onSelectModel?.(next);
    } else {
      setHovered(m);
      if (!pinned) onSelectModel?.(m);
    }
  };

  // Draw order: faded → neutral → frontier → selected lab → active (on top)
  const drawOrder = [...VALS_INDEX_MODELS].sort((a, b) => {
    const weight = (m: ValsIndexModel) =>
      (selectedLab && m.labKey === selectedLab ? 4 : 0) +
      (frontierIds.has(m.id) ? 2 : 0) +
      (selectedLab && m.labKey !== selectedLab ? -4 : 0);
    return weight(a) - weight(b);
  });

  const selectedCount = selectedLab ? VALS_INDEX_MODELS.filter((m) => m.labKey === selectedLab).length : 0;

  // Tooltip position (px inside the container), flipped to stay in view
  const tooltip = active
    ? (() => {
        const x = xOf(active);
        const y = yOf(active.accuracy);
        const tipW = 240;
        const left = x + 14 + tipW > width ? x - 14 - tipW : x + 14;
        const above = y > height / 2;
        return { left: Math.max(8, left), top: y, above };
      })()
    : null;

  const xLabel = isCompact
    ? viewMode === "latency"
      ? "Avg latency (log) · faster ←"
      : "DRS Trust Score · more reliable →"
    : viewMode === "latency"
      ? "Average response latency (log scale) — faster to the left"
      : "DRS Trust Score — more reliable to the right";

  return (
    <div className={styles.chartCard}>
      {/* Legend: identity never relies on colour alone (shape + text) */}
      <div className={styles.legend}>
        <span className={styles.keyEntry}>
          <span className={styles.swatchNeutral} aria-hidden="true" />
          Ranked model
        </span>
        <span className={styles.keyEntry}>
          <span className={styles.swatchFrontier} aria-hidden="true" />
          On the frontier
        </span>
        <span className={styles.keyEntry}>
          <span className={styles.swatchLine} aria-hidden="true" />
          {viewMode === "latency" ? "Speed frontier" : "Trust frontier"}
        </span>
        {selectedLab && (
          <span className={styles.keyEntry}>
            <span className={styles.swatchSelected} aria-hidden="true" />
            {selectedLab} ({selectedCount})
          </span>
        )}
        <span className={styles.legendHint}>{isCompact ? "Tap a dot for details" : "Hover a dot for details · click to pin"}</span>
      </div>

      <div ref={containerRef} className={styles.plotArea}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Scatter plot of ${VALS_INDEX_MODELS.length} ranked models: accuracy against ${
            viewMode === "latency" ? "average latency" : "DRS Trust Score"
          }. Frontier models: ${frontier.map((m) => m.name).join(", ")}.`}
          className={styles.svg}
          onMouseLeave={() => setActive(null, false)}
        >
          {/* Grid */}
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line x1={margin.left} x2={plotRight} y1={yOf(t)} y2={yOf(t)} className={styles.gridLine} />
              <text x={margin.left - 8} y={yOf(t) + 4} textAnchor="end" className={styles.tick}>
                {t}%
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line x1={xAt(t)} x2={xAt(t)} y1={margin.top} y2={plotBottom} className={styles.gridLine} />
              <text x={xAt(t)} y={plotBottom + 18} textAnchor="middle" className={styles.tick}>
                {formatXTick(t)}
              </text>
            </g>
          ))}
          <line x1={margin.left} x2={plotRight} y1={plotBottom} y2={plotBottom} className={styles.axisLine} />

          {/* Axis titles */}
          <text x={margin.left + plotW / 2} y={height - 10} textAnchor="middle" className={styles.axisTitle}>
            {xLabel}
          </text>
          <text
            x={12}
            y={margin.top + plotH / 2}
            textAnchor="middle"
            className={styles.axisTitle}
            transform={`rotate(-90 12 ${margin.top + plotH / 2})`}
          >
            Benchmark accuracy
          </text>

          {/* Which corner is better */}
          <text
            x={viewMode === "latency" ? margin.left + 8 : plotRight - 8}
            y={margin.top + 14}
            textAnchor={viewMode === "latency" ? "start" : "end"}
            className={styles.cornerHint}
          >
            {viewMode === "latency" ? "↖ faster and more accurate" : "more reliable and accurate ↗"}
          </text>

          {/* Frontier line */}
          <path d={frontierPath} className={styles.frontierLine} />

          {/* Points */}
          {drawOrder.map((m) => {
            const x = xOf(m);
            const y = yOf(m.accuracy);
            const isFrontier = frontierIds.has(m.id);
            const inLab = selectedLab ? m.labKey === selectedLab : false;
            const faded = Boolean(selectedLab) && !inLab;
            const isActive = active?.id === m.id;
            const fill = inLab ? ACCENT_SELECTED : isFrontier ? ACCENT_FRONTIER : "var(--text-muted)";
            const r = isActive ? 7 : isFrontier || inLab ? 5.5 : 4.5;
            return (
              <g
                key={m.id}
                className={styles.point}
                opacity={faded ? 0.22 : 1}
                onMouseEnter={() => setActive(m, false)}
                onClick={() => setActive(m, true)}
              >
                {/* Hit target larger than the mark */}
                <circle cx={x} cy={y} r={isCompact ? 12 : 9} fill="transparent" />
                {isActive && <circle cx={x} cy={y} r={11} className={styles.activeHalo} />}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={fill}
                  fillOpacity={isFrontier || inLab || isActive ? 1 : 0.55}
                  className={styles.dot}
                />
              </g>
            );
          })}

          {/* Frontier labels */}
          {labels.map((l) => (
            <text
              key={`label-${l.id}`}
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              className={styles.pointLabel}
              opacity={selectedLab ? 0.35 : 1}
            >
              {l.text}
            </text>
          ))}
        </svg>

        {/* Hover / pinned details */}
        {active && tooltip && (
          <div
            className={`${styles.tooltip} ${isCompact ? styles.tooltipDocked : ""}`}
            style={
              isCompact
                ? undefined
                : {
                    left: tooltip.left,
                    top: tooltip.top,
                    transform: tooltip.above ? "translateY(calc(-100% - 10px))" : "translateY(10px)",
                  }
            }
            role="status"
          >
            <div className={styles.tooltipHeader}>
              <div>
                <div className={styles.tooltipName}>
                  {active.name}
                  {active.version && <span className={styles.tooltipParams}>{active.version}</span>}
                </div>
                <div className={styles.tipLab}>{active.lab}</div>
              </div>
              {frontierIds.has(active.id) && <span className={styles.frontierTag}>Frontier</span>}
              {isCompact && (
                <button
                  type="button"
                  className={styles.tooltipClose}
                  onClick={() => setActive(null, true)}
                  aria-label="Close details"
                >
                  ×
                </button>
              )}
            </div>
            <dl className={styles.tooltipGrid}>
              <div>
                <dt>Rank</dt>
                <dd>#{active.rank}</dd>
              </div>
              <div>
                <dt>DRS</dt>
                <dd>
                  {active.drsLabel}
                  {active.drsCi !== null && <span className={styles.ci}> ±{active.drsCi.toFixed(1)}</span>}
                </dd>
              </div>
              <div>
                <dt>Accuracy</dt>
                <dd>{active.accuracy.toFixed(1)}%</dd>
              </div>
              <div>
                <dt>Latency</dt>
                <dd>{active.latency > 0 ? formatLatency(active.latency) : "—"}</dd>
              </div>
              <div>
                <dt>Runs</dt>
                <dd>{active.runs}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
