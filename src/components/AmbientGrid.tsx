"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AmbientGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Keep ambient grid visibly present at top and gently fade on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.85, 0.25]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        backgroundSize: "44px 44px",
        backgroundImage: "radial-gradient(circle, var(--grid-dot) 1.2px, transparent 1.2px)",
        maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
      }}
    />
  );
}
