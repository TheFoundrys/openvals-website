"use client";

import { motion } from "framer-motion";
import { Shield, Radio, Activity, Lock, CheckCircle, Database, Zap, Cpu, Search } from "lucide-react";
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

export default function RadiusPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "1000px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Shield size={20} /> AI-POWERED CYBERSECURITY
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                <span style={{ color: "var(--accent)" }}>Radius</span>.
              </motion.h1>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 600, color: "var(--text-main)", marginBottom: "24px" }}>
                Your Data. Your AI. Your Compute. Your Future.
              </motion.h2>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "800px" }}>
                TechOptima&apos;s flagship unified cybersecurity platform. A single, AI-native solution integrating SIEM, XDR, SOAR, and UEBA to predict and neutralize threats in real time.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Activity, 
                  title: "Unified SIEM & XDR", 
                  desc: "Intelligent correlation of logs and data across endpoints, networks, and identities with real-time contextual threat detection." 
                },
                { 
                  icon: Radio, 
                  title: "Autonomous SOAR", 
                  desc: "Self-orchestrating security response that automates incident containment and risk mitigation across your entire digital stack." 
                },
                { 
                  icon: Lock, 
                  title: "AI-Driven UEBA", 
                  desc: "Advanced User and Entity Behavior Analytics detecting lateral movement and insider threats using proprietary ML models." 
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
              <motion.h2 variants={FADE_UP} style={{ fontSize: "40px", marginBottom: "60px", textAlign: "center" }}>Layered Defense Architecture</motion.h2>
              <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {[
                  {
                    title: "Intelligent Layer",
                    icon: Cpu,
                    features: ["AI Model Observability", "Security Governance", "Threat Intelligence Analysis", "Privacy Guardrails"]
                  },
                  {
                    title: "Applications Layer",
                    icon: Database,
                    features: ["Web & Mobile App Security", "API Vulnerability Testing", "Shift-Left Code Analysis", "Logic Attack Protection"]
                  },
                  {
                    title: "Infrastructure Layer",
                    icon: Zap,
                    features: ["Network Traffic Monitoring", "Cloud Workload Protection", "Endpoint Health Analysis", "Autonomous Perimeter Defense"]
                  }
                ].map((layer, i) => (
                  <motion.div key={i} variants={FADE_UP} style={{ 
                    padding: "40px", 
                    background: "var(--secondary-bg)", 
                    borderRadius: "24px", 
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                  }}>
                    <div style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "16px" }}>
                      <layer.icon size={32} />
                      <h3 style={{ fontSize: "22px", fontWeight: "700" }}>{layer.title}</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {layer.features.map((feat, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "var(--text-muted)" }}>
                          <CheckCircle size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
              <motion.div variants={FADE_UP}>
                <h3 style={{ fontSize: "36px", marginBottom: "24px" }}>Powered by OptGPT</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "18px", lineHeight: "1.8", marginBottom: "32px" }}>
                  Radius is the world&apos;s first cybersecurity platform natively integrated with a private LLM. Using TechOptima&apos;s OptGPT, Radius provides natural language incident investigation, automated report generation, and predictive threat modeling without ever exposing your sensitive data to public AI services.
                </p>
                <div style={{ display: "flex", gap: "24px" }}>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>100%</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Data Sovereignty</div>
                  </div>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>Zero</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Public Exposure</div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={FADE_UP} style={{ padding: "48px", background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(0,212,255,0.05) 100%)", borderRadius: "32px", border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                 <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.1 }}><Shield size={200} /></div>
                 <p style={{ fontSize: "24px", color: "var(--text-main)", fontWeight: "500", lineHeight: 1.5, position: "relative", zIndex: 1 }}>
                   &quot;Radius transforms the SOC from a reactive monitor to an autonomous, intelligent defender, neutralizing threats before they even touch your core infrastructure.&quot;
                 </p>
              </motion.div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Dominate with AI.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Unlock unmatched efficiency with Radius — the AI-powered security solution tailored to boost performance and streamline operations at scale.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Schedule a Radius Demo
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
