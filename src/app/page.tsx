"use client";

import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, Fingerprint, Lock, FileBadge, Activity, Eye, Zap, BookOpen, ChevronDown, AlertCircle, Compass, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "../components/ui.module.css";
import NeuralCore from "../components/NeuralCore";
import ContinuousStream from "../components/ContinuousStream";
import AmbientGrid from "../components/AmbientGrid";
import AmbientBlobs from "../components/AmbientBlobs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThreeRiskCurve from "../components/ThreeRiskCurve";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(true);
  return (
    <>
      <Header />

      <main>
        <section className={styles.hero}>
          <ContinuousStream />

          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate="show"
            variants={STAGGER}
          >
            <motion.h2 variants={FADE_UP}>The Trust Layer for AI</motion.h2>
            <motion.p variants={FADE_UP}>
              AI systems are being deployed faster than they are understood.
              OpenVals ensures they are secure, reliable, and validated before they reach the real world.
            </motion.p>
            <motion.div variants={FADE_UP}>
              <Link href="#contact" className={`${styles.button} ${styles.primary}`}>
                Get Your AI Validated
              </Link>
            </motion.div>
          </motion.div>

          <div className={styles.heroGraphic}>
            <NeuralCore />
          </div>
        </section>


        {/* AI FAILS QUIETLY - THREE.JS BACKGROUND */}
        <section className={styles.section} style={{ backgroundColor: "#011A3A", position: "relative", padding: "120px var(--container-padding)", overflow: "hidden" }}>
          <ThreeRiskCurve />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
            {/* Overlay Content */}
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}
              style={{ maxWidth: "600px", background: "rgba(1, 26, 58, 0.7)", backdropFilter: "blur(12px)", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: "24px", color: "white" }}>
                AI Fails Quietly
              </motion.h2>
              <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "40px" }}>
                AI systems hallucinate, get manipulated, and behave unpredictably under real-world conditions. 
                Most organizations deploy without understanding these hidden failure modes.
              </motion.p>

              <motion.div variants={STAGGER} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { title: "Hallucinations", desc: "Confident but false data generation.", icon: AlertCircle, color: "#f59e0b" },
                  { title: "Manipulation", desc: "Security bypass via prompt injection.", icon: ShieldAlert, color: "#ef4444" },
                  { title: "Behavioral Drift", desc: "Performance decay over time.", icon: Activity, color: "#38BDF8" }
                ].map((item, i) => (
                  <motion.div key={i} variants={FADE_UP} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ padding: "12px", background: `${item.color}15`, borderRadius: "12px", color: item.color, border: `1px solid ${item.color}40` }}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 4px 0", color: "#fff" }}>{item.title}</h4>
                      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <AmbientGrid />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP} className={styles.sectionTitleHighlighted}>Our Services</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: Activity, title: "AI/ML Model Validation", desc: "Industrial-grade evaluation of AI performance, bias detection, and accuracy audits across enterprise datasets.", href: "/solutions/ai-model-validation" },
                { icon: Lock, title: "AI/ML Security", desc: "Securing AI data pipelines against model extraction, intellectual property theft, and sensitive data leakage.", href: "/solutions/ai-security" },
                { icon: FileBadge, title: "AI/ML Compliance", desc: "Audit-ready alignment with the EU AI Act, NIST AI Framework, and global responsible AI standards.", href: "/solutions/ai-compliance" },
              ].map((service, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ color: "var(--accent)" }}><service.icon size={28} /></div>
                  <h4 style={{ margin: 0, fontSize: "20px" }}>{service.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "var(--text-muted)" }}>{service.desc}</p>

                  <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                    <Link href={service.href} className={styles.textLink} style={{ fontSize: "14px", fontWeight: "600", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      Explore more &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        <section id="assurance-pillars" className={styles.section} style={{ backgroundColor: "var(--secondary-bg)", position: "relative", paddingTop: "40px", paddingBottom: "40px" }}>
          <AmbientBlobs />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <motion.h3 variants={FADE_UP} style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, marginBottom: "8px" }}>
                Our Core Pillars
              </motion.h3>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", fontSize: "15px", maxWidth: "550px", margin: "0 auto" }}>
                End-to-end framework for high-stakes enterprise AI.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "24px", maxWidth: "1200px", margin: "0 auto", marginTop: "32px" }}>
              {[
                { 
                  icon: Compass, 
                  title: "AI Compass", 
                  hook: "THE STRATEGY LAYER",
                  desc: "Navigating the enterprise AI landscape with strategic foresight and technical clarity to define your competitive edge.",
                  color: "#00d4ff",
                  href: "/services/ai-compass"
                },
                { 
                  icon: Cpu, 
                  title: "AI Engineering & Data", 
                  hook: "THE BUILD LAYER",
                  desc: "Architecting production-grade AI systems that scale securely and perform predictably in high-consequence environments.",
                  color: "#f43f5e",
                  href: "/services/ai-engineering-data"
                },
                { 
                  icon: ShieldCheck, 
                  title: "AI Quality & Assurance", 
                  hook: "THE TRUST LAYER",
                  desc: "Industrial-grade validation and proactive security auditing to ensure your models are safe, compliant, and attack-resistant.",
                  color: "#10b981",
                  href: "/services/ai-quality-assurance"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  className={styles.card}
                  style={{ 
                    padding: "40px 32px", 
                    borderRadius: "24px", 
                    background: "rgba(255, 255, 255, 0.02)", 
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
                  }}
                >
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "12px", 
                    background: `${item.color}15`, 
                    display: "grid", 
                    placeItems: "center", 
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                    flexShrink: 0,
                    marginBottom: "8px"
                  }}>
                    <item.icon size={24} style={{ display: "block", margin: 0 }} strokeWidth={2.5} />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ 
                      fontSize: "11px", 
                      fontWeight: 700, 
                      letterSpacing: "0.15em", 
                      color: item.color, 
                      textTransform: "uppercase" 
                    }}>
                      {item.hook}
                    </div>
                    <h4 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>{item.title}</h4>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>

                  <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                    <Link href={item.href} className={styles.textLink} style={{ color: "var(--text-main)", display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: "600", fontSize: "15px" }}>
                      Explore {item.title} <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SOLUTION SECTION - Clean light layout */}
        <section className={styles.section} style={{ backgroundColor: "var(--primary-bg)", textAlign: "center", padding: "40px var(--container-padding) 100px" }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}
          >
            <motion.h3
              variants={FADE_UP}
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, marginBottom: 0, color: "var(--text-main)" }}
            >
              We Validate AI Before It Breaks Your Business
            </motion.h3>

            <motion.p
              variants={FADE_UP}
              style={{ color: "var(--text-muted)", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.6, maxWidth: 700 }}
            >
              OpenVals provides industrial-grade validation, security auditing, and regulatory assurance for AI and machine learning systems.
            </motion.p>

            <motion.p
              variants={FADE_UP}
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "var(--text-main)", marginTop: "16px" }}
            >
              We don’t just check if your models work —<br />
              <span style={{ color: "var(--accent)", display: "inline-block", marginTop: "16px", fontWeight: 600 }}>
                &rarr; We prove where they fail.
              </span>
            </motion.p>
          </motion.div>
        </section>


        <section className={styles.section}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>If It&apos;s Not Validated, It&apos;s Not Ready</motion.h3>
            <motion.p variants={FADE_UP} style={{ marginBottom: "30px" }}>
              AI is no longer experimental. It’s operational, business-critical, and high-risk.
              OpenVals ensures your systems are trustworthy before deployment.
            </motion.p>
            <motion.div variants={FADE_UP}>
              <Link href="#contact" className={`${styles.button} ${styles.primary}`}>
                Start Validation
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
