"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./pricing.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const TIERS = [
  {
    id: "community",
    badge: "Free",
    name: "Community",
    description:
      "The full validation toolkit for exploration and pre-production. Not a stripped trial.",
    features: [
      "OpenVals Index & public benchmark leaderboard",
      "Model registry with DRS scoring (limited models)",
      "Community validation suites & Use Case Advisor",
      "Evidence summaries for individual runs",
      "1 workspace seat · self-serve signup",
    ],
    footnote: "Self-serve at dev.openvalidations.com. Commercial production use by approval.",
    cta: { label: "Start free", href: "https://dev.openvalidations.com/auth/signup", external: true },
    secondary: false,
  },
  {
    id: "scale",
    badge: null,
    name: "Scale",
    description:
      "Everything in Community, plus the governance and evidence a regulated deployment has to produce.",
    features: [
      "Everything in Community",
      "Unlimited models, compare & regression gates",
      "Compliance mapping (EU AI Act, NIST AI RMF, ISO 42001)",
      "Exportable evidence packs & immutable audit trail",
      "CI/CD integrations and team workspaces",
    ],
    inProgress: "Dedicated validation workers & scheduled benchmark refresh",
    footnote: "Licensed per deployment or team. No per-run markup on included gates.",
    cta: { label: "Book a demo", href: "/book-a-demo", external: false },
    secondary: false,
  },
  {
    id: "enterprise",
    badge: null,
    name: "Enterprise",
    description:
      "Everything in Scale, plus adversarial ML testing, private deployment, and enterprise identity.",
    features: [
      "Everything in Scale",
      "RedShield adversarial & red-team probe packs",
      "VPC, on-prem, or private cloud deployment",
      "SSO / SAML, SCIM, and custom control frameworks",
      "Priority support, SLA, and dedicated success engineer",
    ],
    inProgress: "Air-gapped evidence vault & cross-region audit replication",
    footnote: "Scoped to your environment and assurance requirements.",
    cta: { label: "Contact sales", href: "/contact", external: false },
    secondary: true,
  },
] as const;

const COMPARE_ROWS = [
  {
    title: "Benchmarks & model registry",
    community:
      "OpenVals Index, public leaderboards, and DRS for core model catalog entries.",
    scale: "Everything in Community, plus unlimited registry entries and model compare.",
    enterprise: "Everything in Scale, plus private benchmark lanes and custom weightings.",
  },
  {
    title: "Validation runs & gates",
    community: "Community suites with monthly run quota; single-model gate execution.",
    scale:
      "Full suite library, CI/CD gates, regression baselines, and pooled team run quotas.",
    enterprise: "Unlimited runs, custom probe packs, and production SLO enforcement.",
  },
  {
    title: "Evidence & compliance",
    community: "Run-level summaries and basic export.",
    scale:
      "Framework-mapped evidence packs, auditor-ready trails, and policy tagging.",
    enterprise: "Included with highest-assurance controls and custom attestations.",
  },
  {
    title: "Security & guardrails",
    community: "Policy checks and regex-style guardrail templates.",
    scale: "Security & adversarial suites (metered beyond plan quota where applicable).",
    enterprise: "RedShield ML guardrails with bring-your-own-model and red-team orchestration.",
  },
  {
    title: "Integrations & automation",
    community: "Web app, API read access, and manual run triggers.",
    scale: "Webhooks, GitHub/GitLab gates, and workspace API for pipelines.",
    enterprise: "Included with enterprise routing, HMAC-signed events, and admin APIs.",
  },
  {
    title: "Identity & access",
    community: "Email auth, single seat, API keys.",
    scale: "Teams, roles, and scaled procurement-friendly licensing.",
    enterprise: "SSO / SAML, SCIM provisioning, and enterprise identity (talk to us).",
  },
  {
    title: "Deployment",
    community: "OpenVals cloud (shared).",
    scale: "Dedicated tenant or hybrid connect to your VPC.",
    enterprise: "Full private deployment, on-prem, or air-gapped options.",
  },
] as const;

