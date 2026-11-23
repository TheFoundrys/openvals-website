const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const DEFAULT_SHAREPOINT_URL =
  'https://techoptima1-my.sharepoint.com/:x:/g/personal/krishna_avula_techoptima_ai/IQBjWJjpczJyR7-ReQj5TzqtAc2o0S7BFX68DN2pQ8qOvMU?download=1';

const TRACKER_URL = process.env.TRACKER_EXCEL_URL || DEFAULT_SHAREPOINT_URL;
const LOCAL_BACKUP_PATH = path.join(__dirname, '..', 'scratch', 'tracker.xlsx');

async function fetchExcelBuffer(url) {
  try {
    console.log(`[Sync] Fetching Excel file from SharePoint...`);
    const r1 = await fetch(url, { redirect: 'manual' });
    if (r1.status === 302 || r1.status === 301) {
      const loc = r1.headers.get('location');
      const cookie = r1.headers.get('set-cookie');
      const origin = new URL(url).origin;
      const nextUrl = new URL(loc, origin).toString();
      const r2 = await fetch(nextUrl, {
        headers: cookie ? { cookie } : {},
      });
      if (!r2.ok) throw new Error(`HTTP ${r2.status} ${r2.statusText}`);
      const buf = Buffer.from(await r2.arrayBuffer());
      if (buf.length > 1000) {
        fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
        fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
        console.log(`[Sync] Successfully downloaded ${buf.length} bytes from SharePoint`);
        return buf;
      }
    } else if (r1.ok) {
      const buf = Buffer.from(await r1.arrayBuffer());
      if (buf.length > 1000) {
        fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
        fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
        console.log(`[Sync] Successfully downloaded ${buf.length} bytes`);
        return buf;
      }
    }
    throw new Error(`Unexpected response status ${r1.status}`);
  } catch (err) {
    console.warn(`[Sync] Network fetch failed (${err.message}). Checking local backup...`);
    if (fs.existsSync(LOCAL_BACKUP_PATH)) {
      console.log(`[Sync] Using local backup file at ${LOCAL_BACKUP_PATH}`);
      return fs.readFileSync(LOCAL_BACKUP_PATH);
    }
    throw err;
  }
}

