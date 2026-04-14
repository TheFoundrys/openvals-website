"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AmbientGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Fade the grid in and out as user scrolls through the section
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        backgroundSize: "40px 40px",
        backgroundImage: "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    />
  );
}
