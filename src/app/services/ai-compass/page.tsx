"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Cpu,
  ArrowRight,
  BarChart3,
  Lock,
  FileCheck
} from "lucide-react";
import styles from "../../../components/ui.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AmbientGrid from "../../../components/AmbientGrid";
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
      staggerChildren: 0.15,
    },
  },
} as const;

const QUADRANTS = [
  {
    title: "AI Engineering",
    subtitle: "Applied AI",
    icon: Cpu,
    color: "#3b82f6",
    desc: "Transforming research into production-grade AI systems with robust architectures.",
    link: "/services/ai-engineering-analytics",
    tease: ["AI Research (ML/DL/GenAI)", "Enterprise AI Development", "Model Orchestration"]
  },
  {
    title: "AI Analytics",
    subtitle: "Applied Data Science",
    icon: BarChart3,
    color: "#f43f5e",
    desc: "Unlocking actionable insights through predictive, perspective, and diagnostic analytics.",
    link: "/services/ai-engineering-analytics",
    tease: ["Predictive & Perspective Analytics", "Diagnostic & Descriptive Analytics", "Data Visualization"]
  },
  {
    title: "AI Assurance",
    subtitle: "Governance & Security",
    icon: Lock,
    color: "#f59e0b",
    desc: "Protecting models and data while ensuring compliance with global AI regulations.",
    link: "/services/ai-assurance-data",
    tease: ["AI Security Operations", "Risk Management", "Responsible & Trustworthy AI"]
  },
  {
    title: "AI Quality",
    subtitle: "Testing & Validation",
    icon: FileCheck,
    color: "#991b1b",
    desc: "Rigorous evaluation and benchmarking to guarantee model performance and robustness.",
    link: "/services/ai-assurance-data",
    tease: ["Automated Test Generation", "Robustness & Performance", "Explainability & Interpretability"]
  }
];

export default function AICompassPage() {
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
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              {/* <motion.div 
                variants={FADE_UP}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  padding: "8px 20px", 
                  background: "rgba(0, 212, 255, 0.1)", 
                  borderRadius: "100px",
                  color: "var(--accent)",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "24px",
                  border: "1px solid rgba(0, 212, 255, 0.2)"
                }}
              >
                <Compass size={18} />
                THE AI SUCCESS FRAMEWORK
              </motion.div> */}
              <motion.h1
                variants={FADE_UP}
                style={{ fontSize: "clamp(48px, 8vw, 84px)", lineHeight: 1, marginBottom: "32px" }}
              >
                AI <span style={{ color: "var(--accent)" }}>Compass</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "800px", margin: "0 auto" }}>
                Our proprietary framework for continuous AI improvement, from core engineering to governance and quality assurance.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}>
              {QUADRANTS.map((q, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  className={styles.card}
                  style={{
                    padding: "48px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "32px" }}>
                    <div style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "16px",
                      background: `${q.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: q.color,
                      border: `1px solid ${q.color}40`,
                      flexShrink: 0
                    }}>
                      <q.icon size={32} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>{q.title}</h2>
                      <span style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: q.color, fontWeight: "600" }}>{q.subtitle}</span>
                    </div>
                  </div>

                  <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "18px", lineHeight: "1.6" }}>{q.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
                    {q.tease.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "var(--text-main)" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: q.color }}></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link href={q.link} className={styles.directionLink} style={{ fontSize: "14px" }}>
                    Explore {q.title} <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "42px", marginBottom: "24px" }}>A 360° Approach to AI.</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", marginBottom: "32px" }}>
                The AI Compass is not just a diagram; it&apos;s our methodology. We believe that for AI to be successful, it must be engineered correctly, driven by data-driven insights, governed with security in mind, and validated through rigorous quality checks.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ padding: "24px", background: "var(--primary-bg)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>Comprehend</h4>
                  <p style={{ fontSize: "14px" }}>Baseline your current AI maturity and technical health.</p>
                </div>
                <div style={{ padding: "24px", background: "var(--primary-bg)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>Evolve</h4>
                  <p style={{ fontSize: "14px" }}>Continuous iteration based on validation feedback.</p>
                </div>
              </div>
            </div>
            <div style={{ position: "relative", height: "500px", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                width: "350px",
                height: "350px",
                border: "2px dashed var(--border)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: "20px", color: "var(--accent)" }}
                >
                  <Compass size={40} />
                </motion.div>
                <div style={{ fontSize: "64px", fontWeight: "800", color: "var(--accent)", opacity: 0.1 }}>AI</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
