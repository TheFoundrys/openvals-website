"use client";

import { motion, Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileBadge2,
  Gauge,
  LucideIcon,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Target,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import AmbientGrid from "./AmbientGrid";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./ui.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const leadMagnetHref = "/apply?offer=free-ai-trust-score-assessment";

type ProofItem = {
  value: string;
  label: string;
};

type EngagementPackage = {
  icon: LucideIcon;
  title: string;
  label: string;
  duration: string;
  desc: string;
  outcomes: string[];
};

type ConversionFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ConversionPageData = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  icon: LucideIcon;
  heroStats: ProofItem[];
  outcomes: string[];
  features: ConversionFeature[];
  workflow: Array<{ step: string; title: string; desc: string }>;
  featuredPackage: string;
};

const founderProof: ProofItem[] = [
  { value: "14", label: "IEEE-indexed AI and ML publications" },
  { value: "2", label: "Authored books across cyber and law" },
  { value: "1.5+", label: "Decades in AI, ML, and GenAI systems" },
  { value: "Media", label: "TradeFlock, Elets, Blindwink, and more" },
];

export const engagementPackages: EngagementPackage[] = [
  {
    icon: Gauge,
    title: "Starter AI Risk Assessment",
    label: "Free entry assessment",
    duration: "Fast baseline",
    desc: "A focused trust score review for teams that need a clear first read on model risk.",
    outcomes: ["Trust score snapshot", "Risk surface map", "Priority remediation list"],
  },
  {
    icon: Activity,
    title: "Enterprise AI Validation",
    label: "Full validation engagement",
    duration: "Scoped program",
    desc: "A deeper evaluation of model quality, safety, reliability, bias, and deployment readiness.",
    outcomes: ["Model validation report", "Benchmark comparison", "Executive risk summary"],
  },
  {
    icon: ShieldAlert,
    title: "AI Security",
    label: "Adversarial testing",
    duration: "Attack simulation",
    desc: "Manual and automated pressure testing for jailbreaks, prompt injection, leakage, and abuse cases.",
    outcomes: ["Attack findings", "Severity-ranked issues", "Mitigation playbook"],
  },
  {
    icon: FileBadge2,
    title: "Compliance Readiness",
    label: "Audit preparation",
    duration: "Regulatory support",
    desc: "Evidence, controls, and governance artifacts for teams preparing for AI oversight.",
    outcomes: ["Compliance gap map", "Control checklist", "Audit-ready documentation"],
  },
];

