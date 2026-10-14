"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Check,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./pricing.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <motion.div initial="hidden" animate="show" variants={STAGGER}>
              <motion.div variants={FADE_UP} className={styles.badgePill}>
                <Shield size={14} /> OpenVals Trust &amp; Assurance Plans
              </motion.div>

              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Transparent Pricing. <br />
                <span className={styles.heroGradientText}>From OpenVals Free to OpenVals Enterprise.</span>
              </motion.h1>

              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                Deploy audit-grade AI validation, automated red teaming, and regulatory compliance.
                Start free with our open-source engine, or scale with enterprise security guarantees.
              </motion.p>

              {/* PRICING CARDS */}
              <div className={styles.pricingGrid}>
                {/* 1. OPENVALS FREE */}
                <div className={styles.pricingCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.planName}>OpenVals Free</div>
                    <div className={styles.planDescription}>
                      For researchers, developers, and engineers benchmarking models locally.
                    </div>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$0</span>
                    <span className={styles.pricePeriod}>/ 15 days trial</span>
                  </div>

                  <Link 
                    href="https://dev.openvalidations.com/signup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
                  >
                    Start Free Trial <ArrowRight size={16} />
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Recommendation: 5</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Validation: 2</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Trial: 15 days</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Assessment: 01</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Users: 05</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Storage: Unlimited</span>
                    </li>
                  </ul>
                </div>

                {/* 2. OPENVALS PRO (MOST POPULAR) */}
                <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
                  <div className={styles.popularBadge}>Recommended Plan</div>
                  <div className={styles.cardHeader}>
                    <div className={styles.planName}>OpenVals Pro</div>
                    <div className={styles.planDescription}>
                      For engineering teams running automated AI validation and regression in CI/CD.
                    </div>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$49</span>
                    <span className={styles.pricePeriod}>/ month</span>
                  </div>

                  <Link 
                    href="https://dev.openvalidations.com/signup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
                  >
                    Start Pro Trial <ArrowRight size={16} />
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Recommendation: 15</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Validation: 6</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Trial: 30 days</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Assessment: 03</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Users: 15</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Storage: Unlimited</span>
                    </li>
                  </ul>
                </div>

                {/* 3. OPENVALS ENTERPRISE */}
                <div className={styles.pricingCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.planName}>OpenVals Enterprise</div>
                    <div className={styles.planDescription}>
                      For regulated enterprises requiring custom red-teaming, audits, and sovereign VPC deployment.
                    </div>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>Custom</span>
                    <span className={styles.pricePeriod}>/ tailored to scale</span>
                  </div>

                  <Link href="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}>
                    Talk to Sales <ArrowRight size={16} />
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Recommendation: Custom</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Validation: Custom</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Trial: Custom</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Assessment: Custom</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Users: Custom</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>Storage: Unlimited</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* GUARANTEE PILLARS */}
              <div className={styles.guaranteeSection}>
                <div className={styles.guaranteeGrid}>
                  <div className={styles.guaranteeItem}>
                    <div className={styles.guaranteeIconWrap}>
                      <Lock size={22} />
                    </div>
                    <div>
                      <div className={styles.guaranteeTitle}>100% Data Sovereignty</div>
                      <div className={styles.guaranteeText}>
                        Zero data retention. Your prompts, weights, and evaluation outputs are processed statelessly and never stored or used for training.
                      </div>
                    </div>
                  </div>

                  <div className={styles.guaranteeItem}>
                    <div className={styles.guaranteeIconWrap}>
                      <FileCheck size={22} />
                    </div>
                    <div>
                      <div className={styles.guaranteeTitle}>Audit-Ready Evidence</div>
                      <div className={styles.guaranteeText}>
                        Instantly export tamper-proof compliance reports mapped to the EU AI Act, ISO 42001, and NIST AI Risk Management Framework.
                      </div>
                    </div>
                  </div>

                  <div className={styles.guaranteeItem}>
                    <div className={styles.guaranteeIconWrap}>
                      <Zap size={22} />
                    </div>
                    <div>
                      <div className={styles.guaranteeTitle}>GDP-Weighted Benchmarks</div>
                      <div className={styles.guaranteeText}>
                        Evaluate models on real enterprise economic tasks across legal, finance, and engineering rather than generic trivia.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
