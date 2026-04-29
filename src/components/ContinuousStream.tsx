"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

const STREAMS = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 7 + 3) % 17;
  const seed2 = (i * 13 + 5) % 19;
  const seed3 = (i * 11 + 7) % 23;

  const duration = 6 + (seed / 17) * 8;
  const delay = (seed2 / 19) * 6;
  const width = 50 + (seed3 / 23) * 80;
  const verticalPos = 5 + (seed / 17) * 90;
  const fromRight = i % 2 === 0; // Alternate directions
  const label = THREAT_NAMES[i % THREAT_NAMES.length];

  return { duration, delay, width, verticalPos, fromRight, label };
});

export default function ContinuousStream() {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const opacityFade = useTransform(smoothScroll, [0, 300], [0.8, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: opacityFade,
        overflow: "hidden",
      }}
    >
      {STREAMS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${s.verticalPos}%`,
            width: "100%",
            height: "20px",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexDirection: s.fromRight ? "row-reverse" : "row",
            }}
            animate={{
              x: s.fromRight ? ["100vw", "-20vw"] : ["-20vw", "100vw"],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "linear",
              delay: s.delay,
            }}
          >
            {/* Data Ray */}
            <div
              style={{
                height: "2px",
                width: `${s.width}px`,
                background: s.fromRight
                  ? "linear-gradient(to left, transparent 0%, var(--accent) 100%)"
                  : "linear-gradient(to right, transparent 0%, var(--accent) 100%)",
                borderRadius: "2px",
                boxShadow: "0 0 6px var(--accent)",
                opacity: 0.5,
              }}
            />

            {/* Threat Label */}
            <span
              style={{
                fontSize: "10px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                opacity: 0.5,
              }}
            >
              {s.label}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
