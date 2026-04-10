"use client";

import { motion } from "framer-motion";

export default function AmbientBlobs() {
  return (
    <div 
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Heavy blur filter layer */}
      <div style={{
        position: "absolute",
        inset: "-50px",
        backdropFilter: "blur(80px)",
        WebkitBackdropFilter: "blur(80px)",
        zIndex: 2,
      }} />

      {/* Blue Blob */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          maxHeight: "500px",
          maxWidth: "500px",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(0, 120, 255, 0.1) 70%, transparent 100%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan Blob */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "35vw",
          height: "35vw",
          maxHeight: "400px",
          maxWidth: "400px",
          background: "radial-gradient(circle, rgba(167, 243, 208, 0.4) 0%, rgba(56, 189, 248, 0.1) 70%, transparent 100%)",
          borderRadius: "50%",
          zIndex: 1,
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
