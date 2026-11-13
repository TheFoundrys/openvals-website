import type { MetadataRoute } from "next";
import { absoluteUrl, publicSitemapEntries } from "@/lib/seo";
import { localBlogPosts } from "@/app/blog/localPosts";
import { docsPageIds } from "@/app/openvals-docs/DocsContent";
import { aixlencePageIds } from "@/app/aixlence-docs/AIxlenceDocsContent";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = publicSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path === "/" ? "" : entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  for (const post of localBlogPosts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug.current}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of docsPageIds.filter((id) => id !== "welcome")) {
    entries.push({
      url: absoluteUrl(`/openvals-docs/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    entries.push({
      url: absoluteUrl(`/docs/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
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
