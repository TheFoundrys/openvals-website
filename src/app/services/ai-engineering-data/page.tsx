"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Settings, 
  Workflow, 
  Puzzle, 
  CheckCircle2, 
  BarChart3,
  LineChart,
  Database,
  PieChart,
  Zap,
  Terminal,
  TrendingUp,
  Search
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

export default function AIEngineeringDataPage() {
  const engineeringItems = [
    { icon: Cpu, title: "Model Development", desc: "Design and train machine learning and deep learning models tailored to your use cases." },
    { icon: Settings, title: "Model Deployment", desc: "Deploy models into production using robust architectures and APIs." },
    { icon: Workflow, title: "MLOps", desc: "Implement CI/CD pipelines for continuous training, monitoring, and optimization." },
    { icon: Puzzle, title: "Integration", desc: "Integrate AI seamlessly into existing business systems and workflows." }
  ];

  const dataItems = [
    { icon: BarChart3, title: "Data Analytics", desc: "Analyze historical data to uncover trends and patterns." },
    { icon: LineChart, title: "Predictive Modeling", desc: "Forecast future outcomes using advanced statistical and ML models." },
    { icon: Database, title: "Data Engineering", desc: "Build scalable pipelines for data collection, cleaning, and transformation." },
    { icon: PieChart, title: "Visualization & BI", desc: "Create dashboards and reports for real-time decision-making." }
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
              AI Engineering & <span style={{ fontWeight: 700 }}>Data.</span><br />
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Systems Built for Intelligence.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} style={{ 
              fontSize: "clamp(18px, 1.5vw, 20px)", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              maxWidth: "800px", 
              margin: "0 auto 32px" 
            }}>
              Design, develop, and deploy production-grade AI systems backed by robust data pipelines.
            </motion.p>
          </motion.div>
        </section>

        {/* ENGINEERING SECTION */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>1. AI/ML Engineering</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "800px" }}>Transform ideas into scalable, production-ready intelligent systems.</p>
            </div>
            
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "20px" }}>
              {engineeringItems.map((item, i) => (
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

        {/* DATA SECTION */}
        <section className={styles.section} style={{ borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>2. Applied Data Science</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "800px" }}>Turn raw data into actionable intelligence and competitive advantage.</p>
            </div>
            
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "20px" }}>
              {dataItems.map((item, i) => (
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

        {/* CAPABILITIES SUMMARY */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "40px" }}>
             <div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Capabilities</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                   {["LLMs", "Computer Vision", "RecSys", "MLOps", "Big Data", "Spark", "Warehousing"].map((tag, i) => (
                     <div key={i} style={{ padding: "8px 16px", background: "var(--primary-bg)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>{tag}</div>
                   ))}
                </div>
             </div>
             <div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Strategic Outcomes</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                   {["Faster Deployment", "Reduced Overhead", "Data Optimized", "Scalable Growth"].map((item, i) => (
                     <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                        <CheckCircle2 size={16} color="var(--accent)" /> {item}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section} style={{ background: "var(--accent)", color: "#fff", textAlign: "center" }}>
           <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "20px", color: "#fff" }}>Build Your AI Foundation</h2>
              <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9 }}>
                Scale your intelligent systems with enterprise-grade engineering.
              </p>
              <Link href="/apply" className={styles.button} style={{ background: "#fff", color: "var(--accent)", fontWeight: 800 }}>
                Start a Consultation
              </Link>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
