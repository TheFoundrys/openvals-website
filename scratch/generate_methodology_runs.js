const fs = require('fs');

const parsed = JSON.parse(fs.readFileSync('scratch/parsed_models.json', 'utf8'));

// Format latency ms into readable string
function formatLat(ms) {
  if (ms >= 60000) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.round((ms % 60000) / 1000);
    return `${mins} min ${secs} s`;
  }
  if (ms >= 10000) {
    return `${(ms / 1000).toFixed(1)} s`;
  }
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} s`;
  }
  return `${Math.round(ms)} ms`;
}

// Classify category for aesthetic bar colors matching the legend
function getCategory(lab) {
  const norm = (lab || '').toLowerCase();
  if (norm.includes('open-source') || norm.includes('open source') || norm.includes('hugging') || norm.includes('big') || norm.includes('bmb')) {
    return 'academic'; // Dark Blue in legend
  }
  if (norm.includes('prism') || norm.includes('liquid') || norm.includes('qvac') || norm.includes('supra') || norm.includes('north') || norm.includes('promtech')) {
    return 'partner'; // Emerald Green in legend
  }
  return 'proprietary'; // Terracotta/Coral in legend
}

// 1. Process all 173 runs from the user's pasted list
const allRuns = parsed.map((p, idx) => {
  const accNum = parseFloat((parseFloat(p.accuracy) * 100).toFixed(2));
  const latNum = parseFloat(p.latency.replace(/[^0-9.]/g, '')) || 0;
  const category = getCategory(p.lab);

  return {
    id: `run-${idx + 1}-${p.name.replace(/[^a-zA-Z0-9]/g, '-')}`,
    runIndex: idx + 1,
    name: p.name,
    displayName: `${p.name} (${p.params})`,
    params: p.params,
    size: p.size,
    lab: p.lab || 'Open Source',
    accuracy: accNum,
    accuracyFormatted: `${accNum.toFixed(2)}%`,
    latencyMs: latNum,
    latencyFormatted: formatLat(latNum),
    semantic: parseFloat((parseFloat(p.semantic) * 100).toFixed(1)),
    factuality: parseFloat((parseFloat(p.factuality) * 100).toFixed(1)),
    hallucination: parseFloat((parseFloat(p.hallucination) * 100).toFixed(1)),
    safety: parseFloat((parseFloat(p.safety) * 100).toFixed(1)),
    reliability: parseFloat((parseFloat(p.reliability) * 100).toFixed(1)),
    drs: parseFloat((parseFloat(p.drs) * 100).toFixed(1)),
    category: category
  };
});

// 2. Read existing methodology models to preserve full sidebar details
const currentMethodologyContent = fs.readFileSync('src/components/methodologyData.ts', 'utf8');
const match = currentMethodologyContent.match(/export const METHODOLOGY_MODELS: ModelMethodologyDetail\[\] = (\[[\s\S]*?\]);\s*$/);
const currentModels = match ? eval(match[1]) : [];

const fileContent = `export interface BenchmarkScore {
  name: string;
  category: "proprietary" | "academic" | "partner";
  score: number;
  stdDev: number;
  rank: number;
  totalModels: number;
  icon?: string;
  hasInfo?: boolean;
  cost?: number;
  latencyFormatted?: string;
  latencyMs?: number;
  refusalRate?: number;
}

export interface OurBenchmarkRun {
  id: string;
  runIndex: number;
  name: string;
  displayName: string;
  params: string;
  size: string;
  lab: string;
  accuracy: number;
  accuracyFormatted: string;
  latencyMs: number;
  latencyFormatted: string;
  semantic: number;
  factuality: number;
  hallucination: number;
  safety: number;
  reliability: number;
  drs: number;
  category: "proprietary" | "academic" | "partner";
}

export interface ModelMethodologyDetail {
  id: string;
  name: string;
  developer: string;
  country: string;
  releaseDate: string;
  formattedDate: string;
  companyKey: string;
  weights: "PRIVATE" | "OPEN" | "HYBRID";
  contextWindow: string;
  maxOutputTokens: string;
  tokenCosts: string;
  modalities: ("text" | "image" | "audio" | "code")[];
  accuracy: number;
  accuracyStdDev: number;
  costPerTask: number;
  latencyFormatted: string;
  benchmarks: BenchmarkScore[];
  hyperparameters: {
    temperature: number;
    topP: number;
    maxTokens: number;
    systemPrompt: string;
    samplingBudget: string;
    retries: number;
  };
  updates: {
    date: string;
    summary: string;
    bullets: string[];
    fallbackPolicy: string;
  };
}

export const OUR_BENCHMARK_RUNS: OurBenchmarkRun[] = ${JSON.stringify(allRuns, null, 2)};

export const METHODOLOGY_MODELS: ModelMethodologyDetail[] = ${JSON.stringify(currentModels, null, 2)};
`;

fs.writeFileSync('src/components/methodologyData.ts', fileContent, 'utf8');
console.log('Successfully written OUR_BENCHMARK_RUNS (173 runs) to src/components/methodologyData.ts');
