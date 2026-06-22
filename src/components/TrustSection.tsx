"use client";

import { motion, Variants } from "framer-motion";
import { Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const command = "pip install openvals";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          OpenVals helps enterprises validate, secure, and trust AI before production.
        </motion.p>
        <motion.div variants={FADE_UP} className={styles.commandBoxWrapper} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
          <div className={styles.commandBox}>
            <code className={styles.commandText}>
              <span className={styles.commandTextLabel}>{command}</span>
            </code>
            <button
              onClick={handleCopy}
              className={styles.commandCopy}
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className={styles.heroGraphic} style={{ flex: 1 }}>
        <TrustLayerGraphic />
      </div>
    </section>
  );
}

export function ActionButtonsPart() {
  const stats = [
    { value: "162,201", label: "validated models" },
    { value: "5+", label: "LLM Providers" },
    { value: "20+", label: "Core Metrics" },
    { value: "v0.5.0", label: "Current Release" },
    { value: "Dr.Pinnacle", label: "License" },
  ];
  const capabilities = [
    "Latency Scoring",
    "Reliability",
    "Safety Detection",
    "Multi-Model Benchmarking",
    "Trust Score Engine",
    "Ollama",
    "OpenAI",
    "Claude",
    "Gemini",
  ];
  const uniqueCapabilities = Array.from(new Set(capabilities));
  const marqueeCapabilities = [...uniqueCapabilities, ...uniqueCapabilities];

  return (
    <div className={styles.trustCtaStack}>
      <div className={styles.trustActions}>
        <Link
          href="/docs"
          className={`${styles.button} ${styles.secondary} ${styles.trustActionButton}`}
        >
          OpenVals Docs
          <ExternalLink size={18} />
        </Link>
        <a
          href="https://github.com/vishwanathakuthota/openvals"
          className={`${styles.button} ${styles.secondary} ${styles.trustActionButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
          <ExternalLink size={18} />
        </a>
      </div>
      <div className={styles.trustStats}>
        {stats.map((stat) => (
          <div className={styles.trustStat} key={stat.label}>
            <div 
              className={styles.trustStatValue}
              style={stat.value.length > 8 ? { fontSize: "clamp(18px, 1.8vw, 24px)" } : undefined}
            >
              {stat.value}
            </div>
            <div className={styles.trustStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.trustMarquee} aria-label="OpenVals capabilities">
        <div className={styles.trustMarqueeTrack} aria-hidden="true">
          {marqueeCapabilities.map((capability, index) => (
            <span className={styles.trustMarqueeItem} key={`${capability}-${index}`}>
              {capability}
              <span className={styles.trustMarqueeCheck}>{"\u2713"}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <div className={styles.wFull}>
      <HeroPart />
      <ActionButtonsPart />
    </div>
  );
}
