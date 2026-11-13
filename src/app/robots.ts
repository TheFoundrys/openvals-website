import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/auth/", "/sample"],
    },
    sitemap: "https://openvalidations.com/sitemap.xml",
    host: "https://openvalidations.com",
  };
}
