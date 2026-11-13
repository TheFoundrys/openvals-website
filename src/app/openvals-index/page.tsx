import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ValsIndexView from "../../components/ValsIndexView";


export default function OpenValsIndexPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--primary-bg)" }}>
        <ValsIndexView />
      </main>
      <Footer />
    </>
  );
}
