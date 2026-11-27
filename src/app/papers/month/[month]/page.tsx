import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import PapersView from "../../PapersView";
import { keyFromSegment, periodHref, periodTitle } from "../../papersDates";

export const revalidate = 60;

type Params = { params: Promise<{ month: string }> };

/** /papers/month/2026-11 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { month } = await params;
  const key = keyFromSegment(month, "month");
  if (!key) return {};
  const label = periodTitle(key, "month");
  return createPageMetadata({
    title: `Daily Papers — ${label.charAt(0).toUpperCase()}${label.slice(1)}`,
    description: `OpenVals research notes and briefs on AI assurance, validation, security and governance published in ${label}.`,
    path: periodHref(key, "month"),
  });
}

export default async function PapersPeriodPage({ params }: Params) {
  const { month } = await params;
  const key = keyFromSegment(month, "month");
  if (!key) notFound();
  return <PapersView period="month" periodKeyValue={key} />;
}
