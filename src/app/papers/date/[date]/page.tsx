import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import PapersView from "../../PapersView";
import { keyFromSegment, periodHref, periodTitle } from "../../papersDates";

export const revalidate = 60;

type Params = { params: Promise<{ date: string }> };

/** /papers/date/2026-11-09 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { date } = await params;
  const key = keyFromSegment(date, "day");
  if (!key) return {};
  const label = periodTitle(key, "day");
  return createPageMetadata({
    title: `Daily Papers — ${label.charAt(0).toUpperCase()}${label.slice(1)}`,
    description: `OpenVals research notes and briefs on AI assurance, validation, security and governance published on ${label}.`,
    path: periodHref(key, "day"),
  });
}

export default async function PapersPeriodPage({ params }: Params) {
  const { date } = await params;
  const key = keyFromSegment(date, "day");
  if (!key) notFound();
  return <PapersView period="day" periodKeyValue={key} />;
}