export const conversionPages = {
  aiRiskAssessment: {
    eyebrow: "AI Risk Assessment",
    title: "Know your AI risk before it reaches production.",
    accent: "risk",
    description:
      "OpenVals gives teams a clear trust score, risk map, and remediation plan for models, agents, and AI workflows before they become operational exposure.",
    icon: Gauge,
    heroStats: [
      { value: "Free", label: "AI Trust Score Assessment" },
      { value: "10+", label: "Core model and safety signals" },
      { value: "v0.4.0", label: "Current OpenVals release" },
    ],
    outcomes: [
      "Identify unsafe behavior, weak reliability, data leakage risk, and compliance gaps.",
      "Prioritize remediation work by severity, business impact, and launch readiness.",
      "Give leadership a concise risk snapshot they can act on.",
    ],
    features: [
      {
        icon: Radar,
        title: "Risk Surface Mapping",
        desc: "Map model, data, prompt, agent, and workflow exposure across the AI system.",
      },
      {
        icon: BarChart3,
        title: "Trust Score Baseline",
        desc: "Score reliability, safety, consistency, latency, and performance signals in one view.",
      },
      {
        icon: ClipboardCheck,
        title: "Remediation Plan",
        desc: "Turn findings into a practical validation and governance backlog.",
      },
    ],
    workflow: [
      { step: "01", title: "Intake", desc: "Capture the model use case, data context, deployment path, and known constraints." },
      { step: "02", title: "Assessment", desc: "Evaluate model behavior against trust, safety, and business-critical risk signals." },
      { step: "03", title: "Score", desc: "Produce a trust score with severity-ranked findings and evidence." },
      { step: "04", title: "Action", desc: "Recommend next steps for validation, red teaming, compliance, or monitoring." },
    ],
    featuredPackage: "Starter AI Risk Assessment",
  },
  aiSecurity: {
    eyebrow: "AI Security",
    title: "Find jailbreaks, prompt attacks, and unsafe model behavior first.",
    accent: "security",
    description:
      "Adversarial testing for LLMs, copilots, agents, and AI applications, designed to reveal security and safety failures before users or attackers do.",
    icon: ShieldAlert,
    heroStats: [
      { value: "Manual", label: "Expert adversarial probing" },
      { value: "Auto", label: "Attack variant testing" },
      { value: "Report", label: "Severity-ranked findings" },
    ],
    outcomes: [
      "Expose prompt injection, jailbreak, data leakage, and policy bypass paths.",
      "Pressure-test model boundaries across realistic user and attacker scenarios.",
      "Deliver mitigation guidance for guardrails, prompts, retrieval, and workflow controls.",
    ],
    features: [
      {
        icon: Terminal,
        title: "Prompt Injection Testing",
        desc: "Evaluate whether instructions, tools, retrieval, or secrets can be bypassed or extracted.",
      },
      {
        icon: ShieldCheck,
        title: "Guardrail Validation",
        desc: "Check whether safety controls hold under multi-turn and role-based attacks.",
      },
      {
        icon: Target,
        title: "Abuse Case Simulation",
        desc: "Model realistic misuse patterns across your product, data, and workflow boundaries.",
      },
    ],
    workflow: [
      { step: "01", title: "Scope", desc: "Define target interfaces, model access, tools, policies, and protected assets." },
      { step: "02", title: "Attack", desc: "Run manual and automated adversarial probes across high-risk scenarios." },
      { step: "03", title: "Verify", desc: "Reproduce findings, classify severity, and capture evidence." },
      { step: "04", title: "Harden", desc: "Recommend prompt, retrieval, policy, and product control improvements." },
    ],
    featuredPackage: "AI Security",
  },
  aiModelValidation: {
    eyebrow: "AI Model Validation",
    title: "Validate model quality, safety, and reliability with evidence.",
    accent: "validation",
    description:
      "OpenVals evaluates AI models beyond accuracy, combining performance, bias, reliability, safety, consistency, latency, and deployment fit.",
    icon: Activity,
    heroStats: [
      { value: "161201", label: "Validated model runs" },
      { value: "5+", label: "LLM provider paths" },
      { value: "10+", label: "Evaluation signals" },
    ],
    outcomes: [
      "Compare models against the same dataset, prompt suite, and business criteria.",
      "Detect performance degradation, bias patterns, inconsistency, and unsafe outputs.",
      "Create audit-ready evidence for launch, procurement, or model replacement decisions.",
    ],
    features: [
      {
        icon: BarChart3,
        title: "Benchmarking",
        desc: "Compare model candidates across normalized metrics and deployment priorities.",
      },
      {
        icon: CheckCircle2,
        title: "Quality Assurance",
        desc: "Measure accuracy, semantic alignment, reliability, variance, latency, and safety.",
      },
      {
        icon: Target,
        title: "Use-Case Fit",
        desc: "Validate model behavior against domain-specific workflows and acceptance criteria.",
      },
    ],
    workflow: [
      { step: "01", title: "Define", desc: "Set the evaluation criteria, domains, datasets, providers, and success thresholds." },
      { step: "02", title: "Benchmark", desc: "Run comparable evaluation across candidate models and configurations." },
      { step: "03", title: "Analyze", desc: "Review quality, safety, bias, reliability, latency, and trust score signals." },
      { step: "04", title: "Decide", desc: "Deliver a validation report with model ranking and launch recommendations." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
  aiComplianceReadiness: {
    eyebrow: "AI Compliance Readiness",
    title: "Prepare AI systems for audit, governance, and regulatory review.",
    accent: "readiness",
    description:
      "OpenVals helps teams build the evidence, controls, validation reports, and risk documentation needed for responsible AI oversight.",
    icon: FileBadge2,
    heroStats: [
      { value: "EU AI", label: "Act readiness mapping" },
      { value: "NIST", label: "Risk management alignment" },
      { value: "ISO", label: "Control evidence support" },
    ],
    outcomes: [
      "Understand regulatory gaps before a customer, investor, or auditor asks.",
      "Create model documentation, risk records, and validation evidence.",
      "Align technical teams and leadership around AI governance next steps.",
    ],
    features: [
      {
        icon: BookOpen,
        title: "Governance Artifacts",
        desc: "Prepare model cards, risk records, validation logs, and technical evidence packs.",
      },
      {
        icon: FileBadge2,
        title: "Control Mapping",
        desc: "Map model risks to internal controls and external readiness expectations.",
      },
      {
        icon: ClipboardCheck,
        title: "Audit Readiness",
        desc: "Create a clear path from technical validation to compliance evidence.",
      },
    ],
    workflow: [
      { step: "01", title: "Map", desc: "Review the AI use case, data flows, users, decisions, and potential risk category." },
      { step: "02", title: "Gap", desc: "Compare current evidence and controls against readiness requirements." },
      { step: "03", title: "Document", desc: "Build the validation, governance, and technical documentation pack." },
      { step: "04", title: "Prepare", desc: "Prioritize actions for customer, auditor, board, or regulator conversations." },
    ],
    featuredPackage: "Compliance Readiness",
  },
  trustScoreEngine: {
    eyebrow: "Trust Score Engine",
    title: "Turn model evaluation into a decision-ready trust score.",
    accent: "trust score",
    description:
      "The OpenVals Trust Score Engine combines quality, reliability, safety, latency, and variance signals into a practical view of deployment confidence.",
    icon: BarChart3,
    heroStats: [
      { value: "1", label: "Unified trust score" },
      { value: "Weighted", label: "Business-aligned metrics" },
      { value: "API", label: "Evaluation-ready roadmap" },
    ],
    outcomes: [
      "Give technical and business teams one shared language for AI readiness.",
      "Weight evaluation signals around safety, cost, latency, accuracy, and reliability.",
      "Track whether a model is ready to launch, needs guardrails, or should be rejected.",
    ],
    features: [
      {
        icon: Gauge,
        title: "Weighted Scoring",
        desc: "Tune score weights around your use case, risk tolerance, and business impact.",
      },
      {
        icon: Activity,
        title: "Evaluation Signals",
        desc: "Combine accuracy, semantic alignment, reliability, safety, consistency, variance, and latency.",
      },
      {
        icon: ShieldCheck,
        title: "Decision Support",
        desc: "Translate technical findings into clear go, no-go, or remediate recommendations.",
      },
    ],
    workflow: [
      { step: "01", title: "Instrument", desc: "Select metrics, datasets, providers, and evaluation thresholds." },
      { step: "02", title: "Evaluate", desc: "Run benchmark and validation workflows across your model candidates." },
      { step: "03", title: "Score", desc: "Generate a trust score using weighted signals aligned to business priorities." },
      { step: "04", title: "Operationalize", desc: "Use the score in launch gates, procurement decisions, and ongoing validation." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
} satisfies Record<string, ConversionPageData>;

export function FounderProofBand({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={STAGGER}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
        gap: compact ? "24px" : "40px",
        alignItems: "center",
        width: "100%",
      }}
    >
      <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "18px", minWidth: 0 }}>
        <div
          style={{
            width: compact ? "86px" : "112px",
            height: compact ? "86px" : "112px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            flex: "0 0 auto",
            background: "var(--secondary-bg)",
            backgroundImage: "url(https://thefoundrys.com/images/vishwa-new.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label="Vishwanath Akuthota"
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0 }}>
            Founder Proof
          </div>
          <h3 style={{ margin: "8px 0", fontSize: compact ? "24px" : "32px", lineHeight: 1.15 }}>
            Research, books, media, and IEEE publications behind the trust layer.
          </h3>
          <Link href="/vishwanathakuthota" className={styles.textLink} style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            View founder profile <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={STAGGER}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
          gap: "12px",
        }}
      >
        {founderProof.map((item) => (
          <motion.div
            key={item.label}
            variants={FADE_UP}
            style={{
              minHeight: compact ? "96px" : "116px",
              padding: compact ? "18px" : "22px",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              background: "var(--card-bg)",
            }}
          >
            <div style={{ color: "var(--accent)", fontSize: compact ? "24px" : "30px", fontWeight: 900, lineHeight: 1 }}>{item.value}</div>
            <p style={{ margin: "10px 0 0", color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.4 }}>{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function EngagementPackages({ compact = false, featuredPackage }: { compact?: boolean; featuredPackage?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ width: "100%" }}>
      <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: "22px" }}>
        <div>
          <div style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0 }}>
            Engagement Packages
          </div>
          <h2 style={{ margin: "8px 0 0", fontSize: compact ? "28px" : "42px", lineHeight: 1.1 }}>
            Start with the right level of AI assurance.
          </h2>
        </div>
        {!compact && (
          <Link href={leadMagnetHref} className={`${styles.button} ${styles.primary}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", whiteSpace: "nowrap" }}>
            Free AI Trust Score Assessment <ArrowRight size={18} />
          </Link>
        )}
      </motion.div>

      <motion.div
        variants={STAGGER}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
          gap: "16px",
        }}
      >
        {engagementPackages.map((pkg) => {
          const PackageIcon = pkg.icon;
          const featured = pkg.title === featuredPackage;

          return (
            <motion.div
              key={pkg.title}
              variants={FADE_UP}
              className={styles.card}
              style={{
                padding: compact ? "20px" : "28px",
                borderRadius: "12px",
                background: featured ? "color-mix(in srgb, var(--accent) 10%, var(--card-bg))" : "var(--card-bg)",
                borderColor: featured ? "var(--accent)" : "var(--border)",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                <PackageIcon size={compact ? 24 : 30} strokeWidth={1.7} />
                <span style={{ color: "var(--accent)", fontSize: "12px", fontWeight: 800, lineHeight: 1.2, textAlign: "right" }}>
                  {pkg.label}
                </span>
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: compact ? "18px" : "22px", lineHeight: 1.2 }}>{pkg.title}</h3>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: compact ? "13px" : "15px", lineHeight: 1.5 }}>{pkg.desc}</p>
              {!compact && (
                <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "grid", gap: "10px" }}>
                  {pkg.outcomes.map((outcome) => (
                    <li key={outcome} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-main)", fontSize: "14px", lineHeight: 1.4 }}>
                      <CheckCircle2 size={16} style={{ color: "var(--accent)", flex: "0 0 auto", marginTop: "2px" }} />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: compact ? "16px" : "24px", paddingTop: "14px", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "13px", fontWeight: 700 }}>
                {pkg.duration}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export function LeadMagnetCta({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={STAGGER}
      style={{
        textAlign: "center",
        padding: compact ? "28px 24px" : "56px 32px",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, var(--card-bg)), var(--card-bg))",
        width: "100%",
      }}
    >
      <motion.h2 variants={FADE_UP} style={{ margin: "0 auto 14px", maxWidth: "760px", fontSize: compact ? "30px" : "46px", lineHeight: 1.08 }}>
        Free AI Trust Score Assessment
      </motion.h2>
      <motion.p variants={FADE_UP} style={{ margin: "0 auto 26px", maxWidth: "680px", color: "var(--text-muted)", fontSize: compact ? "15px" : "18px", lineHeight: 1.6 }}>
        Get a fast baseline of your model&apos;s reliability, safety, compliance, and deployment risk before you invest in a full validation program.
      </motion.p>
      <motion.div variants={FADE_UP}>
        <Link href={leadMagnetHref} className={`${styles.button} ${styles.primary}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          Get Free Assessment <ArrowRight size={18} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function HomepageConversionStack() {
  return (
    <div style={{ display: "grid", gap: "26px", width: "100%" }}>
      <FounderProofBand compact />
      <EngagementPackages compact />
      <LeadMagnetCta compact />
    </div>
  );
}

export function ConversionPage({ page }: { page: ConversionPageData }) {
  const PageIcon = page.icon;

  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "48px", alignItems: "center" }}>
              <div>
                <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 800, textTransform: "uppercase", fontSize: "14px", letterSpacing: 0 }}>
                  <PageIcon size={20} /> {page.eyebrow}
                </motion.div>
                <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(42px, 6vw, 76px)", lineHeight: 1.05, marginBottom: "28px" }}>
                  {page.title}
                </motion.h1>
                <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 23px)", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "34px" }}>
                  {page.description}
                </motion.p>
                <motion.div variants={FADE_UP} style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href={leadMagnetHref} className={`${styles.button} ${styles.primary}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    Free AI Trust Score Assessment <ArrowRight size={18} />
                  </Link>
                  <Link href="#packages" className={`${styles.button} ${styles.secondary}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    View Packages <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                variants={FADE_UP}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                  background: "var(--card-bg)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "18px", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: 700 }}>OpenVals Assessment</div>
                    <h2 style={{ margin: "6px 0 0", fontSize: "28px" }}>Trust Score Preview</h2>
                  </div>
                  <div style={{ width: "64px", height: "64px", borderRadius: "14px", display: "grid", placeItems: "center", background: "color-mix(in srgb, var(--accent) 12%, transparent)", color: "var(--accent)" }}>
                    <PageIcon size={34} strokeWidth={1.6} />
                  </div>
                </div>
                <div style={{ display: "grid", gap: "14px", marginTop: "22px" }}>
                  {page.heroStats.map((stat) => (
                    <div key={stat.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", padding: "16px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--secondary-bg)" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: 700 }}>{stat.label}</span>
                      <strong style={{ color: "var(--accent)", fontSize: "22px", whiteSpace: "nowrap" }}>{stat.value}</strong>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "22px", display: "grid", gap: "12px" }}>
                  {page.outcomes.map((outcome) => (
                    <div key={outcome} style={{ display: "flex", gap: "10px", color: "var(--text-main)", fontSize: "15px", lineHeight: 1.5 }}>
                      <CheckCircle2 size={18} style={{ color: "var(--accent)", flex: "0 0 auto", marginTop: "2px" }} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div variants={FADE_UP} style={{ maxWidth: "720px", marginBottom: "34px" }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 14px" }}>What you get.</h2>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "18px", lineHeight: 1.6 }}>
                Clear, evidence-backed deliverables for technical teams, leadership, customers, and auditors.
              </p>
            </motion.div>
            <motion.div variants={STAGGER} className={styles.grid} style={{ marginTop: 0 }}>
              {page.features.map((feature) => {
                const FeatureIcon = feature.icon;

                return (
                  <motion.div key={feature.title} variants={FADE_UP} className={styles.card} style={{ borderRadius: "12px", height: "100%" }}>
                    <FeatureIcon size={38} strokeWidth={1.6} />
                    <h3 style={{ fontSize: "24px", margin: "0 0 14px" }}>{feature.title}</h3>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.6 }}>{feature.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        <section className={styles.section}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 34px" }}>
              Engagement workflow.
            </motion.h2>
            <motion.div variants={STAGGER} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: "20px" }}>
              {page.workflow.map((item) => (
                <motion.div key={item.step} variants={FADE_UP} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "22px" }}>
                  <div style={{ color: "var(--accent)", fontSize: "14px", fontWeight: 900, marginBottom: "12px" }}>{item.step}</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>{item.title}</h3>
                  <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.55 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="packages" className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <EngagementPackages featuredPackage={page.featuredPackage} />
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <LeadMagnetCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
