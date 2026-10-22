"use client";

import styles from "./ui.module.css";

const LOGOS = [
  { name: "Star Emblem", src: "/logos/Logo_AUN.png", url: "https://www.ApplyUniNow.com" },
  { name: "Dr Pinnacle", src: "/logos/drpinnacle.png", url: "https://drpinnacle.com" },
  { name: "Arrietty Solutions", src: "/logos/arrietty.png", url: "https://arriettysolutions.com/" },
  { name: "NYN", src: "/logos/NYN.avif", url: "https://www.instagram.com/nyn_innovations/" },
  { name: "LaNaSa Solutions", src: "/logos/lanasa.png", url: "https://lanasasolutions.com/" },
  { name: "Son of Egg", src: "/logos/Son-of-Egg-logo.avif", url: "https://sonofegg.com" },
  { name: "Alovie Technologies", src: "/logos/alovie.png", url: "https://alovie.com/" },
  { name: "Strwbry", src: "/logos/strwbry.jpg", url: "https://www.instagram.com/strwbrycreative/" },
  { name: "DasHerz Surgicals", src: "/logos/dasherz.png", url: "https://dasherz.in/" },
  { name: "Techoptima", src: "/logos/Techoptima.avif", url: "https://techoptima.ai" },
  { name: "Universal Surgicals", src: "/logos/universal-surgicals.png", url: "https://universalsurgicals.com/" },
  { name: "The Foundrys", src: "/logos/the foundrys.avif", url: "https://thefoundrys.com" },
  { name: "Transforma", src: "/logos/transforma.avif", url: "https://www.transforma.in/" },
];

function LogoImage({ logo }: { logo: (typeof LOGOS)[number] }) {
  const isTransforma = logo.src.toLowerCase().includes("transforma");
  const isWide = logo.src.toLowerCase().includes("alovie");
  const className = isTransforma ? styles.largeLogo : isWide ? styles.wideLogo : "";

  return (
    <img
      src={logo.src}
      alt={`${logo.name} logo`}
      className={className}
    />
  );
}

export default function TrustedBy() {
  // Double the logos for seamless infinite scroll
  const scrollingLogos = [...LOGOS, ...LOGOS];

  return (
    <section className={styles.trustedSection}>
      <div className={styles.trustedLabel}>Trusted by industry leaders</div>
      <div className={styles.logoContainer}>
        <div className={styles.logoScroll}>
          {scrollingLogos.map((logo, index) => (
            logo.url ? (
              <a
                key={index}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoItem}
              >
                <LogoImage logo={logo} />
              </a>
            ) : (
              <div key={index} className={styles.logoItem}>
                <LogoImage logo={logo} />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
