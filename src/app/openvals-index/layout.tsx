import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLdScript from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, leaderboardJsonLd } from "@/lib/structuredData";
import { LEADERBOARD_META, RANKED_MODELS } from "@/lib/leaderboard";
import { REPORTS_FEED_META } from "@/components/reportsFeedData";

export const metadata: Metadata = pageMetadata("/openvals-index");

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLdScript
        data={[
          ...leaderboardJsonLd({
            name: "OpenVals Index leaderboard",
            description: `${LEADERBOARD_META.rankedCount} AI models with ${LEADERBOARD_META.minRuns}+ OpenVals evaluation runs, ranked by mean DRS Trust Score with 95% confidence intervals, alongside accuracy and latency.`,
            path: "/openvals-index",
            version: LEADERBOARD_META.version,
            dateModified: REPORTS_FEED_META.latestDate,
            items: RANKED_MODELS.slice(0, 10).map((row, i) => ({
              name: row.params ? `${row.name} (${row.params})` : row.name,
              position: i + 1,
              url: `/models?model=${encodeURIComponent(row.id)}`,
            })),
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "OpenVals Index", path: "/openvals-index" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
