import type { Metadata } from "next";

export const SITE_URL = "https://openvalidations.com";
export const SITE_NAME = "OpenVals";
export const DEFAULT_OG_IMAGE = "/openvals-og.png";
export const DEFAULT_SQUARE_IMAGE = "/openvals-square.png";

/** True only for production indexing. Preview/staging should stay noindex. */
export function isProductionIndexingEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_SEO_INDEXING === "false") return false;
  if (process.env.NEXT_PUBLIC_SEO_INDEXING === "true") return true;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return true;
}

export function searchConsoleVerification(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

const DEFAULT_KEYWORDS = [
  "AI Validation",
  "AI Security",
  "AI Trust",
  "Model Validation",
  "AI Governance",
  "EU AI Act Compliance",
  "Responsible AI",
  "OpenVals",
];

/** Build absolute canonical / OG URLs from a site path. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Shared Metadata factory for every public page. */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const shortTitle = title
    .replace(/\s*\|\s*OpenVals\s*$/i, "")
    .replace(/\s*-\s*OpenVals\s*$/i, "")
    .trim();
  const fullTitle = `${shortTitle} | ${SITE_NAME}`;
  const blockIndexing = noIndex || !isProductionIndexingEnabled();
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    // Root layout title.template appends " | OpenVals"
    title: shortTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${shortTitle}`,
        },
        {
          url: absoluteUrl(DEFAULT_SQUARE_IMAGE),
          width: 1200,
          height: 1200,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage, absoluteUrl(DEFAULT_SQUARE_IMAGE)],
    },
    robots: blockIndexing
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false, noimageindex: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export type SeoEntry = {
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
  priority?: number;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

/**
 * Canonical SEO catalog keyed by path.
 * Layouts call `pageMetadata(path)`; sitemap iterates public entries.
 */
export const PAGE_SEO: Record<string, SeoEntry> = {
  "/": {
    title: "Enterprise AI Validation, Security & Compliance",
    description:
      "OpenVals helps enterprises validate, secure, and trust AI before production with independent benchmarks, DRS scoring, and assurance workflows.",
    priority: 1,
    changeFrequency: "weekly",
  },
  "/about": {
    title: "About",
    description:
      "Learn how OpenVals builds the trust layer for enterprise AI—independent evaluation, assurance, and validation before production.",
    priority: 0.7,
  },
  "/team": {
    title: "Team",
    description: "Meet the OpenVals team building AI validation, security, and trust infrastructure.",
    priority: 0.6,
  },
  "/who-we-serve": {
    title: "Who We Serve",
    description:
      "OpenVals serves enterprises, AI teams, and regulated industries that need measurable AI trust before deployment.",
    priority: 0.7,
  },
  "/contact": {
    title: "Contact",
    description: "Contact OpenVals for AI validation, assurance demos, partnerships, and enterprise inquiries.",
    priority: 0.5,
  },
  "/faqs": {
    title: "FAQs",
    description: "Frequently asked questions about OpenVals AI validation, benchmarks, pricing, and assurance.",
    priority: 0.5,
  },
  "/pricing": {
    title: "Pricing",
    description:
      "OpenVals pricing for Community, Scale, and Enterprise—trust infrastructure without metered SaaS surprises.",
    priority: 0.9,
  },
  "/book-a-demo": {
    title: "Book a Demo",
    description: "Book an OpenVals demo to see AI validation, DRS scoring, and assurance workflows in action.",
    priority: 0.95,
  },
  "/request-a-demo": {
    title: "Request a Demo",
    description: "Request an OpenVals demo for enterprise AI validation, security, and compliance readiness.",
    priority: 0.9,
  },
  "/apply": {
    title: "Apply",
    description: "Apply to work with OpenVals on enterprise AI validation and assurance programs.",
    priority: 0.7,
  },
  "/assessment": {
    title: "AI Assessment",
    description: "Run an OpenVals AI assessment to measure model reliability, risk, and readiness for production.",
    priority: 0.8,
  },
  "/models": {
    title: "Validated Model Registry",
    description:
      "Browse the OpenVals validated model registry with accuracy, latency, DRS, and trust metrics across leading AI labs.",
    priority: 0.9,
  },
  "/datasets": {
    title: "Datasets",
    description: "Explore OpenVals evaluation datasets spanning finance, software, cybersecurity, and frontier risk domains.",
    priority: 0.8,
  },
  "/spaces": {
    title: "Spaces",
    description: "Interactive OpenVals validation spaces for exploring model risk, compliance, and assurance workflows.",
    priority: 0.75,
  },
  "/buckets": {
    title: "Buckets",
    description: "OpenVals evaluation buckets for organizing AI validation runs, datasets, and benchmark artifacts.",
    priority: 0.6,
  },
  "/registry": {
    title: "Registry",
    description: "OpenVals model and evaluation registry for tracking validated AI systems and trust scores.",
    priority: 0.7,
  },
  "/methodology": {
    title: "Methodology",
    description:
      "How OpenVals evaluates AI models—benchmark design, scoring methodology, and independent assurance practices.",
    priority: 0.85,
  },
  "/vals-index": {
    title: "Vals Index",
    description: "OpenVals Vals Index—comparative AI model rankings across economically valuable tasks.",
    priority: 0.85,
  },
  "/openvals-index": {
    title: "OpenVals Index",
    description: "The OpenVals Index for tracking model performance, trust, and frontier risk evaluations.",
    priority: 0.85,
  },
  "/research": {
    title: "Research",
    description: "OpenVals research on AI validation, adversarial robustness, assurance, and trustworthy AI systems.",
    priority: 0.75,
  },
  "/blog": {
    title: "Blog",
    description: "Insights from OpenVals on AI assurance, validation, security, governance, and production trust.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  "/docs": {
    title: "Docs Hub",
    description: "OpenVals documentation hub for platforms, products, and AI validation guides.",
    // Permanent redirect target is /openvals-docs — keep out of sitemap/index.
    noIndex: true,
  },
  "/openvals-docs": {
    title: "Your OpenVals roadmap",
    description:
      "A clear OpenVals docs roadmap: install, run your first evaluation, learn trust metrics, use platform workflows, and assess enterprise readiness.",
    priority: 0.9,
  },
  "/aixlence-docs": {
    title: "AIxLence Docs",
    description: "AIxLence documentation for enterprise AI readiness assessment and capability mapping.",
    priority: 0.85,
  },
  "/openvals": {
    title: "OpenVals Platform",
    description:
      "OpenVals platform overview—independent AI evaluation, benchmarking, and continuous trust scoring.",
    priority: 0.95,
  },
  "/aixlence": {
    title: "AIxLence",
    description:
      "AIxLence by OpenVals—diagnose enterprise AI readiness and map the right assurance interventions.",
    priority: 0.95,
  },
  "/openlxm": {
    title: "OpenLXM",
    description: "OpenLXM—OpenVals tooling for large-model evaluation, lifecycle visibility, and trust signals.",
    priority: 0.9,
  },
  "/redshield": {
    title: "RedShield",
    description: "RedShield by OpenVals—inline AI guardrails and adversarial defense for model endpoints.",
    priority: 0.95,
  },
  "/services": {
    title: "Services",
    description: "OpenVals professional services for AI engineering, quality assurance, compass assessments, and data science.",
    priority: 0.8,
  },
  "/services/ai-assurance": {
    title: "AI Assurance Services",
    description: "Enterprise AI assurance services from OpenVals—continuous validation evidence for production systems.",
    priority: 0.8,
  },
  "/services/ai-assurance-data": {
    title: "AI Assurance Data",
    description: "Data-centric AI assurance services for datasets, pipelines, and evaluation evidence with OpenVals.",
    priority: 0.75,
  },
  "/services/ai-compass": {
    title: "AI Compass",
    description: "AI Compass by OpenVals—structured readiness assessment for enterprise AI programs.",
    priority: 0.85,
  },
  "/services/ai-engineering": {
    title: "AI Engineering",
    description: "AI engineering services from OpenVals for robust model systems, evaluation hooks, and production readiness.",
    priority: 0.8,
  },
  "/services/ai-engineering-analytics": {
    title: "AI Engineering Analytics",
    description: "Analytics for AI engineering programs—measure reliability, drift signals, and evaluation coverage.",
    priority: 0.7,
  },
  "/services/ai-engineering-data": {
    title: "AI Engineering Data",
    description: "Data engineering for AI systems—pipelines, validation datasets, and trustworthy evaluation inputs.",
    priority: 0.8,
  },
  "/services/ai-quality": {
    title: "AI Quality",
    description: "AI quality services focused on factuality, hallucination risk, and decision reliability scoring.",
    priority: 0.75,
  },
  "/services/ai-quality-assurance": {
    title: "AI Quality Assurance",
    description: "AI quality assurance programs from OpenVals for pre-production and continuous model validation.",
    priority: 0.85,
  },
  "/services/applied-data-science": {
    title: "Applied Data Science",
    description: "Applied data science services aligned with OpenVals evaluation and assurance standards.",
    priority: 0.7,
  },
  "/services/aixlence": {
    title: "AIxLence Service",
    description: "AIxLence service engagement for enterprise AI capability diagnosis and intervention mapping.",
    priority: 0.8,
  },
  "/solutions/ai-compliance": {
    title: "AI Compliance",
    description: "AI compliance solutions for EU AI Act readiness, governance evidence, and regulated deployments.",
    priority: 0.85,
  },
  "/solutions/ai-model-validation": {
    title: "AI Model Validation",
    description: "AI model validation solutions—independent benchmarks, trust metrics, and deployment evidence.",
    priority: 0.9,
  },
  "/solutions/ai-red-teaming": {
    title: "AI Red Teaming",
    description: "AI red teaming solutions to probe jailbreaks, prompt injection, and adversarial failure modes.",
    priority: 0.85,
  },
  "/solutions/ai-security": {
    title: "AI Security",
    description: "AI security solutions for guardrails, adversarial testing, and trustworthy model endpoints.",
    priority: 0.9,
  },
  "/ai-compliance-readiness": {
    title: "AI Compliance Readiness",
    description: "Assess AI compliance readiness with OpenVals evidence frameworks for regulated industries.",
    priority: 0.85,
  },
  "/ai-model-validation": {
    title: "AI Model Validation",
    description: "Validate AI models before production with OpenVals independent evaluation and trust scoring.",
    priority: 0.9,
  },
  "/ai-red-teaming": {
    title: "AI Red Teaming",
    description: "OpenVals AI red teaming to surface jailbreaks, injection risks, and unsafe model behaviors.",
    priority: 0.85,
  },
  "/ai-risk-assessment": {
    title: "AI Risk Assessment",
    description: "Structured AI risk assessment covering performance, safety, hallucination, and operational risk.",
    priority: 0.9,
  },
  "/ai-security": {
    title: "AI Security",
    description: "Enterprise AI security with OpenVals—adversarial testing, guardrails, and trust verification.",
    priority: 0.9,
  },
  "/trust-score-engine": {
    title: "Trust Score Engine",
    description: "OpenVals Trust Score Engine for Decision Reliability Scoring and continuous assurance signals.",
    priority: 0.9,
  },
  "/compass": {
    title: "Compass",
    description: "OpenVals Compass for navigating enterprise AI readiness and validation priorities.",
    priority: 0.7,
  },
  "/enterprise": {
    title: "Enterprise",
    description: "OpenVals for enterprises—validation at scale, governance evidence, and production AI trust.",
    priority: 0.85,
  },
  "/enterprise-ops": {
    title: "Enterprise Ops Benchmarks",
    description: "Enterprise operations AI benchmarks from OpenVals across workflow, reliability, and trust metrics.",
    priority: 0.7,
  },
  "/products/optgpt": {
    title: "OptGPT",
    description: "OptGPT product overview—OpenVals-aligned evaluation and assurance for generative AI systems.",
    priority: 0.65,
  },
  "/products/optgrad": {
    title: "OptGrad",
    description: "OptGrad product overview for optimization and evaluation workflows with OpenVals.",
    priority: 0.65,
  },
  "/products/optsearch": {
    title: "OptSearch",
    description: "OptSearch product overview for retrieval and search evaluation with OpenVals assurance.",
    priority: 0.65,
  },
  "/products/radius": {
    title: "Radius",
    description: "Radius product overview—OpenVals ecosystem tooling for AI system evaluation coverage.",
    priority: 0.65,
  },
  "/products/onecrm": {
    title: "OneCRM",
    description: "OneCRM product overview within the OpenVals and TechOptima product ecosystem.",
    priority: 0.55,
  },
  "/products/onehrms": {
    title: "OneHRMS",
    description: "OneHRMS product overview within the OpenVals and TechOptima product ecosystem.",
    priority: 0.55,
  },
  "/finance": {
    title: "Finance Benchmarks",
    description: "Finance-domain AI benchmarks from OpenVals measuring accuracy, factuality, and decision reliability.",
    priority: 0.75,
  },
  "/healthcare": {
    title: "Healthcare Benchmarks",
    description: "Healthcare AI evaluation and trust benchmarks from OpenVals for high-stakes decision support.",
    priority: 0.75,
  },
  "/legal": {
    title: "Legal Benchmarks",
    description: "Legal-domain AI benchmarks focused on factuality, reliability, and compliance-sensitive outputs.",
    priority: 0.7,
  },
  "/cybersecurity": {
    title: "Cybersecurity Benchmarks",
    description: "Cybersecurity and frontier-risk AI benchmarks from OpenVals for adversarial and safety evaluation.",
    priority: 0.8,
  },
  "/developer": {
    title: "Developer Benchmarks",
    description: "Developer and software-engineering AI benchmarks covering code quality, reliability, and trust.",
    priority: 0.7,
  },
  "/math": {
    title: "Math Benchmarks",
    description: "Mathematics reasoning benchmarks from OpenVals for evaluating model accuracy and reliability.",
    priority: 0.65,
  },
  "/reasoning": {
    title: "Reasoning Benchmarks",
    description: "Reasoning benchmarks measuring multi-step reliability and Decision Reliability Score signals.",
    priority: 0.7,
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "OpenVals privacy policy—how we collect, use, and protect personal and enterprise information.",
    priority: 0.3,
  },
  "/terms": {
    title: "Terms of Service",
    description: "OpenVals terms of service for platform access, evaluation services, and website use.",
    priority: 0.3,
  },
  "/data-platform-terms": {
    title: "Data Platform Terms",
    description: "Terms governing OpenVals data platform access, datasets, and evaluation artifacts.",
    priority: 0.3,
  },
  "/vishwanathakuthota": {
    title: "Vishwanath Akuthota",
    description: "Profile of Vishwanath Akuthota, founder perspective on AI assurance and OpenVals.",
    priority: 0.5,
  },
  "/vishwanathakuthota/blindwink": {
    title: "BlindWink",
    description: "BlindWink by Vishwanath Akuthota—creative and research work connected to OpenVals.",
    priority: 0.4,
  },
  "/auth/login": {
    title: "Sign In",
    description: "Sign in to OpenVals.",
    noIndex: true,
  },
  "/auth/signup": {
    title: "Create Account",
    description: "Create an OpenVals account.",
    noIndex: true,
  },
  "/sample": {
    title: "Sample",
    description: "OpenVals sample evaluation page.",
    noIndex: true,
  },
  "/studio": {
    title: "Studio",
    description: "OpenVals content studio.",
    noIndex: true,
  },
};

export function pageMetadata(path: string): Metadata {
  const entry = PAGE_SEO[path];
  if (!entry) {
    return createPageMetadata({
      title: SITE_NAME,
      description: "OpenVals helps enterprises validate, secure, and trust AI before production.",
      path,
    });
  }
  return createPageMetadata({
    title: entry.title,
    description: entry.description,
    path,
    keywords: entry.keywords,
    noIndex: entry.noIndex,
  });
}

export function publicSitemapEntries(): Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<SeoEntry["changeFrequency"]>;
}> {
  return Object.entries(PAGE_SEO)
    .filter(([, entry]) => !entry.noIndex)
    .map(([path, entry]) => ({
      path,
      priority: entry.priority ?? 0.6,
      changeFrequency: entry.changeFrequency ?? "monthly",
    }));
}
