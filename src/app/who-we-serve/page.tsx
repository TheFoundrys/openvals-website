"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  FileBadge2, 
  Terminal, 
  Gauge, 
  ShieldAlert, 
  Radar, 
  Target, 
  BarChart3, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AmbientGrid from "../../components/AmbientGrid";
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

interface DomainItem {
  icon: React.ComponentType<{ size?: number }>;
  name: string;
  domainKey: string;
  description: string;
  roi: string;
  outcome: string;
  href: string;
}

const INDUSTRY_DOMAINS: DomainItem[] = [
  {
    icon: Activity,
    name: "Finance",
    domainKey: "finance",
    description: "Financial reasoning, portfolio risk, calculations, and regulation auditing.",
    roi: "80% manual audit labor saved",
    outcome: "Zero math calculation errors & SEC/FINRA compliance alignment.",
    href: "/finance"
  },
  {
    icon: ShieldCheck,
    name: "Healthcare",
    domainKey: "healthcare",
    description: "Clinical reasoning correctness, medical terminology, and HIPAA safety.",
    roi: "QA checks shortened from weeks to minutes",
    outcome: "Clinical safety adherence & patient data privacy enforcement.",
    href: "/healthcare"
  },
  {
    icon: FileBadge2,
    name: "Legal",
    domainKey: "legal",
    description: "Contract clause analysis, regulatory citation accuracy, and liability checks.",
    roi: "10x faster contract reviews",
    outcome: "99% detection of hallucinated citations and missing provisions.",
    href: "/legal"
  },
  {
    icon: ShieldAlert,
    name: "Cybersecurity",
    domainKey: "cybersecurity",
    description: "Log analysis, vulnerability logic, jailbreak defense, and threat intelligence.",
    roi: "Prevent multi-million dollar exfiltration breaches",
    outcome: "Secure system configuration & CISO-ready AI trust verification.",
    href: "/cybersecurity"
  },
  {
    icon: BarChart3,
    name: "Enterprise Ops",
    domainKey: "enterprise_ops",
    description: "Business rule checks, resource scheduling, inventory planning, and action logic.",
    roi: "Massive cost reductions via automated allocation",
    outcome: "100% enforcement of operational rules & agentic planning verification.",
    href: "/enterprise-ops"
  }
];

const TECHNICAL_DOMAINS: DomainItem[] = [
  {
    icon: Terminal,
    name: "Developer",
    domainKey: "developer",
    description: "Generated code execution correctness, OWASP security scanning, and complexity scoring.",
    roi: "Drastically reduced debugging cycles",
    outcome: "Zero insecure code generation & verified software agent logic.",
    href: "/developer"
  },
  {
    icon: Radar,
    name: "Reasoning",
    domainKey: "reasoning",
    description: "Multi-turn logical consistency, causal inference, and state tracking tracking.",
    roi: "Zero broken workflow process paths",
    outcome: "Decision Reliability Score (DRS) certification for model logical flow.",
    href: "/reasoning"
  },
  {
    icon: Target,
    name: "Math",
    domainKey: "math",
    description: "Algebraic, calculus, symbolic, and numeric calculation auditing.",
    roi: "Reduced human verification hours",
    outcome: "Certified step-by-step arithmetic validation for quantitative setups.",
    href: "/math"
  },
  {
    icon: Gauge,
    name: "Sample (General)",
    domainKey: "general",
    description: "General common-sense smoke tests and benchmark pipeline verification.",
    roi: "Instant setup & pipeline deployment",
    outcome: "Quick latency, cost, and baseline comparison signals.",
    href: "/sample"
  }
];

