import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "FAQ'S - OpenVals",
  description: "Frequently asked questions about OpenVals and AI Compass.",
};

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main style={{ position: "relative" }}>
        <FAQSection wide />
      </main>
      <Footer />
    </>
  );
}
