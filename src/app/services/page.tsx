"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Activity, Lock, FileBadge, Zap, Eye, Fingerprint, BookOpen, ArrowRight } from "lucide-react";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AmbientGrid from "../../components/AmbientGrid";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
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

const SERVICES = [
  {
    icon: ShieldAlert,
    title: "AI Red Teaming",
    desc: "Adversarial testing to uncover prompt injection, jailbreaks, and model vulnerabilities.",
    features: ["Prompt Injection Defense", "Jailbreak Simulation", "Data Extraction Mitigation"]
  },
  {
    icon: Activity,
    title: "Model Validation & Benchmarking",
    desc: "Rigorous evaluation of model performance, bias, and accuracy across diverse data sets.",
    features: ["Bias Detection", "Performance Stress Testing", "Dataset Drift Analysis"]
  },
  {
    icon: Lock,
    title: "AI Security & Threat Modeling",
    desc: "Securing data pipelines and API endpoints against model extraction and leakage.",
    features: ["API Security Audits", "Encrypted Inference", "Model Stealing Defense"]
  },
  {
    icon: FileBadge,
    title: "AI Compliance & Certification",
    desc: "Ensuring regulatory alignment with audit-ready validation reports.",
    features: ["GDPR/AI Act Compliance", "Audit Logging", "Trust Certification"]
  }
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "120px", position: "relative", overflow: "hidden" }}>
          <AmbientGrid />
          <div style={{ position: "absolute", top: 0, left: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }}></div>
          
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={STAGGER} 
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.h1 
                variants={FADE_UP} 
                style={{ fontSize: "clamp(48px, 8vw, 84px)", lineHeight: 1, marginBottom: "32px" }}
                className={styles.sectionTitleHighlighted}
              >
                Our <span style={{ color: "var(--accent)" }}>Services</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                OpenVals provides end-to-end validation, security, and assurance for enterprise AI systems. 
                We move beyond simple benchmarking to adversarial-first testing.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
              {SERVICES.map((service, i) => (
                <motion.div 
                  key={i} 
                  variants={FADE_UP} 
                  className={styles.card} 
                  style={{ padding: "48px", background: "var(--secondary-bg)", border: "1px solid var(--border)", position: "relative" }}
                >
                  <div style={{ color: "var(--accent)", marginBottom: "32px" }}>
                    <service.icon size={40} />
                  </div>
                  <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>{service.title}</h3>
                  <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "16px", lineHeight: "1.7" }}>{service.desc}</p>
                  
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
                    <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: "16px" }}>Capabilities</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {service.features.map((feature, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "var(--text-main)" }}>
                          <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              variants={STAGGER} 
              style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
            >
              <motion.h2 variants={FADE_UP} className={styles.sectionTitleHighlighted} style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "24px" }}>Ready to Validate?</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Get a comprehensive audit of your AI model&apos;s safety, security, and performance.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Get Your AI/ML Validated
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
