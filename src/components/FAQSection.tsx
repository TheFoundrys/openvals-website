"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is AI Compass?",
    answer: "AI Compass is our premier validation framework designed to stress-test AI models against real-world failures. It provides a comprehensive audit of safety, reliability, and performance metrics before you go to production.",
  },
  {
    question: "How does AI Compass work?",
    answer: "We use a multi-layered approach involving automated red-teaming, behavioral analysis, and edge-case simulation. Our proprietary algorithms detect subtle drifts and vulnerabilities that standard testing often misses.",
  },
  {
    question: "Who should use AI Compass?",
    answer: "Any organization deploying AI into business-critical environments. This includes fintech, healthcare providers, legal tech, and enterprise SaaS companies who need to ensure their AI is both safe and compliant.",
  },
  {
    question: "Is AI Compass suitable for startups?",
    answer: "Absolutely. We offer scalable validation tiers that allow startups to build trust with early customers and investors by demonstrating a 'security-first' approach to their AI development.",
  },
  {
    question: "How long does implementation take?",
    answer: "Initial vulnerability scans can be completed in as little as 48 hours. A full comprehensive audit and continuous monitoring setup typically takes 1-2 weeks depending on the complexity of your models.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div 
      style={{ 
        borderBottom: "1px solid var(--border)", 
        padding: "24px 0",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
        <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "var(--text-main)" }}>
          {question}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", color: "var(--accent)" }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: "1.6", fontSize: "16px" }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ 
      padding: "var(--section-padding) var(--container-padding)",
      backgroundColor: "var(--primary-bg)",
      position: "relative"
    }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "16px" }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: "var(--text-muted)", fontSize: "18px" }}
          >
            Everything you need to know about our validation process.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {FAQ_DATA.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ 
            marginTop: "60px", 
            textAlign: "center",
            padding: "40px",
            borderRadius: "24px",
            backgroundColor: "var(--secondary-bg)",
            border: "1px solid var(--border)"
          }}
        >
          <h4 style={{ marginBottom: "12px", fontSize: "20px" }}>Still have questions?</h4>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Our team is ready to help you navigate the complexities of AI validation.
          </p>
          <a 
            href="/contact" 
            style={{ 
              display: "inline-block",
              padding: "12px 32px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 600,
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
