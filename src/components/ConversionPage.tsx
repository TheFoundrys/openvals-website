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
import { CSSProperties } from "react";
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

export const leadMagnetHref = "/assessment";

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
  { value: "Media", label: "Forbes, TradeFlock, Elets, and more" },
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
      { value: "v0.5.0", label: "Current OpenVals release" },
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
  finance: {
    eyebrow: "Who We Serve: Finance",
    title: "Financial-grade AI validation for trustworthy operations and ROI.",
    accent: "finance",
    description: "Validate financial reasoning, risk models, regulatory compliance, and accuracy. OpenVals helps institutions mitigate compliance penalties, reduce verification labor by 80%, and achieve high-ROI trustworthy AI deployments.",
    icon: Activity,
    heroStats: [
      { value: "0.96+", label: "Average Dataset Health" },
      { value: "80%", label: "Manual Review Labor Saved" },
      { value: "SEC/FINRA", label: "Regulatory Compliance Match" },
    ],
    outcomes: [
      "Eliminate financial hallucination risks, preventing costly transaction, portfolio calculation, and pricing errors.",
      "Reduce manual model auditing hours by up to 75%, generating instant operational ROI.",
      "Build trustworthy, launch-ready financial agents compliant with SEC, FINRA, and global audit frameworks.",
    ],
    features: [
      {
        icon: BarChart3,
        title: "Quantitative Accuracy",
        desc: "Verify calculation correctness and table understanding to secure high-value financial decisions.",
      },
      {
        icon: FileBadge2,
        title: "Compliance & Governance",
        desc: "Map AI outputs directly to financial regulations, protecting your brand reputation and budget.",
      },
      {
        icon: ShieldCheck,
        title: "Adversarial Risk Modeling",
        desc: "Stress-test models against market scenarios, prompt injections, and data extraction attempts.",
      },
    ],
    workflow: [
      { step: "01", title: "Select", desc: "Choose financial reasoning templates and risk thresholds for your use case." },
      { step: "02", title: "Evaluate", desc: "Run your model against quantitative financial reasoning and auditing datasets." },
      { step: "03", title: "Audit", desc: "Verify calculation correctness, citation truth, and compliance status." },
      { step: "04", title: "Deploy", desc: "Export audit-ready validation reports to launch your trustworthy AI safely." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
  healthcare: {
    eyebrow: "Who We Serve: Healthcare",
    title: "Clinical-grade AI safety to protect patients and unlock enterprise ROI.",
    accent: "healthcare",
    description: "Validate clinical reasoning, medical terminology, and patient safety boundaries. OpenVals helps healthcare networks eliminate medical hallucinations, verify safety protocols, and build trusted AI systems.",
    icon: ShieldCheck,
    heroStats: [
      { value: "99.9%", label: "Clinical Safety Accuracy" },
      { value: "100%", label: "HIPAA Data Scan Coverage" },
      { value: "Zero", label: "Unvalidated Model Launches" },
    ],
    outcomes: [
      "Ensure 100% adherence to patient safety guidelines, eliminating critical clinical recommendation errors.",
      "Shorten medical QA evaluation cycles from weeks to minutes, reducing administrative overhead.",
      "Maximize ROI by confidently automating pre-authorizations, clinical summaries, and patient intake.",
    ],
    features: [
      {
        icon: Activity,
        title: "Clinical Accuracy",
        desc: "Evaluate model answers against standardized clinical knowledge databases and diagnostics.",
      },
      {
        icon: ShieldCheck,
        title: "Patient Privacy & HIPAA",
        desc: "Scan inputs and outputs for HIPAA compliance, ensuring complete data privacy and security.",
      },
      {
        icon: Radar,
        title: "Hallucination Control",
        desc: "Measure and lower the probability of medical-term hallucinations to guarantee model trust.",
      },
    ],
    workflow: [
      { step: "01", title: "Setup", desc: "Select clinical reasoning benchmark datasets and patient safety rules." },
      { step: "02", title: "Benchmark", desc: "Run model validation checks for accuracy, privacy, and clinical terms." },
      { step: "03", title: "Verify", desc: "Validate clinical safety signals, diagnostic alignment, and trust scores." },
      { step: "04", title: "Certify", desc: "Generate a medical safety verification report to deploy with trust." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
  legal: {
    eyebrow: "Who We Serve: Legal",
    title: "Precision legal reasoning to mitigate liability and drive billable efficiency.",
    accent: "legal",
    description: "Evaluate contract intelligence, regulatory interpretation, and document analysis. OpenVals helps firms automate document review safely, reducing legal audit costs and securing a trustworthy AI workflow.",
    icon: FileBadge2,
    heroStats: [
      { value: "99%", label: "Hallucination Detection" },
      { value: "10x", label: "Contract Review Speedup" },
      { value: "0.94+", label: "Legal Dataset Health" },
    ],
    outcomes: [
      "Mitigate document analysis liability by catching 99% of hallucinated citations and clauses.",
      "Achieve immediate ROI by automating initial contract review cycles with audit-grade trust.",
      "Ensure complete compliance with corporate governance, data privacy, and legal frameworks.",
    ],
    features: [
      {
        icon: BookOpen,
        title: "Citation Auditing",
        desc: "Verify that references to laws, articles, and cases exist and are contextually accurate.",
      },
      {
        icon: ClipboardCheck,
        title: "Contract Validation",
        desc: "Check model capabilities in identifying liabilities, terms, clauses, and missing provisions.",
      },
      {
        icon: FileBadge2,
        title: "Compliance Mapping",
        desc: "Assert model capability to identify regulatory obligations and risks in real-time.",
      },
    ],
    workflow: [
      { step: "01", title: "Load", desc: "Upload contract guidelines, compliance rules, and legal datasets." },
      { step: "02", title: "Test", desc: "Execute legal QA benchmarks, clause audits, and precedent checks." },
      { step: "03", title: "Analyze", desc: "Detect hallucinated citations, missing clauses, and logic alignment." },
      { step: "04", title: "Audit", desc: "Retrieve a clean governance audit pack to confidently prove AI trust." },
    ],
    featuredPackage: "Compliance Readiness",
  },
  developer: {
    eyebrow: "Who We Serve: Developer",
    title: "Build trustworthy software agents with measurable quality and code ROI.",
    accent: "developer",
    description: "Evaluate code syntax, security flaws, algorithm efficiency, and multi-step logic. OpenVals helps engineering teams prevent insecure code generation, cut debugging cycles, and verify code agent trust.",
    icon: Terminal,
    heroStats: [
      { value: "OWASP", label: "Top 10 Security Scans" },
      { value: "Zero", label: "Insecure Code generation" },
      { value: "CI/CD", label: "Pipeline Integration Ready" },
    ],
    outcomes: [
      "Boost developer productivity and ROI by validating code assistant accuracy automatically.",
      "Expose security vulnerabilities (OWASP) before they enter production, saving massive fix costs.",
      "Establish complete trust in automated code generation, deployment, and refactoring agents.",
    ],
    features: [
      {
        icon: Terminal,
        title: "Execution Testing",
        desc: "Compile and run model code outputs to measure syntax, execution correctness, and logic.",
      },
      {
        icon: ShieldAlert,
        title: "Vulnerability Scanning",
        desc: "Audit generated code for security issues, prompt injections, and credentials leakage.",
      },
      {
        icon: Target,
        title: "Logic Optimization",
        desc: "Measure code complexity, scalability, and algorithmic efficiency for maximum ROI.",
      },
    ],
    workflow: [
      { step: "01", title: "Ingest", desc: "Feed code challenges or system architectures into the engine." },
      { step: "02", title: "Run", desc: "Verify code execution correctness, syntax, and computational cost." },
      { step: "03", title: "Scan", desc: "Run static analysis and OWASP security vulnerability audits." },
      { step: "04", title: "Grade", desc: "Report efficiency scores, execution success rates, and trust levels." },
    ],
    featuredPackage: "AI Security",
  },
  sample: {
    eyebrow: "Who We Serve: General",
    title: "Instant baseline testing to accelerate AI evaluation ROI.",
    accent: "general",
    description: "Establish trust baselines using general reasoning and smoke-testing datasets. OpenVals helps teams verify pipeline setups in minutes, minimizing engineering setup costs and building initial trust.",
    icon: Gauge,
    heroStats: [
      { value: "Instant", label: "Baseline Deployment" },
      { value: "Standard", label: "Common-Sense Testing" },
      { value: "Smoke Test", label: "Quick Validation" },
    ],
    outcomes: [
      "Validate integration pipelines instantly, reducing setup and engineering overhead costs.",
      "Benchmark model options on a standard baseline before investing in larger custom evaluations.",
      "Verify basic common-sense logic alignment to establish a solid trust foundation.",
    ],
    features: [
      {
        icon: Gauge,
        title: "Smoke Testing",
        desc: "Validate pipeline connectivity, model adapters, and evaluation configurations.",
      },
      {
        icon: Radar,
        title: "Reasoning Baselines",
        desc: "Benchmark models against general logical reasoning problems to start.",
      },
      {
        icon: CheckCircle2,
        title: "Quick Insights",
        desc: "Generate high-level latency, cost, and accuracy baselines in seconds.",
      },
    ],
    workflow: [
      { step: "01", title: "Initialize", desc: "Spin up a lightweight general reasoning dataset." },
      { step: "02", title: "Run", desc: "Execute a fast test run across one or more models." },
      { step: "03", title: "Assess", desc: "Verify latency, cost, and basic accuracy signals." },
      { step: "04", title: "Verify", desc: "Confirm your testing pipeline is configured correctly for larger runs." },
    ],
    featuredPackage: "Starter AI Risk Assessment",
  },
  cybersecurity: {
    eyebrow: "Who We Serve: Cybersecurity",
    title: "Adversarial threat modeling to secure AI assets and protect ROI.",
    accent: "security",
    description: "Stress-test security logic, threat detection, and copilot actions. OpenVals helps security teams validate model guardrails, prevent credential leakage, and defend enterprise AI trust.",
    icon: ShieldAlert,
    heroStats: [
      { value: "Proactive", label: "Threat Modeling" },
      { value: "CVE/CWE", label: "Security Risk Mapping" },
      { value: "Defended", label: "Attack Surface" },
    ],
    outcomes: [
      "Protect enterprise ROI by preventing costly security breaches, prompt injections, and data exfiltration.",
      "Audit security copilot configurations to guarantee that generated commands are secure.",
      "Provide automated security trust reports for CISO signoff and compliance auditing.",
    ],
    features: [
      {
        icon: ShieldAlert,
        title: "Adversarial Testing",
        desc: "Attempt model jailbreaks, instruction bypasses, and unauthorized data exfiltration.",
      },
      {
        icon: Terminal,
        title: "Vulnerability Logic",
        desc: "Verify if the model can pinpoint secure code issues and recommend fixes accurately.",
      },
      {
        icon: Radar,
        title: "Threat Detection",
        desc: "Measure model accuracy in analyzing system logs and finding real threat vectors.",
      },
    ],
    workflow: [
      { step: "01", title: "Attack", desc: "Design security prompt injections and jailbreak attempts." },
      { step: "02", title: "Defend", desc: "Evaluate model resistance and guardrail enforcement." },
      { step: "03", title: "Log", desc: "Audit detection logs, credentials protection, and categorization accuracy." },
      { step: "04", title: "Harden", desc: "Produce recommendations for secure, trustworthy model operations." },
    ],
    featuredPackage: "AI Security",
  },
  reasoning: {
    eyebrow: "Who We Serve: Reasoning",
    title: "Validate multi-step decision intelligence for high-value operations.",
    accent: "reasoning",
    description: "Evaluate logic paths, causal inference, and consistency. OpenVals helps teams ensure that agentic workflows behave reliably, avoiding broken process paths and maximizing AI automation ROI.",
    icon: Radar,
    heroStats: [
      { value: "Multi-Step", label: "Reasoning Depth" },
      { value: "Consistent", label: "State tracking validation" },
      { value: "DRS Score", label: "Decision Confidence" },
    ],
    outcomes: [
      "Minimize logic failure rates in complex workflows, securing consistent operational outcomes.",
      "Expose reasoning loops and state tracking errors before they disrupt customer journeys.",
      "Deliver the Decision Reliability Score (DRS) to prove model reasoning trust to stakeholders.",
    ],
    features: [
      {
        icon: Radar,
        title: "Causal Inference",
        desc: "Benchmark logic models on cause-and-effect reasoning scenarios to avoid planning errors.",
      },
      {
        icon: Target,
        title: "Deduction Tracking",
        desc: "Verify multi-step logical reasoning accuracy and state consistency over time.",
      },
      {
        icon: ClipboardCheck,
        title: "Loop Identification",
        desc: "Detect circular reasoning paths or models getting stuck in logical loops to protect compute budget.",
      },
    ],
    workflow: [
      { step: "01", title: "Define", desc: "Load complex multi-step reasoning puzzles and operational scenarios." },
      { step: "02", title: "Run", desc: "Execute reasoning traces across your candidate models." },
      { step: "03", title: "Trace", desc: "Verify intermediate reasoning steps and conclusion paths." },
      { step: "04", title: "Score", desc: "Generate a Decision Reliability Score to prove model reasoning trust." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
  math: {
    eyebrow: "Who We Serve: Math",
    title: "Zero-tolerance calculation accuracy for trusted computations.",
    accent: "math",
    description: "Validate mathematical problem solving, algebra, calculus, and word-problem reasoning with zero-tolerance precision. OpenVals helps organizations ensure that engineering, research, and accounting models solve complex calculations accurately, maximizing computational ROI.",
    icon: Target,
    heroStats: [
      { value: "Zero Tolerance", label: "Calculation Precision" },
      { value: "Advanced", label: "Math & Logic Scope" },
      { value: "0.97+", label: "Mathematical Health" },
    ],
    outcomes: [
      "Eliminate arithmetic and symbolic math errors in critical quantitative applications.",
      "Save manual auditing costs by verifying step-by-step mathematical reasoning automatically.",
      "Certify model mathematical capability to guarantee system precision and mathematical trust.",
    ],
    features: [
      {
        icon: Target,
        title: "Symbolic Reasoning",
        desc: "Benchmark models on algebra, calculus, and symbolic mathematics.",
      },
      {
        icon: BarChart3,
        title: "Arithmetic Accuracy",
        desc: "Assert numeric accuracy and calculation logic across multi-digit math.",
      },
      {
        icon: ClipboardCheck,
        title: "Verification Path",
        desc: "Audit calculations at each step of the problem-solving process automatically.",
      },
    ],
    workflow: [
      { step: "01", title: "Load", desc: "Import math benchmark datasets ranging from basic to advanced." },
      { step: "02", title: "Process", desc: "Run problems and collect step-by-step arithmetic traces." },
      { step: "03", title: "Verify", desc: "Scan math calculations for numeric correctness and trace logic." },
      { step: "04", title: "Certify", desc: "Obtain a precision reliability report to deploy calculation models." },
    ],
    featuredPackage: "Enterprise AI Validation",
  },
  enterpriseOps: {
    eyebrow: "Who We Serve: Enterprise Ops",
    title: "Optimize operational planning and automate workflows with absolute trust.",
    accent: "ops",
    description: "Benchmark planning outputs, rule enforcement, and resource allocation. OpenVals helps enterprises automate scheduling, inventory logic, and workflow tasks with clear ROI and zero logic errors.",
    icon: BarChart3,
    heroStats: [
      { value: "ROI Driven", label: "Resource Optimization" },
      { value: "Compliant", label: "Enterprise Rule Checks" },
      { value: "Actionable", label: "Execution Reports" },
    ],
    outcomes: [
      "Deliver massive operational ROI by confidently automating manual resource allocation.",
      "Verify 100% adherence to complex business rules and enterprise policies.",
      "Certify multi-turn agentic workflows to orchestrate tasks without human oversight.",
    ],
    features: [
      {
        icon: BarChart3,
        title: "Process Optimization",
        desc: "Evaluate planning outputs for cost, latency, and resource usage efficiency.",
      },
      {
        icon: ClipboardCheck,
        title: "Business Logic",
        desc: "Verify adherence to company-specific policies and database constraints.",
      },
      {
        icon: Target,
        title: "Workflow Automation",
        desc: "Benchmark agent reliability in multi-step task execution plans to maximize ROI.",
      },
    ],
    workflow: [
      { step: "01", title: "Model", desc: "Define business logic rules and operations schemas." },
      { step: "02", title: "Simulate", desc: "Run planning simulations and operational audits." },
      { step: "03", title: "Validate", desc: "Verify decisions against scheduling, cost, and policy constraints." },
      { step: "04", title: "Deploy", desc: "Gain the confidence to automate enterprise workflows safely with ROI." },
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
      <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "flex-start", gap: "18px", minWidth: 0 }}>
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
        <div style={{ minWidth: 0, marginTop: "-6px" }}>
          <h3 style={{ margin: "0 0 8px", fontSize: compact ? "24px" : "32px", lineHeight: 1.15 }}>
            Research, books, media, and IEEE publications behind the trust layer.
          </h3>
          <Link href="/vishwanathakuthota" className={styles.textLink} style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            View founder profile <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
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

        {/* Media Logos Band */}
        <motion.div
          variants={FADE_UP}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "16px 8px 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* 3x2 Logos Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px 28px",
            alignItems: "center",
            justifyItems: "center",
            flexGrow: 1,
          }}>
            {/* Forbes */}
            <motion.div
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              style={{
                color: "var(--text-main)",
                fontFamily: "Georgia, serif",
                fontWeight: 900,
                fontSize: "17px",
                opacity: 0.85,
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
                userSelect: "none",
              }}
            >
              Forbes
            </motion.div>

            {/* TradeFlock */}
            <motion.img
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              src="/logos/tradeflock.webp"
              alt="TradeFlock"
              style={{
                maxHeight: "22px",
                maxWidth: "100px",
                objectFit: "contain",
                filter: "var(--logo-filter-standard)",
                mixBlendMode: "var(--logo-blend-mode)" as CSSProperties["mixBlendMode"],
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            />

            {/* Elets */}
            <motion.img
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              src="/logos/ehealth-300-98.png"
              alt="Elets Healthcare"
              style={{
                maxHeight: "26px",
                maxWidth: "100px",
                objectFit: "contain",
                filter: "var(--logo-filter-standard)",
                mixBlendMode: "var(--logo-blend-mode)" as CSSProperties["mixBlendMode"],
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            />

            {/* Blindwink */}
            <motion.img
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              src="/logos/blindwink.png"
              alt="Blindwink"
              style={{
                maxHeight: "100px",
                maxWidth: "150px",
                objectFit: "contain",
                filter: "var(--logo-filter-darkbg)",
                mixBlendMode: "var(--logo-blend-mode)" as CSSProperties["mixBlendMode"],
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            />

            {/* Pride India */}
            <motion.img
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              src="/logos/pride india awards.png"
              alt="Pride India Awards"
              style={{
                maxHeight: "50px",
                maxWidth: "120px",
                objectFit: "contain",
                filter: "var(--logo-filter-standard)",
                mixBlendMode: "var(--logo-blend-mode)" as CSSProperties["mixBlendMode"],
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            />

            {/* CConnects */}
            <motion.img
              whileHover={{ opacity: 0.95, scale: 1.05 }}
              src="/logos/cconnects.webp"
              alt="The CConnects"
              style={{
                maxHeight: "115px",
                maxWidth: "180px",
                objectFit: "contain",
                filter: "var(--logo-filter-standard)",
                mixBlendMode: "var(--logo-blend-mode)" as CSSProperties["mixBlendMode"],
                cursor: "default",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            />
          </div>

          {/* Show More Link */}
          <div style={{
            flexShrink: 0,
            borderLeft: "1px solid var(--border)",
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
          }}>
            <span
              style={{
                color: "var(--text-muted)",
                fontWeight: 700,
                fontSize: "14px",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              And more.....
            </span>
          </div>
        </motion.div>
      </div>
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
          const isAssessment = pkg.title === "Starter AI Risk Assessment";

          const cardContent = (
            <div
              className={styles.card}
              style={{
                padding: compact ? "20px" : "28px",
                borderRadius: "12px",
                background: featured ? "color-mix(in srgb, var(--accent) 10%, var(--card-bg))" : "var(--card-bg)",
                borderColor: featured ? "var(--accent)" : "var(--border)",
                height: "100%",
                cursor: isAssessment ? "pointer" : "default",
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
            </div>
          );

          if (isAssessment) {
            return (
              <motion.div
                key={pkg.title}
                variants={FADE_UP}
                style={{ height: "100%" }}
              >
                <Link href="/assessment" style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                  {cardContent}
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={pkg.title}
              variants={FADE_UP}
              style={{ height: "100%" }}
            >
              {cardContent}
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