const LAB_CONFIGS = {
  'Agentica': { displayName: 'DEEPSCALER', version: '1.5B', color: '#df8b7c', textColor: '#ffffff', cost: 0.2, costLabel: '$0.20', tokenUsage: 3400, tokenLabel: '3.4k' },
  'Tencent': { displayName: 'HUNYUAN', version: '1.8B', color: '#3a3a3a', textColor: '#ffffff', cost: 0.25, costLabel: '$0.25', tokenUsage: 3600, tokenLabel: '3.6k' },
  'IBM': { displayName: 'GRANITE 3.3', version: '2.0B', color: '#0f62fe', textColor: '#ffffff', cost: 0.3, costLabel: '$0.30', tokenUsage: 3200, tokenLabel: '3.2k' },
  'Prism ML': { displayName: 'TERNARY', version: 'BONSAI 1.7B', color: '#10b981', textColor: '#ffffff', cost: 0.22, costLabel: '$0.22', tokenUsage: 3800, tokenLabel: '3.8k' },
  'Liquid AI': { displayName: 'LFM 2.5', version: 'THINKING', color: '#0284c7', textColor: '#ffffff', cost: 0.18, costLabel: '$0.18', tokenUsage: 3500, tokenLabel: '3.5k' },
  'QVAC': { displayName: 'MEDPSY', version: '1.7B', color: '#7c3aed', textColor: '#ffffff', cost: 0.22, costLabel: '$0.22', tokenUsage: 4100, tokenLabel: '4.1k' },
  'Hugging Face': { displayName: 'SMOLLM', version: '1.7B', color: '#f59e0b', textColor: '#1e293b', cost: 0.2, costLabel: '$0.20', tokenUsage: 3900, tokenLabel: '3.9k' },
  'Google': { displayName: 'GEMMA 3N', version: 'E2B', color: '#46b17c', textColor: '#ffffff', cost: 0.28, costLabel: '$0.28', tokenUsage: 4200, tokenLabel: '4.2k' },
  'Meta': { displayName: 'LLAMA 2.0', version: '1.0B', color: '#528ef0', textColor: '#ffffff', cost: 0.15, costLabel: '$0.15', tokenUsage: 4300, tokenLabel: '4.3k' },
  'Microsoft': { displayName: 'PHI-3', version: '3.8B', color: '#00a4ef', textColor: '#ffffff', cost: 0.45, costLabel: '$0.45', tokenUsage: 4600, tokenLabel: '4.6k' },
  'Open Source': { displayName: 'OPENCHAT', version: '7B', color: '#64748b', textColor: '#ffffff', cost: 0.7, costLabel: '$0.70', tokenUsage: 4800, tokenLabel: '4.8k' },
  'Alibaba': { displayName: 'QWEN 3', version: '0.6B', color: '#f3832b', textColor: '#ffffff', cost: 0.1, costLabel: '$0.10', tokenUsage: 4900, tokenLabel: '4.9k' },
  'TII': { displayName: 'FALCON 3', version: '1.0B', color: '#0ea5e9', textColor: '#ffffff', cost: 0.15, costLabel: '$0.15', tokenUsage: 5100, tokenLabel: '5.1k' },
  '01.AI': { displayName: 'YI-CODER', version: '1.5B', color: '#498ff0', textColor: '#ffffff', cost: 0.2, costLabel: '$0.20', tokenUsage: 5300, tokenLabel: '5.3k' },
  'Deepseek': { displayName: 'DEEPSEEK', version: 'R1-QWEN 1.5B', color: '#1e40af', textColor: '#ffffff', cost: 0.2, costLabel: '$0.20', tokenUsage: 5400, tokenLabel: '5.4k' },
  'Mistral AI': { displayName: 'MINISTRAL', version: '3.0B', color: '#d8b335', textColor: '#1e293b', cost: 0.35, costLabel: '$0.35', tokenUsage: 5600, tokenLabel: '5.6k' },
  'Stability AI': { displayName: 'STABLELM', version: 'ZEPHYR 3B', color: '#a855f7', textColor: '#ffffff', cost: 0.35, costLabel: '$0.35', tokenUsage: 5700, tokenLabel: '5.7k' },
  'Nous Research': { displayName: 'HERMES 3', version: '3.0B', color: '#546d88', textColor: '#ffffff', cost: 0.35, costLabel: '$0.35', tokenUsage: 6100, tokenLabel: '6.1k' },
  'Doey LLM': { displayName: 'ONELLM', version: 'DOEY 1.0B', color: '#e7a44f', textColor: '#1e293b', cost: 0.14, costLabel: '$0.14', tokenUsage: 6400, tokenLabel: '6.4k' },
  'Big Science': { displayName: 'BLOOM', version: '560M', color: '#708092', textColor: '#ffffff', cost: 0.08, costLabel: '$0.08', tokenUsage: 6900, tokenLabel: '6.9k' },
  'Supra': { displayName: 'SUPRA', version: '50M', color: '#8ec84c', textColor: '#1e293b', cost: 0.02, costLabel: '$0.02', tokenUsage: 7400, tokenLabel: '7.4k' },
  'PROMTECH Inc': { displayName: 'ASENA', version: 'ESP32 121M', color: '#eab308', textColor: '#1e293b', cost: 0.03, costLabel: '$0.03', tokenUsage: 8100, tokenLabel: '8.1k' },
  'North ML': { displayName: 'WILLOW', version: 'ALPHA 0.3B', color: '#5b6670', textColor: '#ffffff', cost: 0.05, costLabel: '$0.05', tokenUsage: 8600, tokenLabel: '8.6k', hasPattern: true }
};

