import { ExternalLink } from "lucide-react";
import Link from "next/link";
import CopyableCodeBlock from "./CopyableCodeBlock";

type DocsPageId =
  | "welcome"
  | "why-openvals"
  | "installation"
  | "quick-start"
  | "drs"
  | "model-evaluation"
  | "benchmarking"
  | "scoring-engine"
  | "semantic-intelligence"
  | "metrics"
  | "domains"
  | "roadmap"
  | "vision"
  | "contributing";

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
      { id: "benchmarking", label: "Benchmarking" },
      { id: "scoring-engine", label: "Scoring Engine" },
      { id: "semantic-intelligence", label: "Semantic Intelligence" },
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
    ],
  },
];

export const docsPageIds = navSections.flatMap((section) => section.items.map((item) => item.id));

const pageMeta: Record<DocsPageId, { group: string; title: string; onThisPage: string[] }> = {
  welcome: { group: "Get started", title: "OpenVals documentation", onThisPage: ["Platform", "Built For", "Final Thought"] },
  "why-openvals": { group: "Get started", title: "Why OpenVals", onThisPage: ["Problem", "What it solves", "Questions"] },
  installation: { group: "Get started", title: "Installation", onThisPage: ["Install", "Requirements"] },
  "quick-start": { group: "Get started", title: "Quick Start", onThisPage: ["CLI Benchmarking", "Python Example", "Example Output"] },
  drs: { group: "Core Capabilities", title: "Decision Reliability Score (DRS)", onThisPage: ["Overview", "Formula", "Signals"] },
  "model-evaluation": { group: "Core Capabilities", title: "Model Evaluation", onThisPage: ["Metrics", "Evaluation Signals"] },
  benchmarking: { group: "Core Capabilities", title: "Multi-Model Benchmarking", onThisPage: ["Comparison", "Ranking"] },
  "scoring-engine": { group: "Core Capabilities", title: "Scoring Engine", onThisPage: ["Trust Score", "Weights"] },
  "semantic-intelligence": { group: "Core Capabilities", title: "Semantic Intelligence Engine", onThisPage: ["Embeddings", "Roadmap"] },
  metrics: { group: "Reference", title: "Metrics Explained", onThisPage: ["Metric Guide", "Interpretation"] },
  domains: { group: "Reference", title: "Supported Benchmark Domains", onThisPage: ["Domains"] },
  roadmap: { group: "Reference", title: "Roadmap", onThisPage: ["v0.3.0", "Future"] },
  vision: { group: "Reference", title: "Philosophy and Vision", onThisPage: ["Mission", "Vision"] },
  contributing: { group: "Reference", title: "Contributing", onThisPage: ["Workflow", "License", "Backed By"] },
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
  ["DRS Score", "Higher", "0.75 to 1.00", "Overall deployment reliability"],
];

const domains = ["Finance", "Cybersecurity", "Legal", "Math", "Reasoning", "Enterprise Operations", "Software Development", "Developer dataset"];
const roadmap = ["Hallucination Probability Index", "AI Risk Scoring", "Governance Analytics", "Certification System", "PDF Reporting", "Adversarial Testing", "REST APIs", "Evaluation history", "External dataset integrations", "SaaS platform", "Enterprise governance", "Continuous AI validation", "Team workspaces and dashboards"];

function pagePath(id: DocsPageId) {
  return id === "welcome" ? "/docs" : `/docs/${id}`;
}

function anchor(label: string) {
  return label.toLowerCase().replaceAll(" ", "-");
}

