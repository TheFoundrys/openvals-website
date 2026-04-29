"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────
   Config
   ────────────────────────────────────────────── */
const SHIELD_RADIUS = 140;
const THREAT_START = 300; // Increased to avoid label overlap

const THREAT_NAMES = [
  "Hallucinations",
  "Manipulation",
  "Bias",
  "Toxicity",
  "Misinformation",
  "Jailbreak Attempts",
  "Prompt Injection",
  "Data Leakage",
  "Behavioral Drift",
  "Overconfidence",
];

/*
  Stream collision points — distributed around the full perimeter 
  to match the multi-directional background streams.
*/
const STREAM_COLLISIONS = [
  { angle: Math.PI, delay: 0 },   // left
  { angle: Math.PI * 0.85, delay: 1.2 },   // lower-left
  { angle: -Math.PI * 0.85, delay: 0.8 },   // upper-left
  { angle: 0, delay: 2.0 },   // right
  { angle: Math.PI * 0.3, delay: 1.5 },   // lower-right
  { angle: -Math.PI * 0.3, delay: 2.8 },   // upper-right
  { angle: -Math.PI * 0.55, delay: 3.2 },   // upper
  { angle: Math.PI * 0.55, delay: 3.8 },   // lower
];

/*
  Threats approach and get deflected — increased to show all modes
*/
const THREAT_ANGLES = THREAT_NAMES.map((_, i) => ({
  angle: (i / THREAT_NAMES.length) * Math.PI * 2 + (Math.random() * 0.5),
  index: i
}));

/* ──────────────────────────────────────────────
   Stream Impact Zone — localized deformation
   triggered when a background stream passes through
   ────────────────────────────────────────────── */
