"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldAlert, Fingerprint, Lock, FileBadge, Activity, Eye, Zap, BookOpen } from "lucide-react";
import styles from "../components/ui.module.css";

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
      <header className={styles.header}>
        <h1>
          <Link href="/">OpenVals</Link>
        </h1>
        <nav className={styles.nav}>
          <Link href="#services">Services</Link>
          <Link href="#framework">Framework</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact" style={{ color: "var(--text-main)", fontWeight: 500 }}>
            Contact
          </Link>
        </nav>
      </header>

      <main>
        <motion.section 
          className={styles.hero}
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
            <Link href="#report" className={`${styles.button} ${styles.secondary}`}>
              View Sample Report
            </Link>
          </motion.div>
        </motion.section>

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
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>What We Do</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: ShieldAlert, title: "AI Red Teaming", desc: "Simulating real-world attacks including prompt injection, jailbreaks, and adversarial inputs." },
                { icon: Activity, title: "Model Validation", desc: "Testing accuracy, hallucinations, bias, and performance under stress conditions." },
                { icon: Lock, title: "AI Security", desc: "Identifying data leakage, model extraction risks, and API vulnerabilities." },
                { icon: FileBadge, title: "Certification", desc: "Audit-grade validation reports and deployment readiness scoring." },
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

        <section id="framework" className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
            <motion.h3 variants={FADE_UP}>OpenVals AI Assurance Framework™</motion.h3>
            <motion.div className={styles.grid} variants={STAGGER}>
              {[
                { icon: Zap, title: "V1: Validation", desc: "Accuracy, bias, performance" },
                { icon: Eye, title: "V2: Vulnerability", desc: "Attacks, exploits, leakage" },
                { icon: Fingerprint, title: "V3: Variability", desc: "Drift, instability, edge cases" },
                { icon: BookOpen, title: "V4: Verifiability", desc: "Audit, reporting, certification" },
              ].map((item, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP} style={{ backgroundColor: "var(--primary-bg)" }}>
                  <item.icon size={28} />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
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

      <footer className={styles.footer}>
        <div>© 2026 OpenVals. All rights reserved.</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </footer>
    </>
  );
}