function cleanWhitespace(val) {
  if (val === undefined || val === null) return '';
  return String(val).replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeModelName(rawName) {
  let name = cleanWhitespace(rawName);
  // Strip stray leading colons/dots/spaces and stray trailing periods/colons/hyphens
  name = name.replace(/^[:.\s]+/, '').replace(/[:.\-\s]+$/, '').trim();
  return name;
}

function normalizeParams(rawParams) {
  let p = cleanWhitespace(rawParams).toLowerCase();
  if (!p) return '';
  p = p.replace(/\s*billion\b/g, 'b').replace(/\s*million\b/g, 'm');
  p = p.replace(/(\d)\s+([bm])\b/g, '$1$2');
  return p;
}

function normalizeSize(rawSize) {
  let s = cleanWhitespace(rawSize);
  if (!s) return '';
  // Normalize spacing & casing for MB / GB / KB / TB, and bare M like "490M" -> "490 MB"
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(tb|gb|mb|kb|m)$/i);
  if (m) {
    const unit = m[2].toUpperCase() === 'M' ? 'MB' : m[2].toUpperCase();
    return `${m[1]} ${unit}`;
  }
  return s;
}

function normalizeLab(rawLab, modelName) {
  let l = cleanWhitespace(rawLab).replace(/^[:.\-·\s]+/, '').replace(/[:.\-·\s]+$/, '').trim();
  if (!l) {
    const norm = (modelName || '').toLowerCase();
    if (norm.includes('qwen')) return 'Alibaba';
    if (norm.includes('deepseek')) return 'Deepseek';
    if (norm.includes('llama')) return 'Meta';
    if (norm.includes('gemma')) return 'Google';
    if (norm.includes('granite')) return 'IBM';
    if (norm.includes('phi')) return 'Microsoft';
    if (norm.includes('lfm')) return 'Liquid AI';
    if (norm.includes('smollm') || norm.includes('h2o') || norm.includes('olmo')) return 'Hugging Face';
    return 'Open Source';
  }

  const lower = l.toLowerCase();
  if (lower.includes('alibaba') || lower.includes('qwen team')) return 'Alibaba';
  if (lower === 'deepseek') return 'Deepseek';
  if (lower.startsWith('google')) return 'Google';
  if (lower === 'meta' || lower === 'meta ai') return 'Meta';
  if (lower.startsWith('microsoft')) return 'Microsoft';
  if (lower === 'liquid a' || lower === 'liquid ai') return 'Liquid AI';
  if (lower === 'hugging face') return 'Hugging Face';
  if (lower === 'stability a' || lower === 'stability ai') return 'Stability AI';
  if (lower.startsWith('01.ai')) return '01.AI';
  if (lower === 'bigscience' || lower === 'big science') return 'Big Science';
  if (lower === 'openbmb' || lower === 'open bmb') return 'Open BMB';
  if (lower === 'open-source' || lower === 'open source') return 'Open Source';
  if (lower === 'supra' || lower === 'supralabs') return 'Supra';
  if (lower === 'tii' || lower.includes('technology innovation institute')) return 'TII';
  if (lower.startsWith('allen institute') || lower.startsWith('allem institute')) return 'Allen Institute for AI';
  if (lower.startsWith('cohere')) return 'Cohere';
  if (lower.startsWith('tinyllama')) return 'TinyLlama';
  if (lower === 'speakleash') return 'SpeakLeash';

  return l;
}

