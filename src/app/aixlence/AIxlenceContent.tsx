"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Database,
  Activity,
  ShieldAlert,
  FileBadge2,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Target,
  Lightbulb,
  Workflow,
  Users,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./aixlence.module.css";
import AIxlenceWorkspaceTour, { type AIxlenceWorkspaceViewId } from "./AIxlenceWorkspaceTour";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
} as const;

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

/* ── Six Strategic Assessment Pillars (Exact titles & descriptions from assessment/page.tsx) ── */
const SIX_PILLARS = [
  {
    number: "01",
    title: "Strategy & Leadership",
    description: "Assess executive support, strategic alignment, and overall risk posture.",
    icon: Compass,
    color: "#2563eb",
    focusPoints: [
      "Documented AI strategic vision & roadmap",
      "Active executive sponsorship & funding oversight",
      "Business-aligned KPIs & ROI criteria",
      "Enterprise AI governance board & policies",
      "Proactive AI risk identification & appetite",
    ],
  },
  {
    number: "02",
    title: "Data Readiness",
    description: "Evaluate data governance, quality, security, and usage boundaries.",
    icon: Database,
    color: "#0284c7",
    focusPoints: [
      "Data ownership & stewardship across units",
      "Established data quality & cleansing standards",
      "Sensitive data classification (PII, IP, financial)",
      "Granular role-based access & egress controls",
      "Continuous data drift & pipeline monitoring",
    ],
  },
  {
    number: "03",
    title: "AI Model Validation",
    description: "Verify model evaluation methods, drift checking, and output benchmarking.",
    icon: Activity,
    color: "#7c3aed",
    focusPoints: [
      "Pre-deployment multi-model benchmarking",
      "Business-aligned accuracy & recall metrics",
      "Automated hallucination & bias detection",
      "Human-in-the-loop validation checkpoints",
      "Adversarial real-world scenario stress tests",
    ],
  },
  {
    number: "04",
    title: "AI Security",
    description: "Measure protection against injection attacks, data leaks, and model exploits.",
    icon: ShieldAlert,
    color: "#dc2626",
    focusPoints: [
      "Prompt injection & jailbreak vulnerability testing",
      "Automated adversarial red teaming exercises",
      "Model inversion & training data leak defenses",
      "Secured API gateway & endpoint boundary controls",
      "24/7 continuous AI security event telemetry",
    ],
  },
  {
    number: "05",
    title: "Compliance & Governance",
    description: "Review audit readiness, documentation, and regulatory compliance paths.",
    icon: FileBadge2,
    color: "#d97706",
    focusPoints: [
      "Comprehensive AI usage & acceptable access policies",
      "Verifiable auditability of automated decisions",
      "Structured model cards & algorithmic lineage docs",
      "Regulatory alignment (EU AI Act, NIST AI RMF, ISO 42001)",
      "Periodic external and internal governance audits",
    ],
  },
  {
    number: "06",
    title: "Operations & Monitoring",
    description: "Check live model tracking, logging, rollbacks, and incident handling.",
    icon: Gauge,
    color: "#059669",
    focusPoints: [
      "Continuous model drift & concept decay detection",
      "Production latency, token cost & throughput telemetry",
      "Automated fallback & instantaneous rollback procedures",
      "Centralized AI incident reporting & post-mortems",
      "Recurring algorithmic risk reassessments",
    ],
  },
];

