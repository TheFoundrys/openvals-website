"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Activity, FileBadge, ExternalLink, Book, FileText, Users, Microscope } from "lucide-react";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AmbientGrid from "../../components/AmbientGrid";
import TrustedBy from "../../components/TrustedBy";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } as const },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const BOOKS = [
  {
    title: "The Shadows Of Deception",
    subtitle: "Unveiling Cyber Realms",
    link: "https://www.amazon.in/Shadows-Deception-Unveiling-Cyber-Realms-ebook/dp/B0CJ9M698Y"
  },
  {
    title: "The Fabric of Law",
    subtitle: "Understanding Jurisprudence and Legal Principles",
    link: "https://www.amazon.in/Fabric-Law-Understanding-Jurisprudence-Principles-ebook/dp/B0D1JQ76YG"
  }

];

const RECOGNITION = [
  {
    logo: "/logos/tradeflock.webp",
    title: "TradeFlock",
    desc: "Best Startup CEOs - 2024",
    link: "https://tradeflock.com/best-startup-ceos-2024-vishwanath-akuthota/"
  },
  {
    logo: "/logos/cconnects.webp",
    title: "The CConnects",
    desc: "Redefining AI with AI-360 Framework",
    link: "https://thecconnects.com/redefining-ai-with-ai-360-vishwanath-and-the-legacy-of-dr-pinnacle/"
  },
  {
    logo: "/logos/ehealth-300-98.png",
    title: "Elets Healthcare",
    desc: "Healthcare Innovation Excellence Award",
    link: "https://ehealth.eletsonline.com/2024/06/13th-elets-healthcare-innovation-awards-ceremony-honoured-exemplary-contributions-towards-advancing-healthcare-innovation/"
  },
  {
    logo: "/logos/pride india awards.png",
    title: "Pride India Awards",
    desc: "Excellence in AI & Deep Tech Innovation",
    link: "https://www.instagram.com/p/DKiuoYBMeWA/"
  }
];

