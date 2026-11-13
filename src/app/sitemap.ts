import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionIndexingEnabled, publicSitemapEntries } from "@/lib/seo";
import { localBlogPosts } from "@/app/blog/localPosts";
import { docsPageIds } from "@/app/openvals-docs/DocsContent";
import { aixlencePageIds } from "@/app/aixlence-docs/AIxlenceDocsContent";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Avoid advertising preview/staging URLs in sitemaps.
  if (!isProductionIndexingEnabled()) {
    return [];
  }

  const now = new Date();
  const entries: MetadataRoute.Sitemap = publicSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  for (const post of localBlogPosts) {
    // External LinkedIn redirects are not useful sitemap targets.
    if (post.externalUrl) continue;
    entries.push({
      url: absoluteUrl(`/blog/${post.slug.current}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Canonical docs live under /openvals-docs (/docs permanently redirects).
  for (const slug of docsPageIds.filter((id) => id !== "welcome")) {
    entries.push({
      url: absoluteUrl(`/openvals-docs/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of aixlencePageIds.filter((id) => id !== "overview")) {
    entries.push({
      url: absoluteUrl(`/aixlence-docs/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return entries;
}
