import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ValsIndexView from "../../components/ValsIndexView";

export const metadata: Metadata = {
  title: "OpenVals Index - GDP-Weighted AI Performance & Efficiency Benchmark | OpenVals",
  description:
    "A single measure of AI's potential economic impact — agentic model performance across finance, coding, and legal tasks, weighted by each sector's share of U.S. GDP.",
  openGraph: {
    title: "OpenVals Index - GDP-Weighted AI Benchmark",
    description:
      "Agentic model performance across finance, coding, and legal tasks, weighted by U.S. GDP contribution.",
  },
};

export default function OpenValsIndexPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", backgroundColor: "#fbfbfb" }}>
        <ValsIndexView />
      </main>
      <Footer />
    </>
  );
}
