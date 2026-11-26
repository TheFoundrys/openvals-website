/**
 * OpenVals leaderboard generator — called by syncTracker.js on every sync.
 *
 * Rules (the single definition every page uses):
 *  - Score: DRS Trust Score = mean DRS across a model's runs (0–100).
 *  - Eligibility: at least MIN_RUNS_TO_RANK runs, otherwise "Preliminary" (not ranked).
 *  - Uncertainty: 95% confidence interval of the mean (Student's t, n−1 df),
 *    shown as "± x".
 *  - Rank: by mean DRS; equal scores at one decimal share a rank (1, 1, 3),
 *    listed faster-first within a tie.
 *  - Tiers: walking down the ranking, a new tier starts when a model's upper
 *    CI bound falls below the lower CI bound of the current tier's leader —
 *    i.e. models in one tier are not statistically separable from its leader.
 *  - Versions: a snapshot per data date (latest evaluation run). Rank change is
 *    measured against the most recent snapshot with a different version.
 */

const MIN_RUNS_TO_RANK = 3;
const HISTORY_LIMIT = 24;

// Two-sided 95% Student's t critical values by degrees of freedom
const T_95 = {
  1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306,
  9: 2.262, 10: 2.228, 11: 2.201, 12: 2.179, 13: 2.16, 14: 2.145, 15: 2.131,
  16: 2.12, 17: 2.11, 18: 2.101, 19: 2.093, 20: 2.086, 25: 2.06, 30: 2.042,
};

function tCritical(df) {
  if (df <= 0) return Infinity;
  if (T_95[df]) return T_95[df];
  if (df > 30) return 1.96;
  const known = Object.keys(T_95).map(Number).filter((k) => k < df);
  return T_95[Math.max(...known)];
}

const round1 = (n) => Math.round(n * 10) / 10;

function toPct(value) {
  const n = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(n) ? round1(n * 100) : null;
}

