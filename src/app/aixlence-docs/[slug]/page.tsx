import { notFound } from "next/navigation";
import {
  AIxlenceDocsContent,
  aixlencePageIds,
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

export default async function AIxlenceDocsSlugPage({
  params,
}: AIxlenceDocsSlugPageProps) {
  const { slug } = await params;

  if (!isAIxlenceDocsPageId(slug) || slug === "overview") {
    notFound();
  }

  return <AIxlenceDocsContent pageId={slug} />;
}

