"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Zap, AlertTriangle, Bug, Terminal, ArrowRight } from "lucide-react";
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
      staggerChildren: 0.1,
    },
  },
} as const;

export default function RedTeamingPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <ShieldAlert size={20} /> CORE SOLUTION
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                AI <span style={{ color: "var(--accent)" }}>Red Teaming</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Adversarial testing to uncover prompt injection, jailbreaks, and hidden model vulnerabilities before they are exploited.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Terminal, 
                  title: "Prompt Injection Defense", 
                  desc: "Evaluating how your model handles malicious inputs designed to bypass system instructions or extract sensitive data." 
                },
                { 
                  icon: AlertTriangle, 
                  title: "Jailbreak Simulation", 
                  desc: "Testing model boundaries against sophisticated roleplay and adversarial framing techniques." 
                },
                { 
                  icon: Bug, 
                  title: "Data Leakage Testing", 
                  desc: "Ensuring models do not reveal training data, PII, or internal system secrets under pressure." 
                }
              ].map((item, i) => (
                <motion.div key={i} variants={FADE_UP} className={styles.card} style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div style={{ color: "var(--accent)", marginBottom: "24px" }}><item.icon size={40} /></div>
                  <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.6" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: "120px" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "40px", marginBottom: "40px" }}>The Red Teaming Workflow</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
                {[
                  { step: "01", title: "Target Identification", desc: "Defining the scope of testing across API endpoints and model interfaces." },
                  { step: "02", title: "Attack Surface Mapping", desc: "Modeling potential threats based on model architecture and training data." },
                  { step: "03", title: "Automated & Manual Probing", desc: "Executing thousands of attack variants to find vulnerabilities." },
                  { step: "04", title: "Mitigation Strategy", desc: "Providing actionable remediation steps and guardrail configurations." }
                ].map((s, idx) => (
                  <motion.div key={idx} variants={FADE_UP} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "24px" }}>
                    <div style={{ fontSize: "14px", color: "var(--accent)", fontWeight: "800", marginBottom: "12px" }}>{s.step}</div>
                    <h4 style={{ fontSize: "20px", marginBottom: "8px" }}>{s.title}</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Test Your Model Today.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Don't wait for a public jailbreak. Get a comprehensive red teaming report now.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Request Red Teaming
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
