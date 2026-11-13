import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";


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
