"use client";

import styles from "./ui.module.css";

const LOGOS = [
  { name: "Dr Pinnacle", src: "/logos/drpinnacle.png", url: "https://drpinnacle.com" },
  { name: "NYN", src: "/logos/NYN.avif", url: "https://nynweb.com" },
  { name: "Son of Egg", src: "/logos/Son-of-Egg-logo.avif", url: "https://sonofegg.com" },
  { name: "Strwbry", src: "/logos/strwbry.jpg", url: "" },
  { name: "Techoptima", src: "/logos/Techoptima.avif", url: "https://techoptima.ai" },
  { name: "The Foundrys", src: "/logos/the foundrys.avif", url: "https://thefoundrys.com" },
  { name: "Transforma", src: "/logos/transforma.avif", url: "https://www.transforma.in/" },
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
            <a
              key={index}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoItem}
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className={logo.src.toLowerCase().includes("transforma") ? styles.largeLogo : ""}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
