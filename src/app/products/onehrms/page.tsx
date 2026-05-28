"use client";

import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle, FileCheck, ShieldCheck, Users, Workflow } from "lucide-react";
import Link from "next/link";
import AmbientGrid from "../../../components/AmbientGrid";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import styles from "../../../components/ui.module.css";

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

const modules = [
  {
    icon: Users,
    title: "Employee 360",
    desc: "Centralize employee profiles, documents, roles, teams, attendance, and lifecycle records in one secure workspace."
  },
  {
    icon: CalendarCheck,
    title: "Smart Attendance & Leave",
    desc: "Track shifts, leave requests, approvals, holidays, and attendance patterns with clean manager workflows."
  },
];

const features = [
  "Automated onboarding and offboarding workflows.",
  "Role-based access for HR, managers, finance, and employees.",
  "Payroll-ready employee and attendance data.",
  "Document storage for offer letters, IDs, contracts, and appraisals.",
  "Analytics for headcount, leave trends, attrition risk, and productivity signals.",
  "Secure approval flows with audit-ready activity history."
];

export default function OneHrmsPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div style={{ maxWidth: "900px", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Workflow size={20} /> AI HRMS PLATFORM
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                One<span style={{ color: "var(--accent)" }}>Hrms</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(17px, 1.7vw, 21px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                An AI-powered human resource management system for employee operations, attendance, leave, documents, approvals, and workforce intelligence.
              </motion.p>
            </div>

            <div className={styles.grid} style={{ gap: "32px" }}>
              {modules.map((item) => (
                <motion.div key={item.title} variants={FADE_UP} className={styles.card} style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div style={{ color: "var(--accent)", marginBottom: "24px" }}><item.icon size={40} /></div>
                  <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.6" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: "120px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "48px", alignItems: "center" }}>
              <motion.div variants={FADE_UP}>
                <h2 style={{ fontSize: "clamp(28px, 3.2vw, 38px)", marginBottom: "24px" }}>Built for modern HR teams.</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.75, marginBottom: "32px" }}>
                  OneHrms helps organizations replace scattered spreadsheets and manual follow-ups with a single operating layer for HR work. Teams can manage people data, automate repetitive tasks, and make faster decisions with clear reporting.
                </p>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>1</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Unified HR workspace</div>
                  </div>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>AI</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Assisted operations</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={FADE_UP} style={{ padding: "40px", background: "var(--secondary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <ShieldCheck size={30} />
                  <h3 style={{ fontSize: "24px", margin: 0 }}>Enterprise Controls</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {features.map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.5 }}>
                      <CheckCircle size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "3px" }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div style={{ marginTop: "120px" }}>
              <motion.div variants={FADE_UP} style={{ padding: "48px", background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(0,212,255,0.05) 100%)", borderRadius: "32px", border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-24px", right: "-24px", opacity: 0.1 }}><FileCheck size={190} /></div>
                <p style={{ fontSize: "clamp(19px, 2.2vw, 25px)", color: "var(--text-main)", fontWeight: "500", lineHeight: 1.5, position: "relative", zIndex: 1, maxWidth: "860px" }}>
                  OneHrms is a unified Human Resource Management System built to manage employees, attendance, leave, onboarding, payroll, departments, roles, documents, and organizational workflows from one secure platform.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(30px, 3.4vw, 36px)", marginBottom: "24px" }}>Bring HR into one flow.</motion.h2>
            <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "16px" }}>
              Streamline employee operations with secure workflows, cleaner data, and AI assistance built for HR teams.
            </motion.p>
            <motion.div variants={FADE_UP}>
              <Link href="/contact" className={`${styles.button} ${styles.primary}`}>
                Request OneHrms Demo
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
