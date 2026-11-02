"use client";

import React from "react";
import styles from "./ui.module.css";

export default function HeroAmbientWaves() {
  return (
    <div className={styles.heroAmbientWrapper} aria-hidden="true">
      {/* Soft atmospheric radial glow behind the sphere area */}
      <div className={styles.heroAmbientGlow} />

      {/* Elegant sweeping curved light ribbons matching the enterprise reference */}
      <svg
        className={styles.heroAmbientSvg}
        viewBox="0 0 1440 820"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGradLight1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveGradLight2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveGradLight3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveGradFill" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient translucent filled wave ribbon */}
        <path
          d="M 680 80 C 880 140, 1100 80, 1340 180 C 1420 220, 1460 280, 1440 380 C 1320 300, 1140 240, 920 200 Z"
          fill="url(#waveGradFill)"
          className={styles.heroAmbientFill}
        />

        {/* Primary flowing wave curve 1 (top-right arc) */}
        <path
          d="M 640 120 C 860 180, 1080 120, 1320 220 C 1410 260, 1450 330, 1440 440"
          stroke="url(#waveGradLight1)"
          strokeWidth="2"
          strokeLinecap="round"
          className={styles.heroWavePath1}
        />

        {/* Secondary sweeping curve 2 (outer orbital arc around sphere) */}
        <path
          d="M 780 40 C 1040 160, 1260 280, 1420 480"
          stroke="url(#waveGradLight2)"
          strokeWidth="1.75"
          strokeLinecap="round"
          filter="url(#softGlow)"
          className={styles.heroWavePath2}
        />

        {/* Lower flowing curve 3 (bottom-right arc) */}
        <path
          d="M 820 440 C 1020 540, 1240 520, 1440 420"
          stroke="url(#waveGradLight3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={styles.heroWavePath3}
        />

        {/* Subtle decorative accent ring behind sphere */}
        <circle
          cx="1060"
          cy="320"
          r="260"
          stroke="url(#waveGradLight1)"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.35"
          className={styles.heroAmbientRing}
        />
      </svg>
    </div>
  );
}

