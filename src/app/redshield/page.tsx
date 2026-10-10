"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  Bug,
  Crosshair,
  CheckCircle2,
  Radar
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./redshield.module.css";

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

export default function RedShieldPage() {
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
                <ShieldAlert size={16} /> RedShield™ Adversarial AI Defense
              </motion.div>

              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Attack &amp; Defend. <br />
                <span className={styles.heroGradientText}>Secure Enterprise AI Against Adversarial Threats.</span>
              </motion.h1>

              {/* Exact user requested statement prominently showcased */}
              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleStrong}>
                  Secure enterprise AI through adversarial testing, AI red teaming, vulnerability assessment, and proactive defense.
                </span>{" "}
                RedShield exposes systemic model vulnerabilities before malicious actors can exploit them—fortifying your AI pipelines
                with battle-tested defenses and deterministic runtime guardrails.
              </motion.p>

              <motion.div variants={FADE_UP} className={styles.heroActions}>
                <a href="#capabilities" className={styles.secondaryBtn}>
                  <ShieldAlert size={18} /> Explore Defense Capabilities
                </a>
              </motion.div>

              {/* Security Performance Metric Strip */}
              <motion.div variants={FADE_UP} className={styles.statStrip}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>50,000+</div>
                  <div className={styles.statLabel}>Automated Adversarial Attack Payloads</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>100%</div>
                  <div className={styles.statLabel}>OWASP Top 10 for LLMs Vulnerability Coverage</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>&lt;1ms</div>
                  <div className={styles.statLabel}>Sub-Millisecond Inline Guardrail Latency</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Unmitigated Critical Jailbreaks in Production</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4 CORE DEFENSE PILLARS SECTION */}
        <section className={styles.section} id="capabilities">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                <Radar size={14} /> Comprehensive Defense Framework
              </div>
              <h2 className={styles.sectionTitle}>
                Four Pillars of Adversarial AI Protection
              </h2>
              <p className={styles.sectionDesc}>
                Enterprise AI attacks bypass standard firewalls by attacking semantic logic directly. RedShield combines automated
                adversarial testing, human red teaming, vulnerability audits, and runtime defense to ensure impenetrable protection.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              {/* Pillar 1 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <Flame size={28} />
                </div>
                <h3 className={styles.pillarTitle}>1. Adversarial AI Testing</h3>
                <p className={styles.pillarDesc}>
                  Continuous automated fuzzing subjecting models to thousands of adversarial permutations: prompt suffix injection,
                  token perturbations, multilingual jailbreaks, and multimodal payload exploits.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Automated gradient and black-box payload generation</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Cross-lingual and token-encoding jailbreak simulations</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Deterministic stress testing against safety guardrails</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <Crosshair size={28} />
                </div>
                <h3 className={styles.pillarTitle}>2. Expert AI Red Teaming</h3>
                <p className={styles.pillarDesc}>
                  Human-led ethical hacking engagements conducted by world-class cybersecurity researchers probing complex cognitive
                  traps, agentic tool privilege escalation, and business logic bypasses.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Multi-turn social engineering &amp; cognitive deception probes</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Autonomous agent tool hijacking and unauthorized API access</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Targeted executive impersonation and compliance bypass audits</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <Bug size={28} />
                </div>
                <h3 className={styles.pillarTitle}>3. Vulnerability Assessment</h3>
                <p className={styles.pillarDesc}>
                  Rigorous audits of entire AI data and inference pipelines. Uncover training data poisoning, PII extraction vectors,
                  vector database contamination, and model weight extraction vulnerabilities.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Full mapping against OWASP LLM and MITRE ATLAS matrices</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Training data poisoning and backdoor trigger scans</span>
                  </div>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Membership inference and model inversion risk quantification</span>
                  </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className={styles.pillarCard}>
                <div className={styles.pillarIconBox}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className={styles.pillarTitle}>4. Proactive Real-Time Defense</h3>
                <p className={styles.pillarDesc}>
                  Hardware-accelerated inline guardrails deployed directly in front of your model endpoints. Intercept and neutralize
                  malicious queries, PII leakage, and adversarial injections in real time.
                </p>
                <div className={styles.pillarFeaturesList}>
                  <div className={styles.pillarFeatureItem}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Sub-millisecond semantic prompt firewall inspection</span>
                  </div>
                  <div className={styles.pillarFeaturesList}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Dynamic output verification and confidential PII redaction</span>
                  </div>
                  <div className={styles.pillarFeaturesList}>
                    <CheckCircle2 size={16} color="#dc2626" />
                    <span>Automated anomaly alerting and adaptive threat rule updates</span>
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
