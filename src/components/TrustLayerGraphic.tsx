"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────
   Config
   ────────────────────────────────────────────── */
const SHIELD_RADIUS = 165;
const THREAT_START = 205; // Contained cleanly within the 205px orbital perimeter

const THREAT_NAMES = [
  "Hallucinations",
  "Prompt Injection",
  "Data Leakage",
  "Bias & Drift",
  "Toxicity",
  "Misinformation",
  "Jailbreak Attempts",
  "Manipulation",
  "Model Extraction",
  "Adversarial Attacks",
  "Overconfidence",
  "Sycophancy",
];

/*
  Stream collision points around perimeter
*/
const STREAM_COLLISIONS = [
  { angle: Math.PI, delay: 0 },          // left
  { angle: Math.PI * 0.82, delay: 1.8 },  // lower-left
  { angle: -Math.PI * 0.82, delay: 1.0 }, // upper-left
  { angle: 0, delay: 3.2 },              // right
  { angle: Math.PI * 0.35, delay: 2.2 },  // lower-right
  { angle: -Math.PI * 0.35, delay: 4.0 }, // upper-right
  { angle: -Math.PI * 0.55, delay: 5.0 }, // upper
  { angle: Math.PI * 0.55, delay: 6.0 },  // lower
];

/*
  Threat angles distributed cleanly around the perimeter
*/
const THREAT_ANGLES = THREAT_NAMES.map((_, i) => ({
  angle: (i / THREAT_NAMES.length) * Math.PI * 2 - Math.PI * 0.25,
  index: i,
}));

/* ──────────────────────────────────────────────
   Stream Impact Zone — localized deformation & flare
   ────────────────────────────────────────────── */
