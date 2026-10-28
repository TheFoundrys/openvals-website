"use client";

import React, { useMemo } from "react";
import styles from "./ui.module.css";

interface Particle {
  id: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  size: number; // px
  baseOpacity: number;
  zone: "left" | "mid" | "right";
  isBottom: boolean;
  colorVar: string;
  glowVar?: string;
  duration: number; // seconds
  delay: number; // seconds
  animClass: string;
}

export default function HeroParticleField() {
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    let id = 0;

    // Fully deterministic integer Linear Congruential Generator (LCG)
    // Avoids platform-dependent Math.sin() float precision differences between SSR and client
    const pseudo = (seed: number) => {
      const x = (seed * 9301 + 49297) % 233280;
      return x / 233280;
    };

    // 1. LEFT ZONE: Behind and around the headline, subtitle, buttons (x: 2% - 42%)
    const leftCoords: [number, number, number][] = [
      [3, 12, 2.5], [7, 24, 2.5], [4, 42, 3.0], [8, 58, 2.5], [5, 76, 3.0], [9, 90, 2.5],
      [12, 8, 2.5], [15, 22, 3.5], [13, 38, 2.5], [16, 52, 3.0], [14, 68, 2.5], [17, 84, 3.5],
      [21, 14, 3.0], [24, 28, 2.5], [22, 44, 3.5], [25, 60, 2.5], [23, 74, 3.0], [26, 92, 2.5],
      [30, 10, 2.5], [33, 26, 3.5], [31, 40, 2.5], [34, 56, 3.0], [32, 70, 3.5], [35, 86, 2.5],
      [38, 18, 3.5], [40, 34, 3.0], [39, 50, 3.5], [41, 66, 2.5], [40, 82, 3.5], [37, 94, 2.5],
    ];

    leftCoords.forEach(([x, y, size]) => {
      const p = pseudo(id + 1);
      const isCyan = p > 0.35;
      const baseOpacity = Number((0.45 + p * 0.25).toFixed(2));
      const duration = Number((13 + (id % 5) * 2.5).toFixed(1));
      const delay = Number((-((id * 2.1) % duration)).toFixed(1));
      const animType = (id % 4) + 1;
      const animClass =
        animType === 1
          ? styles.heroParticleDrift1
          : animType === 2
          ? styles.heroParticleDrift2
          : animType === 3
          ? styles.heroParticleDrift3
          : styles.heroParticleDrift4;

      list.push({
        id: id++,
        x,
        y,
        size,
        baseOpacity,
        zone: "left",
        isBottom: y > 75,
        colorVar: isCyan ? "var(--hero-part-color-cyan)" : "var(--hero-part-color-pale)",
        duration,
        delay,
        animClass,
      });
    });

    // 2. MIDDLE GAP ZONE: The whitespace connecting left text to right sphere (x: 42% - 64%)
    const midCoords: [number, number, number][] = [
      [44, 12, 3.0], [46, 26, 4.0], [45, 42, 4.5], [47, 58, 3.0], [46, 74, 4.0], [44, 88, 2.5],
      [49, 18, 3.5], [51, 32, 4.5], [50, 48, 3.5], [52, 64, 4.5], [51, 80, 3.0], [49, 94, 3.5],
      [54, 14, 4.0], [56, 28, 3.5], [55, 44, 5.0], [57, 58, 4.0], [56, 72, 4.5], [54, 86, 3.0],
      [59, 20, 4.5], [61, 36, 4.0], [60, 52, 4.5], [62, 68, 3.5], [61, 82, 4.0], [59, 96, 2.5],
      [63, 16, 3.5], [64, 30, 4.5], [63, 46, 4.0], [64, 62, 4.5], [63, 78, 3.0], [64, 90, 4.0],
    ];

    midCoords.forEach(([x, y, size]) => {
      const p = pseudo(id + 1);
      const isBright = p > 0.35;
      const baseOpacity = Number((0.55 + p * 0.30).toFixed(2));
      const duration = Number((14 + (id % 4) * 3).toFixed(1));
      const delay = Number((-((id * 1.9) % duration)).toFixed(1));
      const animType = (id % 4) + 1;
      const animClass =
        animType === 1
          ? styles.heroParticleDrift1
          : animType === 2
          ? styles.heroParticleDrift2
          : animType === 3
          ? styles.heroParticleDrift3
          : styles.heroParticleDrift4;

      list.push({
        id: id++,
        x,
        y,
        size,
        baseOpacity,
        zone: "mid",
        isBottom: y > 75,
        colorVar: isBright ? "var(--hero-part-color-mid)" : "var(--hero-part-color-cyan)",
        glowVar: isBright ? "var(--hero-part-glow-mid)" : undefined,
        duration,
        delay,
        animClass,
      });
    });

    // 3. RIGHT ZONE: Concentrated around the sphere and orbital paths (x: 65% - 98%)
    const rightCoords: [number, number, number][] = [
      [66, 12, 3.5], [68, 26, 4.5], [67, 72, 4.0], [69, 86, 3.0],
      [71, 10, 4.0], [73, 22, 5.0], [72, 78, 3.5], [74, 92, 4.5],
      [77, 8, 3.0],  [79, 20, 5.5], [78, 80, 4.5], [80, 94, 3.0],
      [83, 14, 4.5], [85, 26, 4.0], [84, 76, 5.0], [86, 88, 3.5],
      [88, 10, 3.5], [90, 22, 5.0], [89, 74, 4.0], [91, 86, 4.5],
      [93, 16, 3.0], [95, 30, 4.0], [94, 68, 4.5], [96, 82, 3.0],
      [97, 24, 3.5], [98, 44, 4.0], [97, 60, 3.5], [98, 76, 4.0],
      [88, 40, 4.0], [92, 52, 4.5], [90, 62, 3.5], [85, 68, 4.0],
      [70, 40, 4.0], [72, 60, 3.5], [67, 54, 4.5], [75, 48, 3.5],
    ];

    rightCoords.forEach(([x, y, size]) => {
      const p = pseudo(id + 1);
      const isCyan = p > 0.3;
      const baseOpacity = Number((0.55 + p * 0.35).toFixed(2));
      const duration = Number((13 + (id % 5) * 2.8).toFixed(1));
      const delay = Number((-((id * 2.2) % duration)).toFixed(1));
      const animType = (id % 4) + 1;
      const animClass =
        animType === 1
          ? styles.heroParticleDrift1
          : animType === 2
          ? styles.heroParticleDrift2
          : animType === 3
          ? styles.heroParticleDrift3
          : styles.heroParticleDrift4;

      list.push({
        id: id++,
        x,
        y,
        size,
        baseOpacity,
        zone: "right",
        isBottom: y > 75,
        colorVar: isCyan ? "var(--hero-part-color-cyan)" : "var(--hero-part-color-pale)",
        duration,
        delay,
        animClass,
      });
    });

    return list;
  }, []);

  return (
    <div
      className={styles.heroParticleField}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* ── FLOWING TELEMETRY STREAMS BRIDGING LEFT TEXT TO RIGHT SPHERE ── */}
      <svg
        className={styles.heroStreamsSvg}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#00f0ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="streamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.05" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="streamGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#7dd3fc" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
          </linearGradient>

          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stream Curve 1: Upper trajectory flowing from headline towards sphere */}
        <path
          d="M 520 280 C 780 240, 1020 320, 1260 380"
          fill="none"
          stroke="var(--hero-stream-stroke-1)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          filter="var(--hero-stream-glow, none)"
        />

        {/* Stream Curve 2: Center trajectory sweeping across the central gap */}
        <path
          d="M 560 440 C 820 410, 1060 460, 1240 430"
          fill="none"
          stroke="var(--hero-stream-stroke-2)"
          strokeWidth="1.25"
          strokeDasharray="4 6"
        />

        {/* Stream Curve 3: Lower trajectory flowing up toward the trust shield */}
        <path
          d="M 500 580 C 760 620, 1040 560, 1280 490"
          fill="none"
          stroke="var(--hero-stream-stroke-3)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          filter="var(--hero-stream-glow, none)"
        />

        {/* Constellation connectors across middle gap */}
        <line x1="840" y1="360" x2="980" y2="420" stroke="var(--hero-connector-line)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="980" y1="420" x2="1120" y2="380" stroke="var(--hero-connector-line)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="980" y1="420" x2="1050" y2="520" stroke="var(--hero-connector-line)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="1050" y1="520" x2="1190" y2="460" stroke="var(--hero-connector-line)" strokeWidth="1" strokeDasharray="4 5" />

        {/* ── TRAVELING CYAN DATA PACKETS / MOVING POINTS ── */}
        {/* Packet 1 on Curve 1 */}
        <circle r="4" fill="var(--hero-stream-packet-1)" filter="var(--hero-stream-glow, none)">
          <animateMotion
            path="M 520 280 C 780 240, 1020 320, 1260 380"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Packet 1b on Curve 1 trailing */}
        <circle r="3" fill="var(--hero-stream-packet-trailing)" filter="var(--hero-stream-glow, none)">
          <animateMotion
            path="M 520 280 C 780 240, 1020 320, 1260 380"
            dur="6s"
            begin="-3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Packet 2 on Curve 2 */}
        <circle r="4.5" fill="var(--hero-stream-packet-2)">
          <animateMotion
            path="M 560 440 C 820 410, 1060 460, 1240 430"
            dur="7.5s"
            begin="-1.5s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Packet 2b on Curve 2 */}
        <circle r="3" fill="var(--hero-stream-packet-1)">
          <animateMotion
            path="M 560 440 C 820 410, 1060 460, 1240 430"
            dur="7.5s"
            begin="-5.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Packet 3 on Curve 3 */}
        <circle r="4.5" fill="var(--hero-stream-packet-1)" filter="var(--hero-stream-glow, none)">
          <animateMotion
            path="M 500 580 C 760 620, 1040 560, 1280 490"
            dur="6.8s"
            begin="-3.8s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Packet 3b on Curve 3 */}
        <circle r="3" fill="var(--hero-stream-packet-trailing)" filter="var(--hero-stream-glow, none)">
          <animateMotion
            path="M 500 580 C 760 620, 1040 560, 1280 490"
            dur="6.8s"
            begin="-0.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* ── RENDER DISTRIBUTED PARTICLES ACROSS ENTIRE HERO ── */}
      {particles.map((p) => {
        // Theme-aware multiplier based on position:
        // Left zone uses --hero-part-left-opacity-mult
        // Mid zone uses --hero-part-mid-opacity-mult
        // Right zone uses --hero-part-right-opacity-mult
        // Bottom particles (y > 75%) additionally dimmed via --hero-part-bottom-opacity-mult
        const multVar = p.isBottom
          ? "var(--hero-part-bottom-opacity-mult, 0.4)"
          : p.zone === "left"
          ? "var(--hero-part-left-opacity-mult, 0.5)"
          : p.zone === "mid"
          ? "var(--hero-part-mid-opacity-mult, 0.8)"
          : "var(--hero-part-right-opacity-mult, 1)";

        return (
          <div
            key={p.id}
            suppressHydrationWarning
            className={`${styles.heroParticle} ${p.animClass}`}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              backgroundColor: p.colorVar,
              opacity: `calc(${p.baseOpacity} * ${multVar})`,
              boxShadow: p.glowVar,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}
