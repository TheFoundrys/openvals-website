"use client";

import { motion } from "framer-motion";
import { Shield, Radio, Activity, Lock, CheckCircle } from "lucide-react";
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
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Shield size={20} /> AI SECURITY
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                <span style={{ color: "var(--accent)" }}>Radius</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Unified, AI-native Cybersecurity Platform (SIEM, XDR, SOAR, UEBA) for real-time threat detection and autonomous response.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Activity, 
                  title: "Real-Time Monitoring", 
                  desc: "Continuously scan endpoints, networks, and cloud infrastructure for anomalies and active threats." 
                },
                { 
                  icon: Radio, 
                  title: "XDR & SIEM Unified", 
                  desc: "Integrated security visibility across all surfaces with AI-driven correlation and incident prioritization." 
                },
                { 
                  icon: Lock, 
                  title: "Autonomous SOAR", 
                  desc: "Self-healing security workflows that automatically contain breaches and mitigate risks before impact." 
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
              <motion.h2 variants={FADE_UP} style={{ fontSize: "40px", marginBottom: "40px" }}>Key Capabilities</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {[
                    "AI-driven UEBA (User Behavior Analytics).",
                    "One-click incident investigation & root cause analysis.",
                    "Full regulatory compliance (GDPR, SOC2, HIPAA).",
                    "Native OptGPT integration for threat intelligence."
                  ].map((label, i) => (
                    <motion.div key={i} variants={FADE_UP} style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "18px" }}>
                      <CheckCircle style={{ color: "var(--accent)" }} />
                      <span style={{ color: "var(--text-main)" }}>{label}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ padding: "48px", background: "var(--secondary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                   <p style={{ fontSize: "24px", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                     &quot;Radius is the nervous system of modern enterprise security, predicting and stopping attacks before they reach critical assets.&quot;
                   </p>
                </div>
              </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Secure Your Future.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Implement the world&apos;s most advanced unified security platform for your organization.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Deploy Radius
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
