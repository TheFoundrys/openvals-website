"use client";

import Image from "next/image";
import styles from "./ui.module.css";

const DASHBOARD_CALLOUTS = [
  { label: "Factuality", className: styles.heroDashboardCalloutTl },
  { label: "Safety & Reliability", className: styles.heroDashboardCalloutR },
  { label: "Model Comparison", className: styles.heroDashboardCalloutBr },
] as const;

export default function HeroDashboardPreview() {
  return (
    <div className={styles.heroDashboardFrame}>
      {DASHBOARD_CALLOUTS.map(({ label, className }) => (
        <div key={label} className={`${styles.heroDashboardCallout} ${className}`}>
          {label}
        </div>
      ))}

      <div className={styles.heroBrowser}>
        <div className={styles.heroBrowserChrome}>
          <div className={styles.heroBrowserDots} aria-hidden="true">
            <span className={styles.terminalDotRed} />
            <span className={styles.terminalDotYellow} />
            <span className={styles.terminalDotGreen} />
          </div>
          <div className={styles.heroBrowserUrl}>http://prod.openvalidations.com</div>
        </div>
        <div className={styles.heroBrowserViewport}>
          <Image
            src="/marketing/executive-dashboard-preview.png"
            alt="OpenVals Executive Dashboard: maturity score, capability scores, and current vs target charts"
            width={800}
            height={453}
            className={styles.heroBrowserImage}
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
