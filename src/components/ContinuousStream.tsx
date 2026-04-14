"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ContinuousStream() {
  const { scrollY } = useScroll();

  // Dim the data streams as the user scrolls down
  const smoothScroll = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const opacityFade = useTransform(smoothScroll, [0, 300], [0.8, 0]);
  
  // Data streams flowing left to right
  const streams = Array.from({ length: 15 });

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: opacityFade,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      {/* Background Gradient to enhance the stream effect */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, var(--primary-bg) 0%, transparent 20%, transparent 80%, var(--primary-bg) 100%)",
          zIndex: 2,
        }}
      />

      {streams.map((_, i) => {
        // Randomize speed, delay, and width for horizontal flow
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 2;
        const width = 40 + Math.random() * 100;

        return (
          <div 
            key={i} 
            style={{ 
              width: "100%", 
              height: "1px", 
              background: "transparent", 
              position: "relative" 
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                height: "2px",
                width: `${width}px`,
                // Bright lead edge, fading tail
                background: "linear-gradient(to right, transparent 0%, rgba(0, 212, 255, 0.5) 80%, rgba(0, 212, 255, 1) 100%)",
                top: "-0.5px",
                borderRadius: "2px",
                boxShadow: "2px 0 5px rgba(0, 212, 255, 0.8)",
              }}
              animate={{
                // Start completely off screen left, end exactly where the Neural Core is (approx 65vw to 75vw)
                x: ["-20vw", "75vw"],
                opacity: [0, 1, 1, 0], // Fade out right as it hits the core
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeIn", // Speed up as it approaches the model
                delay: delay,
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
