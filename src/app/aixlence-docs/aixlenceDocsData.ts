export type AIxlenceDocsPageId =
  | "overview"
  | "capability-levels"
  | "navigation"
  | "organization-profile"
  | "assessment"
  | "pillar-summary"
  | "roadmap"
  | "investment-simulator"
  | "service-mapping"
  | "executive-dashboard"
  | "reporting"
  | "rules-thresholds";

export const aixlenceNavSections: Array<{
  title: string;
  items: Array<{ id: AIxlenceDocsPageId; label: string }>;
}> = [
  {
    title: "Module Overview",
    items: [
      { id: "overview", label: "Overview & 6 Pillars" },
      { id: "capability-levels", label: "Capability Levels (L1–L3)" },
      { id: "navigation", label: "Navigating the Suite" },
    ],
  },
  {
    title: "User Guide (Steps 1–8)",
    items: [
      { id: "organization-profile", label: "Step 1: Org Profile & Currency" },
      { id: "assessment", label: "Step 2: 36-Question Diagnostic" },
      { id: "pillar-summary", label: "Step 3: Radar & Pillar Summary" },
      { id: "roadmap", label: "Step 4: Transformation Roadmap" },
      { id: "investment-simulator", label: "Step 5: Investment Simulator" },
      { id: "service-mapping", label: "Step 6: Service Mapping" },
      { id: "executive-dashboard", label: "Step 7: Executive Dashboard" },
      { id: "reporting", label: "Step 8: Board-Ready Reports" },
    ],
  },
  {
    title: "Reference & Formulas",
    items: [{ id: "rules-thresholds", label: "Rules & Thresholds Summary" }],
  },
];

export const aixlencePageIds = aixlenceNavSections.flatMap((section) =>
  section.items.map((item) => item.id),
);

export const aixlencePageMeta: Record<
  AIxlenceDocsPageId,
  { group: string; title: string; subtitle: string; prev?: AIxlenceDocsPageId; next?: AIxlenceDocsPageId }
> = {
  overview: {
    group: "Module Overview",
    title: "AIxLence Diagnostic Overview & Foundation Pillars",
    subtitle:
      "Evidence-backed enterprise AI readiness assessment, risk-adjusted value quantification, and sequenced roadmap.",
    next: "capability-levels",
  },
  "capability-levels": {
    group: "Module Overview",
    title: "Three-Tier Capability Levels",
    subtitle: "The progressive disclosure model: Baseline (L1), Diagnose (L2), and Analyze & Act (L3).",
    prev: "overview",
    next: "navigation",
  },
  navigation: {
    group: "Module Overview",
    title: "Navigating the Suite",
    subtitle: "Seven dedicated views, sidebar structure, and the recommended 3-stage linear workflow.",
    prev: "capability-levels",
    next: "organization-profile",
  },
  "organization-profile": {
    group: "User Guide",
    title: "Step 1: Organisation Profile & Currency Configuration",
    subtitle: "Anchoring assessments with enterprise metadata, multi-currency normalization, and financial parameters.",
    prev: "navigation",
    next: "assessment",
  },
  assessment: {
    group: "User Guide",
    title: "Step 2: The 36-Question Diagnostic Assessment",
    subtitle: "Evaluating six capabilities per pillar across a 5-point evidence-based maturity scale.",
    prev: "organization-profile",
    next: "pillar-summary",
  },
  "pillar-summary": {
    group: "User Guide",
    title: "Step 3: Pillar Summary & Radar Diagnostics",
    subtitle: "6-axis radar charts, normalized pillar score formula, dynamic target slider, and execution risk bands.",
    prev: "assessment",
    next: "roadmap",
  },
  roadmap: {
    group: "User Guide",
    title: "Step 4: Transformation Roadmap",
    subtitle: "Time-phased transformation across four horizons (0–30d to 6–12m) and five solution accelerators.",
    prev: "pillar-summary",
    next: "investment-simulator",
  },
  "investment-simulator": {
    group: "User Guide",
    title: "Step 5: Investment Simulator & Value Realization",
    subtitle: "Modeling risk-adjusted ROI, net value creation, and DrPinnacle Value Realization Curve probabilities.",
    prev: "roadmap",
    next: "service-mapping",
  },
  "service-mapping": {
    group: "User Guide",
    title: "Step 6: Service Mapping & Interventions",
    subtitle: "Diagnosis First, Service Second: automated intervention triggers for Advisory, Transformation Pods, and Labs.",
    prev: "investment-simulator",
    next: "executive-dashboard",
  },
  "executive-dashboard": {
    group: "User Guide",
    title: "Step 7: Executive Dashboard",
    subtitle: "CXO and board review dashboard with headline metrics, capability benchmark grid, and Top 3 Next Best Actions.",
    prev: "service-mapping",
    next: "reporting",
  },
  reporting: {
    group: "User Guide",
    title: "Step 8: Exporting Board-Ready Reports",
    subtitle: "Generating standalone HTML executive audit registers and high-resolution print/PDF outputs.",
    prev: "executive-dashboard",
    next: "rules-thresholds",
  },
  "rules-thresholds": {
    group: "Reference & Formulas",
    title: "Rules & Thresholds at a Glance",
    subtitle: "Complete mathematical formula catalog, score bands, risk triggers, and 90-day assessment cadence.",
    prev: "reporting",
  },
};

export function isAIxlenceDocsPageId(value: string): value is AIxlenceDocsPageId {
  return aixlencePageIds.includes(value as AIxlenceDocsPageId);
}

export function aixlencePagePath(id: AIxlenceDocsPageId) {
  return id === "overview" ? "/aixlence-docs" : `/aixlence-docs/${id}`;
}
