/**
 * OpenVals leaderboard — read-only access to the generated ranking.
 *
 * The ranking is computed once per sync by scripts/leaderboard.js (DRS Trust
 * Score, 3+ runs to rank, 95% confidence intervals, statistical tiers, rank
 * change vs the previous version) and written to src/components/leaderboardData.ts.
 * Every page reads it from here, so they can never disagree.
 */
import {
  LEADERBOARD_META,
  LEADERBOARD_ROWS,
  type LeaderboardRow,
} from "@/components/leaderboardData";

export type { LeaderboardRow };

export { LEADERBOARD_META };

export const MIN_RUNS_TO_RANK = LEADERBOARD_META.minRuns;

/** Ranked models (MIN_RUNS_TO_RANK+ runs), in leaderboard order */
export const RANKED_MODELS: LeaderboardRow[] = LEADERBOARD_ROWS;

export const PRELIMINARY_COUNT = LEADERBOARD_META.preliminaryCount;

/** Same grouping key the sync uses (name + params, case-sensitive) */
export function leaderboardKey(m: { name: string; params: string }): string {
  return `${m.name}|${m.params}`;
}

const BY_KEY = new Map(LEADERBOARD_ROWS.map((row) => [row.key, row]));

/** The ranked row for a model or one of its runs; undefined when preliminary */
export function getLeaderboardRow(m: { name: string; params: string }): LeaderboardRow | undefined {
  return BY_KEY.get(leaderboardKey(m));
}

/** Rank change since the previous version: positive = moved up */
export function rankChange(row: LeaderboardRow): number | null {
  return row.previousRank === null ? null : row.previousRank - row.rank;
}