export default function WhoWeServePage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section className={styles.section} style={{ paddingTop: "140px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
          <AmbientGrid />
          <div style={{ position: "absolute", top: 0, left: "20%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }}></div>
          
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={STAGGER} 
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 24px" }}
          >
            <div style={{ maxWidth: "800px", marginBottom: "60px" }}>
              <motion.div 
                variants={FADE_UP}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  background: "rgba(0, 212, 255, 0.08)", 
                  border: "1px solid rgba(0, 212, 255, 0.2)", 
                  padding: "6px 14px", 
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--accent)",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                <Sparkles size={14} /> Who We Serve
              </motion.div>
              
              <motion.h1 
                variants={FADE_UP} 
                style={{ fontSize: "clamp(42px, 6vw, 68px)", lineHeight: 1.1, marginBottom: "24px", fontWeight: "800" }}
                className={styles.sectionTitleHighlighted}
              >
                Trusted AI Validation for <span style={{ color: "var(--accent)" }}>Every Domain</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: "var(--text-muted)", lineHeight: 1.6 }}>
                OpenVals empowers organizations across industries and engineering disciplines to achieve 
                trustworthy AI operations, complete regulatory compliance, and immediate bottom-line ROI.
              </motion.p>
            </div>

            {/* Industry Domains */}
            <div style={{ marginBottom: "60px" }}>
              <motion.h2 
                variants={FADE_UP} 
                style={{ 
                  fontSize: "24px", 
                  fontWeight: "700", 
                  borderBottom: "1px solid var(--border)", 
                  paddingBottom: "16px",
                  marginBottom: "32px",
                  color: "var(--text-main)",
                  letterSpacing: "-0.01em"
                }}
              >
                Industry Domains
              </motion.h2>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
                gap: "20px" 
              }}>
                {INDUSTRY_DOMAINS.map((domain, i) => (
                  <DomainCard key={i} domain={domain} />
                ))}
              </div>
            </div>

            {/* Technical / Core Domains */}
            <div style={{ marginBottom: "40px" }}>
              <motion.h2 
                variants={FADE_UP} 
                style={{ 
                  fontSize: "24px", 
                  fontWeight: "700", 
                  borderBottom: "1px solid var(--border)", 
                  paddingBottom: "16px",
                  marginBottom: "32px",
                  color: "var(--text-main)",
                  letterSpacing: "-0.01em"
                }}
              >
                Core & Technical Domains
              </motion.h2>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
                gap: "20px" 
              }}>
                {TECHNICAL_DOMAINS.map((domain, i) => (
                  <DomainCard key={i} domain={domain} />
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* CTA Section */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={STAGGER} 
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            <motion.h2 variants={FADE_UP} className={styles.sectionTitleHighlighted} style={{ fontSize: "clamp(32px, 5vw, 44px)", marginBottom: "20px", fontWeight: "800" }}>
              Ready to verify your model?
            </motion.h2>
            <motion.p variants={FADE_UP} style={{ color: "var(--text-muted)", marginBottom: "36px", fontSize: "18px", lineHeight: "1.6" }}>
              Run comprehensive validation workflows today and achieve immediate trustworthiness and ROI reports.
            </motion.p>
            <motion.div variants={FADE_UP}>
              <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
                Request Custom Benchmark
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DomainCard({ domain }: { domain: DomainItem }) {
  return (
    <motion.div 
      variants={FADE_UP} 
      className={styles.card} 
      style={{
        padding: "24px 28px",
        background: "var(--secondary-bg)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        transition: "border-color 0.2s ease, transform 0.2s ease"
      }}
      whileHover={{ borderColor: "rgba(0, 212, 255, 0.4)", y: -4 }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ 
            color: "var(--accent)", 
            background: "rgba(0, 212, 255, 0.06)", 
            padding: "8px 10px", 
            borderRadius: "10px",
            border: "1px solid rgba(0, 212, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <domain.icon size={20} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.01em" }}>{domain.name}</h3>
        </div>
        
        <p style={{ color: "var(--text-muted)", marginBottom: "18px", fontSize: "14px", lineHeight: "1.5" }}>
          {domain.description}
        </p>

        {/* ROI and Outcome Metrics */}
        <div style={{ 
          background: "rgba(255,255,255,0.01)", 
          border: "1px solid var(--border)", 
          borderRadius: "10px", 
          padding: "12px 16px", 
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: "700" }}>
              <TrendingUp size={11} /> Expected ROI
            </span>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-main)", marginTop: "1px" }}>
              {domain.roi}
            </p>
          </div>
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)", paddingTop: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: "700" }}>
              <ShieldCheck size={11} /> Trustworthy Outcome
            </span>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "1px", lineHeight: "1.4" }}>
              {domain.outcome}
            </p>
          </div>
        </div>
      </div>

      <Link 
        href={domain.href} 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "6px", 
          fontSize: "13px", 
          fontWeight: "600", 
          color: "var(--accent)",
          textDecoration: "none",
          marginTop: "auto",
          width: "fit-content"
        }}
      >
        Explore Domain <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}
