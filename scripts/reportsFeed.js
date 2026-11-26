/**
 * Latest Reports feed — called by syncTracker.js on every sync.
 *
 * One entry per model per evaluation day: how many runs were added that day,
 * the model's mean DRS before and after them, whether it is a new model, and
 * whether those runs took it past the run threshold onto the leaderboard.
 */

const FEED_DAYS = 14;

const round1 = (n) => Math.round(n * 10) / 10;
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

/** Sheet date cell → "YYYY-MM-DD". Excel serials, or text typed as M/D/YYYY (also with \ . -). */
function parseRunDate(cell) {
  if (typeof cell === 'number' && Number.isFinite(cell) && cell > 0) {
    return new Date(Math.round((cell - 25569) * 86400 * 1000)).toISOString().slice(0, 10);
  }
  if (typeof cell === 'string') {
    const m = cell.trim().match(/^(\d{1,2})[\\/.-](\d{1,2})[\\/.-](\d{4})$/);
    if (m) {
      const [, month, day, year] = m.map(Number);
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
  }
  return null;
}

/**
 * @param aggregatedModels AGGREGATED_MODELS (rawRuns carry `date` and `drs`)
 * @param leaderboardRows  ranked rows from buildLeaderboard
 * @param minRuns          runs needed to be ranked
 */
function buildReportsFeed(aggregatedModels, leaderboardRows, minRuns) {
  const rowByKey = new Map(leaderboardRows.map((r) => [r.key, r]));
  const entries = [];

  for (const m of aggregatedModels) {
    const key = `${m.name}|${m.params}`;
    const ranked = rowByKey.get(key);
    const drsOf = (r) => parseFloat(r.drs) * 100;

    // Undated runs can't be placed on a day; count them as already known
    const cumulative = m.rawRuns.filter((r) => !r.date).map(drsOf).filter(Number.isFinite);

    const byDate = new Map();
    for (const r of m.rawRuns) {
      if (!r.date) continue;
      if (!byDate.has(r.date)) byDate.set(r.date, []);
      byDate.get(r.date).push(drsOf(r));
    }

    for (const date of [...byDate.keys()].sort()) {
      const dayValues = byDate.get(date).filter(Number.isFinite);
      if (!dayValues.length) continue;
      const runsBefore = cumulative.length;
      const drsBefore = runsBefore ? mean(cumulative) : null;
      cumulative.push(...dayValues);
      const runsAfter = cumulative.length;

      entries.push({
        date,
        modelId: m.id,
        key,
        name: m.name,
        params: m.params ? m.params.toUpperCase() : '',
        lab: m.lab,
        runsAdded: dayValues.length,
        runsAfter,
        drsDay: round1(mean(dayValues)),
        drsBefore: drsBefore === null ? null : round1(drsBefore),
        drsAfter: round1(mean(cumulative)),
        isNewModel: runsBefore === 0,
        becameRanked: runsBefore < minRuns && runsAfter >= minRuns,
        rankNow: ranked ? ranked.rank : null,
        runsNow: m.runsCount,
      });
    }
  }

  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
  const keep = new Set(dates.slice(0, FEED_DAYS));
  const feed = entries
    .filter((e) => keep.has(e.date))
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        Number(b.becameRanked) - Number(a.becameRanked) ||
        Number(b.isNewModel) - Number(a.isNewModel) ||
        b.drsAfter - a.drsAfter ||
        a.name.localeCompare(b.name)
    );

  return {
    entries: feed,
    meta: {
      latestDate: dates[0] || null,
      oldestDate: dates.slice(0, FEED_DAYS).pop() || null,
      days: Math.min(FEED_DAYS, dates.length),
      totalEvaluationDays: dates.length,
      runs: feed.reduce((a, e) => a + e.runsAdded, 0),
      models: new Set(feed.map((e) => e.key)).size,
      newModels: feed.filter((e) => e.isNewModel).length,
      newlyRanked: feed.filter((e) => e.becameRanked).length,
      minRuns,
    },
  };
}

module.exports = { buildReportsFeed, parseRunDate, FEED_DAYS };
