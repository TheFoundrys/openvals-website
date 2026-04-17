"use client";

import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, Fingerprint, Lock, FileBadge, Activity, Eye, Zap, BookOpen, ChevronDown } from "lucide-react";
import styles from "../components/ui.module.css";
import NeuralCore from "../components/NeuralCore";
import ContinuousStream from "../components/ContinuousStream";
import AmbientGrid from "../components/AmbientGrid";
import AmbientBlobs from "../components/AmbientBlobs";
import Header from "../components/Header";
import Footer from "../components/Footer";

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


        <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>AI Fails Quietly</motion.h3>
            <motion.p variants={FADE_UP}>
              AI systems hallucinate, get manipulated, and behave unpredictably under real-world conditions.
              Most organizations deploy without understanding failure modes, risk exposure, or adversarial threats.
            </motion.p>
          </motion.div>
        </section>

        <section id="services" className={styles.section}>
          <AmbientGrid />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>Our Offerings</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: Activity, title: "Model Validation", desc: "Industrial-grade evaluation of AI performance, bias detection, and accuracy audits across enterprise datasets.", href: "/solutions/ai-model-validation" },
                { icon: Lock, title: "AI Security", desc: "Securing AI data pipelines against model extraction, intellectual property theft, and sensitive data leakage.", href: "/solutions/ai-security" },
                { icon: FileBadge, title: "AI Compliance", desc: "Audit-ready alignment with the EU AI Act, NIST AI Framework, and global responsible AI standards.", href: "/solutions/ai-compliance" },
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
        <section id="framework" className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
          <AmbientBlobs />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <div style={{ position: "relative", marginBottom: "60px" }}>
              <motion.h3
                variants={FADE_UP}
                onClick={() => setIsFrameworkOpen(!isFrameworkOpen)}
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  userSelect: "none"
                }}
              >
                OpenVals AI Assurance Framework
                <motion.span animate={{ rotate: isFrameworkOpen ? 180 : 0 }}>
                  <ChevronDown size={32} />
                </motion.span>
              </motion.h3>

              <AnimatePresence>
                {isFrameworkOpen && (
                  <motion.div
                    variants={STAGGER}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className={styles.grid}
                    style={{ marginTop: "40px" }}
                  >
                    {[
                      { icon: Zap, title: "V1: Model Validation", desc: "Rigorous testing of accuracy, bias, and performance across diverse datasets." },
                      { icon: Eye, title: "V2: AI Vulnerability", desc: "Security and exposure testing to detect systemic attacks and data leakage." },
                      { icon: Fingerprint, title: "V3: Variability Analysis", desc: "Monitoring for model drift, instability, and performance in edge cases." },
                      { icon: BookOpen, title: "V4: AI Verifiability", desc: "Audit-grade reporting, certification, and regulatory compliance alignment." },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className={styles.card}
                        style={{ backgroundColor: "var(--primary-bg)", padding: "40px", borderRadius: "16px", border: "1px solid var(--border)" }}
                        variants={FADE_UP}
                      >
                        <div style={{ color: "var(--accent)", marginBottom: "20px" }}><item.icon size={32} /></div>
                        <h4 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>{item.title}</h4>
                        <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.5 }}>{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
