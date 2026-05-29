import { notFound } from "next/navigation";
import { DocsContent, isDocsPageId } from "../DocsContent";

type DocsSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DocsSlugPage({ params }: DocsSlugPageProps) {
  const { slug } = await params;

  if (!isDocsPageId(slug) || slug === "welcome") {
    notFound();
  }

  return <DocsContent pageId={slug} />;
}