function parseScoreMetric(rawVal, fieldName) {
  if (rawVal === undefined || rawVal === null || cleanWhitespace(rawVal) === '') {
    return { missing: true, value: null };
  }
  if (typeof rawVal === 'string' && /(?:ms|sec|second)/i.test(rawVal)) {
    return { invalid: true, reason: `${fieldName} contains latency string "${rawVal}"` };
  }
  const str = cleanWhitespace(rawVal).replace(/,/g, '');
  let num = parseFloat(str);
  if (isNaN(num)) {
    return { invalid: true, reason: `${fieldName} is not a number ("${rawVal}")` };
  }
  if (str.endsWith('%')) {
    num = num / 100;
  }
  // Clamp tiny negative floating-point/cosine artifacts (e.g., -0.003) to 0
  if (num < 0 && num >= -0.05) {
    num = 0;
  }
  if (num < 0 || num > 1.0001) {
    return { invalid: true, reason: `${fieldName} out of valid [0, 1] range (${rawVal})` };
  }
  return { missing: false, invalid: false, value: Math.min(1, Math.max(0, num)) };
}

function parseLatency(rawVal) {
  if (rawVal === undefined || rawVal === null || cleanWhitespace(rawVal) === '') {
    return { invalid: true, reason: 'latency is missing' };
  }
  let latNum = NaN;
  if (typeof rawVal === 'number') {
    latNum = rawVal;
  } else {
    const str = cleanWhitespace(rawVal).replace(/,/g, '');
    const match = str.match(/^(-?\d+(?:\.\d+)?)\s*(ms|milliseconds?|s|sec|secs|seconds?)?$/i);
    if (match) {
      const val = parseFloat(match[1]);
      const unit = (match[2] || 'ms').toLowerCase();
      latNum = unit === 'ms' || unit.startsWith('millisecond') ? val : val * 1000;
    } else {
      const fallback = parseFloat(str.replace(/[^0-9.]/g, ''));
      if (!isNaN(fallback)) {
        const isSeconds = /\b(s|sec|secs|seconds?)\b/i.test(str) && !/ms/i.test(str);
        latNum = isSeconds ? fallback * 1000 : fallback;
      }
    }
  }

  // Real LLM inference latency in ms is never < 5ms; values like 0.71 / 0.724 indicate a shifted score column
  if (isNaN(latNum) || latNum < 5) {
    return { invalid: true, reason: `latency appears shifted or invalid ("${rawVal}" -> ${latNum} ms)` };
  }
  return {
    invalid: false,
    latNum,
    latStr: `${latNum.toFixed(2)} ms`,
  };
}

