import { ModelMethodologyDetail, BenchmarkScore } from "./methodologyData";

export interface BenchmarkFactor {
  cost: number;
  latency: number;
  refusal: number;
}

export const BENCHMARK_FACTORS: Record<string, BenchmarkFactor> = {
  "Vals Index": { cost: 1.0, latency: 1.0, refusal: 0.15 },
  "Code Migration": { cost: 1.85, latency: 1.65, refusal: 0.05 },
  "EMB": { cost: 0.65, latency: 0.55, refusal: 0.02 },
  "Finance Agent (v2)": { cost: 1.45, latency: 1.35, refusal: 0.85 },
  "Legal Research Bench": { cost: 1.35, latency: 1.25, refusal: 1.45 },
  "MedCode": { cost: 1.15, latency: 1.10, refusal: 1.10 },
  "MedScribe": { cost: 0.85, latency: 0.75, refusal: 0.95 },
  "ProofBench v1.1": { cost: 1.70, latency: 1.80, refusal: 0.08 },
  "SAGE": { cost: 0.95, latency: 0.90, refusal: 0.20 },
  "Public Benefits Bench": { cost: 0.75, latency: 0.70, refusal: 0.60 },
  "Tax Agent Bench": { cost: 1.40, latency: 1.45, refusal: 1.15 },
  "Vibe Code Bench v1.1": { cost: 1.25, latency: 1.15, refusal: 0.04 },
  "BioMysteryBench": { cost: 0.90, latency: 0.85, refusal: 1.30 },
  "Harvey's Legal Agent": { cost: 1.60, latency: 1.50, refusal: 1.85 },
  "Harvey's Legal Agent Benchmark": { cost: 1.60, latency: 1.50, refusal: 1.85 },
  "IOI": { cost: 0.80, latency: 0.80, refusal: 0.02 },
  "ProgramBench": { cost: 1.10, latency: 1.05, refusal: 0.04 },
  "Terminal-Bench 2.1": { cost: 1.30, latency: 1.20, refusal: 0.12 },
};

export function parseLatencyToMs(str: string): number {
  if (!str) return 5000;
  let ms = 0;
  const minMatch = str.match(/(\d+(?:\.\d+)?)\s*min/i);
  const secMatch = str.match(/(\d+(?:\.\d+)?)\s*s(?:ec)?(?!\w)/i);
  const msMatch = str.match(/(\d+(?:\.\d+)?)\s*ms/i);

  if (minMatch) ms += parseFloat(minMatch[1]) * 60 * 1000;
  if (secMatch) ms += parseFloat(secMatch[1]) * 1000;
  if (msMatch) ms += parseFloat(msMatch[1]);
  if (!minMatch && !secMatch && !msMatch) {
    const num = parseFloat(str);
    if (!isNaN(num)) return num * 1000;
  }
  return ms > 0 ? ms : 5000;
}

