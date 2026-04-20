"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Scale, 
  ScrollText, 
  Search, 
  TestTube2, 
  Gauge, 
  Activity, 
  Wrench, 
  CheckCircle2, 
  Lock,
  Eye,
  ClipboardCheck
} from "lucide-react";
import styles from "../../../components/ui.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AmbientGrid from "../../../components/AmbientGrid";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } }
} as const;

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

export default function AIQualityAssurancePage() {
  const assuranceItems = [
    { icon: Lock, title: "AI Security", desc: "Protect AI systems from attacks like data poisoning and model theft." },
    { icon: Scale, title: "Responsible AI", desc: "Ensure fairness, transparency, and ethical decision-making." },
    { icon: ScrollText, title: "Compliance", desc: "Align AI systems with legal and regulatory frameworks." },
    { icon: Search, title: "Model Auditing", desc: "Audit models for bias, accuracy, and reliability." }
  ];

  const qualityItems = [
    { icon: TestTube2, title: "Model Testing", desc: "Validate model accuracy, robustness, and consistency." },
    { icon: Gauge, title: "Performance", desc: "Measure performance across different datasets and scenarios." },
    { icon: Activity, title: "Continuous Monitoring", desc: "Track model drift and maintain long-term performance." },
    { icon: Wrench, title: "Test Automation", desc: "Automate testing pipelines for faster validation." }
  ];

  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        
        {/* HERO SECTION */}
        <section className={styles.section} style={{ paddingTop: "80px", paddingBottom: "60px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.h1 variants={FADE_UP} style={{ 
              fontSize: "clamp(32px, 6vw, 72px)", 
              fontWeight: 400, 
              lineHeight: 1.2, 
              letterSpacing: "-0.01em",
              marginBottom: "20px",
              color: "var(--text-main)"
            }}>
              AI Quality & <span style={{ fontWeight: 700 }}>Assurance.</span><br />
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Trusted & Secure AI.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} style={{ 
              fontSize: "clamp(18px, 1.5vw, 20px)", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              maxWidth: "800px", 
              margin: "0 auto 32px" 
            }}>
              Ensure your AI systems are trustworthy, robust, and compliant with enterprise safety standards.
            </motion.p>
          </motion.div>
        </section>

        {/* ASSURANCE SECTION */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>1. AI Assurance</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "800px" }}>Build secure, ethical, and compliant AI systems with robust governance.</p>
            </div>
            
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              {assuranceItems.map((item, i) => (
                <div key={i} style={{ padding: "24px", background: "var(--primary-bg)", borderRadius: "16px", border: "1px solid var(--border)" }}>
                   <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.1)", display: "grid", placeItems: "center", color: "var(--accent)", marginBottom: "16px" }}>
                     <item.icon size={20} strokeWidth={2.5} />
                   </div>
                   <h4 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>{item.title}</h4>
                   <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUALITY SECTION */}
        <section className={styles.section} style={{ borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>2. AI Quality Engineering</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "800px" }}>Deliver reliable, high-performance systems with industrial-grade testing.</p>
            </div>
            
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              {qualityItems.map((item, i) => (
                <div key={i} style={{ padding: "24px", background: "var(--secondary-bg)", borderRadius: "16px", border: "1px solid var(--border)" }}>
                   <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.1)", display: "grid", placeItems: "center", color: "var(--accent)", marginBottom: "16px" }}>
                     <item.icon size={20} strokeWidth={2.5} />
                   </div>
                   <h4 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>{item.title}</h4>
                   <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY CAPS */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
             <div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Key Capabilities</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                   {["Explainable AI", "Bias Mitigation", "Data Privacy", "Model Drift", "Audit Trails", "Governance"].map((tag, i) => (
                     <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                        <CheckCircle2 size={16} color="var(--accent)" /> {tag}
                     </div>
                   ))}
                </div>
             </div>
             <div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Strategic Impact</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                   {["Regulatory Compliance", "Ethical AI Adoption", "Secure Infrastructure"].map((item, i) => (
                     <li key={i} style={{ padding: "12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "14px", fontWeight: 600 }}>
                        {item}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section} style={{ background: "var(--accent)", color: "#fff", textAlign: "center" }}>
           <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "20px", color: "#fff" }}>Secure Your Competitive Edge</h2>
              <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9 }}>
                Validate your AI systems for safety and peak performance.
              </p>
              <Link href="/apply" className={styles.button} style={{ background: "#fff", color: "var(--accent)", fontWeight: 800 }}>
                Schedule a Quality Audit
              </Link>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
