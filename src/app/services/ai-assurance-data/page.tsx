"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  ArrowRight,
  ShieldAlert,
  GanttChart,
  HardDrive,
  Eye,
  Database,
  BarChart3,
  Scale
} from "lucide-react";
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

export default function AIAssuranceDataPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={STAGGER} 
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1.1, marginBottom: "32px" }}>
                AI <span style={{ color: "var(--accent)" }}>Assurance</span> & Data.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Ensuring trust, security, and continuous quality. We provide comprehensive governance frameworks and rigorous validation to protect your AI investments.
              </motion.p>
            </div>

            {/* AI Assurance Section */}
            <div style={{ marginBottom: "120px" }}>
              <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                <div style={{ padding: "12px", background: "rgba(245, 158, 11, 0.1)", borderRadius: "12px", color: "#f59e0b" }}>
                  <ShieldCheck size={32} />
                </div>
                <h2 style={{ fontSize: "36px" }}>AI Assurance & Governance</h2>
              </motion.div>

              <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
                <motion.div variants={FADE_UP} className={styles.card}>
                  <Lock size={40} />
                  <h4>Enterprise Security</h4>
                  <p>AI-driven security operations and cyber space protection. Securing data pipelines and model inference against adversarial attacks.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• AI-Driven SecOps</li>
                    <li style={{ marginBottom: "8px" }}>• Cyber Space Protection</li>
                    <li>• Model Security Audits</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Scale size={40} />
                  <h4>Trustworthy AI</h4>
                  <p>Strategic consulting for responsible and ethical AI adoption, ensuring alignment with global regulatory standards like the EU AI Act.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Risk Management Frameworks</li>
                    <li style={{ marginBottom: "8px" }}>• Strategic Consulting</li>
                    <li>• Ethical Compliance Audits</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <GanttChart size={40} />
                  <h4>Evolve & Protect</h4>
                  <p>Continuous monitoring and threat intelligence to protect models as they evolve in production environments.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Threat Intelligence</li>
                    <li style={{ marginBottom: "8px" }}>• Continuous Monitoring</li>
                    <li>• Resilience Evaluation</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* AI Quality & Data Section */}
            <div>
              <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                <div style={{ padding: "12px", background: "rgba(153, 27, 27, 0.1)", borderRadius: "12px", color: "#991b1b" }}>
                  <ShieldAlert size={32} />
                </div>
                <h2 style={{ fontSize: "36px" }}>AI Quality & Data Excellence</h2>
              </motion.div>

              <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
                <motion.div variants={FADE_UP} className={styles.card}>
                  <FileCheck size={40} />
                  <h4>Testing & Validation</h4>
                  <p>Comprehensive evaluation suites including automated test case generation and benchmark validation reporting.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Defect Prediction Modeling</li>
                    <li style={{ marginBottom: "8px" }}>• Automated Test Generation</li>
                    <li>• AI Benchmarking</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Eye size={40} />
                  <h4>Explainability</h4>
                  <p>Interpreting complex model behaviors to ensure transparency, robustness, and performance across edge cases.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Interpretability Analysis</li>
                    <li style={{ marginBottom: "8px" }}>• Edge Case Robustness</li>
                    <li>• Performance Evaluations</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <HardDrive size={40} />
                  <h4>Data Engineering</h4>
                  <p>Building scalable data processing engines and visualization operations to power the AI lifecycle.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Scalable Data Processing</li>
                    <li style={{ marginBottom: "8px" }}>• Visualization Dashboarding</li>
                    <li>• Data Lifecycle Operations</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              variants={STAGGER} 
              style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
            >
              <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "24px" }}>Secure Your AI Journey.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Implement the controls and validation needed for long-term AI stability and trust.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Get Validated
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
