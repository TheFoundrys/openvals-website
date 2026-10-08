const fs = require('fs');

const rawData = fs.readFileSync('scratch/parsed_models.json', 'utf8');
const allRuns = JSON.parse(rawData);

// Compute unique models aggregated
const grouped = {};
for (let r of allRuns) {
  const key = r.name + '___' + r.params;
  if (!grouped[key]) {
    grouped[key] = {
      name: r.name,
      params: r.params,
      size: r.size,
      lab: r.lab === 'Open-Source' ? 'Open Source' : (r.lab === 'BigScience' ? 'Big Science' : r.lab),
      runs: []
    };
  }
  grouped[key].runs.push({
    accuracy: parseFloat(r.accuracy),
    semantic: parseFloat(r.semantic),
    latency: r.latency.trim(),
    latencyNum: parseFloat(r.latency.replace(/[^0-9.]/g, '')),
    factuality: parseFloat(r.factuality),
    hallucination: parseFloat(r.hallucination),
    safety: parseFloat(r.safety),
    reliability: parseFloat(r.reliability),
    drs: parseFloat(r.drs)
  });
}

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const aggregatedModels = Object.values(grouped).map((g) => {
  const accAvg = avg(g.runs.map(r => r.accuracy));
  const semAvg = avg(g.runs.map(r => r.semantic));
  const latAvg = avg(g.runs.map(r => r.latencyNum));
  const factAvg = avg(g.runs.map(r => r.factuality));
  const hallAvg = avg(g.runs.map(r => r.hallucination));
  const safeAvg = avg(g.runs.map(r => r.safety));
  const relAvg = avg(g.runs.map(r => r.reliability));
  const drsAvg = avg(g.runs.map(r => r.drs));

  return {
    id: `${g.name}-${g.params}`.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(),
    name: g.name,
    params: g.params,
    size: g.size,
    lab: g.lab,
    runsCount: g.runs.length,
    accuracy: (accAvg * 100).toFixed(1) + '%',
    accuracyNum: accAvg,
    semantic: semAvg.toFixed(3),
    latency: Math.round(latAvg) + ' ms',
    factuality: factAvg.toFixed(3),
    hallucination: (hallAvg * 100).toFixed(1) + '%',
    safety: safeAvg.toFixed(3),
    reliability: relAvg.toFixed(3),
    drs: drsAvg.toFixed(3),
    drsNum: drsAvg,
    rawRuns: g.runs.map((r, rIdx) => ({
      runIndex: rIdx + 1,
      accuracy: (r.accuracy * 100).toFixed(1) + '%',
      accuracyNum: r.accuracy,
      semantic: r.semantic.toFixed(3),
      latency: r.latency,
      factuality: r.factuality.toFixed(3),
      hallucination: (r.hallucination * 100).toFixed(1) + '%',
      safety: r.safety.toFixed(3),
      reliability: r.reliability.toFixed(3),
      drs: r.drs.toFixed(3)
    }))
  };
});

// Sort by DRS descending
aggregatedModels.sort((a, b) => b.drsNum - a.drsNum);
aggregatedModels.forEach((m, idx) => {
  m.rank = `${idx + 1}/${aggregatedModels.length}`;
});

// All 173 runs flattened with rank
const allRunsFlattened = allRuns.map((r, idx) => {
  const acc = parseFloat(r.accuracy);
  const hall = parseFloat(r.hallucination);
  return {
    id: `run-${idx + 1}`,
    name: r.name,
    params: r.params,
    size: r.size,
    lab: r.lab === 'Open-Source' ? 'Open Source' : (r.lab === 'BigScience' ? 'Big Science' : r.lab),
    accuracy: (acc * 100).toFixed(1) + '%',
    accuracyNum: acc,
    semantic: parseFloat(r.semantic).toFixed(3),
    latency: r.latency,
    factuality: parseFloat(r.factuality).toFixed(3),
    hallucination: (hall * 100).toFixed(1) + '%',
    safety: parseFloat(r.safety).toFixed(3),
    reliability: parseFloat(r.reliability).toFixed(3),
    drs: parseFloat(r.drs).toFixed(3),
    drsNum: parseFloat(r.drs),
    runNumber: idx + 1
  };
});

allRunsFlattened.sort((a, b) => b.drsNum - a.drsNum);
allRunsFlattened.forEach((r, idx) => {
  r.rank = `${idx + 1}/${allRunsFlattened.length}`;
});

const tsContent = `// Generated model benchmark evaluation dataset from OpenVals evaluation runs

export interface ModelRunRecord {
  runIndex: number;
  accuracy: string;
  accuracyNum: number;
  semantic: string;
  latency: string;
  factuality: string;
  hallucination: string;
  safety: string;
  reliability: string;
  drs: string;
}

export interface AggregatedModel {
  id: string;
  name: string;
  params: string;
  size: string;
  lab: string;
  runsCount: number;
  accuracy: string;
  accuracyNum: number;
  semantic: string;
  latency: string;
  factuality: string;
  hallucination: string;
  safety: string;
  reliability: string;
  drs: string;
  drsNum: number;
  rank: string;
  rawRuns: ModelRunRecord[];
}

export interface RawBenchmarkRun {
  id: string;
  name: string;
  params: string;
  size: string;
  lab: string;
  accuracy: string;
  accuracyNum: number;
  semantic: string;
  latency: string;
  factuality: string;
  hallucination: string;
  safety: string;
  reliability: string;
  drs: string;
  drsNum: number;
  rank: string;
  runNumber: number;
}

export const AGGREGATED_MODELS: AggregatedModel[] = ${JSON.stringify(aggregatedModels, null, 2)};

export const ALL_BENCHMARK_RUNS: RawBenchmarkRun[] = ${JSON.stringify(allRunsFlattened, null, 2)};
`;

fs.writeFileSync('src/components/modelBenchmarkData.ts', tsContent);
console.log('Successfully generated src/components/modelBenchmarkData.ts');
