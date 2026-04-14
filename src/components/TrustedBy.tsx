"use client";

import styles from "./ui.module.css";

const LOGOS = [
  "/logos/drpinnacle.png",
  "/logos/NYN.avif",
  "/logos/openvals.avif",
  "/logos/Son-of-Egg-logo.avif",
  "/logos/strwbry.avif",
  "/logos/Techoptima.avif",
  "/logos/the foundrys.avif",
  "/logos/transforma.avif",
];

export default function TrustedBy() {
  // Double the logos for seamless infinite scroll
  const scrollingLogos = [...LOGOS, ...LOGOS];

  return (
    <section className={styles.trustedSection}>
      <div className={styles.trustedLabel}>Trusted by industry leaders</div>
      <div className={styles.logoContainer}>
        <div className={styles.logoScroll}>
          {scrollingLogos.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <img src={logo} alt={`Client logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
