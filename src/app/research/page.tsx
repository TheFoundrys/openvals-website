"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const PUBLICATIONS = [
  {
    category: "Cybersecurity & Trustworthy AI",
    papers: [
      {
        title: "Multi-Agent Phishing Detection And Deletion via Small VLM and LLM Reasoning",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2025 ICETE"
      },
      {
        title: "RAG-Enhanced Multi-Model Ensemble for Automated Vulnerability Detection Using SLMs",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2025 ICETE"
      },
      {
        title: "Vulnerability Detection and Monitoring Using LLM",
        link: "https://ieeexplore.ieee.org/document/10456393",
        conf: "2023 ICCCNT"
      },
      {
        title: "A Comprehensive Insight into Machine Learning-Based Approaches for Fake Profile Detection",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2023 ICCCNT"
      }
    ]
  },
  {
    category: "AI Architectures & Applications",
    papers: [
      {
        title: "Pose Detection: Integrating Machine Learning with Large Vision Models",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2025 IACIS"
      },
      {
        title: "A Multi-Agent Garage Service Search and Recommendation with Hybrid MLs and LLMs",
        link: "https://ieeexplore.ieee.org/document/10940937",
        conf: "2025 ICOCT"
      },
      {
        title: "Hybrid Q-Learning with VLMs Reasoning Features",
        link: "https://ieeexplore.ieee.org/document/11040757",
        conf: "2025 AIMLA"
      },
      {
        title: "Hybrid ML-SLM RAG System for Large Technical PDFs",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2025 ICOCT"
      }
    ]
  },
  {
    category: "Healthcare & Specialized Vision",
    papers: [
      {
        title: "Multi-Vision LVMs Model Ensemble for Gold Jewelry Authenticity Verification",
        link: "https://ieeexplore.ieee.org/author/231984777844193",
        conf: "2025 ICOCT"
      },
      {
        title: "Comparative Analysis of Diverse Architectures for Accurate Blood Cancer Cell Classification",
        link: "https://ieeexplore.ieee.org/document/10497341",
        conf: "2024 ICIRCA"
      }
    ]
  }
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh", paddingTop: "120px" }}>
        <section className={styles.section}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            {/* Header Content with individual Variants */}
            <motion.div variants={FADE_UP} style={{ marginBottom: "60px" }}>
              <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontSize: "14px", fontWeight: "600", marginBottom: "32px", textDecoration: "none" }}>
                <ArrowLeft size={16} /> Back to About
              </Link>
              <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.1, marginBottom: "24px" }}>
                IEEE Publications <br /><span style={{ color: "var(--accent)" }}>& Research</span>.
              </h1>
              <p style={{ fontSize: "20px", color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.6 }}>
                A complete archive of peer-reviewed publications and deep-tech research contributions by Vishwanath Akuthota, spanning Cybersecurity, LLM architectures, and Vision systems.
              </p>
            </motion.div>

            {/* Grid Container as a Motion Div to propagate Stagger */}
            <motion.div
              variants={STAGGER}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}
            >
              {PUBLICATIONS.map((category, idx) => (
                <motion.div key={idx} variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                    <div style={{ color: "var(--accent)", background: "rgba(0, 212, 255, 0.1)", padding: "10px", borderRadius: "10px" }}>
                      <FileText size={24} />
                    </div>
                    <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>{category.category}</h2>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {category.papers.map((paper, pIdx) => (
                      <motion.a
                        key={pIdx}
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card}
                        variants={FADE_UP}
                        style={{
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                          background: "var(--secondary-bg)",
                          border: "1px solid var(--border)",
                          transition: "all 0.3s ease",
                          cursor: "pointer"
                        }}
                      >
                        <h3 style={{ fontSize: "17px", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{paper.title}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{paper.conf}</span>
                          <ExternalLink size={16} color="var(--accent)" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
