"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Lock, Database, LucideIcon } from "lucide-react";
import styles from "./ui.module.css";

interface FloatingCardProps {
  id: "safety" | "eval" | "risk" | "data";
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "blue" | "red";
  floatDuration: number;
  floatDelay: number;
}

const CARDS: FloatingCardProps[] = [
  {
    id: "safety",
    title: "AI Safety",
    description: "Audited & Verified",
    icon: ShieldCheck,
    variant: "blue",
    floatDuration: 4.6,
    floatDelay: 0.1,
  },
  {
    id: "eval",
    title: "Model Evaluation",
    description: "Real-Time Insights",
    icon: BarChart3,
    variant: "blue",
    floatDuration: 5.2,
    floatDelay: 0.4,
  },
  {
    id: "risk",
    title: "Risk Detection",
    description: "Prompt Injection",
    icon: Lock,
    variant: "red",
    floatDuration: 4.9,
    floatDelay: 0.7,
  },
  {
    id: "data",
    title: "Data Protection",
    description: "Leakage Prevention",
    icon: Database,
    variant: "blue",
    floatDuration: 5.4,
    floatDelay: 1.0,
  },
];

function FloatingInfoCard({
  id,
  title,
  description,
  icon: Icon,
  variant,
  floatDuration,
  floatDelay,
}: FloatingCardProps) {
  const isRed = variant === "red";
  const anchorClass =
    id === "safety"
      ? styles.cardAnchorTopLeft
      : id === "eval"
      ? styles.cardAnchorTopRight
      : id === "risk"
      ? styles.cardAnchorBottomLeft
      : styles.cardAnchorBottomRight;

  return (
    <div className={`${styles.floatingCardAnchor} ${anchorClass}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: floatDelay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{
            y: [0, -5, 1, 0],
            x: [0, 2, -1, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay * 1.5,
          }}
          className={`${styles.referenceInfoCard} ${isRed ? styles.referenceInfoCardRed : styles.referenceInfoCardBlue}`}
        >
          <div className={`${styles.referenceIconBox} ${isRed ? styles.referenceIconBoxRed : styles.referenceIconBoxBlue}`}>
            <Icon className={`${styles.referenceIconSvg} ${isRed ? styles.referenceIconRed : styles.referenceIconBlue}`} />
          </div>
          <div className={styles.referenceTextBox}>
            <span className={styles.referenceCardTitle}>{title}</span>
            <span className={styles.referenceCardDesc}>{description}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TrustLayerGraphic() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.sphereContainerWrap}>
      {/* ── ATMOSPHERIC AMBIENT GLOW ── */}
      <div className={styles.sphereAtmosphereGlow} />

      {/* ── FINE ORBITAL ELLIPSE (Matching reference Saturn-like ring) ── */}
      <svg
        className={styles.sphereOrbitSvg}
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="refOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        <g transform="rotate(-24 270 270)">
          {/* Main orbital ring */}
          <ellipse
            cx="270"
            cy="270"
            rx="235"
            ry="110"
            fill="none"
            stroke="url(#refOrbitGrad)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
            className={styles.sphereOrbitRing}
          />

          {/* Traveling particle on ring */}
          <circle r="4" fill="#38bdf8" className={styles.sphereOrbitParticle}>
            <animateMotion
              path="M 505 270 A 235 110 0 1 0 35 270 A 235 110 0 1 0 505 270"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Secondary trailing particle */}
          <circle r="2.5" fill="#ffffff" opacity="0.85">
            <animateMotion
              path="M 505 270 A 235 110 0 1 0 35 270 A 235 110 0 1 0 505 270"
              dur="20s"
              begin="-10s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Subtle celestial stars around the sphere */}
        <circle cx="95" cy="180" r="1.5" fill="#38bdf8" opacity="0.65" />
        <circle cx="445" cy="120" r="1.75" fill="#ffffff" opacity="0.75" />
        <circle cx="485" cy="290" r="1.25" fill="#38bdf8" opacity="0.55" />
        <circle cx="80" cy="380" r="2" fill="#38bdf8" opacity="0.7" />
        <circle cx="430" cy="420" r="1.5" fill="#f43f5e" opacity="0.5" />
        <circle cx="270" cy="45" r="1.5" fill="#ffffff" opacity="0.6" />
      </svg>

      {/* ── THE CORE ANIMATED AI SPHERE (Exact 330px diameter) ── */}
      <div className={styles.aiSphereCore}>
        {/* Hexagonal Grid Layer */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className={styles.aiSphereHexGrid}
        >
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            <defs>
              <pattern
                id="hexGridShieldRef"
                width="50"
                height="43.3"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(0.75)"
              >
                <path
                  fill="none"
                  stroke="rgba(125,211,252,0.55)"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                  d="M25,21.65 L37.5,0 L62.5,0 L75,21.65 L62.5,43.3 L37.5,43.3 Z"
                />
                <path
                  fill="none"
                  stroke="rgba(125,211,252,0.55)"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                  d="M-25,21.65 L-12.5,0 L12.5,0 L25,21.65 L12.5,43.3 L-12.5,43.3 Z"
                />
                <path
                  fill="none"
                  stroke="rgba(125,211,252,0.55)"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                  d="M75,21.65 L87.5,0 L112.5,0 L125,21.65 L112.5,43.3 L87.5,43.3 Z"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexGridShieldRef)" />
          </svg>
        </motion.div>

        {/* 🔵 Bright Edge Rim Highlight */}
        <div className={styles.aiSphereRim} />

        {/* 3D Spherical Volume Highlights */}
        <div className={styles.aiSphereVolumeLight} />
        <div className={styles.aiSphereInnerShadow} />

        {/* Radiant Core Hotspot (Lower-left glint matching reference) */}
        <div className={styles.aiSphereHotspot} />

        {/* Center Radiant Core Flare */}
        <div className={styles.aiSphereFlare} />
      </div>

      {/* ── 4 FLOATING INFORMATION CARDS (Around the Sphere) ── */}
      {CARDS.map((card) => (
        <FloatingInfoCard key={card.title} {...card} />
      ))}
    </div>
  );
}
