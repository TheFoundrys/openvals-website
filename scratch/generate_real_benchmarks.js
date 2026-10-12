const fs = require('fs');
const content = fs.readFileSync('src/components/modelBenchmarkData.ts', 'utf8');
const jsonMatch = content.match(/export const AGGREGATED_MODELS: AggregatedModel\[\] = (\[[\s\S]*?\]);\n\nexport const ALL_BENCHMARK_RUNS/);
const models = JSON.parse(jsonMatch[1]);

const LAB_CONFIGS = {
  "Agentica": {
    displayName: "DEEPSCALER",
    version: "1.5B",
    color: "#df8b7c",
    textColor: "#ffffff",
    cost: 0.20,
    costLabel: "$0.20",
    tokenUsage: 3400,
    tokenLabel: "3.4k"
  },
  "Tencent": {
    displayName: "HUNYUAN",
    version: "1.8B",
    color: "#3a3a3a",
    textColor: "#ffffff",
    cost: 0.25,
    costLabel: "$0.25",
    tokenUsage: 3600,
    tokenLabel: "3.6k"
  },
  "IBM": {
    displayName: "GRANITE 3.3",
    version: "2.0B",
    color: "#0f62fe",
    textColor: "#ffffff",
    cost: 0.30,
    costLabel: "$0.30",
    tokenUsage: 3200,
    tokenLabel: "3.2k"
  },
  "Prism ML": {
    displayName: "TERNARY",
    version: "BONSAI 1.7B",
    color: "#10b981",
    textColor: "#ffffff",
    cost: 0.22,
    costLabel: "$0.22",
    tokenUsage: 3800,
    tokenLabel: "3.8k"
  },
  "Liquid AI": {
    displayName: "LFM 2.5",
    version: "THINKING",
    color: "#0284c7",
    textColor: "#ffffff",
    cost: 0.18,
    costLabel: "$0.18",
    tokenUsage: 3500,
    tokenLabel: "3.5k"
  },
  "QVAC": {
    displayName: "MEDPSY",
    version: "1.7B",
    color: "#7c3aed",
    textColor: "#ffffff",
    cost: 0.22,
    costLabel: "$0.22",
    tokenUsage: 4100,
    tokenLabel: "4.1k"
  },
  "Hugging Face": {
    displayName: "SMOLLM",
    version: "1.7B",
    color: "#f59e0b",
    textColor: "#1e293b",
    cost: 0.20,
    costLabel: "$0.20",
    tokenUsage: 3900,
    tokenLabel: "3.9k"
  },
  "Google": {
    displayName: "GEMMA 3N",
    version: "E2B",
    color: "#46b17c",
    textColor: "#ffffff",
    cost: 0.28,
    costLabel: "$0.28",
    tokenUsage: 4200,
    tokenLabel: "4.2k"
  },
  "Meta": {
    displayName: "LLAMA 2.0",
    version: "1.0B",
    color: "#528ef0",
    textColor: "#ffffff",
    cost: 0.15,
    costLabel: "$0.15",
    tokenUsage: 4300,
    tokenLabel: "4.3k"
  },
  "Microsoft": {
    displayName: "PHI-3",
    version: "3.8B",
    color: "#00a4ef",
    textColor: "#ffffff",
    cost: 0.45,
    costLabel: "$0.45",
    tokenUsage: 4600,
    tokenLabel: "4.6k"
  },
  "Open Source": {
    displayName: "OPENCHAT",
    version: "7B",
    color: "#64748b",
    textColor: "#ffffff",
    cost: 0.70,
    costLabel: "$0.70",
    tokenUsage: 4800,
    tokenLabel: "4.8k"
  },
  "Alibaba": {
    displayName: "QWEN 3",
    version: "0.6B",
    color: "#f3832b",
    textColor: "#ffffff",
    cost: 0.10,
    costLabel: "$0.10",
    tokenUsage: 4900,
    tokenLabel: "4.9k"
  },
  "TII": {
    displayName: "FALCON 3",
    version: "1.0B",
    color: "#0ea5e9",
    textColor: "#ffffff",
    cost: 0.15,
    costLabel: "$0.15",
    tokenUsage: 5100,
    tokenLabel: "5.1k"
  },
  "01.AI": {
    displayName: "YI-CODER",
    version: "1.5B",
    color: "#498ff0",
    textColor: "#ffffff",
    cost: 0.20,
    costLabel: "$0.20",
    tokenUsage: 5300,
    tokenLabel: "5.3k"
  },
  "Deepseek": {
    displayName: "DEEPSEEK",
    version: "R1-QWEN 1.5B",
    color: "#1e40af",
    textColor: "#ffffff",
    cost: 0.20,
    costLabel: "$0.20",
    tokenUsage: 5400,
    tokenLabel: "5.4k"
  },
  "Mistral AI": {
    displayName: "MINISTRAL",
    version: "3.0B",
    color: "#d8b335",
    textColor: "#1e293b",
    cost: 0.35,
    costLabel: "$0.35",
    tokenUsage: 5600,
    tokenLabel: "5.6k"
  },
  "Stability AI": {
    displayName: "STABLELM",
    version: "ZEPHYR 3B",
    color: "#a855f7",
    textColor: "#ffffff",
    cost: 0.35,
    costLabel: "$0.35",
    tokenUsage: 5700,
    tokenLabel: "5.7k"
  },
  "Nous Research": {
    displayName: "HERMES 3",
    version: "3.0B",
    color: "#546d88",
    textColor: "#ffffff",
    cost: 0.35,
    costLabel: "$0.35",
    tokenUsage: 6100,
    tokenLabel: "6.1k"
  },
  "Doey LLM": {
    displayName: "ONELLM",
    version: "DOEY 1.0B",
    color: "#e7a44f",
    textColor: "#1e293b",
    cost: 0.14,
    costLabel: "$0.14",
    tokenUsage: 6400,
    tokenLabel: "6.4k"
  },
  "Big Science": {
    displayName: "BLOOM",
    version: "560M",
    color: "#708092",
    textColor: "#ffffff",
    cost: 0.08,
    costLabel: "$0.08",
    tokenUsage: 6900,
    tokenLabel: "6.9k"
  },
  "Supra": {
    displayName: "SUPRA",
    version: "50M",
    color: "#8ec84c",
    textColor: "#1e293b",
    cost: 0.02,
    costLabel: "$0.02",
    tokenUsage: 7400,
    tokenLabel: "7.4k"
  },
  "PROMTECH Inc": {
    displayName: "ASENA",
    version: "ESP32 121M",
    color: "#eab308",
    textColor: "#1e293b",
    cost: 0.03,
    costLabel: "$0.03",
    tokenUsage: 8100,
    tokenLabel: "8.1k"
  },
  "North ML": {
    displayName: "WILLOW",
    version: "ALPHA 0.3B",
    color: "#5b6670",
    textColor: "#ffffff",
    cost: 0.05,
    costLabel: "$0.05",
    tokenUsage: 8600,
    tokenLabel: "8.6k",
    hasPattern: true
  }
};

