"use client";

import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, Fingerprint, Lock, FileBadge, Activity, Eye, Zap, BookOpen } from "lucide-react";
import styles from "../components/ui.module.css";
import NeuralCore from "../components/NeuralCore";
import ContinuousStream from "../components/ContinuousStream";
import AmbientGrid from "../components/AmbientGrid";
import AmbientBlobs from "../components/AmbientBlobs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as any },
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
            <motion.h3 variants={FADE_UP}>Core offerings</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: ShieldAlert, title: "AI Red Teaming", desc: "Adversarial testing to uncover prompt injection, jailbreaks, and model vulnerabilities." },
                { icon: Activity, title: "Model Validation & Benchmarking", desc: "Rigorous evaluation of model performance, bias, and accuracy across diverse data sets." },
                { icon: Lock, title: "AI Security & Threat Modeling", desc: "Securing data pipelines and API endpoints against model extraction and leakage." },
                { icon: FileBadge, title: "AI Compliance & Certification", desc: "Ensuring regulatory alignment with audit-ready validation reports." },
              ].map((service, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP}>
                  <service.icon size={28} />
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
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
              OpenVals provides audit-grade validation and adversarial testing for AI and machine learning systems.
            </motion.p>
            
            <motion.p 
              variants={FADE_UP} 
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "var(--text-main)", marginTop: "16px" }}
            >
              We don’t just check if your model works —<br/>
              <span style={{ color: "var(--accent)", display: "inline-block", marginTop: "16px", fontWeight: 600 }}>
                &rarr; We prove where it fails.
              </span>
            </motion.p>
          </motion.div>
        </section>

        <section id="framework" className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
          <AmbientBlobs />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>OpenVals AI Assurance Framework™</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: Zap, title: "V1: Validation", desc: "Accuracy, bias, performance" },
                { icon: Eye, title: "V2: Vulnerability", desc: "Attacks, exploits, leakage" },
                { icon: Fingerprint, title: "V3: Variability", desc: "Drift, instability, edge cases" },
                { icon: BookOpen, title: "V4: Verifiability", desc: "Audit, reporting, certification" },
              ].map((item, i) => (
                <div key={i} className={styles.card} style={{ backgroundColor: "var(--primary-bg)" }}>
                  <item.icon size={28} />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className={styles.section}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>If It's Not Validated, It's Not Ready</motion.h3>
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
