import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ['', 1],
    ['/ai-risk-assessment', 0.9],
    ['/ai-red-teaming', 0.9],
    ['/ai-model-validation', 0.9],
    ['/ai-compliance-readiness', 0.9],
    ['/trust-score-engine', 0.9],
    ['/apply', 0.85],
    ['/blog', 0.8],
    ['/contact', 0.5],
  ] as const

  return routes.map(([path, priority]) => ({
    url: `https://openvalidations.com${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }))
}
