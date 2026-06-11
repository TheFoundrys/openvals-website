"use client";

import { motion, Variants } from "framer-motion";
import styles from "../components/ui.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AmbientGrid from "../components/AmbientGrid";
import { ActionButtonsPart, HeroPart } from "../components/TrustSection";
import { ServicesPart, PillarsPart } from "../components/ServicesPillars";
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
        <section className={styles.snapSection} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding)" }}>
          <AmbientGrid />
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div className={styles.scaledContent}>
              <HeroPart />
            </div>
            <div className={styles.scaledContent}>
              <ActionButtonsPart />
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR SERVICES + OUR CORE PILLARS */}
        <section id="services" className={styles.snapSection} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding)", background: "var(--secondary-bg)" }}>
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

        {/* SECTION 3: PROOF + PACKAGES + LEAD MAGNET */}
        <section className={`${styles.snapSection} ${styles.snapSectionAuto}`} style={{ padding: "clamp(40px, 8vh, 80px) var(--container-padding) 0" }}>
          <div className={`${styles.containerFull} ${styles.snapInner}`}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.div 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }} 
                variants={STAGGER}
                className={styles.scaledContent}
                style={{ padding: "clamp(20px, 3vw, 34px)", borderRadius: "16px", backgroundColor: "var(--secondary-bg)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
              >
                <motion.div variants={FADE_UP}>
                  <HomepageConversionStack />
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
