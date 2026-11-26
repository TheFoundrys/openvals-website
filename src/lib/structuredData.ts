import { absoluteUrl, SITE_NAME, SITE_URL, DEFAULT_SQUARE_IMAGE, DEFAULT_OG_IMAGE } from "./seo";

export type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_SQUARE_IMAGE),
    image: absoluteUrl(DEFAULT_SQUARE_IMAGE),
    description:
      "OpenVals helps enterprises validate, secure, and trust AI before production.",
    sameAs: ["https://github.com/vishwanathakuthota/openvals"],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "OpenVals helps enterprises validate, secure, and trust AI before production.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };
}

/** Software product schema without invented offers, ratings, or reviews. */
export function softwareApplicationJsonLd({
  name,
  description,
  path,
  applicationCategory = "BusinessApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory,
    operatingSystem: "Web",
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}): Record<string, unknown> {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    image: [imageUrl],
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Person",
      name: authorName || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_SQUARE_IMAGE),
      },
    },
  };
}

/** Leaderboard page: the ranking as a Dataset plus an ordered ItemList of the top models */
export function leaderboardJsonLd({
  name,
  description,
  path,
  version,
  dateModified,
  items,
}: {
  name: string;
  description: string;
  path: string;
  version: string;
  dateModified: string | null;
  items: Array<{ name: string; position: number; url: string }>;
}): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name,
      description,
      url: absoluteUrl(path),
      version,
      ...(dateModified ? { dateModified } : {}),
      creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      isAccessibleForFree: true,
      variableMeasured: ["DRS Trust Score", "Accuracy", "Average latency", "Evaluation runs"],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${name} — top models`,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: items.length,
      itemListElement: items.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: item.name,
        url: absoluteUrl(item.url),
      })),
    },
  ];
}
