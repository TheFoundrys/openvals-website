"use client";

import { motion } from "framer-motion";
import { BarChart3, CheckCircle, FileText, Handshake, ShieldCheck, Target, Workflow } from "lucide-react";
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
    icon: Target,
    title: "Lead Pipeline",
    desc: "Capture, qualify, assign, and track leads across every stage with a clear sales pipeline built for daily follow-up."
  },
  {
    icon: Handshake,
    title: "Customer 360",
    desc: "Bring contacts, companies, conversations, deals, tasks, notes, and documents into one shared customer workspace."
  },
  {
    icon: BarChart3,
    title: "Sales Intelligence",
    desc: "Monitor conversion, revenue, activities, team performance, and forecast signals with simple dashboards."
  },
];

const features = [
  "Lead and deal management from inquiry to closure.",
  "Task reminders, follow-up tracking, and activity history.",
  "Role-based access for sales, support, managers, and admins.",
  "Customer notes, documents, proposals, and communication logs.",
  "Dashboard views for pipeline value, revenue, conversion, and team output.",
  "Audit-ready workflows for approvals, ownership changes, and customer handoffs."
];

export default function OneCrmPage() {
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
                <Workflow size={20} /> AI CRM PLATFORM
              </motion.div>
              <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 6vw, 75px)", lineHeight: 1.1, marginBottom: "32px" }}>
                One<span style={{ color: "var(--accent)" }}>CRM</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(17px, 1.7vw, 21px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                An AI-powered customer relationship management platform for lead tracking, sales workflows, customer records, follow-ups, and growth analytics.
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
                <h2 style={{ fontSize: "clamp(28px, 3.2vw, 38px)", marginBottom: "24px" }}>Built for sales and customer teams.</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.75, marginBottom: "32px" }}>
                  OneCRM helps teams replace scattered spreadsheets, missed follow-ups, and disconnected customer notes with one operating layer for sales work. Every lead, deal, and customer interaction stays visible from first contact to renewal.
                </p>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>1</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Unified customer workspace</div>
                  </div>
                  <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "28px", fontWeight: "700" }}>AI</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Assisted sales workflows</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={FADE_UP} style={{ padding: "40px", background: "var(--secondary-bg)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <ShieldCheck size={30} />
                  <h3 style={{ fontSize: "24px", margin: 0 }}>CRM Controls</h3>
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
                <div style={{ position: "absolute", top: "-24px", right: "-24px", opacity: 0.1 }}><FileText size={190} /></div>
                <p style={{ fontSize: "clamp(19px, 2.2vw, 25px)", color: "var(--text-main)", fontWeight: "500", lineHeight: 1.5, position: "relative", zIndex: 1, maxWidth: "860px" }}>
                  &quot;OneCRM gives growing teams a clean, AI-assisted system for turning leads into customers and customer activity into dependable revenue visibility.&quot;
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", marginTop: "100px" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER} style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(30px, 3.4vw, 36px)", marginBottom: "24px" }}>Put your customer work in one place.</motion.h2>
            <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "40px", fontSize: "16px" }}>
              Manage leads, deals, follow-ups, customer context, and sales reporting with one secure CRM workflow.
            </motion.p>
            <motion.div variants={FADE_UP}>
              <Link
                href="https://calendly.com/vishwanath-akuthota/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.button} ${styles.primary}`}
              >
                Request OneCRM Demo
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
