import { Metadata } from "next";
import BookADemoContent from "./BookADemoContent";

export const metadata: Metadata = {
  title: "Book a Demo | OpenVals - AI Trust, Validation & Benchmarking Platform",
  description:
    "Schedule a 30-minute technical walkthrough of OpenVals. Learn how to trace, evaluate, and benchmark enterprise AI models and autonomous agents with Decision Reliability Scoring (DRS).",
  keywords: [
    "Book a demo",
    "OpenVals demo",
    "AI evaluation demo",
    "LLM benchmark demo",
    "Decision Reliability Score",
    "Agent evaluation",
    "AI safety walkthrough",
  ],
  openGraph: {
    title: "Book a Demo | OpenVals",
    description:
      "Schedule a 30-minute technical walkthrough with an OpenVals evaluation engineer.",
    url: "https://openvalidations.com/book-a-demo",
    type: "website",
  },
};

export default function BookADemoPage() {
  return <BookADemoContent />;
}

