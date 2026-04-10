"use client";

import { motion } from "framer-motion";

export default function NeuralCore() {
  // Floating nodes inside the orb to represent Neural Networks
  const nodes = Array.from({ length: 15 });

  return (
    <div 
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
        aspectRatio: "1/1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Central "AI Orb" Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "80%",
          height: "80%",
          zIndex: 10,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(240,249,255,0.4) 40%, rgba(0,212,255,0.05) 80%, transparent 100%)",
          boxShadow: "inset -20px -20px 40px rgba(0, 212, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Pulsing inner glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Floating Neural Nodes inside the Orb */}
        {nodes.map((_, i) => {
          // Keep nodes mostly contained within the circle
          const top = `${20 + Math.random() * 60}%`;
          const left = `${20 + Math.random() * 60}%`;
          const size = 3 + Math.random() * 6;
          
          return (
            <motion.div
              key={`node-${i}`}
              style={{
                position: "absolute",
                top,
                left,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 212, 255, 0.8)",
                boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
              }}
              animate={{
                y: [0, -15, 0, 10, 0],
                x: [0, 10, -5, 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
