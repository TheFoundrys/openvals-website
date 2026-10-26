"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Activity,
  Gauge,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./openvals.module.css";

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

export default function OpenValsSolutionPage() {
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
                <Sparkles size={16} /> OpenVals™ Evidence-Based AI Validation
              </motion.div>

              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Evaluate &amp; Validate. <br />
                <span className={styles.heroGradientText}>Evidence-Based AI Validation at Scale.</span>
              </motion.h1>

              {/* Exact user-requested statement prominently showcased */}
              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleStrong}>
                  Continuously measure AI accuracy, reliability, performance, safety, and trust through evidence-based validation.
                </span>{" "}
                OpenVals delivers an automated, enterprise-grade verification engine that stress-tests foundation models,
                guards against silent regression, and generates reproducible compliance evidence before and during production.
              </motion.p>

              {/* Stats Bar */}
              <motion.div variants={FADE_UP} className={styles.statsBar}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>2 Lakhs+</span>
                  <span className={styles.statLabel}>Experiments Executed</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>150+</span>
                  <span className={styles.statLabel}>Validated Models</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>20+</span>
                  <span className={styles.statLabel}>Core Metrics</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>53</span>
                  <span className={styles.statLabel}>LLM Providers</span>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* 5 CORE PILLARS SECTION */}
        <section className={styles.section} id="pillars">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                <Layers size={14} /> Comprehensive Evaluation Engine
              </div>
              <h2 className={styles.sectionTitle}>
                Five Pillars of Evidence-Based AI Validation
              </h2>
              <p className={styles.sectionDesc}>
                Production AI requires more than standard benchmark scores. OpenVals continuously tests, tracks, and
                validates models across five essential operational dimensions to ensure zero surprises in production.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              {/* Pillar 1: Accuracy */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>01</span>
                <div className={styles.pillarIconBox}>
                  <Target size={28} />
                </div>
                <h3 className={styles.pillarTitle}>1. Continuous AI Accuracy</h3>
                <p className={styles.pillarDesc}>
                  Measure factual precision, hallucination propensity, and domain correctness across complex workflows,
                  retrieval-augmented generation (RAG) contexts, and multi-step reasoning.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Real-time semantic hallucination detection &amp; citation grounding</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Domain-specific precision evaluation across finance, software, and health</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Context-window needle recall and extraction fidelity tests</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Reliability */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>02</span>
                <div className={styles.pillarIconBox}>
                  <Activity size={28} />
                </div>
                <h3 className={styles.pillarTitle}>2. Deterministic Reliability</h3>
                <p className={styles.pillarDesc}>
                  Track behavioral drift, monitor response stability across versions, and enforce strict release gates
                  so model updates never break customer-facing production workflows.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Behavioral drift monitoring with automated threshold regression alerts</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Deterministic output verification with JSON schema &amp; grammar enforcement</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Multi-turn agentic stability and tool invocation consistency</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Performance */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>03</span>
                <div className={styles.pillarIconBox}>
                  <Gauge size={28} />
                </div>
                <h3 className={styles.pillarTitle}>3. Latency &amp; Performance</h3>
                <p className={styles.pillarDesc}>
                  Benchmark token latency, throughput saturation, and inference efficiency across edge, cloud,
                  and private GPU infrastructure to uphold strict production SLAs.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Time-to-First-Token (TTFT) and generation throughput profiling</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>High-concurrency load and queue saturation stress testing</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Hardware cost-per-token and energy efficiency comparisons</span>
                  </div>
                </div>
              </div>

              {/* Pillar 4: Safety */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>04</span>
                <div className={styles.pillarIconBox}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className={styles.pillarTitle}>4. Frontier AI Safety</h3>
                <p className={styles.pillarDesc}>
                  Expose adversarial vulnerabilities with automated prompt injection probes, jailbreak fuzzing,
                  toxicity detection, and sensitive enterprise data leakage defenses.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Automated red teaming across OWASP GenAI Top 10 threat vectors</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Multilingual prompt injection and recursive token perturbation fuzzing</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>PII redaction validation and confidential data exfiltration prevention</span>
                  </div>
                </div>
              </div>

              {/* Pillar 5: Trust & Evidence */}
              <div className={styles.pillarCard}>
                <span className={styles.pillarCardBadge}>05</span>
                <div className={styles.pillarIconBox}>
                  <FileCheck2 size={28} />
                </div>
                <h3 className={styles.pillarTitle}>5. Evidence-Based Trust</h3>
                <p className={styles.pillarDesc}>
                  Transform algorithmic verification into cryptographic evidence. Generate Decision Reliability
                  Scorecards (DRS) and audit packs ready for enterprise risk teams and regulators.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Tamper-evident verification certificates with cryptographic hash tracking</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Automated compliance evidence packs for EU AI Act, NIST AI RMF &amp; ISO 42001</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#2563eb" />
                    <span>Decision Reliability Score (DRS) index comparing leading open &amp; frontier models</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Ready to Validate Your AI Before Production?</h2>
              <p className={styles.ctaSubtitle}>
                Run your first automated validation suite in minutes. Deploy enterprise AI with quantifiable evidence,
                continuous monitoring, and complete regulatory assurance.
              </p>
              <div className={styles.ctaActions}>
                <Link
                  href="https://dev.openvalidations.com/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  Start Validating Free <ArrowRight size={16} />
                </Link>
                <Link
                  href="https://calendly.com/vishwanath-akuthota/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                >
                  Schedule a Technical Demo
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
