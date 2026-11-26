const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { buildLeaderboard, buildValsIndex } = require('./leaderboard');
const { buildReportsFeed, parseRunDate } = require('./reportsFeed');

const DEFAULT_SHAREPOINT_URL =
  'https://techoptima1-my.sharepoint.com/:x:/g/personal/krishna_avula_techoptima_ai/IQBjWJjpczJyR7-ReQj5TzqtAc2o0S7BFX68DN2pQ8qOvMU?download=1';

const TRACKER_URL = process.env.TRACKER_EXCEL_URL || DEFAULT_SHAREPOINT_URL;
const LOCAL_BACKUP_PATH = path.join(__dirname, '..', 'scratch', 'tracker.xlsx');
const LEADERBOARD_HISTORY_PATH = path.join(__dirname, 'leaderboard-history.json');

async function fetchExcelBuffer(url) {
  try {
    let downloadUrl = url;
    if (!downloadUrl.includes('download=1')) {
      downloadUrl += (downloadUrl.includes('?') ? '&' : '?') + 'download=1';
    }

    console.log(`[Sync] Fetching Excel file from SharePoint (${downloadUrl})...`);
    const r1 = await fetch(downloadUrl, { redirect: 'manual' });
    if (r1.status === 302 || r1.status === 301) {
      const loc = r1.headers.get('location');
      const cookies = r1.headers.getSetCookie ? r1.headers.getSetCookie().join('; ') : r1.headers.get('set-cookie');
      const origin = new URL(downloadUrl).origin;
      const nextUrl = new URL(loc, origin).toString();
      const r2 = await fetch(nextUrl, {
        headers: cookies ? { cookie: cookies } : {},
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

// Lab brand colours for the OpenVals Index chart (labs not listed get a fallback colour)
const LAB_COLORS = {
  'Agentica': '#f43f5e',
  'Tencent': '#475569',
  'IBM': '#1d4ed8',
  'Prism ML': '#10b981',
  'Liquid AI': '#06b6d4',
  'QVAC': '#9333ea',
  'Hugging Face': '#f59e0b',
  'Google': '#059669',
  'Meta': '#2563eb',
  'Microsoft': '#0284c7',
  'Open Source': '#64748b',
  'Alibaba': '#ea580c',
  'TII': '#38bdf8',
  '01.AI': '#3b82f6',
  'Deepseek': '#4f46e5',
  'Mistral AI': '#eab308',
  'Stability AI': '#a855f7',
  'Nous Research': '#6366f1',
  'Doey LLM': '#d97706',
  'Big Science': '#71717a',
  'Supra': '#84cc16',
  'PROMTECH Inc': '#ca8a04',
  'North ML': '#0d9488',
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

// Publisher namespaces in model names (e.g. "liquidai/lfm2.5-350m") identify the
// lab unambiguously, so they win over the sheet's Provider column, which is
// hand-entered and sometimes inconsistent across runs of the same model.
const NAMESPACE_LABS = {
  liquidai: 'Liquid AI',
  'ibm-granite': 'IBM',
  google: 'Google',
  'meta-llama': 'Meta',
  microsoft: 'Microsoft',
  qwen: 'Alibaba',
  mistralai: 'Mistral AI',
  'deepseek-ai': 'Deepseek',
  huggingfacetb: 'Hugging Face',
};

function normalizeLab(rawLab, modelName) {
  const name = (modelName || '').toLowerCase();
  if (name.includes('/')) {
    const nsLab = NAMESPACE_LABS[name.split('/')[0]];
    if (nsLab) return nsLab;
  }

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
    date: parseRunDate(row[0]),
    name: modelName,
    params,
    size,
    lab,
    accuracyNum: acc.value,
    accuracy: acc.value.toFixed(3),
    semanticNum: sem.value,
    semantic: sem.value.toFixed(3),
    latencyNum: lat.latNum,
    latency: lat.latStr,
    factualityNum: fact.value,
    factuality: fact.value.toFixed(3),
    hallucinationNum: hall.missing ? null : hall.value,
    hallucination: hall.missing ? '-' : hall.value.toFixed(3),
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
      accuracy: accAvg.toFixed(3),
      accuracyNum: Math.round(accAvg * 1000) / 1000,
      semantic: semAvg.toFixed(3),
      latency: Math.round(latAvg) + ' ms',
      factuality: factAvg.toFixed(3),
      hallucination: hallAvg === null ? '-' : hallAvg.toFixed(3),
      safety: safeAvg.toFixed(3),
      reliability: relAvg.toFixed(3),
      drs: drsAvg.toFixed(3),
      drsNum: Math.round(drsAvg * 1000) / 1000,
      rawRuns: g.runs.map((r, rIdx) => ({
        runIndex: rIdx + 1,
        accuracy: r.accuracyNum.toFixed(3),
        accuracyNum: r.accuracyNum,
        semantic: r.semanticNum.toFixed(3),
        latency: r.latency,
        factuality: r.factualityNum.toFixed(3),
        hallucination: r.hallucination,
        safety: r.safetyNum.toFixed(3),
        reliability: r.reliabilityNum.toFixed(3),
        drs: r.drsNum.toFixed(3),
        date: r.date
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
    accuracy: r.accuracyNum.toFixed(3),
    accuracyNum: r.accuracyNum,
    semantic: r.semanticNum.toFixed(3),
    latency: r.latency,
    factuality: r.factualityNum.toFixed(3),
    hallucination: r.hallucination,
    safety: r.safetyNum.toFixed(3),
    reliability: r.reliabilityNum.toFixed(3),
    drs: r.drsNum.toFixed(3),
    drsNum: r.drsNum,
    runNumber: idx + 1,
    date: r.date
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
  /** Evaluation date, YYYY-MM-DD (null if the sheet cell was unreadable) */
  date: string | null;
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
  date: string | null;
}

export const AGGREGATED_MODELS: AggregatedModel[] = ${JSON.stringify(aggregatedModels, null, 2)};

export const ALL_BENCHMARK_RUNS: RawBenchmarkRun[] = ${JSON.stringify(allRunsFlattened, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'modelBenchmarkData.ts'), modelBenchmarkTs);
  console.log(`[Sync] Updated src/components/modelBenchmarkData.ts (${aggregatedModels.length} models, ${allRunsFlattened.length} runs)`);

  // 3. Snapshot date = date of the latest evaluation run in the sheet
  let maxDateSerial = 0;
  for (let i = 4; i < rows.length; i++) {
    if (rows[i] && typeof rows[i][0] === 'number') {
      maxDateSerial = Math.max(maxDateSerial, rows[i][0]);
    }
  }
  let latestDateFormatted = 'UNKNOWN DATE';
  let leaderboardVersion = 'unversioned';
  if (maxDateSerial > 0) {
    const d = new Date((maxDateSerial - 25569) * 86400 * 1000);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    latestDateFormatted = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
    const pad = (n) => String(n).padStart(2, '0');
    leaderboardVersion = `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
  }

  // 4. Leaderboard (DRS ranking, confidence intervals, tiers, rank change)
  let history = [];
  if (fs.existsSync(LEADERBOARD_HISTORY_PATH)) {
    try {
      history = JSON.parse(fs.readFileSync(LEADERBOARD_HISTORY_PATH, 'utf8'));
    } catch (err) {
      console.warn(`[Sync] Could not read leaderboard history (${err.message}); starting fresh.`);
    }
  }
  const leaderboard = buildLeaderboard(aggregatedModels, {
    version: leaderboardVersion,
    dateLabel: latestDateFormatted,
    history,
  });
  fs.writeFileSync(LEADERBOARD_HISTORY_PATH, JSON.stringify(leaderboard.history, null, 2) + '\n');

  const leaderboardTs = `// Auto-generated by scripts/syncTracker.js (rules: scripts/leaderboard.js). Do not edit.

export interface LeaderboardRow {
  /** name|params — same grouping key as AGGREGATED_MODELS */
  key: string;
  id: string;
  name: string;
  params: string;
  size: string;
  lab: string;
  runs: number;
  /** Mean DRS Trust Score across runs, 0–100 */
  drs: number;
  /** Half-width of the 95% confidence interval of the mean DRS */
  drsCi: number | null;
  /** Shared on equal displayed score */
  rank: number;
  /** Models in one tier are not statistically separable from the tier leader */
  tier: number;
  /** Rank in the previous leaderboard version; null if not ranked then */
  previousRank: number | null;
  /** Newly ranked since the previous version */
  isNew: boolean;
  accuracy: number | null;
  semantic: number | null;
  factuality: number | null;
  hallucination: number | null;
  safety: number | null;
  reliability: number | null;
  latencyMs: number | null;
  latencyLabel: string;
}

export const LEADERBOARD_META = ${JSON.stringify(leaderboard.meta, null, 2)} as const;

/** Ranked models only (${leaderboard.meta.minRuns}+ runs), in leaderboard order */
export const LEADERBOARD_ROWS: LeaderboardRow[] = ${JSON.stringify(leaderboard.rows, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'leaderboardData.ts'), leaderboardTs);
  console.log(
    `[Sync] Updated src/components/leaderboardData.ts (v${leaderboard.meta.version}: ${leaderboard.meta.rankedCount} ranked, ` +
      `${leaderboard.meta.preliminaryCount} preliminary, ${leaderboard.meta.tierCount} tiers` +
      `${leaderboard.meta.previousVersion ? `, compared with v${leaderboard.meta.previousVersion}` : ''})`
  );

  // 5. OpenVals Index (accuracy vs latency / DRS scatter of the ranked models)
  const valsIndex = buildValsIndex(leaderboard.rows, LAB_COLORS);
  const valsIndexTs = `// Auto-generated by scripts/syncTracker.js from the leaderboard. Do not edit.

export interface ValsIndexModel {
  id: string;
  name: string;
  shortName: string;
  version?: string;
  lab: string;
  labKey: string;
  accuracy: number; // %
  latency: number; // ms
  latencyLabel: string;
  drs: number; // 0–100
  drsLabel: string;
  drsCi: number | null;
  runs: number;
  rank: number;
  tier: number;
  /** On the accuracy-vs-latency Pareto frontier */
  onFrontier: boolean;
  badgeColor: string;
  badgeTextColor: string;
}

export interface LabLegendItem {
  key: string;
  label: string;
  color: string;
}

export const LAB_LEGENDS: LabLegendItem[] = ${JSON.stringify(valsIndex.legends, null, 2)};

export const VALS_INDEX_MODELS: ValsIndexModel[] = ${JSON.stringify(valsIndex.models, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'valsIndexData.ts'), valsIndexTs);
  console.log(`[Sync] Updated src/components/valsIndexData.ts (${valsIndex.models.length} models, ${valsIndex.legends.length} labs)`);

  // 6. Latest Reports feed (newest evaluations, per model per day)
  const feed = buildReportsFeed(aggregatedModels, leaderboard.rows, leaderboard.meta.minRuns);
  const undatedRuns = parsedRuns.filter((r) => !r.date).length;
  if (undatedRuns) console.warn(`[Sync] ${undatedRuns} run(s) have an unreadable date and are left out of the feed.`);
  const feedTs = `// Auto-generated by scripts/syncTracker.js (rules: scripts/reportsFeed.js). Do not edit.

export interface ReportFeedEntry {
  /** Evaluation day, YYYY-MM-DD */
  date: string;
  /** AGGREGATED_MODELS id (links to /models?model=…) */
  modelId: string;
  key: string;
  name: string;
  params: string;
  lab: string;
  runsAdded: number;
  /** Model's run count after this day */
  runsAfter: number;
  /** Mean DRS of this day's runs, 0–100 */
  drsDay: number;
  /** Model's mean DRS before / after this day's runs; before is null for a new model */
  drsBefore: number | null;
  drsAfter: number;
  isNewModel: boolean;
  /** This day's runs took the model to the run threshold */
  becameRanked: boolean;
  /** Current leaderboard rank, null if still preliminary */
  rankNow: number | null;
  runsNow: number;
}

export const REPORTS_FEED_META = ${JSON.stringify(feed.meta, null, 2)} as const;

/** Newest first; covers the last ${feed.meta.days} evaluation days */
export const REPORTS_FEED: ReportFeedEntry[] = ${JSON.stringify(feed.entries, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'reportsFeedData.ts'), feedTs);
  console.log(
    `[Sync] Updated src/components/reportsFeedData.ts (${feed.entries.length} entries over ${feed.meta.days} days, ` +
      `${feed.meta.newModels} new models, ${feed.meta.newlyRanked} newly ranked)`
  );

  console.log(`[Sync] All benchmark and model registry data updated successfully!`);
  return {
    parsedRunsCount: parsedRuns.length,
    aggregatedCount: Object.keys(grouped).length,
    rankedCount: leaderboard.meta.rankedCount,
    latestDate: latestDateFormatted,
  };
}

if (require.main === module) {
  sync().catch((err) => {
    console.error('[Sync Error]', err);
    process.exit(1);
  });
}

module.exports = { sync };
