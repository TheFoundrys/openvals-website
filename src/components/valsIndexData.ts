export interface ValsIndexModel {
  id: string;
  name: string;
  shortName: string;
  version?: string;
  lab: string;
  labKey: string;
  cost: number; // in $ per task (0.02 to 0.70)
  costLabel: string;
  accuracy: number; // in % (12.4 to 100.0)
  latency: number;
  latencyLabel: string;
  drs: number; // in % (28.2 to 63.1)
  drsLabel: string;
  tokenUsage: number;
  tokenLabel: string;
  onFrontier?: boolean;
  callout?: {
    text: string;
    dx: number;
    dy: number;
  };
  breakdown: {
    finance: number; // %
    coding: number;  // %
    legal: number;   // %
  };
  badgeColor: string;
  badgeTextColor: string;
  hasPattern?: boolean;
}

export interface LabLegendItem {
  key: string;
  label: string;
  color: string;
}

export const LAB_LEGENDS: LabLegendItem[] = [
  {
    "key": "Agentica",
    "label": "Agentica",
    "color": "#df8b7c"
  },
  {
    "key": "Tencent",
    "label": "Tencent",
    "color": "#3a3a3a"
  },
  {
    "key": "IBM",
    "label": "IBM",
    "color": "#0f62fe"
  },
  {
    "key": "Prism ML",
    "label": "Prism ML",
    "color": "#10b981"
  },
  {
    "key": "Liquid AI",
    "label": "Liquid AI",
    "color": "#0284c7"
  },
  {
    "key": "QVAC",
    "label": "QVAC",
    "color": "#7c3aed"
  },
  {
    "key": "Hugging Face",
    "label": "Hugging Face",
    "color": "#f59e0b"
  },
  {
    "key": "Google",
    "label": "Google",
    "color": "#46b17c"
  },
  {
    "key": "Meta",
    "label": "Meta",
    "color": "#528ef0"
  },
  {
    "key": "Microsoft",
    "label": "Microsoft",
    "color": "#00a4ef"
  },
  {
    "key": "Open Source",
    "label": "Open Source",
    "color": "#64748b"
  },
  {
    "key": "Alibaba",
    "label": "Alibaba",
    "color": "#f3832b"
  },
  {
    "key": "TII",
    "label": "TII",
    "color": "#0ea5e9"
  },
  {
    "key": "01.AI",
    "label": "01.AI",
    "color": "#498ff0"
  },
  {
    "key": "Deepseek",
    "label": "Deepseek",
    "color": "#1e40af"
  },
  {
    "key": "Mistral AI",
    "label": "Mistral AI",
    "color": "#d8b335"
  },
  {
    "key": "Stability AI",
    "label": "Stability AI",
    "color": "#a855f7"
  },
  {
    "key": "Nous Research",
    "label": "Nous Research",
    "color": "#546d88"
  },
  {
    "key": "Doey LLM",
    "label": "Doey LLM",
    "color": "#e7a44f"
  },
  {
    "key": "Big Science",
    "label": "Big Science",
    "color": "#708092"
  },
  {
    "key": "Supra",
    "label": "Supra",
    "color": "#8ec84c"
  },
  {
    "key": "PROMTECH Inc",
    "label": "PROMTECH Inc",
    "color": "#eab308"
  },
  {
    "key": "North ML",
    "label": "North ML",
    "color": "#5b6670"
  }
];

