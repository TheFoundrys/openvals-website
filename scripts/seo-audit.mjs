#!/usr/bin/env node
/**
 * Static SEO coverage audit for OpenVals marketing site.
 * Run: node scripts/seo-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const seoPath = path.join(root, "src/lib/seo.ts");
const seo = fs.readFileSync(seoPath, "utf8");
const catalog = [...seo.matchAll(/^\s{2}"(\/[^"]*)":\s*\{/gm)].map((m) => m[1]);

const pageFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "page.tsx") pageFiles.push(full);
  }
}
walk(path.join(root, "src/app"));

const staticRoutes = [];
const dynamicRoutes = [];
for (const file of pageFiles) {
  const rel = path.relative(path.join(root, "src/app"), path.dirname(file));
  const route = rel === "" ? "/" : `/${rel.replaceAll(path.sep, "/")}`;
  if (route.includes("[")) dynamicRoutes.push(route);
  else staticRoutes.push(route);
}

const missingCatalog = staticRoutes.filter((r) => !catalog.includes(r) && r !== "/studio/[[...tool]]");
const hasRobots = fs.existsSync(path.join(root, "src/app/robots.ts"));
const hasSitemap = fs.existsSync(path.join(root, "src/app/sitemap.ts"));
const hasManifest = fs.existsSync(path.join(root, "src/app/manifest.ts"));
const hasStructured = fs.existsSync(path.join(root, "src/lib/structuredData.ts"));
const hasAnalytics = fs.existsSync(path.join(root, "src/components/Analytics.tsx"));

const redirects = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
const redirectPairs = [...redirects.matchAll(/source:\s*"([^"]+)"[\s\S]*?destination:\s*"([^"]+)"/g)].map(
  ([, s, d]) => `${s} → ${d}`
);

console.log("=== OpenVals SEO Audit ===");
console.log(`Static routes: ${staticRoutes.length}`);
console.log(`Dynamic routes: ${dynamicRoutes.length}`);
console.log(`SEO catalog entries: ${catalog.length}`);
console.log(`Missing from PAGE_SEO: ${missingCatalog.length ? missingCatalog.join(", ") : "none"}`);
console.log(`robots.ts: ${hasRobots ? "yes" : "NO"}`);
console.log(`sitemap.ts: ${hasSitemap ? "yes" : "NO"}`);
console.log(`manifest.ts: ${hasManifest ? "yes" : "NO"}`);
console.log(`structuredData.ts: ${hasStructured ? "yes" : "NO"}`);
console.log(`Analytics.tsx: ${hasAnalytics ? "yes" : "NO"}`);
console.log("Redirects:");
for (const r of redirectPairs) console.log(`  - ${r}`);
console.log("\nEnv to configure for Search Console / Analytics:");
console.log("  NEXT_PUBLIC_GA_MEASUREMENT_ID");
console.log("  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
console.log("  NEXT_PUBLIC_BING_SITE_VERIFICATION");
console.log("  NEXT_PUBLIC_SEO_INDEXING=true|false (optional override)");
console.log("\nRemaining manual checks:");
console.log("  - Run Lighthouse on production URL");
console.log("  - Submit sitemap in Google Search Console & Bing Webmaster");
console.log("  - Validate JSON-LD in Rich Results Test");
console.log("  - Consider enabling next/image optimization (currently unoptimized: true)");
