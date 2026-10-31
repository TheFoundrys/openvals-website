import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import DocsGlobalHeader from "@/components/DocsGlobalHeader";
import { DocsTabItem } from "@/components/DocsTopNavTabs";

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
    items: [
      { id: "rules-thresholds", label: "Rules & Thresholds Summary" },
    ],
  },
];

export const aixlencePageIds = aixlenceNavSections.flatMap((section) =>
  section.items.map((item) => item.id)
);

export const aixlencePageMeta: Record<
  AIxlenceDocsPageId,
  { group: string; title: string; subtitle: string; prev?: AIxlenceDocsPageId; next?: AIxlenceDocsPageId }
> = {
  overview: {
    group: "Module Overview",
    title: "AIxLence Diagnostic Overview & Foundation Pillars",
    subtitle: "Evidence-backed enterprise AI readiness assessment, risk-adjusted value quantification, and sequenced roadmap.",
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

function pagePath(id: AIxlenceDocsPageId) {
  return id === "overview" ? "/aixlence-docs" : `/aixlence-docs/${id}`;
}

function anchor(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function H2({ children }: { children: string }) {
  return (
    <h2
      className="docsH2"
      id={anchor(children)}
      style={{
        fontSize: "26px",
        lineHeight: 1.25,
        margin: "44px 0 16px",
        color: "var(--docs-heading)",
        scrollMarginTop: "90px",
        fontWeight: 700,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="docsParagraph"
      style={{
        color: "var(--docs-muted)",
        fontSize: "16.5px",
        lineHeight: 1.75,
        margin: "0 0 18px",
      }}
    >
      {children}
    </p>
  );
}

function DocsTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div
      className="docsTableWrap"
      style={{
        overflowX: "auto",
        border: "1px solid var(--docs-border)",
        borderRadius: "14px",
        margin: "22px 0 26px",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
        <thead>
          <tr style={{ background: "var(--docs-code-bg)", color: "var(--docs-heading)", textAlign: "left" }}>
            {headers.map((head) => (
              <th
                key={head}
                style={{
                  padding: "14px 18px",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderBottom: "1px solid var(--docs-border)",
                  whiteSpace: "nowrap",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                background: rowIdx % 2 === 1 ? "var(--docs-zebra)" : "transparent",
              }}
            >
              {row.map((cell, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "14px 18px",
                    borderBottom: "1px solid var(--docs-border-soft)",
                    color: "var(--docs-text)",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const stylesMap = {
    info: { border: "rgba(59, 130, 246, 0.35)", bg: "rgba(59, 130, 246, 0.06)", badge: "#3b82f6" },
    warning: { border: "rgba(245, 158, 11, 0.35)", bg: "rgba(245, 158, 11, 0.06)", badge: "#f59e0b" },
    success: { border: "rgba(16, 185, 129, 0.35)", bg: "rgba(16, 185, 129, 0.06)", badge: "#10b981" },
    tip: { border: "rgba(139, 92, 246, 0.35)", bg: "rgba(139, 92, 246, 0.06)", badge: "#8b5cf6" },
  };

  const theme = stylesMap[type];

  return (
    <div
      style={{
        border: `1px solid ${theme.border}`,
        background: theme.bg,
        borderRadius: "12px",
        padding: "18px 22px",
        margin: "24px 0",
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: "15px",
            color: "var(--docs-heading)",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: theme.badge,
            }}
          />
          {title}
        </div>
      )}
      <div style={{ color: "var(--docs-text)", fontSize: "15px", lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function FormulaBox({ formula, label }: { formula: string; label?: string }) {
  return (
    <div
      style={{
        background: "var(--docs-code-bg)",
        border: "1px solid var(--docs-border)",
        borderRadius: "12px",
        padding: "18px 24px",
        margin: "20px 0 24px",
      }}
    >
      {label && (
        <div
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--docs-muted)",
            marginBottom: "8px",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "17px",
          fontWeight: 600,
          color: "var(--docs-heading)",
          letterSpacing: "0.02em",
        }}
      >
        {formula}
      </div>
    </div>
  );
}

function PageBody({ pageId }: { pageId: AIxlenceDocsPageId }) {
  switch (pageId) {
    case "overview":
      return (
        <>
          <Paragraph>
            Enterprise AI initiatives commonly stall because of fragmented data, security gaps, missing validation standards, and unpredictable ROI.
            <strong> AIxLence</strong> replaces guesswork with an evidence-backed, multi-pillar diagnostic. It measures real AI readiness, quantifies the risk-adjusted value of closing capability gaps, and produces a sequenced roadmap.
          </Paragraph>

          <H2>The Six Foundation Pillars</H2>
          <Paragraph>
            AIxLence evaluates enterprise maturity across six foundational pillars. Each pillar is assigned an empirical weight reflecting its relative contribution to enterprise-wide AI operational excellence.
          </Paragraph>

          <DocsTable
            headers={["Pillar", "Weight", "Strategic Focus"]}
            rows={[
              [
                <strong key="p1" style={{ color: "var(--docs-heading)" }}>1. AI Strategy & Readiness</strong>,
                <span key="w1" style={{ fontWeight: 700, color: "#3b82f6" }}>20%</span>,
                "Business value alignment, executive sponsorship, portfolio visibility, and 12–24 month strategic roadmap.",
              ],
              [
                <strong key="p2" style={{ color: "var(--docs-heading)" }}>2. Private AI / LLM Transformation</strong>,
                <span key="w2" style={{ fontWeight: 700, color: "#10b981" }}>15%</span>,
                "Sovereign LLM deployment, private RAG architecture, model selection and routing, prompt and output security gates.",
              ],
              [
                <strong key="p3" style={{ color: "var(--docs-heading)" }}>3. Data Intelligence & Knowledge Systems</strong>,
                <span key="w3" style={{ fontWeight: 700, color: "#f59e0b" }}>20%</span>,
                "Data ownership, observable data pipelines, semantic lineage, high-recall vector retrieval, and dataset governance.",
              ],
              [
                <strong key="p4" style={{ color: "var(--docs-heading)" }}>4. AI Security & Cyber Transformation</strong>,
                <span key="w4" style={{ fontWeight: 700, color: "#ef4444" }}>20%</span>,
                "AI threat modeling, prompt-injection defenses, least-privilege token access, automated red teaming, and incident monitoring.",
              ],
              [
                <strong key="p5" style={{ color: "var(--docs-heading)" }}>5. AI Validation & Assurance</strong>,
                <span key="w5" style={{ fontWeight: 700, color: "#8b5cf6" }}>15%</span>,
                "Production acceptance gates, multi-dimensional benchmarking, DRS and hallucination drift monitoring, reproducible evidence packs.",
              ],
              [
                <strong key="p6" style={{ color: "var(--docs-heading)" }}>6. AI Operating Model & CoE</strong>,
                <span key="w6" style={{ fontWeight: 700, color: "#06b6d4" }}>10%</span>,
                "Decision rights, governance gatekeeping, reusable deployment templates, workforce skills enablement, and KPI cadences.",
              ],
            ]}
          />

          <Callout type="tip" title="Why Multi-Pillar Weighting Matters">
            A high maturity score in model adoption cannot compensate for absent security controls or unobservable data pipelines. AIxLence balances all six dimensions to ensure production safety and reliable ROI.
          </Callout>
        </>
      );

    case "capability-levels":
      return (
        <>
          <Paragraph>
            The AIxLence suite unlocks in three progressive levels. Each level depends on and enforces the prerequisite data of the level before it.
          </Paragraph>

          <H2>Capability Levels & Prerequisites</H2>
          <DocsTable
            headers={["Level", "Meaning", "Unlocked Views", "Prerequisite Requirement"]}
            rows={[
              [
                <div key="l1">
                  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "#3b82f6", color: "#fff", marginRight: "8px" }}>L1</span>
                  <strong style={{ color: "var(--docs-heading)" }}>Baseline</strong>
                </div>,
                "Organization metadata, base and display currency, and financial parameters are configured and stored.",
                <code key="v1">Organisation Profile</code>,
                <span key="r1" style={{ color: "#10b981", fontWeight: 600 }}>None. Start here.</span>,
              ],
              [
                <div key="l2">
                  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "#f59e0b", color: "#fff", marginRight: "8px" }}>L2</span>
                  <strong style={{ color: "var(--docs-heading)" }}>Diagnose</strong>
                </div>,
                "All 36 capability statements scored on the 1–5 evidence scale, with supporting audit notes and artifacts.",
                <code key="v2">Assessment</code>,
                "Organisation Profile saved (recommended).",
              ],
              [
                <div key="l3">
                  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "#10b981", color: "#fff", marginRight: "8px" }}>L3</span>
                  <strong style={{ color: "var(--docs-heading)" }}>Analyze & Act</strong>
                </div>,
                "Maturity analytics, 6-axis radar charts, 4-horizon roadmap, risk-adjusted ROI simulation, intervention mapping, and executive reporting.",
                "Pillar Summary, Roadmap, Investment Simulator, Service Mapping, Executive Dashboard",
                <strong key="r3" style={{ color: "#ef4444" }}>All 36 questions scored and saved.</strong>,
              ],
            ]}
          />

          <Callout type="info" title="Progressive Unlocking">
            Until all 36 questions are evaluated, L3 views (Pillar Summary, Roadmap, Simulator, Service Mapping, Dashboard) will alert the evaluator to complete the diagnostic assessment.
          </Callout>
        </>
      );

    case "navigation":
      return (
        <>
          <Paragraph>
            The AIxLence suite is organized into seven distinct views accessible from the primary navigation bar.
          </Paragraph>

          <H2>Suite Views & Routes</H2>
          <DocsTable
            headers={["View", "Route", "Primary Objective"]}
            rows={[
              [<strong key="v1">Overview</strong>, <code key="r1">/aixlence</code>, "Methodology introduction, strategic pillars, and suite overview."],
              [<strong key="v2">Organisation Profile</strong>, <code key="r2">/aixlence/organization-profile</code>, "Legal entity metadata, multi-currency settings, and AI financial constraints."],
              [<strong key="v3">Assessment</strong>, <code key="r3">/aixlence/assessment</code>, "36 capability diagnostic statements across 6 tabs with evidence audit inputs."],
              [<strong key="v4">Pillar Summary</strong>, <code key="r4">/aixlence/pillar-summary</code>, "6-axis radar chart, normalized maturity scores, target slider, and execution risk index."],
              [<strong key="v5">Roadmap</strong>, <code key="r5">/aixlence/roadmap</code>, "4-horizon transformation sequencing and solution accelerators."],
              [<strong key="v6">Investment Simulator</strong>, <code key="r6">/aixlence/investment-simulator</code>, "DrPinnacle Value Realization Curve, risk-adjusted ROI, and currency conversion."],
              [<strong key="v7">Service Mapping</strong>, <code key="r7">/aixlence/service-mapping</code>, "Diagnosis First, Service Second intervention triggers and delivery pod scoping."],
              [<strong key="v8">Executive Dashboard</strong>, <code key="r8">/aixlence/executive-dashboard</code>, "CXO headline metrics, pillar benchmark grid, and Top 3 Next Best Actions."],
            ]}
          />

          <H2>Recommended 3-Stage Linear Workflow</H2>
          <div style={{ display: "grid", gap: "14px", margin: "24px 0" }}>
            {[
              {
                step: "1",
                title: "Anchor Enterprise Metadata & Budget",
                desc: "Complete the Organisation Profile with headcount, regulatory exposures, currency, and AI capital allocation.",
              },
              {
                step: "2",
                title: "Complete the 36-Question Evidence Diagnostic",
                desc: "Score each capability 1–5 based on concrete documentation and deployed tooling, noting audit references.",
              },
              {
                step: "3",
                title: "Unlock Analytics, Roadmap, and Simulator",
                desc: "Examine radar gaps, review the sequenced roadmap, simulate risk-adjusted value capture, and export board reports.",
              },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px 20px",
                  border: "1px solid var(--docs-border)",
                  borderRadius: "12px",
                  background: "var(--docs-card)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--docs-heading)",
                    color: "var(--docs-bg)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {st.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--docs-heading)", fontSize: "16px", marginBottom: "4px" }}>
                    {st.title}
                  </div>
                  <div style={{ color: "var(--docs-muted)", fontSize: "14.5px", lineHeight: 1.6 }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "organization-profile":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/organization-profile</code>
          </Paragraph>
          <Paragraph>
            The profile anchors your assessment with company metadata, currency settings, and financial parameters. All analytics across the entire platform depend on these foundational inputs.
          </Paragraph>

          <H2>Enterprise Metadata Parameters</H2>
          <DocsTable
            headers={["Field", "Type", "Description / Supported Options"]}
            rows={[
              [<strong key="f1">Organization Name</strong>, "Text", "Legal or operating entity being assessed."],
              [<strong key="f2">Organization Logo URL</strong>, "URL (Optional)", "Rendered in executive report headers and audit exports."],
              [<strong key="f3">Industry Sector</strong>, "Select", "Financial Services, Healthcare & Life Sciences, Retail & eCommerce, Manufacturing, Public Sector, Technology, etc."],
              [<strong key="f4">Country / Region</strong>, "Text / Select", "Primary headquarters or target deployment jurisdiction."],
              [<strong key="f5">Organization Size (FTEs)</strong>, "Select", "Startup (<50), Mid-Market (50–500), Enterprise (500–5,000), Global Enterprise (5,000+)."],
              [<strong key="f6">Primary User Persona</strong>, "Select", "C-Suite Executive, Enterprise AI Architect, Security Officer, Data Science Lead, Compliance Director."],
              [<strong key="f7">AI Adoption Stage</strong>, "Select", "Exploring (initial experimentation), Piloting (PoCs in staging), Scaling (multiple production deployments), Mature (orchestration with automated governance)."],
              [<strong key="f8">Regulatory Exposure</strong>, "Select", "Low, Moderate, High, or Critical (EU AI Act, HIPAA, SOC 2, FINRA, PCI-DSS, ISO 42001)."],
              [<strong key="f9">Assessment Owner & Date</strong>, "Identity / Date", "Accountable enterprise lead and date of the diagnostic review."],
            ]}
          />

          <H2>Multi-Currency Normalization</H2>
          <Paragraph>
            All calculations inside the calculation engine run in <strong>USD</strong> to enable consistent cross-region and cross-business-unit benchmarking, with dynamic localized display:
          </Paragraph>
          <ul style={{ color: "var(--docs-muted)", fontSize: "16px", lineHeight: 1.8, paddingLeft: "24px" }}>
            <li><strong>Base Currency:</strong> Fixed to USD for uniform valuation logic.</li>
            <li><strong>Display Currency:</strong> INR, EUR, GBP, AED, SGD, CAD, JPY, CHF, or AUD.</li>
            <li><strong>Exchange Rate (FX per USD):</strong> Live or configured exchange rate (e.g. 83.00 for USD/INR, 0.92 for USD/EUR).</li>
          </ul>

          <H2>AI Financial Parameters</H2>
          <DocsTable
            headers={["Parameter", "Description", "Role in Engine"]}
            rows={[
              [<strong key="p1">Planned AI Investment</strong>, "Total capital and operating budget for AI over the next 12–24 months.", "Denominator for Risk-Adjusted ROI calculations."],
              [<strong key="p2">Estimated Annual AI Benefit</strong>, "Gross projected benefit (productivity savings, new top-line revenue, labor velocity lift).", "Multiplied by P(Value) to determine Risk-Adjusted Annual Benefit."],
              [<strong key="p3">Annual AI Operating Cost</strong>, "Recurring compute, hosting, API token consumption, licensing, and maintenance cost.", "Subtracted from Risk-Adjusted Benefit to calculate Net Realized Value."],
            ]}
          />

          <Callout type="success" title="Persistence & Sync">
            Clicking <strong>Save Profile</strong> synchronizes conversions across the investment simulator, executive dashboard, and printable exports immediately.
          </Callout>
        </>
      );

    case "assessment":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/assessment</code>
          </Paragraph>
          <Paragraph>
            The assessment contains <strong>36 capability statements</strong> (six per pillar), each evaluated on an objective 5-point evidence scale.
          </Paragraph>

          <H2>The 5-Point Maturity Scoring Scale</H2>
          <DocsTable
            headers={["Score", "Label", "Operational Definition", "Evidence Expected for Audit"]}
            rows={[
              [
                <span key="s1" style={{ fontWeight: 800, color: "#ef4444" }}>1</span>,
                <strong key="l1" style={{ color: "#ef4444" }}>Absent</strong>,
                "No repeatable capability exists.",
                "No documentation, tooling, or assigned responsibility.",
              ],
              [
                <span key="s2" style={{ fontWeight: 800, color: "#f97316" }}>2</span>,
                <strong key="l2" style={{ color: "#f97316" }}>Reactive</strong>,
                "Ad hoc, informal, manual efforts.",
                "Informal scripts, isolated spreadsheets, individual heroics, unvetted shadow tools.",
              ],
              [
                <span key="s3" style={{ fontWeight: 800, color: "#f59e0b" }}>3</span>,
                <strong key="l3" style={{ color: "#f59e0b" }}>Defined</strong>,
                "Documented and repeatable in primary teams.",
                "Standard operating procedures, assigned roles, standard tooling in pilot squads.",
              ],
              [
                <span key="s4" style={{ fontWeight: 800, color: "#3b82f6" }}>4</span>,
                <strong key="l4" style={{ color: "#3b82f6" }}>Managed</strong>,
                "Measured, governed, operationalized across the enterprise.",
                "Automated monitoring, cross-functional policy enforcement, SLAs, regular review cadences.",
              ],
              [
                <span key="s5" style={{ fontWeight: 800, color: "#10b981" }}>5</span>,
                <strong key="l5" style={{ color: "#10b981" }}>Optimized</strong>,
                "Continuously improved and self-healing.",
                "Automated drift adaptation, continuous adversarial red teaming, enterprise feedback loops.",
              ],
            ]}
          />

          <H2>Interface Features & Priority Signals</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", margin: "22px 0" }}>
            {[
              { title: "Pillar Navigation Tabs", desc: "Switch pillars with the sticky tab bar. Each tab displays an icon, pillar weight (10–20%), and answered question counter." },
              { title: "Priority Signals", desc: "Scores 1–2 trigger Critical priority. Score 3 triggers High. Score 4 triggers Moderate. Score 5 triggers Low." },
              { title: "Audit Evidence & Notes", desc: "Under each statement, attach policy links, Jira tickets, Git commit refs, or caveats. Notes persist into the audit register." },
              { title: "Live Progress Tracker", desc: "Sticky header indicates real-time completion status (e.g. '36 / 36 Answered') and guards against incomplete submissions." },
            ].map((f, i) => (
              <div key={i} style={{ border: "1px solid var(--docs-border)", borderRadius: "10px", padding: "16px", background: "var(--docs-card)" }}>
                <div style={{ fontWeight: 700, color: "var(--docs-heading)", marginBottom: "6px" }}>{f.title}</div>
                <div style={{ fontSize: "14px", color: "var(--docs-muted)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          <Callout type="warning" title="Auditor Tip: Score Evidence, Not Intent">
            If a capability exists only in a single innovation lab or team sandbox, it is a <strong>2 or 3</strong>, never a 4. Enterprise governance requires repeatable institutional mechanisms.
          </Callout>
        </>
      );

    case "pillar-summary":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/pillar-summary</code>
          </Paragraph>
          <Paragraph>
            The pillar summary view plots Current Maturity (0–100) against Target State (default 80) across all six axes on a radar chart. Lopsided shapes instantly reveal architectural vulnerabilities—such as aggressive LLM application deployment paired with absent security safeguards.
          </Paragraph>

          <H2>Normalized Pillar Score Formula</H2>
          <Paragraph>
            Scores are normalized to a 0–100 index according to statement weights:
          </Paragraph>
          <FormulaBox
            label="Pillar Score (0–100)"
            formula="Pillar Score = Σ(weight × score) ÷ Σ(weight × 5) × 100"
          />

          <Paragraph>
            Target Gap is calculated relative to your target threshold:
          </Paragraph>
          <FormulaBox
            label="Target Gap Formula"
            formula="Target Gap = Target Score − Current Score"
          />

          <H2>Execution Risk Bands</H2>
          <DocsTable
            headers={["Score Range", "Execution Risk", "Operational Impact"]}
            rows={[
              [
                "Below 40.0",
                <span key="r1" style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(239, 68, 68, 0.15)", color: "#ef4444", fontWeight: 700 }}>Critical</span>,
                "Immediate operational vulnerability; unmanaged public API leaks or severe compliance exposure.",
              ],
              [
                "40.0 – 59.9",
                <span key="r2" style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(249, 115, 22, 0.15)", color: "#f97316", fontWeight: 700 }}>High</span>,
                "Structural capability bottleneck; high failure rate in staging-to-production transitions.",
              ],
              [
                "60.0 – 74.9",
                <span key="r3" style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", fontWeight: 700 }}>Moderate</span>,
                "Operational friction; manual reviews slow down release velocity.",
              ],
              [
                "75.0 and above",
                <span key="r4" style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", fontWeight: 700 }}>Low</span>,
                "Stable, governed foundation enabling rapid, safe innovation.",
              ],
            ]}
          />

          <H2>Roadmap Priority Thresholds</H2>
          <DocsTable
            headers={["Priority Tier", "Target Gap", "Remediation Timeframe"]}
            rows={[
              [<strong key="p1" style={{ color: "#ef4444" }}>P1</strong>, "40 or more", "0–30 days (Immediate Stabilization)"],
              [<strong key="p2" style={{ color: "#f97316" }}>P2</strong>, "25 to 39.9", "31–90 days (Core Engineering)"],
              [<strong key="p3" style={{ color: "#f59e0b" }}>P3</strong>, "10 to 24.9", "3–6 months (Enterprise Scale)"],
              [<strong key="p4" style={{ color: "#10b981" }}>Maintain</strong>, "Below 10", "6–12 months (Continuous Optimization)"],
            ]}
          />
        </>
      );

    case "roadmap":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/roadmap</code>
          </Paragraph>
          <Paragraph>
            The transformation roadmap converts identified gaps into a time-phased execution sequence across four horizons.
          </Paragraph>

          <H2>The Four Execution Horizons</H2>
          <DocsTable
            headers={["Horizon", "Window", "Assigned Priority", "Typical Remediation Focus"]}
            rows={[
              [
                <strong key="h1" style={{ color: "#ef4444" }}>1: Immediate Stabilization</strong>,
                "0–30 days",
                <span key="p1" style={{ color: "#ef4444", fontWeight: 700 }}>P1 (Gap ≥ 40)</span>,
                "Close critical cyber exposures, establish basic gatekeeping, terminate unmanaged shadow API keys, deploy prompt boundary filters.",
              ],
              [
                <strong key="h2" style={{ color: "#f97316" }}>2: Core Engineering & Architecture</strong>,
                "31–90 days",
                <span key="p2" style={{ color: "#f97316", fontWeight: 700 }}>P2 (Gap 25–39.9)</span>,
                "Deploy private sovereign RAG infrastructure, establish observable data pipelines, install baseline model validation suites.",
              ],
              [
                <strong key="h3" style={{ color: "#f59e0b" }}>3: Enterprise Scale & Governance</strong>,
                "3–6 months",
                <span key="p3" style={{ color: "#f59e0b", fontWeight: 700 }}>P3 (Gap 10–24.9)</span>,
                "Implement automated regression gates, instantiate federated CoE delivery pods, configure continuous model drift monitoring.",
              ],
              [
                <strong key="h4" style={{ color: "#10b981" }}>4: Continuous Optimization</strong>,
                "6–12 months",
                <span key="p4" style={{ color: "#10b981", fontWeight: 700 }}>Maintain (Gap &lt; 10)</span>,
                "Automated multi-model benchmarking, continuous inference cost reduction, fine-tuning feedback loops, autonomous red teaming.",
              ],
            ]}
          />

          <H2>Integrated Solution Accelerators</H2>
          <div style={{ display: "grid", gap: "12px", margin: "20px 0" }}>
            {[
              { name: "OpenLxM", tag: "Private LLM Platform", desc: "Sovereign model routing, local RAG architectures, prompt and token security boundaries." },
              { name: "OpenVals", tag: "Validation & Benchmarking", desc: "Automated test suites, continuous DRS and drift monitoring, Trust Reports and audit packages." },
              { name: "RedShield", tag: "AI Cyber Defense", desc: "Adversarial red teaming, real-time prompt-injection shields, jailbreak defense proxies." },
              { name: "AI CoE", tag: "Operating Model Advisory", desc: "Decision rights frameworks, capability enablement workshops, cross-team KPI tracking." },
              { name: "AIxlence", tag: "Governance & Roadmap", desc: "Strategic governance advisory, portfolio visibility, and risk-adjusted capital allocation." },
            ].map((acc) => (
              <div
                key={acc.name}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  border: "1px solid var(--docs-border)",
                  borderRadius: "10px",
                  background: "var(--docs-card)",
                }}
              >
                <div style={{ minWidth: "120px" }}>
                  <div style={{ fontWeight: 800, color: "var(--docs-heading)", fontSize: "16px" }}>{acc.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>{acc.tag}</div>
                </div>
                <div style={{ fontSize: "14.5px", color: "var(--docs-muted)", lineHeight: 1.6 }}>{acc.desc}</div>
              </div>
            ))}
          </div>
        </>
      );

    case "investment-simulator":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/investment-simulator</code>
          </Paragraph>
          <Paragraph>
            The investment simulator quantifies the monetary return of closing capability gaps. Planned AI benefits are not guaranteed: <strong>capability maturity determines how much projected value your organization actually captures</strong>.
          </Paragraph>

          <H2>The DrPinnacle Value Realization Curve</H2>
          <FormulaBox
            label="Probability of Value Capture P(Value)"
            formula="P(Value) = min(90%, max(25%, 20% + Score × 0.7%))"
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "20px 0" }}>
            <div style={{ border: "1px solid rgba(239, 68, 68, 0.3)", background: "rgba(239, 68, 68, 0.05)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontWeight: 700, color: "#ef4444", fontSize: "15px", marginBottom: "6px" }}>At Score 20 (Exploring)</div>
              <div style={{ fontSize: "14px", color: "var(--docs-text)", lineHeight: 1.6 }}>
                Realization probability is only <strong>~34%</strong>. Up to <strong>66% of projected returns</strong> are lost to failed deployments, rework, compliance blocks, and security incidents.
              </div>
            </div>
            <div style={{ border: "1px solid rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.05)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontWeight: 700, color: "#10b981", fontSize: "15px", marginBottom: "6px" }}>At Score 80 (Managed/Optimized)</div>
              <div style={{ fontSize: "14px", color: "var(--docs-text)", lineHeight: 1.6 }}>
                Realization probability rises to <strong>~76%</strong>, capturing maximum top-line efficiency with negligible rework.
              </div>
            </div>
          </div>

          <H2>Calculated Simulator Metrics</H2>
          <DocsTable
            headers={["Output Metric", "Calculation Formula", "Interpretation"]}
            rows={[
              [
                <strong key="m1">Risk-Adjusted Annual Benefit</strong>,
                <code key="f1">Gross Benefit × P(Value)</code>,
                "Expected gross benefit actually captured given current organizational maturity.",
              ],
              [
                <strong key="m2">Risk-Adjusted Net Value</strong>,
                <code key="f2">Risk-Adjusted Benefit − Annual OpCost</code>,
                "Bottom-line value realized after factoring in compute, licenses, and maintenance.",
              ],
              [
                <strong key="m3">Risk-Adjusted ROI</strong>,
                <code key="f3">(Net Value ÷ Planned Investment) × 100</code>,
                "True capital return adjusted for deployment friction and failure probability.",
              ],
              [
                <strong key="m4">Incremental Value Lift</strong>,
                <code key="f4">Target Net Value − Current Net Value</code>,
                "The monetary gain achieved specifically by maturing from current score to target score.",
              ],
              [
                <strong key="m5">Improvement Value Multiple</strong>,
                <code key="f5">Lift ÷ Estimated Transformation Cost</code>,
                "Return multiple generated per dollar invested into capability uplift interventions.",
              ],
            ]}
          />
        </>
      );

    case "service-mapping":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/service-mapping</code>
          </Paragraph>
          <Paragraph>
            AIxLence adheres strictly to the <strong>&ldquo;Diagnosis First, Service Second&rdquo;</strong> principle. Interventions are never pitched arbitrarily; they are activated only when empirical evidence demonstrates structural risk.
          </Paragraph>

          <H2>Intervention Activation Trigger</H2>
          <Paragraph>
            A capability statement or pillar is flagged as <strong>Active (Needs Intervention)</strong> whenever:
          </Paragraph>
          <FormulaBox
            label="Automated Intervention Trigger Rule"
            formula="Target Gap ≥ 15  OR  Current Score < 70"
          />

          <H2>Three Intervention Delivery Modalities</H2>
          <DocsTable
            headers={["Modality", "Operational Scope", "Typical Deliverables"]}
            rows={[
              [
                <strong key="mod1" style={{ color: "#3b82f6" }}>1. Advisory</strong>,
                "Executive alignment, policy formulation, ethical gatekeeping, and organizational design.",
                "Portfolio priority maps, AI ethics frameworks, threat modeling matrices, decision-rights charters.",
              ],
              [
                <strong key="mod2" style={{ color: "#10b981" }}>2. Transformation / Build Pod</strong>,
                "Embedded senior engineering squads deploying production-ready architectures alongside client staff.",
                "Sovereign LLM gateways, private RAG pipelines, data lineage collectors, prompt firewall proxies.",
              ],
              [
                <strong key="mod3" style={{ color: "#8b5cf6" }}>3. Validation Lab / Managed Assurance</strong>,
                "Independent continuous testing, red teaming, and release-gate verification.",
                "Automated DRS benchmark runners, prompt-injection penetration tests, Trust Reports for auditors.",
              ],
            ]}
          />
        </>
      );

    case "executive-dashboard":
      return (
        <>
          <Paragraph>
            <strong>Route:</strong> <code>/aixlence/executive-dashboard</code>
          </Paragraph>
          <Paragraph>
            Designed specifically for CXO and board-level governance reviews, the Executive Dashboard synthesizes diagnostic data into strategic decision-support views.
          </Paragraph>

          <H2>Core Dashboard Sections</H2>
          <div style={{ display: "grid", gap: "16px", margin: "20px 0" }}>
            <div style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "18px", background: "var(--docs-card)" }}>
              <div style={{ fontWeight: 800, color: "var(--docs-heading)", fontSize: "16px", marginBottom: "6px" }}>
                1. Executive Headline Metrics
              </div>
              <ul style={{ color: "var(--docs-muted)", fontSize: "14.5px", lineHeight: 1.7, margin: 0, paddingLeft: "20px" }}>
                <li>Overall maturity score (0–100) and maturity tier label</li>
                <li>Execution risk index (Critical, High, Moderate, Low)</li>
                <li>Top priority bottleneck pillar requiring urgent intervention</li>
                <li>Current vs. Target Risk-Adjusted ROI percentage</li>
                <li>Total incremental net value unlocked by closing target gaps</li>
              </ul>
            </div>

            <div style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "18px", background: "var(--docs-card)" }}>
              <div style={{ fontWeight: 800, color: "var(--docs-heading)", fontSize: "16px", marginBottom: "6px" }}>
                2. Capability Benchmark Grid
              </div>
              <p style={{ color: "var(--docs-muted)", fontSize: "14.5px", lineHeight: 1.6, margin: 0 }}>
                Side-by-side comparative table exhibiting Current Score, Target Score, and Net Gap across all six pillars simultaneously, with color-coded risk indicators.
              </p>
            </div>

            <div style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "18px", background: "var(--docs-card)" }}>
              <div style={{ fontWeight: 800, color: "var(--docs-heading)", fontSize: "16px", marginBottom: "6px" }}>
                3. Top 3 Next Best Actions
              </div>
              <p style={{ color: "var(--docs-muted)", fontSize: "14.5px", lineHeight: 1.6, margin: 0 }}>
                Algorithmically ranked highest-leverage interventions with concrete implementation timeframes, estimated budget requirements, and target value capture outcomes.
              </p>
            </div>
          </div>
        </>
      );

    case "reporting":
      return (
        <>
          <Paragraph>
            Export audit-ready executive reports directly from the top navigation bar or the Executive Dashboard using <strong>Download Executive Report</strong> or <strong>Print / Export PDF</strong>.
          </Paragraph>

          <H2>Report Deliverable Formats</H2>
          <DocsTable
            headers={["Format", "Specifications", "Audience / Use Case"]}
            rows={[
              [
                <strong key="fmt1">Standalone HTML Report</strong>,
                "Self-contained single-file document containing enterprise logo, radar chart, executive KPI cards, full 36-question audit register with evidence notes, ROI tables, and phased roadmap.",
                "Internal enterprise archiving, compliance audits, and offline executive reviews.",
              ],
              [
                <strong key="fmt2">Print / PDF Export</strong>,
                "Targeted browser CSS print stylesheets with automated page-break controls, high-contrast monochrome tables, and vector chart rendering in portrait or landscape.",
                "Board packages, audit committees, and regulatory filings (EU AI Act, SOC 2, HIPAA).",
              ],
            ]}
          />

          <Callout type="tip" title="Audit Trail Transparency">
            Every score change and auditor note recorded in Step 2 is timestamped and included in the exported audit register to ensure complete chain-of-custody compliance.
          </Callout>
        </>
      );

    case "rules-thresholds":
      return (
        <>
          <Paragraph>
            Consolidated reference for all statistical thresholds, calculation formulas, and governance cadences enforced by the AIxLence evaluation engine.
          </Paragraph>

          <H2>Rules and Thresholds at a Glance</H2>
          <DocsTable
            headers={["Engine Parameter", "Threshold or Formula", "Operational Context"]}
            rows={[
              [
                <strong key="f1">Pillar Score</strong>,
                <code key="c1">Σ(weight × score) ÷ Σ(weight × 5) × 100</code>,
                "Normalizes statement evaluations to a 0–100 index.",
              ],
              [
                <strong key="f2">Target Score</strong>,
                "Default 80 (adjustable 50–95)",
                "Benchmark threshold against which capability gaps are derived.",
              ],
              [
                <strong key="f3">Target Gap</strong>,
                <code key="c2">Target Score − Current Score</code>,
                "Drives horizon assignment and priority scheduling.",
              ],
              [
                <strong key="f4">Execution Risk</strong>,
                "Critical: <40 | High: 40–59.9 | Moderate: 60–74.9 | Low: ≥75",
                "Color-coded risk indicators across dashboards.",
              ],
              [
                <strong key="f5">Roadmap Priority</strong>,
                "P1: Gap ≥ 40 | P2: Gap ≥ 25 | P3: Gap ≥ 10 | Maintain: Gap < 10",
                "Assigns capabilities into Horizons 1 through 4.",
              ],
              [
                <strong key="f6">Intervention Trigger</strong>,
                <code key="c3">{"Target Gap ≥ 15  OR  Current Score < 70"}</code>,
                "Activates Advisory, Build Pod, or Validation Lab services.",
              ],
              [
                <strong key="f7">Value Realization P(Value)</strong>,
                <code key="c4">min(90%, max(25%, 20% + score × 0.7%))</code>,
                "DrPinnacle curve determining captured proportion of gross AI benefits.",
              ],
              [
                <strong key="f8">Assessment Cadence</strong>,
                <span key="c5" style={{ fontWeight: 700, color: "#10b981" }}>Every 90 days</span>,
                "Quarterly re-assessment recommended to capture capability progression.",
              ],
            ]}
          />
        </>
      );
  }
}

export function AIxlenceDocsContent({ pageId = "overview" }: { pageId?: AIxlenceDocsPageId }) {
  const meta = aixlencePageMeta[pageId] || aixlencePageMeta.overview;

  const currentSection = meta.group;
  const aixlenceTabs: DocsTabItem[] = [
    {
      id: "overview-group",
      label: "Module Overview",
      href: "/aixlence-docs",
      active: currentSection === "Module Overview",
    },
    {
      id: "guide-group",
      label: "User Guide",
      href: "/aixlence-docs/organization-profile",
      active: currentSection === "User Guide",
    },
    {
      id: "reference-group",
      label: "Reference & Formulas",
      href: "/aixlence-docs/rules-thresholds",
      active: currentSection === "Reference & Formulas",
    },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --docs-bg: #ffffff;
              --docs-panel: #ffffff;
              --docs-header: rgba(255, 255, 255, 0.94);
              --docs-card: #ffffff;
              --docs-code-bg: #f8fafc;
              --docs-heading: #111827;
              --docs-text: #1f2937;
              --docs-muted: #6b7280;
              --docs-border: #e5e7eb;
              --docs-border-soft: #f1f5f9;
              --docs-zebra: #f8fafc;
              --docs-accent: #2563eb;
              --docs-accent-subtle: rgba(37, 99, 235, 0.08);
              --docs-pill-bg: #f1f5f9;
              --docs-pill-border: #cbd5e1;
              --docs-pill-border-hover: #94a3b8;
              --docs-dropdown-bg: #ffffff;
              --docs-dropdown-border: #e2e8f0;
              --docs-dropdown-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06);
              --accent: #2563eb;
            }

            @media (prefers-color-scheme: dark) {
              :root {
                --docs-bg: #07090e;
                --docs-panel: #07090e;
                --docs-header: rgba(7, 9, 14, 0.94);
                --docs-card: #0e111a;
                --docs-code-bg: #131722;
                --docs-heading: #f8fafc;
                --docs-text: #cbd5e1;
                --docs-muted: #94a3b8;
                --docs-border: #1e2433;
                --docs-border-soft: #141824;
                --docs-zebra: #0d1018;
                --docs-accent: #3b82f6;
                --docs-accent-subtle: rgba(59, 130, 246, 0.14);
                --docs-pill-bg: #12151f;
                --docs-pill-border: #232a3b;
                --docs-pill-border-hover: #3b82f6;
                --docs-dropdown-bg: #0e111a;
                --docs-dropdown-border: #232a3b;
                --docs-dropdown-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.3);
                --accent: #3b82f6;
              }
            }

            html.dark :root {
              --docs-bg: #07090e;
              --docs-panel: #07090e;
              --docs-header: rgba(7, 9, 14, 0.94);
              --docs-card: #0e111a;
              --docs-code-bg: #131722;
              --docs-heading: #f8fafc;
              --docs-text: #cbd5e1;
              --docs-muted: #94a3b8;
              --docs-border: #1e2433;
              --docs-border-soft: #141824;
              --docs-zebra: #0d1018;
              --docs-accent: #3b82f6;
              --docs-accent-subtle: rgba(59, 130, 246, 0.14);
              --docs-pill-bg: #12151f;
              --docs-pill-border: #232a3b;
              --docs-pill-border-hover: #3b82f6;
              --docs-dropdown-bg: #0e111a;
              --docs-dropdown-border: #232a3b;
              --docs-dropdown-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.3);
              --accent: #3b82f6;
            }

            html, body {
              background: var(--docs-bg) !important;
              color-scheme: light dark;
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
            }

            .docsShell * {
              box-sizing: border-box;
            }

            .docsMobileNav {
              display: none;
            }

            @media (max-width: 860px) {
              .docsBodyGrid {
                grid-template-columns: minmax(0, 1fr) !important;
              }

              .docsSidebar {
                display: none !important;
              }

              .docsGlobalHeaderRow1,
              .docsGlobalHeaderRow2 {
                padding: 0 16px !important;
              }

              .docsMobileNav {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                padding: 10px 16px;
                position: sticky;
                top: 96px;
                z-index: 20;
                background: var(--docs-header);
                border-bottom: 1px solid var(--docs-border-soft);
                backdrop-filter: blur(12px);
                scrollbar-width: none;
                -webkit-overflow-scrolling: touch;
              }

              .docsMobileNav::-webkit-scrollbar {
                display: none;
              }

              .docsMobileNavItem {
                flex: 0 0 auto;
                padding: 7px 12px;
                border: 1px solid var(--docs-border);
                border-radius: 999px;
                background: var(--docs-card);
                color: var(--docs-muted);
                font-size: 13.5px;
                font-weight: 600;
                line-height: 1;
                text-decoration: none;
                white-space: nowrap;
                transition: all 0.15s ease;
              }

              .docsMobileNavItem:hover {
                color: var(--docs-heading);
                border-color: var(--docs-border-strong);
              }

              .docsMobileNavItem.isActive {
                border-color: var(--docs-accent, #2563eb);
                color: var(--docs-accent, #2563eb);
                background: var(--docs-accent-subtle, rgba(37, 99, 235, 0.12));
                font-weight: 700;
              }

              .docsPageWrap {
                width: 100% !important;
                max-width: none !important;
                margin: 0 !important;
                padding: 30px 20px 80px !important;
              }

              .docsTitle {
                font-size: clamp(28px, 8vw, 36px) !important;
              }
            }

            @media (max-width: 380px) {
              .docsGlobalHeaderRow1,
              .docsGlobalHeaderRow2 {
                padding: 0 12px !important;
              }

              .docsPageWrap {
                padding-left: 14px !important;
                padding-right: 14px !important;
              }
            }
          `,
        }}
      />

      <div
        className="docsShell"
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "var(--docs-bg)",
          color: "var(--docs-text)",
          display: "flex",
          flexDirection: "column",
          colorScheme: "light dark",
        }}
      >
        {/* Unified 2-tier docs header matching Arize screenshot */}
        <DocsGlobalHeader currentSuite="aixlence" tabs={aixlenceTabs} />

        {/* MAIN BODY GRID: Sidebar + Content */}
        <div className="docsBodyGrid" style={{ display: "grid", gridTemplateColumns: "290px minmax(0, 1fr)", flex: 1, minHeight: 0 }}>
          {/* SIDEBAR */}
          <aside
            className="docsSidebar"
            style={{
              height: "calc(100vh - 96px)",
              position: "sticky",
              top: "96px",
              borderRight: "1px solid var(--docs-border)",
              padding: "28px 24px 40px",
              overflowY: "auto",
              background: "var(--docs-panel)",
            }}
          >

          {/* Navigation Sections */}
          <nav style={{ display: "grid", gap: "28px" }}>
            {aixlenceNavSections.map((section) => (
              <div key={section.title}>
                <div
                  style={{
                    color: "var(--docs-heading)",
                    fontSize: "13px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "12px",
                  }}
                >
                  {section.title}
                </div>
                <div style={{ borderLeft: "1px solid var(--docs-border)", display: "grid", gap: "12px" }}>
                  {section.items.map((item) => {
                    const active = item.id === pageId;
                    return (
                      <Link
                        key={item.id}
                        href={pagePath(item.id)}
                        style={{
                          color: active ? "var(--docs-heading)" : "var(--docs-muted)",
                          textDecoration: "none",
                          fontSize: "14.5px",
                          fontWeight: active ? 700 : 500,
                          paddingLeft: "16px",
                          borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                          marginLeft: "-1px",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer quick links */}
          <div
            style={{
              borderTop: "1px solid var(--docs-border)",
              marginTop: "36px",
              paddingTop: "20px",
              display: "grid",
              gap: "12px",
            }}
          >
            <Link
              href="/openvals-docs"
              style={{
                color: "var(--docs-muted)",
                fontSize: "13.5px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              OpenVals Platform Docs <ExternalLink size={14} />
            </Link>
            <Link
              href="/aixlence"
              style={{
                color: "var(--docs-muted)",
                fontSize: "13.5px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              AIxLence Product Page <ExternalLink size={14} />
            </Link>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <section
          className="docsContent"
          style={{
            minWidth: 0,
            padding: "0 0 96px 0",
            background: "var(--docs-bg)",
          }}
        >
          {/* Mobile Tab Scroll Bar */}
          <nav className="docsMobileNav" aria-label="AIxLence Docs Navigation">
            {aixlenceNavSections.flatMap((section) =>
              section.items.map((item) => {
                const active = item.id === pageId;
                return (
                  <Link
                    key={`${section.title}-${item.id}`}
                    href={pagePath(item.id)}
                    className={`docsMobileNavItem${active ? " isActive" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })
            )}
          </nav>

          {/* Page Article Content */}
          <div
            className="docsPageWrap"
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              padding: "48px 48px 96px",
            }}
          >
            <article className="docsArticle" style={{ minWidth: 0 }}>
              <div
                className="docsEyebrow"
                style={{
                  color: "var(--accent)",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {meta.group}
              </div>

              <h1
                className="docsTitle"
                style={{
                  fontSize: "38px",
                  lineHeight: 1.15,
                  fontWeight: 800,
                  margin: "0 0 16px",
                  color: "var(--docs-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                {meta.title}
              </h1>

              {meta.subtitle && (
                <div
                  style={{
                    fontSize: "18px",
                    color: "var(--docs-muted)",
                    lineHeight: 1.6,
                    marginBottom: "36px",
                    borderBottom: "1px solid var(--docs-border-soft)",
                    paddingBottom: "24px",
                  }}
                >
                  {meta.subtitle}
                </div>
              )}

              <PageBody pageId={pageId} />

              {/* Prev / Next Pagination */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--docs-border)",
                  marginTop: "64px",
                  paddingTop: "32px",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                {meta.prev ? (
                  <Link
                    href={pagePath(meta.prev)}
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textDecoration: "none",
                      padding: "14px 18px",
                      border: "1px solid var(--docs-border)",
                      borderRadius: "10px",
                      background: "var(--docs-card)",
                      minWidth: "200px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--docs-muted)", fontWeight: 600 }}>
                      &larr; Previous
                    </span>
                    <span style={{ fontSize: "14.5px", color: "var(--docs-heading)", fontWeight: 700, marginTop: "4px" }}>
                      {aixlencePageMeta[meta.prev]?.title?.replace(/^Step \d+: /, "") || "Previous Step"}
                    </span>
                  </Link>
                ) : <div />}

                {meta.next ? (
                  <Link
                    href={pagePath(meta.next)}
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textDecoration: "none",
                      padding: "14px 18px",
                      border: "1px solid var(--docs-border)",
                      borderRadius: "10px",
                      background: "var(--docs-card)",
                      minWidth: "200px",
                      marginLeft: "auto",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--docs-muted)", fontWeight: 600 }}>
                      Next &rarr;
                    </span>
                    <span style={{ fontSize: "14.5px", color: "var(--docs-heading)", fontWeight: 700, marginTop: "4px" }}>
                      {aixlencePageMeta[meta.next]?.title?.replace(/^Step \d+: /, "") || "Next Step"}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

export function isAIxlenceDocsPageId(value: string): value is AIxlenceDocsPageId {
  return aixlencePageIds.includes(value as AIxlenceDocsPageId);
}
