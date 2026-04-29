"use client";

import { motion, Variants } from "framer-motion";
import styles from "../components/ui.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AmbientGrid from "../components/AmbientGrid";
import { HeroPart, FailsPart } from "../components/TrustSection";
import { ServicesPart, PillarsPart } from "../components/ServicesPillars";
import Link from "next/link";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className={styles.snapContainer}>
      <Header />

      <main>
        {/* SECTION 1: TRUST LAYER + AI FAILS QUIETLY */}
        <section className={styles.snapSection} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding)" }}>
          <AmbientGrid />
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div className={styles.scaledContent}>
              <HeroPart />
            </div>
            <div className={`${styles.scaledContent} ${styles.desktopOnly}`}>
              <FailsPart />
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR SERVICES + OUR CORE PILLARS */}
        <section className={styles.snapSection} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding)", background: "var(--secondary-bg)" }}>
          <AmbientGrid />
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div className={styles.scaledContent}>
              <ServicesPart />
            </div>
            <div className={styles.scaledContent}>
              <PillarsPart />
            </div>
          </div>
        </section>

        {/* SECTION 3: START YOUR VALIDATION (CTA) + FOOTER */}
        <section className={styles.snapSection} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding) 0" }}>
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.div 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }} 
                variants={STAGGER}
                className={styles.scaledContent}
                style={{ textAlign: "center", padding: "clamp(30px, 5vw, 60px)", borderRadius: "32px", backgroundColor: "var(--secondary-bg)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
              >
                <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(28px, 4vw, 56px)", marginBottom: "20px", fontWeight: 800 }}>
                  Ready to Validate Your AI?
                </motion.h2>
                <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
                  Don&apos;t leave your AI to chance. Get a comprehensive audit and ensure your systems are production-ready.
                </motion.p>
                <motion.div variants={FADE_UP}>
                  <Link href="/contact" className={`${styles.button} ${styles.primary}`} style={{ padding: "16px 40px", fontSize: "16px" }}>
                    Start Your Validation Now &rarr;
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}