function latencyMs(label) {
  const n = parseFloat(String(label).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : null;
}

/** Same grouping key syncTracker uses for AGGREGATED_MODELS */
function modelKey(m) {
  return `${m.name}|${m.params}`;
}

function drsStats(model) {
  const values = (model.rawRuns || [])
    .map((r) => parseFloat(r.drs) * 100)
    .filter(Number.isFinite);
  const n = values.length;
  const mean = n ? values.reduce((a, b) => a + b, 0) / n : (model.drsNum || 0) * 100;
  const sd = n > 1 ? Math.sqrt(values.reduce((a, v) => a + (v - mean) ** 2, 0) / (n - 1)) : 0;
  const ci = n > 1 ? (tCritical(n - 1) * sd) / Math.sqrt(n) : null;
  return { n, mean, ci };
}

/**
 * @param aggregatedModels AGGREGATED_MODELS as built by syncTracker
 * @param opts.version     snapshot id, e.g. "2026.11.23"
 * @param opts.dateLabel   display date, e.g. "NOV 23, 2026"
 * @param opts.history     previous snapshots [{ version, date, ranks: {key: rank} }]
 */
function buildLeaderboard(aggregatedModels, { version, dateLabel, history = [] }) {
  const ranked = aggregatedModels
    .filter((m) => m.runsCount >= MIN_RUNS_TO_RANK)
    .map((m) => {
      const { mean, ci } = drsStats(m);
      return {
        key: modelKey(m),
        id: m.id,
        name: m.name,
        params: m.params ? m.params.toUpperCase() : '',
        size: m.size || '',
        lab: m.lab,
        runs: m.runsCount,
        drs: round1(mean),
        drsCi: ci === null ? null : round1(ci),
        _mean: mean,
        _ci: ci || 0,
        accuracy: toPct(m.accuracyNum),
        semantic: toPct(m.semantic),
        factuality: toPct(m.factuality),
        hallucination: toPct(m.hallucination),
        safety: toPct(m.safety),
        reliability: toPct(m.reliability),
        latencyMs: latencyMs(m.latency),
        latencyLabel: m.latency,
      };
    })
    .sort(
      (a, b) =>
        b.drs - a.drs ||
        (a.latencyMs ?? Infinity) - (b.latencyMs ?? Infinity) ||
        a.name.localeCompare(b.name)
    );

  // Ranks (shared on equal displayed score) and statistical tiers
  let tier = 0;
  let tierLeaderLow = Infinity;
  ranked.forEach((row, i) => {
    const prev = ranked[i - 1];
    row.rank = prev && prev.drs === row.drs ? prev.rank : i + 1;
    if (row._mean + row._ci < tierLeaderLow) {
      tier += 1;
      tierLeaderLow = row._mean - row._ci;
    }
    row.tier = tier;
  });

  // Rank change vs the latest earlier version
  const previous = [...history].reverse().find((s) => s.version !== version) || null;
  for (const row of ranked) {
    row.previousRank = previous ? previous.ranks[row.key] ?? null : null;
    row.isNew = Boolean(previous) && row.previousRank === null;
    delete row._mean;
    delete row._ci;
  }

  const snapshot = {
    version,
    date: dateLabel,
    ranks: Object.fromEntries(ranked.map((r) => [r.key, r.rank])),
  };
  const nextHistory = [...history.filter((s) => s.version !== version), snapshot].slice(-HISTORY_LIMIT);

  return {
    rows: ranked,
    meta: {
      version,
      date: dateLabel,
      previousVersion: previous ? previous.version : null,
      minRuns: MIN_RUNS_TO_RANK,
      rankedCount: ranked.length,
      preliminaryCount: aggregatedModels.length - ranked.length,
      totalModels: aggregatedModels.length,
      tierCount: tier,
    },
    history: nextHistory,
  };
}

// ── OpenVals Index (scatter of ranked models) ──────────────────────────────

// Fallback colours for labs without a configured brand colour
const FALLBACK_LAB_COLORS = [
  '#64748b', '#0ea5e9', '#8b5cf6', '#14b8a6', '#f97316', '#ec4899',
  '#22c55e', '#6366f1', '#e11d48', '#0891b2', '#a16207', '#7c3aed',
];

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function readableTextOn(hex) {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.6 ? '#0f172a' : '#ffffff';
}

/** Models no faster model beats on accuracy (accuracy vs latency Pareto frontier) */
function latencyFrontierIds(rows) {
  const sorted = rows
    .filter((r) => r.latencyMs !== null && r.accuracy !== null)
    .sort((a, b) => a.latencyMs - b.latencyMs);
  const ids = new Set();
  let best = -Infinity;
  for (const r of sorted) {
    if (r.accuracy > best) {
      ids.add(r.id);
      best = r.accuracy;
    }
  }
  return ids;
}

function buildValsIndex(rows, labColors) {
  const colorFor = (lab) =>
    labColors[lab] || FALLBACK_LAB_COLORS[hashString(lab) % FALLBACK_LAB_COLORS.length];
  const frontier = latencyFrontierIds(rows);

  const models = rows.map((r) => {
    const color = colorFor(r.lab);
    return {
      id: r.id,
      name: r.name,
      shortName: r.name,
      version: r.params,
      lab: r.lab,
      labKey: r.lab,
      accuracy: r.accuracy ?? 0,
      latency: r.latencyMs ?? 0,
      latencyLabel: r.latencyLabel,
      drs: r.drs,
      drsLabel: r.drs.toFixed(1),
      drsCi: r.drsCi,
      runs: r.runs,
      rank: r.rank,
      tier: r.tier,
      onFrontier: frontier.has(r.id),
      badgeColor: color,
      badgeTextColor: readableTextOn(color),
    };
  });

  const labCounts = {};
  for (const m of models) labCounts[m.lab] = (labCounts[m.lab] || 0) + 1;
  const legends = Object.keys(labCounts)
    .sort((a, b) => labCounts[b] - labCounts[a] || a.localeCompare(b))
    .map((lab) => ({ key: lab, label: lab, color: colorFor(lab) }));

  return { models, legends };
}

module.exports = { buildLeaderboard, buildValsIndex, MIN_RUNS_TO_RANK };
