export type DocsPageId =
  | "welcome"
  | "why-openvals"
  | "installation"
  | "quick-start"
  | "drs"
  | "model-evaluation"
  | "factuality-engine"
  | "hpi"
  | "dataset-intelligence"
  | "benchmarking"
  | "parallel-execution"
  | "semantic-intelligence"
  | "reporting"
  | "screenshots"
  | "metrics"
  | "integrations"
  | "use-case-advisor"
  | "aixlence"
  | "domains"
  | "roadmap"
  | "vision"
  | "contributing"
  | "code-of-conduct"
  | "security-policy"
  | "samples"
  | "platform-user-flow"
  | "platform-api-spec"
  | "platform-architecture";

export const navSections: Array<{ title: string; items: Array<{ id: DocsPageId; label: string }> }> = [
  {
    title: "1. Start here",
    items: [
      { id: "welcome", label: "Quickstart" },
      { id: "why-openvals", label: "Why OpenVals" },
      { id: "installation", label: "Install" },
    ],
  },
  {
    title: "2. Measure trust",
    items: [
      { id: "drs", label: "Decision Reliability Score" },
      { id: "model-evaluation", label: "Model evaluation" },
      { id: "factuality-engine", label: "Factuality" },
      { id: "hpi", label: "Hallucination (HPI)" },
      { id: "dataset-intelligence", label: "Dataset intelligence" },
      { id: "benchmarking", label: "Multi-model benchmarking" },
      { id: "metrics", label: "Metrics guide" },
      { id: "domains", label: "Benchmark domains" },
    ],
  },
  {
    title: "3. Run & report",
    items: [
      { id: "parallel-execution", label: "Parallel execution" },
      { id: "semantic-intelligence", label: "Semantic intelligence" },
      { id: "reporting", label: "Executive reporting" },
      { id: "screenshots", label: "UI previews" },
      { id: "samples", label: "CLI samples" },
    ],
  },
  {
    title: "4. Use the platform",
    items: [
      { id: "integrations", label: "Integrations" },
      { id: "use-case-advisor", label: "Use Case Advisor & runs" },
      { id: "aixlence", label: "AIxLence readiness" },
      { id: "platform-user-flow", label: "End-to-end user flow" },
      { id: "platform-api-spec", label: "API & functional spec" },
      { id: "platform-architecture", label: "Architecture" },
    ],
  },
  {
    title: "5. Reference",
    items: [
      { id: "roadmap", label: "Product roadmap" },
      { id: "vision", label: "Vision" },
      { id: "contributing", label: "Contributing" },
      { id: "code-of-conduct", label: "Code of conduct" },
      { id: "security-policy", label: "Security policy" },
    ],
  },
];