function parseRow(row, rowIndex, skippedRows) {
  // Row structure:
  // [Date, Author, Model Name, Parameters, Size, Provider, Finance, Cyber Security, Developer, Enterprise_ops, Healthcare, Legal, Math, Reasoning, Accuracy, Semantic, Latency, Factuality, Hallucination, Safety, Reliability, DRS]
  if (!row) return null;
  const modelName = normalizeModelName(row[2]);
  if (!modelName) return null;

  const excelRowNum = rowIndex + 1;

  // Skip rows that have no evaluation metrics populated at all
  const metricCells = row.slice(14, 22);
  const allMetricsEmpty = metricCells.every((c) => c === undefined || c === null || cleanWhitespace(c) === '');
  if (allMetricsEmpty) {
    skippedRows.push({ row: excelRowNum, model: modelName, reason: 'no evaluation metrics populated' });
    return null;
  }

  const acc = parseScoreMetric(row[14], 'accuracy');
  const sem = parseScoreMetric(row[15], 'semantic');
  const lat = parseLatency(row[16]);
  const fact = parseScoreMetric(row[17], 'factuality');
  const hall = parseScoreMetric(row[18], 'hallucination');
  const safe = parseScoreMetric(row[19], 'safety');
  const rel = parseScoreMetric(row[20], 'reliability');
  const drs = parseScoreMetric(row[21], 'drs');

  const errors = [];
  if (acc.invalid || acc.missing) errors.push(acc.reason || 'accuracy missing');
  if (sem.invalid || sem.missing) errors.push(sem.reason || 'semantic missing');
  if (lat.invalid) errors.push(lat.reason);
  if (fact.invalid || fact.missing) errors.push(fact.reason || 'factuality missing');
  if (hall.invalid) errors.push(hall.reason); // hallucination may occasionally be blank; allow missing -> '-'
  if (safe.invalid || safe.missing) errors.push(safe.reason || 'safety missing');
  if (rel.invalid || rel.missing) errors.push(rel.reason || 'reliability missing');
  if (drs.invalid || drs.missing) errors.push(drs.reason || 'drs missing');

  if (errors.length > 0) {
    skippedRows.push({ row: excelRowNum, model: modelName, reason: errors.join('; ') });
    return null;
  }

  const params = normalizeParams(row[3]);
  const size = normalizeSize(row[4]);
  const lab = normalizeLab(row[5], modelName);

  return {
    rowIndex,
    name: modelName,
    params,
    size,
    lab,
    accuracyNum: acc.value,
    accuracy: (acc.value * 100).toFixed(1) + '%',
    semanticNum: sem.value,
    semantic: sem.value.toFixed(3),
    latencyNum: lat.latNum,
    latency: lat.latStr,
    factualityNum: fact.value,
    factuality: fact.value.toFixed(3),
    hallucinationNum: hall.missing ? null : hall.value,
    hallucination: hall.missing ? '-' : (hall.value * 100).toFixed(1) + '%',
    safetyNum: safe.value,
    safety: safe.value.toFixed(3),
    reliabilityNum: rel.value,
    reliability: rel.value.toFixed(3),
    drsNum: drs.value,
    drs: drs.value.toFixed(3),
    finance: row[6] !== undefined && row[6] !== null ? row[6] : null,
    cybersecurity: row[7] !== undefined && row[7] !== null ? row[7] : null,
  };
}

