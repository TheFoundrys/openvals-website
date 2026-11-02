"use client";

import Image from "next/image";
import styles from "./ui.module.css";

export default function HeroDashboardPreview() {
  return (
    <div className={styles.heroBrowser}>
        <div className={styles.heroBrowserChrome}>
          <div className={styles.heroBrowserDots} aria-hidden="true">
            <span className={styles.terminalDotRed} />
            <span className={styles.terminalDotYellow} />
            <span className={styles.terminalDotGreen} />
          </div>
          <div className={styles.heroBrowserUrl}>app.openvals.ai/executive-dashboard</div>
        </div>
        <div className={styles.heroBrowserViewport}>
          <Image
            src="/marketing/executive-dashboard-preview.png"
            alt="OpenVals Executive Dashboard showing maturity score, capability scores, and current vs target charts"
            width={1200}
            height={750}
            className={styles.heroBrowserImage}
            priority
          />
        </div>
      </div>
  );
}