const HERO_LAYERS = [
  {
    step: "01",
    name: "Community",
    tag: "Free",
    blurb: "Benchmark, explore, and validate before production.",
  },
  {
    step: "02",
    name: "Scale",
    tag: "Licensed",
    blurb: "Evidence, compliance mapping, and CI gates for teams.",
  },
  {
    step: "03",
    name: "Enterprise",
    tag: "Scoped",
    blurb: "Private deployment, RedShield, and enterprise identity.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Hero */}
          <section className={styles.heroSection}>
            <motion.div
              initial="hidden"
              animate="show"
              variants={STAGGER}
              className={styles.heroGrid}
            >
              <div className={styles.heroCopy}>
                <motion.p variants={FADE_UP} className={styles.heroKicker}>
                  Pricing
                </motion.p>
                <motion.h1 variants={FADE_UP} className={styles.heroTitle}>
                  <span className={styles.heroTitlePrimary}>Community licence.</span>
                  <span className={styles.heroTitleSecondary}>Not a meter that runs with every gate.</span>
                </motion.h1>
                <motion.p variants={FADE_UP} className={styles.heroLead}>
                  Start on Community at no cost. Move to Scale or Enterprise when you need
                  governance, evidence, and deployment control—priced for the environment, not
                  every validation run.
                </motion.p>
                <motion.ul variants={FADE_UP} className={styles.heroPrinciples}>
                  <li>No per-run markup on included gates</li>
                  <li>Licence terms you can put in procurement</li>
                  <li>Same platform; each tier adds a layer</li>
                </motion.ul>
                <motion.div variants={FADE_UP} className={styles.heroActions}>
                  <Link
                    href="https://dev.openvalidations.com/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroCtaPrimary}
                  >
                    Start free
                  </Link>
                  <a href="#editions" className={styles.heroCtaGhost}>
                    See editions
                  </a>
                </motion.div>
              </div>

              <motion.aside variants={FADE_UP} className={styles.layerPanel} aria-label="Edition layers">
                <p className={styles.layerPanelTitle}>Three layers, one platform</p>
                <ol className={styles.layerList}>
                  {HERO_LAYERS.map((layer) => (
                    <li key={layer.step} className={styles.layerItem}>
                      <div className={styles.layerItemHead}>
                        <span className={styles.layerStep}>{layer.step}</span>
                        <span className={styles.layerName}>{layer.name}</span>
                        <span className={styles.layerTag}>{layer.tag}</span>
                      </div>
                      <p className={styles.layerBlurb}>{layer.blurb}</p>
                    </li>
                  ))}
                </ol>
              </motion.aside>
            </motion.div>
          </section>

          {/* Editions */}
          <section id="editions" className={styles.editionsSection}>
            <p className={styles.sectionKicker}>Three editions</p>
            <h2 className={styles.sectionTitle}>
              Start free. Grow into governance. Add assurance when you need it.
            </h2>

            <div className={styles.tierGrid}>
              {TIERS.map((tier) => (
                <article
                  key={tier.id}
                  className={`${styles.tierCard} ${tier.id === "scale" ? styles.tierCardHighlight : ""}`}
                >
                  {tier.badge && <span className={styles.tierBadge}>{tier.badge}</span>}
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.tierDescription}>{tier.description}</p>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  {"inProgress" in tier && tier.inProgress && (
                    <p className={styles.tierInProgress}>
                      <span className={styles.inProgressLabel}>In progress</span>
                      {tier.inProgress}
                    </p>
                  )}
                  <p className={styles.tierFootnote}>{tier.footnote}</p>
                  {tier.cta.external ? (
                    <Link
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={tier.secondary ? styles.tierCtaSecondary : styles.tierCtaPrimary}
                    >
                      {tier.cta.label}
                    </Link>
                  ) : (
                    <Link
                      href={tier.cta.href}
                      className={tier.secondary ? styles.tierCtaSecondary : styles.tierCtaPrimary}
                    >
                      {tier.cta.label}
                    </Link>
                  )}
                </article>
              ))}
            </div>

            <p className={styles.editionsNote}>
              Exact terms are confirmed in a conversation. No surprise per-request line items.
            </p>
          </section>

          {/* Comparison matrix */}
          <section className={styles.compareSection}>
            <p className={styles.sectionKicker}>What each edition includes</p>
            <h2 className={styles.sectionTitle}>The same platform. Each tier adds a layer.</h2>

            <div className={styles.compareScroll}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.compareThFeature}>
                      Capability
                    </th>
                    <th scope="col" className={styles.compareThTier}>
                      Community
                    </th>
                    <th scope="col" className={styles.compareThTier}>
                      Scale adds
                    </th>
                    <th scope="col" className={styles.compareThTier}>
                      Enterprise adds
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.title}>
                      <th scope="row" className={styles.compareRowTitle}>
                        {row.title}
                      </th>
                      <td className={styles.compareTd}>{row.community}</td>
                      <td className={styles.compareTd}>{row.scale}</td>
                      <td className={styles.compareTd}>{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Get a straight licensing answer.</h2>
            <p className={styles.ctaLead}>
              Tell us your environment and how you&apos;d use OpenVals; we&apos;ll tell you which
              edition fits and on what terms.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/book-a-demo" className={styles.tierCtaPrimary}>
                Book a demo
              </Link>
              <Link href="/contact" className={styles.tierCtaSecondary}>
                Contact us
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