async function sync(customBufferOrPath) {
  let buf;
  if (Buffer.isBuffer(customBufferOrPath)) {
    buf = customBufferOrPath;
    fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
  } else if (typeof customBufferOrPath === 'string' && fs.existsSync(customBufferOrPath)) {
    buf = fs.readFileSync(customBufferOrPath);
    fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
  } else if (process.argv[2] && fs.existsSync(process.argv[2])) {
    console.log(`[Sync] Reading Excel file from CLI argument: ${process.argv[2]}`);
    buf = fs.readFileSync(process.argv[2]);
    fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
  } else if (process.env.TRACKER_FILE_BASE64) {
    console.log(`[Sync] Reading Excel file from TRACKER_FILE_BASE64 environment variable...`);
    buf = Buffer.from(process.env.TRACKER_FILE_BASE64, 'base64');
    fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_BACKUP_PATH, buf);
  } else {
    buf = await fetchExcelBuffer(TRACKER_URL);
  }
  const wb = xlsx.read(buf, { type: 'buffer' });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  console.log(`[Sync] Parsing sheet "${sheetName}" with ${rows.length} total rows...`);

  const parsedRuns = [];
  const skippedRows = [];
  // Row 0-3 are titles and headers; data starts at index 4
  for (let i = 4; i < rows.length; i++) {
    const parsed = parseRow(rows[i], i, skippedRows);
    if (parsed) parsedRuns.push(parsed);
  }

  console.log(`[Sync] Extracted ${parsedRuns.length} valid evaluation runs.`);
  if (skippedRows.length > 0) {
    console.warn(`[Sync] Skipped ${skippedRows.length} invalid/incomplete row(s):`);
    for (const s of skippedRows) {
      console.warn(`  - Row ${s.row} (${s.model}): ${s.reason}`);
    }
  }

  // 1. Group for AGGREGATED_MODELS
  const grouped = {};
  for (const r of parsedRuns) {
    const key = `${r.name}___${r.params}`;
    if (!grouped[key]) {
      grouped[key] = {
        name: r.name,
        params: r.params,
        size: r.size,
        lab: r.lab,
        runs: []
      };
    }
    grouped[key].runs.push(r);
  }

  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const seenIds = new Set();
  const aggregatedModels = Object.values(grouped).map((g) => {
    const accAvg = avg(g.runs.map((r) => r.accuracyNum));
    const semAvg = avg(g.runs.map((r) => r.semanticNum));
    const latAvg = avg(g.runs.map((r) => r.latencyNum));
    const factAvg = avg(g.runs.map((r) => r.factualityNum));
    const validHalls = g.runs.map((r) => r.hallucinationNum).filter((v) => v !== null);
    const hallAvg = validHalls.length ? avg(validHalls) : null;
    const safeAvg = avg(g.runs.map((r) => r.safetyNum));
    const relAvg = avg(g.runs.map((r) => r.reliabilityNum));
    const drsAvg = avg(g.runs.map((r) => r.drsNum));

    const baseId = `${g.name}-${g.params}`.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    let uniqueId = baseId;
    let counter = 1;
    while (seenIds.has(uniqueId)) {
      counter++;
      uniqueId = `${baseId}-${counter}`;
    }
    seenIds.add(uniqueId);

    return {
      id: uniqueId,
      name: g.name,
      params: g.params,
      size: g.size,
      lab: g.lab,
      runsCount: g.runs.length,
      accuracy: (accAvg * 100).toFixed(1) + '%',
      accuracyNum: Math.round(accAvg * 1000) / 1000,
      semantic: semAvg.toFixed(3),
      latency: Math.round(latAvg) + ' ms',
      factuality: factAvg.toFixed(3),
      hallucination: hallAvg === null ? '-' : (hallAvg * 100).toFixed(1) + '%',
      safety: safeAvg.toFixed(3),
      reliability: relAvg.toFixed(3),
      drs: drsAvg.toFixed(3),
      drsNum: Math.round(drsAvg * 1000) / 1000,
      rawRuns: g.runs.map((r, rIdx) => ({
        runIndex: rIdx + 1,
        accuracy: (r.accuracyNum * 100).toFixed(1) + '%',
        accuracyNum: r.accuracyNum,
        semantic: r.semanticNum.toFixed(3),
        latency: r.latency,
        factuality: r.factualityNum.toFixed(3),
        hallucination: r.hallucination,
        safety: r.safetyNum.toFixed(3),
        reliability: r.reliabilityNum.toFixed(3),
        drs: r.drsNum.toFixed(3)
      }))
    };
  });

  aggregatedModels.sort((a, b) => b.drsNum - a.drsNum);
  aggregatedModels.forEach((m, idx) => {
    m.rank = `${idx + 1}/${aggregatedModels.length}`;
  });

  // 2. All Benchmark Runs
  const allRunsFlattened = parsedRuns.map((r, idx) => ({
    id: `run-${idx + 1}`,
    name: r.name,
    params: r.params,
    size: r.size,
    lab: r.lab,
    accuracy: (r.accuracyNum * 100).toFixed(1) + '%',
    accuracyNum: r.accuracyNum,
    semantic: r.semanticNum.toFixed(3),
    latency: r.latency,
    factuality: r.factualityNum.toFixed(3),
    hallucination: r.hallucination,
    safety: r.safetyNum.toFixed(3),
    reliability: r.reliabilityNum.toFixed(3),
    drs: r.drsNum.toFixed(3),
    drsNum: r.drsNum,
    runNumber: idx + 1
  }));

  allRunsFlattened.sort((a, b) => b.drsNum - a.drsNum);
  allRunsFlattened.forEach((r, idx) => {
    r.rank = `${idx + 1}/${allRunsFlattened.length}`;
  });

  // Write src/components/modelBenchmarkData.ts
  const modelBenchmarkTs = `// Generated model benchmark evaluation dataset from OpenVals evaluation runs
// Auto-generated by scripts/syncTracker.js

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

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'modelBenchmarkData.ts'), modelBenchmarkTs);
  console.log(`[Sync] Updated src/components/modelBenchmarkData.ts (${aggregatedModels.length} models, ${allRunsFlattened.length} runs)`);

  // 3. Update Real World Benchmarks (MODELS in realWorldBenchmarksData.ts)
  // Pick representative / top run for each lab or top models
  const labMap = {};
  aggregatedModels.forEach((m) => {
    let normLab = m.lab;
    if (!labMap[normLab] || labMap[normLab].accuracyNum < m.accuracyNum) {
      labMap[normLab] = m;
    }
  });

  const rwbModels = Object.keys(LAB_CONFIGS)
    .filter((lab) => labMap[lab])
    .map((lab) => {
      const m = labMap[lab];
      const cfg = LAB_CONFIGS[lab];
      const latNum = parseFloat(m.latency.replace(/[^0-9.]/g, '')) || 2000;
      const accNum = m.accuracyNum * 100;
      const semNum = parseFloat(m.semantic) * 100;
      const factNum = parseFloat(m.factuality) * 100;
      const hallParsed = parseFloat(m.hallucination.replace('%', ''));
      const hallNum = isNaN(hallParsed) ? 0 : hallParsed;
      const safeNum = parseFloat(m.safety) * 100;
      const relNum = parseFloat(m.reliability) * 100;
      const drsNum = parseFloat(m.drs) * 100;

      return {
        id: m.id,
        name: cfg.displayName,
        version: cfg.version,
        lab: lab,
        score: Math.round(accNum * 10) / 10,
        displayScore: accNum.toFixed(1) + '%',
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
          finance: safeNum.toFixed(1) + '%',
          software: factNum.toFixed(1) + '%',
          cybersecurity: m.hallucination,
          mentalHealth: drsNum.toFixed(1) + '%'
        },
        semantic: Math.round(semNum * 10) / 10,
        semanticLabel: semNum.toFixed(1) + '%',
        factuality: Math.round(factNum * 10) / 10,
        factualityLabel: factNum.toFixed(1) + '%',
        hallucination: Math.round(hallNum * 10) / 10,
        hallucinationLabel: hallNum.toFixed(1) + '%',
        safety: Math.round(safeNum * 10) / 10,
        safetyLabel: safeNum.toFixed(1) + '%',
        reliability: Math.round(relNum * 10) / 10,
        reliabilityLabel: relNum.toFixed(1) + '%',
        drs: Math.round(drsNum * 10) / 10,
        drsLabel: drsNum.toFixed(1) + '%'
      };
    })
    .sort((a, b) => b.score - a.score);

  let maxDateSerial = 0;
  for (let i = 4; i < rows.length; i++) {
    if (rows[i] && typeof rows[i][0] === 'number') {
      maxDateSerial = Math.max(maxDateSerial, rows[i][0]);
    }
  }
  let latestDateFormatted = "OCT 9, 2026";
  if (maxDateSerial > 0) {
    const d = new Date((maxDateSerial - 25569) * 86400 * 1000);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    latestDateFormatted = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  }

  const rwbTs = `export interface ModelData {
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
}

export const LATEST_BENCHMARK_DATE = "${latestDateFormatted}";

export const MODELS: ModelData[] = ${JSON.stringify(rwbModels, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'realWorldBenchmarksData.ts'), rwbTs);
  console.log(`[Sync] Updated src/components/realWorldBenchmarksData.ts (${rwbModels.length} models, latest date: ${latestDateFormatted})`);

  console.log(`[Sync] All benchmark and model registry data updated successfully!`);
  return {
    parsedRunsCount: parsedRuns.length,
    aggregatedCount: Object.keys(grouped).length,
    rwbCount: rwbModels.length,
    latestDate: latestDateFormatted
  };
}

if (require.main === module) {
  sync().catch((err) => {
    console.error('[Sync Error]', err);
    process.exit(1);
  });
}

module.exports = { sync };
