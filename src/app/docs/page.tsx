import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import DocsQuickstart from "@/components/DocsQuickstart";
import styles from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Quick Start - OpenVals Docs",
  description: "Install OpenVals and start evaluating AI systems in minutes.",
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className={styles.docsPage}>
        <AmbientGrid />
        <section className={styles.docsHero}>
          <h1>
            Up and running
            <span> in minutes</span>
          </h1>
          <Suspense fallback={null}>
            <DocsQuickstart />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