const labMap = {};
models.forEach(m => {
  let normLab = m.lab;
  if (normLab === 'Open-Source' || normLab === 'Open Source') normLab = 'Open Source';
  if (normLab === 'BigScience' || normLab === 'Big Science') normLab = 'Big Science';
  
  if (!labMap[normLab] || labMap[normLab].accuracyNum < m.accuracyNum) {
    labMap[normLab] = m;
  }
});

const generatedModels = Object.keys(LAB_CONFIGS).map(lab => {
  const m = labMap[lab];
  const cfg = LAB_CONFIGS[lab];
  const latNum = parseFloat(m.latency.replace(/[^0-9.]/g, '')) || 2000;
  
  return {
    id: m.id,
    name: cfg.displayName,
    version: cfg.version,
    lab: lab,
    score: Math.round(m.accuracyNum * 10000) / 100,
    displayScore: m.accuracy,
    cost: cfg.cost,
    costLabel: cfg.costLabel,
    latency: Math.round(latNum * 100) / 100,
    latencyLabel: m.latency,
    tokenUsage: cfg.tokenUsage,
    tokenLabel: cfg.tokenLabel,
    color: cfg.color,
    textColor: cfg.textColor,
    hasPattern: cfg.hasPattern || false,
    breakdown: {
      finance: (parseFloat(m.safety) * 100).toFixed(1) + "%",
      software: (parseFloat(m.factuality) * 100).toFixed(1) + "%",
      cybersecurity: m.hallucination,
      mentalHealth: (parseFloat(m.drs) * 100).toFixed(1) + "%"
    }
  };
}).sort((a, b) => b.score - a.score);

console.log('Generated models count:', generatedModels.length);
fs.writeFileSync('scratch/generated_models_for_benchmarks.json', JSON.stringify(generatedModels, null, 2));
console.log('Saved to scratch/generated_models_for_benchmarks.json');
