const fs = require('fs');
const models = require('./generated_models_for_benchmarks.json');

const frontierIds = new Set([
  'supra-50m-instruct-0-0518b',
  'bloom-560m-0-8b',
  'qwen3-0-6b',
  'llama2-0-1-0b',
  'lfm2-5-thinking-1-2b',
  'deepscaler-1-5b'
]);

const callouts = {
  'deepscaler-1-5b': { text: 'DeepScaler 1.5B (100%)', dx: 26, dy: -12 },
  'hunyuan-instruct-1-8b': { text: 'Hunyuan 1.8B', dx: 26, dy: 14 },
  'granite3-3-2-0b': { text: 'Granite 3.3', dx: 26, dy: -10 },
  'lfm2-5-thinking-1-2b': { text: 'LFM 2.5', dx: -68, dy: -12 },
  'llama2-0-1-0b': { text: 'LLaMA 2.0', dx: -74, dy: 2 },
  'qwen3-0-6b': { text: 'Qwen 3', dx: 24, dy: 12 },
  'phi3-latest-3-8b': { text: 'Phi-3 3.8B', dx: 24, dy: -8 },
  'openchat-latest-7b': { text: 'OpenChat 7B', dx: -88, dy: -10 },
  'bloom-560m-0-8b': { text: 'Bloom 560M', dx: 26, dy: -8 },
  'supra-50m-instruct-0-0518b': { text: 'Supra 50M', dx: 26, dy: 8 }
};

const processedModels = models.map(m => {
  const c = callouts[m.id];
  const financeNum = parseFloat(m.breakdown.finance) || 0;
  const codingNum = parseFloat(m.breakdown.software) || 0;
  const legalNum = parseFloat(m.breakdown.cybersecurity) || 0;

  const drsNum = parseFloat(m.breakdown.mentalHealth) || 0;

  const item = {
    id: m.id,
    name: m.name + (m.version ? ' ' + m.version : ''),
    shortName: m.name,
    version: m.version || '',
    lab: m.lab,
    labKey: m.lab,
    cost: m.cost,
    costLabel: m.costLabel,
    accuracy: m.score,
    latency: m.latency,
    latencyLabel: m.latencyLabel,
    drs: drsNum,
    drsLabel: drsNum.toFixed(1) + '%',
    tokenUsage: m.tokenUsage,
    tokenLabel: m.tokenLabel,
    onFrontier: frontierIds.has(m.id),
    breakdown: {
      finance: financeNum,
      coding: codingNum,
      legal: legalNum
    },
    badgeColor: m.color,
    badgeTextColor: m.textColor,
    hasPattern: m.hasPattern || false
  };

  if (c) {
    item.callout = c;
  }

  return item;
});

const labLegends = models.map(m => ({
  key: m.lab,
  label: m.lab,
  color: m.color
}));

const header = `export interface ValsIndexModel {
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

`;

const content = header +
  'export const LAB_LEGENDS: LabLegendItem[] = ' + JSON.stringify(labLegends, null, 2) + ';\n\n' +
  'export const VALS_INDEX_MODELS: ValsIndexModel[] = ' + JSON.stringify(processedModels, null, 2) + ';\n';

fs.writeFileSync('src/components/valsIndexData.ts', content, 'utf8');
console.log('Saved 23 models to src/components/valsIndexData.ts');
