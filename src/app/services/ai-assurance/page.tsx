"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Scale, 
  ScrollText, 
  Search, 
  CheckCircle2, 
  ShieldAlert,
  Eye,
  Lock,
  ArrowRight
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

export default function AIAssurancePage() {
  const whatWeDo = [
    { icon: Lock, title: "AI Security", desc: "Protect AI systems from attacks like data poisoning and model theft." },
    { icon: Scale, title: "Responsible AI", desc: "Ensure fairness, transparency, and ethical decision-making." },
    { icon: ScrollText, title: "Compliance & Governance", desc: "Align AI systems with legal and regulatory frameworks." },
    { icon: Search, title: "Model Auditing", desc: "Audit models for bias, accuracy, and reliability." }
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
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              color: "var(--text-main)"
            }}>
              AI/ML <span style={{ fontWeight: 800 }}>Assurance.</span><br />
              <span style={{ color: "var(--accent)", fontWeight: 800 }}>Build Trustworthy AI Systems.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} style={{ 
              fontSize: "clamp(18px, 1.5vw, 20px)", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              maxWidth: "700px", 
              margin: "0 auto 32px" 
            }}>
              Ensure your AI is secure, ethical, and compliant with global enterprise standards.
            </motion.p>

            <motion.div variants={FADE_UP}>
              <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                Secure Your AI &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px" }}>Overview</motion.h2>
              <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.8 }}>
                AI Assurance focuses on trust, governance, and security. It ensures that AI systems operate safely, 
                fairly, and in compliance with regulations, protecting both the organization and its users.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className={styles.section}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>What We Do</h2>
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {whatWeDo.map((item, i) => (
                <div key={i} style={{ padding: "32px", background: "var(--secondary-bg)", borderRadius: "20px", border: "1px solid var(--border)", position: "relative" }}>
                   <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.12)", display: "grid", placeItems: "center", color: "var(--accent)", marginBottom: "20px" }}>
                     <item.icon size={24} strokeWidth={2.5} />
                   </div>
                   <h4 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>{item.title}</h4>
                   <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES & OUTCOMES */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div style={{ padding: "40px", background: "var(--primary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Eye size={24} color="var(--accent)" /> Key Capabilities
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Bias Detection & Mitigation",
                  "Explainable AI (XAI)",
                  "AI Governance Frameworks",
                  "Risk & Compliance Audits",
                  "Cybersecurity for AI"
                ].map((cap, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", color: "var(--text-muted)" }}>
                    <CheckCircle2 color="var(--accent)" size={18} /> {cap}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "40px", background: "var(--primary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={24} color="var(--accent)" /> Outcomes
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Trusted AI systems",
                  "Regulatory compliance",
                  "Reduced ethical risks",
                  "Improved transparency"
                ].map((out, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", color: "var(--text-muted)" }}>
                    <CheckCircle2 color="var(--accent)" size={18} /> {out}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className={styles.section}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Use Cases</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
              {[
                "AI Risk Audits",
                "Secure AI Systems",
                "Ethical AI Implementations",
                "Compliance Monitoring"
              ].map((domain, i) => (
                <div key={i} style={{ padding: "20px 32px", background: "var(--secondary-bg)", border: "1px solid var(--border)", borderRadius: "12px", fontWeight: 600 }}>
                  {domain}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section} style={{ background: "var(--accent)", color: "#fff", textAlign: "center" }}>
           <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "20px", color: "#fff" }}>Ready to build trust in your AI?</h2>
              <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9 }}>
                Ensure your systems are secure and compliant with TechOptima Assurance.
              </p>
              <Link href="/apply" className={styles.button} style={{ background: "#fff", color: "var(--accent)", fontWeight: 800 }}>
                Request an AI Audit
              </Link>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
