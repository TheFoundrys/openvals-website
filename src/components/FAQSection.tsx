"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQEntry = {
  question: string;
  answer: ReactNode;
};

const FAQ_DATA: FAQEntry[] = [
  {
    question: "What exactly is OpenVals?",
    answer:
      'Think of us as the "safety inspectors" for the AI world. Just like you wouldn\'t drive a car that hasn\'t been crash-tested, we believe you shouldn\'t deploy AI that hasn\'t been thoroughly checked for safety, reliability, and security. We provide the "Trust Layer" that makes sure your AI is doing what it\'s supposed to do.',
  },
  {
    question: "Can't I just trust my AI model if it's working fine in testing?",
    answer:
      'Here\'s the thing: AI fails differently than normal software. It doesn\'t just "crash"—it might start giving wrong answers with total confidence (hallucinations), or it might have hidden biases you haven\'t noticed yet. Validation is about finding those "quiet failures" before they reach your customers.',
  },
  {
    question: 'You mention an "AI Assurance Framework." What does that actually mean for me?',
    answer: (
      <>
        <p style={{ margin: 0 }}>
          It&apos;s just our way of making sure we don&apos;t miss anything. We look at four main things:
        </p>
        <ul
          style={{
            margin: "16px 0 0",
            paddingLeft: "20px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            fontSize: "16px",
          }}
        >
          <li>Is it accurate? (Validation)</li>
          <li>Can it be hacked? (Vulnerability)</li>
          <li>Does it stay consistent over time? (Variability)</li>
          <li>Can you prove it&apos;s safe to auditors? (Verifiability)</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What\'s this "Adversarial First" approach I keep hearing about?',
    answer:
      'Most people test their AI to see if it works. We test it to see how it breaks. We act like the "bad guys" to find the weak spots in your model before anyone else does. It\'s better to find a bug in our lab than in your production environment.',
  },
  {
    question: 'What is "AI Security"? Is it as intense as it sounds?',
    answer:
      "It's essentially a high-stakes stress test. We try to trick your AI using techniques like prompt injection, jailbreaking, and data leakage probes. If your AI can withstand adversarial security testing, it's much more likely to be safe in the wild.",
  },
  {
    question: "Is my data safe while you're testing it?",
    answer:
      'Absolutely. Security is literally in our name. One of the main things we check for is "data leakage"—making sure your AI doesn\'t accidentally reveal sensitive training data or private information when someone asks it the right (or wrong) question.',
  },
  {
    question: "What do I actually get at the end of the day?",
    answer:
      'You get a clear, easy-to-read report that tells you exactly how ready your AI is for the real world. We give you a "readiness score" and a list of specific things you can do to make your model safer and more reliable.',
  },
  {
    question: "Is OpenVals only for big tech companies?",
    answer:
      "Not at all. If you're building or using AI for anything important—whether you're a startup or a global enterprise—you need to know it's trustworthy. If it's business-critical, it's OpenVals-critical.",
  },
  {
    question: "How do we get started?",
    answer:
      "Just reach out! We can show you a sample report so you can see exactly what our validation looks like, or we can jump straight into checking your first model. No more guessing—just clear, validated trust.",
  },
  {
    question: "What is AI Compass?",
    answer:
      "AI Compass is our premier validation framework designed to stress-test AI models against real-world failures. It provides a comprehensive audit of safety, reliability, and performance metrics before you go to production.",
  },
  {
    question: "How does AI Compass work?",
    answer:
      "We use a multi-layered approach involving automated adversarial security testing, behavioral analysis, and edge-case simulation. Our proprietary algorithms detect subtle drifts and vulnerabilities that standard testing often misses.",
  },
  {
    question: "Who should use AI Compass?",
    answer:
      "Any organization deploying AI into business-critical environments. This includes fintech, healthcare providers, legal tech, and enterprise SaaS companies who need to ensure their AI is both safe and compliant.",
  },
  {
    question: "Is AI Compass suitable for startups?",
    answer:
      "Absolutely. We offer scalable validation tiers that allow startups to build trust with early customers and investors by demonstrating a 'security-first' approach to their AI development.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Initial vulnerability scans can be completed in as little as 48 hours. A full comprehensive audit and continuous monitoring setup typically takes 1-2 weeks depending on the complexity of your models.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
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
            <motion.div
              style={{ color: "var(--text-muted)", lineHeight: "1.6", fontSize: "16px" }}
            >
              {typeof answer === "string" ? <p style={{ margin: 0 }}>{answer}</p> : answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ wide = false }: { wide?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{
      padding: "var(--section-padding) var(--container-padding)",
      backgroundColor: "var(--primary-bg)",
      position: "relative"
    }}>
      <motion.div
        className="container"
        style={wide ? { width: "auto" } : { maxWidth: "800px" }}
      >
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
            href="https://calendly.com/vishwanath-akuthota/30min"
            target="_blank"
            rel="noopener noreferrer"
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
      </motion.div>
    </section>
  );
}
