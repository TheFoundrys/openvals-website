"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Box, Share2, BarChart3, Tag, ShieldCheck } from "lucide-react";
import styles from "./ui.module.css";
import TrustLayerGraphic from "./TrustLayerGraphic";
import HeroInteractiveStart from "./HeroInteractiveStart";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 65, damping: 14 } as const },
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
    <section className={styles.heroSectionGrid}>
      {/* ── LEFT COLUMN: MAIN CONTENT ── */}
      <motion.div
        className={styles.heroContentCol}
        initial="hidden"
        animate="show"
        variants={STAGGER}
      >
        {/* Eyebrow Badge */}
        <motion.div variants={FADE_UP} className={styles.heroEyebrowBadge}>
          <span className={styles.heroEyebrowDot} />
          <span className={styles.heroEyebrowText}>
            ENTERPRISE AI ASSURANCE & BENCHMARKING
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 variants={FADE_UP} className={styles.heroMainHeadline}>
          The Trust Layer <br className={styles.desktopOnlyBr} />
          for <span className={styles.heroHeadlineAccent}>AI</span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p variants={FADE_UP} className={styles.heroMainDescription}>
          Validate, secure, and benchmark AI systems before they reach production. Turn model behavior into measurable confidence.
        </motion.p>

        {/* Interactive Start Options: Product CTAs vs Terminal Command */}
        <motion.div variants={FADE_UP} style={{ width: "100%" }}>
          <HeroInteractiveStart />
        </motion.div>
      </motion.div>

      {/* ── RIGHT COLUMN: ANIMATED AI SPHERE & FLOATING CARDS ── */}
      <div className={styles.heroVisualizationCol}>
        <TrustLayerGraphic />
      </div>
    </section>
  );
}

export function ActionButtonsPart() {
  const stats = [
    {
      value: "2 lakhs+",
      label: "EXPERIMENTS COMPLETED",
      icon: Box,
    },
    {
      value: "53",
      label: "LLM PROVIDERS",
      icon: Share2,
    },
    {
      value: "20+",
      label: "CORE METRICS",
      icon: BarChart3,
    },
    {
      value: "v0.5.5",
      label: "CURRENT RELEASE",
      icon: Tag,
    },
    {
      value: "Dr. Pinnacle",
      label: "LICENSE",
      icon: ShieldCheck,
    },
  ];

  const capabilities = [
    "Safety Detection",
    "Multi-Model Benchmarking",
    "Trust Score Engine",
    "Ollama",
    "OpenAI",
    "Claude",
    "Gemini",
    "Latency Scoring",
    "Reliability",
  ];
  const uniqueCapabilities = Array.from(new Set(capabilities));
  const marqueeCapabilities = [
    ...uniqueCapabilities,
    ...uniqueCapabilities,
    ...uniqueCapabilities,
    ...uniqueCapabilities,
  ];

  return (
    <div className={styles.wFull}>
      <div className={styles.heroStatsSectionWrap}>
        <div className={styles.heroStatsCardMain}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={styles.heroStatColumn}>
                <div className={styles.heroStatIconBox}>
                  <Icon size={22} className={styles.heroStatIconSvg} />
                </div>
                <div className={styles.heroStatContent}>
                  <div
                    className={styles.heroStatValueText}
                    style={stat.value.length > 8 ? { fontSize: "clamp(15px, 1.2vw, 19px)" } : undefined}
                  >
                    {stat.value}
                  </div>
                  <div className={styles.heroStatLabelText}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOVING CAPABILITIES TICKER / MARQUEE ── */}
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
