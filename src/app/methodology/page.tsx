import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MethodologyView from "../../components/MethodologyView";

export const metadata: Metadata = {
  title: "Evaluation Methodology & Model Reports | OpenVals",
  description:
    "Explore comprehensive benchmark methodology, per-model hyperparameter profiles, multi-agent evaluation breakdowns, and performance analytics across proprietary, academic, and industry partner suites.",
  openGraph: {
    title: "OpenVals Evaluation Methodology & Model Reports",
    description:
      "Deep dive into model-level evaluation runs, context parameters, accuracy confidence intervals, and benchmark breakdowns.",
  },
};

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", backgroundColor: "#fafaf9" }}>
        <MethodologyView />
      </main>
      <Footer />
    </>
  );
}
