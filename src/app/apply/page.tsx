"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AmbientGrid from "../../components/AmbientGrid";

export default function Apply() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    eduBackground: "",
    leadSource: "OpenVals Website",
    aiDescription: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://crm.thefoundrys.com/api/v1/lms/external", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "default-lms-secret-key"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Form Successfully Submitted to CRM");
        setSubmitted(true);
      } else {
        const errData = await response.json();
        console.error("CRM Submission Failed:", errData);
        alert("There was an error submitting your application. Please try again later.");
      }
    } catch (error) {
      console.error("Network Error during CRM submission:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <main style={{ position: "relative", minHeight: "100vh" }}>
        <AmbientGrid />

        <section className={styles.section} style={{ padding: "120px var(--container-padding) 100px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 10 }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "60px", background: "var(--card-bg)", borderRadius: "24px", border: "1px solid var(--accent)" }}
              >
                <h2 style={{ color: "var(--accent)", marginBottom: "16px" }}>Application Received!</h2>
                <p style={{ color: "var(--text-muted)" }}>Thank you for choosing OpenVals. Our AI validation experts will review your request and get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className={`${styles.button} ${styles.primary}`} style={{ marginTop: "32px" }}>Apply Again</button>
              </motion.div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                  <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "16px" }}>Apply for AI Validation</h1>
                  <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>Secure your model&apos;s future with audit-grade assurance.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", background: "var(--card-bg)", padding: "40px", borderRadius: "24px", border: "1px solid var(--border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Educational Background</label>
                      <input
                        type="text"
                        name="eduBackground"
                        value={formData.eduBackground}
                        onChange={handleChange}
                        required
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>Lead Source</label>
                      <input
                        type="text"
                        name="leadSource"
                        value={formData.leadSource}
                        disabled
                        style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--border)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "not-allowed" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-muted)" }}>AI Model/System Description</label>
                    <textarea
                      name="aiDescription"
                      placeholder="Briefly describe the AI system you want to validate..."
                      value={formData.aiDescription}
                      onChange={handleChange}
                      rows={4}
                      required
                      style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", resize: "none" }}
                    />
                  </div>

                  <button type="submit" className={`${styles.button} ${styles.primary}`} style={{ width: "100%", padding: "16px", marginTop: "12px" }}>
                    Submit Validation Request
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
