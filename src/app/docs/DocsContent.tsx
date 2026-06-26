import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import CopyableCodeBlock from "./CopyableCodeBlock";

type DocsPageId =
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
  | "domains"
  | "roadmap"
  | "vision"
  | "contributing"
  | "code-of-conduct"
  | "security-policy";

const navSections: Array<{ title: string; items: Array<{ id: DocsPageId; label: string }> }> = [
  {
    title: "Get started",
    items: [
      { id: "welcome", label: "Welcome" },
      { id: "why-openvals", label: "Why OpenVals" },
      { id: "installation", label: "Installation" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Core Capabilities",
    items: [
      { id: "drs", label: "DRS" },
      { id: "model-evaluation", label: "Model Evaluation" },
      { id: "factuality-engine", label: "Factuality Engine" },
      { id: "hpi", label: "Hallucination Probability Index (HPI)" },
      { id: "dataset-intelligence", label: "Dataset Intelligence" },
      { id: "benchmarking", label: "Benchmarking" },
      { id: "parallel-execution", label: "Parallel Execution" },
      { id: "semantic-intelligence", label: "Semantic Intelligence" },
      { id: "reporting", label: "Executive Reporting" },
      { id: "screenshots", label: "Screenshots & Previews" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "metrics", label: "Metrics" },
      { id: "domains", label: "Domains" },
      { id: "roadmap", label: "Roadmap" },
      { id: "vision", label: "Vision" },
      { id: "contributing", label: "Contributing" },
      { id: "code-of-conduct", label: "Code of Conduct" },
      { id: "security-policy", label: "Security Policy" },
    ],
  },
];

export const docsPageIds = navSections.flatMap((section) => section.items.map((item) => item.id));

const pageMeta: Record<DocsPageId, { group: string; title: string; onThisPage: string[] }> = {
  welcome: { group: "Get started", title: "OpenVals documentation", onThisPage: ["Platform", "Trust Infrastructure", "What is OpenVals?", "Built For", "Final Thought"] },
  "why-openvals": { group: "Get started", title: "Why OpenVals", onThisPage: ["Problem", "Why OpenVals?", "Enterprise Use Cases", "What It Solves"] },
  installation: { group: "Get started", title: "Installation", onThisPage: ["Install", "Requirements"] },
  "quick-start": { group: "Get started", title: "60-Second Quick Start", onThisPage: ["1. Install the CLI", "2. Run a Benchmark", "3. Validate a Dataset", "Benchmark Multiple Models with Config", "Show Version", "Python SDK Example", "Example Trust Intelligence Report"] },
  drs: { group: "Core Capabilities", title: "Decision Reliability Score (DRS)", onThisPage: ["Overview", "Formula", "Signals"] },
  "model-evaluation": { group: "Core Capabilities", title: "Model Evaluation", onThisPage: ["Metrics", "Evaluation Signals"] },
  "factuality-engine": { group: "Core Capabilities", title: "Factuality Engine", onThisPage: ["Overview", "Capabilities", "Outputs"] },
  hpi: { group: "Core Capabilities", title: "Hallucination Probability Index (HPI)", onThisPage: ["Overview", "Risk Levels"] },
  "dataset-intelligence": { group: "Core Capabilities", title: "Dataset Intelligence", onThisPage: ["Overview", "CLI Validation", "Examples"] },
  benchmarking: { group: "Core Capabilities", title: "Multi-Model Benchmarking", onThisPage: ["Comparison", "Capabilities", "Ranking"] },
  "parallel-execution": { group: "Core Capabilities", title: "Parallel Execution Engine", onThisPage: ["Overview", "CLI Usage", "Benefits"] },
  "semantic-intelligence": { group: "Core Capabilities", title: "Semantic Intelligence Engine", onThisPage: ["Embeddings", "Roadmap"] },
  reporting: { group: "Core Capabilities", title: "Executive Reporting", onThisPage: ["Overview", "Dashboard Report", "Sample-Level Report"] },
  screenshots: { group: "Core Capabilities", title: "Screenshots & Previews", onThisPage: ["Trust Dashboard", "Single Model Executive Report", "Dataset Validation CLI"] },
  metrics: { group: "Reference", title: "Metrics Explained", onThisPage: ["Metric Guide", "Interpretation"] },
  domains: { group: "Reference", title: "Supported Benchmark Domains", onThisPage: ["Available Datasets", "Finance", "Healthcare", "Legal", "Developer", "Sample", "Cybersecurity", "Reasoning", "Math", "Enterprise Ops"] },
  roadmap: { group: "Reference", title: "Roadmap", onThisPage: ["v0.5.0", "v0.6.0", "Future"] },
  vision: { group: "Reference", title: "Philosophy and Vision", onThisPage: ["Mission", "Vision"] },
  contributing: { group: "Reference", title: "Contributing", onThisPage: ["Workflow", "License", "Developed By"] },
  "code-of-conduct": { group: "Reference", title: "OpenVals Code of Conduct", onThisPage: ["Purpose", "Ground Rules", "Unacceptable Behavior", "Questions"] },
  "security-policy": { group: "Reference", title: "Security Policy", onThisPage: ["Supported Versions", "Reporting a Vulnerability", "Response Timeline", "Scope", "Safe Harbor"] },
};

const whyItems = [
  "Aligns evaluation with business objectives",
  "Supports deployment decision-making",
  "Quantifies trust, risk, and performance",
  "Evaluates model performance",
  "Benchmarks multiple models",
  "Normalizes and compares results",
  "Introduces trust before deployment",
];

const metrics = [
  ["Accuracy", "Higher", "0.80 to 1.00", "Correctness of output"],
  ["Semantic", "Higher", "0.75 to 1.00", "Meaning similarity and contextual alignment"],
  ["Reliability", "Higher", "0.70 to 1.00", "Stability across repeated generations"],
  ["Safety", "Higher", "0.85 to 1.00", "Lower risk and harmful behavior"],
  ["Consistency", "Higher", "0.75 to 1.00", "Repeatability of model behavior"],
  ["Variance", "Lower", "0.00 to 0.25", "Output deviation across runs"],
  ["Latency", "Lower", "0ms to 1500ms", "Response generation speed"],
  ["Factuality", "Higher", "0.80 to 1.00", "Semantic factual alignment and lack of contradictions"],
  ["Hallucination Risk", "Lower", "0.00 to 0.20", "Estimated probability of hallucinated or unreliable content"],
  ["DRS Score", "Higher", "0.75 to 1.00", "Overall deployment reliability"],
];

const domains = [
  "Finance",
  "Healthcare",
  "Legal",
  "Developer",
  "Sample",
  "Cybersecurity",
  "Reasoning",
  "Math",
  "Enterprise Ops",
];


const roadmapV050TrustAdvisor = [
  "Trust Advisor",
  "Trust Profile Generation",
  "Use Case Detection from Problem Statements",
  "Dataset Recommendation Engine",
  "Config Recommendation Engine",
  "Risk Classification",
  "Data Sensitivity Analysis",
];

const roadmapV050ModelIntelligence = [
  "Dynamic Model Discovery from Ollama",
  "Dynamic Model Catalog",
  "Model Fit Score (MFS)",
  "Model Recommendation Engine",
  "openvals models CLI",
];

const roadmapV050TrustReadiness = [
  "Trust Readiness Index (TRI)",
  "Trust Readiness Deductions",
  "Trust Readiness Classification",
];

const roadmapV050Benchmarking = [
  "Trust Workflow → Benchmark Integration",
  "Automatic Dataset Selection",
  "Automatic Config Selection",
  "Automatic Model Selection",
  "Best Model Identification",
  "DRS-Based Ranking",
];

const roadmapV050Infrastructure = [
  "System Profile Detection",
  "CPU Detection",
  "Memory Detection",
  "Automatic Worker Recommendation",
  "User Worker Override (--max-workers)",
];

const roadmapV060 = [
  "openvals system",
  "GPU + OS diagnostics",
  "Provider registry",
  "openvals providers",
  "OpenAI / Anthropic / Gemini skeleton adapters",
  "Provider-aware model catalog",
  "Auto-pull completion for Ollama",
];

const roadmapFuture = [
  "OpenVals Cloud",
  "Enterprise Governance",
  "Continuous AI Validation",
  "Team Workspaces",
  "Trust Intelligence Dashboard",
  "AI Certification Framework",
];
const conductGroundRules = [
  "Be friendly and patient.",
  "Be welcoming to people of all backgrounds, identities, and lived experiences.",
  "Be considerate of how your work and decisions affect users, colleagues, and the broader community.",
  "Be respectful when working with OpenVals community members and people outside the community.",
  "Be careful with the words you choose and conduct yourself professionally.",
  "When disagreements happen, try to understand why and resolve differences constructively.",
];
const unacceptableConduct = [
  "Violent threats or language directed against another person.",
  "Discriminatory jokes or language.",
  "Posting sexually explicit or violent material.",
  "Posting or threatening to post another person's personally identifying information.",
  "Personal insults, especially those using racist or sexist terms.",
  "Unwelcome sexual attention.",
  "Advocating for or encouraging unacceptable behavior.",
  "Repeated harassment of others. If someone asks you to stop, stop.",
];
const securityReportItems = [
  "Description of the vulnerability",
  "Steps to reproduce the issue",
  "Affected components or versions",
  "Proof of concept, if available",
  "Potential impact assessment",
  "Suggested remediation, if available",
];
const securityScope = [
  "AI systems",
  "LLM infrastructure",
  "APIs",
  "Enterprise platforms",
  "Security tooling",
  "Internal research projects",
  "Cloud and on-prem deployments",
  "AI governance and validation systems",
];
const responsibleDisclosureGuidelines = [
  "Avoid violating privacy or accessing unnecessary data.",
  "Do not disrupt production services.",
  "Do not perform destructive testing.",
  "Avoid social engineering or phishing attacks.",
  "Provide reasonable time for remediation before disclosure.",
];
const securityPhilosophy = [
  "AI security",
  "AI validation",
  "AI security testing",
  "Enterprise AI assurance",
  "Secure AI deployment",
  "AI governance",
  "Private AI infrastructure",
  "Trustworthy AI systems",
];
const dataProtectionPractices = [
  "End-to-end encryption",
  "Role-based access control (RBAC)",
  "Multi-factor authentication (MFA)",
  "Secure secret management",
  "Zero Trust architectures",
  "Continuous monitoring and auditing",
  "Secure AI model governance",
];
const aiSafetyReportTypes = [
  "Hallucination vulnerabilities",
  "Prompt injection attacks",
  "Model jailbreak techniques",
  "Adversarial prompts",
  "Unsafe routing behavior",
  "Data leakage risks",
  "Alignment failures",
  "AI governance bypasses",
];

function pagePath(id: DocsPageId) {
  return id === "welcome" ? "/docs" : `/docs/${id}`;
}

function anchor(label: string) {
  return label.toLowerCase().replaceAll(" ", "-");
}

function CodeBlock({ children }: { children: string }) {
  return <CopyableCodeBlock>{children}</CopyableCodeBlock>;
}

function Terminal({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "#0d1117",
      borderRadius: "12px",
      border: "1px solid var(--docs-border)",
      overflow: "hidden",
      margin: "24px 0",
      fontFamily: "var(--font-mono, 'Fira Code', ui-monospace, monospace)",
      fontSize: "14px",
      lineHeight: "1.6",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
    }}>
      {/* Title bar */}
      <div style={{
        background: "#161b22",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f87171" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34d399" }} />
        </div>
        <div style={{
          color: "#8b949e",
          fontSize: "11px",
          fontWeight: 600,
          marginLeft: "auto",
          marginRight: "auto",
          letterSpacing: "0.5px"
        }}>
          openvals -- validate-dataset
        </div>
      </div>
      {/* Body */}
      <div style={{
        padding: "16px 20px",
        color: "#c9d1d9",
        overflowX: "auto",
        backgroundColor: "#0d1117"
      }}>
        {children}
      </div>
    </div>
  );
}

