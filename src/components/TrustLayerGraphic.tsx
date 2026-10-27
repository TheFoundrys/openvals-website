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
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 9.0,
            repeat: Infinity,
            delay: delay,
            times: [0, 0.49, 0.54, 1],
          }}
          style={{
            fontSize: "9.5px",
            fontWeight: 800,
            color: "#ff4d5a",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(255, 77, 90, 0.6)",
            background: "rgba(10, 15, 29, 0.92)",
            padding: "2px 7px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 77, 90, 0.4)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(6px)",
          }}
        >
          {mode}
        </motion.span>

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

      {/* ── OUTER ORBITAL TECH RING (r = 205px) ── */}
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

      {/* ── SECONDARY OUTER TELEMETRY RING (r = 225px) ── */}
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

      {/* ── ORBITING SENSOR NODES ── */}
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