function CodeBlock({ children }: { children: string }) {
  return <CopyableCodeBlock>{children}</CopyableCodeBlock>;
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
  return <h2 id={anchor(children)} style={{ fontSize: "28px", lineHeight: 1.2, margin: "48px 0 18px", color: "var(--docs-heading)", scrollMarginTop: "90px" }}>{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 18px" }}>{children}</p>;
}

function PillGrid({ items }: { items: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", marginTop: "18px" }}>
      {items.map((item) => (
        <div key={item} style={{ border: "1px solid var(--docs-border)", borderRadius: "12px", padding: "14px 16px", color: "var(--docs-text)", background: "var(--docs-card)" }}>{item}</div>
      ))}
    </div>
  );
}

function MetricsTable() {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--docs-border)", borderRadius: "14px", marginTop: "20px" }}>
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
              {row.map((cell) => (
                <td key={cell} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border-soft)", color: "var(--docs-muted)" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageBody({ pageId }: { pageId: DocsPageId }) {
  switch (pageId) {
    case "welcome":
      return (
        <>
          <H2>Platform</H2>
          <Paragraph>OpenVals is evaluation and trust infrastructure for LLMs, SLMs, local AI, private AI, and public AI. It helps organizations measure, compare, and trust AI models before deployment.</Paragraph>
          <Paragraph>Enterprise AI Evaluation and Trust Platform. Evaluate. Benchmark. Trust. Deploy AI/ML with confidence.</Paragraph>
          <H2>Built For</H2>
          <PillGrid items={["AI engineering teams", "ML teams", "SaaS companies using LLMs", "Enterprises validating models", "AI governance and compliance teams"]} />
          <H2>Final Thought</H2>
          <Paragraph>AI models are easy to build. Trustworthy AI systems are difficult to engineer. OpenVals exists to help organizations measure, validate, and trust AI before deployment.</Paragraph>
        </>
      );
    case "why-openvals":
      return (
        <>
          <H2>Problem</H2>
          <Paragraph>AI models are powerful, but without proper validation they are unpredictable, insecure, and hard to trust. Most AI evaluation tools stop at metrics. OpenVals exists to solve that.</Paragraph>
          <H2>What It Solves</H2>
          <PillGrid items={whyItems} />
          <H2>Questions</H2>
          <Paragraph>Which model is actually best for your use case? How do models compare beyond accuracy? Can you trust this model in production? Which model is fastest, safest, and most reliable?</Paragraph>
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
          <H2>CLI Benchmarking</H2>
          <CodeBlock>{`openvals benchmark --dataset finance --models mistral,llama3 --config finance --output finance_report.html`}</CodeBlock>
          <H2>Python Example</H2>
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
          <H2>Example Output</H2>
          <CodeBlock>{`=== FINAL RANKING ===
1. mistral   (0.91)
2. llama3    (0.87)
3. llama2    (0.84)`}</CodeBlock>
        </>
      );
    case "drs":
      return (
        <>
          <H2>Overview</H2>
          <Paragraph>DRS is a production-oriented scoring framework designed to evaluate whether an AI model can be trusted in real-world deployment environments.</Paragraph>
          <H2>Formula</H2>
          <ScoreFormula />
          <H2>Signals</H2>
          <PillGrid items={["Accuracy", "Semantic similarity", "Reliability", "Safety", "Consistency", "Variance", "Latency"]} />
        </>
      );
    case "model-evaluation":
      return (
        <>
          <H2>Metrics</H2>
          <Paragraph>Evaluate model outputs against structured datasets using accuracy, embedding-based semantic similarity, reliability, safety, consistency, variance, and latency.</Paragraph>
          <H2>Evaluation Signals</H2>
          <MetricsTable />
        </>
      );
    case "benchmarking":
      return (
        <>
          <H2>Comparison</H2>
          <Paragraph>Compare multiple models under the same conditions with side-by-side evaluation, normalized scoring, model ranking, and performance insights.</Paragraph>
          <H2>Ranking</H2>
          <CodeBlock>{`1. mistral   (0.91)
2. llama3    (0.87)
3. llama2    (0.84)`}</CodeBlock>
        </>
      );
    case "scoring-engine":
      return (
        <>
          <H2>Trust Score</H2>
          <Paragraph>The scoring engine uses weighted scoring aligned to business priorities.</Paragraph>
          <ScoreFormula label="Trust Score" />
          <H2>Weights</H2>
          <Paragraph>Customize weights per use case to balance accuracy, cost, latency, safety, and deployment reliability.</Paragraph>
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
          <H2>Domains</H2>
          <PillGrid items={domains} />
        </>
      );
    case "roadmap":
      return (
        <>
          <H2>v0.3.0</H2>
          <PillGrid items={roadmap.slice(0, 9)} />
          <H2>Future</H2>
          <PillGrid items={roadmap.slice(9)} />
        </>
      );
    case "vision":
      return (
        <>
          <H2>Mission</H2>
          <Paragraph>Our mission is to build the essential trust layer for AI systems, ensuring they remain transparent, reliable, and safe.</Paragraph>
          <H2>Vision</H2>
          <blockquote style={{ margin: "0 0 22px", padding: "18px 22px", borderLeft: "2px solid var(--docs-heading)", background: "var(--docs-card)", color: "var(--docs-heading)", fontSize: "19px" }}>
            If you cannot measure it, you cannot trust it.
          </blockquote>
        </>
      );
    case "contributing":
      return (
        <>
          <H2>Workflow</H2>
          <Paragraph>Contributions are welcome. Fork the repo, create a feature branch, and submit a pull request.</Paragraph>
          <H2>License</H2>
          <Paragraph>OpenVals is distributed under the MIT License.</Paragraph>
          <H2>Backed By</H2>
          <Paragraph>Developed as part of DrPinnacle's AI Trust and Validation Initiative, focused on building secure, scalable, and trustworthy AI systems.</Paragraph>
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
          `,
        }}
      />
    <main style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "var(--docs-bg)", color: "var(--docs-text)", display: "grid", gridTemplateColumns: "300px minmax(0, 1fr)", colorScheme: "light dark", overflow: "hidden" }}>
      <aside style={{ height: "100vh", borderRight: "1px solid var(--docs-border)", padding: "28px 32px", overflowY: "auto", background: "var(--docs-panel)" }}>
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

      <section style={{ minWidth: 0, height: "100vh", overflowY: "auto", background: "var(--docs-bg)" }}>
        <header style={{ height: "58px", borderBottom: "1px solid var(--docs-border-soft)", display: "flex", alignItems: "center", padding: "0 60px", gap: "32px", position: "sticky", top: 0, background: "var(--docs-header)", backdropFilter: "blur(12px)", zIndex: 2 }}>
          <Link href="/docs" style={{ color: "var(--docs-heading)", textDecoration: "none", fontWeight: 700, height: "100%", display: "flex", alignItems: "center", borderBottom: "2px solid var(--docs-heading)" }}>
            Documentation
          </Link>
        </header>

        <div style={{ maxWidth: "980px", margin: "0 auto", padding: "56px 48px 96px" }}>
          <article style={{ minWidth: 0 }}>
            <div style={{ color: "var(--docs-muted)", marginBottom: "14px", fontSize: "15px" }}>{meta.group}</div>
            <h1 style={{ fontSize: "42px", lineHeight: 1.1, letterSpacing: 0, margin: "0 0 34px", color: "var(--docs-heading)" }}>
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
