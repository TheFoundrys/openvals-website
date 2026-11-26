/**
 * Numbers for the methodology page, computed from the synced evaluation data
 * at build time — so the page never drifts from what the leaderboard uses.
 */
import { AGGREGATED_MODELS, ALL_BENCHMARK_RUNS } from "@/components/modelBenchmarkData";
import { LEADERBOARD_META } from "@/lib/leaderboard";

export type MetricKey =
  | "accuracy"
  | "semantic"
  | "factuality"
  | "hallucination"
  | "safety"
  | "reliability"
  | "latency"
  | "drs";

export interface MetricDefinition {
  key: MetricKey;
  name: string;
  better: "Higher" | "Lower";
  measures: string;
  /** Unit used to display observed values */
  unit: "score" | "ms";
}

/** Definitions match the OpenVals docs metrics guide (/openvals-docs/model-evaluation) */
export const METRICS: MetricDefinition[] = [
  { key: "accuracy", name: "Accuracy", better: "Higher", measures: "Correctness of the model's output against the expected answer.", unit: "score" },
  { key: "semantic", name: "Semantic", better: "Higher", measures: "Meaning similarity and contextual alignment with the reference answer.", unit: "score" },
  { key: "factuality", name: "Factuality", better: "Higher", measures: "Factual alignment and absence of contradictions.", unit: "score" },
  { key: "hallucination", name: "Hallucination risk", better: "Lower", measures: "Estimated probability of hallucinated or unreliable content.", unit: "score" },
  { key: "safety", name: "Safety", better: "Higher", measures: "Absence of risky or harmful behaviour.", unit: "score" },
  { key: "reliability", name: "Reliability", better: "Higher", measures: "Stability of answers across repeated generations.", unit: "score" },
  { key: "latency", name: "Latency", better: "Lower", measures: "Average time to generate a response.", unit: "ms" },
  { key: "drs", name: "DRS Trust Score", better: "Higher", measures: "Overall decision reliability: a weighted combination of the signals above.", unit: "score" },
];

function runValue(run: (typeof ALL_BENCHMARK_RUNS)[number], key: MetricKey): number | null {
  const raw =
    key === "accuracy"
      ? run.accuracyNum
      : key === "drs"
        ? run.drsNum
        : key === "latency"
          ? parseFloat(String(run.latency).replace(/[^0-9.]/g, ""))
          : parseFloat(String(run[key]));
  return Number.isFinite(raw) ? raw : null;
}

const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

function correlation(pairs: [number, number][]): number {
  const n = pairs.length;
  const mx = pairs.reduce((a, p) => a + p[0], 0) / n;
  const my = pairs.reduce((a, p) => a + p[1], 0) / n;
  let sxy = 0;
  let sx = 0;
  let sy = 0;
  for (const [x, y] of pairs) {
    sxy += (x - mx) * (y - my);
    sx += (x - mx) ** 2;
    sy += (y - my) ** 2;
  }
  return sx && sy ? sxy / Math.sqrt(sx * sy) : 0;
}

export interface MetricStats extends MetricDefinition {
  runs: number;
  median: number;
  min: number;
  max: number;
  /** Pearson correlation with DRS across runs (null for DRS itself) */
  drsCorrelation: number | null;
}

export const METRIC_STATS: MetricStats[] = METRICS.map((def) => {
  const pairs = ALL_BENCHMARK_RUNS.map((r) => [runValue(r, def.key), r.drsNum] as const).filter(
    (p): p is readonly [number, number] => p[0] !== null
  );
  const values = pairs.map((p) => p[0]);
  return {
    ...def,
    runs: values.length,
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values),
    drsCorrelation:
      def.key === "drs" ? null : Math.round(correlation(pairs.map((p) => [p[0], p[1]])) * 100) / 100,
  };
});

/** Lifecycle stages, the same DRS thresholds the model registry uses */
export const LIFECYCLE_STAGES = [
  { name: "Production Ready", rule: "DRS ≥ 0.75", test: (drs: number) => drs >= 0.75 },
  { name: "Active Benchmark", rule: "0.55 ≤ DRS < 0.75", test: (drs: number) => drs >= 0.55 && drs < 0.75 },
  { name: "High Risk Candidate", rule: "DRS < 0.55", test: (drs: number) => drs < 0.55 },
].map((stage) => ({
  name: stage.name,
  rule: stage.rule,
  models: AGGREGATED_MODELS.filter((m) => stage.test(m.drsNum)).length,
}));

const dates = ALL_BENCHMARK_RUNS.map((r) => r.date).filter((d): d is string => Boolean(d)).sort();

export const DATA_SUMMARY = {
  runs: ALL_BENCHMARK_RUNS.length,
  models: AGGREGATED_MODELS.length,
  labs: new Set(AGGREGATED_MODELS.map((m) => m.lab)).size,
  firstDate: dates[0] ?? null,
  lastDate: dates[dates.length - 1] ?? null,
  version: LEADERBOARD_META.version,
  ranked: LEADERBOARD_META.rankedCount,
  preliminary: LEADERBOARD_META.preliminaryCount,
  minRuns: LEADERBOARD_META.minRuns,
};
