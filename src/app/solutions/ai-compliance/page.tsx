"use client";

import { motion } from "framer-motion";
import { FileBadge, Scale, BookOpen, Fingerprint, Activity, CheckCircle, ArrowRight } from "lucide-react";
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

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <FileBadge size={20} /> CORE SOLUTION
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                AI <span style={{ color: "var(--accent)" }}>Compliance</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Ensuring full alignment with evolving global AI regulations such as the EU AI Act through audit-ready validation reports and certification logging.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {[
                { 
                  icon: Scale, 
                  title: "EU AI Act Compliance", 
                  desc: "Guiding your high-risk AI deployments to meet the stringent transparency and safety standards of current legislation." 
                },
                { 
                  icon: BookOpen, 
                  title: "GDPR Alignment", 
                  desc: "Ensuring your AI data processing pipelines remain fully opaque and compliant with European privacy standards." 
                },
                { 
                  icon: Fingerprint, 
                  title: "Certification Support", 
                  desc: "Generating rigorous technical reports for third-party audits and certifications." 
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
              <motion.h2 variants={FADE_UP} style={{ fontSize: "40px", marginBottom: "40px" }}>Audit-Grade Reporting</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                <div>
                   <p style={{ color: "var(--text-muted)", fontSize: "18px", marginBottom: "24px" }}>
                     Our validation reports provide the technical proof required for regulatory audits, including detailed bias analysis, risk assessment, and performance thresholds.
                   </p>
                   <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                     {[ "Regulatory technical files", "Data governance logs", "Bias mitigation artifacts", "System performance thresholds" ].map((t, idx) => (
                       <li key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                         <CheckCircle style={{ color: "var(--accent)" }} size={18} />
                         <span style={{ fontWeight: 600 }}>{t}</span>
                       </li>
                     ))}
                   </ul>
                </div>
                <div style={{ background: "rgba(0, 212, 255, 0.05)", padding: "48px", borderRadius: "24px", border: "1px dashed var(--accent)", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                   <div style={{ color: "var(--accent)", fontSize: "64px", fontWeight: "800", marginBottom: "8px" }}>ISO</div>
                   <div style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.2em" }}>Standards Alignment</div>
                </div>
              </div>
            </div>

          </motion.div>
        </section>

        <section className={styles.section} style={{ borderTop: "1px solid var(--border)", marginTop: "100px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "42px", marginBottom: "24px" }}>Get Compliant Now.</motion.h2>
              <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "18px" }}>
                Regulations are coming. OpenVals makes sure your systems are already ahead of them.
              </motion.p>
              <motion.div variants={FADE_UP}>
                <Link href="/contact" className={`${styles.button} ${styles.primary}`}>
                   Consult Compliance Expert
                </Link>
              </motion.div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
