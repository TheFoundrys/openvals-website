import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLdScript from "@/components/JsonLd";
import { client } from "@/sanity/lib/client";
import { papersQuery } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import PapersBrowser from "./PapersBrowser";
import { buildPapers, type Paper, type SanityPaperPost } from "./papersData";
import { periodHref, periodKey, periodTitle, type Period } from "./papersDates";
import styles from "./papers.module.css";

export async function loadPapers(): Promise<Paper[]> {
  let sanityPosts: SanityPaperPost[] = [];
  try {
    sanityPosts = (await client.fetch<SanityPaperPost[]>(papersQuery)) ?? [];
  } catch (error) {
    // Local posts still render if Sanity is unreachable
    console.error("Failed to fetch posts from Sanity for /papers", error);
  }
  return buildPapers(sanityPosts);
}

/**
 * Daily Papers for one day, ISO week or month. `key` is the period key
 * (see papersDates.ts); null means "the period of the newest paper".
 */
export default async function PapersView({ period, periodKeyValue }: { period: Period; periodKeyValue: string | null }) {
  const papers = await loadPapers();
  const currentKey = periodKeyValue ?? (papers[0] ? periodKey(papers[0].day, period) : null);

  /* Previous / Next jump to the nearest period that has papers, so the
     arrows never land on an empty page. Keys sort as strings. */
  const keys = Array.from(new Set(papers.map((p) => periodKey(p.day, period)))).sort();
  const olderKey = currentKey ? [...keys].reverse().find((k) => k < currentKey) : undefined;
  const newerKey = currentKey ? keys.find((k) => k > currentKey) : undefined;

  /* Switching tabs keeps you on the same stretch of time: the period of the
     other kind that contains the newest paper shown here (or its first day). */
  const inPeriod = currentKey ? papers.filter((p) => periodKey(p.day, period) === currentKey) : [];
  const anchorDay = inPeriod[0]?.day ?? (currentKey ? (period === "month" ? `${currentKey}-01` : currentKey) : null);
  const tabHrefs: Record<Period, string> = {
    day: anchorDay ? periodHref(periodKey(anchorDay, "day"), "day") : "/papers",
    week: anchorDay ? periodHref(periodKey(anchorDay, "week"), "week") : "/papers",
    month: anchorDay ? periodHref(periodKey(anchorDay, "month"), "month") : "/papers",
  };

  const path = currentKey && periodKeyValue ? periodHref(currentKey, period) : "/papers";
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Daily Papers", path: "/papers" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: currentKey ? `Daily Papers — ${periodTitle(currentKey, period)}` : "Daily Papers",
      url: absoluteUrl(path),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: inPeriod.length,
        itemListElement: inPeriod.map((paper, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: paper.external ? paper.href : absoluteUrl(paper.href),
          name: paper.title,
        })),
      },
    },
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <PapersBrowser
            papers={papers}
            period={period}
            currentKey={currentKey}
            olderHref={olderKey ? periodHref(olderKey, period) : null}
            newerHref={newerKey ? periodHref(newerKey, period) : null}
            tabHrefs={tabHrefs}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