export const VALS_INDEX_MODELS: ValsIndexModel[] = [
  {
    "id": "deepscaler-1-5b",
    "name": "DEEPSCALER 1.5B",
    "shortName": "DEEPSCALER",
    "version": "1.5B",
    "lab": "Agentica",
    "labKey": "Agentica",
    "cost": 0.2,
    "costLabel": "$0.20",
    "accuracy": 100,
    "latency": 19449,
    "latencyLabel": "19449 ms",
    "drs": 57.7,
    "drsLabel": "57.7%",
    "tokenUsage": 3400,
    "tokenLabel": "3.4k",
    "onFrontier": true,
    "breakdown": {
      "finance": 100,
      "coding": 46.4,
      "legal": 65.1
    },
    "badgeColor": "#df8b7c",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "DeepScaler 1.5B (100%)",
      "dx": 26,
      "dy": -12
    }
  },
  {
    "id": "hunyuan-instruct-1-8b",
    "name": "HUNYUAN 1.8B",
    "shortName": "HUNYUAN",
    "version": "1.8B",
    "lab": "Tencent",
    "labKey": "Tencent",
    "cost": 0.25,
    "costLabel": "$0.25",
    "accuracy": 98.3,
    "latency": 15320,
    "latencyLabel": "15320 ms",
    "drs": 56.6,
    "drsLabel": "56.6%",
    "tokenUsage": 3600,
    "tokenLabel": "3.6k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 46.7,
      "legal": 65.3
    },
    "badgeColor": "#3a3a3a",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "Hunyuan 1.8B",
      "dx": 26,
      "dy": 14
    }
  },
  {
    "id": "granite3-3-2-0b",
    "name": "GRANITE 3.3 2.0B",
    "shortName": "GRANITE 3.3",
    "version": "2.0B",
    "lab": "IBM",
    "labKey": "IBM",
    "cost": 0.3,
    "costLabel": "$0.30",
    "accuracy": 96.7,
    "latency": 2428,
    "latencyLabel": "2428 ms",
    "drs": 61.4,
    "drsLabel": "61.4%",
    "tokenUsage": 3200,
    "tokenLabel": "3.2k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 55.4,
      "legal": 61.2
    },
    "badgeColor": "#0f62fe",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "Granite 3.3",
      "dx": 26,
      "dy": -10
    }
  },
  {
    "id": "ternary-bonsai-1-7b",
    "name": "TERNARY BONSAI 1.7B",
    "shortName": "TERNARY",
    "version": "BONSAI 1.7B",
    "lab": "Prism ML",
    "labKey": "Prism ML",
    "cost": 0.22,
    "costLabel": "$0.22",
    "accuracy": 91.4,
    "latency": 13473,
    "latencyLabel": "13473 ms",
    "drs": 58.7,
    "drsLabel": "58.7%",
    "tokenUsage": 3800,
    "tokenLabel": "3.8k",
    "onFrontier": false,
    "breakdown": {
      "finance": 81,
      "coding": 62.9,
      "legal": 58.3
    },
    "badgeColor": "#10b981",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "lfm2-5-thinking-1-2b",
    "name": "LFM 2.5 THINKING",
    "shortName": "LFM 2.5",
    "version": "THINKING",
    "lab": "Liquid AI",
    "labKey": "Liquid AI",
    "cost": 0.18,
    "costLabel": "$0.18",
    "accuracy": 90.79,
    "latency": 9364,
    "latencyLabel": "9364 ms",
    "drs": 61.6,
    "drsLabel": "61.6%",
    "tokenUsage": 3500,
    "tokenLabel": "3.5k",
    "onFrontier": true,
    "breakdown": {
      "finance": 94.8,
      "coding": 61.8,
      "legal": 59
    },
    "badgeColor": "#0284c7",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "LFM 2.5",
      "dx": -68,
      "dy": -12
    }
  },
  {
    "id": "medpsy-1-7b",
    "name": "MEDPSY 1.7B",
    "shortName": "MEDPSY",
    "version": "1.7B",
    "lab": "QVAC",
    "labKey": "QVAC",
    "cost": 0.22,
    "costLabel": "$0.22",
    "accuracy": 90.2,
    "latency": 28452,
    "latencyLabel": "28452 ms",
    "drs": 58,
    "drsLabel": "58.0%",
    "tokenUsage": 4100,
    "tokenLabel": "4.1k",
    "onFrontier": false,
    "breakdown": {
      "finance": 81,
      "coding": 59.4,
      "legal": 60.9
    },
    "badgeColor": "#7c3aed",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "smollm-1-7b",
    "name": "SMOLLM 1.7B",
    "shortName": "SMOLLM",
    "version": "1.7B",
    "lab": "Hugging Face",
    "labKey": "Hugging Face",
    "cost": 0.2,
    "costLabel": "$0.20",
    "accuracy": 83.9,
    "latency": 4644,
    "latencyLabel": "4644 ms",
    "drs": 58.5,
    "drsLabel": "58.5%",
    "tokenUsage": 3900,
    "tokenLabel": "3.9k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 55.8,
      "legal": 61.4
    },
    "badgeColor": "#f59e0b",
    "badgeTextColor": "#1e293b",
    "hasPattern": false
  },
  {
    "id": "gemma3n-e2b",
    "name": "GEMMA 3N E2B",
    "shortName": "GEMMA 3N",
    "version": "E2B",
    "lab": "Google",
    "labKey": "Google",
    "cost": 0.28,
    "costLabel": "$0.28",
    "accuracy": 82.5,
    "latency": 21745,
    "latencyLabel": "21745 ms",
    "drs": 60.3,
    "drsLabel": "60.3%",
    "tokenUsage": 4200,
    "tokenLabel": "4.2k",
    "onFrontier": false,
    "breakdown": {
      "finance": 82.3,
      "coding": 70.9,
      "legal": 54.7
    },
    "badgeColor": "#46b17c",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "llama2-0-1-0b",
    "name": "LLAMA 2.0 1.0B",
    "shortName": "LLAMA 2.0",
    "version": "1.0B",
    "lab": "Meta",
    "labKey": "Meta",
    "cost": 0.15,
    "costLabel": "$0.15",
    "accuracy": 80.5,
    "latency": 17867,
    "latencyLabel": "17867 ms",
    "drs": 59.4,
    "drsLabel": "59.4%",
    "tokenUsage": 4300,
    "tokenLabel": "4.3k",
    "onFrontier": true,
    "breakdown": {
      "finance": 74,
      "coding": 72.3,
      "legal": 54.1
    },
    "badgeColor": "#528ef0",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "LLaMA 2.0",
      "dx": -74,
      "dy": 2
    }
  },
  {
    "id": "phi3-latest-3-8b",
    "name": "PHI-3 3.8B",
    "shortName": "PHI-3",
    "version": "3.8B",
    "lab": "Microsoft",
    "labKey": "Microsoft",
    "cost": 0.45,
    "costLabel": "$0.45",
    "accuracy": 78.87,
    "latency": 44801,
    "latencyLabel": "44801 ms",
    "drs": 58.7,
    "drsLabel": "58.7%",
    "tokenUsage": 4600,
    "tokenLabel": "4.6k",
    "onFrontier": false,
    "breakdown": {
      "finance": 97.5,
      "coding": 64.8,
      "legal": 57.3
    },
    "badgeColor": "#00a4ef",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "Phi-3 3.8B",
      "dx": 24,
      "dy": -8
    }
  },
  {
    "id": "openchat-latest-7b",
    "name": "OPENCHAT 7B",
    "shortName": "OPENCHAT",
    "version": "7B",
    "lab": "Open Source",
    "labKey": "Open Source",
    "cost": 0.7,
    "costLabel": "$0.70",
    "accuracy": 76.2,
    "latency": 43021,
    "latencyLabel": "43021 ms",
    "drs": 63.1,
    "drsLabel": "63.1%",
    "tokenUsage": 4800,
    "tokenLabel": "4.8k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 73.8,
      "legal": 53.6
    },
    "badgeColor": "#64748b",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "OpenChat 7B",
      "dx": -88,
      "dy": -10
    }
  },
  {
    "id": "qwen3-0-6b",
    "name": "QWEN 3 0.6B",
    "shortName": "QWEN 3",
    "version": "0.6B",
    "lab": "Alibaba",
    "labKey": "Alibaba",
    "cost": 0.1,
    "costLabel": "$0.10",
    "accuracy": 74.16,
    "latency": 5306,
    "latencyLabel": "5306 ms",
    "drs": 58.3,
    "drsLabel": "58.3%",
    "tokenUsage": 4900,
    "tokenLabel": "4.9k",
    "onFrontier": true,
    "breakdown": {
      "finance": 95.7,
      "coding": 64.2,
      "legal": 57.4
    },
    "badgeColor": "#f3832b",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "Qwen 3",
      "dx": 24,
      "dy": 12
    }
  },
  {
    "id": "falcon3-1-0b",
    "name": "FALCON 3 1.0B",
    "shortName": "FALCON 3",
    "version": "1.0B",
    "lab": "TII",
    "labKey": "TII",
    "cost": 0.15,
    "costLabel": "$0.15",
    "accuracy": 73.15,
    "latency": 4049,
    "latencyLabel": "4049 ms",
    "drs": 57.7,
    "drsLabel": "57.7%",
    "tokenUsage": 5100,
    "tokenLabel": "5.1k",
    "onFrontier": false,
    "breakdown": {
      "finance": 96.3,
      "coding": 65.1,
      "legal": 56.7
    },
    "badgeColor": "#0ea5e9",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "yi-coder-1-5b",
    "name": "YI-CODER 1.5B",
    "shortName": "YI-CODER",
    "version": "1.5B",
    "lab": "01.AI",
    "labKey": "01.AI",
    "cost": 0.2,
    "costLabel": "$0.20",
    "accuracy": 69.8,
    "latency": 2167,
    "latencyLabel": "2167 ms",
    "drs": 58.9,
    "drsLabel": "58.9%",
    "tokenUsage": 5300,
    "tokenLabel": "5.3k",
    "onFrontier": false,
    "breakdown": {
      "finance": 96.3,
      "coding": 69.3,
      "legal": 55.3
    },
    "badgeColor": "#498ff0",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "deepseek-r1-distill-qwen-1-5b",
    "name": "DEEPSEEK R1-QWEN 1.5B",
    "shortName": "DEEPSEEK",
    "version": "R1-QWEN 1.5B",
    "lab": "Deepseek",
    "labKey": "Deepseek",
    "cost": 0.2,
    "costLabel": "$0.20",
    "accuracy": 69.6,
    "latency": 9924,
    "latencyLabel": "9924 ms",
    "drs": 49.8,
    "drsLabel": "49.8%",
    "tokenUsage": 5400,
    "tokenLabel": "5.4k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 51.4,
      "legal": 63.7
    },
    "badgeColor": "#1e40af",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "ministral-3-3-0b",
    "name": "MINISTRAL 3.0B",
    "shortName": "MINISTRAL",
    "version": "3.0B",
    "lab": "Mistral AI",
    "labKey": "Mistral AI",
    "cost": 0.35,
    "costLabel": "$0.35",
    "accuracy": 67.4,
    "latency": 9955,
    "latencyLabel": "9955 ms",
    "drs": 56.7,
    "drsLabel": "56.7%",
    "tokenUsage": 5600,
    "tokenLabel": "5.6k",
    "onFrontier": false,
    "breakdown": {
      "finance": 86.4,
      "coding": 67.5,
      "legal": 56.2
    },
    "badgeColor": "#d8b335",
    "badgeTextColor": "#1e293b",
    "hasPattern": false
  },
  {
    "id": "stablelm-zephyr-3-0b",
    "name": "STABLELM ZEPHYR 3B",
    "shortName": "STABLELM",
    "version": "ZEPHYR 3B",
    "lab": "Stability AI",
    "labKey": "Stability AI",
    "cost": 0.35,
    "costLabel": "$0.35",
    "accuracy": 66.7,
    "latency": 2475,
    "latencyLabel": "2475 ms",
    "drs": 57.3,
    "drsLabel": "57.3%",
    "tokenUsage": 5700,
    "tokenLabel": "5.7k",
    "onFrontier": false,
    "breakdown": {
      "finance": 98.1,
      "coding": 66.3,
      "legal": 56.5
    },
    "badgeColor": "#a855f7",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "hermes3-3-0b",
    "name": "HERMES 3 3.0B",
    "shortName": "HERMES 3",
    "version": "3.0B",
    "lab": "Nous Research",
    "labKey": "Nous Research",
    "cost": 0.35,
    "costLabel": "$0.35",
    "accuracy": 56.7,
    "latency": 4374,
    "latencyLabel": "4374 ms",
    "drs": 55.6,
    "drsLabel": "55.6%",
    "tokenUsage": 6100,
    "tokenLabel": "6.1k",
    "onFrontier": false,
    "breakdown": {
      "finance": 91,
      "coding": 68.7,
      "legal": 55.7
    },
    "badgeColor": "#546d88",
    "badgeTextColor": "#ffffff",
    "hasPattern": false
  },
  {
    "id": "onellm-doey-v1-1-0b",
    "name": "ONELLM DOEY 1.0B",
    "shortName": "ONELLM",
    "version": "DOEY 1.0B",
    "lab": "Doey LLM",
    "labKey": "Doey LLM",
    "cost": 0.14,
    "costLabel": "$0.14",
    "accuracy": 47.2,
    "latency": 972,
    "latencyLabel": "972 ms",
    "drs": 54,
    "drsLabel": "54.0%",
    "tokenUsage": 6400,
    "tokenLabel": "6.4k",
    "onFrontier": false,
    "breakdown": {
      "finance": 96.2,
      "coding": 74.3,
      "legal": 53
    },
    "badgeColor": "#e7a44f",
    "badgeTextColor": "#1e293b",
    "hasPattern": false
  },
  {
    "id": "bloom-560m-0-8b",
    "name": "BLOOM 560M",
    "shortName": "BLOOM",
    "version": "560M",
    "lab": "Big Science",
    "labKey": "Big Science",
    "cost": 0.08,
    "costLabel": "$0.08",
    "accuracy": 37.7,
    "latency": 7540,
    "latencyLabel": "7540 ms",
    "drs": 30.5,
    "drsLabel": "30.5%",
    "tokenUsage": 6900,
    "tokenLabel": "6.9k",
    "onFrontier": true,
    "breakdown": {
      "finance": 100,
      "coding": 23.1,
      "legal": 66.9
    },
    "badgeColor": "#708092",
    "badgeTextColor": "#ffffff",
    "hasPattern": false,
    "callout": {
      "text": "Bloom 560M",
      "dx": 26,
      "dy": -8
    }
  },
  {
    "id": "supra-50m-instruct-0-0518b",
    "name": "SUPRA 50M",
    "shortName": "SUPRA",
    "version": "50M",
    "lab": "Supra",
    "labKey": "Supra",
    "cost": 0.02,
    "costLabel": "$0.02",
    "accuracy": 37.3,
    "latency": 581,
    "latencyLabel": "581 ms",
    "drs": 35.8,
    "drsLabel": "35.8%",
    "tokenUsage": 7400,
    "tokenLabel": "7.4k",
    "onFrontier": true,
    "breakdown": {
      "finance": 100,
      "coding": 25.1,
      "legal": 68.2
    },
    "badgeColor": "#8ec84c",
    "badgeTextColor": "#1e293b",
    "hasPattern": false,
    "callout": {
      "text": "Supra 50M",
      "dx": 26,
      "dy": 8
    }
  },
  {
    "id": "asena-esp32-0-121b",
    "name": "ASENA ESP32 121M",
    "shortName": "ASENA",
    "version": "ESP32 121M",
    "lab": "PROMTECH Inc",
    "labKey": "PROMTECH Inc",
    "cost": 0.03,
    "costLabel": "$0.03",
    "accuracy": 19.7,
    "latency": 1677,
    "latencyLabel": "1677 ms",
    "drs": 28.3,
    "drsLabel": "28.3%",
    "tokenUsage": 8100,
    "tokenLabel": "8.1k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 24.9,
      "legal": 74.5
    },
    "badgeColor": "#eab308",
    "badgeTextColor": "#1e293b",
    "hasPattern": false
  },
  {
    "id": "willow-alpha-0-3b",
    "name": "WILLOW ALPHA 0.3B",
    "shortName": "WILLOW",
    "version": "ALPHA 0.3B",
    "lab": "North ML",
    "labKey": "North ML",
    "cost": 0.05,
    "costLabel": "$0.05",
    "accuracy": 12.4,
    "latency": 303,
    "latencyLabel": "303 ms",
    "drs": 28.2,
    "drsLabel": "28.2%",
    "tokenUsage": 8600,
    "tokenLabel": "8.6k",
    "onFrontier": false,
    "breakdown": {
      "finance": 100,
      "coding": 29.6,
      "legal": 71.7
    },
    "badgeColor": "#5b6670",
    "badgeTextColor": "#ffffff",
    "hasPattern": true
  }
];
