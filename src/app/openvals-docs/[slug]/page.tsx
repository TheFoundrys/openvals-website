import { notFound } from "next/navigation";
import { DocsContent, docsPageIds, isDocsPageId } from "../DocsContent";

type DocsSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docsPageIds
    .filter((id) => id !== "welcome")
    .map((slug) => ({ slug }));
}

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;

  if (!isDocsPageId(slug) || slug === "welcome") {
    notFound();
  }

  return <DocsContent pageId={slug} />;
}
