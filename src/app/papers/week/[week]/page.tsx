import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import PapersView from "../../PapersView";
import { keyFromSegment, periodHref, periodTitle } from "../../papersDates";

export const revalidate = 60;

type Params = { params: Promise<{ week: string }> };

/** /papers/week/2026-W46 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { week } = await params;
  const key = keyFromSegment(week, "week");
  if (!key) return {};
  const label = periodTitle(key, "week");
  return createPageMetadata({
    title: `Daily Papers — ${label.charAt(0).toUpperCase()}${label.slice(1)}`,
    description: `OpenVals research notes and briefs on AI assurance, validation, security and governance published in the ${label}.`,
    path: periodHref(key, "week"),
  });
}

export default async function PapersPeriodPage({ params }: Params) {
  const { week } = await params;
  const key = keyFromSegment(week, "week");
  if (!key) notFound();
  return <PapersView period="week" periodKeyValue={key} />;
}
