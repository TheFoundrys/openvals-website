import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import {
  AIxlenceDocsContent,
  aixlencePageIds,
  aixlencePageMeta,
  isAIxlenceDocsPageId,
} from "../AIxlenceDocsContent";

type AIxlenceDocsSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return aixlencePageIds
    .filter((id) => id !== "overview")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AIxlenceDocsSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isAIxlenceDocsPageId(slug)) {
    return createPageMetadata({
      title: "AIxLence Docs",
      description: "AIxLence documentation.",
      path: `/aixlence-docs/${slug}`,
    });
  }
  const meta = aixlencePageMeta[slug];
  return createPageMetadata({
    title: meta.title,
    description: meta.subtitle,
    path: `/aixlence-docs/${slug}`,
    keywords: ["AIxLence", meta.group, meta.title, "AI Readiness"],
  });
}

export default async function AIxlenceDocsSlugPage({
  params,
}: AIxlenceDocsSlugPageProps) {
  const { slug } = await params;

  if (!isAIxlenceDocsPageId(slug) || slug === "overview") {
    notFound();
  }

  return <AIxlenceDocsContent pageId={slug} />;
}

