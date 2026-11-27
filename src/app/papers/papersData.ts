import { urlFor } from "@/sanity/lib/image";
import { blogPostPath, localBlogPosts, toBlogSlug, type LocalBlogPost } from "../blog/localPosts";

/** One card on /papers. Every field comes from an existing blog post; missing data stays missing. */
export type Paper = {
  id: string;
  title: string;
  href: string;
  external: boolean;
  /** Where the full text lives: "LinkedIn", "X" or "OpenVals Blog" */
  source: string;
  /** ISO timestamp */
  publishedAt: string;
  /** YYYY-MM-DD in UTC, used for the date navigator */
  day: string;
  authors: string[];
  abstract: string | null;
  tags: string[];
  imageUrl: string | null;
};

/** Shape returned by `papersQuery` */
export type SanityPaperPost = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any;
  author?: { name?: string } | null;
  categories?: Array<string | null> | null;
  topic?: string | null;
  bodyText?: string | null;
};

const ABSTRACT_MAX = 320;

function sourceFor(href: string, external: boolean): string {
  if (!external) return "OpenVals Blog";
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    if (host.endsWith("linkedin.com")) return "LinkedIn";
    if (host === "x.com" || host.endsWith("twitter.com")) return "X";
    return host;
  } catch {
    return "External";
  }
}

function truncate(text: string, max = ABSTRACT_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).replace(/[,.;:\s]+$/, "")}…`;
}

/**
 * Opening prose of a post body. Keeps only lines that read as sentences
 * (40+ chars ending in . ! ? or a closing quote), which drops the title,
 * headings and subtitle lines, and joins them until there is enough text.
 */
function abstractFromBody(body: string | null | undefined, title: string, slug: string): string | null {
  if (!body) return null;
  const same = (a: string, b: string) => toBlogSlug(a) === toBlogSlug(b);
  const sentences = body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length >= 40 && /[.!?…"”’)]$/.test(line) && !same(line, title) && !same(line, slug));

  let text = "";
  for (const line of sentences) {
    text = text ? `${text} ${line}` : line;
    if (text.length >= ABSTRACT_MAX * 0.6) break;
  }
  return text ? truncate(text) : null;
}

function uniqueTags(tags: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tag of tags) {
    const t = tag?.trim();
    if (!t || seen.has(t.toLowerCase())) continue;
    seen.add(t.toLowerCase());
    out.push(t);
  }
  return out;
}

function fromLocal(post: LocalBlogPost): Paper {
  const href = blogPostPath(post);
  const external = Boolean(post.externalUrl);
  const abstractSource = post.summary || post.paragraphs?.[0];
  return {
    id: post._id,
    title: post.title.trim(),
    href,
    external,
    source: sourceFor(href, external),
    publishedAt: post.publishedAt,
    day: post.publishedAt.slice(0, 10),
    authors: post.author?.name ? [post.author.name] : [],
    abstract: abstractSource ? truncate(abstractSource) : null,
    tags: uniqueTags([post.topic]),
    imageUrl: post.imageUrl || null,
  };
}

function fromSanity(post: SanityPaperPost): Paper | null {
  const title = post.title?.trim();
  const slug = post.slug?.current;
  if (!title || !slug || !post.publishedAt) return null;
  const href = blogPostPath({ slug: { current: slug } });
  let imageUrl: string | null = null;
  if (post.mainImage?.asset) {
    try {
      imageUrl = urlFor(post.mainImage).width(640).height(360).fit("crop").auto("format").url();
    } catch {
      imageUrl = null;
    }
  }
  return {
    id: post._id,
    title,
    href,
    external: false,
    source: "OpenVals Blog",
    publishedAt: post.publishedAt,
    day: new Date(post.publishedAt).toISOString().slice(0, 10),
    authors: post.author?.name ? [post.author.name] : [],
    abstract: abstractFromBody(post.bodyText, title, slug),
    tags: uniqueTags([post.topic, ...(post.categories ?? [])]),
    imageUrl,
  };
}

/** Local posts plus Sanity posts (Sanity wins on a slug clash, as on /blog), newest first. */
export function buildPapers(sanityPosts: SanityPaperPost[]): Paper[] {
  const sanityPapers = sanityPosts.map(fromSanity).filter((p): p is Paper => p !== null);
  const sanitySlugs = new Set(sanityPosts.map((p) => toBlogSlug(p.slug?.current ?? "")).filter(Boolean));
  const localPapers = localBlogPosts
    .filter((post) => !sanitySlugs.has(toBlogSlug(post.slug.current)))
    .map(fromLocal);

  return [...localPapers, ...sanityPapers].sort(
    (a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0),
  );
}
