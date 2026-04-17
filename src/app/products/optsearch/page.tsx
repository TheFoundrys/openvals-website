"use client";

import { motion } from "framer-motion";
import { Search, Database, Fingerprint, RefreshCcw, CheckCircle } from "lucide-react";
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

export default function OptSearchPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Search size={20} /> AI RETRIEVAL
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                Opt<span style={{ color: "var(--accent)" }}>Search</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Privacy-centric, real-time AI search and knowledge retrieval engine for secure enterprise data access.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Database, 
                  title: "Private Knowledge Base", 
                  desc: "Connect your enterprise documents, wikis, and databases without moving them to the public web." 
                },
                { 
                  icon: RefreshCcw, 
                  title: "Real-Time Indexing", 
                  desc: "Instantly index and retrieve information from frequently changing internal records and live data streams." 
                },
                { 
                  icon: Fingerprint, 
                  title: "Secure & Compliant", 
                  desc: "Role-based access controls and encrypted retrieval to ensure users only see what they are authorized to access." 
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
              <motion.h2 variants={FADE_UP} style={{ fontSize: "40px", marginBottom: "40px" }}>Key Features</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {[
                    "Hybrid semantic and keyword search.",
                    "Automated citation and source tracking.",
                    "Support for 100+ document formats.",
                    "Low-latency response times (under 100ms)."
                  ].map((label, i) => (
                    <motion.div key={i} variants={FADE_UP} style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "18px" }}>
                      <CheckCircle style={{ color: "var(--accent)" }} />
                      <span style={{ color: "var(--text-main)" }}>{label}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ padding: "48px", background: "var(--secondary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                   <p style={{ fontSize: "24px", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                     &quot;OptSearch enables organizations to find exactly what they need within seconds, while keeping sensitive data under lock and key.&quot;
                   </p>
                </div>
              </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Start Searching Privately.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Transform your enterprise knowledge into a powerful, secure internal search engine.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
