"use client";

import Image from "next/image";
import styles from "./ui.module.css";

export default function HeroDashboardPreview() {
  return (
    <div className={styles.heroDashboardFrame}>
      <div className={styles.heroDashboardGlow} aria-hidden="true" />
      <div className={styles.heroDashboardShot}>
        <Image
          src="/marketing/command-center-preview.webp"
          alt="OpenVals Command Center: live agent, provider and readiness metrics, platform capabilities, token throughput and agent fleet analytics"
          width={2000}
          height={1358}
          className={styles.heroDashboardImage}
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
        />
      </div>
    </div>
  );
}
