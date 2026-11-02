import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/ui.module.css";

export type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalDocumentPageProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalDocumentPage({
  title,
  lastUpdated,
  sections,
}: LegalDocumentPageProps) {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)" }}>
        <section
          className={styles.section}
          style={{
            paddingTop: "clamp(96px, 12vw, 140px)",
            paddingBottom: "clamp(48px, 8vw, 80px)",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              margin: "0 0 16px",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 52px)",
              lineHeight: 1.15,
              margin: "0 0 12px",
              color: "var(--text-main)",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "var(--text-muted)", margin: "0 0 40px", fontSize: 15 }}>
            Last updated: {lastUpdated}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {sections.map((section) => (
              <article key={section.title}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    margin: "0 0 12px",
                    color: "var(--text-main)",
                  }}
                >
                  {section.title}
                </h2>
                <div
                  style={{
                    margin: 0,
                    color: "var(--text-muted)",
                    fontSize: 16,
                    lineHeight: 1.65,
                  }}
                >
                  {section.body}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
