"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Fingerprint, Eye, Zap, Database, ArrowRight } from "lucide-react";
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

export default function AISecurityPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Lock size={20} /> CORE SOLUTION
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                AI <span style={{ color: "var(--accent)" }}>Security</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Hardening your AI infrastructure. Securing data pipelines and model API endpoints against unauthorized extraction, leakage, and adversarial disruption.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Database, 
                  title: "Pipeline Protection", 
                  desc: "Securing the movement of training data and inference logs to prevent data tampering or leakage." 
                },
                { 
                  icon: Eye, 
                  title: "Model Theft Prevention", 
                  desc: "Protecting proprietary model architectures and weights from being copied or reverse-engineered via the API." 
                },
                { 
                  icon: Fingerprint, 
                  title: "Access Control", 
                  desc: "Zero-trust identity management for AI system access, with granular control over model invocation." 
                }
              ].map((item, i) => (
                <motion.div key={i} variants={FADE_UP} className={styles.card} style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div style={{ color: "var(--accent)", marginBottom: "24px" }}><item.icon size={40} /></div>
                  <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.6" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: "120px", background: "var(--secondary-bg)", padding: "80px", borderRadius: "32px", border: "1px solid var(--border)" }}>
               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                 <div>
                   <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>Defense-in-Depth for ML</h2>
                   <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
                     Securing AI systems requires a fundamentally different approach than traditional IT security. We protect against specific ML threats like model inversion, reconstruction attacks, and poisoning.
                   </p>
                   <Link href="/contact" className={styles.directionLink}>
                     Learn About Our Security Protocols <ArrowRight size={16} />
                   </Link>
                 </div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    {[
                      { icon: Zap, label: "Encrypted Inference" },
                      { icon: ShieldCheck, label: "API Gateways" },
                      { icon: Lock, label: "Data Masking" },
                      { icon: Eye, label: "Anomaly Logs" }
                    ].map((feat, i) => (
                      <div key={i} style={{ padding: "24px", background: "var(--primary-bg)", borderRadius: "16px", border: "1px solid var(--border)", textAlign: "center" }}>
                        <div style={{ color: "var(--accent)", marginBottom: "12px" }}><feat.icon size={24} style={{ margin: "0 auto" }} /></div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>{feat.label}</div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Armor Your Model.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Ensure your AI infrastructure is as hardened as your core banking systems.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/contact" className={`${styles.button} ${styles.primary}`}>
                   Security Audit
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
