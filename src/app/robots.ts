import type { MetadataRoute } from "next";
import { isProductionIndexingEnabled, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      host: SITE_URL,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/auth/", "/sample", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
