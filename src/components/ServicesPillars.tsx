"use client";

import { motion, Variants } from "framer-motion";
import { Activity, Lock, FileBadge, Compass, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./ui.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ServicesPart() {
  return (
    <div className={styles.wFull}>
      <div style={{ marginBottom: "12px" }}>
        <motion.h3 variants={FADE_UP} className={styles.sectionTitleHighlighted} style={{ fontSize: "32px", fontWeight: 700, margin: 0 }}>
          Our Services
        </motion.h3>
      </div>

      <motion.div
        className={styles.grid}
        variants={STAGGER}
        style={{ marginTop: 0 }}
      >
        {[
          {
            icon: Activity,
            title: "Model Validation",
            desc: "Industrial-grade evaluation of AI performance, bias, and accuracy audits.",
            href: "/solutions/ai-model-validation"
          },
          {
            icon: Lock,
            title: "AI Security",
            desc: "Securing AI data pipelines against model extraction and leakage.",
            href: "/solutions/ai-security"
          },
          {
            icon: FileBadge,
            title: "AI Compliance",
            desc: "Audit-ready alignment with the EU AI Act and global standards.",
            href: "/solutions/ai-compliance"
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            className={styles.card}
            variants={FADE_UP}
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              gap: "16px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--border)",
              height: "100%"
            }}
          >
            <div style={{ color: "var(--accent)" }}><service.icon size={32} strokeWidth={1.5} /></div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 600 }}>{service.title}</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>{service.desc}</p>
            </div>
            <Link href={service.href} className={styles.textLink} style={{ marginTop: "auto", fontSize: "14px", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
              Explore <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function PillarsPart() {
  return (
    <div className={styles.wFull}>
      <div style={{ marginBottom: "12px" }}>
        <motion.h3 variants={FADE_UP} className={styles.sectionTitleHighlighted} style={{ fontSize: "32px", fontWeight: 700, margin: 0 }}>
          Our Core Pillars
        </motion.h3>
      </div>

      <motion.div
        className={styles.grid}
        variants={STAGGER}
        style={{ marginTop: 0 }}
      >
        {[
          {
            icon: Compass,
            title: "AI Compass",
            desc: "Strategic foresight and technical clarity for enterprise AI defined.",
            href: "/services/ai-compass",
            color: "#4facfe"
          },
          {
            icon: Cpu,
            title: "AI Engineering & Data Analytics",
            desc: "Architecting production-grade AI systems that scale securely.",
            href: "/services/ai-engineering-data",
            color: "#00f2fe"
          },
          {
            icon: ShieldCheck,
            title: "AI Quality & Assurance",
            desc: "Industrial-grade validation and proactive security auditing.",
            href: "/services/ai-quality-assurance",
            color: "#706fd3"
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={styles.card}
            variants={FADE_UP}
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              gap: "16px",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              position: "relative",
              overflow: "hidden",
              height: "100%"
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              background: item.color,
              opacity: 0.6
            }} />
            <div style={{ color: item.color }}><item.icon size={32} strokeWidth={1.5} /></div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 600 }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>{item.desc}</p>
            </div>
            <Link href={item.href} className={styles.textLink} style={{ marginTop: "auto", fontSize: "14px", color: item.color, display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ServicesPillars() {
  return (
    <div className={styles.wFull}>
      <ServicesPart />
      <div style={{ height: "40px" }} />
      <PillarsPart />
    </div>
  );
}