function StreamImpactZone({ angle, delay }: { angle: number; delay: number }) {
  const x = Math.cos(angle) * SHIELD_RADIUS;
  const y = Math.sin(angle) * SHIELD_RADIUS;

  // Incoming beam start coordinates (outer perimeter)
  const beamStartX = Math.cos(angle) * (SHIELD_RADIUS + 36);
  const beamStartY = Math.sin(angle) * (SHIELD_RADIUS + 36);

  return (
    <>
      {/* Incoming high-speed threat beam vector */}
      <motion.div
        animate={{
          opacity: [0, 0.85, 0],
          scaleX: [0.2, 1, 0.4],
        }}
        transition={{
          duration: 3.8,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 6.5,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 36,
          height: 2,
          marginLeft: (beamStartX + x) / 2 - 18,
          marginTop: (beamStartY + y) / 2 - 1,
          transform: `rotate(${angle + Math.PI}rad)`,
          background: "linear-gradient(90deg, rgba(239, 68, 68, 0.85), rgba(56, 189, 248, 0.95))",
          boxShadow: "0 0 8px rgba(56, 189, 248, 0.7)",
          zIndex: 14,
          pointerEvents: "none",
        }}
      />

      {/* Outward bulge / elastic pop */}
      <motion.div
        animate={{
          scale: [0, 2.2, 0.9, 0],
          opacity: [0, 1, 0.5, 0],
        }}
        transition={{
          duration: 3.4,
          delay: delay + 1.2,
          repeat: Infinity,
          repeatDelay: 6.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          left: "50%",
          top: "50%",
          marginLeft: x - 25,
          marginTop: y - 25,
          borderRadius: "50%",
          background: `radial-gradient(circle, #7DD3FC 0%, #38BDF8 28%, rgba(56,189,248,0.25) 50%, transparent 70%)`,
          zIndex: 17,
          pointerEvents: "none",
        }}
      />

      {/* Localized brightness flare at collision point */}
      <motion.div
        animate={{
          opacity: [0, 1, 0.6, 0],
          scale: [0.5, 1.8, 1, 0.5],
        }}
        transition={{
          duration: 3.4,
          delay: delay + 1.25,
          repeat: Infinity,
          repeatDelay: 6.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          left: "50%",
          top: "50%",
          marginLeft: x - 8,
          marginTop: y - 8,
          borderRadius: "50%",
          background: "#ffffff",
          filter: "blur(4px)",
          boxShadow: "0 0 14px #38bdf8",
          zIndex: 18,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   Deflected Threat — approaches shield, deflects, dissolves
   ────────────────────────────────────────────── */
function DeflectedThreat({ angle, index }: { angle: number; index: number }) {
  const mode = THREAT_NAMES[index % THREAT_NAMES.length];

  const startX = Math.cos(angle) * THREAT_START;
  const startY = Math.sin(angle) * THREAT_START;
  const hitX = Math.cos(angle) * SHIELD_RADIUS;
  const hitY = Math.sin(angle) * SHIELD_RADIUS;

  const deflectAngle = angle + (index % 2 === 0 ? 0.42 : -0.42);
  const deflectX = Math.cos(deflectAngle) * (SHIELD_RADIUS + 44);
  const deflectY = Math.sin(deflectAngle) * (SHIELD_RADIUS + 44);

  // Calm, steady pacing so threats glide gracefully and text is easily readable
  const delay = (index % 4) * 2.25 + Math.floor(index / 4) * 0.85;

  // Staggered floating movement (4 to 8 pixels gentle organic bobbing)
  const floatDistance = 4.5 + ((index * 3) % 4) * 1.2; // 4.5px, 5.7px, 6.9px, 8.1px
  const floatDuration = 2.8 + ((index * 7) % 5) * 0.35; // 2.8s, 3.15s, 3.5s, 3.85s, 4.2s
  const floatDelay = ((index * 11) % 7) * 0.3; // Asynchronous start offset
  const lateralSway = index % 2 === 0 ? 3 : -3;

  // Staggered security monitoring pulse cycle
  const pulseDelay = (index * 0.7) % 2.8;

  return (
    <>
      <motion.div
        initial={{ x: startX, y: startY, opacity: 0 }}
        animate={{
          x: [startX, hitX, hitX, deflectX],
          y: [startY, hitY, hitY, deflectY],
          opacity: [0, 1, 1, 0],
          scale: [0.92, 1, 1, 0.55],
        }}
        transition={{
          duration: 9.0,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
          times: [0, 0.5, 0.56, 1],
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          pointerEvents: "none",
        }}
      >
        {/* Subtle, staggered floating container for gentle 4-8px movement and lateral sway */}
        <motion.div
          animate={{
            y: [0, -floatDistance, floatDistance * 0.5, 0],
            x: [0, lateralSway, -lateralSway * 0.5, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            delay: floatDelay,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <motion.span
            animate={{
              opacity: [1, 1, 0, 0],
              borderColor: [
                "var(--hero-label-border)",
                "var(--hero-label-border)",
                "var(--hero-label-border-pulse)",
                "var(--hero-label-border)",
              ],
            }}
            transition={{
              opacity: {
                duration: 9.0,
                repeat: Infinity,
                delay: delay,
                times: [0, 0.49, 0.54, 1],
              },
              borderColor: {
                duration: 3.5,
                repeat: Infinity,
                delay: pulseDelay,
                ease: "easeInOut",
              },
            }}
            style={{
              fontSize: "10px",
              fontWeight: 800,
              color: "var(--hero-label-text)",
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              whiteSpace: "nowrap",
              background: "var(--hero-label-bg)",
              padding: "2.5px 8px",
              borderRadius: "4px",
              border: "1.5px solid var(--hero-label-border)",
              boxShadow: "var(--hero-label-shadow)",
              backdropFilter: "blur(8px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {/* Tiny security status indicator dot with bright pulse flash */}
            <motion.span
              animate={{
                backgroundColor: [
                  "var(--hero-label-dot)",
                  "var(--hero-label-dot)",
                  "var(--hero-label-dot-flash)",
                  "var(--hero-label-dot)",
                ],
                scale: [1, 1, 1.7, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: pulseDelay,
                ease: "easeInOut",
              }}
              style={{
                width: "4.5px",
                height: "4.5px",
                borderRadius: "50%",
                display: "inline-block",
                backgroundColor: "var(--hero-label-dot)",
              }}
            />
            {mode}
          </motion.span>
        </motion.div>

        <motion.div
          animate={{
            backgroundColor: ["#ff4757", "#ff4757", "#38bdf8", "#38bdf8"],
            boxShadow: [
              "0 0 10px #ff4757",
              "0 0 18px #ff4757",
              "0 0 14px #38bdf8",
              "0 0 6px #38bdf8",
            ],
          }}
          transition={{
            duration: 9.0,
            repeat: Infinity,
            delay: delay,
            times: [0, 0.49, 0.56, 1],
          }}
          style={{ width: "7px", height: "7px", borderRadius: "50%" }}
        />
      </motion.div>

      {/* Deflection spark and shockwave at collision point */}
      <motion.div
        animate={{ scale: [0, 2.4, 0], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: delay + 4.5,
          repeatDelay: 7.8,
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: hitX - 15,
          marginTop: hitY - 15,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "2px solid #38bdf8",
          background: "radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)",
          boxShadow: "0 0 18px rgba(56, 189, 248, 0.8)",
          zIndex: 16,
          pointerEvents: "none",
        }}
      />

      {/* Deflected ricochet spark */}
      <motion.div
        animate={{
          x: [hitX, deflectX * 1.08],
          y: [hitY, deflectY * 1.08],
          opacity: [0, 0.9, 0],
          scale: [1, 0.2],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          delay: delay + 4.6,
          repeatDelay: 6.4,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#38bdf8",
          boxShadow: "0 0 8px #38bdf8",
          zIndex: 16,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   Main Component — Responsive on all devices
   ────────────────────────────────────────────── */
export default function TrustLayerGraphic() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "460px",
        aspectRatio: "1/1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        userSelect: "none",
        transform: "scale(var(--graphic-scale, 1))",
        transformOrigin: "center center",
      }}
    >
      {/* ── AMBIENT BACKDROP GLOW (Soft cyan/blue fill) ── */}
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.28) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
          filter: "blur(28px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── ADDITIONAL INNER-MID ORBITAL PATH (r = 186px, d = 372px) ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "372px",
          height: "372px",
          borderRadius: "50%",
          border: "1px solid rgba(125, 211, 252, 0.16)",
          zIndex: 2,
        }}
      >
        {/* Orbiting particles along inner-mid path */}
        <div
          style={{
            position: "absolute",
            top: -2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#7dd3fc",
            boxShadow: "0 0 8px rgba(56, 189, 248, 0.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#38bdf8",
            opacity: 0.8,
            boxShadow: "0 0 5px rgba(56, 189, 248, 0.6)",
          }}
        />
      </motion.div>

      {/* ── EXISTING OUTER ORBITAL TECH RING (r = 205px) ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "410px",
          height: "410px",
          borderRadius: "50%",
          border: "1px dashed rgba(56, 189, 248, 0.22)",
          zIndex: 2,
        }}
      />

      {/* ── SOFT SCANNING PULSE AROUND 410px RING ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "410px",
          height: "410px",
          borderRadius: "50%",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="410" height="410" viewBox="0 0 410 410" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="scanPulseGrad410" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 205 0 A 205 205 0 0 1 370 100"
            fill="none"
            stroke="url(#scanPulseGrad410)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="drop-shadow(0 0 4px #38bdf8)"
          />
          <circle cx="205" cy="0" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 6px #38bdf8)" />
        </svg>
      </motion.div>

      {/* ── EXISTING SECONDARY OUTER TELEMETRY RING (r = 225px) ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          border: "1px dotted rgba(56, 189, 248, 0.12)",
          zIndex: 2,
        }}
      />

      {/* ── SOFT SCANNING PULSE AROUND 450px RING ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg width="450" height="450" viewBox="0 0 450 450" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="scanPulseGrad450" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 225 450 A 225 225 0 0 1 70 380"
            fill="none"
            stroke="url(#scanPulseGrad450)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="drop-shadow(0 0 4px #38bdf8)"
          />
          <circle cx="225" cy="450" r="2" fill="#7dd3fc" filter="drop-shadow(0 0 5px #38bdf8)" />
        </svg>
      </motion.div>

      {/* ── EXPANSIVE ELLIPTICAL SVG ORBIT PATHS & TRAVELING CYAN PARTICLES ── */}
      <svg
        style={{
          position: "absolute",
          width: "680px",
          height: "680px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
        }}
        viewBox="0 0 680 680"
      >
        <defs>
          <linearGradient id="orbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="orbGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="orbGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.7" />
          </linearGradient>

          <filter id="orbGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── ORBIT ELLIPSE 1 (Tilted -28deg, rx=270, ry=125) ── */}
        <g transform="rotate(-28 340 340)">
          <ellipse
            id="orbitPath1"
            cx="340"
            cy="340"
            rx="270"
            ry="125"
            fill="none"
            stroke="var(--hero-orbit-stroke-1)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            filter="var(--hero-orbit-filter, none)"
          />

          {/* Soft scanning pulse sweeping along Path 1 */}
          <path
            d="M 610 340 A 270 125 0 0 1 340 465"
            fill="none"
            stroke="var(--hero-orbit-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
            filter="var(--hero-orbit-filter, none)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 340 340"
              to="360 340 340"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>

          {/* Traveling cyan particle 1A */}
          <circle r="4.5" fill="var(--hero-orbit-particle-1)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 610 340 A 270 125 0 1 0 70 340 A 270 125 0 1 0 610 340"
              dur="18s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Traveling particle 1B */}
          <circle r="3" fill="var(--hero-orbit-particle-white)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 610 340 A 270 125 0 1 0 70 340 A 270 125 0 1 0 610 340"
              dur="18s"
              begin="-9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ── ORBIT ELLIPSE 2 (Tilted +32deg, rx=290, ry=140) ── */}
        <g transform="rotate(32 340 340)">
          <ellipse
            id="orbitPath2"
            cx="340"
            cy="340"
            rx="290"
            ry="140"
            fill="none"
            stroke="var(--hero-orbit-stroke-2)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            filter="var(--hero-orbit-filter, none)"
          />

          {/* Traveling cyan particle 2A (counter-clockwise) */}
          <circle r="5" fill="var(--hero-orbit-particle-2)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 630 340 A 290 140 0 1 1 50 340 A 290 140 0 1 1 630 340"
              dur="24s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Traveling particle 2B */}
          <circle r="3.5" fill="var(--hero-orbit-particle-1)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 630 340 A 290 140 0 1 1 50 340 A 290 140 0 1 1 630 340"
              dur="24s"
              begin="-12s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ── ORBIT ELLIPSE 3 (Tilted -8deg, expansive rx=320, ry=165) ── */}
        <g transform="rotate(-8 340 340)">
          <ellipse
            id="orbitPath3"
            cx="340"
            cy="340"
            rx="320"
            ry="165"
            fill="none"
            stroke="var(--hero-orbit-stroke-3)"
            strokeWidth="1.25"
            strokeDasharray="4 10"
            filter="var(--hero-orbit-filter, none)"
          />

          {/* Traveling cyan particle 3A */}
          <circle r="4.5" fill="var(--hero-orbit-particle-1)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 660 340 A 320 165 0 1 0 20 340 A 320 165 0 1 0 660 340"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Traveling particle 3B */}
          <circle r="3" fill="var(--hero-orbit-particle-white)" filter="var(--hero-orbit-filter, none)">
            <animateMotion
              path="M 660 340 A 320 165 0 1 0 20 340 A 320 165 0 1 0 660 340"
              dur="30s"
              begin="-15s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>

      {/* ── EXISTING ORBITING SENSOR NODES ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "410px",
          height: "410px",
          borderRadius: "50%",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -3,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#38bdf8",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -3,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38bdf8",
            boxShadow: "0 0 8px #38bdf8",
          }}
        />
      </motion.div>

      {/* ── THE SPHERE SHIELD (Exact 330px diameter = 165px radius) ── */}
      <div
        style={{
          position: "relative",
          width: SHIELD_RADIUS * 2,
          height: SHIELD_RADIUS * 2,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
          background: `radial-gradient(circle at 50% 50%, #1E3A8A 0%, #1E40AF 30%, #1E3A8A 55%, #0B1F4D 75%, #020617 100%)`,
          boxShadow: `
            0 0 35px rgba(56, 189, 248, 0.45),
            0 0 70px rgba(56, 189, 248, 0.22),
            inset 0 0 35px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Hexagonal Grid */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: "150%", height: "150%", zIndex: 2 }}
        >
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            <defs>
              <pattern
                id="hexGridShield"
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
            <rect width="100%" height="100%" fill="url(#hexGridShield)" />
          </svg>
        </motion.div>

        {/* 🔵 EDGE RING */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(56,189,248,0.75)",
            boxShadow: "0 0 10px rgba(56,189,248,0.85), 0 0 25px rgba(56,189,248,0.5)",
            zIndex: 6,
          }}
        />

        {/* 3D Volume Highlights */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)",
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "inset -18px -18px 40px rgba(0,0,0,0.2), inset 18px 18px 30px rgba(255,255,255,0.12)",
            zIndex: 3,
          }}
        />

        {/* Center Flare */}
        <div
          style={{
            position: "absolute",
            width: "42%",
            height: "42%",
            background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(47,128,237,0.35) 45%, transparent 100%)",
            filter: "blur(12px)",
            zIndex: 4,
          }}
        />
      </div>

      {/* ── STREAM COLLISION DEFORMATIONS (Perimeter Bulges) ── */}
      {STREAM_COLLISIONS.map((c, i) => (
        <StreamImpactZone key={`stream-impact-${i}`} angle={c.angle} delay={c.delay} />
      ))}

      {/* ── DEFLECTED THREATS ── */}
      {THREAT_ANGLES.map((t, i) => (
        <DeflectedThreat key={`threat-${i}`} angle={t.angle} index={t.index} />
      ))}

      {/* ── EXPANDING PULSE WAVE ── */}
      <motion.div
        animate={{ scale: [1, 1.22], opacity: [0.45, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: SHIELD_RADIUS * 2 + 8,
          height: SHIELD_RADIUS * 2 + 8,
          border: "1.5px solid rgba(56, 189, 248, 0.5)",
          borderRadius: "50%",
          zIndex: 4,
        }}
      />
    </div>
  );
}
