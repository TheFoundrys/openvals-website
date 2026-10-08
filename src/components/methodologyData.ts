export interface BenchmarkScore {
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

export const OUR_BENCHMARK_RUNS: OurBenchmarkRun[] = [
  {
    "id": "run-1-qwen3",
    "runIndex": 1,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 48.9,
    "accuracyFormatted": "48.90%",
    "latencyMs": 6274.72,
    "latencyFormatted": "6.27 s",
    "semantic": 43.4,
    "factuality": 54.8,
    "hallucination": 62.2,
    "safety": 100,
    "reliability": 85.6,
    "drs": 50.2,
    "category": "proprietary"
  },
  {
    "id": "run-2-deepseek-r1",
    "runIndex": 2,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 46.5,
    "accuracyFormatted": "46.50%",
    "latencyMs": 8752.84,
    "latencyFormatted": "8.75 s",
    "semantic": 46.9,
    "factuality": 55.5,
    "hallucination": 60.7,
    "safety": 97,
    "reliability": 77.1,
    "drs": 48.6,
    "category": "proprietary"
  },
  {
    "id": "run-3-qwen3",
    "runIndex": 3,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 63.7,
    "accuracyFormatted": "63.70%",
    "latencyMs": 4268.31,
    "latencyFormatted": "4.27 s",
    "semantic": 65.3,
    "factuality": 72.2,
    "hallucination": 54.1,
    "safety": 74,
    "reliability": 88.7,
    "drs": 56,
    "category": "proprietary"
  },
  {
    "id": "run-4-deepseek-r1",
    "runIndex": 4,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 53.5,
    "accuracyFormatted": "53.50%",
    "latencyMs": 7714.98,
    "latencyFormatted": "7.71 s",
    "semantic": 58.3,
    "factuality": 66.7,
    "hallucination": 56.2,
    "safety": 81.5,
    "reliability": 78.2,
    "drs": 51.5,
    "category": "proprietary"
  },
  {
    "id": "run-5-llama3-2",
    "runIndex": 5,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 82,
    "accuracyFormatted": "82.00%",
    "latencyMs": 3956.92,
    "latencyFormatted": "3.96 s",
    "semantic": 65.2,
    "factuality": 72.1,
    "hallucination": 54,
    "safety": 76,
    "reliability": 91.5,
    "drs": 60.4,
    "category": "proprietary"
  },
  {
    "id": "run-6-llama2-0",
    "runIndex": 6,
    "name": "llama2.0",
    "displayName": "llama2.0 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 80.5,
    "accuracyFormatted": "80.50%",
    "latencyMs": 17867.46,
    "latencyFormatted": "17.9 s",
    "semantic": 65.4,
    "factuality": 72.3,
    "hallucination": 54.1,
    "safety": 74,
    "reliability": 90.7,
    "drs": 59.4,
    "category": "proprietary"
  },
  {
    "id": "run-7-phi-3",
    "runIndex": 7,
    "name": "phi-3",
    "displayName": "phi-3 (3.8b)",
    "params": "3.8b",
    "size": "2.2 GB",
    "lab": "Microsoft",
    "accuracy": 27.3,
    "accuracyFormatted": "27.30%",
    "latencyMs": 9997.08,
    "latencyFormatted": "10.00 s",
    "semantic": 20,
    "factuality": 36,
    "hallucination": 70,
    "safety": 95.3,
    "reliability": 51.2,
    "drs": 33.3,
    "category": "proprietary"
  },
  {
    "id": "run-8-qwen2-5",
    "runIndex": 8,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 84.4,
    "accuracyFormatted": "84.40%",
    "latencyMs": 2125.18,
    "latencyFormatted": "2.13 s",
    "semantic": 64.4,
    "factuality": 71.5,
    "hallucination": 54.7,
    "safety": 92.5,
    "reliability": 86.2,
    "drs": 62.7,
    "category": "proprietary"
  },
  {
    "id": "run-9-qwen2-5",
    "runIndex": 9,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 68.6,
    "accuracyFormatted": "68.60%",
    "latencyMs": 2328.67,
    "latencyFormatted": "2.33 s",
    "semantic": 64,
    "factuality": 71.2,
    "hallucination": 54.6,
    "safety": 82,
    "reliability": 84.6,
    "drs": 57.6,
    "category": "proprietary"
  },
  {
    "id": "run-10-tinyllama",
    "runIndex": 10,
    "name": "tinyllama",
    "displayName": "tinyllama (1.1b)",
    "params": "1.1b",
    "size": "637 MB",
    "lab": "Open-Source",
    "accuracy": 68,
    "accuracyFormatted": "68.00%",
    "latencyMs": 1243.15,
    "latencyFormatted": "1.24 s",
    "semantic": 63,
    "factuality": 70.4,
    "hallucination": 54.8,
    "safety": 100,
    "reliability": 77.1,
    "drs": 59.2,
    "category": "academic"
  },
  {
    "id": "run-11-deepseek-coder",
    "runIndex": 11,
    "name": "deepseek-coder",
    "displayName": "deepseek-coder (1.3b)",
    "params": "1.3b",
    "size": "776 MB",
    "lab": "Deepseek",
    "accuracy": 57.2,
    "accuracyFormatted": "57.20%",
    "latencyMs": 2095.12,
    "latencyFormatted": "2.10 s",
    "semantic": 63.3,
    "factuality": 70.7,
    "hallucination": 54.5,
    "safety": 96.3,
    "reliability": 77.3,
    "drs": 56.2,
    "category": "proprietary"
  },
  {
    "id": "run-12-smollm",
    "runIndex": 12,
    "name": "smollm",
    "displayName": "smollm (1.7b)",
    "params": "1.7b",
    "size": "990 MB",
    "lab": "Hugging Face",
    "accuracy": 83.9,
    "accuracyFormatted": "83.90%",
    "latencyMs": 4643.99,
    "latencyFormatted": "4.64 s",
    "semantic": 44.8,
    "factuality": 55.8,
    "hallucination": 61.4,
    "safety": 100,
    "reliability": 90.6,
    "drs": 58.5,
    "category": "academic"
  },
  {
    "id": "run-13-gemma3n",
    "runIndex": 13,
    "name": "gemma3n",
    "displayName": "gemma3n (e2b)",
    "params": "e2b",
    "size": "5.6 GB",
    "lab": "Google",
    "accuracy": 82.5,
    "accuracyFormatted": "82.50%",
    "latencyMs": 21745.48,
    "latencyFormatted": "21.7 s",
    "semantic": 63.6,
    "factuality": 70.9,
    "hallucination": 54.7,
    "safety": 82.3,
    "reliability": 89.5,
    "drs": 60.3,
    "category": "proprietary"
  },
  {
    "id": "run-14-lfm2-5-thinking",
    "runIndex": 14,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 100,
    "accuracyFormatted": "100.00%",
    "latencyMs": 4284.59,
    "latencyFormatted": "4.28 s",
    "semantic": 37.3,
    "factuality": 49.9,
    "hallucination": 63.6,
    "safety": 100,
    "reliability": 93.6,
    "drs": 60.1,
    "category": "partner"
  },
  {
    "id": "run-15-granite3-moe",
    "runIndex": 15,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 62.4,
    "accuracyFormatted": "62.40%",
    "latencyMs": 770.82,
    "latencyFormatted": "771 ms",
    "semantic": 69.3,
    "factuality": 75.5,
    "hallucination": 52.6,
    "safety": 100,
    "reliability": 93.9,
    "drs": 62.7,
    "category": "proprietary"
  },
  {
    "id": "run-16-stablelm2",
    "runIndex": 16,
    "name": "stablelm2",
    "displayName": "stablelm2 (1.6b)",
    "params": "1.6b",
    "size": "982 MB",
    "lab": "Stability AI",
    "accuracy": 54.3,
    "accuracyFormatted": "54.30%",
    "latencyMs": 2170.74,
    "latencyFormatted": "2.17 s",
    "semantic": 45.1,
    "factuality": 54.1,
    "hallucination": 61.6,
    "safety": 100,
    "reliability": 81.1,
    "drs": 51.3,
    "category": "proprietary"
  },
  {
    "id": "run-17-internlm2",
    "runIndex": 17,
    "name": "internlm2",
    "displayName": "internlm2 (1.8b)",
    "params": "1.8b",
    "size": "1.1 GB",
    "lab": "Open-Source",
    "accuracy": 57.9,
    "accuracyFormatted": "57.90%",
    "latencyMs": 1336.49,
    "latencyFormatted": "1.34 s",
    "semantic": 66.5,
    "factuality": 73.2,
    "hallucination": 53.4,
    "safety": 100,
    "reliability": 88.6,
    "drs": 59.9,
    "category": "academic"
  },
  {
    "id": "run-18-granite3-2",
    "runIndex": 18,
    "name": "granite3.2",
    "displayName": "granite3.2 (2.0b)",
    "params": "2.0b",
    "size": "1.5 GB",
    "lab": "IBM",
    "accuracy": 83.9,
    "accuracyFormatted": "83.90%",
    "latencyMs": 8568.64,
    "latencyFormatted": "8.57 s",
    "semantic": 50.8,
    "factuality": 60.7,
    "hallucination": 59.6,
    "safety": 81,
    "reliability": 84.3,
    "drs": 56.2,
    "category": "proprietary"
  },
  {
    "id": "run-19-yi-coder",
    "runIndex": 19,
    "name": "yi-coder",
    "displayName": "yi-coder (1.5b)",
    "params": "1.5b",
    "size": "866 MB",
    "lab": "01.AI",
    "accuracy": 69.8,
    "accuracyFormatted": "69.80%",
    "latencyMs": 2167.23,
    "latencyFormatted": "2.17 s",
    "semantic": 61.5,
    "factuality": 69.3,
    "hallucination": 55.3,
    "safety": 96.3,
    "reliability": 81.7,
    "drs": 58.9,
    "category": "proprietary"
  },
  {
    "id": "run-20-ministral-3",
    "runIndex": 20,
    "name": "ministral-3",
    "displayName": "ministral-3 (3.0b)",
    "params": "3.0b",
    "size": "3.0 GB",
    "lab": "Mistral AI",
    "accuracy": 67.4,
    "accuracyFormatted": "67.40%",
    "latencyMs": 9955.05,
    "latencyFormatted": "9.96 s",
    "semantic": 59.3,
    "factuality": 67.5,
    "hallucination": 56.2,
    "safety": 86.4,
    "reliability": 89,
    "drs": 56.7,
    "category": "proprietary"
  },
  {
    "id": "run-21-granite3-3",
    "runIndex": 21,
    "name": "granite3.3",
    "displayName": "granite3.3 (2.0b)",
    "params": "2.0b",
    "size": "1.5 GB",
    "lab": "IBM",
    "accuracy": 96.7,
    "accuracyFormatted": "96.70%",
    "latencyMs": 2427.7,
    "latencyFormatted": "2.43 s",
    "semantic": 44.2,
    "factuality": 55.4,
    "hallucination": 61.2,
    "safety": 100,
    "reliability": 92,
    "drs": 61.4,
    "category": "proprietary"
  },
  {
    "id": "run-22-qwen1-5",
    "runIndex": 22,
    "name": "qwen1.5",
    "displayName": "qwen1.5 (0.5b)",
    "params": "0.5b",
    "size": "394 MB",
    "lab": "Alibaba",
    "accuracy": 33.1,
    "accuracyFormatted": "33.10%",
    "latencyMs": 723.48,
    "latencyFormatted": "723 ms",
    "semantic": 47.9,
    "factuality": 56.3,
    "hallucination": 60.4,
    "safety": 97,
    "reliability": 75.3,
    "drs": 47.4,
    "category": "proprietary"
  },
  {
    "id": "run-23-smollm2",
    "runIndex": 23,
    "name": "smollm2",
    "displayName": "smollm2 (1.7b)",
    "params": "1.7b",
    "size": "1.8 GB",
    "lab": "Hugging Face",
    "accuracy": 66,
    "accuracyFormatted": "66.00%",
    "latencyMs": 2845.31,
    "latencyFormatted": "2.85 s",
    "semantic": 65.6,
    "factuality": 72.5,
    "hallucination": 54.1,
    "safety": 78,
    "reliability": 87.8,
    "drs": 57.3,
    "category": "academic"
  },
  {
    "id": "run-24-phi",
    "runIndex": 24,
    "name": "phi",
    "displayName": "phi (2.7b)",
    "params": "2.7b",
    "size": "1.6 GB",
    "lab": "Microsoft",
    "accuracy": 77.2,
    "accuracyFormatted": "77.20%",
    "latencyMs": 6541.64,
    "latencyFormatted": "6.54 s",
    "semantic": 60.9,
    "factuality": 68.7,
    "hallucination": 55.9,
    "safety": 96.3,
    "reliability": 88,
    "drs": 60.6,
    "category": "proprietary"
  },
  {
    "id": "run-25-interlm2-5",
    "runIndex": 25,
    "name": "interlm2.5",
    "displayName": "interlm2.5 (1.8b)",
    "params": "1.8b",
    "size": "3.8 GB",
    "lab": "Open-Source",
    "accuracy": 63,
    "accuracyFormatted": "63.00%",
    "latencyMs": 7882.98,
    "latencyFormatted": "7.88 s",
    "semantic": 58.9,
    "factuality": 67.1,
    "hallucination": 56,
    "safety": 100,
    "reliability": 59.3,
    "drs": 53.4,
    "category": "academic"
  },
  {
    "id": "run-26-deepscaler",
    "runIndex": 26,
    "name": "deepscaler",
    "displayName": "deepscaler (1.5b)",
    "params": "1.5b",
    "size": "3.6 GB",
    "lab": "Agentica",
    "accuracy": 100,
    "accuracyFormatted": "100.00%",
    "latencyMs": 19449.35,
    "latencyFormatted": "19.4 s",
    "semantic": 33.1,
    "factuality": 46.4,
    "hallucination": 65.1,
    "safety": 100,
    "reliability": 88.3,
    "drs": 57.7,
    "category": "proprietary"
  },
  {
    "id": "run-27-granite4",
    "runIndex": 27,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 76.2,
    "accuracyFormatted": "76.20%",
    "latencyMs": 469.86,
    "latencyFormatted": "470 ms",
    "semantic": 53.6,
    "factuality": 62.9,
    "hallucination": 57.9,
    "safety": 100,
    "reliability": 70.4,
    "drs": 57.9,
    "category": "proprietary"
  },
  {
    "id": "run-28-gemma3",
    "runIndex": 28,
    "name": "gemma3",
    "displayName": "gemma3 (0.27b)",
    "params": "0.27b",
    "size": "291 MB",
    "lab": "Google",
    "accuracy": 52.3,
    "accuracyFormatted": "52.30%",
    "latencyMs": 1108.64,
    "latencyFormatted": "1.11 s",
    "semantic": 66.6,
    "factuality": 73.3,
    "hallucination": 52.4,
    "safety": 100,
    "reliability": 88.9,
    "drs": 59.5,
    "category": "proprietary"
  },
  {
    "id": "run-29-qwen2",
    "runIndex": 29,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352 MB",
    "lab": "Alibaba",
    "accuracy": 53.7,
    "accuracyFormatted": "53.70%",
    "latencyMs": 1058.55,
    "latencyFormatted": "1.06 s",
    "semantic": 54.9,
    "factuality": 63.9,
    "hallucination": 57.8,
    "safety": 87.2,
    "reliability": 71.4,
    "drs": 51.4,
    "category": "proprietary"
  },
  {
    "id": "run-30-gemma2",
    "runIndex": 30,
    "name": "gemma2",
    "displayName": "gemma2 (2.0b)",
    "params": "2.0b",
    "size": "1.6 GB",
    "lab": "Google",
    "accuracy": 78.6,
    "accuracyFormatted": "78.60%",
    "latencyMs": 6095.42,
    "latencyFormatted": "6.10 s",
    "semantic": 51,
    "factuality": 60.9,
    "hallucination": 59.7,
    "safety": 100,
    "reliability": 88.5,
    "drs": 58.7,
    "category": "proprietary"
  },
  {
    "id": "run-31-granite3-1-moe",
    "runIndex": 31,
    "name": "granite3.1-moe",
    "displayName": "granite3.1-moe (1.0b)",
    "params": "1.0b",
    "size": "1.4 GB",
    "lab": "IBM",
    "accuracy": 78.9,
    "accuracyFormatted": "78.90%",
    "latencyMs": 5408.86,
    "latencyFormatted": "5.41 s",
    "semantic": 63,
    "factuality": 70.4,
    "hallucination": 55,
    "safety": 73.5,
    "reliability": 88.3,
    "drs": 58.2,
    "category": "proprietary"
  },
  {
    "id": "run-32-falcon3",
    "runIndex": 32,
    "name": "falcon3",
    "displayName": "falcon3 (1.0b)",
    "params": "1.0b",
    "size": "1.8 GB",
    "lab": "TII",
    "accuracy": 73.2,
    "accuracyFormatted": "73.20%",
    "latencyMs": 4132.38,
    "latencyFormatted": "4.13 s",
    "semantic": 56.6,
    "factuality": 62.8,
    "hallucination": 57,
    "safety": 92.5,
    "reliability": 80.4,
    "drs": 56.7,
    "category": "proprietary"
  },
  {
    "id": "run-33-gemma",
    "runIndex": 33,
    "name": "gemma",
    "displayName": "gemma (2.0b)",
    "params": "2.0b",
    "size": "1.7 GB",
    "lab": "Google",
    "accuracy": 79.2,
    "accuracyFormatted": "79.20%",
    "latencyMs": 5511.23,
    "latencyFormatted": "5.51 s",
    "semantic": 66.6,
    "factuality": 73.3,
    "hallucination": 53.4,
    "safety": 100,
    "reliability": 87.9,
    "drs": 63.2,
    "category": "proprietary"
  },
  {
    "id": "run-34-granite3-dense",
    "runIndex": 34,
    "name": "granite3-dense",
    "displayName": "granite3-dense (2.0b)",
    "params": "2.0b",
    "size": "1.6 GB",
    "lab": "IBM",
    "accuracy": 76.8,
    "accuracyFormatted": "76.80%",
    "latencyMs": 3243.44,
    "latencyFormatted": "3.24 s",
    "semantic": 67.6,
    "factuality": 74.1,
    "hallucination": 52.5,
    "safety": 100,
    "reliability": 94.3,
    "drs": 64.4,
    "category": "proprietary"
  },
  {
    "id": "run-35-stablelm-zephyr",
    "runIndex": 35,
    "name": "stablelm-zephyr",
    "displayName": "stablelm-zephyr (3.0b)",
    "params": "3.0b",
    "size": "1.6 GB",
    "lab": "Stability AI",
    "accuracy": 72.7,
    "accuracyFormatted": "72.70%",
    "latencyMs": 2582.55,
    "latencyFormatted": "2.58 s",
    "semantic": 54.5,
    "factuality": 63.6,
    "hallucination": 57.6,
    "safety": 100,
    "reliability": 81.9,
    "drs": 58,
    "category": "proprietary"
  },
  {
    "id": "run-36-hermes3",
    "runIndex": 36,
    "name": "hermes3",
    "displayName": "hermes3 (3.0b)",
    "params": "3.0b",
    "size": "2.0 GB",
    "lab": "Nous Research",
    "accuracy": 56.7,
    "accuracyFormatted": "56.70%",
    "latencyMs": 4373.97,
    "latencyFormatted": "4.37 s",
    "semantic": 60.9,
    "factuality": 68.7,
    "hallucination": 55.7,
    "safety": 91,
    "reliability": 86.5,
    "drs": 55.6,
    "category": "proprietary"
  },
  {
    "id": "run-37-supra-50m-instruct",
    "runIndex": 37,
    "name": "supra-50m-instruct",
    "displayName": "supra-50m-instruct (0.0518b)",
    "params": "0.0518b",
    "size": "104 MB",
    "lab": "Supra",
    "accuracy": 37.3,
    "accuracyFormatted": "37.30%",
    "latencyMs": 580.87,
    "latencyFormatted": "581 ms",
    "semantic": 25.1,
    "factuality": 25.1,
    "hallucination": 68.2,
    "safety": 100,
    "reliability": 44.3,
    "drs": 35.8,
    "category": "partner"
  },
  {
    "id": "run-38-willow-alpha",
    "runIndex": 38,
    "name": "willow-alpha",
    "displayName": "willow-alpha (0.3b)",
    "params": "0.3b",
    "size": "176 MB",
    "lab": "North ML",
    "accuracy": 12.4,
    "accuracyFormatted": "12.40%",
    "latencyMs": 303.33,
    "latencyFormatted": "303 ms",
    "semantic": 11.9,
    "factuality": 29.6,
    "hallucination": 71.7,
    "safety": 100,
    "reliability": 31.3,
    "drs": 28.2,
    "category": "partner"
  },
  {
    "id": "run-39-lfm2",
    "runIndex": 39,
    "name": "lfm2",
    "displayName": "lfm2 (0.35b)",
    "params": "0.35b",
    "size": "229 MB",
    "lab": "Liquid AI",
    "accuracy": 67.7,
    "accuracyFormatted": "67.70%",
    "latencyMs": 1696.89,
    "latencyFormatted": "1.70 s",
    "semantic": 44.9,
    "factuality": 56,
    "hallucination": 61.4,
    "safety": 97,
    "reliability": 84.9,
    "drs": 54.6,
    "category": "partner"
  },
  {
    "id": "run-40-bloom-560m",
    "runIndex": 40,
    "name": "bloom-560m",
    "displayName": "bloom-560m (0.8b)",
    "params": "0.8b",
    "size": "1.6 GB",
    "lab": "Big Science",
    "accuracy": 37.7,
    "accuracyFormatted": "37.70%",
    "latencyMs": 7540.09,
    "latencyFormatted": "7.54 s",
    "semantic": 22.7,
    "factuality": 23.1,
    "hallucination": 66.9,
    "safety": 100,
    "reliability": 17.1,
    "drs": 30.5,
    "category": "academic"
  },
  {
    "id": "run-41-ternary-bonsai",
    "runIndex": 41,
    "name": "ternary-bonsai",
    "displayName": "ternary-bonsai (1.7b)",
    "params": "1.7b",
    "size": "3.4 GB",
    "lab": "Prism ML",
    "accuracy": 91.4,
    "accuracyFormatted": "91.40%",
    "latencyMs": 13473.13,
    "latencyFormatted": "13.5 s",
    "semantic": 53.7,
    "factuality": 62.9,
    "hallucination": 58.3,
    "safety": 81,
    "reliability": 86.2,
    "drs": 58.7,
    "category": "partner"
  },
  {
    "id": "run-42-minicpm5",
    "runIndex": 42,
    "name": "minicpm5",
    "displayName": "minicpm5 (1.0b)",
    "params": "1.0b",
    "size": "688 MB",
    "lab": "Open BMB",
    "accuracy": 0,
    "accuracyFormatted": "0.00%",
    "latencyMs": 333.32,
    "latencyFormatted": "333 ms",
    "semantic": 10.8,
    "factuality": 8.7,
    "hallucination": 70.4,
    "safety": 100,
    "reliability": 41.5,
    "drs": 24.6,
    "category": "academic"
  },
  {
    "id": "run-43-medpsy",
    "runIndex": 43,
    "name": "medpsy",
    "displayName": "medpsy (1.7b)",
    "params": "1.7b",
    "size": "4.1 GB",
    "lab": "QVAC",
    "accuracy": 90.2,
    "accuracyFormatted": "90.20%",
    "latencyMs": 28451.96,
    "latencyFormatted": "28.5 s",
    "semantic": 49.3,
    "factuality": 59.4,
    "hallucination": 60.9,
    "safety": 81,
    "reliability": 92.5,
    "drs": 58,
    "category": "partner"
  },
  {
    "id": "run-44-asena-esp32",
    "runIndex": 44,
    "name": "asena-esp32",
    "displayName": "asena-esp32 (0.121b)",
    "params": "0.121b",
    "size": "2.7 MB",
    "lab": "PROMTECH Inc",
    "accuracy": 19.7,
    "accuracyFormatted": "19.70%",
    "latencyMs": 1676.99,
    "latencyFormatted": "1.68 s",
    "semantic": 6.1,
    "factuality": 24.9,
    "hallucination": 74.5,
    "safety": 100,
    "reliability": 47.2,
    "drs": 28.3,
    "category": "partner"
  },
  {
    "id": "run-45-qwen2-5-instruct",
    "runIndex": 45,
    "name": "qwen2.5-instruct",
    "displayName": "qwen2.5-instruct (1.54b)",
    "params": "1.54b",
    "size": "1.1 GB",
    "lab": "Alibaba",
    "accuracy": 56.1,
    "accuracyFormatted": "56.10%",
    "latencyMs": 3478.05,
    "latencyFormatted": "3.48 s",
    "semantic": 50,
    "factuality": 58,
    "hallucination": 59.9,
    "safety": 94,
    "reliability": 74.5,
    "drs": 50.9,
    "category": "proprietary"
  },
  {
    "id": "run-46-vertalily1-2",
    "runIndex": 46,
    "name": "vertalily1.2",
    "displayName": "vertalily1.2 (1.0b)",
    "params": "1.0b",
    "size": "600 MB",
    "lab": "VLTX",
    "accuracy": 67.4,
    "accuracyFormatted": "67.40%",
    "latencyMs": 1880.17,
    "latencyFormatted": "1.88 s",
    "semantic": 67.1,
    "factuality": 73.7,
    "hallucination": 53.6,
    "safety": 82,
    "reliability": 86.4,
    "drs": 58.6,
    "category": "proprietary"
  },
  {
    "id": "run-47-atem-wisdom",
    "runIndex": 47,
    "name": "atem-wisdom",
    "displayName": "atem-wisdom (1.5b)",
    "params": "1.5b",
    "size": "986 MB",
    "lab": "Open-Source",
    "accuracy": 69.6,
    "accuracyFormatted": "69.60%",
    "latencyMs": 7373.45,
    "latencyFormatted": "7.37 s",
    "semantic": 62.1,
    "factuality": 69.7,
    "hallucination": 55.7,
    "safety": 96.3,
    "reliability": 78.7,
    "drs": 57.9,
    "category": "academic"
  },
  {
    "id": "run-48-gemma3-it",
    "runIndex": 48,
    "name": "gemma3-it",
    "displayName": "gemma3-it (1.0b)",
    "params": "1.0b",
    "size": "689 MB",
    "lab": "Google",
    "accuracy": 65.4,
    "accuracyFormatted": "65.40%",
    "latencyMs": 8975.29,
    "latencyFormatted": "8.98 s",
    "semantic": 65.1,
    "factuality": 72.1,
    "hallucination": 53.9,
    "safety": 88.7,
    "reliability": 88.6,
    "drs": 58.3,
    "category": "proprietary"
  },
  {
    "id": "run-49-deepseek-r1-distill-qwen",
    "runIndex": 49,
    "name": "deepseek-r1-distill-qwen",
    "displayName": "deepseek-r1-distill-qwen (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 69.6,
    "accuracyFormatted": "69.60%",
    "latencyMs": 9923.71,
    "latencyFormatted": "9.92 s",
    "semantic": 39.3,
    "factuality": 51.4,
    "hallucination": 63.7,
    "safety": 100,
    "reliability": 64,
    "drs": 49.8,
    "category": "proprietary"
  },
  {
    "id": "run-50-bonsai",
    "runIndex": 50,
    "name": "bonsai",
    "displayName": "bonsai (1.7b)",
    "params": "1.7b",
    "size": "248 MB",
    "lab": "Prism ML",
    "accuracy": 76.7,
    "accuracyFormatted": "76.70%",
    "latencyMs": 3672.35,
    "latencyFormatted": "3.67 s",
    "semantic": 61,
    "factuality": 68.8,
    "hallucination": 55.5,
    "safety": 79,
    "reliability": 89.4,
    "drs": 58.4,
    "category": "partner"
  },
  {
    "id": "run-51-hunyuan-instruct",
    "runIndex": 51,
    "name": "hunyuan-instruct",
    "displayName": "hunyuan-instruct (1.8b)",
    "params": "1.8b",
    "size": "1.1 GB",
    "lab": "Tencent",
    "accuracy": 98.3,
    "accuracyFormatted": "98.30%",
    "latencyMs": 15320.18,
    "latencyFormatted": "15.3 s",
    "semantic": 33.4,
    "factuality": 46.7,
    "hallucination": 65.3,
    "safety": 100,
    "reliability": 82.1,
    "drs": 56.6,
    "category": "proprietary"
  },
  {
    "id": "run-52-onellm-doey-v1",
    "runIndex": 52,
    "name": "onellm-doey-v1",
    "displayName": "onellm-doey-v1 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Doey LLM",
    "accuracy": 47.2,
    "accuracyFormatted": "47.20%",
    "latencyMs": 971.98,
    "latencyFormatted": "972 ms",
    "semantic": 67.9,
    "factuality": 74.3,
    "hallucination": 53,
    "safety": 96.2,
    "reliability": 63.4,
    "drs": 54,
    "category": "proprietary"
  },
  {
    "id": "run-53-llama3-2-instruct",
    "runIndex": 53,
    "name": "llama3.2-instruct",
    "displayName": "llama3.2-instruct (1.0b)",
    "params": "1.0b",
    "size": "807 MB",
    "lab": "Meta",
    "accuracy": 47.2,
    "accuracyFormatted": "47.20%",
    "latencyMs": 3745.51,
    "latencyFormatted": "3.75 s",
    "semantic": 45.8,
    "factuality": 54.7,
    "hallucination": 61.4,
    "safety": 97,
    "reliability": 85.9,
    "drs": 50.1,
    "category": "proprietary"
  },
  {
    "id": "run-54-qwen2-5-coder-instruct",
    "runIndex": 54,
    "name": "qwen2.5-coder-instruct",
    "displayName": "qwen2.5-coder-instruct (3.0b)",
    "params": "3.0b",
    "size": "2.1 GB",
    "lab": "Alibaba",
    "accuracy": 48.2,
    "accuracyFormatted": "48.20%",
    "latencyMs": 3428.46,
    "latencyFormatted": "3.43 s",
    "semantic": 66.1,
    "factuality": 72.8,
    "hallucination": 53,
    "safety": 96.3,
    "reliability": 77.1,
    "drs": 55.1,
    "category": "proprietary"
  },
  {
    "id": "run-55-phi-4-mini-instruct",
    "runIndex": 55,
    "name": "phi-4-mini-instruct",
    "displayName": "phi-4-mini-instruct (4.0b)",
    "params": "4.0b",
    "size": "2.5 GB",
    "lab": "Microsoft",
    "accuracy": 57.4,
    "accuracyFormatted": "57.40%",
    "latencyMs": 70451.9,
    "latencyFormatted": "1 min 10 s",
    "semantic": 48.5,
    "factuality": 57.5,
    "hallucination": 59.2,
    "safety": 82,
    "reliability": 69.2,
    "drs": 48.1,
    "category": "proprietary"
  },
  {
    "id": "run-56-qwen3",
    "runIndex": 56,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 70.8,
    "accuracyFormatted": "70.80%",
    "latencyMs": 4413.42,
    "latencyFormatted": "4.41 s",
    "semantic": 66.5,
    "factuality": 73.2,
    "hallucination": 52.9,
    "safety": 96.3,
    "reliability": 86.2,
    "drs": 61,
    "category": "proprietary"
  },
  {
    "id": "run-57-qwen3",
    "runIndex": 57,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 75,
    "accuracyFormatted": "75.00%",
    "latencyMs": 4342.35,
    "latencyFormatted": "4.34 s",
    "semantic": 67.8,
    "factuality": 74.3,
    "hallucination": 52.9,
    "safety": 100,
    "reliability": 87.9,
    "drs": 62.8,
    "category": "proprietary"
  },
  {
    "id": "run-58-qwen3",
    "runIndex": 58,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 80.4,
    "accuracyFormatted": "80.40%",
    "latencyMs": 3474.34,
    "latencyFormatted": "3.47 s",
    "semantic": 50.2,
    "factuality": 60.2,
    "hallucination": 59.5,
    "safety": 100,
    "reliability": 87,
    "drs": 58.9,
    "category": "proprietary"
  },
  {
    "id": "run-59-qwen3",
    "runIndex": 59,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 66.2,
    "accuracyFormatted": "66.20%",
    "latencyMs": 4153.94,
    "latencyFormatted": "4.15 s",
    "semantic": 61.2,
    "factuality": 68.9,
    "hallucination": 55.9,
    "safety": 91,
    "reliability": 87.8,
    "drs": 57.8,
    "category": "proprietary"
  },
  {
    "id": "run-60-qwen3",
    "runIndex": 60,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 91.3,
    "accuracyFormatted": "91.30%",
    "latencyMs": 7671.38,
    "latencyFormatted": "7.67 s",
    "semantic": 37.6,
    "factuality": 48.1,
    "hallucination": 63.5,
    "safety": 100,
    "reliability": 87.6,
    "drs": 57,
    "category": "proprietary"
  },
  {
    "id": "run-61-qwen3",
    "runIndex": 61,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 79.4,
    "accuracyFormatted": "79.40%",
    "latencyMs": 4346.24,
    "latencyFormatted": "4.35 s",
    "semantic": 69.1,
    "factuality": 75.3,
    "hallucination": 52.6,
    "safety": 100,
    "reliability": 86.9,
    "drs": 63,
    "category": "proprietary"
  },
  {
    "id": "run-62-deepseek-r1",
    "runIndex": 62,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 67.1,
    "accuracyFormatted": "67.10%",
    "latencyMs": 12237.55,
    "latencyFormatted": "12.2 s",
    "semantic": 63.9,
    "factuality": 81,
    "hallucination": 54.3,
    "safety": 100,
    "reliability": 81,
    "drs": 58.8,
    "category": "proprietary"
  },
  {
    "id": "run-63-llama3-2",
    "runIndex": 63,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 79.4,
    "accuracyFormatted": "79.40%",
    "latencyMs": 3962.62,
    "latencyFormatted": "3.96 s",
    "semantic": 65.6,
    "factuality": 72.5,
    "hallucination": 53.7,
    "safety": 96.3,
    "reliability": 87.2,
    "drs": 62.4,
    "category": "proprietary"
  },
  {
    "id": "run-64-qwen2-5",
    "runIndex": 64,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 84.4,
    "accuracyFormatted": "84.40%",
    "latencyMs": 4378.73,
    "latencyFormatted": "4.38 s",
    "semantic": 62.4,
    "factuality": 71.2,
    "hallucination": 54.8,
    "safety": 92.5,
    "reliability": 87,
    "drs": 61.9,
    "category": "proprietary"
  },
  {
    "id": "run-65-deepseek-r1",
    "runIndex": 65,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 58.2,
    "accuracyFormatted": "58.20%",
    "latencyMs": 8756.96,
    "latencyFormatted": "8.76 s",
    "semantic": 60.5,
    "factuality": 68.4,
    "hallucination": 55.5,
    "safety": 100,
    "reliability": 72.4,
    "drs": 54.8,
    "category": "proprietary"
  },
  {
    "id": "run-66-llama3-2",
    "runIndex": 66,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 75.5,
    "accuracyFormatted": "75.50%",
    "latencyMs": 4783.42,
    "latencyFormatted": "4.78 s",
    "semantic": 66.8,
    "factuality": 77.4,
    "hallucination": 51.5,
    "safety": 93.7,
    "reliability": 89.7,
    "drs": 61.9,
    "category": "proprietary"
  },
  {
    "id": "run-67-qwen2-5",
    "runIndex": 67,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 71.3,
    "accuracyFormatted": "71.30%",
    "latencyMs": 2823.63,
    "latencyFormatted": "2.82 s",
    "semantic": 62.6,
    "factuality": 70.1,
    "hallucination": 55,
    "safety": 100,
    "reliability": 86.1,
    "drs": 60.5,
    "category": "proprietary"
  },
  {
    "id": "run-68-lfm2-5-thinking",
    "runIndex": 68,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 87.9,
    "accuracyFormatted": "87.90%",
    "latencyMs": 10059.23,
    "latencyFormatted": "10.1 s",
    "semantic": 63,
    "factuality": 70.4,
    "hallucination": 55.1,
    "safety": 88.7,
    "reliability": 94,
    "drs": 62.9,
    "category": "partner"
  },
  {
    "id": "run-69-granite3-moe",
    "runIndex": 69,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 57.3,
    "accuracyFormatted": "57.30%",
    "latencyMs": 1026.26,
    "latencyFormatted": "1.03 s",
    "semantic": 71.8,
    "factuality": 77.4,
    "hallucination": 51.5,
    "safety": 100,
    "reliability": 87,
    "drs": 61.2,
    "category": "proprietary"
  },
  {
    "id": "run-70-granite4",
    "runIndex": 70,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 60,
    "accuracyFormatted": "60.00%",
    "latencyMs": 1978.59,
    "latencyFormatted": "1.98 s",
    "semantic": 64.7,
    "factuality": 71.7,
    "hallucination": 54,
    "safety": 93.7,
    "reliability": 83.3,
    "drs": 57.7,
    "category": "proprietary"
  },
  {
    "id": "run-71-deepseek-r1",
    "runIndex": 71,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 58.2,
    "accuracyFormatted": "58.20%",
    "latencyMs": 8756.96,
    "latencyFormatted": "8.76 s",
    "semantic": 60.5,
    "factuality": 68.4,
    "hallucination": 55.5,
    "safety": 100,
    "reliability": 72.4,
    "drs": 54.8,
    "category": "proprietary"
  },
  {
    "id": "run-72-llama3-2",
    "runIndex": 72,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 75.5,
    "accuracyFormatted": "75.50%",
    "latencyMs": 4783.42,
    "latencyFormatted": "4.78 s",
    "semantic": 66.8,
    "factuality": 77.4,
    "hallucination": 51.5,
    "safety": 93.7,
    "reliability": 89.7,
    "drs": 61.9,
    "category": "proprietary"
  },
  {
    "id": "run-73-qwen2-5",
    "runIndex": 73,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 71.3,
    "accuracyFormatted": "71.30%",
    "latencyMs": 2823.63,
    "latencyFormatted": "2.82 s",
    "semantic": 62.6,
    "factuality": 70.1,
    "hallucination": 55,
    "safety": 100,
    "reliability": 86.1,
    "drs": 60.5,
    "category": "proprietary"
  },
  {
    "id": "run-74-lfm2-5-thinking",
    "runIndex": 74,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 87.9,
    "accuracyFormatted": "87.90%",
    "latencyMs": 10059.23,
    "latencyFormatted": "10.1 s",
    "semantic": 63,
    "factuality": 70.4,
    "hallucination": 55.1,
    "safety": 88.7,
    "reliability": 94,
    "drs": 62.9,
    "category": "partner"
  },
  {
    "id": "run-75-granite3-moe",
    "runIndex": 75,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 57.3,
    "accuracyFormatted": "57.30%",
    "latencyMs": 1026.26,
    "latencyFormatted": "1.03 s",
    "semantic": 71.8,
    "factuality": 77.4,
    "hallucination": 51.5,
    "safety": 100,
    "reliability": 87,
    "drs": 61.2,
    "category": "proprietary"
  },
  {
    "id": "run-76-granite4",
    "runIndex": 76,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 60,
    "accuracyFormatted": "60.00%",
    "latencyMs": 1978.59,
    "latencyFormatted": "1.98 s",
    "semantic": 64.7,
    "factuality": 71.7,
    "hallucination": 54,
    "safety": 93.7,
    "reliability": 83.3,
    "drs": 57.7,
    "category": "proprietary"
  },
  {
    "id": "run-77-phi3-latest",
    "runIndex": 77,
    "name": "phi3:latest",
    "displayName": "phi3:latest (3.8b)",
    "params": "3.8b",
    "size": "2.2GB",
    "lab": "Microsoft",
    "accuracy": 68.9,
    "accuracyFormatted": "68.90%",
    "latencyMs": 36283.27,
    "latencyFormatted": "36.3 s",
    "semantic": 53.2,
    "factuality": 60.5,
    "hallucination": 59.1,
    "safety": 100,
    "reliability": 77.8,
    "drs": 55.1,
    "category": "proprietary"
  },
  {
    "id": "run-78-phi3-latest",
    "runIndex": 78,
    "name": "phi3:latest",
    "displayName": "phi3:latest (3.8b)",
    "params": "3.8b",
    "size": "2.2GB",
    "lab": "Microsoft",
    "accuracy": 93.8,
    "accuracyFormatted": "93.80%",
    "latencyMs": 95002.14,
    "latencyFormatted": "1 min 35 s",
    "semantic": 52.8,
    "factuality": 62.3,
    "hallucination": 58.5,
    "safety": 100,
    "reliability": 85.4,
    "drs": 61.4,
    "category": "proprietary"
  },
  {
    "id": "run-79-gemma-2b",
    "runIndex": 79,
    "name": "gemma:2b",
    "displayName": "gemma:2b (2b)",
    "params": "2b",
    "size": "1.7GB",
    "lab": "Google",
    "accuracy": 44.1,
    "accuracyFormatted": "44.10%",
    "latencyMs": 22385,
    "latencyFormatted": "22.4 s",
    "semantic": 48.3,
    "factuality": 56.6,
    "hallucination": 60.2,
    "safety": 97,
    "reliability": 56.6,
    "drs": 50,
    "category": "proprietary"
  },
  {
    "id": "run-80-gemma-2b",
    "runIndex": 80,
    "name": "gemma:2b",
    "displayName": "gemma:2b (2b)",
    "params": "2b",
    "size": "1.7GB",
    "lab": "Google",
    "accuracy": 75,
    "accuracyFormatted": "75.00%",
    "latencyMs": 8895.8,
    "latencyFormatted": "8.90 s",
    "semantic": 42.8,
    "factuality": 50.4,
    "hallucination": 61.7,
    "safety": 100,
    "reliability": 91.4,
    "drs": 55.5,
    "category": "proprietary"
  },
  {
    "id": "run-81-gemma-2b",
    "runIndex": 81,
    "name": "gemma:2b",
    "displayName": "gemma:2b (2b)",
    "params": "2b",
    "size": "1.7GB",
    "lab": "Google",
    "accuracy": 59.6,
    "accuracyFormatted": "59.60%",
    "latencyMs": 15655.96,
    "latencyFormatted": "15.7 s",
    "semantic": 46.5,
    "factuality": 57.2,
    "hallucination": 60.4,
    "safety": 100,
    "reliability": 79.8,
    "drs": 52.2,
    "category": "proprietary"
  },
  {
    "id": "run-82-tinyllama-latest",
    "runIndex": 82,
    "name": "tinyllama:latest",
    "displayName": "tinyllama:latest (1.1b)",
    "params": "1.1b",
    "size": "637MB",
    "lab": "Open-Source",
    "accuracy": 66.7,
    "accuracyFormatted": "66.70%",
    "latencyMs": 8254.44,
    "latencyFormatted": "8.25 s",
    "semantic": 40.4,
    "factuality": 39.2,
    "hallucination": 63.5,
    "safety": 100,
    "reliability": 74.6,
    "drs": 46.4,
    "category": "academic"
  },
  {
    "id": "run-83-smollm2-360m",
    "runIndex": 83,
    "name": "smollm2:360m",
    "displayName": "smollm2:360m (360m)",
    "params": "360m",
    "size": "726MB",
    "lab": "Hugging Face",
    "accuracy": 57.4,
    "accuracyFormatted": "57.40%",
    "latencyMs": 7121.49,
    "latencyFormatted": "7.12 s",
    "semantic": 58.9,
    "factuality": 67.1,
    "hallucination": 56.2,
    "safety": 96.2,
    "reliability": 75.1,
    "drs": 54.1,
    "category": "academic"
  },
  {
    "id": "run-84-openchat-latest",
    "runIndex": 84,
    "name": "openchat:latest",
    "displayName": "openchat:latest (7b)",
    "params": "7b",
    "size": "4.1GB",
    "lab": "Open-Source",
    "accuracy": 76.2,
    "accuracyFormatted": "76.20%",
    "latencyMs": 43021.38,
    "latencyFormatted": "43.0 s",
    "semantic": 67.3,
    "factuality": 73.8,
    "hallucination": 53.6,
    "safety": 100,
    "reliability": 92.8,
    "drs": 63.1,
    "category": "academic"
  },
  {
    "id": "run-85-deepseek-r1",
    "runIndex": 85,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 42.5,
    "accuracyFormatted": "42.50%",
    "latencyMs": 7459.19,
    "latencyFormatted": "7.46 s",
    "semantic": 35.5,
    "factuality": 48.4,
    "hallucination": 64.5,
    "safety": 100,
    "reliability": 77.4,
    "drs": 45.5,
    "category": "proprietary"
  },
  {
    "id": "run-86-llama3-2",
    "runIndex": 86,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 60.6,
    "accuracyFormatted": "60.60%",
    "latencyMs": 3791.97,
    "latencyFormatted": "3.79 s",
    "semantic": 47.7,
    "factuality": 56.1,
    "hallucination": 60.6,
    "safety": 96.2,
    "reliability": 83.9,
    "drs": 52.8,
    "category": "proprietary"
  },
  {
    "id": "run-87-qwen2-5",
    "runIndex": 87,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 43.6,
    "accuracyFormatted": "43.60%",
    "latencyMs": 1983.34,
    "latencyFormatted": "1.98 s",
    "semantic": 45,
    "factuality": 55.9,
    "hallucination": 62,
    "safety": 100,
    "reliability": 72.1,
    "drs": 48.1,
    "category": "proprietary"
  },
  {
    "id": "run-88-lfm2-5-thinking",
    "runIndex": 88,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 82.6,
    "accuracyFormatted": "82.60%",
    "latencyMs": 10247.88,
    "latencyFormatted": "10.2 s",
    "semantic": 45.8,
    "factuality": 56.6,
    "hallucination": 63.5,
    "safety": 94,
    "reliability": 92.9,
    "drs": 57.6,
    "category": "partner"
  },
  {
    "id": "run-89-granite3-moe",
    "runIndex": 89,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 56.8,
    "accuracyFormatted": "56.80%",
    "latencyMs": 1404.17,
    "latencyFormatted": "1.40 s",
    "semantic": 50.3,
    "factuality": 60.3,
    "hallucination": 60.2,
    "safety": 100,
    "reliability": 80.8,
    "drs": 53.8,
    "category": "proprietary"
  },
  {
    "id": "run-90-granite4",
    "runIndex": 90,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 36.4,
    "accuracyFormatted": "36.40%",
    "latencyMs": 894.1,
    "latencyFormatted": "894 ms",
    "semantic": 48.3,
    "factuality": 56.6,
    "hallucination": 60.5,
    "safety": 100,
    "reliability": 72.9,
    "drs": 45.5,
    "category": "proprietary"
  },
  {
    "id": "run-91-deepseek-r1",
    "runIndex": 91,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 77.8,
    "accuracyFormatted": "77.80%",
    "latencyMs": 12260.96,
    "latencyFormatted": "12.3 s",
    "semantic": 64.1,
    "factuality": 71.3,
    "hallucination": 54.2,
    "safety": 96.3,
    "reliability": 80.8,
    "drs": 60.4,
    "category": "proprietary"
  },
  {
    "id": "run-92-llama3-2",
    "runIndex": 92,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 80.9,
    "accuracyFormatted": "80.90%",
    "latencyMs": 4816.79,
    "latencyFormatted": "4.82 s",
    "semantic": 64.1,
    "factuality": 71.3,
    "hallucination": 54.2,
    "safety": 100,
    "reliability": 87.4,
    "drs": 62.3,
    "category": "proprietary"
  },
  {
    "id": "run-93-qwen2-5",
    "runIndex": 93,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 70.8,
    "accuracyFormatted": "70.80%",
    "latencyMs": 2538.21,
    "latencyFormatted": "2.54 s",
    "semantic": 64.2,
    "factuality": 71.3,
    "hallucination": 54.6,
    "safety": 100,
    "reliability": 83.7,
    "drs": 59.3,
    "category": "proprietary"
  },
  {
    "id": "run-94-lfm2-5-thinking",
    "runIndex": 94,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 87.3,
    "accuracyFormatted": "87.30%",
    "latencyMs": 9693.49,
    "latencyFormatted": "9.69 s",
    "semantic": 64.3,
    "factuality": 71.4,
    "hallucination": 54.5,
    "safety": 92.5,
    "reliability": 94.2,
    "drs": 63.8,
    "category": "partner"
  },
  {
    "id": "run-95-granite3-moe",
    "runIndex": 95,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 78.7,
    "accuracyFormatted": "78.70%",
    "latencyMs": 1428.65,
    "latencyFormatted": "1.43 s",
    "semantic": 68.8,
    "factuality": 75.1,
    "hallucination": 52.6,
    "safety": 96.3,
    "reliability": 86.7,
    "drs": 63.8,
    "category": "proprietary"
  },
  {
    "id": "run-96-granite4",
    "runIndex": 96,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 83.2,
    "accuracyFormatted": "83.20%",
    "latencyMs": 1616.3,
    "latencyFormatted": "1.62 s",
    "semantic": 65.4,
    "factuality": 72.3,
    "hallucination": 53.8,
    "safety": 96.3,
    "reliability": 85.5,
    "drs": 63.4,
    "category": "proprietary"
  },
  {
    "id": "run-97-deepseek-r1",
    "runIndex": 97,
    "name": "deepseek-r1",
    "displayName": "deepseek-r1 (1.5b)",
    "params": "1.5b",
    "size": "1.1 GB",
    "lab": "Deepseek",
    "accuracy": 95,
    "accuracyFormatted": "95.00%",
    "latencyMs": 16431.02,
    "latencyFormatted": "16.4 s",
    "semantic": 37.4,
    "factuality": 49.9,
    "hallucination": 63.6,
    "safety": 100,
    "reliability": 89.2,
    "drs": 58.1,
    "category": "proprietary"
  },
  {
    "id": "run-98-llama3-2",
    "runIndex": 98,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 96.7,
    "accuracyFormatted": "96.70%",
    "latencyMs": 1838.48,
    "latencyFormatted": "1.84 s",
    "semantic": 43.9,
    "factuality": 55.1,
    "hallucination": 61.5,
    "safety": 100,
    "reliability": 94.1,
    "drs": 61.8,
    "category": "proprietary"
  },
  {
    "id": "run-99-qwen2-5",
    "runIndex": 99,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 82.7,
    "accuracyFormatted": "82.70%",
    "latencyMs": 2000.8,
    "latencyFormatted": "2.00 s",
    "semantic": 36,
    "factuality": 46.8,
    "hallucination": 64.1,
    "safety": 100,
    "reliability": 86.3,
    "drs": 55.3,
    "category": "proprietary"
  },
  {
    "id": "run-100-lfm2-5-thinking",
    "runIndex": 100,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 100,
    "accuracyFormatted": "100.00%",
    "latencyMs": 5152.04,
    "latencyFormatted": "5.15 s",
    "semantic": 36,
    "factuality": 46.8,
    "hallucination": 63.4,
    "safety": 100,
    "reliability": 94.9,
    "drs": 60.2,
    "category": "partner"
  },
  {
    "id": "run-101-granite3-moe",
    "runIndex": 101,
    "name": "granite3-moe",
    "displayName": "granite3-moe (1.0b)",
    "params": "1.0b",
    "size": "821 MB",
    "lab": "IBM",
    "accuracy": 85,
    "accuracyFormatted": "85.00%",
    "latencyMs": 605.6,
    "latencyFormatted": "606 ms",
    "semantic": 43.1,
    "factuality": 50.5,
    "hallucination": 59.9,
    "safety": 100,
    "reliability": 92.9,
    "drs": 60,
    "category": "proprietary"
  },
  {
    "id": "run-102-granite4",
    "runIndex": 102,
    "name": "granite4",
    "displayName": "granite4 (0.35b)",
    "params": "0.35b",
    "size": "708 MB",
    "lab": "IBM",
    "accuracy": 89.3,
    "accuracyFormatted": "89.30%",
    "latencyMs": 4799.06,
    "latencyFormatted": "4.80 s",
    "semantic": 42,
    "factuality": 52.6,
    "hallucination": 62,
    "safety": 100,
    "reliability": 93.2,
    "drs": 59,
    "category": "proprietary"
  },
  {
    "id": "run-103-qwen3",
    "runIndex": 103,
    "name": "qwen3",
    "displayName": "qwen3 (0.6b)",
    "params": "0.6b",
    "size": "522 MB",
    "lab": "Alibaba",
    "accuracy": 91.7,
    "accuracyFormatted": "91.70%",
    "latencyMs": 8808.2,
    "latencyFormatted": "8.81 s",
    "semantic": 38.5,
    "factuality": 50.8,
    "hallucination": 63.2,
    "safety": 100,
    "reliability": 90,
    "drs": 58,
    "category": "proprietary"
  },
  {
    "id": "run-104-lfm2",
    "runIndex": 104,
    "name": "lfm2",
    "displayName": "lfm2 (0.35b)",
    "params": "0.35b",
    "size": "229 MB",
    "lab": "Liquid AI",
    "accuracy": 91.7,
    "accuracyFormatted": "91.70%",
    "latencyMs": 1043.71,
    "latencyFormatted": "1.04 s",
    "semantic": 44.8,
    "factuality": 55.8,
    "hallucination": 61.1,
    "safety": 100,
    "reliability": 89.5,
    "drs": 60.8,
    "category": "partner"
  },
  {
    "id": "run-105-gemma3",
    "runIndex": 105,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 68.2,
    "accuracyFormatted": "68.20%",
    "latencyMs": 8626.64,
    "latencyFormatted": "8.63 s",
    "semantic": 47.6,
    "factuality": 58.1,
    "hallucination": 60.4,
    "safety": 90.5,
    "reliability": 81.8,
    "drs": 53.2,
    "category": "proprietary"
  },
  {
    "id": "run-106-smollm2",
    "runIndex": 106,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 58.2,
    "accuracyFormatted": "58.20%",
    "latencyMs": 9809.92,
    "latencyFormatted": "9.81 s",
    "semantic": 42.5,
    "factuality": 54,
    "hallucination": 62.2,
    "safety": 100,
    "reliability": 67.6,
    "drs": 49,
    "category": "academic"
  },
  {
    "id": "run-107-qwen2",
    "runIndex": 107,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 52,
    "accuracyFormatted": "52.00%",
    "latencyMs": 6558.51,
    "latencyFormatted": "6.56 s",
    "semantic": 44.3,
    "factuality": 55.4,
    "hallucination": 61.2,
    "safety": 100,
    "reliability": 58.5,
    "drs": 47,
    "category": "proprietary"
  },
  {
    "id": "run-108-gemma3",
    "runIndex": 108,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 51.6,
    "accuracyFormatted": "51.60%",
    "latencyMs": 8225.74,
    "latencyFormatted": "8.23 s",
    "semantic": 45.1,
    "factuality": 56.1,
    "hallucination": 61.2,
    "safety": 100,
    "reliability": 86.2,
    "drs": 51.4,
    "category": "proprietary"
  },
  {
    "id": "run-109-smollm2",
    "runIndex": 109,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 36.9,
    "accuracyFormatted": "36.90%",
    "latencyMs": 9324.3,
    "latencyFormatted": "9.32 s",
    "semantic": 41.6,
    "factuality": 51.3,
    "hallucination": 63,
    "safety": 100,
    "reliability": 69,
    "drs": 44.4,
    "category": "academic"
  },
  {
    "id": "run-110-qwen2",
    "runIndex": 110,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 31.6,
    "accuracyFormatted": "31.60%",
    "latencyMs": 7809.44,
    "latencyFormatted": "7.81 s",
    "semantic": 43.4,
    "factuality": 52.7,
    "hallucination": 62.1,
    "safety": 100,
    "reliability": 69.9,
    "drs": 44,
    "category": "proprietary"
  },
  {
    "id": "run-111-gemma3",
    "runIndex": 111,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 75,
    "accuracyFormatted": "75.00%",
    "latencyMs": 5250.86,
    "latencyFormatted": "5.25 s",
    "semantic": 41.6,
    "factuality": 49.3,
    "hallucination": 61.3,
    "safety": 100,
    "reliability": 89.7,
    "drs": 55.4,
    "category": "proprietary"
  },
  {
    "id": "run-112-smollm2",
    "runIndex": 112,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 73.3,
    "accuracyFormatted": "73.30%",
    "latencyMs": 8804.55,
    "latencyFormatted": "8.80 s",
    "semantic": 38.5,
    "factuality": 44.8,
    "hallucination": 63.3,
    "safety": 100,
    "reliability": 75.8,
    "drs": 51.3,
    "category": "academic"
  },
  {
    "id": "run-113-qwen2",
    "runIndex": 113,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "325MB",
    "lab": "Alibaba",
    "accuracy": 90,
    "accuracyFormatted": "90.00%",
    "latencyMs": 7091.63,
    "latencyFormatted": "7.09 s",
    "semantic": 39.3,
    "factuality": 49.4,
    "hallucination": 62.9,
    "safety": 100,
    "reliability": 86.4,
    "drs": 57.1,
    "category": "proprietary"
  },
  {
    "id": "run-114-gemma3",
    "runIndex": 114,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 53.4,
    "accuracyFormatted": "53.40%",
    "latencyMs": 6071.43,
    "latencyFormatted": "6.07 s",
    "semantic": 66.5,
    "factuality": 73.2,
    "hallucination": 53.5,
    "safety": 100,
    "reliability": 85.5,
    "drs": 57.6,
    "category": "proprietary"
  },
  {
    "id": "run-115-smollm2",
    "runIndex": 115,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 69,
    "accuracyFormatted": "69.00%",
    "latencyMs": 7515.01,
    "latencyFormatted": "7.52 s",
    "semantic": 62.5,
    "factuality": 70,
    "hallucination": 55.4,
    "safety": 100,
    "reliability": 71.2,
    "drs": 57.4,
    "category": "academic"
  },
  {
    "id": "run-116-qwen2",
    "runIndex": 116,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "325MB",
    "lab": "Alibaba",
    "accuracy": 51.6,
    "accuracyFormatted": "51.60%",
    "latencyMs": 6806.77,
    "latencyFormatted": "6.81 s",
    "semantic": 57.5,
    "factuality": 66,
    "hallucination": 57.3,
    "safety": 96.2,
    "reliability": 75.2,
    "drs": 52.5,
    "category": "proprietary"
  },
  {
    "id": "run-117-gemma3",
    "runIndex": 117,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 61.1,
    "accuracyFormatted": "61.10%",
    "latencyMs": 7550.54,
    "latencyFormatted": "7.55 s",
    "semantic": 65,
    "factuality": 72,
    "hallucination": 53.1,
    "safety": 82,
    "reliability": 90.9,
    "drs": 57.2,
    "category": "proprietary"
  },
  {
    "id": "run-118-smollm2",
    "runIndex": 118,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 57.9,
    "accuracyFormatted": "57.90%",
    "latencyMs": 9177.5,
    "latencyFormatted": "9.18 s",
    "semantic": 64.3,
    "factuality": 71.4,
    "hallucination": 54.5,
    "safety": 78,
    "reliability": 80.7,
    "drs": 53.7,
    "category": "academic"
  },
  {
    "id": "run-119-qwen2",
    "runIndex": 119,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 62.6,
    "accuracyFormatted": "62.60%",
    "latencyMs": 6567.75,
    "latencyFormatted": "6.57 s",
    "semantic": 63.9,
    "factuality": 71.1,
    "hallucination": 54.4,
    "safety": 76,
    "reliability": 82.6,
    "drs": 54.7,
    "category": "proprietary"
  },
  {
    "id": "run-120-gemma3",
    "runIndex": 120,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 78.1,
    "accuracyFormatted": "78.10%",
    "latencyMs": 11655.83,
    "latencyFormatted": "11.7 s",
    "semantic": 64.8,
    "factuality": 71.8,
    "hallucination": 54,
    "safety": 96.3,
    "reliability": 88.6,
    "drs": 61.8,
    "category": "proprietary"
  },
  {
    "id": "run-121-smollm2",
    "runIndex": 121,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 78.4,
    "accuracyFormatted": "78.40%",
    "latencyMs": 10039.62,
    "latencyFormatted": "10.0 s",
    "semantic": 65.4,
    "factuality": 72.4,
    "hallucination": 54.1,
    "safety": 96.3,
    "reliability": 80.5,
    "drs": 60.9,
    "category": "academic"
  },
  {
    "id": "run-122-qwen2",
    "runIndex": 122,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 74.8,
    "accuracyFormatted": "74.80%",
    "latencyMs": 7746.03,
    "latencyFormatted": "7.75 s",
    "semantic": 64,
    "factuality": 71.2,
    "hallucination": 54.5,
    "safety": 96.3,
    "reliability": 81.8,
    "drs": 60,
    "category": "proprietary"
  },
  {
    "id": "run-123-gemma3",
    "runIndex": 123,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 71,
    "accuracyFormatted": "71.00%",
    "latencyMs": 12647.83,
    "latencyFormatted": "12.6 s",
    "semantic": 63.8,
    "factuality": 71.1,
    "hallucination": 54.3,
    "safety": 100,
    "reliability": 87.8,
    "drs": 60.5,
    "category": "proprietary"
  },
  {
    "id": "run-124-smollm2",
    "runIndex": 124,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 60.1,
    "accuracyFormatted": "60.10%",
    "latencyMs": 10435.33,
    "latencyFormatted": "10.4 s",
    "semantic": 64.7,
    "factuality": 71.7,
    "hallucination": 54.3,
    "safety": 100,
    "reliability": 77.2,
    "drs": 57,
    "category": "academic"
  },
  {
    "id": "run-125-qwen2",
    "runIndex": 125,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "325MB",
    "lab": "Alibaba",
    "accuracy": 56.8,
    "accuracyFormatted": "56.80%",
    "latencyMs": 10511.74,
    "latencyFormatted": "10.5 s",
    "semantic": 55.1,
    "factuality": 64.1,
    "hallucination": 57.4,
    "safety": 95,
    "reliability": 82.1,
    "drs": 53.7,
    "category": "proprietary"
  },
  {
    "id": "run-126-gemma3",
    "runIndex": 126,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 51.9,
    "accuracyFormatted": "51.90%",
    "latencyMs": 5712.99,
    "latencyFormatted": "5.71 s",
    "semantic": 64.6,
    "factuality": 71.7,
    "hallucination": 52.1,
    "safety": 91,
    "reliability": 92.6,
    "drs": 57.4,
    "category": "proprietary"
  },
  {
    "id": "run-127-smollm2",
    "runIndex": 127,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "725MB",
    "lab": "Hugging Face",
    "accuracy": 59.2,
    "accuracyFormatted": "59.20%",
    "latencyMs": 8453.57,
    "latencyFormatted": "8.45 s",
    "semantic": 50.8,
    "factuality": 60.6,
    "hallucination": 59.1,
    "safety": 94,
    "reliability": 75.5,
    "drs": 51.9,
    "category": "academic"
  },
  {
    "id": "run-128-qwen2",
    "runIndex": 128,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "325MB",
    "lab": "Alibaba",
    "accuracy": 48.1,
    "accuracyFormatted": "48.10%",
    "latencyMs": 4986.81,
    "latencyFormatted": "4.99 s",
    "semantic": 56,
    "factuality": 64.8,
    "hallucination": 57.4,
    "safety": 91,
    "reliability": 71.5,
    "drs": 50.2,
    "category": "proprietary"
  },
  {
    "id": "run-129-qwen2-5-coder",
    "runIndex": 129,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 43.3,
    "accuracyFormatted": "43.30%",
    "latencyMs": 8108,
    "latencyFormatted": "8.11 s",
    "semantic": 44.5,
    "factuality": 55.6,
    "hallucination": 61.4,
    "safety": 100,
    "reliability": 75.1,
    "drs": 47.8,
    "category": "proprietary"
  },
  {
    "id": "run-130-smollm2",
    "runIndex": 130,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 39.8,
    "accuracyFormatted": "39.80%",
    "latencyMs": 5456.42,
    "latencyFormatted": "5.46 s",
    "semantic": 43.2,
    "factuality": 52.7,
    "hallucination": 61.9,
    "safety": 92.4,
    "reliability": 65.3,
    "drs": 43.9,
    "category": "academic"
  },
  {
    "id": "run-131-bloom",
    "runIndex": 131,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 26.6,
    "accuracyFormatted": "26.60%",
    "latencyMs": 18419.3,
    "latencyFormatted": "18.4 s",
    "semantic": 27.2,
    "factuality": 39.7,
    "hallucination": 68.4,
    "safety": 96.2,
    "reliability": 25.2,
    "drs": 31,
    "category": "academic"
  },
  {
    "id": "run-132-qwen2-5-coder",
    "runIndex": 132,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 52.7,
    "accuracyFormatted": "52.70%",
    "latencyMs": 8409.09,
    "latencyFormatted": "8.41 s",
    "semantic": 63.6,
    "factuality": 70.9,
    "hallucination": 54.5,
    "safety": 80,
    "reliability": 73.4,
    "drs": 51.7,
    "category": "proprietary"
  },
  {
    "id": "run-133-smollm2",
    "runIndex": 133,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 57.5,
    "accuracyFormatted": "57.50%",
    "latencyMs": 5687.6,
    "latencyFormatted": "5.69 s",
    "semantic": 61.3,
    "factuality": 69,
    "hallucination": 55.4,
    "safety": 82,
    "reliability": 78.9,
    "drs": 53.3,
    "category": "academic"
  },
  {
    "id": "run-134-bloom",
    "runIndex": 134,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 29.5,
    "accuracyFormatted": "29.50%",
    "latencyMs": 20474.48,
    "latencyFormatted": "20.5 s",
    "semantic": 25.2,
    "factuality": 40.2,
    "hallucination": 69.4,
    "safety": 92.4,
    "reliability": 22.6,
    "drs": 30.3,
    "category": "academic"
  },
  {
    "id": "run-135-qwen2-5-coder",
    "runIndex": 135,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 36,
    "accuracyFormatted": "36.00%",
    "latencyMs": 5690.57,
    "latencyFormatted": "5.69 s",
    "semantic": 54.4,
    "factuality": 63.5,
    "hallucination": 57.6,
    "safety": 95.3,
    "reliability": 80.7,
    "drs": 49.3,
    "category": "proprietary"
  },
  {
    "id": "run-136-smollm2",
    "runIndex": 136,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 78.6,
    "accuracyFormatted": "78.60%",
    "latencyMs": 905308,
    "latencyFormatted": "15 min 5 s",
    "semantic": 60.2,
    "factuality": 68.1,
    "hallucination": 55.6,
    "safety": 96.3,
    "reliability": 80.9,
    "drs": 59.5,
    "category": "academic"
  },
  {
    "id": "run-137-bloom",
    "runIndex": 137,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 26.9,
    "accuracyFormatted": "26.90%",
    "latencyMs": 40648.77,
    "latencyFormatted": "40.6 s",
    "semantic": 31.8,
    "factuality": 45.4,
    "hallucination": 65.9,
    "safety": 100,
    "reliability": 20.1,
    "drs": 32.4,
    "category": "academic"
  },
  {
    "id": "run-138-qwen2-5-coder",
    "runIndex": 138,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 68.8,
    "accuracyFormatted": "68.80%",
    "latencyMs": 6618.07,
    "latencyFormatted": "6.62 s",
    "semantic": 27.7,
    "factuality": 42.3,
    "hallucination": 67.3,
    "safety": 100,
    "reliability": 73.6,
    "drs": 48,
    "category": "proprietary"
  },
  {
    "id": "run-139-smollm2",
    "runIndex": 139,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 76.8,
    "accuracyFormatted": "76.80%",
    "latencyMs": 5672.56,
    "latencyFormatted": "5.67 s",
    "semantic": 52.3,
    "factuality": 61.9,
    "hallucination": 58.4,
    "safety": 100,
    "reliability": 72.2,
    "drs": 56.4,
    "category": "academic"
  },
  {
    "id": "run-140-bloom",
    "runIndex": 140,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 44.8,
    "accuracyFormatted": "44.80%",
    "latencyMs": 7350.77,
    "latencyFormatted": "7.35 s",
    "semantic": 38.2,
    "factuality": 50.6,
    "hallucination": 63.7,
    "safety": 100,
    "reliability": 23.7,
    "drs": 38.6,
    "category": "academic"
  },
  {
    "id": "run-141-qwen2-5-coder",
    "runIndex": 141,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 49.1,
    "accuracyFormatted": "49.10%",
    "latencyMs": 7744.31,
    "latencyFormatted": "7.74 s",
    "semantic": 53.4,
    "factuality": 62.7,
    "hallucination": 58,
    "safety": 87.2,
    "reliability": 72.1,
    "drs": 49,
    "category": "proprietary"
  },
  {
    "id": "run-142-smollm2",
    "runIndex": 142,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 63.7,
    "accuracyFormatted": "63.70%",
    "latencyMs": 6319.3,
    "latencyFormatted": "6.32 s",
    "semantic": 55.4,
    "factuality": 64.3,
    "hallucination": 57.4,
    "safety": 93.2,
    "reliability": 64.9,
    "drs": 52.4,
    "category": "academic"
  },
  {
    "id": "run-143-bloom",
    "runIndex": 143,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 18.5,
    "accuracyFormatted": "18.50%",
    "latencyMs": 11705.28,
    "latencyFormatted": "11.7 s",
    "semantic": 12.1,
    "factuality": 27.7,
    "hallucination": 73.2,
    "safety": 90.2,
    "reliability": 19.8,
    "drs": 23.5,
    "category": "academic"
  },
  {
    "id": "run-144-stablelm-zephyr",
    "runIndex": 144,
    "name": "stablelm-zephyr",
    "displayName": "stablelm-zephyr (3.0b)",
    "params": "3.0b",
    "size": "1.6 GB",
    "lab": "Stability AI",
    "accuracy": 60.7,
    "accuracyFormatted": "60.70%",
    "latencyMs": 2367.55,
    "latencyFormatted": "2.37 s",
    "semantic": 61.4,
    "factuality": 69.1,
    "hallucination": 55.3,
    "safety": 96.2,
    "reliability": 79,
    "drs": 56.6,
    "category": "proprietary"
  },
  {
    "id": "run-145-minicpm5",
    "runIndex": 145,
    "name": "minicpm5",
    "displayName": "minicpm5 (1.0b)",
    "params": "1.0b",
    "size": "688 MB",
    "lab": "Open BMB",
    "accuracy": 0,
    "accuracyFormatted": "0.00%",
    "latencyMs": 484.1,
    "latencyFormatted": "484 ms",
    "semantic": -0.3,
    "factuality": 15.8,
    "hallucination": 72.2,
    "safety": 100,
    "reliability": 49.7,
    "drs": 25.8,
    "category": "academic"
  },
  {
    "id": "run-146-llama3-2",
    "runIndex": 146,
    "name": "llama3.2",
    "displayName": "llama3.2 (1.0b)",
    "params": "1.0b",
    "size": "1.3 GB",
    "lab": "Meta",
    "accuracy": 67.1,
    "accuracyFormatted": "67.10%",
    "latencyMs": 2985.29,
    "latencyFormatted": "2.99 s",
    "semantic": 60.7,
    "factuality": 68.6,
    "hallucination": 55.7,
    "safety": 97,
    "reliability": 80.3,
    "drs": 57.8,
    "category": "proprietary"
  },
  {
    "id": "run-147-phi3-latest",
    "runIndex": 147,
    "name": "phi3:latest",
    "displayName": "phi3:latest (3.8b)",
    "params": "3.8b",
    "size": "2.2GB",
    "lab": "Microsoft",
    "accuracy": 73.9,
    "accuracyFormatted": "73.90%",
    "latencyMs": 3118.38,
    "latencyFormatted": "3.12 s",
    "semantic": 64.5,
    "factuality": 71.6,
    "hallucination": 54.4,
    "safety": 92.4,
    "reliability": 80.6,
    "drs": 59.6,
    "category": "proprietary"
  },
  {
    "id": "run-148-falcon3",
    "runIndex": 148,
    "name": "falcon3",
    "displayName": "falcon3 (1.0b)",
    "params": "1.0b",
    "size": "1.8 GB",
    "lab": "TII",
    "accuracy": 73.1,
    "accuracyFormatted": "73.10%",
    "latencyMs": 3965.45,
    "latencyFormatted": "3.97 s",
    "semantic": 59.3,
    "factuality": 67.4,
    "hallucination": 56.4,
    "safety": 100,
    "reliability": 79,
    "drs": 58.7,
    "category": "proprietary"
  },
  {
    "id": "run-149-lfm2-5-thinking",
    "runIndex": 149,
    "name": "lfm2.5-thinking",
    "displayName": "lfm2.5-thinking (1.2b)",
    "params": "1.2b",
    "size": "731 MB",
    "lab": "Liquid AI",
    "accuracy": 89.8,
    "accuracyFormatted": "89.80%",
    "latencyMs": 16049.39,
    "latencyFormatted": "16.0 s",
    "semantic": 59.1,
    "factuality": 67.2,
    "hallucination": 57.8,
    "safety": 100,
    "reliability": 92.6,
    "drs": 63.6,
    "category": "partner"
  },
  {
    "id": "run-150-qwen2-5",
    "runIndex": 150,
    "name": "qwen2.5",
    "displayName": "qwen2.5 (0.5b)",
    "params": "0.5b",
    "size": "397 MB",
    "lab": "Alibaba",
    "accuracy": 70.4,
    "accuracyFormatted": "70.40%",
    "latencyMs": 2303.93,
    "latencyFormatted": "2.30 s",
    "semantic": 57.3,
    "factuality": 65.8,
    "hallucination": 57.2,
    "safety": 96.2,
    "reliability": 79.2,
    "drs": 57.4,
    "category": "proprietary"
  },
  {
    "id": "run-151-smollm2",
    "runIndex": 151,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "726MB",
    "lab": "Hugging Face",
    "accuracy": 68.1,
    "accuracyFormatted": "68.10%",
    "latencyMs": 1172.74,
    "latencyFormatted": "1.17 s",
    "semantic": 64,
    "factuality": 71.2,
    "hallucination": 54.6,
    "safety": 100,
    "reliability": 65.2,
    "drs": 57.8,
    "category": "academic"
  },
  {
    "id": "run-152-bloom",
    "runIndex": 152,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 36.2,
    "accuracyFormatted": "36.20%",
    "latencyMs": 5448.23,
    "latencyFormatted": "5.45 s",
    "semantic": 12.7,
    "factuality": 30.2,
    "hallucination": 73,
    "safety": 100,
    "reliability": 25.8,
    "drs": 30.1,
    "category": "academic"
  },
  {
    "id": "run-153-gemma3",
    "runIndex": 153,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 54.2,
    "accuracyFormatted": "54.20%",
    "latencyMs": 1364.59,
    "latencyFormatted": "1.36 s",
    "semantic": 64.5,
    "factuality": 71.6,
    "hallucination": 52.6,
    "safety": 100,
    "reliability": 87.5,
    "drs": 59.1,
    "category": "proprietary"
  },
  {
    "id": "run-154-smollm",
    "runIndex": 154,
    "name": "smollm",
    "displayName": "smollm (135m)",
    "params": "135m",
    "size": "91MB",
    "lab": "Hugging Face",
    "accuracy": 70.5,
    "accuracyFormatted": "70.50%",
    "latencyMs": 9621.05,
    "latencyFormatted": "9.62 s",
    "semantic": 42.3,
    "factuality": 53.8,
    "hallucination": 61.9,
    "safety": 100,
    "reliability": 78.3,
    "drs": 53,
    "category": "academic"
  },
  {
    "id": "run-155-smollm",
    "runIndex": 155,
    "name": "smollm",
    "displayName": "smollm (360m)",
    "params": "360m",
    "size": "229MB",
    "lab": "Hugging Face",
    "accuracy": 81.6,
    "accuracyFormatted": "81.60%",
    "latencyMs": 10452.41,
    "latencyFormatted": "10.5 s",
    "semantic": 40.9,
    "factuality": 52.7,
    "hallucination": 62.4,
    "safety": 100,
    "reliability": 86.5,
    "drs": 56.1,
    "category": "academic"
  },
  {
    "id": "run-156-smollm2",
    "runIndex": 156,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 72.7,
    "accuracyFormatted": "72.70%",
    "latencyMs": 4484.41,
    "latencyFormatted": "4.48 s",
    "semantic": 47.9,
    "factuality": 58.3,
    "hallucination": 60.3,
    "safety": 90.5,
    "reliability": 72.9,
    "drs": 53,
    "category": "academic"
  },
  {
    "id": "run-157-gemma3",
    "runIndex": 157,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 63.2,
    "accuracyFormatted": "63.20%",
    "latencyMs": 6675.74,
    "latencyFormatted": "6.68 s",
    "semantic": 46.3,
    "factuality": 57,
    "hallucination": 60.5,
    "safety": 100,
    "reliability": 88.9,
    "drs": 54.4,
    "category": "proprietary"
  },
  {
    "id": "run-158-qwen2",
    "runIndex": 158,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 60.5,
    "accuracyFormatted": "60.50%",
    "latencyMs": 5868.24,
    "latencyFormatted": "5.87 s",
    "semantic": 46.3,
    "factuality": 57,
    "hallucination": 60.8,
    "safety": 90.5,
    "reliability": 70.1,
    "drs": 49.6,
    "category": "proprietary"
  },
  {
    "id": "run-159-qwen2-5-coder",
    "runIndex": 159,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 57,
    "accuracyFormatted": "57.00%",
    "latencyMs": 7059.88,
    "latencyFormatted": "7.06 s",
    "semantic": 43.1,
    "factuality": 54.5,
    "hallucination": 61.6,
    "safety": 100,
    "reliability": 60.4,
    "drs": 47.9,
    "category": "proprietary"
  },
  {
    "id": "run-160-bloom",
    "runIndex": 160,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 73.9,
    "accuracyFormatted": "73.90%",
    "latencyMs": 26652.83,
    "latencyFormatted": "26.7 s",
    "semantic": 33,
    "factuality": 46.4,
    "hallucination": 66.2,
    "safety": 100,
    "reliability": 32.8,
    "drs": 44.1,
    "category": "academic"
  },
  {
    "id": "run-161-TinyDolphin",
    "runIndex": 161,
    "name": "TinyDolphin",
    "displayName": "TinyDolphin (1.1b)",
    "params": "1.1b",
    "size": "636MB",
    "lab": "Open Source",
    "accuracy": 71.8,
    "accuracyFormatted": "71.80%",
    "latencyMs": 8454.34,
    "latencyFormatted": "8.45 s",
    "semantic": 47.5,
    "factuality": 58,
    "hallucination": 60.4,
    "safety": 100,
    "reliability": 70.7,
    "drs": 53.6,
    "category": "academic"
  },
  {
    "id": "run-162-tinyllama-latest",
    "runIndex": 162,
    "name": "tinyllama:latest",
    "displayName": "tinyllama:latest (1.1b)",
    "params": "1.1b",
    "size": "637MB",
    "lab": "Open Source",
    "accuracy": 59.6,
    "accuracyFormatted": "59.60%",
    "latencyMs": 8400.09,
    "latencyFormatted": "8.40 s",
    "semantic": 49.2,
    "factuality": 59.4,
    "hallucination": 59.8,
    "safety": 100,
    "reliability": 73.2,
    "drs": 52,
    "category": "academic"
  },
  {
    "id": "run-163-smollm2",
    "runIndex": 163,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "726MB",
    "lab": "Hugging Face",
    "accuracy": 56.8,
    "accuracyFormatted": "56.80%",
    "latencyMs": 6345.59,
    "latencyFormatted": "6.35 s",
    "semantic": 46.3,
    "factuality": 57.1,
    "hallucination": 60.8,
    "safety": 100,
    "reliability": 64.2,
    "drs": 49.4,
    "category": "academic"
  },
  {
    "id": "run-164-smollm",
    "runIndex": 164,
    "name": "smollm",
    "displayName": "smollm (135m)",
    "params": "135m",
    "size": "91MB",
    "lab": "Hugging Face",
    "accuracy": 43,
    "accuracyFormatted": "43.00%",
    "latencyMs": 15875.32,
    "latencyFormatted": "15.9 s",
    "semantic": 35,
    "factuality": 46,
    "hallucination": 65.2,
    "safety": 100,
    "reliability": 78.2,
    "drs": 45.1,
    "category": "academic"
  },
  {
    "id": "run-165-smollm",
    "runIndex": 165,
    "name": "smollm",
    "displayName": "smollm (360m)",
    "params": "360m",
    "size": "229MB",
    "lab": "Hugging Face",
    "accuracy": 46.4,
    "accuracyFormatted": "46.40%",
    "latencyMs": 69788.21,
    "latencyFormatted": "1 min 10 s",
    "semantic": 41.1,
    "factuality": 50.9,
    "hallucination": 62.7,
    "safety": 91,
    "reliability": 84.3,
    "drs": 46.9,
    "category": "academic"
  },
  {
    "id": "run-166-smollm2",
    "runIndex": 166,
    "name": "smollm2",
    "displayName": "smollm2 (135m)",
    "params": "135m",
    "size": "270MB",
    "lab": "Hugging Face",
    "accuracy": 42.1,
    "accuracyFormatted": "42.10%",
    "latencyMs": 5974.27,
    "latencyFormatted": "5.97 s",
    "semantic": 45.6,
    "factuality": 54.5,
    "hallucination": 61.1,
    "safety": 100,
    "reliability": 69.3,
    "drs": 46.8,
    "category": "academic"
  },
  {
    "id": "run-167-gemma3",
    "runIndex": 167,
    "name": "gemma3",
    "displayName": "gemma3 (270m)",
    "params": "270m",
    "size": "291MB",
    "lab": "Google",
    "accuracy": 42.8,
    "accuracyFormatted": "42.80%",
    "latencyMs": 6102.84,
    "latencyFormatted": "6.10 s",
    "semantic": 47.8,
    "factuality": 58.3,
    "hallucination": 59.8,
    "safety": 100,
    "reliability": 83,
    "drs": 50,
    "category": "proprietary"
  },
  {
    "id": "run-168-qwen2",
    "runIndex": 168,
    "name": "qwen2",
    "displayName": "qwen2 (0.5b)",
    "params": "0.5b",
    "size": "352MB",
    "lab": "Alibaba",
    "accuracy": 34.3,
    "accuracyFormatted": "34.30%",
    "latencyMs": 9009.1,
    "latencyFormatted": "9.01 s",
    "semantic": 43.3,
    "factuality": 52.6,
    "hallucination": 62.6,
    "safety": 100,
    "reliability": 67.5,
    "drs": 44.1,
    "category": "proprietary"
  },
  {
    "id": "run-169-qwen2-5-coder",
    "runIndex": 169,
    "name": "qwen2.5-coder",
    "displayName": "qwen2.5-coder (0.5b)",
    "params": "0.5b",
    "size": "397MB",
    "lab": "Alibaba",
    "accuracy": 36.4,
    "accuracyFormatted": "36.40%",
    "latencyMs": 6820.23,
    "latencyFormatted": "6.82 s",
    "semantic": 41.3,
    "factuality": 51.1,
    "hallucination": 62.5,
    "safety": 100,
    "reliability": 74.5,
    "drs": 45.2,
    "category": "proprietary"
  },
  {
    "id": "run-170-bloom",
    "runIndex": 170,
    "name": "bloom",
    "displayName": "bloom (560m)",
    "params": "560m",
    "size": "539MB",
    "lab": "BigScience",
    "accuracy": 30.3,
    "accuracyFormatted": "30.30%",
    "latencyMs": 31520.02,
    "latencyFormatted": "31.5 s",
    "semantic": 16.1,
    "factuality": 30.9,
    "hallucination": 70.9,
    "safety": 97,
    "reliability": 28.6,
    "drs": 29.2,
    "category": "academic"
  },
  {
    "id": "run-171-TinyDolphin",
    "runIndex": 171,
    "name": "TinyDolphin",
    "displayName": "TinyDolphin (1.1b)",
    "params": "1.1b",
    "size": "636MB",
    "lab": "Open Source",
    "accuracy": 36.3,
    "accuracyFormatted": "36.30%",
    "latencyMs": 10002.72,
    "latencyFormatted": "10.0 s",
    "semantic": 45.6,
    "factuality": 54.5,
    "hallucination": 61.3,
    "safety": 100,
    "reliability": 70.7,
    "drs": 45.6,
    "category": "academic"
  },
  {
    "id": "run-172-tinyllama-latest",
    "runIndex": 172,
    "name": "tinyllama:latest",
    "displayName": "tinyllama:latest (1.1b)",
    "params": "1.1b",
    "size": "637MB",
    "lab": "Open Source",
    "accuracy": 43.7,
    "accuracyFormatted": "43.70%",
    "latencyMs": 8743.59,
    "latencyFormatted": "8.74 s",
    "semantic": 48.4,
    "factuality": 56.8,
    "hallucination": 60.3,
    "safety": 100,
    "reliability": 78,
    "drs": 49.1,
    "category": "academic"
  },
  {
    "id": "run-173-smollm2",
    "runIndex": 173,
    "name": "smollm2",
    "displayName": "smollm2 (360m)",
    "params": "360m",
    "size": "726MB",
    "lab": "Hugging Face",
    "accuracy": 38.1,
    "accuracyFormatted": "38.10%",
    "latencyMs": 7019.16,
    "latencyFormatted": "7.02 s",
    "semantic": 44,
    "factuality": 53.2,
    "hallucination": 62,
    "safety": 100,
    "reliability": 65,
    "drs": 44.8,
    "category": "academic"
  }
];

export const METHODOLOGY_MODELS: ModelMethodologyDetail[] = [
  {
    "id": "deepscaler-1-5b",
    "name": "DEEPSCALER 1.5B",
    "developer": "Agentica",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "AGENTICA",
    "weights": "OPEN",
    "contextWindow": "64K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.08 / $0.24",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 100,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.2,
    "latencyFormatted": "19 s 449 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 46.4,
        "stdDev": 2.14,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 99,
        "stdDev": 1.42,
        "rank": 1,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 1,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 65.1,
        "stdDev": 1.88,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 57.7,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71.5,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 1,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 85,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 62.3,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 1,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 46.4,
        "stdDev": 1.65,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 57.8,
        "stdDev": 1.75,
        "rank": 2,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11.7,
        "stdDev": 0.85,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 49.8,
        "stdDev": 4.5,
        "rank": 1,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 5.6,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 52.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "DEEPSCALER 1.5B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 100.0% on Vals Index (#1 of 23) at $0.20 per execution.",
        "Demonstrates 100.0% on Finance Agent and 46.4% on Code Migration benchmarks.",
        "Recorded average execution latency of 19449 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "hunyuan-instruct-1-8b",
    "name": "HUNYUAN 1.8B",
    "developer": "Tencent",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "TENCENT",
    "weights": "HYBRID",
    "contextWindow": "256K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 98.3,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.25,
    "latencyFormatted": "15 s 320 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 98.3,
        "stdDev": 0.85,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 46.7,
        "stdDev": 2.14,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 97.4,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 65.3,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 56.6,
        "stdDev": 1.55,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 70.3,
        "stdDev": 1.25,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 83.7,
        "stdDev": 2.15,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 62.5,
        "stdDev": 1.1,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 2,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 46.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 56.8,
        "stdDev": 1.75,
        "rank": 3,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11.8,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 50,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 5.6,
        "stdDev": 0.65,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 53,
        "stdDev": 3.8,
        "rank": 3,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "HUNYUAN 1.8B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 98.3% on Vals Index (#2 of 23) at $0.25 per execution.",
        "Demonstrates 100.0% on Finance Agent and 46.7% on Code Migration benchmarks.",
        "Recorded average execution latency of 15320 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "granite3-3-2-0b",
    "name": "GRANITE 3.3 2.0B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.12 / $0.36",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 96.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.3,
    "latencyFormatted": "2 s 428 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 96.7,
        "stdDev": 0.85,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 55.4,
        "stdDev": 2.14,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 95.9,
        "stdDev": 1.42,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 61.2,
        "stdDev": 1.88,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 61.4,
        "stdDev": 1.55,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 75.5,
        "stdDev": 1.25,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 82.5,
        "stdDev": 2.15,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.9,
        "stdDev": 1.1,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 55.4,
        "stdDev": 1.65,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 61.3,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11,
        "stdDev": 0.85,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 57.9,
        "stdDev": 4.5,
        "rank": 3,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 6.6,
        "stdDev": 0.65,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 61,
        "stdDev": 3.8,
        "rank": 4,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "GRANITE 3.3 2.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 96.7% on Vals Index (#3 of 23) at $0.30 per execution.",
        "Demonstrates 100.0% on Finance Agent and 55.4% on Code Migration benchmarks.",
        "Recorded average execution latency of 2428 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "ternary-bonsai-1-7b",
    "name": "TERNARY BONSAI 1.7B",
    "developer": "Prism ML",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "PRISM ML",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.09 / $0.26",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 91.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.22,
    "latencyFormatted": "13 s 473 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 91.4,
        "stdDev": 0.85,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 62.9,
        "stdDev": 2.14,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 90.8,
        "stdDev": 1.42,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 81,
        "stdDev": 0.65,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 58.3,
        "stdDev": 1.88,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58.7,
        "stdDev": 1.55,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 72.6,
        "stdDev": 1.25,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 79.5,
        "stdDev": 2.3,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 78.6,
        "stdDev": 2.15,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 56.3,
        "stdDev": 1.1,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81,
        "stdDev": 1.95,
        "rank": 4,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 62.9,
        "stdDev": 1.65,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 58.8,
        "stdDev": 1.75,
        "rank": 5,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.5,
        "stdDev": 0.85,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 64.6,
        "stdDev": 4.5,
        "rank": 4,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.5,
        "stdDev": 0.65,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 67.9,
        "stdDev": 3.8,
        "rank": 5,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "TERNARY BONSAI 1.7B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 91.4% on Vals Index (#4 of 23) at $0.22 per execution.",
        "Demonstrates 81.0% on Finance Agent and 62.9% on Code Migration benchmarks.",
        "Recorded average execution latency of 13473 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "lfm2-5-thinking-1-2b",
    "name": "LFM 2.5 THINKING",
    "developer": "Liquid AI",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "LIQUID AI",
    "weights": "HYBRID",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.07 / $0.22",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 90.79,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.18,
    "latencyFormatted": "9 s 364 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 90.79,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 61.8,
        "stdDev": 2.14,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 90.3,
        "stdDev": 1.42,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 94.8,
        "stdDev": 0.65,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 59,
        "stdDev": 1.88,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 61.6,
        "stdDev": 1.55,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 75.8,
        "stdDev": 1.25,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 92.2,
        "stdDev": 2.3,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 78.1,
        "stdDev": 2.15,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 56.9,
        "stdDev": 1.1,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 94.8,
        "stdDev": 1.95,
        "rank": 5,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 61.8,
        "stdDev": 1.65,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 61.5,
        "stdDev": 1.75,
        "rank": 6,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.6,
        "stdDev": 0.85,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 63.6,
        "stdDev": 4.5,
        "rank": 5,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.4,
        "stdDev": 0.65,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 66.9,
        "stdDev": 3.8,
        "rank": 6,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "LFM 2.5 THINKING evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 90.8% on Vals Index (#5 of 23) at $0.18 per execution.",
        "Demonstrates 94.8% on Finance Agent and 61.8% on Code Migration benchmarks.",
        "Recorded average execution latency of 9364 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "medpsy-1-7b",
    "name": "MEDPSY 1.7B",
    "developer": "QVAC",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "QVAC",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.09 / $0.26",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 90.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.22,
    "latencyFormatted": "28 s 452 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 90.2,
        "stdDev": 0.85,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 59.4,
        "stdDev": 2.14,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 89.7,
        "stdDev": 1.42,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 81,
        "stdDev": 0.65,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 60.9,
        "stdDev": 1.88,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58,
        "stdDev": 1.55,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71.8,
        "stdDev": 1.25,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 79.5,
        "stdDev": 2.3,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 77.7,
        "stdDev": 2.15,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.6,
        "stdDev": 1.1,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81,
        "stdDev": 1.95,
        "rank": 6,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 59.4,
        "stdDev": 1.65,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 58.1,
        "stdDev": 1.75,
        "rank": 7,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11,
        "stdDev": 0.85,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 61.5,
        "stdDev": 4.5,
        "rank": 6,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.1,
        "stdDev": 0.65,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 64.6,
        "stdDev": 3.8,
        "rank": 7,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "MEDPSY 1.7B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 90.2% on Vals Index (#6 of 23) at $0.22 per execution.",
        "Demonstrates 81.0% on Finance Agent and 59.4% on Code Migration benchmarks.",
        "Recorded average execution latency of 28452 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "smollm-1-7b",
    "name": "SMOLLM 1.7B",
    "developer": "Hugging Face",
    "country": "EU",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "HUGGING FACE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.08 / $0.24",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 83.9,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.2,
    "latencyFormatted": "4 s 644 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 83.9,
        "stdDev": 0.85,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 55.8,
        "stdDev": 2.14,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 83.7,
        "stdDev": 1.42,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 61.4,
        "stdDev": 1.88,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58.5,
        "stdDev": 1.55,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 72.4,
        "stdDev": 1.25,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 72.9,
        "stdDev": 2.15,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 59,
        "stdDev": 1.1,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 7,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 55.8,
        "stdDev": 1.65,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 58.6,
        "stdDev": 1.75,
        "rank": 8,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11.1,
        "stdDev": 0.85,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 58.2,
        "stdDev": 4.5,
        "rank": 7,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 6.7,
        "stdDev": 0.65,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 61.3,
        "stdDev": 3.8,
        "rank": 8,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "SMOLLM 1.7B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 83.9% on Vals Index (#7 of 23) at $0.20 per execution.",
        "Demonstrates 100.0% on Finance Agent and 55.8% on Code Migration benchmarks.",
        "Recorded average execution latency of 4644 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "gemma3n-e2b",
    "name": "GEMMA 3N E2B",
    "developer": "Google",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "GOOGLE",
    "weights": "OPEN",
    "contextWindow": "256K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.11 / $0.34",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 82.5,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.28,
    "latencyFormatted": "21 s 745 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 82.5,
        "stdDev": 0.85,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 70.9,
        "stdDev": 2.14,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 82.4,
        "stdDev": 1.42,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 82.3,
        "stdDev": 0.65,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 54.7,
        "stdDev": 1.88,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 60.3,
        "stdDev": 1.55,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 74.3,
        "stdDev": 1.25,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 80.7,
        "stdDev": 2.3,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 71.9,
        "stdDev": 2.15,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 53.1,
        "stdDev": 1.1,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 82.3,
        "stdDev": 1.95,
        "rank": 8,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 70.9,
        "stdDev": 1.65,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 60.3,
        "stdDev": 1.75,
        "rank": 9,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 9.8,
        "stdDev": 0.85,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 71.8,
        "stdDev": 4.5,
        "rank": 8,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.5,
        "stdDev": 0.65,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 75.2,
        "stdDev": 3.8,
        "rank": 9,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "GEMMA 3N E2B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 82.5% on Vals Index (#8 of 23) at $0.28 per execution.",
        "Demonstrates 82.3% on Finance Agent and 70.9% on Code Migration benchmarks.",
        "Recorded average execution latency of 21745 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "llama2-0-1-0b",
    "name": "LLAMA 2.0 1.0B",
    "developer": "Meta",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "META",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.06 / $0.18",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 80.5,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "17 s 867 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 80.5,
        "stdDev": 0.85,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 72.3,
        "stdDev": 2.14,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 80.5,
        "stdDev": 1.42,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 74,
        "stdDev": 0.65,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 54.1,
        "stdDev": 1.88,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 59.4,
        "stdDev": 1.55,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 73.3,
        "stdDev": 1.25,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 73.1,
        "stdDev": 2.3,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 70.4,
        "stdDev": 2.15,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 52.6,
        "stdDev": 1.1,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 74,
        "stdDev": 1.95,
        "rank": 9,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 72.3,
        "stdDev": 1.65,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 59.4,
        "stdDev": 1.75,
        "rank": 10,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 9.7,
        "stdDev": 0.85,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 73.1,
        "stdDev": 4.5,
        "rank": 9,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.7,
        "stdDev": 0.65,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 76.5,
        "stdDev": 3.8,
        "rank": 10,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "LLAMA 2.0 1.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 80.5% on Vals Index (#9 of 23) at $0.15 per execution.",
        "Demonstrates 74.0% on Finance Agent and 72.3% on Code Migration benchmarks.",
        "Recorded average execution latency of 17867 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "phi3-latest-3-8b",
    "name": "PHI-3 3.8B",
    "developer": "Microsoft",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "MICROSOFT",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.18 / $0.54",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 78.87,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.45,
    "latencyFormatted": "44 s 801 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 78.87,
        "stdDev": 0.85,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 64.8,
        "stdDev": 2.14,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 78.9,
        "stdDev": 1.42,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 97.5,
        "stdDev": 0.65,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 57.3,
        "stdDev": 1.88,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58.7,
        "stdDev": 1.55,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 72.6,
        "stdDev": 1.25,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 94.7,
        "stdDev": 2.3,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 69.2,
        "stdDev": 2.15,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 55.4,
        "stdDev": 1.1,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 97.5,
        "stdDev": 1.95,
        "rank": 10,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 64.8,
        "stdDev": 1.65,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 58.8,
        "stdDev": 1.75,
        "rank": 11,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.3,
        "stdDev": 0.85,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 66.3,
        "stdDev": 4.5,
        "rank": 10,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.8,
        "stdDev": 0.65,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 69.6,
        "stdDev": 3.8,
        "rank": 11,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "PHI-3 3.8B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 78.9% on Vals Index (#10 of 23) at $0.45 per execution.",
        "Demonstrates 97.5% on Finance Agent and 64.8% on Code Migration benchmarks.",
        "Recorded average execution latency of 44801 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "openchat-latest-7b",
    "name": "OPENCHAT 7B",
    "developer": "Open Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.28 / $0.84",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 76.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.7,
    "latencyFormatted": "43 s 21 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 76.2,
        "stdDev": 0.85,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 73.8,
        "stdDev": 2.14,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 76.4,
        "stdDev": 1.42,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 53.6,
        "stdDev": 1.88,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 63.1,
        "stdDev": 1.55,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 77.4,
        "stdDev": 1.25,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 67.2,
        "stdDev": 2.15,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 52.2,
        "stdDev": 1.1,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 11,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 73.8,
        "stdDev": 1.65,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 62.9,
        "stdDev": 1.75,
        "rank": 12,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 9.6,
        "stdDev": 0.85,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 74.4,
        "stdDev": 4.5,
        "rank": 11,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.9,
        "stdDev": 0.65,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 77.9,
        "stdDev": 3.8,
        "rank": 12,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "OPENCHAT 7B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 76.2% on Vals Index (#11 of 23) at $0.70 per execution.",
        "Demonstrates 100.0% on Finance Agent and 73.8% on Code Migration benchmarks.",
        "Recorded average execution latency of 43021 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "qwen3-0-6b",
    "name": "QWEN 3 0.6B",
    "developer": "Alibaba",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "ALIBABA",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.04 / $0.12",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 74.16,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.1,
    "latencyFormatted": "5 s 306 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 74.16,
        "stdDev": 0.85,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 64.2,
        "stdDev": 2.14,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 74.5,
        "stdDev": 1.42,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 95.7,
        "stdDev": 0.65,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 57.4,
        "stdDev": 1.88,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58.3,
        "stdDev": 1.55,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 72.1,
        "stdDev": 1.25,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 93,
        "stdDev": 2.3,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 65.6,
        "stdDev": 2.15,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 55.5,
        "stdDev": 1.1,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 95.7,
        "stdDev": 1.95,
        "rank": 12,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 64.2,
        "stdDev": 1.65,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 58.4,
        "stdDev": 1.75,
        "rank": 13,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.3,
        "stdDev": 0.85,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 65.8,
        "stdDev": 4.5,
        "rank": 12,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.7,
        "stdDev": 0.65,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 69.1,
        "stdDev": 3.8,
        "rank": 13,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "QWEN 3 0.6B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 74.2% on Vals Index (#12 of 23) at $0.10 per execution.",
        "Demonstrates 95.7% on Finance Agent and 64.2% on Code Migration benchmarks.",
        "Recorded average execution latency of 5306 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "falcon3-1-0b",
    "name": "FALCON 3 1.0B",
    "developer": "TII",
    "country": "AE",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "TII",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.06 / $0.18",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 73.15,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "4 s 49 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 73.15,
        "stdDev": 0.85,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 65.1,
        "stdDev": 2.14,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 73.5,
        "stdDev": 1.42,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 96.3,
        "stdDev": 0.65,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 56.7,
        "stdDev": 1.88,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 57.7,
        "stdDev": 1.55,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71.5,
        "stdDev": 1.25,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 93.6,
        "stdDev": 2.3,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 64.9,
        "stdDev": 2.15,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54.9,
        "stdDev": 1.1,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 96.3,
        "stdDev": 1.95,
        "rank": 13,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 65.1,
        "stdDev": 1.65,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 57.8,
        "stdDev": 1.75,
        "rank": 14,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.2,
        "stdDev": 0.85,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 66.6,
        "stdDev": 4.5,
        "rank": 13,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 7.8,
        "stdDev": 0.65,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 69.9,
        "stdDev": 3.8,
        "rank": 14,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "FALCON 3 1.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 73.2% on Vals Index (#13 of 23) at $0.15 per execution.",
        "Demonstrates 96.3% on Finance Agent and 65.1% on Code Migration benchmarks.",
        "Recorded average execution latency of 4049 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "yi-coder-1-5b",
    "name": "YI-CODER 1.5B",
    "developer": "01.AI",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "01.AI",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.08 / $0.24",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 69.8,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.2,
    "latencyFormatted": "2 s 167 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 69.8,
        "stdDev": 0.85,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 69.3,
        "stdDev": 2.14,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 70.3,
        "stdDev": 1.42,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 96.3,
        "stdDev": 0.65,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 55.3,
        "stdDev": 1.88,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 58.9,
        "stdDev": 1.55,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 72.8,
        "stdDev": 1.25,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 93.6,
        "stdDev": 2.3,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 62.4,
        "stdDev": 2.15,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 53.7,
        "stdDev": 1.1,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 96.3,
        "stdDev": 1.95,
        "rank": 14,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 69.3,
        "stdDev": 1.65,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 59,
        "stdDev": 1.75,
        "rank": 15,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10,
        "stdDev": 0.85,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 70.4,
        "stdDev": 4.5,
        "rank": 14,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.3,
        "stdDev": 0.65,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 73.8,
        "stdDev": 3.8,
        "rank": 15,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "YI-CODER 1.5B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 69.8% on Vals Index (#14 of 23) at $0.20 per execution.",
        "Demonstrates 96.3% on Finance Agent and 69.3% on Code Migration benchmarks.",
        "Recorded average execution latency of 2167 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "deepseek-r1-distill-qwen-1-5b",
    "name": "DEEPSEEK R1-QWEN 1.5B",
    "developer": "Deepseek",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "DEEPSEEK",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.08 / $0.24",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 69.6,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.2,
    "latencyFormatted": "9 s 924 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 69.6,
        "stdDev": 0.85,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 51.4,
        "stdDev": 2.14,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 70.1,
        "stdDev": 1.42,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 63.7,
        "stdDev": 1.88,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 49.8,
        "stdDev": 1.55,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 62.8,
        "stdDev": 1.25,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 62.2,
        "stdDev": 2.15,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 61.1,
        "stdDev": 1.1,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 15,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 51.4,
        "stdDev": 1.65,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 50.3,
        "stdDev": 1.75,
        "rank": 16,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 11.5,
        "stdDev": 0.85,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 54.3,
        "stdDev": 4.5,
        "rank": 15,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 6.2,
        "stdDev": 0.65,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 57.3,
        "stdDev": 3.8,
        "rank": 16,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "DEEPSEEK R1-QWEN 1.5B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 69.6% on Vals Index (#15 of 23) at $0.20 per execution.",
        "Demonstrates 100.0% on Finance Agent and 51.4% on Code Migration benchmarks.",
        "Recorded average execution latency of 9924 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "ministral-3-3-0b",
    "name": "MINISTRAL 3.0B",
    "developer": "Mistral AI",
    "country": "EU",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "MISTRAL AI",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.14 / $0.42",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 67.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.35,
    "latencyFormatted": "9 s 955 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 67.4,
        "stdDev": 0.85,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 67.5,
        "stdDev": 2.14,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 68,
        "stdDev": 1.42,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 86.4,
        "stdDev": 0.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 56.2,
        "stdDev": 1.88,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 56.7,
        "stdDev": 1.55,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 70.4,
        "stdDev": 1.25,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 84.5,
        "stdDev": 2.3,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 60.6,
        "stdDev": 2.15,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54.5,
        "stdDev": 1.1,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 86.4,
        "stdDev": 1.95,
        "rank": 16,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 67.5,
        "stdDev": 1.65,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 56.9,
        "stdDev": 1.75,
        "rank": 17,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.1,
        "stdDev": 0.85,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 68.8,
        "stdDev": 4.5,
        "rank": 16,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.1,
        "stdDev": 0.65,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 72.1,
        "stdDev": 3.8,
        "rank": 17,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "MINISTRAL 3.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 67.4% on Vals Index (#16 of 23) at $0.35 per execution.",
        "Demonstrates 86.4% on Finance Agent and 67.5% on Code Migration benchmarks.",
        "Recorded average execution latency of 9955 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "stablelm-zephyr-3-0b",
    "name": "STABLELM ZEPHYR 3B",
    "developer": "Stability AI",
    "country": "UK",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "STABILITY AI",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.14 / $0.42",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 66.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.35,
    "latencyFormatted": "2 s 475 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 66.7,
        "stdDev": 0.85,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 66.3,
        "stdDev": 2.14,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 67.4,
        "stdDev": 1.42,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 98.1,
        "stdDev": 0.65,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 56.5,
        "stdDev": 1.88,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 57.3,
        "stdDev": 1.55,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71,
        "stdDev": 1.25,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 95.3,
        "stdDev": 2.3,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 60,
        "stdDev": 2.15,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54.7,
        "stdDev": 1.1,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 98.1,
        "stdDev": 1.95,
        "rank": 17,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 66.3,
        "stdDev": 1.65,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 57.4,
        "stdDev": 1.75,
        "rank": 18,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10.2,
        "stdDev": 0.85,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 67.7,
        "stdDev": 4.5,
        "rank": 17,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8,
        "stdDev": 0.65,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 71,
        "stdDev": 3.8,
        "rank": 18,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "STABLELM ZEPHYR 3B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 66.7% on Vals Index (#17 of 23) at $0.35 per execution.",
        "Demonstrates 98.1% on Finance Agent and 66.3% on Code Migration benchmarks.",
        "Recorded average execution latency of 2475 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "hermes3-3-0b",
    "name": "HERMES 3 3.0B",
    "developer": "Nous Research",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "NOUS RESEARCH",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.14 / $0.42",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 56.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.35,
    "latencyFormatted": "4 s 374 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 56.7,
        "stdDev": 0.85,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 68.7,
        "stdDev": 2.14,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 57.9,
        "stdDev": 1.42,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 91,
        "stdDev": 0.65,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 55.7,
        "stdDev": 1.88,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 55.6,
        "stdDev": 1.55,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 69.2,
        "stdDev": 1.25,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 88.7,
        "stdDev": 2.3,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 52.5,
        "stdDev": 2.15,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54,
        "stdDev": 1.1,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 91,
        "stdDev": 1.95,
        "rank": 18,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 68.7,
        "stdDev": 1.65,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 55.8,
        "stdDev": 1.75,
        "rank": 19,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 10,
        "stdDev": 0.85,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 69.8,
        "stdDev": 4.5,
        "rank": 18,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.2,
        "stdDev": 0.65,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 73.2,
        "stdDev": 3.8,
        "rank": 19,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "HERMES 3 3.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 56.7% on Vals Index (#18 of 23) at $0.35 per execution.",
        "Demonstrates 91.0% on Finance Agent and 68.7% on Code Migration benchmarks.",
        "Recorded average execution latency of 4374 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "onellm-doey-v1-1-0b",
    "name": "ONELLM DOEY 1.0B",
    "developer": "Doey LLM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "DOEY LLM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.06 / $0.17",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 47.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.14,
    "latencyFormatted": "972 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 47.2,
        "stdDev": 0.85,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 74.3,
        "stdDev": 2.14,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 48.8,
        "stdDev": 1.42,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 96.2,
        "stdDev": 0.65,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 53,
        "stdDev": 1.88,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 54,
        "stdDev": 1.55,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 67.4,
        "stdDev": 1.25,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 93.5,
        "stdDev": 2.3,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 45.4,
        "stdDev": 2.15,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 51.6,
        "stdDev": 1.1,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 96.2,
        "stdDev": 1.95,
        "rank": 19,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 74.3,
        "stdDev": 1.65,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 54.3,
        "stdDev": 1.75,
        "rank": 20,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 9.5,
        "stdDev": 0.85,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 74.9,
        "stdDev": 4.5,
        "rank": 19,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 8.9,
        "stdDev": 0.65,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 78.4,
        "stdDev": 3.8,
        "rank": 20,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "ONELLM DOEY 1.0B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 47.2% on Vals Index (#19 of 23) at $0.14 per execution.",
        "Demonstrates 96.2% on Finance Agent and 74.3% on Code Migration benchmarks.",
        "Recorded average execution latency of 972 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "bloom-560m-0-8b",
    "name": "BLOOM 560M",
    "developer": "Big Science",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "BIG SCIENCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.03 / $0.10",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 37.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.08,
    "latencyFormatted": "7 s 540 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 37.7,
        "stdDev": 0.85,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 23.1,
        "stdDev": 2.14,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 39.8,
        "stdDev": 1.42,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 66.9,
        "stdDev": 1.88,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 30.5,
        "stdDev": 1.55,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 41.6,
        "stdDev": 1.25,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 38.3,
        "stdDev": 2.15,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 63.9,
        "stdDev": 1.1,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 20,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 23.1,
        "stdDev": 1.65,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 32,
        "stdDev": 1.75,
        "rank": 21,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 12,
        "stdDev": 0.85,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 28.8,
        "stdDev": 4.5,
        "rank": 20,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 2.8,
        "stdDev": 0.65,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 31.3,
        "stdDev": 3.8,
        "rank": 21,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "BLOOM 560M evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 37.7% on Vals Index (#20 of 23) at $0.08 per execution.",
        "Demonstrates 100.0% on Finance Agent and 23.1% on Code Migration benchmarks.",
        "Recorded average execution latency of 7540 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "supra-50m-instruct-0-0518b",
    "name": "SUPRA 50M",
    "developer": "Supra",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "SUPRA",
    "weights": "OPEN",
    "contextWindow": "32K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.01 / $0.02",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 37.3,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.02,
    "latencyFormatted": "581 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 37.3,
        "stdDev": 0.85,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 25.1,
        "stdDev": 2.14,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 39.4,
        "stdDev": 1.42,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 68.2,
        "stdDev": 1.88,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 35.8,
        "stdDev": 1.55,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 47.4,
        "stdDev": 1.25,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 38,
        "stdDev": 2.15,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 65,
        "stdDev": 1.1,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 21,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 25.1,
        "stdDev": 1.65,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 37,
        "stdDev": 1.75,
        "rank": 22,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 12.3,
        "stdDev": 0.85,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 30.6,
        "stdDev": 4.5,
        "rank": 21,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 3,
        "stdDev": 0.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 33.1,
        "stdDev": 3.8,
        "rank": 22,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "SUPRA 50M evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 37.3% on Vals Index (#21 of 23) at $0.02 per execution.",
        "Demonstrates 100.0% on Finance Agent and 25.1% on Code Migration benchmarks.",
        "Recorded average execution latency of 581 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "asena-esp32-0-121b",
    "name": "ASENA ESP32 121M",
    "developer": "PROMTECH Inc",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "PROMTECH INC",
    "weights": "OPEN",
    "contextWindow": "32K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.01 / $0.04",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 19.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.03,
    "latencyFormatted": "1 s 677 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 19.7,
        "stdDev": 0.85,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 24.9,
        "stdDev": 2.14,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 22.7,
        "stdDev": 1.42,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 74.5,
        "stdDev": 1.88,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 28.3,
        "stdDev": 1.55,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 39.1,
        "stdDev": 1.25,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 24.8,
        "stdDev": 2.15,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 70.6,
        "stdDev": 1.1,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 22,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 24.9,
        "stdDev": 1.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 29.9,
        "stdDev": 1.75,
        "rank": 23,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 13.4,
        "stdDev": 0.85,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 30.4,
        "stdDev": 4.5,
        "rank": 22,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 3,
        "stdDev": 0.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 32.9,
        "stdDev": 3.8,
        "rank": 23,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "ASENA ESP32 121M evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 19.7% on Vals Index (#22 of 23) at $0.03 per execution.",
        "Demonstrates 100.0% on Finance Agent and 24.9% on Code Migration benchmarks.",
        "Recorded average execution latency of 1677 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "willow-alpha-0-3b",
    "name": "WILLOW ALPHA 0.3B",
    "developer": "North ML",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "NORTH ML",
    "weights": "OPEN",
    "contextWindow": "32K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.02 / $0.06",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 12.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.05,
    "latencyFormatted": "303 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 12.4,
        "stdDev": 0.85,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 29.6,
        "stdDev": 2.14,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 15.8,
        "stdDev": 1.42,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 100,
        "stdDev": 0.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 71.7,
        "stdDev": 1.88,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 28.2,
        "stdDev": 1.55,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 39,
        "stdDev": 1.25,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 97,
        "stdDev": 2.3,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 19.3,
        "stdDev": 2.15,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 68.1,
        "stdDev": 1.1,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 100,
        "stdDev": 1.95,
        "rank": 23,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 29.6,
        "stdDev": 1.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 29.8,
        "stdDev": 1.75,
        "rank": 23,
        "totalModels": 23,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 12.9,
        "stdDev": 0.85,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 34.6,
        "stdDev": 4.5,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 3.6,
        "stdDev": 0.65,
        "rank": 23,
        "totalModels": 23
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 37.2,
        "stdDev": 3.8,
        "rank": 23,
        "totalModels": 23
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "Sep 23, 2026",
      "summary": "WILLOW ALPHA 0.3B evaluated across OpenVals comprehensive Performance & Trust validation suite.",
      "bullets": [
        "Achieves 12.4% on Vals Index (#23 of 23) at $0.05 per execution.",
        "Demonstrates 100.0% on Finance Agent and 29.6% on Code Migration benchmarks.",
        "Recorded average execution latency of 303 ms across rigorous multi-turn validation tasks."
      ],
      "fallbackPolicy": "No fallback models were used; refusals and provider policy blocks are counted strictly as failed tasks."
    }
  },
  {
    "id": "llama3-2-1-0b",
    "name": "LLAMA3.2 1.0B",
    "developer": "Meta",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "META",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 96.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "1.84 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 96.7,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 45.7,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 55.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 94.1,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 61.8,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 90.1,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 54.6,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 89.2,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 84.7,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 60.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 86.6,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 39.5,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 52.5,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 52.5,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 45.3,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 40.4,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 48.6,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 8 real-world execution runs",
        "Semantic score: 43.9% | Factuality: 55.1%",
        "Reliability: 94.1% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "qwen2-5-0-5b",
    "name": "QWEN2.5 0.5B",
    "developer": "Alibaba",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "ALIBABA",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 84.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "2.13 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 84.4,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 65.2,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 71.5,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 86.2,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 62.7,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 79.3,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 69.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 78.7,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 77.6,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 61.6,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 79.3,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 58,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 66.9,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 53.3,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 62.7,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 59.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 66.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 9 real-world execution runs",
        "Semantic score: 64.4% | Factuality: 71.5%",
        "Reliability: 86.2% | Safety: 92.5%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "tinyllama-1-1b",
    "name": "TINYLLAMA 1.1B",
    "developer": "Open-Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN-SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 68,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "1.24 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 68,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 63.9,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 70.4,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 77.1,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 59.2,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 64.8,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 68.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 64.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 69.4,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.2,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 70.9,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 56.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 66,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 50.3,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 61.6,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 58,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 65.4,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 63% | Factuality: 70.4%",
        "Reliability: 77.1% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "deepseek-coder-1-3b",
    "name": "DEEPSEEK-CODER 1.3B",
    "developer": "Deepseek",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "DEEPSEEK",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 57.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "2.10 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 57.2,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 64.1,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 70.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 77.3,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 56.2,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 55.3,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 68.6,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 55.6,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 69.6,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 55.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 71.1,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 57,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 66.2,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 47.8,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 61.8,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 58.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 65.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 63.3% | Factuality: 70.7%",
        "Reliability: 77.3% | Safety: 96.3%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "granite3-moe-1-0b",
    "name": "GRANITE3-MOE 1.0B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 85,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "606 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 85,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 44.9,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 50.5,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 92.9,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 60,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 79.8,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 50.5,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 79.3,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 83.6,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 59,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 85.5,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 38.8,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 48.4,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 51,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 44.6,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 39.7,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 47.9,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 6 real-world execution runs",
        "Semantic score: 43.1% | Factuality: 50.5%",
        "Reliability: 92.9% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "stablelm2-1-6b",
    "name": "STABLELM2 1.6B",
    "developer": "Stability AI",
    "country": "UK",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "STABILITY AI",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 54.3,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "2.17 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 54.3,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 46.8,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 54.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 81.1,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 51.3,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 52.8,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 53.7,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 53.2,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 73,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 50.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 74.6,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 40.6,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 51.6,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 43.6,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 46.3,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 41.5,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 49.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 45.1% | Factuality: 54.1%",
        "Reliability: 81.1% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "internlm2-1-8b",
    "name": "INTERNLM2 1.8B",
    "developer": "Open-Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN-SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 57.9,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "1.34 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 57.9,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 67.2,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 73.2,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 88.6,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 59.9,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 56,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 70.9,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 56.2,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 79.7,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.9,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81.5,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 59.9,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 68.4,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 50.9,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 64.5,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 61.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 68.5,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 66.5% | Factuality: 73.2%",
        "Reliability: 88.6% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "granite3-2-2-0b",
    "name": "GRANITE3.2 2.0B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 83.9,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "8.57 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 83.9,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 52.3,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 60.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 84.3,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 56.2,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 78.8,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 59.6,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 78.3,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 75.9,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 55.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 77.6,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 45.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 57.4,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 47.8,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 51.2,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 46.7,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 54.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 50.8% | Factuality: 60.7%",
        "Reliability: 84.3% | Safety: 81%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "smollm2-1-7b",
    "name": "SMOLLM2 1.7B",
    "developer": "Hugging Face",
    "country": "EU",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "HUGGING FACE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 78.6,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "15 min 5 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 78.6,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 61.2,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 68.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 80.9,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 59.5,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 74.2,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 66.3,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 73.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 72.8,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.5,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 74.4,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 54.2,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 63.9,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 50.6,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 59.2,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 55.4,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 63,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 19 real-world execution runs",
        "Semantic score: 60.2% | Factuality: 68.1%",
        "Reliability: 80.9% | Safety: 96.3%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "interlm2-5-1-8b",
    "name": "INTERLM2.5 1.8B",
    "developer": "Open-Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN-SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 63,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "7.88 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 63,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 60,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 67.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 59.3,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 53.4,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 60.4,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 65.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 60.6,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 53.4,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 52.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 54.6,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 53,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 63,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 45.4,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 58.1,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 54.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 61.8,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 58.9% | Factuality: 67.1%",
        "Reliability: 59.3% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "granite4-0-35b",
    "name": "GRANITE4 0.35B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 89.3,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "4.80 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 89.3,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 43.9,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 52.6,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 93.2,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 59,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 83.6,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 52.3,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 82.9,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 83.9,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 58.1,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 85.7,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 37.8,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 50.3,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 50.2,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 43.7,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 38.6,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 47,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 6 real-world execution runs",
        "Semantic score: 42% | Factuality: 52.6%",
        "Reliability: 93.2% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "gemma2-2-0b",
    "name": "GEMMA2 2.0B",
    "developer": "Google",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "GOOGLE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 78.6,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "6.10 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 78.6,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 52.5,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 60.9,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 88.5,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 58.7,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 74.2,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 59.8,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 73.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 79.7,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 57.8,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81.4,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 45.9,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 57.6,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 49.9,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 51.4,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 46.9,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 54.9,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 51% | Factuality: 60.9%",
        "Reliability: 88.5% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "granite3-1-moe-1-0b",
    "name": "GRANITE3.1-MOE 1.0B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 78.9,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "5.41 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 78.9,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 63.9,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 70.4,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 88.3,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 58.2,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 74.4,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 68.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 74.1,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 79.5,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 57.3,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81.2,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 56.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 66,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 49.5,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 61.6,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 58,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 65.4,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 63% | Factuality: 70.4%",
        "Reliability: 88.3% | Safety: 73.5%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "granite3-dense-2-0b",
    "name": "GRANITE3-DENSE 2.0B",
    "developer": "IBM",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "IBM",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 76.8,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "3.24 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 76.8,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 68.2,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 74.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 94.3,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 64.4,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 72.6,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71.7,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 72.3,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 84.9,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 63.2,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 86.8,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 60.8,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 69.2,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 54.7,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 65.5,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 62.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 69.5,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 67.6% | Factuality: 74.1%",
        "Reliability: 94.3% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "minicpm5-1-0b",
    "name": "MINICPM5 1.0B",
    "developer": "Open BMB",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN BMB",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 0,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "333 ms",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 0,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 14.3,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 8.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 41.5,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 24.6,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 5,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 12.8,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 7,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 37.4,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 25.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 38.2,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 9.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 11.7,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 20.9,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 17.2,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 9.9,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 19.5,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 2 real-world execution runs",
        "Semantic score: 10.8% | Factuality: 8.7%",
        "Reliability: 41.5% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "qwen2-5-instruct-1-54b",
    "name": "QWEN2.5-INSTRUCT 1.54B",
    "developer": "Alibaba",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "ALIBABA",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 56.1,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "3.48 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 56.1,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 51.5,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 58,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 74.5,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 50.9,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 54.4,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 57.2,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 54.7,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 67.1,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 50.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 68.5,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 45,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 55,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 43.3,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 50.5,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 46,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 54,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 50% | Factuality: 58%",
        "Reliability: 74.5% | Safety: 94%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "vertalily1-2-1-0b",
    "name": "VERTALILY1.2 1.0B",
    "developer": "VLTX",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "VLTX",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 67.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "1.88 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 67.4,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 67.7,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 73.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 86.4,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 58.6,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 64.3,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 71.3,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 64.3,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 77.8,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 57.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 79.5,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 60.4,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 68.9,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 49.8,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 65,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 61.7,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 69,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 67.1% | Factuality: 73.7%",
        "Reliability: 86.4% | Safety: 82%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "atem-wisdom-1-5b",
    "name": "ATEM-WISDOM 1.5B",
    "developer": "Open-Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN-SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 69.6,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "7.37 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 69.6,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 63,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 69.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 78.7,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 57.9,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 66.2,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 67.7,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 66.2,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 70.8,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 57,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 72.4,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 55.9,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 65.3,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 49.2,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 60.8,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 57.1,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 64.6,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 62.1% | Factuality: 69.7%",
        "Reliability: 78.7% | Safety: 96.3%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "gemma3-it-1-0b",
    "name": "GEMMA3-IT 1.0B",
    "developer": "Google",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "GOOGLE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 65.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "8.98 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 65.4,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 65.8,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 72.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 88.6,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 58.3,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 62.6,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 69.9,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 62.6,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 79.7,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 57.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 81.5,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 58.6,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 67.4,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 49.6,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 63.3,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 59.9,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 67.3,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 65.1% | Factuality: 72.1%",
        "Reliability: 88.6% | Safety: 88.7%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "llama3-2-instruct-1-0b",
    "name": "LLAMA3.2-INSTRUCT 1.0B",
    "developer": "Meta",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "META",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 47.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "3.75 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 47.2,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 47.5,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 54.7,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 85.9,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 50.1,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 46.5,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 54.2,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 47.1,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 77.3,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 49.6,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 79,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 41.2,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 52.1,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 42.6,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 46.9,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 42.1,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 50.3,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 45.8% | Factuality: 54.7%",
        "Reliability: 85.9% | Safety: 97%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "qwen2-5-coder-instruct-3-0b",
    "name": "QWEN2.5-CODER-INSTRUCT 3.0B",
    "developer": "Alibaba",
    "country": "CN",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "ALIBABA",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 48.2,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "3.43 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 48.2,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 66.8,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 72.8,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 77.1,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 55.1,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 47.4,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 70.5,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 48,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 69.4,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54.3,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 70.9,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 59.5,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 68.1,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 46.8,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 64.2,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 60.8,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 68.2,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 66.1% | Factuality: 72.8%",
        "Reliability: 77.1% | Safety: 96.3%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "phi-4-mini-instruct-4-0b",
    "name": "PHI-4-MINI-INSTRUCT 4.0B",
    "developer": "Microsoft",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "MICROSOFT",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 57.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "1 min 10 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 57.4,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 50.1,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 57.5,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 69.2,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 48.1,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 55.5,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 56.8,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 55.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 62.3,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 47.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 63.7,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 43.7,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 54.6,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 40.9,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 49.2,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 44.6,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 52.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 48.5% | Factuality: 57.5%",
        "Reliability: 69.2% | Safety: 82%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "gemma-2b-2b",
    "name": "GEMMA:2B 2B",
    "developer": "Google",
    "country": "US",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "GOOGLE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 75,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "8.90 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 75,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 44.7,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 50.4,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 91.4,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 55.5,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 71,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 50.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 70.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 82.3,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 54.7,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 84.1,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 38.5,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 48.4,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 47.2,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 44.4,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 39.4,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 47.7,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 3 real-world execution runs",
        "Semantic score: 42.8% | Factuality: 50.4%",
        "Reliability: 91.4% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "tinyllama-latest-1-1b",
    "name": "TINYLLAMA:LATEST 1.1B",
    "developer": "Open-Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN-SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 66.7,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "8.25 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 66.7,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 42.4,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 39.2,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 74.6,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 46.4,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 63.7,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 40.3,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 63.7,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 67.1,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 46.1,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 68.6,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 36.4,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 38.5,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 39.4,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 42.3,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 37.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 45.6,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 3 real-world execution runs",
        "Semantic score: 40.4% | Factuality: 39.2%",
        "Reliability: 74.6% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "smollm2-360m-360m",
    "name": "SMOLLM2:360M 360M",
    "developer": "Hugging Face",
    "country": "EU",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "HUGGING FACE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 57.4,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "7.12 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 57.4,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 60,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 67.1,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 75.1,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 54.1,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 55.5,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 65.4,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 55.8,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 67.6,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 53.4,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 69.1,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 53,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 63,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 46,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 58.1,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 54.2,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 61.8,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 1 real-world execution runs",
        "Semantic score: 58.9% | Factuality: 67.1%",
        "Reliability: 75.1% | Safety: 96.2%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  },
  {
    "id": "tinydolphin-1-1b",
    "name": "TINYDOLPHIN 1.1B",
    "developer": "Open Source",
    "country": "GLOBAL",
    "releaseDate": "SEP 23, 2026",
    "formattedDate": "Sep 23, 2026",
    "companyKey": "OPEN SOURCE",
    "weights": "OPEN",
    "contextWindow": "128K",
    "maxOutputTokens": "32K",
    "tokenCosts": "$0.10 / $0.30",
    "modalities": [
      "text",
      "code"
    ],
    "accuracy": 71.8,
    "accuracyStdDev": 0.85,
    "costPerTask": 0.15,
    "latencyFormatted": "8.45 s",
    "benchmarks": [
      {
        "name": "Vals Index",
        "category": "proprietary",
        "score": 71.8,
        "stdDev": 0.85,
        "rank": 1,
        "totalModels": 60
      },
      {
        "name": "Code Migration",
        "category": "proprietary",
        "score": 49.1,
        "stdDev": 1.84,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "EMB",
        "category": "proprietary",
        "score": 58,
        "stdDev": 1.42,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Finance Agent (v2)",
        "category": "proprietary",
        "score": 70.7,
        "stdDev": 0.65,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Legal Research Bench",
        "category": "proprietary",
        "score": 53.6,
        "stdDev": 1.88,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "MedCode",
        "category": "proprietary",
        "score": 68.2,
        "stdDev": 1.55,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "MedScribe",
        "category": "proprietary",
        "score": 57.2,
        "stdDev": 1.25,
        "rank": 4,
        "totalModels": 60
      },
      {
        "name": "ProofBench v1.1",
        "category": "proprietary",
        "score": 68,
        "stdDev": 2.3,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "SAGE",
        "category": "proprietary",
        "score": 63.6,
        "stdDev": 2.15,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "Public Benefits Bench",
        "category": "proprietary",
        "score": 52.9,
        "stdDev": 1.1,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "Tax Agent Bench",
        "category": "proprietary",
        "score": 65,
        "stdDev": 1.95,
        "rank": 3,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Vibe Code Bench v1.1",
        "category": "proprietary",
        "score": 42.8,
        "stdDev": 1.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "BioMysteryBench",
        "category": "partner",
        "score": 55,
        "stdDev": 1.75,
        "rank": 4,
        "totalModels": 60,
        "hasInfo": true
      },
      {
        "name": "Harvey's Legal Agent",
        "category": "partner",
        "score": 45.6,
        "stdDev": 0.85,
        "rank": 5,
        "totalModels": 60
      },
      {
        "name": "IOI",
        "category": "academic",
        "score": 48.4,
        "stdDev": 4.5,
        "rank": 2,
        "totalModels": 60
      },
      {
        "name": "ProgramBench",
        "category": "academic",
        "score": 43.7,
        "stdDev": 0.65,
        "rank": 3,
        "totalModels": 60
      },
      {
        "name": "Terminal-Bench 2.1",
        "category": "academic",
        "score": 51.8,
        "stdDev": 3.8,
        "rank": 2,
        "totalModels": 60
      }
    ],
    "hyperparameters": {
      "temperature": 0.1,
      "topP": 0.95,
      "maxTokens": 8192,
      "systemPrompt": "OpenVals Agentic Production Framework v0.5.5",
      "samplingBudget": "Adaptive deterministic budget",
      "retries": 0
    },
    "updates": {
      "date": "SEP 2026",
      "summary": "Evaluated across OpenVals multi-dimensional benchmark suite.",
      "bullets": [
        "Tested on 2 real-world execution runs",
        "Semantic score: 47.5% | Factuality: 58%",
        "Reliability: 70.7% | Safety: 100%"
      ],
      "fallbackPolicy": "Static token fallback with safety guardrails"
    }
  }
];
