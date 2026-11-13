import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import {
  DocsContent,
  docsPageIds,
  docsPageMeta,
  isDocsPageId,
} from "../../openvals-docs/DocsContent";

type DocsSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docsPageIds
    .filter((id) => id !== "welcome")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DocsSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isDocsPageId(slug)) {
    return createPageMetadata({
      title: "Docs",
      description: "OpenVals documentation.",
      path: `/docs/${slug}`,
    });
  }
  const meta = docsPageMeta[slug];
  return createPageMetadata({
    title: meta.title,
    description: `${meta.title} — ${meta.group} documentation for OpenVals AI evaluation and trust scoring.`,
    path: `/docs/${slug}`,
    keywords: ["OpenVals Docs", meta.group, meta.title, "AI Validation"],
  });
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;

  if (!isDocsPageId(slug) || slug === "welcome") {
    notFound();
  }

  return <DocsContent pageId={slug} />;
}
