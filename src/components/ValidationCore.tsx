"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function ValidationCore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values to create a "springy" trailing effect
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Map the smooth mouse position to subtle rotation and translation values
  // These arrays represent the range, e.g., mapping -1 (left edge) to 1 (right edge) to degrees/pixels
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  
  // Outer ring moves slightly less
  const translateXOuter = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateYOuter = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Inner core moves slightly more for a parallax effect
  const translateXInner = useTransform(smoothX, [-1, 1], [-40, 40]);
  const translateYInner = useTransform(smoothY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      style={{
        position: "absolute",
        top: 0,
        right: "-10%",
        width: "600px",
        height: "600px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1000,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Outer Ring / Shield Layer */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            x: translateXOuter,
            y: translateYOuter,
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, rgba(255,255,255,0) 70%)",
            transform: "translateZ(-50px)",
          }}
        />

        {/* Middle Complex Ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: "10%",
            border: "2px dashed rgba(0, 212, 255, 0.3)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            transform: "translateZ(0px)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner Core */}
        <motion.div
          style={{
            position: "absolute",
            inset: "30%",
            x: translateXInner,
            y: translateYInner,
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.4) 0%, rgba(0, 120, 255, 0.1) 100%)",
            borderRadius: "50%",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(0, 212, 255, 0.5)",
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.2)",
            transform: "translateZ(50px)",
          }}
        />
      </motion.div>
    </div>
  );
}