function StreamImpactZone({ angle, delay }: { angle: number; delay: number }) {
  const x = Math.cos(angle) * SHIELD_RADIUS;
  const y = Math.sin(angle) * SHIELD_RADIUS;

  return (
    <>
      {/* Outward bulge / elastic pop */}
      <motion.div
        animate={{
          scale: [0, 2.2, 0.9, 0],
          opacity: [0, 1, 0.5, 0],
        }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          repeatDelay: 3, // Slightly more frequent
          ease: [0.22, 1, 0.36, 1], // Quick expand, slow settle
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
          background: `
radial-gradient(circle,
  #7DD3FC 0%,
  #38BDF8 25%,
  rgba(56,189,248,0.2) 45%,
  transparent 65%
)`,
          zIndex: 17,
          pointerEvents: "none",
        }}
      />

      {/* Localized brightness increase at collision point */}
      <motion.div
        animate={{
          opacity: [0, 1, 0.6, 0],
          scale: [0.5, 1.6, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          delay: delay + 0.05,
          repeat: Infinity,
          repeatDelay: 3,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          left: "50%",
          top: "50%",
          marginLeft: x - 7,
          marginTop: y - 7,
          borderRadius: "50%",
          background: "#fff",
          filter: "blur(4px)",
          zIndex: 18,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   Deflected Threat — bounces off the shield
   ────────────────────────────────────────────── */
function DeflectedThreat({ angle, index }: { angle: number; index: number }) {
  const mode = THREAT_NAMES[index % THREAT_NAMES.length];

  const startX = Math.cos(angle) * THREAT_START;
  const startY = Math.sin(angle) * THREAT_START;
  const hitX = Math.cos(angle) * SHIELD_RADIUS;
  const hitY = Math.sin(angle) * SHIELD_RADIUS;

  const deflectAngle = angle + Math.PI * 0.4; // Slightly tighter bounce
  const deflectX = Math.cos(deflectAngle) * (SHIELD_RADIUS + 150);
  const deflectY = Math.sin(deflectAngle) * (SHIELD_RADIUS + 150);

  return (
    <>
      <motion.div
        initial={{ x: startX, y: startY, opacity: 0 }}
        animate={{
          x: [startX, hitX, hitX, deflectX],
          y: [startY, hitY, hitY, deflectY],
          opacity: [0, 1, 1, 0],
          scale: [1, 1, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 1.5, // Staggered
          ease: "easeInOut",
          times: [0, 0.5, 0.55, 1],
        }}
        style={{
          position: "absolute",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 1.5,
            times: [0, 0.48, 0.52, 1],
          }}
          style={{
            fontSize: "11px",
            fontWeight: 800,
            color: "#e63946",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(255, 71, 87, 0.5)",
            background: "rgba(255,255,255,0.85)",
            padding: "2px 8px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 71, 87, 0.25)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          {mode}
        </motion.span>

        <motion.div
          animate={{
            backgroundColor: ["#ff4757", "#ff4757", "var(--shield-base)", "var(--shield-base)"],
            boxShadow: [
              "0 0 12px #ff4757",
              "0 0 18px #ff4757",
              "0 0 12px var(--shield-base)",
              "0 0 6px var(--shield-base)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 1.5,
            times: [0, 0.48, 0.55, 1],
          }}
          style={{ width: "8px", height: "8px", borderRadius: "50%" }}
        />
      </motion.div>

      {/* Deflection spark */}
      <motion.div
        initial={{ x: hitX, y: hitY, scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.2, 0], opacity: [0, 1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: index * 1.5 + 2, // Fires at the moment of impact (50% of 4s = 2s)
          repeatDelay: 3.5,
        }}
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          marginLeft: -15,
          marginTop: -15,
          borderRadius: "50%",
          border: "1.5px solid var(--shield-base)",
          background: "radial-gradient(circle, rgba(47,128,237,0.3) 0%, transparent 70%)",
          zIndex: 16,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function TrustLayerGraphic() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted || isMobile) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(500px, 80vw)",
        aspectRatio: "1/1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* ── THE SPHERE SHIELD ── */}
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
          background: `radial-gradient(circle at 50% 50%,#1E3A8A 0%,#1E40AF 30%,#1E3A8A 55%,#0B1F4D 75%,#020617 100%)`,
          boxShadow: `
0 0 40px rgba(56,189,248,0.4),
0 0 80px rgba(56,189,248,0.25),
inset 0 0 40px rgba(255,255,255,0.08)
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
              <pattern id="hexGrid" width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="scale(0.75)">
                <path fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth="1" strokeLinejoin="miter"
                  d="M25,21.65 L37.5,0 L62.5,0 L75,21.65 L62.5,43.3 L37.5,43.3 Z" />
                <path fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth="1" strokeLinejoin="miter"
                  d="M-25,21.65 L-12.5,0 L12.5,0 L25,21.65 L12.5,43.3 L-12.5,43.3 Z" />
                <path fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth="1" strokeLinejoin="miter"
                  d="M75,21.65 L87.5,0 L112.5,0 L125,21.65 L112.5,43.3 L87.5,43.3 Z" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexGrid)" />
          </svg>
        </motion.div>
        {/* 🔵 EDGE RING (ADD THIS HERE) */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(56,189,248,0.7)",
          boxShadow: "0 0 10px rgba(56,189,248,0.8),0 0 25px rgba(56,189,248,0.5)",
          zIndex: 6,
        }} />

        {/* 3D Volume */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)",
          zIndex: 3,
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          boxShadow: "inset -15px -15px 40px rgba(0,0,0,0.15), inset 15px 15px 30px rgba(255,255,255,0.1)",
          zIndex: 3,
        }} />

        {/* Center flare */}
        <div style={{
          position: "absolute", width: "40%", height: "40%",
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(47,128,237,0.3) 40%, transparent 100%)",
          filter: "blur(12px)", zIndex: 4,
        }} />
      </div>

      {/* ── STREAM COLLISION DEFORMATIONS (all around) ── */}
      {
        STREAM_COLLISIONS.map((c, i) => (
          <StreamImpactZone key={`stream-impact-${i}`} angle={c.angle} delay={c.delay} />
        ))
      }

      {/* ── DEFLECTED THREATS ── */}
      {
        THREAT_ANGLES.map((t, i) => (
          <DeflectedThreat key={`threat-${i}`} angle={t.angle} index={t.index} />
        ))
      }

      {/* ── SUBTLE PULSE RING ── */}
      <motion.div
        animate={{ scale: [0.85, 1.15], opacity: [0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute", width: "62%", height: "62%",
          border: "1.5px solid var(--shield-base)",
          borderRadius: "50%", zIndex: 4,
        }}
      />
    </div >
  );
}
