/* Date helpers for Daily Papers. Everything is UTC on YYYY-MM-DD strings and
   formatted by hand, so server and browser render identical text.

   Period keys (all sort correctly as strings):
     day   → "2026-11-09"
     week  → Monday of the ISO week, "2026-11-09"   (URL: 2026-W46)
     month → "2026-11"                              (URL: 2026-11)          */

export type Period = "day" | "week" | "month";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const WEEK_RE = /^(\d{4})-W(\d{1,2})$/;
const MONTH_RE = /^(\d{4})-(\d{2})$/;

function parseDay(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function toDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(day: string, n: number): string {
  const date = parseDay(day);
  date.setUTCDate(date.getUTCDate() + n);
  return toDay(date);
}

/** Monday of the ISO week containing `day` */
function weekStart(day: string): string {
  return addDays(day, -((parseDay(day).getUTCDay() + 6) % 7));
}

export function periodKey(day: string, period: Period): string {
  if (period === "day") return day;
  if (period === "week") return weekStart(day);
  return day.slice(0, 7);
}

/** First day covered by a period key */
export function keyStartDay(key: string, period: Period): string {
  return period === "month" ? `${key}-01` : key;
}

/* ── URL segments ───────────────────────────────────────────────────── */

export function isoWeekSegment(monday: string): string {
  // ISO week-year is the year of that week's Thursday
  const thursday = parseDay(addDays(monday, 3));
  const year = thursday.getUTCFullYear();
  const jan1 = Date.UTC(year, 0, 1);
  const week = Math.floor((thursday.getTime() - jan1) / 86_400_000 / 7) + 1;
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/** URL segment → period key, or null if malformed */
export function keyFromSegment(segment: string, period: Period): string | null {
  if (period === "day") {
    const m = segment.match(DAY_RE);
    if (!m) return null;
    return toDay(parseDay(segment)) === segment ? segment : null;
  }
  if (period === "week") {
    const m = segment.match(WEEK_RE);
    if (!m) return null;
    const year = Number(m[1]);
    const week = Number(m[2]);
    if (week < 1 || week > 53) return null;
    // Week 1 is the week containing Jan 4
    const monday = addDays(weekStart(`${year}-01-04`), (week - 1) * 7);
    return isoWeekSegment(monday) === `${year}-W${String(week).padStart(2, "0")}` ? monday : null;
  }
  const m = segment.match(MONTH_RE);
  if (!m || Number(m[2]) < 1 || Number(m[2]) > 12) return null;
  return segment;
}

export function periodHref(key: string, period: Period): string {
  if (period === "day") return `/papers/date/${key}`;
  if (period === "week") return `/papers/week/${isoWeekSegment(key)}`;
  return `/papers/month/${key}`;
}

/* ── Labels (Hugging Face style: "Nov 27", "Nov 22-28", "November") ─── */

export function formatShortDay(day: string): string {
  const d = parseDay(day);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function formatLongDay(day: string): string {
  return `${formatShortDay(day)}, ${parseDay(day).getUTCFullYear()}`;
}

export function periodLabel(key: string, period: Period): string {
  if (period === "day") return formatShortDay(key);
  if (period === "month") return MONTHS_LONG[Number(key.slice(5, 7)) - 1];
  const start = parseDay(key);
  const end = parseDay(addDays(key, 6));
  return start.getUTCMonth() === end.getUTCMonth()
    ? `${MONTHS_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}-${end.getUTCDate()}`
    : `${formatShortDay(key)}-${formatShortDay(addDays(key, 6))}`;
}

/** Long form for page titles and screen readers */
export function periodTitle(key: string, period: Period): string {
  const year = key.slice(0, 4);
  if (period === "day") return formatLongDay(key);
  if (period === "month") return `${MONTHS_LONG[Number(key.slice(5, 7)) - 1]} ${year}`;
  return `week of ${formatLongDay(key)}`;
}