export const docsPageMeta: Record<DocsPageId, { group: string; title: string; onThisPage: string[] }> = {
  welcome: {
    group: "1. Start here",
    title: "Quickstart",
    onThisPage: [
      "1. Environment readiness",
      "2. Provider discovery",
      "3. Model discovery",
      "4. Dataset discovery",
      "5. Recommend a model",
      "6. Benchmark and get a trust verdict",
      "The whole flow, end to end",
      "Next steps",
    ],
  },
  "why-openvals": { group: "1. Start here", title: "Why OpenVals", onThisPage: ["Problem", "Why OpenVals?", "Enterprise Use Cases", "What It Solves"] },
  installation: { group: "1. Start here", title: "Installation", onThisPage: ["Install", "Requirements"] },
  "quick-start": {
    group: "1. Start here",
    title: "Quickstart",
    onThisPage: [
      "1. Environment readiness",
      "2. Provider discovery",
      "3. Model discovery",
      "4. Dataset discovery",
      "5. Recommend a model",
      "6. Benchmark and get a trust verdict",
      "The whole flow, end to end",
      "Next steps",
    ],
  },
  drs: { group: "2. Measure trust", title: "Decision Reliability Score (DRS)", onThisPage: ["Overview", "Formula", "Signals"] },
  "model-evaluation": { group: "2. Measure trust", title: "Model Evaluation", onThisPage: ["Metrics", "Evaluation Signals"] },
  "factuality-engine": { group: "2. Measure trust", title: "Factuality Engine", onThisPage: ["Overview", "Capabilities", "Outputs"] },
  hpi: { group: "2. Measure trust", title: "Hallucination Probability Index (HPI)", onThisPage: ["Overview", "Risk Levels"] },
  "dataset-intelligence": { group: "2. Measure trust", title: "Dataset Intelligence", onThisPage: ["Overview", "CLI Validation", "Examples"] },
  benchmarking: { group: "2. Measure trust", title: "Multi-Model Benchmarking", onThisPage: ["Comparison", "Capabilities", "Ranking"] },
  "parallel-execution": { group: "3. Run & report", title: "Parallel Execution Engine", onThisPage: ["Overview", "CLI Usage", "Benefits"] },
  "semantic-intelligence": { group: "3. Run & report", title: "Semantic Intelligence Engine", onThisPage: ["Embeddings", "Roadmap"] },
  reporting: { group: "3. Run & report", title: "Executive Reporting", onThisPage: ["Overview", "Dashboard Report", "Sample-Level Report"] },
  screenshots: { group: "3. Run & report", title: "Screenshots & Previews", onThisPage: ["Trust Dashboard", "Single Model Executive Report", "Dataset Validation CLI"] },
  integrations: {
    group: "4. Use the platform",
    title: "OpenVals Integrations Analysis & User Documentation",
    onThisPage: [
      "1. Integration Architecture & Current Maturity",
      "Integration levels",
      "L3 explorer capabilities",
      "Important limitation: downstream model consumption",
      "2. User Guide",
      "Connecting a provider",
      "What you can do after connecting",
      "Imported Models",
      "Custom connectors",
      "Disconnecting a provider",
      "Troubleshooting",
    ],
  },
  "use-case-advisor": {
    group: "4. Use the platform",
    title: "Use Case Advisor & Validation Runs",
    onThisPage: [
      "1. Overview",
      "End-to-end workflow",
      "2. Use Case Advisor",
      "Starting or restoring a decision",
      "Complete the intake form",
      "Run a recommendation",
      "Understand progress",
      "Review recommendations",
      "Errors and partial results",
      "History and versions",
      "Select models for validation",
      "3. Validation Runs",
      "Choose an entry path",
      "Configure the run",
      "Submit and track progress",
      "How validation executes",
      "Read the evidence pack",
      "History, filters, and reports",
      "4. Troubleshooting",
      "5. Key concepts",
    ],
  },
  aixlence: {
    group: "4. Use the platform",
    title: "AIxLence Analysis & User Documentation",
    onThisPage: [
      "1. Module Overview & Capability Levels",
      "The six foundation pillars",
      "Capability levels",
      "2. User Guide: Navigating the Suite",
      "Step 1: Organisation Profile & Currency Configuration",
      "Step 2: The 36-Question Diagnostic Assessment",
      "Step 3: Pillar Summary & Radar Diagnostics",
      "Step 4: Transformation Roadmap",
      "Step 5: Investment Simulator & Value Realization",
      "Step 6: Service Mapping & Interventions",
      "Step 7: Executive Dashboard",
      "Step 8: Exporting Board-Ready Reports",
      "Reference: Rules and Thresholds at a Glance",
    ],
  },
  metrics: { group: "2. Measure trust", title: "Metrics Explained", onThisPage: ["Metric Guide", "Interpretation"] },
  domains: { group: "2. Measure trust", title: "Supported Benchmark Domains", onThisPage: ["Available Datasets", "Finance", "Healthcare", "Legal", "Developer", "Sample", "Cybersecurity", "Reasoning", "Math", "Enterprise Ops"] },
  roadmap: { group: "5. Reference", title: "Product roadmap", onThisPage: ["v0.5.5", "v0.6.0", "Future"] },
  vision: { group: "5. Reference", title: "Philosophy and Vision", onThisPage: ["Mission", "Vision"] },
  contributing: { group: "5. Reference", title: "Contributing", onThisPage: ["Workflow", "License", "Developed By"] },
  "code-of-conduct": { group: "5. Reference", title: "OpenVals Code of Conduct", onThisPage: ["Purpose", "Ground Rules", "Unacceptable Behavior", "Questions"] },
  "security-policy": { group: "5. Reference", title: "Security Policy", onThisPage: ["Supported Versions", "Reporting a Vulnerability", "Response Timeline", "Scope", "Safe Harbor"] },
  samples: { group: "3. Run & report", title: "OpenVals CLI Samples", onThisPage: ["Model Catalog", "Trust Advisor (Cybersecurity)", "Trust Advisor (Finance)", "System Diagnostics", "Overall Health & Doctor", "Full Doctor Diagnostics"] },
  "platform-user-flow": {
    group: "4. Use the platform",
    title: "End-to-End User Flow",
    onThisPage: [
      "Purpose and scope",
      "Applications and actors",
      "Phase 1 — Acquisition",
      "Phase 2 — Tenant creation",
      "Phase 3 — Team and roles",
      "Phase 4 — Self-service billing",
      "Phase 5 — Subscription access states",
      "Phase 6 — Enterprise provisioning",
      "Phase 7 — Enterprise Customer App",
      "Phase 8 — Platform login gate",
      "Phase 9 — Console operations",
      "Phase 10 — Invoice, payment, reactivation",
      "Phase 11 — Nightly billing sweep",
      "Phase 12 — Password reset",
      "Core business rules",
      "QA acceptance checklist",
      "Items to confirm against implementation",
    ],
  },
  "platform-api-spec": {
    group: "4. Use the platform",
    title: "API & Functional Specification",
    onThisPage: [
      "API design principles",
      "Authentication and account APIs",
      "Organization, invitation, and membership APIs",
      "Plans, subscriptions, and billing APIs",
      "Invoice and payment APIs",
      "Admin Console APIs",
      "Validation and authorization matrix",
      "Recommended response shape",
      "Functional rules by domain",
      "Non-functional requirements",
      "API test checklist",
      "Contract confirmation required",
    ],
  },
  "platform-architecture": {
    group: "4. Use the platform",
    title: "Platform Architecture Flow",
    onThisPage: [
      "High-level architecture",
      "Public acquisition and signup",
      "Authenticated customer requests",
      "Admin Console requests",
      "Payment and webhook flow",
      "Background billing flow",
      "Logical backend service boundaries",
      "Data and trust boundaries",
      "Resilience and observability",
      "Architecture decisions to validate",
    ],
  },
};

export const docsPageIds = Object.keys(docsPageMeta) as DocsPageId[];

export function isDocsPageId(value: string): value is DocsPageId {
  return docsPageIds.includes(value as DocsPageId);
}

export function pagePath(id: DocsPageId) {
  return id === "welcome" ? "/openvals-docs" : `/openvals-docs/${id}`;
}
