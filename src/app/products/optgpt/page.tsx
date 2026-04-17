"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Layers, CheckCircle } from "lucide-react";
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

export default function OptGPTPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Cpu size={20} /> ENTERPRISE AI
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                OptGPT <span style={{ color: "var(--accent)" }}>4.0</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Secure, Explainable & Lightweight Enterprise AI Platform built on Mixture-of-Experts (MoE) architecture for transparent reasoning.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Layers, 
                  title: "Mixture of Experts", 
                  desc: "32 specialized experts with 4 active per inference (21B total parameters), ensuring high efficiency and performance." 
                },
                { 
                  icon: Zap, 
                  title: "Advanced Reasoning", 
                  desc: "Configurable reasoning depth and full chain-of-thought analysis for complex enterprise decision making." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Privacy-First Architecture", 
                  desc: "Data never leaves your environment. Deploy on-premises or in a secure private cloud with full data sovereignty." 
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
                    "Massive 256,000 token context window.",
                    "Native agentic & function calling support.",
                    "Consumer-grade hardware compatibility (16GB VRAM).",
                    "Full audit trails and response traceability."
                  ].map((label, i) => (
                    <motion.div key={i} variants={FADE_UP} style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "18px" }}>
                      <CheckCircle style={{ color: "var(--accent)" }} />
                      <span style={{ color: "var(--text-main)" }}>{label}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ padding: "48px", background: "var(--secondary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                   <p style={{ fontSize: "24px", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                     &quot;OptGPT transforms operations from manual task orchestration to autonomous process execution with absolute data privacy.&quot;
                   </p>
                </div>
              </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Ready for Private AI?</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Deploy OptGPT in your secure environment and start building high-trust autonomous workflows.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Request Demo
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
