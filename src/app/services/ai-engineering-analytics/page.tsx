"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  BarChart3, 
  Code2,
  LineChart,
  BrainCircuit,
  Settings2,
  Search,
  Zap
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

export default function AIEngineeringAnalyticsPage() {
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
                AI <span style={{ color: "var(--accent)" }}>Engineering</span> & Analytics.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Building robust AI foundations and extracting intelligence from complexity. We bridge the gap between experimental research and production-ready analytics.
              </motion.p>
            </div>

            {/* Engineering Section */}
            <div style={{ marginBottom: "120px" }}>
              <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", color: "#3b82f6" }}>
                  <Cpu size={32} />
                </div>
                <h2 style={{ fontSize: "36px" }}>Applied AI Engineering</h2>
              </motion.div>

              <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
                <motion.div variants={FADE_UP} className={styles.card}>
                  <BrainCircuit size={40} />
                  <h4>AI Research</h4>
                  <p>State-of-the-art implementation of Machine Learning, Deep Learning, and Generative AI models tailored to specific enterprise domains.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Advanced Neural Architectures</li>
                    <li style={{ marginBottom: "8px" }}>• Large Language Model Optimization</li>
                    <li>• Reinforcement Learning Systems</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Code2 size={40} />
                  <h4>Enterprise Development</h4>
                  <p>Architecting and deploying scalable AI solutions with model hubs, CI/CD for ML (MLOps), and high-performance inference engines.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Production MLOps Pipelines</li>
                    <li style={{ marginBottom: "8px" }}>• Custom Model Hub Integration</li>
                    <li>• Edge & Cloud Deployment</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Settings2 size={40} />
                  <h4>Model Orchestration</h4>
                  <p>Coordinating complex AI workflows and multi-agent systems to ensure seamless business process integration.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Multi-Agent Coordination</li>
                    <li style={{ marginBottom: "8px" }}>• API & Microservices Wrapper</li>
                    <li>• Dynamic Scaling & Load Balancing</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Analytics Section */}
            <div>
              <motion.div variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                <div style={{ padding: "12px", background: "rgba(244, 63, 94, 0.1)", borderRadius: "12px", color: "#f43f5e" }}>
                  <BarChart3 size={32} />
                </div>
                <h2 style={{ fontSize: "36px" }}>Applied Data Science</h2>
              </motion.div>

              <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
                <motion.div variants={FADE_UP} className={styles.card}>
                  <LineChart size={40} />
                  <h4>Advanced Analytics</h4>
                  <p>Predictive and perspective modeling to forecast trends and prescribe optimal business actions.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Predictive Trend Analysis</li>
                    <li style={{ marginBottom: "8px" }}>• Perspective Optimization</li>
                    <li>• Churn & Retention Modeling</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Search size={40} />
                  <h4>Diagnostic Insights</h4>
                  <p>Deep-dive analysis to understand the &quot;why&quot; behind data patterns and model behaviors.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Root Cause Analysis</li>
                    <li style={{ marginBottom: "8px" }}>• Descriptive Statistics</li>
                    <li>• Pattern Recognition</li>
                  </ul>
                </motion.div>

                <motion.div variants={FADE_UP} className={styles.card}>
                  <Zap size={40} />
                  <h4>Intelligence Modalities</h4>
                  <p>Transforming raw signals into structured intelligence through orchestrating data streams and model outputs.</p>
                  <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                    <li style={{ marginBottom: "8px" }}>• Signal Processing</li>
                    <li style={{ marginBottom: "8px" }}>• Real-time Stream Analytics</li>
                    <li>• Automated Reporting</li>
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
              <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "24px" }}>Build the Future with Us.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Combine engineering excellence with data-driven intelligence to transform your business.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Start Your Project
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