/* ── Five Capability Maturity Levels (From AIxLence Framework) ── */
const MATURITY_LEVELS = [
  {
    level: 1,
    name: "Absent",
    badgeColor: "#ef4444",
    bgTint: "rgba(239, 68, 68, 0.08)",
    borderColor: "rgba(239, 68, 68, 0.25)",
    def: "No repeatable capability exists.",
    meaning:
      "No formal policies, tooling, or assigned ownership. AI experiments exist only as unvetted shadow scripts or individual curiosity, exposing the enterprise to severe cyber, legal, and hallucination liabilities.",
  },
  {
    level: 2,
    name: "Reactive",
    badgeColor: "#f97316",
    bgTint: "rgba(249, 115, 22, 0.08)",
    borderColor: "rgba(249, 115, 22, 0.25)",
    def: "Ad hoc, informal, manual efforts.",
    meaning:
      "Teams scramble to patch model hallucinations, prompt leaks, or data quality flaws only after production outages occur. Reliant on individual heroics, unversioned prompts, and fragile spreadsheets.",
  },
  {
    level: 3,
    name: "Defined",
    badgeColor: "#f59e0b",
    bgTint: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.25)",
    def: "Documented and repeatable in primary teams.",
    meaning:
      "Standard operating procedures, assigned roles, and standard evaluation tooling are operational in pilot business units. Capable in departmental sandboxes but lacks enterprise-wide enforcement.",
  },
  {
    level: 4,
    name: "Managed",
    badgeColor: "#2563eb",
    bgTint: "rgba(37, 99, 235, 0.08)",
    borderColor: "rgba(37, 99, 235, 0.25)",
    def: "Measured, governed, operationalized across the enterprise.",
    meaning:
      "Automated evaluation gates, cross-functional compliance enforcement, SLA monitoring, and regular governance cadences. AI initiatives achieve high velocity with predictable business outcomes.",
  },
  {
    level: 5,
    name: "Optimized",
    badgeColor: "#10b981",
    bgTint: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.25)",
    def: "Continuously improved and self-healing.",
    meaning:
      "Continuous automated multi-model benchmarking, autonomous adversarial red teaming, real-time drift adaptation, and verifiable audit compliance that turns AI into an enduring competitive moat.",
  },
];

/* ── 6-Step Visual Workflow ── */
const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Organisation Profile",
    icon: BuildingIcon,
    desc: "Baseline your industry vertical, existing infrastructure, model tiers (open source, APIs, fine-tuned LLMs), data sensitivity tiers, and target deployment scale.",
    deliverable: "Calibrated Industry Diagnostic Baseline",
  },
  {
    step: 2,
    title: "Diagnostic Assessment",
    icon: Target,
    desc: "Execute a structured diagnostic across 6 strategic pillars and 30+ empirical capability statements with transparent, evidence-based maturity scoring.",
    deliverable: "Evidence-Validated Audit Register",
  },
  {
    step: 3,
    title: "Capability Maturity Scorecard",
    icon: BarChart3,
    desc: "Synthesize assessment responses into a normalized 0–100 maturity rating across all dimensions, revealing hidden bottlenecks and asymmetric risk exposures.",
    deliverable: "6-Axis Radar Spider & Gap Matrix",
  },
  {
    step: 4,
    title: "Enterprise Transformation Roadmap",
    icon: Workflow,
    desc: "Convert detected deficits into a prioritized, chronological execution backlog across 0–30 days, 31–90 days, and 3–6 months.",
    deliverable: "Chronological Transformation Backlog",
  },
  {
    step: 5,
    title: "Investment & Value Simulator",
    icon: TrendingUp,
    desc: "Model risk-adjusted ROI using the proprietary P(Value) value realization curve to compute actual net returns and capital efficiency multiples.",
    deliverable: "Risk-Adjusted Financial Forecast",
  },
  {
    step: 6,
    title: "Executive Dashboard & Service Mapping",
    icon: Layers,
    desc: "Generate board-ready executive summaries and map identified capability gaps directly to targeted accelerators (OpenVals, OpenLxM, RedShield, AI CoE).",
    deliverable: "Board Deck & Targeted Solutions Map",
  },
];

