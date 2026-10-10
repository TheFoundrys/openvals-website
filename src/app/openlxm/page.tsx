"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  ShieldCheck,
  Cpu,
  Lock,
  Zap,
  CheckCircle2,
  Layers
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./openlxm.module.css";

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

export default function OpenLxMPage() {
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
                <Zap size={16} /> OpenLxM™ Sovereign AI Engine
              </motion.div>

              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Build &amp; Deploy. <br />
                <span className={styles.heroGradientText}>Private, Sovereign AI with Enterprise Control.</span>
              </motion.h1>

              {/* Exact user requested statement prominently showcased */}
              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleStrong}>
                  Engineer and deploy scalable, private, sovereign AI solutions with enterprise-grade control.
                </span>{" "}
                OpenLxM gives regulated organizations total custody over their models, weights, data pipelines,
                and inference infrastructure—free from third-party vendor lock-in or public API leakage.
              </motion.p>

              <motion.div variants={FADE_UP} className={styles.heroActions}>
                <a href="#capabilities" className={styles.secondaryBtn}>
                  <Server size={18} /> Explore Core Capabilities
                </a>
              </motion.div>

              {/* Sovereign Performance Metric Strip */}
              <motion.div variants={FADE_UP} className={styles.statStrip}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>100%</div>
                  <div className={styles.statLabel}>Data Sovereignty &amp; Zero Public Egress</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>&lt;15ms</div>
                  <div className={styles.statLabel}>Time-to-First-Token Ultra-Low Latency</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>70%+</div>
                  <div className={styles.statLabel}>TCO Savings vs Commercial Cloud APIs</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>Air-Gap</div>
                  <div className={styles.statLabel}>Ready for Defense, Banking &amp; Health</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4 CORE CAPABILITIES SECTION */}
        <section className={styles.section} id="capabilities">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                <Server size={14} /> Core Architectural Pillars
              </div>
              <h2 className={styles.sectionTitle}>
                Complete Enterprise Custody Across the Entire AI Stack
              </h2>
              <p className={styles.sectionDesc}>
                Move beyond external black-box APIs. OpenLxM equips engineering teams to build, fine-tune, and deploy
                state-of-the-art models within strictly governed corporate environments.
              </p>
            </div>

            <div className={styles.capabilitiesGrid}>
              {/* Capability 1 */}
              <div className={styles.capabilityCard}>
                <div className={styles.capIconBox}>
                  <Lock size={28} />
                </div>
                <h3 className={styles.capTitle}>1. Private &amp; Sovereign Execution</h3>
                <p className={styles.capDesc}>
                  Deploy foundation models within your isolated VPC or physical on-prem datacenter. Zero third-party telemetry,
                  zero external logging, and guaranteed geographic data residency.
                </p>
                <div className={styles.capFeaturesList}>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Air-gapped and offline installation support</span>
                  </div>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Cryptographic boundary isolation</span>
                  </div>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Zero training on your proprietary enterprise data</span>
                  </div>
                </div>
              </div>

              {/* Capability 2 */}
              <div className={styles.capabilityCard}>
                <div className={styles.capIconBox}>
                  <Cpu size={28} />
                </div>
                <h3 className={styles.capTitle}>2. High-Throughput Scalable Inference</h3>
                <p className={styles.capDesc}>
                  Engineered with state-of-the-art serving runtimes (vLLM, TensorRT-LLM, Triton). Maximize tokens per second
                  per watt while cutting infrastructure GPU footprint in half.
                </p>
                <div className={styles.capFeaturesList}>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>PagedAttention with continuous request batching</span>
                  </div>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Sub-millisecond token generation latencies</span>
                  </div>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Auto-scaling inference swarms on Kubernetes</span>
                  </div>
                </div>
              </div>

              {/* Capability 3 */}
              <div className={styles.capabilityCard}>
                <div className={styles.capIconBox}>
                  <Layers size={28} />
                </div>
                <h3 className={styles.capTitle}>3. Domain Adaptation &amp; Quantization</h3>
                <p className={styles.capDesc}>
                  Infuse models with internal enterprise intelligence. Fine-tune parameters on proprietary data and compress
                  checkpoints via precision quantization without accuracy degradation.
                </p>
                <div className={styles.capFeaturesList}>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>LoRA, QLoRA, and DPO alignment pipelines</span>
                  </div>
                  <div className={styles.capFeaturesList}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>FP8, AWQ, and INT4 weight compression</span>
                  </div>
                  <div className={styles.capFeaturesList}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Deterministic structured output &amp; grammar enforcement</span>
                  </div>
                </div>
              </div>

              {/* Capability 4 */}
              <div className={styles.capabilityCard}>
                <div className={styles.capIconBox}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className={styles.capTitle}>4. Enterprise Governance &amp; Control</h3>
                <p className={styles.capDesc}>
                  Enforce strict access controls, semantic guardrails, and cryptographic auditability across all model
                  interactions, satisfying international compliance and board oversight.
                </p>
                <div className={styles.capFeaturesList}>
                  <div className={styles.capFeatureItem}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Role-based access control (RBAC) &amp; mTLS endpoints</span>
                  </div>
                  <div className={styles.capFeaturesList}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Pre-execution prompt firewalls &amp; PII redaction</span>
                  </div>
                  <div className={styles.capFeaturesList}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Tamper-evident audit logging and token billing tracking</span>
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
