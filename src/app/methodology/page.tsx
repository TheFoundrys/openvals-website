import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MethodologyView from "../../components/MethodologyView";


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
