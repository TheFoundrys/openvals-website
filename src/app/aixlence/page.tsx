"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Target,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Workflow,
  Search
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./aixlence.module.css";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 45, damping: 15 } },
} as const;

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

export default function AIxLencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} />
          <div className={styles.container}>
            <motion.div initial="hidden" animate="show" variants={STAGGER} className={styles.heroContent}>
              <motion.div variants={FADE_UP} className={styles.badgePill}>
                <Sparkles size={16} /> AIxLence™ Enterprise AI Strategy
              </motion.div>

              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Assess &amp; Strategize. <br />
                <span className={styles.heroGradientText}>Unleash Enterprise AI Excellence.</span>
              </motion.h1>

              {/* Exact user requested statement prominently showcased */}
              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleStrong}>
                  Discover your enterprise AI maturity, identify opportunities, and build a measurable transformation roadmap.
                </span>{" "}
                AIxLence bridges the divide between executive ambition and algorithmic reality with battle-tested frameworks,
                adversarial validation, and quantifiable ROI.
              </motion.p>

              <motion.div variants={FADE_UP} className={styles.heroActions}>
                <a href="#pillars" className={styles.secondaryBtn}>
                  <Workflow size={18} /> View Strategic Pillars
                </a>
              </motion.div>

              {/* Enterprise Impact Metric Strip */}
              <motion.div variants={FADE_UP} className={styles.statStrip}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>5-Tier</div>
                  <div className={styles.statLabel}>Enterprise AI Maturity Diagnostic Framework</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>3.4x</div>
                  <div className={styles.statLabel}>Accelerated Time-to-Value for Production AI</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>100%</div>
                  <div className={styles.statLabel}>Audit-Ready Compliance &amp; Risk Governance</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Unvalidated Models Released to Production</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3 CORE PILLARS SECTION */}
        <section className={styles.section} id="pillars">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                <Target size={14} /> The AIxLence Methodology
              </div>
              <h2 className={styles.sectionTitle}>
                Three Strategic Pillars for Predictable AI Value
              </h2>
              <p className={styles.sectionDesc}>
                Enterprise AI projects routinely falter due to lack of clarity, unverified accuracy, and governance gaps.
                AIxLence provides the structured architecture required to transform experimental AI into an enduring competitive moat.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              {/* Pillar 1 */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>01</span>
                <div className={styles.pillarIconBox}>
                  <Compass size={28} />
                </div>
                <h3 className={styles.pillarTitle}>1. Discover Enterprise AI Maturity</h3>
                <p className={styles.pillarDesc}>
                  Map your organization&apos;s current capabilities across 6 critical dimensions: data readiness, model validation,
                  security posture, governance controls, team velocity, and business alignment.
                </p>
                <div className={styles.pillarList}>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>360° audit of shadow AI, unvetted APIs, and pipeline vulnerabilities</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Benchmarking against Fortune 500 industry peers</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Identification of critical architectural and compliance gaps</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>02</span>
                <div className={styles.pillarIconBox}>
                  <Lightbulb size={28} />
                </div>
                <h3 className={styles.pillarTitle}>2. Identify High-Value Opportunities</h3>
                <p className={styles.pillarDesc}>
                  Filter out superficial hype. Discover and prioritize enterprise use cases with the highest strategic impact,
                  technical feasibility, and clear return on capital investment.
                </p>
                <div className={styles.pillarList}>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Impact vs. Complexity 4-quadrant opportunity matrix</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Risk-adjusted cost-benefit analysis and labor velocity modeling</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Tailored blueprint for agentic, RAG, and fine-tuning architectures</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>03</span>
                <div className={styles.pillarIconBox}>
                  <Workflow size={28} />
                </div>
                <h3 className={styles.pillarTitle}>3. Build a Measurable Roadmap</h3>
                <p className={styles.pillarDesc}>
                  Construct a phased, board-ready implementation blueprint with concrete milestones, deterministic verification gates,
                  and KPI dashboards that quantify real business outcomes.
                </p>
                <div className={styles.pillarList}>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Phased time-horizon execution plan (Weeks 1 to Month 12)</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Deterministic launch gates preventing unvalidated releases</span>
                  </div>
                  <div className={styles.pillarListItem}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Regulatory alignment with EU AI Act, NIST AI RMF &amp; ISO 42001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
