"use client";

import { motion, Variants } from "framer-motion";
import { AlertCircle, ShieldAlert, Activity } from "lucide-react";
import Link from "next/link";
import styles from "./ui.module.css";
import TrustLayerGraphic from "./TrustLayerGraphic";

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

export function HeroPart() {
  return (
    <section className={styles.hero} style={{ padding: 0, minHeight: "auto" }}>
      <motion.div
        className={styles.heroContent}
        initial="hidden"
        animate="show"
        variants={STAGGER}
        style={{ flex: 1 }}
      >
        <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(36px, 6vw, 84px)", marginBottom: "24px" }}>
          The Trust Layer for AI
        </motion.h2>
        <motion.p variants={FADE_UP} style={{ fontSize: "20px", marginBottom: "32px", width: "100%" }}>
          AI systems are being deployed faster than they are understood.
          OpenVals ensures they are secure, reliable, and validated.
        </motion.p>
        <motion.div variants={FADE_UP}>
          <Link href="/apply" className={`${styles.button} ${styles.primary}`}>
            Get Your AI Validated
          </Link>
        </motion.div>
      </motion.div>

      <div className={styles.heroGraphic} style={{ flex: 1 }}>
        <TrustLayerGraphic />
      </div>
    </section>
  );
}

export function FailsPart() {
  return (
    <div className={styles.wFull} style={{ marginBottom: "20px" }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={STAGGER}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "80px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Context */}
        <div style={{ flex: "1 1 450px" }}>
          <motion.h3
            variants={FADE_UP}
            className={styles.sectionTitleHighlighted}
            style={{
              margin: "0 0 16px 0",
              fontSize: "24px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 700
            }}
          >
            AI Fails Quietly
          </motion.h3>
          <motion.p variants={FADE_UP} style={{ margin: 0, fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.6", width: "100%" }}>
            AI systems hallucinate, get manipulated, and behave unpredictably under real-world conditions. Most organizations deploy without understanding these hidden failure modes.
          </motion.p>
        </div>

        {/* Right Points */}
        <motion.div
          variants={STAGGER}
          style={{
            flex: "0 1 auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minWidth: "320px"
          }}
        >
          {[
            {
              title: "Hallucinations",
              desc: "Confident but false data generation.",
              icon: AlertCircle,
              color: "#ff6b6b"
            },
            {
              title: "Manipulation",
              desc: "Security bypass via prompt injection.",
              icon: ShieldAlert,
              color: "#4ecdc4"
            },
            {
              title: "Behavioral Drift",
              desc: "Performance decay over time.",
              icon: Activity,
              color: "#45b7d1"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={FADE_UP}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "14px"
              }}
            >
              <div style={{ color: item.color, display: "flex" }}><item.icon size={16} /></div>
              <div style={{ lineHeight: "1.2" }}>
                <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{item.title}:</span>{" "}
                <span style={{ color: "var(--text-muted)" }}>{item.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <div className={styles.wFull}>
      <HeroPart />
      <FailsPart />
    </div>
  );
}
