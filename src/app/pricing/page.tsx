"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import styles from "./pricing.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
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

const COMPUTE_SUITES = [
  {
    suite: "Security & Adversarial suite",
    coverage: "Prompt injection, jailbreak and exploit probes",
    billedPer: "run",
    price: "$0.40 / run",
  },
  {
    suite: "Reliability & Grounding suite",
    coverage: "Hallucination and groundedness checks",
    billedPer: "run",
    price: "$0.25 / run",
  },
  {
    suite: "Compliance & Regulatory suite",
    coverage: "Framework-mapped control verification",
    billedPer: "run",
    price: "$0.35 / run",
  },
  {
    suite: "Performance & Latency suite",
    coverage: "Latency SLO and throughput regression gates",
    billedPer: "run",
    price: "$0.15 / run",
  },
  {
    suite: "Custom probe pack",
    coverage: "Bring-your-own adversarial probe corpus",
    billedPer: "1k probes",
    price: "$0.10 / 1k probes",
  },
];

const FAQS = [
  {
    question: "What counts as a validation run?",
    answer:
      "One run executes a full gate - every check in the selected suite against one model version. Partial suite executions are billed per completed check.",
  },
  {
    question: "Can I self-host the validation engine?",
    answer:
      "Yes. Enterprise workspaces can run the engine inside their own VPC or on-prem cluster with the same evidence and audit guarantees.",
  },
  {
    question: "Do unused runs roll over?",
    answer:
      "Team-plan run quotas reset monthly. Enterprise plans can negotiate pooled or committed-use pricing.",
  },
  {
    question: "Is there a discount for startups or academia?",
    answer:
      "Early-stage startups and research institutions get 50% off the Team plan for the first year - mention it during onboarding.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <AmbientGrid />

        <div className={styles.container}>
          {/* HERO SECTION */}
          <section className={styles.heroSection}>
            <motion.div initial="hidden" animate="show" variants={STAGGER}>
              <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                Pricing that scales with your
                <br />
                governance
              </motion.h1>

              <motion.p variants={FADE_UP} className={styles.heroSubtitle}>
                Start free, upgrade when AI moves to production. Every plan includes the full audit trail.
              </motion.p>

              {/* PRICING CARDS */}
              <motion.div variants={FADE_UP} className={styles.pricingGrid}>
                {/* 1. STARTER */}
                <div className={styles.pricingCard}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.planName}>Starter</h2>
                    <p className={styles.planDescription}>
                      For individuals exploring AI validation
                    </p>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$0</span>
                  </div>

                  <Link
                    href="https://dev.openvalidations.com/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
                  >
                    Start for free
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Up to 5 models in the registry</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>10 validation runs / month</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Community test suites</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Use Case Advisor recommendations</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>1 workspace seat</span>
                    </li>
                  </ul>
                </div>

                {/* 2. TEAM (MOST POPULAR) */}
                <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
                  <div className={styles.popularBadge}>Most popular</div>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.planName}>Team</h2>
                    <p className={styles.planDescription}>
                      For teams shipping governed AI to production
                    </p>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$49</span>
                    <span className={styles.pricePeriod}>/ user / month</span>
                  </div>

                  <Link
                    href="https://dev.openvalidations.com/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
                  >
                    Start 14-day trial
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Unlimited models &amp; model compare</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>500 validation runs / month</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>All provider &amp; data integrations</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Evidence pack export</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>

                {/* 3. ENTERPRISE */}
                <div className={styles.pricingCard}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.planName}>Enterprise</h2>
                    <p className={styles.planDescription}>
                      For regulated organizations at scale
                    </p>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>Custom</span>
                  </div>

                  <Link href="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}>
                    Contact sales
                  </Link>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Everything in Team, unlimited runs</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>SSO / SAML &amp; SCIM provisioning</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Custom compliance frameworks</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>VPC / on-prem deployment</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Immutable audit API &amp; SLA</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={16} strokeWidth={2.5} className={styles.featureIcon} />
                      <span>Dedicated success engineer</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* METERED COMPUTE SECTION */}
          <section className={styles.computeSection}>
            <div className={styles.computeCard}>
              <div className={styles.computeHeader}>
                <h2 className={styles.computeTitle}>Validation compute, metered fairly</h2>
                <p className={styles.computeSubtitle}>
                  Pay per gate execution beyond your plan&apos;s included runs. No hidden seat minimums.
                </p>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.computeTable}>
                  <thead>
                    <tr>
                      <th className={styles.colSuite}>SUITE</th>
                      <th className={styles.colCoverage}>COVERAGE</th>
                      <th className={styles.colBilled}>BILLED PER</th>
                      <th className={styles.colPrice}>PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPUTE_SUITES.map((item) => (
                      <tr key={item.suite}>
                        <td className={styles.suiteName}>{item.suite}</td>
                        <td className={styles.coverageDesc}>{item.coverage}</td>
                        <td className={styles.billedPerCol}>
                          <span className={styles.billedBadge}>{item.billedPer}</span>
                        </td>
                        <td className={styles.priceCol}>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqHeading}>Frequently asked</h2>
            <div className={styles.faqGrid}>
              {FAQS.map((faq, index) => (
                <div key={index} className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
