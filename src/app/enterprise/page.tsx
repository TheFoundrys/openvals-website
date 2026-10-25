"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Cloud,
  Server,
  Lock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import allEnterpriseJson from "@/data/allEnterpriseData.json";
import styles from "./enterprise.module.css";

interface ComparisonRow {
  capability: string;
  team: string;
  enterprise: string;
}

interface EnterpriseData {
  comparison: ComparisonRow[];
  securityFeatures: string[];
  deploymentOptions: string[];
}

export default function EnterprisePage() {
  const [data, setData] = useState<EnterpriseData>(
    (allEnterpriseJson?.data as EnterpriseData) || {
      comparison: [],
      securityFeatures: [],
      deploymentOptions: [],
    }
  );

  useEffect(() => {
    async function syncEnterpriseData() {
      try {
        const res = await fetch("/api/enterprise");
        if (res.ok) {
          const json = await res.json();
          if (json?.data) {
            setData(json.data);
          }
        }
      } catch (err) {
        console.warn("Using offline cached enterprise data", err);
      }
    }
    syncEnterpriseData();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        {/* HERO SECTION (DARK NAVY AS BEFORE) */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.badgePill}>
              <ShieldCheck size={14} className={styles.badgeIcon} />
              <span>OpenVals for Enterprise</span>
            </div>

            <h1 className={styles.heroTitle}>
              AI governance your CISO will approve.
            </h1>

            <p className={styles.heroSubtitle}>
              Run validation, compliance evidence, and fleet observability inside your own security boundary — with SSO, immutable audit, and deployment options that fit regulated environments.
            </p>

            <div className={styles.heroCtas}>
              <Link
                href="/contact"
                className={styles.primaryCtaBtn}
              >
                Talk to Sales <ArrowRight size={15} />
              </Link>

              <Link
                href="/pricing"
                className={styles.secondaryCtaBtn}
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>

        <div className={styles.container}>
          {/* SECURITY, END TO END */}
          <section className={styles.securitySection}>
            <h2 className={styles.sectionHeading}>Security, end to end</h2>

            <div className={styles.securityGrid}>
              {data.securityFeatures.map((feat, index) => (
                <div key={index} className={styles.securityCard}>
                  <Check size={16} strokeWidth={2.5} className={styles.checkIcon} />
                  <span className={styles.securityText}>{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TEAM VS ENTERPRISE TABLE */}
          <section id="comparison-table" className={styles.comparisonSection}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <h2 className={styles.comparisonTitle}>Team vs Enterprise</h2>
                <p className={styles.comparisonSubtitle}>
                  What changes when AI governance becomes mission-critical.
                </p>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr>
                      <th className={styles.colCapability}>CAPABILITY</th>
                      <th className={styles.colTeam}>TEAM</th>
                      <th className={styles.colEnterprise}>ENTERPRISE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.comparison.map((row, idx) => (
                      <tr key={idx}>
                        <td className={styles.capabilityCell}>{row.capability}</td>
                        <td className={styles.teamCell}>{row.team}</td>
                        <td className={styles.enterpriseCell}>{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* DEPLOY WHERE YOUR DATA LIVES */}
          <section className={styles.deploySection}>
            <h2 className={styles.sectionHeading}>Deploy where your data lives</h2>

            <div className={styles.deployGrid}>
              <div className={styles.deployCard}>
                <div className={styles.deployIconWrap}>
                  <Cloud size={20} className={styles.deployIcon} />
                </div>
                <h3 className={styles.deployTitle}>Managed cloud (multi-tenant)</h3>
              </div>

              <div className={styles.deployCard}>
                <div className={styles.deployIconWrap}>
                  <Server size={20} className={styles.deployIcon} />
                </div>
                <h3 className={styles.deployTitle}>Private VPC deployment</h3>
              </div>

              <div className={styles.deployCard}>
                <div className={styles.deployIconWrap}>
                  <Lock size={20} className={styles.deployIcon} />
                </div>
                <h3 className={styles.deployTitle}>On-prem / air-gapped clusters</h3>
              </div>
            </div>
          </section>

          {/* READY TO GOVERN AI AT SCALE? */}
          <section className={styles.scaleCtaSection}>
            <div className={styles.scaleCtaCard}>
              <h2 className={styles.scaleTitle}>Ready to govern AI at scale?</h2>
              <p className={styles.scaleSubtitle}>
                We&apos;ll map your regulatory surface and stand up a pilot workspace in days, not quarters.
              </p>

              <div className={styles.scaleButtons}>
                <Link href="/contact" className={styles.scaleContactBtn}>
                  Contact Sales
                </Link>
                <Link href="/models" className={styles.scaleBrowseBtn}>
                  Browse Models
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
