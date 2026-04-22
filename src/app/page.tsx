"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldAlert, Lock, FileBadge, Activity, AlertCircle, Compass, Cpu, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
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


        {/* AI FAILS QUIETLY - MATCHING SERVICES TEMPLATE */}
        <section className={styles.section}>
          <AmbientGrid />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP} className={styles.sectionTitleHighlighted}>AI Fails Quietly</motion.h3>
            <motion.p variants={FADE_UP} style={{ marginBottom: "32px", maxWidth: "700px" }}>
              AI systems hallucinate, get manipulated, and behave unpredictably under real-world conditions.
              Most organizations deploy without understanding these hidden failure modes.
            </motion.p>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { title: "Hallucinations", desc: "Confident but false data generation that can lead to critical business errors.", icon: AlertCircle },
                { title: "Manipulation", desc: "Security bypass via prompt injection and adversarial attacks on model logic.", icon: ShieldAlert },
                { title: "Behavioral Drift", desc: "Performance decay over time as real-world data evolves away from training sets.", icon: Activity }
              ].map((item, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ color: "var(--accent)" }}><item.icon size={28} /></div>
                  <h4 style={{ margin: 0, fontSize: "20px" }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "var(--text-muted)" }}>{item.desc}</p>
                  
                  <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                    <Link href="/blog" className={styles.textLink} style={{ fontSize: "14px", fontWeight: "600", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      Learn more &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
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

        <section id="assurance-pillars" className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
          <AmbientBlobs />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP} className={styles.sectionTitleHighlighted}>Our Core Pillars</motion.h3>
            <motion.p variants={FADE_UP} style={{ marginBottom: "32px", maxWidth: "700px" }}>
              End-to-end framework for high-stakes enterprise AI.
            </motion.p>

            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                {
                  icon: Compass,
                  title: "AI Compass",
                  desc: "Navigating the enterprise AI landscape with strategic foresight and technical clarity to define your competitive edge.",
                  href: "/services/ai-compass"
                },
                {
                  icon: Cpu,
                  title: "AI Engineering & Data",
                  desc: "Architecting production-grade AI systems that scale securely and perform predictably in high-consequence environments.",
                  href: "/services/ai-engineering-data"
                },
                {
                  icon: ShieldCheck,
                  title: "AI Quality & Assurance",
                  desc: "Industrial-grade validation and proactive security auditing to ensure your models are safe, compliant, and attack-resistant.",
                  href: "/services/ai-quality-assurance"
                },
              ].map((item, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ color: "var(--accent)" }}><item.icon size={28} /></div>
                  <h4 style={{ margin: 0, fontSize: "20px" }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "var(--text-muted)" }}>{item.desc}</p>

                  <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                    <Link href={item.href} className={styles.textLink} style={{ fontSize: "14px", fontWeight: "600", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      Explore {item.title} &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