function DatasetValidationTerminal() {
  return (
    <Terminal>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontFamily: "inherit" }}>
        <span style={{ color: "#8b949e" }}>(openv)</span>
        <span style={{ color: "#34d399", fontWeight: 600 }}>to-00016@chintu-00</span>
        <span style={{ color: "#c9d1d9" }}>:</span>
        <span style={{ color: "#58a6ff", fontWeight: 600 }}>~/Projects/openvals</span>
        <span style={{ color: "#c9d1d9" }}>$</span>
        <span style={{ color: "#f0f6fc", fontWeight: 500 }}>openvals validate-dataset finance</span>
      </div>
      
      <div style={{ marginTop: "14px", color: "#f0f6fc", display: "flex", alignItems: "center", gap: "8px" }}>
        <span>🔍</span>
        <span>Validating dataset: <span style={{ color: "#58a6ff", fontWeight: 600 }}>finance</span></span>
      </div>
      
      <div style={{ color: "#30363d", margin: "8px 0", letterSpacing: "-1px" }}>===================================</div>
      <div style={{ color: "#f0f6fc", fontWeight: 700, fontSize: "15px" }}>OpenVals Dataset Validation</div>
      <div style={{ color: "#30363d", margin: "8px 0", letterSpacing: "-1px" }}>===================================</div>
      
      <div style={{ color: "#f0f6fc", marginTop: "12px" }}>
        Status : <span style={{ color: "#34d399", fontWeight: 700 }}>Healthy</span>
      </div>
      <div style={{ color: "#f0f6fc" }}>
        Samples: 10
      </div>

      <div style={{ color: "#8b949e", fontWeight: 600, marginTop: "16px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.5px" }}>Schema Validation</div>
      <div style={{ color: "#34d399", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
        <span>✓</span> <span>Passed</span>
      </div>

      <div style={{ color: "#8b949e", fontWeight: 600, marginTop: "16px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.5px" }}>Quality Validation</div>
      <div style={{ display: "grid", gridTemplateColumns: "180px auto", gap: "4px 8px", color: "#f0f6fc", marginTop: "4px" }}>
        <span style={{ color: "#8b949e" }}>Empty Prompts</span><span>: 0</span>
        <span style={{ color: "#8b949e" }}>Empty Outputs</span><span>: 0</span>
        <span style={{ color: "#8b949e" }}>Duplicate Prompts</span><span>: 0</span>
        <span style={{ color: "#8b949e" }}>Short Prompts</span><span>: 0</span>
        <span style={{ color: "#8b949e" }}>Short Outputs</span><span>: 0</span>
      </div>

      <div style={{ color: "#f0f6fc", marginTop: "20px", display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span>Dataset Health Score:</span>
        <span style={{ color: "#34d399", fontWeight: 800, fontSize: "16px" }}>100</span>
      </div>
      <div style={{ color: "#f0f6fc" }}>
        Health Status       : <span style={{ color: "#34d399", fontWeight: 700 }}>Healthy</span>
      </div>
      <div style={{ color: "#30363d", margin: "8px 0", letterSpacing: "-1px" }}>===================================</div>
    </Terminal>
  );
}

function ScoreFormula({ label = "Score" }: { label?: string }) {
  return (
    <div style={{ marginTop: "18px", display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--docs-heading)", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 500, fontSize: "18px" }}>
      <span>{label} =</span>
      <span style={{ position: "relative", display: "inline-grid", placeItems: "center", width: "42px", height: "72px", fontStyle: "normal", fontSize: "40px", lineHeight: 1 }}>
        <span style={{ position: "absolute", top: "0", fontSize: "12px", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 500 }}>n</span>
        <span style={{ transform: "scaleX(0.72)", transformOrigin: "center", fontWeight: 300, marginTop: "2px" }}>&sum;</span>
        <span style={{ position: "absolute", bottom: "-3px", fontSize: "13px", lineHeight: 1, fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 500, whiteSpace: "nowrap" }}>i = 1</span>
      </span>
      <span>
        (w<sub>i</sub> x m<sub>i</sub>)
      </span>
    </div>
  );
}

function H2({ children }: { children: string }) {
  return <h2 className="docsH2" id={anchor(children)} style={{ fontSize: "28px", lineHeight: 1.2, margin: "48px 0 18px", color: "var(--docs-heading)", scrollMarginTop: "90px" }}>{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="docsParagraph" style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 18px" }}>{children}</p>;
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ color: "var(--docs-heading)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
      {children}
    </a>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="docsList" style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 22px", paddingLeft: "22px" }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: "8px" }}>{item}</li>
      ))}
    </ul>
  );
}

function PillGrid({ items }: { items: string[] }) {
  return (
    <div className="docsPillGrid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", marginTop: "18px" }}>
      {items.map((item) => (
        <div key={item} style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "14px 16px", color: "var(--docs-text)", background: "var(--docs-card)" }}>{item}</div>
      ))}
    </div>
  );
}

function DocsTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="docsTableWrap" style={{ overflowX: "auto", border: "1px solid var(--docs-border)", borderRadius: "14px", margin: "20px 0 22px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
        <thead>
          <tr style={{ background: "var(--docs-code-bg)", color: "var(--docs-heading)", textAlign: "left" }}>
            {headers.map((head) => (
              <th key={head} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border)" }}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, idx) => (
                <td key={idx} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border-soft)", color: "var(--docs-muted)" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricsTable() {
  return (
    <div className="docsTableWrap" style={{ overflowX: "auto", border: "1px solid var(--docs-border)", borderRadius: "14px", marginTop: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "680px" }}>
        <thead>
          <tr style={{ background: "var(--docs-code-bg)", color: "var(--docs-heading)", textAlign: "left" }}>
            {["Metric", "Ideal Direction", "Good Range", "Meaning"].map((head) => (
              <th key={head} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border)" }}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, idx) => (
                <td key={idx} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border-soft)", color: "var(--docs-muted)" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Sparkline = ({ points, color }: { points: string; color: string }) => (
  <svg width="60" height="24" viewBox="0 0 80 30" style={{ overflow: "visible", opacity: 0.8 }}>
    <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
  </svg>
);

const GroupedBarChart = ({ title, maxVal, data, unit = "" }: { title: string; maxVal: number; data: Array<{ label: string; val: number; color: string }>; unit?: string }) => {
  return (
    <div style={{ flex: 1, minWidth: "130px", border: "1px solid var(--docs-border-soft)", borderRadius: "10px", padding: "12px 14px", background: "var(--docs-card)" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--docs-heading)", marginBottom: "14px", textAlign: "center" }}>{title}</div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "100px", paddingBottom: "4px" }}>
        {data.map((item, idx) => {
          const heightPct = Math.min((item.val / maxVal) * 100, 100);
          return (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", width: "24px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--docs-heading)", marginBottom: "4px" }}>{item.val}{unit}</span>
              <div style={{ width: "100%", height: `${heightPct}%`, backgroundColor: item.color, borderRadius: "3px 3px 0 0" }}></div>
              <span style={{ fontSize: "9px", color: "var(--docs-muted)", marginTop: "6px", fontWeight: 500 }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RadarChart = () => {
  const angles = [0, 1, 2, 3, 4, 5, 6].map(i => -Math.PI/2 + (i * 2 * Math.PI) / 7);
  const cx = 130;
  const cy = 130;
  const gridRadii = [17, 34, 51, 68, 85];
  const values = [0.89, 0.91, 0.88, 0.92, 0.87, 0.11, 0.19];
  const modelPoints = angles.map((angle, i) => {
    const r = values[i] * 85;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%", minHeight: "260px" }}>
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ overflow: "visible" }}>
        {gridRadii.map((r, ri) => {
          const points = angles.map(angle => {
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(" ");
          return (
            <polygon key={ri} points={points} fill="none" stroke="var(--docs-border-soft)" strokeWidth="1" />
          );
        })}
        {angles.map((angle, i) => {
          const x = cx + 85 * Math.cos(angle);
          const y = cy + 85 * Math.sin(angle);
          return (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--docs-border-soft)" strokeWidth="1" />
          );
        })}
        <polygon points={modelPoints} fill="rgba(22, 163, 74, 0.15)" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
        {angles.map((angle, i) => {
          const r = values[i] * 85;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#16a34a" />
          );
        })}
        {(() => {
          const labels = [
            { text: "DRS 0.89", dx: 0, dy: -98 },
            { text: "Factuality 0.91", dx: 86, dy: -50 },
            { text: "Reliability 0.88", dx: 98, dy: 15 },
            { text: "Safety 0.92", dx: 45, dy: 88 },
            { text: "Consistency 0.87", dx: -45, dy: 88 },
            { text: "Hallucination 0.11", dx: -108, dy: 15 },
            { text: "Variance 0.19", dx: -82, dy: -50 }
          ];
          return labels.map((lbl, i) => {
            const x = cx + lbl.dx;
            const y = cy + lbl.dy;
            return (
              <text key={i} x={x} y={y} fill="var(--docs-text)" fontSize="10" fontWeight="600" textAnchor="middle" alignmentBaseline="middle">
                {lbl.text}
              </text>
            );
          });
        })()}
      </svg>
    </div>
  );
};

const ScreenshotsPage = () => {
  return (
    <>
      <Paragraph>
        Explore visual snapshots of the OpenVals AI Trust dashboards, multi-model leaderboards, and enterprise evaluation reports.
      </Paragraph>

      <H2>Trust Dashboard</H2>
      <Paragraph>
        A premium interactive reconstruction of the multi-model executive dashboard, illustrating how OpenVals displays recommended models, sub-scores, radar profiles, comparison bar charts, and deployment readiness signals.
      </Paragraph>

      <div className="previewContainer" style={{
        background: "var(--docs-code-bg)",
        border: "1px solid var(--docs-border)",
        borderRadius: "16px",
        overflow: "hidden",
        margin: "24px 0 48px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #090e1a 0%, #1e1b4b 100%)",
          padding: "24px 30px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          borderBottom: "1px solid #2e2a75"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#fff"
              }}>O</div>
              <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px" }}>OpenVals</span>
              <span style={{
                background: "rgba(255,255,255,0.08)",
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "4px",
                color: "#a5b4fc",
                fontWeight: 600,
                marginLeft: "8px"
              }}>AI Trust Intelligence Report</span>
            </div>
            <div style={{ fontSize: "13px", color: "#a5b4fc", opacity: 0.9 }}>
              Comprehensive evaluation of AI models across trust, performance, and operational dimensions
            </div>
            
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
              {[
                { label: "Dataset", val: "Finance" },
                { label: "Models Evaluated", val: "3" },
                { label: "Configuration", val: "finance" },
                { label: "Generated", val: "May 17, 2025 10:30 AM" }
              ].map((pill, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "11px",
                  color: "#cbd5e1",
                  display: "flex",
                  gap: "6px"
                }}>
                  <span style={{ color: "#94a3b8" }}>{pill.label}:</span>
                  <strong style={{ color: "#ffffff" }}>{pill.val}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "16px 20px",
            minWidth: "220px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#10b981", letterSpacing: "1px", textTransform: "uppercase" }}>Recommended Model</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "4px 0 6px" }}>Llama3</div>
              <div style={{ display: "inline-block", background: "#10b981", color: "#064e3b", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px" }}>Enterprise Ready</div>
              <div style={{ fontSize: "11px", color: "#a5b4fc", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#10b981" }}>✓</span> High Trust
              </div>
            </div>
            <div style={{ textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
              <div style={{ fontSize: "10px", color: "#a5b4fc", textTransform: "uppercase" }}>DRS Score</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#10b981" }}>0.89</div>
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          padding: "20px 30px",
          background: "var(--docs-panel)",
          borderBottom: "1px solid var(--docs-border)"
        }}>
          {[
            { label: "Performance", score: "0.87", rating: "High", color: "#3b82f6", points: "5,20 15,22 25,12 35,16 45,6 55,2" },
            { label: "Trust Intelligence", score: "0.91", rating: "Very High", color: "#10b981", points: "5,18 15,16 25,20 35,8 45,10 55,4" },
            { label: "Infrastructure", score: "0.82", rating: "High", color: "#8b5cf6", points: "5,12 15,18 25,14 35,20 45,8 55,6" },
            { label: "Governance", score: "0.75", rating: "Medium", color: "#f59e0b", points: "5,22 15,14 25,18 35,12 45,6 55,10" }
          ].map((cat, i) => (
            <div key={i} style={{
              background: "var(--docs-card)",
              border: "1px solid var(--docs-border)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ fontSize: "12px", color: "var(--docs-muted)", fontWeight: 600 }}>{cat.label}</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--docs-heading)", marginTop: "6px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                  {cat.score}
                  <span style={{ fontSize: "11px", color: cat.color, fontWeight: 700 }}>{cat.rating}</span>
                </div>
              </div>
              <Sparkline points={cat.points} color={cat.color} />
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "30px",
          background: "var(--docs-panel)"
        }}>
          <div style={{
            background: "var(--docs-card)",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h4 style={{ margin: "0 0 16px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
              TRUST INTELLIGENCE DASHBOARD
            </h4>
            <RadarChart />
            
            <div style={{
              background: "rgba(22, 163, 74, 0.04)",
              border: "1px solid rgba(22, 163, 74, 0.2)",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "12px",
              color: "#16a34a",
              fontWeight: 500,
              marginTop: "16px",
              textAlign: "center"
            }}>
              Strong overall trust profile with low hallucination and variance.
            </div>

            <div style={{ marginTop: "18px" }}>
              <div style={{ fontSize: "11px", color: "var(--docs-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>Key Takeaways</div>
              <div style={{ display: "grid", gap: "6px" }}>
                {[
                  "Excellent factual accuracy and safety alignment",
                  "Low hallucination risk across evaluated scenarios",
                  "Consistent and reliable performance",
                  "Well-suited for enterprise-grade deployments"
                ].map((takeaway, ti) => (
                  <div key={ti} style={{ fontSize: "12px", color: "var(--docs-text)", display: "flex", gap: "8px" }}>
                    <span style={{ color: "#16a34a" }}>✓</span> {takeaway}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: "var(--docs-card)",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h4 style={{ margin: "0 0 16px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
              VISUAL INTELLIGENCE
            </h4>
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "16px", fontSize: "11px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "8px", height: "8px", background: "#3b82f6", borderRadius: "2px" }} /> <span style={{ color: "var(--docs-muted)" }}>Llama3</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "2px" }} /> <span style={{ color: "var(--docs-muted)" }}>Mistral</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "8px", height: "8px", background: "#8b5cf6", borderRadius: "2px" }} /> <span style={{ color: "var(--docs-muted)" }}>Llama2</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <GroupedBarChart
                title="DRS Comparison"
                maxVal={1.0}
                data={[
                  { label: "L3", val: 0.89, color: "#3b82f6" },
                  { label: "Mis", val: 0.83, color: "#10b981" },
                  { label: "L2", val: 0.71, color: "#8b5cf6" }
                ]}
              />
              <GroupedBarChart
                title="Latency (ms)"
                maxVal={1200}
                data={[
                  { label: "L3", val: 412, color: "#3b82f6" },
                  { label: "Mis", val: 645, color: "#10b981" },
                  { label: "L2", val: 1023, color: "#8b5cf6" }
                ]}
              />
              <GroupedBarChart
                title="Hallucination (%)"
                maxVal={0.6}
                data={[
                  { label: "L3", val: 0.11, color: "#3b82f6" },
                  { label: "Mis", val: 0.21, color: "#10b981" },
                  { label: "L2", val: 0.48, color: "#8b5cf6" }
                ]}
              />
              <GroupedBarChart
                title="Accuracy (%)"
                maxVal={100}
                unit="%"
                data={[
                  { label: "L3", val: 91.2, color: "#3b82f6" },
                  { label: "Mis", val: 87.3, color: "#10b981" },
                  { label: "L2", val: 78.6, color: "#8b5cf6" }
                ]}
              />
            </div>

            <div style={{
              background: "rgba(59, 130, 246, 0.04)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "12px",
              color: "#3b82f6",
              fontWeight: 500,
              marginTop: "16px",
              textAlign: "center"
            }}>
              Llama3 leads in DRS, accuracy, and trust metrics while maintaining the lowest latency.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              background: "var(--docs-card)",
              border: "1px solid var(--docs-border)",
              borderRadius: "12px",
              padding: "20px",
              flex: 1
            }}>
              <h4 style={{ margin: "0 0 14px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
                DEPLOYMENT READINESS
              </h4>
              
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#16a34a", borderRadius: "50%" }} /> Ready for Production
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                {[
                  { label: "Performance", desc: "Meets enterprise performance requirements" },
                  { label: "Reliability", desc: "High reliability across diverse scenarios" },
                  { label: "Safety", desc: "Strong safety alignment and guardrails" },
                  { label: "Infrastructure", desc: "Efficient resource utilization" },
                  { label: "Risk", desc: "Low risk profile detected" }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--docs-text)", fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: "11px", color: "var(--docs-muted)" }}>{item.desc}</div>
                    </div>
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "var(--docs-card)",
              border: "1px solid var(--docs-border)",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <h4 style={{ margin: "0 0 14px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
                RISK OVERVIEW
              </h4>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
                  <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--docs-border-soft)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#16a34a" strokeWidth="10" strokeDasharray="181 251.3" strokeDashoffset="0" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#d97706" strokeWidth="10" strokeDasharray="52.8 251.3" strokeDashoffset="-181" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dc2626" strokeWidth="10" strokeDasharray="17.6 251.3" strokeDashoffset="-233.8" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#16a34a" }}>Low</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--docs-muted)" }}>Risk</span>
                  </div>
                </div>

                <div style={{ flex: 1, display: "grid", gap: "6px" }}>
                  {[
                    { label: "Low Risk", pct: "72%", color: "#16a34a" },
                    { label: "Medium Risk", pct: "21%", color: "#d97706" },
                    { label: "High Risk", pct: "7%", color: "#dc2626" }
                  ].map((risk, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "8px", height: "8px", background: risk.color, borderRadius: "50%" }} />
                        <span style={{ color: "var(--docs-text)", fontWeight: 500 }}>{risk.label}</span>
                      </div>
                      <span style={{ color: "var(--docs-heading)", fontWeight: 700 }}>{risk.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: "rgba(22, 163, 74, 0.04)",
                border: "1px solid rgba(22, 163, 74, 0.2)",
                borderRadius: "8px",
                padding: "8px 10px",
                fontSize: "11px",
                color: "#16a34a",
                fontWeight: 500,
                marginTop: "14px"
              }}>
                Overall risk level is low. Model is suitable for enterprise use with standard monitoring.
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1.2fr",
          gap: "20px",
          padding: "0 30px 30px",
          background: "var(--docs-panel)",
          flexWrap: "wrap"
        }}>
          <div style={{
            background: "var(--docs-card)",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px",
            overflowX: "auto"
          }}>
            <h4 style={{ margin: "0 0 14px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
              MODEL LEADERBOARD
            </h4>
            
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left", minWidth: "480px" }}>
              <thead>
                <tr style={{ color: "var(--docs-muted)", borderBottom: "1px solid var(--docs-border)" }}>
                  <th style={{ padding: "10px 4px" }}>Rank</th>
                  <th style={{ padding: "10px 4px" }}>Model</th>
                  <th style={{ padding: "10px 4px" }}>Acc</th>
                  <th style={{ padding: "10px 4px" }}>Sem</th>
                  <th style={{ padding: "10px 4px" }}>Fact</th>
                  <th style={{ padding: "10px 4px" }}>Rel</th>
                  <th style={{ padding: "10px 4px" }}>Safety</th>
                  <th style={{ padding: "10px 4px" }}>Latency</th>
                  <th style={{ padding: "10px 4px", textAlign: "right" }}>DRS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: "🥇 1", model: "Llama3", acc: "91.2", sem: "0.88", fact: "0.91", rel: "0.88", safety: "0.92", lat: "412ms", drs: "0.89", best: true },
                  { rank: "🥈 2", model: "Mistral", acc: "87.3", sem: "0.84", fact: "0.86", rel: "0.83", safety: "0.89", lat: "645ms", drs: "0.83", best: false },
                  { rank: "🥉 3", model: "Llama2", acc: "78.6", sem: "0.76", fact: "0.78", rel: "0.74", safety: "0.81", lat: "1023ms", drs: "0.71", best: false }
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: "1px solid var(--docs-border-soft)",
                    fontWeight: row.best ? 600 : 400,
                    color: row.best ? "var(--docs-heading)" : "var(--docs-text)",
                    background: row.best ? "rgba(59,130,246,0.02)" : "transparent"
                  }}>
                    <td style={{ padding: "12px 4px" }}>{row.rank}</td>
                    <td style={{ padding: "12px 4px", fontWeight: "bold" }}>{row.model}</td>
                    <td style={{ padding: "12px 4px" }}>{row.acc}%</td>
                    <td style={{ padding: "12px 4px" }}>{row.sem}</td>
                    <td style={{ padding: "12px 4px" }}>{row.fact}</td>
                    <td style={{ padding: "12px 4px" }}>{row.rel}</td>
                    <td style={{ padding: "12px 4px" }}>{row.safety}</td>
                    <td style={{ padding: "12px 4px" }}>{row.lat}</td>
                    <td style={{ padding: "12px 4px", textAlign: "right", fontWeight: "bold", color: row.best ? "#10b981" : "inherit" }}>{row.drs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            background: "var(--docs-card)",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column"
          }}>
            <h4 style={{ margin: "0 0 14px", color: "var(--docs-heading)", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid var(--docs-border-soft)", paddingBottom: "10px", letterSpacing: "0.5px" }}>
              AI ADVISOR RECOMMENDATION
            </h4>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(16,185,129,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981",
                fontSize: "14px"
              }}>★</div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--docs-muted)", fontWeight: 500 }}>Recommended Model</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--docs-heading)" }}>Llama3</div>
              </div>
            </div>

            <div style={{ flex: 1, display: "grid", gap: "12px", fontSize: "12px" }}>
              <div>
                <strong style={{ color: "var(--docs-heading)", display: "block", marginBottom: "4px" }}>Why Recommended:</strong>
                <span style={{ color: "var(--docs-text)" }}>Best overall balance of trust, performance, and efficiency. Highest DRS score with lowest hallucination and latency.</span>
              </div>
              <div>
                <strong style={{ color: "var(--docs-heading)", display: "block", marginBottom: "4px" }}>Trade-offs:</strong>
                <span style={{ color: "var(--docs-text)" }}>Slightly higher compute usage compared to Mistral.</span>
              </div>
            </div>

            <div style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid var(--docs-border-soft)",
              paddingTop: "14px"
            }}>
              <span style={{ fontSize: "12px", color: "var(--docs-muted)" }}>Confidence: <strong style={{ color: "#10b981" }}>92%</strong></span>
              <span style={{ fontSize: "11px", background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 700, padding: "2px 8px", borderRadius: "4px" }}>Enterprise Confidence</span>
            </div>
          </div>
        </div>

        <div style={{
          background: "var(--docs-card)",
          borderTop: "1px solid var(--docs-border)",
          padding: "12px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          color: "var(--docs-muted)"
        }}>
          <div>Built with <strong>OpenVals</strong> &bull; AI Trust & Validation Framework</div>
          <div>Developed by <strong>DrPinnacle</strong></div>
        </div>
      </div>


      <H2>Single Model Executive Report</H2>
      <Paragraph>
        A premium interactive reconstruction of the single-model evaluation report view, demonstrating how OpenVals represents experimental models (like LFM 2.5) with lower DRS thresholds, sub-scores, and detailed executive summaries.
      </Paragraph>

      <div className="previewContainer" style={{
        background: "#080b14",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        overflow: "hidden",
        margin: "24px 0 24px",
        color: "#f8fafc",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{
          padding: "30px 40px",
          background: "linear-gradient(135deg, #090e1a 0%, #171638 100%)",
          borderBottom: "1px solid #1e293b"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.08)", padding: "2px 8px", borderRadius: "4px", color: "#a5b4fc", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>OpenVals</span>
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 8px", color: "#ffffff" }}>AI Trust Intelligence Report</h3>
          <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>
            Comprehensive evaluation of AI models across trust, performance, factuality, hallucination, and operational readiness.
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Dataset", val: "OpenVals Benchmark" },
              { label: "Models Evaluated", val: "6" },
              { label: "Configuration", val: "Default" },
              { label: "Generated", val: "2026-06-16 14:24:21" }
            ].map((p, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "6px 12px", fontSize: "11px" }}>
                <span style={{ color: "#64748b" }}>{p.label}:</span> <strong style={{ color: "#cbd5e1" }}>{p.val}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "40px", display: "grid", gap: "24px" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: "14px",
            padding: "24px",
            position: "relative"
          }}>
            <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px" }}>Recommended Model</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "6px 0 20px" }}>lfm2.5-thinking:1.2b</div>
            
            <div style={{ borderTop: "1px solid #1e293b", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 600 }}>DRS Score</div>
                <div style={{ fontSize: "40px", fontWeight: 900, color: "#f59e0b", marginTop: "4px" }}>0.576</div>
              </div>
              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Status</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                    <div style={{ width: "8px", height: "8px", background: "#f59e0b", borderRadius: "50%" }} />
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#f59e0b" }}>Experimental</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Confidence</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#cbd5e1", marginTop: "6px" }}>0.396</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {[
              { label: "Performance", score: "0.642", desc: "Model capability and response quality" },
              { label: "Trust Intelligence", score: "0.812", desc: "Reliability, factuality, safety, and HPI" },
              { label: "Infrastructure", score: "N/A", desc: "Compute, energy, and carbon metrics" },
              { label: "Governance", score: "N/A", desc: "Compliance and policy readiness" }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#1e293b"
              }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{item.desc}</div>
                </div>
                <div style={{ fontSize: "22px", fontWeight: 850, color: "#0f172a" }}>
                  {item.score}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: "14px",
            padding: "24px",
            marginTop: "10px"
          }}>
            <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px", marginBottom: "14px" }}>Executive Overview</div>
            
            <h4 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px", color: "#ffffff" }}>Executive Summary</h4>
            <div style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "20px" }}>
              lfm2.5-thinking:1.2b demonstrated stable operational reliability, strong safety characteristics with a DRS score of 0.576.
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "20px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#cbd5e1" }}>Trust Classification:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", background: "#f59e0b", borderRadius: "50%" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#f59e0b" }}>Experimental</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <H2>Dataset Validation CLI</H2>
      <Paragraph>
        A premium preview of the Dataset Validation CLI output, demonstrating how OpenVals verifies schema integrity, computes quality metrics, and evaluates dataset health status.
      </Paragraph>
      <DatasetValidationTerminal />
    </>
  );
};

function PageBody({ pageId }: { pageId: DocsPageId }) {
  switch (pageId) {
    case "welcome":
      return (
        <>
          <div style={{ fontSize: "19px", color: "var(--docs-muted)", fontWeight: 500, marginTop: "-20px", marginBottom: "12px" }}>
            AI Trust Intelligence Platform for LLMs, SLMs, Private AI, and Enterprise AI Systems
          </div>
          <div style={{ fontSize: "16px", color: "var(--accent, #3776ab)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "24px" }}>
            Evaluate &bull; Benchmark &bull; Trust Intelligence
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            <img src="https://img.shields.io/badge/pypi-v0.5.0-blue?style=flat-square" alt="PyPI Version" />
            <img src="https://img.shields.io/badge/python-3.8+-blue?style=flat-square" alt="Python Version" />
            <img src="https://img.shields.io/badge/license-DPCL--CE%20v1.0-blue?style=flat-square" alt="License" />
            <img src="https://img.shields.io/badge/downloads-10k%2Fmonth-blue?style=flat-square" alt="Downloads" />
            <img src="https://img.shields.io/badge/github-stars-blue?style=flat-square" alt="GitHub Stars" />
          </div>

          <H2>Platform</H2>
          <Paragraph>
            OpenVals is an enterprise-grade AI evaluation and trust platform designed to help organizations measure, compare, validate, and deploy AI systems with confidence.
          </Paragraph>
          <Paragraph>
            Unlike traditional AI benchmarks that focus only on accuracy, OpenVals evaluates performance, trustworthiness, factuality, reliability, safety, hallucination risk, governance readiness, and deployment confidence.
          </Paragraph>

          <H2>Trust Infrastructure for AI</H2>
          <blockquote style={{ margin: "32px 0", padding: "20px 24px", borderLeft: "4px solid var(--docs-heading)", background: "var(--docs-card)", borderRadius: "0 12px 12px 0" }}>
            <div style={{ fontSize: "14px", color: "var(--docs-muted)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "6px" }}>OpenVals answers one question:</div>
            <div style={{ fontSize: "24px", color: "var(--docs-heading)", fontWeight: 700, fontStyle: "italic" }}>&ldquo;Can you trust your AI?&rdquo;</div>
          </blockquote>

          <H2>What is OpenVals?</H2>
          <Paragraph>
            OpenVals is an AI Trust Intelligence Platform that helps enterprises evaluate, validate, benchmark, and govern AI systems before production deployment.
          </Paragraph>

          <H2>Built For</H2>
          <PillGrid items={["AI engineering teams", "ML teams", "SaaS companies using LLMs", "Enterprises validating models", "AI governance and compliance teams"]} />
          <H2>Final Thought</H2>
          <Paragraph>
            OpenVals is building the Trust Intelligence Layer for AI. The future of AI is not determined by which model is largest. The future belongs to AI systems that can be measured, validated, governed, and trusted.
          </Paragraph>
        </>
      );
    case "why-openvals":
      return (
        <>
          <H2>Problem</H2>
          <Paragraph>
            Most AI models perform well in demonstrations. Production environments require something different:
          </Paragraph>
          <BulletList
            items={[
              "Can the model be trusted?",
              "Is the response factually correct?",
              "How reliable is the model under repeated execution?",
              "What is the hallucination risk?",
              "Is the dataset itself trustworthy?",
              "Is the model ready for enterprise deployment?",
            ]}
          />
          <Paragraph>OpenVals was built to answer these questions.</Paragraph>

          <H2>Why OpenVals?</H2>
          <Paragraph>A side-by-side comparison of capabilities between traditional benchmarks and OpenVals:</Paragraph>
          <DocsTable
            headers={["Capability", "Traditional Benchmarking", "OpenVals"]}
            rows={[
              ["Accuracy", "✓", "✓"],
              ["Latency", "✓", "✓"],
              ["Semantic Similarity", "✓", "✓"],
              ["Hallucination Detection", <span key="hall" style={{ color: "#d97706", fontWeight: 500 }}>Limited</span>, <span key="hall_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
              ["Factuality Analysis", <span key="fact" style={{ color: "#d97706", fontWeight: 500 }}>Limited</span>, <span key="fact_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
              ["Trust Scoring", <span key="trust" style={{ color: "#dc2626", fontWeight: 500 }}>✗</span>, <span key="trust_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
              ["Governance Readiness", <span key="gov" style={{ color: "#dc2626", fontWeight: 500 }}>✗</span>, <span key="gov_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
              ["Executive Reporting", <span key="rep" style={{ color: "#dc2626", fontWeight: 500 }}>✗</span>, <span key="rep_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
              ["Enterprise Validation", <span key="val" style={{ color: "#dc2626", fontWeight: 500 }}>✗</span>, <span key="val_ok" style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>],
            ]}
          />

          <H2>Enterprise Use Cases</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginTop: "18px", marginBottom: "28px" }}>
            {[
              { title: "AI Model Selection", desc: "Compare GPT, Claude, Llama, Mistral, and private models before deployment." },
              { title: "Private AI Validation", desc: "Validate enterprise AI running on Ollama, vLLM, or self-hosted infrastructure." },
              { title: "AI Procurement", desc: "Benchmark vendor AI solutions before purchasing decisions." },
              { title: "AI Governance", desc: "Measure AI readiness against organizational trust and governance requirements." },
              { title: "AI Red Teaming Foundation", desc: "Identify hallucination risk, factual weaknesses, and trust gaps." },
              { title: "Executive Reporting", desc: "Generate trust dashboards and executive-level AI readiness reports." }
            ].map((uc, index) => (
              <div key={index} style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "20px", background: "var(--docs-card)" }}>
                <h4 style={{ margin: "0 0 8px", color: "var(--docs-heading)", fontSize: "16px", fontWeight: 600 }}>{uc.title}</h4>
                <p style={{ margin: 0, color: "var(--docs-muted)", fontSize: "14px", lineHeight: 1.5 }}>{uc.desc}</p>
              </div>
            ))}
          </div>

          <H2>What It Solves</H2>
          <PillGrid items={[...whyItems, "Validates numeric and semantic factuality", "Measures hallucination risks", "Assures dataset integrity and health"]} />
        </>
      );
    case "installation":
      return (
        <>
          <H2>Install</H2>
          <CodeBlock>{`pip install openvals`}</CodeBlock>
          <H2>Requirements</H2>
          <Paragraph>Use OpenVals from a Python environment where your evaluation datasets, model adapters, and provider credentials are available.</Paragraph>
        </>
      );
    case "quick-start":
      return (
        <>
          <Paragraph>Get up and running with OpenVals in under 60 seconds.</Paragraph>
          
          <H2>1. Install the CLI</H2>
          <CodeBlock>{`pip install openvals`}</CodeBlock>
          
          <H2>2. Run a Benchmark</H2>
          <Paragraph>Evaluate and compare models on a specific dataset:</Paragraph>
          <CodeBlock>{`openvals benchmark \\
  --dataset finance \\
  --models mistral,llama3`}</CodeBlock>
          
          <h3 style={{ fontSize: "16px", color: "var(--docs-heading)", marginTop: "18px", marginBottom: "8px", fontWeight: 600 }}>Expected CLI Output:</h3>
          <CodeBlock>{`Model      Accuracy    DRS
--------------------------------
llama3     91.4        89.2
mistral    87.8        82.4
QWEN       70.7        69.7`}</CodeBlock>

          <H2>3. Validate a Dataset</H2>
          <Paragraph>Verify schema and quality before running model evaluations:</Paragraph>
          <CodeBlock>{`openvals validate-dataset finance
openvals validate-dataset ./customer_dataset.json
openvals validate-dataset ./customer_dataset.csv`}</CodeBlock>

          <H2>Benchmark Multiple Models with Config</H2>
          <CodeBlock>{`openvals benchmark \\
  --dataset finance \\
  --models mistral,llama3 \\
  --config finance`}</CodeBlock>

          <H2>Show Version</H2>
          <CodeBlock>{`openvals version`}</CodeBlock>

          <H2>Python SDK Example</H2>
          <CodeBlock>{`from openvals.benchmarking.runner import BenchmarkRunner
from openvals.models.ollama_model import OllamaModel
from openvals.datasets.loader import load_dataset

dataset = load_dataset("examples/sample_eval.json")

models = {
    "llama2": OllamaModel("llama2"),
    "llama3": OllamaModel("llama3"),
    "mistral": OllamaModel("mistral")
}

runner = BenchmarkRunner(models, dataset)
results = runner.run()

print(results)`}</CodeBlock>

          <H2>Example Trust Intelligence Report</H2>
          <Paragraph>Below is an example of the detailed Trust Intelligence Report generated by the CLI:</Paragraph>
          <CodeBlock>{`===================================================
OpenVals Trust Intelligence Report
===================================================

Model: llama3

Accuracy Score      : 91.4
Semantic Score      : 89.1
Factuality Score    : 92.3
Safety Score        : 95.2
Latency Score       : 83.0

Hallucination Risk  : LOW

Decision Reliability Score (DRS)

89.2 / 100

Deployment Status:

READY FOR PRODUCTION`}</CodeBlock>
        </>
      );
    case "drs":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            The Decision Reliability Score (DRS) is a deployment-focused trust metric designed to determine whether an AI system is suitable for real-world production environments.
          </Paragraph>
          <Paragraph>
            Traditional leaderboards answer: <strong>&quot;Which model scored highest?&quot;</strong>
          </Paragraph>
          <Paragraph>
            DRS answers: <strong>&quot;Which model can be trusted in production?&quot;</strong>
          </Paragraph>
          <H2>Formula</H2>
          <ScoreFormula />
          <H2>Signals</H2>
          <Paragraph>DRS combines nine crucial trust signals into a single score:</Paragraph>
          <PillGrid items={["Accuracy", "Semantic Intelligence", "Reliability", "Safety", "Consistency", "Variance", "Latency", "Hallucination Risk", "Factuality"]} />
        </>
      );
    case "model-evaluation":
      return (
        <>
          <H2>Metrics</H2>
          <Paragraph>
            Evaluate AI systems using multiple dimensions including accuracy, semantic similarity, reliability, safety, consistency, variance, latency, factuality, and hallucination risk.
          </Paragraph>
          <H2>Evaluation Signals</H2>
          <MetricsTable />
        </>
      );
    case "factuality-engine":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            OpenVals includes a dedicated factuality scoring engine designed to measure factual alignment, numeric precision, and contradiction avoidance in model generations.
          </Paragraph>
          <H2>Capabilities</H2>
          <PillGrid
            items={[
              "Semantic factual alignment",
              "Numeric consistency validation",
              "Contradiction detection",
              "Factual risk classification",
            ]}
          />
          <H2>Outputs</H2>
          <Paragraph>The engine outputs detailed factuality intelligence metadata:</Paragraph>
          <BulletList
            items={[
              "Factuality Score: A normalized score representing the level of factual alignment.",
              "Risk Level: The categorized risk of factual errors.",
              "Issues Detected: Detailed logs pinpointing specific contradictions or inaccuracies.",
            ]}
          />
        </>
      );
    case "hpi":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            The Hallucination Probability Index (HPI) is a proprietary algorithm that estimates the probability that a model response contains hallucinated, fabricated, or unreliable content.
          </Paragraph>
          <H2>Risk Levels</H2>
          <Paragraph>HPI classifies responses into four actionable risk categories:</Paragraph>
          <BulletList
            items={[
              "Low (🟢): High confidence, reliable response suitable for automated deployment.",
              "Medium (🟡): Moderate confidence, potential minor inconsistency. Review recommended for high-stakes tasks.",
              "High (🟠): Low confidence, probable hallucination. Avoid direct deployment without human-in-the-loop validation.",
              "Critical (🔴): Confirmed hallucinated or highly contradictory content. Response should be blocked.",
            ]}
          />
        </>
      );
    case "dataset-intelligence":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            Before you can trust a model, you must trust the dataset you use to evaluate it. Dataset Intelligence validates the health, quality, and compliance of your benchmark datasets.
          </Paragraph>
          <H2>CLI Validation</H2>
          <Paragraph>
            The Dataset Validation CLI evaluates schemas, quality, duplicates, and missing fields to compute the Dataset Health Score (DHS).
          </Paragraph>
          <DatasetValidationTerminal />
          <H2>Examples</H2>
          <Paragraph>Validate custom datasets or pre-packaged domain benchmarks:</Paragraph>
          <CodeBlock>{`openvals validate-dataset finance
openvals validate-dataset ./customer_dataset.json
openvals validate-dataset ./customer_dataset.csv`}</CodeBlock>
        </>
      );
    case "benchmarking":
      return (
        <>
          <H2>Comparison</H2>
          <Paragraph>
            Compare multiple models under identical conditions. OpenVals supports local models (e.g. Ollama), private enterprise AI systems, and cloud providers.
          </Paragraph>
          <H2>Capabilities</H2>
          <PillGrid
            items={[
              "Side-by-side comparison",
              "Normalized ranking",
              "DRS ranking",
              "Trust Intelligence reporting",
            ]}
          />
          <H2>Ranking</H2>
          <CodeBlock>{`1. mistral   (0.91)
2. llama3    (0.87)
3. llama2    (0.84)`}</CodeBlock>
        </>
      );
    case "parallel-execution":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            For large-scale evaluation pipelines, OpenVals supports concurrent execution of multiple models and dataset prompts to minimize benchmarking runtimes.
          </Paragraph>
          <H2>CLI Usage</H2>
          <Paragraph>Use the parallel execution flags to specify concurrency and workers:</Paragraph>
          <CodeBlock>{`openvals benchmark \\
  --dataset finance \\
  --models mistral,llama3 \\
  --parallel \\
  --max-workers 2`}</CodeBlock>
          <H2>Benefits</H2>
          <BulletList
            items={[
              "Reduced benchmark runtime and faster iteration loops.",
              "Better scalability across high-throughput server clusters.",
              "SaaS-ready infrastructure designed for parallel enterprise workloads.",
            ]}
          />
        </>
      );
    case "semantic-intelligence":
      return (
        <>
          <H2>Embeddings</H2>
          <Paragraph>OpenVals includes embedding-powered semantic evaluation using sentence-transformers. The current embedding model is all-MiniLM-L6-v2.</Paragraph>
          <H2>Roadmap</H2>
          <PillGrid items={["OpenAI embeddings", "BGE embeddings", "InstructorXL", "Enterprise/private embedding systems"]} />
        </>
      );
    case "reporting":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>
            OpenVals provides executive-grade, audit-ready reporting to bridge the gap between technical evaluation metrics and business/governance decisions.
          </Paragraph>
          <H2>Dashboard Report</H2>
          <Paragraph>
            The high-level dashboard (generated as <code>report.html</code>) compiles global insights:
          </Paragraph>
          <BulletList
            items={[
              "Trust Dashboard: Visual summary of overall system reliability.",
              "DRS Ranking: Normalized comparison of all benchmarked models.",
              "Operational Insights: Latency, cost, and throughput metrics.",
              "Governance Readiness: compliance alignment indices.",
              "Risk Analysis: Factual risk and hallucination breakdown.",
              "Visual Analytics: Charts and heatmaps.",
            ]}
          />
          <H2>Sample-Level Report</H2>
          <Paragraph>
            The deep-dive report (generated as <code>sample_report.html</code>) allows sample-by-sample analysis:
          </Paragraph>
          <BulletList
            items={[
              "Prompt & Expected Output vs. Actual Model Output.",
              "Per-sample Accuracy and Semantic scores.",
              "Factuality & Hallucination Risk breakdown.",
              "Safety and Latency diagnostics.",
            ]}
          />
        </>
      );
    case "screenshots":
      return (
        <ScreenshotsPage />
      );
    case "metrics":
      return (
        <>
          <H2>Metric Guide</H2>
          <MetricsTable />
          <H2>Interpretation</H2>
          <Paragraph>Scores closer to ideal ranges indicate stronger production readiness and deployment trustworthiness.</Paragraph>
        </>
      );
    case "domains":
      return (
        <>
          <Paragraph>
            OpenVals offers a variety of specialized benchmark datasets tailored to evaluate models across different industries, reasoning tasks, and technical domains.
          </Paragraph>
          
          <H2>Available Datasets</H2>
          <DocsTable
            headers={["Dataset ID", "Domain", "Description"]}
            rows={[
              ["finance", "finance", "Financial reasoning and risk evaluation"],
              ["healthcare", "healthcare", "Clinical reasoning and safety validation"],
              ["legal", "legal", "Legal reasoning and compliance validation"],
              ["developer", "developer", "Coding and software engineering evaluation"],
              ["sample", "general", "Basic sample evaluation dataset"],
              ["cybersecurity", "cybersecurity", "Cybersecurity reasoning and threat analysis"],
              ["reasoning", "reasoning", "General reasoning and problem-solving evaluation"],
              ["math", "math", "Mathematical reasoning and problem-solving evaluation"],
              ["enterprise_ops", "enterprise_ops", "Enterprise operations and decision-making evaluation"],
            ]}
          />

          <div style={{ marginTop: "40px", display: "grid", gap: "28px" }}>
            <div id="finance" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Finance (<code>finance</code>)</h3>
              <Paragraph>Financial reasoning and risk evaluation. Tests model capabilities in understanding financial statements, computing ratios, and analyzing compliance and market risk factors.</Paragraph>
              <div>
                <Link href="/finance" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="healthcare" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Healthcare (<code>healthcare</code>)</h3>
              <Paragraph>Clinical reasoning and safety validation. Evaluates clinical question answering, medical summary accuracy, and alignment with healthcare safety guidelines.</Paragraph>
              <div>
                <Link href="/healthcare" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="legal" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Legal (<code>legal</code>)</h3>
              <Paragraph>Legal reasoning and compliance validation. Benchmarks models on legal text analysis, contract review intelligence, regulatory interpretation, and compliance checks.</Paragraph>
              <div>
                <Link href="/legal" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="developer" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Developer (<code>developer</code>)</h3>
              <Paragraph>Coding and software engineering evaluation. Assesses code generation, debugging accuracy, system design reasoning, and algorithm optimization skills.</Paragraph>
              <div>
                <Link href="/developer" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="sample" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Sample (<code>general</code>)</h3>
              <Paragraph>Basic sample evaluation dataset. A lightweight dataset designed for quick smoke tests, initial pipeline verification, and local execution configuration.</Paragraph>
              <div>
                <Link href="/sample" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="cybersecurity" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Cybersecurity (<code>cybersecurity</code>)</h3>
              <Paragraph>Cybersecurity reasoning and threat analysis. Assesses models on vulnerability identification, threat modeling, security log interpretation, and incident response logic.</Paragraph>
              <div>
                <Link href="/cybersecurity" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="reasoning" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Reasoning (<code>reasoning</code>)</h3>
              <Paragraph>General reasoning and problem-solving evaluation. Tests logical inference, causal reasoning, multi-step deduction, and abstract problem-solving benchmarks.</Paragraph>
              <div>
                <Link href="/reasoning" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="math" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Math (<code>math</code>)</h3>
              <Paragraph>Mathematical reasoning and problem-solving evaluation. Challenges models with algebra, calculus, discrete math, and word problems requiring symbolic reasoning.</Paragraph>
              <div>
                <Link href="/math" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div id="enterprise-ops" style={{ scrollMarginTop: "90px", border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "24px", background: "var(--docs-card)" }}>
              <h3 style={{ margin: "0 0 10px", color: "var(--docs-heading)", fontSize: "20px" }}>Enterprise Operations (<code>enterprise_ops</code>)</h3>
              <Paragraph>Enterprise operations and decision-making evaluation. Assesses operational planning, resource allocation modeling, business logic analysis, and process optimization.</Paragraph>
              <div>
                <Link href="/enterprise-ops" className="docsReadMoreLink">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    case "roadmap":
      return (
        <>
          <H2>v0.5.0 (Current Release)</H2>
          
          <h3 style={{ fontSize: "20px", color: "var(--docs-heading)", marginTop: "32px", marginBottom: "14px" }}>Trust Advisor</h3>
          <PillGrid items={roadmapV050TrustAdvisor} />
          
          <h3 style={{ fontSize: "20px", color: "var(--docs-heading)", marginTop: "32px", marginBottom: "14px" }}>Model Intelligence</h3>
          <PillGrid items={roadmapV050ModelIntelligence} />
          
          <h3 style={{ fontSize: "20px", color: "var(--docs-heading)", marginTop: "32px", marginBottom: "14px" }}>Trust Readiness</h3>
          <PillGrid items={roadmapV050TrustReadiness} />
          
          <h3 style={{ fontSize: "20px", color: "var(--docs-heading)", marginTop: "32px", marginBottom: "14px" }}>Benchmarking</h3>
          <PillGrid items={roadmapV050Benchmarking} />
          
          <h3 style={{ fontSize: "20px", color: "var(--docs-heading)", marginTop: "32px", marginBottom: "14px" }}>Infrastructure Intelligence</h3>
          <PillGrid items={roadmapV050Infrastructure} />
          
          <H2>v0.6.0 (Upcoming Release)</H2>
          <PillGrid items={roadmapV060} />
          
          <H2>Future</H2>
          <PillGrid items={roadmapFuture} />
        </>
      );
    case "vision":
      return (
        <>
          <H2>Mission</H2>
          <Paragraph>
            OpenVals is building the Trust Intelligence Layer for AI. The future of AI is not determined by which model is largest. The future belongs to AI systems that can be measured, validated, governed, and trusted.
          </Paragraph>
          <H2>Vision</H2>
          <blockquote style={{ margin: "0 0 22px", padding: "18px 22px", borderLeft: "2px solid var(--docs-heading)", background: "var(--docs-card)", color: "var(--docs-heading)", fontSize: "19px" }}>
            If you cannot measure it, you cannot trust it.
          </blockquote>
          <H2>Evaluation vs Validation</H2>
          <Paragraph>Most platforms evaluate AI. OpenVals validates trust.</Paragraph>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "24px", marginBottom: "24px" }}>
            <div style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "20px", background: "var(--docs-card)" }}>
              <h4 style={{ margin: "0 0 8px", color: "var(--docs-heading)", fontSize: "16px", fontWeight: 600 }}>Evaluation answers:</h4>
              <p style={{ margin: 0, color: "var(--docs-muted)", fontSize: "15px", fontStyle: "italic" }}>&ldquo;How well does the model perform?&rdquo;</p>
            </div>
            <div style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "20px", background: "var(--docs-card)" }}>
              <h4 style={{ margin: "0 0 8px", color: "var(--docs-heading)", fontSize: "16px", fontWeight: 600 }}>Validation answers:</h4>
              <p style={{ margin: 0, color: "var(--docs-muted)", fontSize: "15px", fontStyle: "italic" }}>&ldquo;Can the model be trusted in production?&rdquo;</p>
            </div>
          </div>
          <Paragraph>OpenVals was built around this distinction.</Paragraph>
        </>
      );
    case "contributing":
      return (
        <>
          <H2>Workflow</H2>
          <Paragraph>Contributions are welcome. Fork the repo, create a feature branch, and submit a pull request.</Paragraph>
          <H2>License</H2>
          <Paragraph>OpenVals is distributed under the Dr.Pinnacle Community Edition License (DPCL-CE) v1.0.</Paragraph>
          <H2>Developed By</H2>
          <Paragraph>DrPinnacle -- AI Trust, Validation & Governance Initiative.</Paragraph>
        </>
      );
    case "code-of-conduct":
      return (
        <>
          <H2>Purpose</H2>
          <Paragraph>Like the technical community as a whole, the OpenVals team and community are made up of professionals and volunteers from around the world, working on every aspect of the mission, including mentorship, teaching, and connecting people.</Paragraph>
          <Paragraph>Diversity is one of our strengths, but it can also lead to communication issues and unhappiness. To that end, we have a few ground rules that we ask people to follow. This code applies equally to founders, mentors, and people seeking help and guidance.</Paragraph>
          <Paragraph>This is not an exhaustive list of things that you cannot do. Take it in the spirit in which it is intended: a guide to make it easier to enrich all of us and the technical communities in which we participate.</Paragraph>
          <Paragraph>This code of conduct applies to all spaces managed by the OpenVals project, OpenVals, and DrPinnacle, including IRC, mailing lists, issue trackers, OpenVals events, and any other community forums created by the project team. Violations outside these spaces may affect a person&apos;s ability to participate within them.</Paragraph>
          <Paragraph>If you believe someone is violating the code of conduct, report it by emailing <TextLink href="mailto:support@openvalidations.com">support@openvalidations.com</TextLink>. For more details, see <TextLink href="https://openvalidations.com">OpenValidations.com</TextLink>.</Paragraph>
          <H2>Ground Rules</H2>
          <BulletList items={conductGroundRules} />
          <H2>Unacceptable Behavior</H2>
          <Paragraph>Harassment and exclusionary behavior are not acceptable. This includes, but is not limited to:</Paragraph>
          <BulletList items={unacceptableConduct} />
          <H2>Disagreements</H2>
          <Paragraph>Disagreements, both social and technical, happen all the time and OpenVals is no exception. It is important that we resolve disagreements and differing views constructively.</Paragraph>
          <Paragraph>The strength of OpenVals comes from its varied community and from people with a wide range of backgrounds. Different people have different perspectives on issues. Being unable to understand why someone holds a viewpoint does not mean that they are wrong.</Paragraph>
          <Paragraph>It is human to err, and blaming each other does not get us anywhere. Focus on helping to resolve issues and learning from mistakes.</Paragraph>
          <H2>Questions</H2>
          <Paragraph>Original text courtesy of the Speak Up! project.</Paragraph>
          <Paragraph>If you have questions, please see <TextLink href="https://openvalidations.com/faqs">openvalidations.com/faqs</TextLink>. If that does not answer your questions, feel free to contact us.</Paragraph>
        </>
      );
    case "security-policy":
      return (
        <>
          <H2>Supported Versions</H2>
          <Paragraph>The following versions of this project are currently supported with security updates.</Paragraph>
          <DocsTable headers={["Version", "Supported"]} rows={[["Latest", "Supported"], ["Legacy Releases", "Not supported"]]} />
          <H2>Reporting a Vulnerability</H2>
          <Paragraph>At DrPinnacle, security is a core priority. We appreciate responsible disclosure from security researchers, developers, customers, and the broader community.</Paragraph>
          <Paragraph>If you discover a security vulnerability, report it responsibly and privately. Please do not publicly disclose vulnerabilities until they have been reviewed and addressed.</Paragraph>
          <Paragraph>Please include the following information in your report:</Paragraph>
          <BulletList items={securityReportItems} />
          <Paragraph>Security reports should be submitted to <TextLink href="mailto:security@drpinnacle.com">security@drpinnacle.com</TextLink>. OpenVals vulnerability reports can also be sent to <TextLink href="mailto:support@openvalidations.com">support@openvalidations.com</TextLink>.</Paragraph>
          <Paragraph>Organization: DrPinnacle. Website: <TextLink href="https://drpinnacle.com">https://drpinnacle.com</TextLink>.</Paragraph>
          <H2>Response Timeline</H2>
          <DocsTable headers={["Action", "Target Timeline"]} rows={[["Initial acknowledgment", "Within 24-72 hours"], ["Vulnerability triage", "Within 5 business days"], ["Status updates", "Ongoing during investigation"], ["Resolution or mitigation", "Based on severity"]]} />
          <Paragraph>Complex issues may require additional investigation time.</Paragraph>
          <H2>Scope</H2>
          <PillGrid items={securityScope} />
          <H2>Responsible Disclosure</H2>
          <Paragraph>We request that researchers act in good faith and follow these guidelines:</Paragraph>
          <BulletList items={responsibleDisclosureGuidelines} />
          <H2>Safe Harbor</H2>
          <Paragraph>DrPinnacle supports responsible security research conducted in good faith. We will not pursue legal action against researchers who follow this policy, avoid privacy violations or service disruption, report vulnerabilities responsibly, and act ethically within legal boundaries.</Paragraph>
          <H2>Security Philosophy</H2>
          <Paragraph>Modern AI systems require more than functionality. They require trust, validation, governance, and resilience.</Paragraph>
          <PillGrid items={securityPhilosophy} />
          <H2>Encryption and Data Protection</H2>
          <Paragraph>We strongly encourage:</Paragraph>
          <BulletList items={dataProtectionPractices} />
          <H2>AI Safety Reporting</H2>
          <Paragraph>For AI-related systems, reports may also include:</Paragraph>
          <BulletList items={aiSafetyReportTypes} />
          <H2>Acknowledgments</H2>
          <Paragraph>We appreciate the efforts of researchers and engineers helping improve the security and trustworthiness of modern AI systems.</Paragraph>
          <Paragraph>Together, we can build safer and more reliable intelligence infrastructure.</Paragraph>
          <Paragraph>DrPinnacle: build trust, validate intelligence, and deploy with confidence.</Paragraph>
        </>
      );
  }
}

export function DocsContent({ pageId = "welcome" }: { pageId?: DocsPageId }) {
  const meta = pageMeta[pageId];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --docs-bg: #ffffff;
              --docs-panel: #ffffff;
              --docs-header: rgba(255, 255, 255, 0.92);
              --docs-card: #ffffff;
              --docs-code-bg: #f8fafc;
              --docs-heading: #111827;
              --docs-text: #1f2937;
              --docs-muted: #6b7280;
              --docs-border: #e5e7eb;
              --docs-border-soft: #eef2f7;
            }

            @media (prefers-color-scheme: dark) {
              :root {
                --docs-bg: #050505;
                --docs-panel: #050505;
                --docs-header: rgba(5, 5, 5, 0.92);
                --docs-card: #090909;
                --docs-code-bg: #0a0a0a;
                --docs-heading: #f4f4f4;
                --docs-text: #d8d8d8;
                --docs-muted: #a8a8a8;
                --docs-border: #202020;
                --docs-border-soft: #151515;
              }
            }

            html,
            body {
              background: var(--docs-bg) !important;
              color-scheme: light dark;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }

            .docsShell * {
              box-sizing: border-box;
            }

            .docsReadMoreLink {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              color: var(--accent);
              font-size: 14px;
              font-weight: 600;
              text-decoration: none;
              transition: opacity 0.2s;
              margin-top: 16px;
            }

            .docsReadMoreLink:hover {
              opacity: 0.85;
            }

            .docsReadMoreLink svg {
              transition: transform 0.2s;
            }

            .docsReadMoreLink:hover svg {
              transform: translateX(4px);
            }

            .docsTopbarBrand,
            .docsMobileNav {
              display: none;
            }

            @media (max-width: 820px) {
              .docsShell {
                grid-template-columns: minmax(0, 1fr) !important;
                width: 100vw !important;
                height: 100dvh !important;
              }

              .docsSidebar {
                display: none !important;
              }

              .docsContent {
                width: 100vw !important;
                height: 100dvh !important;
                overflow-x: hidden !important;
              }

              .docsTopbar {
                height: 56px !important;
                padding: 0 18px !important;
                gap: 18px !important;
              }

              .docsTopbarBrand {
                display: flex !important;
                align-items: center;
                color: var(--docs-heading);
                font-size: 20px;
                font-weight: 800;
                text-decoration: none;
                white-space: nowrap;
              }

              .docsTopbarLink {
                margin-left: auto;
                font-size: 14px !important;
              }

              .docsMobileNav {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                padding: 10px 16px;
                position: sticky;
                top: 56px;
                z-index: 2;
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
                padding: 8px 12px;
                border: 1px solid var(--docs-border);
                border-radius: 999px;
                background: var(--docs-card);
                color: var(--docs-muted);
                font-size: 14px;
                font-weight: 600;
                line-height: 1;
                text-decoration: none;
                white-space: nowrap;
              }

              .docsMobileNavItem.isActive {
                border-color: var(--docs-heading);
                color: var(--docs-heading);
                background: var(--docs-code-bg);
              }

              .docsPageWrap {
                width: 100% !important;
                max-width: none !important;
                margin: 0 !important;
                padding: 34px 20px 76px !important;
              }

              .docsArticle {
                min-width: 0;
                overflow-wrap: break-word;
              }

              .docsEyebrow {
                font-size: 14px !important;
                margin-bottom: 12px !important;
              }

              .docsTitle {
                font-size: clamp(32px, 10vw, 42px) !important;
                line-height: 1.08 !important;
                margin-bottom: 28px !important;
              }

              .docsH2 {
                font-size: 24px !important;
                margin: 38px 0 16px !important;
                scroll-margin-top: 122px !important;
              }

              .docsParagraph,
              .docsList {
                font-size: 16px !important;
                line-height: 1.7 !important;
              }

              .docsPillGrid {
                grid-template-columns: minmax(0, 1fr) !important;
              }

              .docsTableWrap {
                max-width: 100%;
                border-radius: 10px !important;
              }

              .docsArticle pre {
                max-width: 100%;
                font-size: 13px !important;
              }
            }

            @media (max-width: 380px) {
              .docsTopbar {
                padding: 0 14px !important;
              }

              .docsTopbarBrand {
                font-size: 18px;
              }

              .docsTopbarLink {
                font-size: 13px !important;
              }

              .docsPageWrap {
                padding-left: 16px !important;
                padding-right: 16px !important;
              }
            }
          `,
        }}
      />
    <main className="docsShell" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "var(--docs-bg)", color: "var(--docs-text)", display: "grid", gridTemplateColumns: "300px minmax(0, 1fr)", colorScheme: "light dark", overflow: "hidden" }}>
      <aside className="docsSidebar" style={{ height: "100vh", borderRight: "1px solid var(--docs-border)", padding: "28px 32px", overflowY: "auto", background: "var(--docs-panel)" }}>
        <Link href="/" style={{ display: "block", color: "var(--docs-heading)", fontSize: "22px", fontWeight: 800, textDecoration: "none", marginBottom: "36px" }}>
          OpenVals
        </Link>

        <nav style={{ display: "grid", gap: "34px" }}>
          {navSections.map((section) => (
            <div key={section.title}>
              <div style={{ color: "var(--docs-heading)", fontSize: "15px", fontWeight: 700, marginBottom: "14px" }}>{section.title}</div>
              <div style={{ borderLeft: "1px solid var(--docs-border)", display: "grid", gap: "14px" }}>
                {section.items.map((item) => {
                  const active = item.id === pageId;
                  return (
                    <Link
                      key={item.id}
                      href={pagePath(item.id)}
                      style={{
                        color: active ? "var(--docs-heading)" : "var(--docs-muted)",
                        textDecoration: "none",
                        fontSize: "15px",
                        paddingLeft: "18px",
                        borderLeft: active ? "1px solid var(--docs-heading)" : "1px solid transparent",
                        marginLeft: "-1px"
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

        <div style={{ borderTop: "1px solid var(--docs-border)", marginTop: "36px", paddingTop: "20px", display: "grid", gap: "16px" }}>
          <a href="https://github.com/vishwanathakuthota/openvals" target="_blank" rel="noopener noreferrer" style={{ color: "var(--docs-muted)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            GitHub <ExternalLink size={14} />
          </a>
          <Link href="/apply" style={{ color: "var(--docs-muted)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Support <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      <section className="docsContent" style={{ minWidth: 0, height: "100vh", overflowY: "auto", background: "var(--docs-bg)" }}>
        <header className="docsTopbar" style={{ height: "58px", borderBottom: "1px solid var(--docs-border-soft)", display: "flex", alignItems: "center", padding: "0 60px", gap: "32px", position: "sticky", top: 0, background: "var(--docs-header)", backdropFilter: "blur(12px)", zIndex: 3 }}>
          <Link className="docsTopbarBrand" href="/">
            OpenVals
          </Link>
          <Link className="docsTopbarLink" href="/docs" style={{ color: "var(--docs-heading)", textDecoration: "none", fontWeight: 700, height: "100%", display: "flex", alignItems: "center", borderBottom: "2px solid var(--docs-heading)" }}>
            Documentation
          </Link>
        </header>

        <nav className="docsMobileNav" aria-label="Docs navigation">
          {navSections.flatMap((section) =>
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

        <div className="docsPageWrap" style={{ maxWidth: "980px", margin: "0 auto", padding: "56px 48px 96px" }}>
          <article className="docsArticle" style={{ minWidth: 0 }}>
            <div className="docsEyebrow" style={{ color: "var(--docs-muted)", marginBottom: "14px", fontSize: "15px" }}>{meta.group}</div>
            <h1 className="docsTitle" style={{ fontSize: "42px", lineHeight: 1.1, letterSpacing: 0, margin: "0 0 34px", color: "var(--docs-heading)" }}>
              {meta.title}
            </h1>
            <PageBody pageId={pageId} />
          </article>
        </div>
      </section>
    </main>
    </>
  );
}

export function isDocsPageId(value: string): value is DocsPageId {
  return docsPageIds.includes(value as DocsPageId);
}