export function formatLatencyMs(ms: number): string {
  if (ms >= 60000) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.round((ms % 60000) / 1000);
    return `${mins} min ${secs} s`;
  } else if (ms >= 10000) {
    return `${(ms / 1000).toFixed(1)} s`;
  } else if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} s`;
  } else {
    return `${Math.round(ms)} ms`;
  }
}

export interface ComputedBenchmarkRow {
  name: string;
  category: "proprietary" | "academic" | "partner";
  hasInfo?: boolean;
  barWidthPercent: number;
  mainValue: string;
  subValue: string;
  rankText: string;
}

export function computeBenchmarkTableRows(
  currentModel: ModelMethodologyDetail,
  allModels: ModelMethodologyDetail[],
  activeTab: "ACCURACY" | "COST" | "LATENCY" | "REFUSALS"
): ComputedBenchmarkRow[] {
  const baseLatMs = parseLatencyToMs(currentModel.latencyFormatted);
  const weightFactor =
    currentModel.weights === "OPEN"
      ? 0.35
      : currentModel.weights === "HYBRID"
      ? 0.75
      : 1.25;

  // Pre-calculate model metrics for scaling the bar
  const benchMetrics = currentModel.benchmarks.map((bench) => {
    const factor = BENCHMARK_FACTORS[bench.name] || {
      cost: 1.0,
      latency: 1.0,
      refusal: 0.2,
    };
    const cost = bench.cost ?? Number((currentModel.costPerTask * factor.cost).toFixed(4));
    const latMs = bench.latencyMs ?? Math.round(baseLatMs * factor.latency);
    const refusal =
      bench.refusalRate ??
      Number((factor.refusal * weightFactor).toFixed(2));

    return {
      name: bench.name,
      cost,
      latMs,
      refusal,
    };
  });

  const maxCost = Math.max(...benchMetrics.map((m) => m.cost), 0.01) * 1.05;
  const maxLatMs = Math.max(...benchMetrics.map((m) => m.latMs), 100) * 1.05;
  const maxRefusal = 2.5; // normalized 0 to 2.5% max scale for safety refusals

  return currentModel.benchmarks.map((bench) => {
    const factor = BENCHMARK_FACTORS[bench.name] || {
      cost: 1.0,
      latency: 1.0,
      refusal: 0.2,
    };

    if (activeTab === "ACCURACY") {
      return {
        name: bench.name,
        category: bench.category,
        hasInfo: bench.hasInfo,
        barWidthPercent: Math.min(100, Math.max(0, bench.score)),
        mainValue: `${bench.score.toFixed(2)}%`,
        subValue: `± ${bench.stdDev.toFixed(2)}`,
        rankText: `${bench.rank} / ${bench.totalModels || allModels.length}`,
      };
    }

    if (activeTab === "COST") {
      const costVal =
        bench.cost ?? Number((currentModel.costPerTask * factor.cost).toFixed(4));
      const costStd = (costVal * 0.038).toFixed(costVal >= 1 ? 2 : 3);

      // Rank across all models for this benchmark's cost (lower is better)
      const allModelCosts = allModels.map((m) => {
        const b = m.benchmarks.find((x) => x.name === bench.name);
        return {
          id: m.id,
          cost: b?.cost ?? m.costPerTask * factor.cost,
        };
      });
      allModelCosts.sort((a, b) => a.cost - b.cost);
      const rankIdx = allModelCosts.findIndex((x) => x.id === currentModel.id);
      const rank = rankIdx >= 0 ? rankIdx + 1 : bench.rank;

      const formattedVal =
        costVal >= 10
          ? `$${costVal.toFixed(2)}`
          : costVal >= 1
          ? `$${costVal.toFixed(3)}`
          : costVal >= 0.01
          ? `$${costVal.toFixed(3)}`
          : `$${costVal.toFixed(4)}`;

      return {
        name: bench.name,
        category: bench.category,
        hasInfo: bench.hasInfo,
        barWidthPercent: Math.min(
          100,
          Math.max(4, Math.round((costVal / maxCost) * 100))
        ),
        mainValue: formattedVal,
        subValue: `± $${costStd}`,
        rankText: `${rank} / ${allModels.length}`,
      };
    }

    if (activeTab === "LATENCY") {
      const latMs =
        bench.latencyMs ?? Math.round(baseLatMs * factor.latency);
      const latStdMs = latMs * 0.055;

      // Rank across all models for latency (lower/faster is better)
      const allModelLats = allModels.map((m) => {
        const b = m.benchmarks.find((x) => x.name === bench.name);
        const mBase = parseLatencyToMs(m.latencyFormatted);
        return {
          id: m.id,
          lat: b?.latencyMs ?? mBase * factor.latency,
        };
      });
      allModelLats.sort((a, b) => a.lat - b.lat);
      const rankIdx = allModelLats.findIndex((x) => x.id === currentModel.id);
      const rank = rankIdx >= 0 ? rankIdx + 1 : bench.rank;

      return {
        name: bench.name,
        category: bench.category,
        hasInfo: bench.hasInfo,
        barWidthPercent: Math.min(
          100,
          Math.max(4, Math.round((latMs / maxLatMs) * 100))
        ),
        mainValue: formatLatencyMs(latMs),
        subValue: `± ${formatLatencyMs(latStdMs)}`,
        rankText: `${rank} / ${allModels.length}`,
      };
    }

    // REFUSALS
    const refusalVal =
      bench.refusalRate ??
      Number((factor.refusal * weightFactor).toFixed(2));
    const refusalStd = Number((refusalVal * 0.08).toFixed(2));

    // Rank across all models for refusal (lower refusal rate is better)
    const allModelRefusals = allModels.map((m) => {
      const b = m.benchmarks.find((x) => x.name === bench.name);
      const mW =
        m.weights === "OPEN" ? 0.35 : m.weights === "HYBRID" ? 0.75 : 1.25;
      return {
        id: m.id,
        refusal: b?.refusalRate ?? factor.refusal * mW,
      };
    });
    allModelRefusals.sort((a, b) => a.refusal - b.refusal);
    const rankIdx = allModelRefusals.findIndex((x) => x.id === currentModel.id);
    const rank = rankIdx >= 0 ? rankIdx + 1 : bench.rank;

    return {
      name: bench.name,
      category: bench.category,
      hasInfo: bench.hasInfo,
      barWidthPercent: Math.min(
        100,
        Math.max(2, Math.round((refusalVal / maxRefusal) * 100))
      ),
      mainValue: `${refusalVal.toFixed(2)}%`,
      subValue: `± ${refusalStd.toFixed(2)}`,
      rankText: `${rank} / ${allModels.length}`,
    };
  });
}