export default function About() {
  return (
    <>
      <Header />

      <main style={{ position: "relative" }}>
        {/* HERO SECTION */}
        <section className={styles.section} style={{ padding: "120px var(--container-padding) 80px", position: "relative" }}>
          <AmbientGrid />
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}
          >
            <motion.h1
              variants={FADE_UP}
              style={{ fontSize: "clamp(40px, 10vw, 84px)", lineHeight: 1, marginBottom: "32px" }}
            >
              The Trust Layer <br />
              <span style={{ color: "var(--accent)" }}>for AI Intelligence.</span>
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto" }}
            >
              Building a world where AI systems are as reliable as they are intelligent.
              Because trust isn&apos;t built on assumptions it&apos;s built on validation.
            </motion.p>
          </motion.div>
        </section>

        <TrustedBy />

        {/* NARRATIVE SPLIT */}
        <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)", padding: "100px var(--container-padding)" }}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {[
                "AI is being deployed faster than it is understood.",
                "Models are shipped without knowing how they fail.",
                "Assumptions are replacing validation.",
                "Speed is replacing safety."
              ].map((text, i) => (
                <motion.div key={i} variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: 500 }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }} />
                  {text}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={FADE_UP}
              style={{ padding: "40px", borderLeft: "2px solid var(--accent)", background: "rgba(0, 212, 255, 0.03)" }}
            >
              <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, marginBottom: "24px" }}>
                OpenVals was built <br />to change that.
              </h2>
              <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                We exist to rigorously test, break, and validate AI systems before they reach the real world.
                Our team sits at the intersection of Cybersecurity, Data Science, and Policy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PILLARS OF VALIDATION */}
        <section className={styles.section} style={{ padding: "100px var(--container-padding)" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
              style={{ textAlign: "center", marginBottom: "60px" }}
            >
              <motion.h3 variants={FADE_UP}>Our Pillars of Trust</motion.h3>
              <motion.p variants={FADE_UP} style={{ margin: "0 auto", maxWidth: "600px" }}>The methodology behind the industry&apos;s most rigorous validation framework.</motion.p>
            </motion.div>

            <motion.div
              className={styles.grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
            >
              {[
                {
                  icon: Activity,
                  title: "Test",
                  desc: "Exhaustive evaluation of model benchmarks, accuracy, and performance under extreme edge cases."
                },
                {
                  icon: ShieldAlert,
                  title: "Break",
                  desc: "Active red-teaming and adversarial simulations to uncover prompt injection and model leakage."
                },
                {
                  icon: FileBadge,
                  title: "Validate",
                  desc: "Audit-grade assurance reports that prove deployment readiness and regulatory alignment."
                }
              ].map((pillar, i) => (
                <motion.div key={i} className={styles.card} variants={FADE_UP} style={{ textAlign: "center" }}>
                  <pillar.icon size={40} style={{ margin: "0 auto 24px", color: "var(--accent)" }} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FOUNDER PROFILE */}
        <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)", padding: "100px var(--container-padding)" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
              style={{ display: "flex", flexDirection: "column", gap: "80px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
                <motion.div variants={FADE_UP} style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5" }}>
                  <img src="https://thefoundrys.com/images/vishwa-new.jpg" alt="Vishwanath Akuthota - Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>

                <motion.div variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, marginBottom: "8px" }}>Vishwanath Akuthota</h2>
                    <p style={{ fontSize: "20px", color: "var(--accent)", fontWeight: 600 }}>Founder</p>
                  </div>

                  <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Vishwanath Akuthota is a distinguished deep-tech entrepreneur and AI architect with over 1.5 decades of experience in Artificial Intelligence, Machine Learning, and Generative AI. He has been at the forefront of building world-class AI products and Large Language Model (LLM) applications.
                  </p>

                  <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    His work is characterized by a mission to develop responsible and trustworthy AI systems that align with ethical principles and industry standards.
                  </p>

                  <blockquote style={{ fontSize: "20px", fontStyle: "italic", borderLeft: "4px solid var(--accent)", paddingLeft: "24px", margin: "16px 0", color: "var(--text-main)" }}>
                    &quot;Creating valuable products requires an engineering mindset combined with the precision of a mathematician. Our mission is to build responsible, ethical, and trustworthy AI that empowers humanity.&quot;
                  </blockquote>

                  <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                    <a href="https://www.linkedin.com/in/vishwanathakuthota/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      LinkedIn <ExternalLink size={14} />
                    </a>
                    <a href="https://x.com/Vishakuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      X (Twitter) <ExternalLink size={14} />
                    </a>
                    <a href="https://github.com/vishwanathakuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      GitHub <ExternalLink size={14} />
                    </a>
                    <Link href="/team" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      Meet the Team <Users size={14} />
                    </Link>
                    <a href="https://www.researchgate.net/profile/Vishwanath-Akuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, padding: "8px 12px", background: "var(--accent)", color: "#fff", borderRadius: "8px", border: "1px solid var(--accent)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      Research Gate <Microscope size={14} />
                    </a>
                  </div>
                </motion.div>
              </div>


              {/* AUTHORED BOOKS */}
              <div>
                <motion.h3 variants={FADE_UP} style={{ fontSize: "32px", marginBottom: "40px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>Authored Books</motion.h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                  {BOOKS.map((book, idx) => (
                    <motion.a key={idx} variants={FADE_UP} href={book.link} target="_blank" rel="noopener noreferrer" className={styles.card} style={{ display: "flex", alignItems: "flex-start", gap: "20px", padding: "32px", textAlign: "left" }}>
                      <div style={{ padding: "16px", background: "rgba(0, 212, 255, 0.1)", borderRadius: "12px", color: "var(--accent)" }}>
                        <Book size={32} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "20px", marginBottom: "8px" }}>{book.title}</h4>
                        <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "16px" }}>{book.subtitle}</p>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--accent)", display: "flex", alignItems: "center", gap: "6px" }}>View on Amazon <ExternalLink size={14} /></span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* RECOGNITION & MEDIA - HI-VIS REDESIGN */}
              <div style={{ marginTop: "80px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "48px", borderBottom: "1px solid var(--border)", paddingBottom: "24px" }}>
                  <motion.h3 variants={FADE_UP} style={{ fontSize: "36px", margin: 0 }}>Media & Recognition</motion.h3>
                  <motion.span variants={FADE_UP} style={{ color: "var(--accent)", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" }}>As seen in</motion.span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "flex-start" }}>
                  {RECOGNITION.map((item, idx) => (
                    <motion.a
                      key={idx}
                      variants={FADE_UP}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.card}
                      style={{
                        padding: "0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        background: "var(--secondary-bg)",
                        transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease",
                        width: "calc(50% - 12px)", // 2-column feel on medium screens
                        flexBasis: "320px",
                        flexGrow: 1
                      }}
                    >
                      <div style={{
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        background: "white",
                        padding: "24px",
                        position: "relative"
                      }}>
                        <img
                          src={item.logo}
                          alt={item.title}
                          style={{ maxHeight: "70px", maxWidth: "80%", objectFit: "contain" }}
                        />
                        <div style={{ position: "absolute", top: "12px", right: "12px", background: "var(--accent)", color: "white", fontSize: "10px", fontWeight: "800", padding: "4px 8px", borderRadius: "4px", textTransform: "uppercase" }}>Feature</div>
                      </div>

                      <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                        <h4 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>{item.title}</h4>
                        <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.5", margin: 0 }}>{item.desc}</p>

                        <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", color: "var(--accent)" }}>
                          View Official Press Release <ExternalLink size={14} />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className={styles.section} style={{ backgroundColor: "var(--text-main)", color: "var(--primary-bg)", textAlign: "center", padding: "120px var(--container-padding)" }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={STAGGER}
          >
            <motion.h2 variants={FADE_UP} style={{ color: "var(--primary-bg)", fontSize: "clamp(32px, 6vw, 54px)", marginBottom: "32px", lineHeight: 1.1 }}>
              Ready to ensure your AI is <br /> as trustworthy as it is smart?
            </motion.h2>
            <motion.div variants={FADE_UP}>
              <a href="/contact" className={`${styles.button} ${styles.primary}`} style={{ backgroundColor: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }}>
                Start Your Validation
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
