export type LocalBlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: { name: string };
  imageUrl: string;
  externalUrl: string;
};

type BlogPostLike = {
  slug?: { current?: string };
  publishedAt?: string;
};

export const localBlogPosts: LocalBlogPost[] = [
  {
    _id: "local-why-ai-model-validation-is-now-a-boardroom-risk",
    title: "Why AI Model Validation Is Now a Boardroom Risk",
    slug: { current: "why-ai-model-validation-is-now-a-boardroom-risk" },
    publishedAt: "2026-06-15T00:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    externalUrl: "https://x.com/Vishakuthota/status/2066400750432067841",
  },
];

export function getLocalBlogPost(slug: string) {
  return localBlogPosts.find((post) => post.slug.current === slug);
}

export function mergeLocalBlogPosts<T extends BlogPostLike>(posts: T[]): Array<T | LocalBlogPost> {
  const existingSlugs = new Set(
    posts
      .map((post) => post.slug?.current)
      .filter((slug): slug is string => Boolean(slug)),
  );

  return [
    ...localBlogPosts.filter((post) => !existingSlugs.has(post.slug.current)),
    ...posts,
  ].sort((first, second) => {
    const firstDate = Date.parse(first.publishedAt || "") || 0;
    const secondDate = Date.parse(second.publishedAt || "") || 0;

    return secondDate - firstDate;
  });
}
