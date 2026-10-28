import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "var(--accent, #00d4ff)",
            margin: "0 0 16px",
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 16px" }}>
          Page Not Found
        </h2>
        <p
          style={{
            color: "var(--text-muted, #94a3b8)",
            maxWidth: "480px",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          The page you are looking for does not exist or has been moved. Explore
          our models, benchmarks, or documentation.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              background: "var(--accent, #00d4ff)",
              color: "#050505",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Return Home
          </Link>
          <Link
            href="/docs"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#f1f5f9",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Explore Docs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
