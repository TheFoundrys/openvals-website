"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Calendar,
  X,
  ExternalLink,
} from "lucide-react";
import styles from "./BookADemo.module.css";

const AGENDA_POINTS = [
  {
    title: "How your AI models & agents are evaluated",
    desc: "A live walkthrough of tracing model decisions, tool calls, and latency vs. accuracy trade-offs.",
  },
  {
    title: "Decision Reliability Scoring (DRS)",
    desc: "See how OpenVals transforms raw probability and benchmark outputs into decision-ready reliability scores.",
  },
  {
    title: "Autonomous agent & multi-step workflow testing",
    desc: "Stress-test complex tool calling, agent memory, and reasoning chains to prevent rogue outputs.",
  },
  {
    title: "Automated red teaming & safety defense",
    desc: "Evaluate prompt injection risks, jailbreaks, and sensitive data leakage before models hit production.",
  },
  {
    title: "Audit-ready governance & compliance reports",
    desc: "Generate verifiable model risk documentation aligned with enterprise AI safety standards.",
  },
];

const FAQS = [
  {
    q: "What happens during a 30-minute demo?",
    a: "You'll meet with an OpenVals AI evaluation engineer who will walk through the platform, show live benchmarking workflows, demonstrate Decision Reliability Scoring (DRS), and answer architecture questions tailored to your tech stack.",
  },
  {
    q: "Who from our team should attend?",
    a: "Demos are most productive when attended by AI/ML engineers, technical product leads, or enterprise risk and security architects who are currently evaluating, building, or deploying models.",
  },
  {
    q: "Can we test custom datasets or private models?",
    a: "Yes. OpenVals supports private on-premises and VPC deployments, custom domain-specific evaluation suites, and seamless integration with Hugging Face, OpenAI, Anthropic, Ollama, and local models.",
  },
  {
    q: "How does OpenVals differ from basic prompt evals?",
    a: "Unlike superficial prompt testing tools, OpenVals provides an enterprise trust layer with rigorous DRS scoring, multi-turn agent execution tracing, automated adversarial red teaming, and audit-grade compliance reports.",
  },
];

const ECOSYSTEM_LOGOS = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "Meta Llama",
  "DeepSeek",
  "Hugging Face",
  "Databricks",
  "AWS Bedrock",
  "Microsoft Azure",
  "Ollama",
];

export default function BookADemoContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    company: "",
    role: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const calendlyUrl = useMemo(() => {
    const base = "https://calendly.com/vishwanath-akuthota/30min";
    const params = new URLSearchParams();
    params.set("hide_gdpr_banner", "1");
    if (formData.firstName || formData.lastName) {
      params.set("name", `${formData.firstName} ${formData.lastName}`.trim());
    }
    if (formData.workEmail) {
      params.set("email", formData.workEmail.trim());
    }
    return `${base}?${params.toString()}`;
  }, [formData.firstName, formData.lastName, formData.workEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showCalendarModal) {
        setShowCalendarModal(false);
      }
    };
    if (showCalendarModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCalendarModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit demo request.");
      }

      setIsSuccess(true);
      setShowCalendarModal(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContainer}>
        {/* ── Two-Column Hero Split (Arize Reference) ── */}
        <section className={styles.demoGrid}>
          {/* ── LEFT COLUMN ── */}
          <div className={styles.leftColumn}>
            <div className={styles.eyebrowBadge}>
              <span>Book a Demo of OpenVals</span>
            </div>

            <h1 className={styles.headline}>
              The AI Trust, Validation & Benchmarking Platform.
            </h1>

            <p className={styles.subheadline}>
              Don&apos;t ship vibes. Turn model and autonomous agent behavior into measurable confidence before and after production.
            </p>

            {/* "What You'll See" Agenda Box */}
            <div className={styles.agendaCard}>
              <div className={styles.agendaTitle}>
                What you&apos;ll see during the 30-minute walkthrough:
              </div>
              <ul className={styles.agendaList}>
                {AGENDA_POINTS.map((item, idx) => (
                  <li key={idx} className={styles.agendaItem}>
                    <div className={styles.agendaIconWrap}>
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <span className={styles.agendaStrong}>{item.title}</span> —{" "}
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supported Ecosystems */}
            <div className={styles.trustEcosystems}>
              <div className={styles.trustEcosystemsLabel}>
                Evaluated Across Frontier &amp; Open Models
              </div>
              <div className={styles.ecosystemBadges}>
                {ECOSYSTEM_LOGOS.map((name) => (
                  <span key={name} className={styles.ecosystemChip}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE FORM ── */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Book time with our team</h2>
                <p className={styles.formSubtitle}>
                  Fill out the form below and an AI evaluation engineer will contact you within 1 business day.
                </p>
              </div>

              {isSuccess ? (
                /* Success View */
                <div className={styles.successBox}>
                  <div className={styles.successIconWrap}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className={styles.successTitle}>Thank You!</h3>
                  <p className={styles.successText}>
                    We have received your demo request. An OpenVals advisor will reach out to you.
                  </p>
                </div>
              ) : (
                /* Standard Booking Form */
                <form onSubmit={handleSubmit} className={styles.form}>
                  {errorMessage && (
                    <div className={styles.errorBanner}>{errorMessage}</div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.formLabel}>
                        First Name <span className={styles.requiredSign}>*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Ada"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName" className={styles.formLabel}>
                        Last Name <span className={styles.requiredSign}>*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Lovelace"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="workEmail" className={styles.formLabel}>
                      Business Email <span className={styles.requiredSign}>*</span>
                    </label>
                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.formLabel}>
                        Company Name <span className={styles.requiredSign}>*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="role" className={styles.formLabel}>
                        Job Title
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="VP of AI / Lead Engineer"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Tell us about your use case (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Which models are you using? What are your key reliability or latency goals?"
                      className={styles.textarea}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    <span>{isSubmitting ? "Submitting Request..." : "Request a Demo"}</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className={styles.securityNote}>
                    <Lock size={12} />
                    <span>100% confidential. No spam. Direct access to our advisor.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION (Arize Reference) ── */}
        <section className={styles.faqSection}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>
              Everything you need to know about booking an OpenVals technical demo.
            </p>
          </div>

          <div className={styles.faqGrid}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* ── POPUP MODAL FOR DATE SELECTION ── */}
      {showCalendarModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowCalendarModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInfo}>
                <div className={styles.modalBadge}>
                  <Calendar size={13} />
                  <span>Date &amp; Time Selection</span>
                </div>
                <h3 id="calendar-modal-title" className={styles.modalTitle}>
                  Select a Date &amp; Time for Your 30-Minute Demo
                </h3>
                <p className={styles.modalSubtitle}>
                  Meeting with Vishwanath Akuthota (Founder &amp; AI Architect)
                </p>
              </div>

              <div className={styles.modalHeaderActions}>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalNewTabBtn}
                  title="Open calendar in new tab"
                >
                  <ExternalLink size={14} />
                  <span>New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowCalendarModal(false)}
                  className={styles.modalCloseBtn}
                  aria-label="Close calendar modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Iframe Content */}
            <div className={styles.modalIframeWrapper}>
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduling"
                className={styles.calendlyIframe}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

