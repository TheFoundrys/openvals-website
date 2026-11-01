import type { Metadata } from "next";
import AIxlenceContent from "./AIxlenceContent";

export const metadata: Metadata = {
  title: "AIxLence – Enterprise AI Strategy & Transformation | OpenVals",
  description:
    "Assess AI maturity, identify capability gaps, prioritize opportunities, and build measurable AI transformation roadmaps before committing capital.",
  openGraph: {
    title: "AIxLence – Enterprise AI Strategy & Transformation | OpenVals",
    description:
      "Assess AI maturity, identify capability gaps, prioritize opportunities, and build measurable AI transformation roadmaps.",
    url: "https://openvalidations.com/aixlence",
  },
};

export default function AIxLencePage() {
  return <AIxlenceContent />;
}
