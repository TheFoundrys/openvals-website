"use client";

import { motion } from "framer-motion";
import { ExternalLink, Book, Users } from "lucide-react";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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

export default function VishwanathAkuthota() {
  return (
    <>
      <Header />

      <main style={{ position: "relative" }}>
        <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)", padding: "120px var(--container-padding) 100px" }}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
              style={{ display: "flex", flexDirection: "column", gap: "80px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", alignItems: "center" }}>
                <motion.div variants={FADE_UP} style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", width: "100%", maxWidth: "400px", flex: "0 0 auto" }}>
                  <img src="https://thefoundrys.com/images/vishwa-new.jpg" alt="Vishwanath Akuthota - Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>

                <motion.div variants={FADE_UP} style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left", alignItems: "flex-start", flex: "1 1 500px", minWidth: "min(100%, 300px)" }}>
                  <div>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, marginBottom: "8px" }}>Vishwanath Akuthota</h1>
                    <p style={{ fontSize: "20px", color: "var(--accent)", fontWeight: 600 }}>Founder</p>
                  </div>

                  <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6, textAlign: "justify", maxWidth: "800px" }}>
                    Vishwanath Akuthota is a distinguished deep-tech entrepreneur and AI architect with over 1.5 decades of experience in Artificial Intelligence, Machine Learning, and Generative AI. He has been at the forefront of building world-class AI products and Large Language Model (LLM) applications.
                  </p>

                  <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.6, textAlign: "justify", maxWidth: "800px" }}>
                    His work is characterized by a mission to develop responsible and trustworthy AI systems that align with ethical principles and industry standards.
                  </p>

                  <blockquote style={{ fontSize: "20px", fontStyle: "italic", borderLeft: "4px solid var(--accent)", paddingLeft: "24px", margin: "16px 0", color: "var(--text-main)", textAlign: "left" }}>
                    &quot;Creating valuable products requires an engineering mindset combined with the precision of a mathematician. Our mission is to build responsible, ethical, and trustworthy AI that empowers humanity.&quot;
                  </blockquote>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-start" }}>
                      <a href="https://www.linkedin.com/in/vishwanathakuthota/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                        LinkedIn <ExternalLink size={14} />
                      </a>
                      <a href="https://x.com/Vishakuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                        X (Twitter) <ExternalLink size={14} />
                      </a>
                      <a href="https://github.com/vishwanathakuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                        GitHub <ExternalLink size={14} />
                      </a>
                      <a href="https://www.researchgate.net/profile/Vishwanath-Akuthota" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, color: "var(--text-main)", padding: "8px 12px", background: "var(--primary-bg)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                        <img src="/logos/researchgate.png" alt="RG" style={{ height: "16px", width: "auto", filter: "invert(var(--icon-invert))" }} /> ResearchGate <ExternalLink size={14} />
                      </a>
                      <Link href="/team" style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "#fff", padding: "8px 16px", background: "var(--accent)", borderRadius: "8px", fontSize: "13px", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0, 212, 255, 0.2)", whiteSpace: "nowrap" }}>
                        Meet the Team <Users size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>


              {/* AUTHORED BOOKS */}
              <div>
                <motion.h3 variants={FADE_UP} style={{ fontSize: "32px", marginBottom: "40px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>Authored Books</motion.h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "24px" }}>
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
      </main>

      <Footer />
    </>
  );
}
