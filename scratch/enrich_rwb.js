const fs = require('fs');

const parsed = JSON.parse(fs.readFileSync('./scratch/parsed_models.json', 'utf8'));
const indices = [0, 1, 4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27];

// Read current realWorldBenchmarksData.ts
const tsContent = fs.readFileSync('./src/components/realWorldBenchmarksData.ts', 'utf8');

// Parse the MODELS array
const match = tsContent.match(/export const MODELS: ModelData\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not match MODELS');
  process.exit(1);
}

const currentModels = eval(match[1]);

const fmtPct = (val) => {
  const num = parseFloat(val);
  return (num * 100).toFixed(1) + '%';
};

const numPct = (val) => {
  return parseFloat((parseFloat(val) * 100).toFixed(1));
};

const enrichedModels = currentModels.map((m, i) => {
  const raw = parsed[indices[i]];
  return {
    ...m,
    score: numPct(raw.accuracy),
    displayScore: fmtPct(raw.accuracy),
    semantic: numPct(raw.semantic),
    semanticLabel: fmtPct(raw.semantic),
    factuality: numPct(raw.factuality),
    factualityLabel: fmtPct(raw.factuality),
    hallucination: numPct(raw.hallucination),
    hallucinationLabel: fmtPct(raw.hallucination),
    safety: numPct(raw.safety),
    safetyLabel: fmtPct(raw.safety),
    reliability: numPct(raw.reliability),
    reliabilityLabel: fmtPct(raw.reliability),
    drs: numPct(raw.drs),
    drsLabel: fmtPct(raw.drs),
  };
});

const newInterface = `export interface ModelData {
  id: string;
  name: string;
  version?: string;
  lab: string;
  score: number; // percentage
  displayScore: string;
  cost?: number;
  costLabel?: string;
  latency: number;
  latencyLabel: string;
  tokenUsage?: number;
  tokenLabel?: string;
  semantic: number;
  semanticLabel: string;
  factuality: number;
  factualityLabel: string;
  hallucination: number;
  hallucinationLabel: string;
  safety: number;
  safetyLabel: string;
  reliability: number;
  reliabilityLabel: string;
  drs: number;
  drsLabel: string;
  color: string;
  textColor: string;
  hasPattern?: boolean;
  breakdown: {
    finance: string;
    software: string;
    cybersecurity: string;
    mentalHealth: string;
  };
}`;

const newFileContent = newInterface + '\n\nexport const MODELS: ModelData[] = ' + JSON.stringify(enrichedModels, null, 2) + ';\n';
fs.writeFileSync('./src/components/realWorldBenchmarksData.ts', newFileContent, 'utf8');
console.log('Successfully updated realWorldBenchmarksData.ts with all 8 metrics for 23 models');