/* ── Business Value Dimensions ── */
const BUSINESS_VALUES = [
  {
    title: "Identify High-Impact AI Opportunities",
    icon: Lightbulb,
    desc: "Filter through vendor hype and internal speculation to pinpoint AI workflows with the highest strategic feasibility, user adoption potential, and capital return.",
  },
  {
    title: "Improve Enterprise Readiness",
    icon: ShieldCheck,
    desc: "Systematically eliminate hidden infrastructure, data architecture, and team skill bottlenecks before committing millions to production model deployment.",
  },
  {
    title: "Reduce Implementation & Security Risks",
    icon: ShieldAlert,
    desc: "Shield the enterprise from prompt injection exploits, confidential data egress, brand-damaging hallucinations, and regulatory fines under the EU AI Act.",
  },
  {
    title: "Prioritise High-Yield Investments",
    icon: TrendingUp,
    desc: "Eliminate duplicate shadow tooling and fragmented departmental software spend by focusing capital strictly where measurable maturity gaps exist.",
  },
  {
    title: "Measure Concrete Business Outcomes",
    icon: Gauge,
    desc: "Transition AI initiatives from qualitative 'vibes' to deterministic metrics, DRS reliability scores, and verifiable top-line efficiency gains.",
  },
];

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}

export default function AIxlenceContent() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeWorkspace, setActiveWorkspace] = useState<AIxlenceWorkspaceViewId>("assessment");
  const pillar = SIX_PILLARS[activePillar];
  const PillarIcon = pillar.icon;

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        {/* ── 1. HERO SECTION ── */}
        <section className={styles.heroSection}>
          <div className={`${styles.container} ${styles.heroSplit}`}>
            <motion.div initial="hidden" animate="show" variants={STAGGER} className={styles.heroContent}>
              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                From AI Ambition to <br />
                Enterprise Intelligence.
              </motion.h1>

              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleStrong}>
                  Assess AI maturity, identify capability gaps, prioritise high-impact opportunities, and build measurable AI transformation roadmaps.
                </span>{" "}
                AIxLence bridges the divide between executive vision and algorithmic reality with battle-tested frameworks,
                empirical diagnostic scoring, and quantifiable ROI.
              </motion.p>

              <motion.div variants={FADE_UP} className={styles.heroActions}>
                <Link href="/assessment" className={styles.primaryBtn}>
                  <span>Start Diagnostic Assessment</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/book-a-demo" className={styles.secondaryBtn}>
                  <Calendar size={17} />
                  <span>Book Executive Walkthrough</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className={styles.heroPreviewWrap}
            >
              <AIxlenceWorkspaceTour activeId={activeWorkspace} onSelect={setActiveWorkspace} />
            </motion.div>
          </div>
        </section>

        {/* ── 2. WHAT IS AIxLENCE? ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="overview">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                What is AIxLence?
              </h2>
              <p className={styles.sectionDesc}>
                An enterprise-grade diagnostic and advisory framework designed to eliminate guesswork,
                safeguard capital, and accelerate trustworthy AI transformation across complex organizations.
              </p>
            </div>

            <div className={styles.whatOverviewGrid}>
              <div className={styles.whatMainBox}>
                <p className={styles.whatParagraph}>
                  <strong>AIxLence</strong> is an objective, evidence-based diagnostic platform that helps business and
                  technology leaders assess their organization&apos;s true AI maturity. It identifies structural capability deficits,
                  prioritizes high-value use cases, and generates board-ready roadmaps calibrated for measurable return on capital.
                </p>
                <div className={styles.whatHighlightQuote}>
                  &ldquo;Most enterprise AI initiatives fail not because the foundation models lack intelligence,
                  but because the enterprise lacks the data governance, security guardrails, and validation architecture
                  required to operationalize them safely.&rdquo;
                </div>
                <p className={styles.whatParagraph}>
                  Rather than forcing organizations into generic maturity questionnaires, AIxLence evaluates 30+ empirical
                  capability statements against verified operational evidence—enabling C-suite executives to make informed,
                  de-risked AI adoption decisions.
                </p>
              </div>

              <aside className={styles.whatAudienceAside}>
                <div className={styles.whatAudienceTitle}>
                  <Users size={18} color="#2563eb" />
                  <span>Engineered For Enterprise Leaders</span>
                </div>
                <div className={styles.whatAudienceList}>
                  {[
                    "Chief Information & Technology Officers (CIOs & CTOs)",
                    "Chief AI Officers (CAIOs) & Enterprise AI Architects",
                    "Heads of Digital Strategy & Innovation Centers of Excellence (CoE)",
                    "Enterprise Risk, Security & Compliance Officers (CISOs & CROs)",
                    "Line-of-Business Leaders launching customer-facing AI agents",
                  ].map((role, idx) => (
                    <div key={idx} className={styles.whatAudienceItem}>
                      <CheckCircle2 size={16} className={styles.whatAudienceIcon} />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className={styles.challengesHeader}>
              <h3 className={styles.challengesTitle}>Four Structural AI Challenges AIxLence Solves</h3>
            </div>
            <ol className={styles.challengeStream}>
              {[
                {
                  idx: "01",
                  title: "Shadow AI & Fragmented Tooling",
                  desc: "Individual business units deploying unvetted LLM endpoints and unmonitored shadow tools without central data security, access control, or egress oversight.",
                },
                {
                  idx: "02",
                  title: "Proof-of-Concept Pilot Paralysis",
                  desc: "Dozens of promising generative AI prototypes stuck in development limbo because teams lack clear production validation gates and accuracy criteria.",
                },
                {
                  idx: "03",
                  title: "Regulatory & Compliance Exposure",
                  desc: "Sudden legal liabilities arising from the EU AI Act, NIST AI RMF, and ISO 42001, requiring auditable decision traces and model risk cards.",
                },
                {
                  idx: "04",
                  title: "Capital Wastage & ROI Opacity",
                  desc: "Allocating substantial CapEx to AI initiatives without knowing which workflows will actually capture economic value versus burning compute on rework.",
                },
              ].map((c) => (
                <li key={c.idx} className={styles.challengeStreamItem}>
                  <span className={styles.challengeStreamMarker} aria-hidden>
                    {c.idx}
                  </span>
                  <div className={styles.challengeStreamBody}>
                    <h4 className={styles.challengeStreamTitle}>{c.title}</h4>
                    <p className={styles.challengeStreamText}>{c.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 3. HOW IT WORKS (6-Step Workflow) ── */}
        <section className={styles.section} id="how-it-works">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                How AIxLence Works
              </h2>
              <p className={styles.sectionDesc}>
                A structured, repeatable six-phase diagnostic journey that converts executive ambition into a board-ready,
                measurable transformation roadmap.
              </p>
            </div>

            <div className={styles.workflowPipeline} role="list">
              {WORKFLOW_STEPS.map((w, index) => {
                const IconComponent = w.icon;
                const isLast = index === WORKFLOW_STEPS.length - 1;
                return (
                  <div
                    key={w.step}
                    role="listitem"
                    className={styles.workflowStation}
                    data-last={isLast ? "" : undefined}
                  >
                    <div className={styles.workflowStationRail}>
                      <span className={styles.workflowStationDot}>
                        <IconComponent size={18} />
                      </span>
                      {!isLast ? <span className={styles.workflowStationConnector} aria-hidden /> : null}
                    </div>
                    <div className={styles.workflowStationContent}>
                      <span className={styles.workflowStationPhase}>Phase {w.step}</span>
                      <h3 className={styles.workflowStepTitle}>{w.title}</h3>
                      <p className={styles.workflowStepDesc}>{w.desc}</p>
                      <p className={styles.workflowDeliverableInline}>
                        <span className={styles.workflowDeliverableLabel}>Deliverable</span>
                        {w.deliverable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. SIX STRATEGIC PILLARS ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="pillars">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Six Strategic Pillars
              </h2>
              <p className={styles.sectionDesc}>
                The AIxLence diagnostic investigates every enterprise AI deployment across six battle-tested architectural pillars.
                Nothing is left to subjective assumptions.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={FADE_UP}
              className={styles.pillarsSplit}
            >
                <div className={styles.pillarNav} role="tablist" aria-label="Strategic pillars">
                  {SIX_PILLARS.map((p, index) => {
                    const NavIcon = p.icon;
                    const selected = activePillar === index;
                    return (
                      <button
                        key={p.number}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        className={styles.pillarNavItem}
                        data-active={selected ? "" : undefined}
                        onClick={() => setActivePillar(index)}
                      >
                        <NavIcon size={18} />
                        <span className={styles.pillarNavLabel}>
                          <span className={styles.pillarNavIndex}>{p.number}</span>
                          {p.title}
                        </span>
                        <ChevronRight size={16} className={styles.pillarNavChevron} />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.pillarStage} role="tabpanel">
                  <div className={styles.pillarStageHeader}>
                    <div className={styles.pillarIconBox6}>
                      <PillarIcon size={24} />
                    </div>
                    <div>
                      <span className={styles.pillarNumberPill}>Pillar {pillar.number}</span>
                      <h3 className={styles.pillarTitle6}>{pillar.title}</h3>
                    </div>
                  </div>
                  <p className={styles.pillarExactDesc}>{pillar.description}</p>
                  <ul className={styles.pillarFocusList}>
                    {pillar.focusPoints.map((item, idx) => (
                      <li key={idx} className={styles.pillarFocusItem}>
                        <CheckCircle2 size={14} className={styles.pillarFocusCheck} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
          </div>
        </section>

        {/* ── 5. CAPABILITY MATURITY MODEL (5 Levels) ── */}
        <section className={styles.section} id="maturity-model">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Capability Maturity Model
              </h2>
              <p className={styles.sectionDesc}>
                Every capability statement is benchmarked against five deterministic evidence levels.
                We evaluate actual institutional mechanisms—not intentions or innovation lab prototypes.
              </p>
            </div>

            <div className={styles.maturityAscent} role="list">
              {MATURITY_LEVELS.map((m) => (
                <article
                  key={m.level}
                  role="listitem"
                  className={styles.maturityRung}
                  style={
                    {
                      "--maturity-color": m.badgeColor,
                      "--maturity-tint": m.bgTint,
                      "--maturity-step": m.level,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.maturityRungBar} aria-hidden />
                  <div className={styles.maturityRungBody}>
                    <header className={styles.maturityRungHead}>
                      <span className={styles.maturityLevelPill} style={{ background: m.bgTint, color: m.badgeColor }}>
                        Level {m.level}
                      </span>
                      <h3 className={styles.maturityLevelName}>{m.name}</h3>
                    </header>
                    <p className={styles.maturityLevelDef} style={{ color: m.badgeColor }}>
                      &ldquo;{m.def}&rdquo;
                    </p>
                    <p className={styles.maturityLevelMeaningText}>
                      <span className={styles.maturityLevelMeaningLabel}>Organizational reality — </span>
                      {m.meaning}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. BUSINESS VALUE ── */}
        <section className={styles.section} id="business-value">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Measurable Business Value
              </h2>
              <p className={styles.sectionDesc}>
                How AIxLence transforms unpredictable AI experiments into measurable enterprise value,
                drastically reducing risk while maximizing capital return.
              </p>
            </div>

            <ul className={styles.valueManifest}>
              {BUSINESS_VALUES.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <li key={val.title} className={styles.valueManifestRow}>
                    <span className={styles.valueManifestIndex}>{String(idx + 1).padStart(2, "0")}</span>
                    <div className={styles.valueManifestIcon} aria-hidden>
                      <IconComponent size={20} />
                    </div>
                    <div className={styles.valueManifestCopy}>
                      <h3 className={styles.valueTitle}>{val.title}</h3>
                      <p className={styles.valueText}>{val.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── 8. FINAL CTA ── */}
        <section className={styles.finalCtaSection}>
          <div className={styles.container}>
            <div className={styles.finalCtaCard}>
              <h2 className={styles.finalCtaTitle}>
                Ready to Transform Your Enterprise with AI?
              </h2>
              <p className={styles.finalCtaDesc}>
                Take the confidential AIxLence diagnostic assessment now to receive your organization&apos;s
                capability maturity scorecard, risk analysis, and tailored 90-day transformation roadmap.
              </p>

              <div className={styles.finalCtaActions}>
                <Link href="/assessment" className={styles.primaryBtn}>
                  <span>Start Diagnostic Assessment</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/book-a-demo" className={styles.secondaryBtn}>
                  <Calendar size={17} />
                  <span>Schedule Executive Briefing</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

