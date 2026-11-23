"use client";

import { motion, Variants } from "framer-motion";
import styles from "../components/ui.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import RealWorldBenchmarks from "../components/RealWorldBenchmarks";
import LatestReports from "../components/LatestReports";
import { HeroPart, ActionButtonsPart } from "../components/TrustSection";
import { HomepageConversionStack } from "../components/ConversionPage";

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
        <section
          className={`${styles.snapSection} ${styles.snapSectionAuto} ${styles.snapSectionHero}`}
          style={{ padding: "clamp(18px, 2.2vh, 28px) 0 clamp(12px, 2vh, 20px)", background: "var(--primary-bg)" }}
        >
          <div
            className={`${styles.layoutShell} ${styles.containerFull} ${styles.snapInner} ${styles.heroSectionInner}`}
          >
            <HeroPart />
            <ActionButtonsPart />
          </div>
        </section>

        {/* SECTION 2: REAL-WORLD AI BENCHMARKS LEADERBOARD & LATEST REPORTS */}
        <section id="benchmarks" className={`${styles.snapSection} ${styles.snapSectionAuto}`} style={{ padding: "clamp(20px, 3vh, 32px) 0 clamp(24px, 4vh, 40px)", background: "var(--primary-bg)" }}>
          <div className={`${styles.layoutShell} ${styles.containerFull} ${styles.snapInner}`}>
            <div className={styles.scaledContent}>
              <RealWorldBenchmarks />
              <LatestReports />
            </div>
          </div>
        </section>

        {/* SECTION 3: PROOF + PACKAGES + LEAD MAGNET */}
        <section className={`${styles.snapSection} ${styles.snapSectionAuto}`} style={{ padding: "clamp(32px, 5vh, 48px) 0 0" }}>
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div className={styles.layoutShell} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", minWidth: 0, boxSizing: "border-box" }}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={STAGGER}
                className={styles.scaledContent}
                style={{
                  padding: "clamp(14px, 2.5vw, 24px)",
                  borderRadius: "5px",
                  backgroundColor: "var(--secondary-bg)",
                  border: "1px solid var(--border)",
                  boxShadow: "none",
                  width: "100%",
                  maxWidth: "100%",
                  margin: 0,
                  minWidth: 0,
                  boxSizing: "border-box",
                }}
              >
                <motion.div variants={FADE_UP} style={{ width: "100%", minWidth: 0 }}>
                  <HomepageConversionStack />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
