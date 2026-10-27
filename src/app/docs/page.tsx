"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./docs.module.css";
import { ArrowUp, Bot, X } from "lucide-react";

type SquareColor =
  | "squareYellow"
  | "squareBlue"
  | "squareCyan"
  | "squareGreen"
  | "squarePurple"
  | "squareOrange"
  | "squareRose";

type DocEntry = {
  id: string;
  title: string;
  description: string;
  color: SquareColor;
};

type DocSection = {
  sectionTitle: string;
  items: DocEntry[];
};

const DOC_SECTIONS: DocSection[] = [
  {
    sectionTitle: "HUB & CLIENT LIBRARIES",
    items: [
      {
        id: "welcome",
        title: "OpenVals Platform",
        description: "Trust infrastructure, evaluation engines, and hallucination defense for production AI",
        color: "squareYellow",
      },
      {
        id: "quick-start",
        title: "Python SDK & Quick Start",
        description: "Python client to interact with OpenVals, evaluate models, and run automated benchmarks",
        color: "squareBlue",
      },
      {
        id: "installation",
        title: "CLI & Installation",
        description: "Tools for agents and humans to install openvals and inspect local environments",
        color: "squareCyan",
      },
      {
        id: "dataset-intelligence",
        title: "Dataset Intelligence",
        description: "CLI and API for schema validation, semantic diversity, and dataset balance auditing",
        color: "squareGreen",
      },
      {
        id: "why-openvals",
        title: "Why OpenVals",
        description: "Understanding LLM drift, hallucination risk, and how systematic evaluations protect deployments",
        color: "squarePurple",
      },
      {
        id: "samples",
        title: "CLI Samples & Doctor",
        description: "Terminal commands, doctor diagnostics, health inspections, and trust advisor outputs",
        color: "squareOrange",
      },
    ],
  },
  {
    sectionTitle: "TRUST & EVALUATION ENGINES",
    items: [
      {
        id: "drs",
        title: "Decision Reliability Score (DRS)",
        description: "Statistical trust formula quantifying deployment reliability across factuality and variance",
        color: "squareYellow",
      },
      {
        id: "model-evaluation",
        title: "Model Evaluation Engine",
        description: "Multi-turn evaluation signals measuring accuracy, reasoning stability, and prompt adherence",
        color: "squareBlue",
      },
      {
        id: "factuality-engine",
        title: "Factuality Engine",
        description: "Semantic claim extraction and ground-truth verification against trusted source material",
        color: "squareCyan",
      },
      {
        id: "hpi",
        title: "Hallucination Probability Index (HPI)",
        description: "Continuous probability modeling flagging fabrications, unsupported assertions, and risk levels",
        color: "squareRose",
      },
      {
        id: "parallel-execution",
        title: "Parallel Execution Engine",
        description: "High-throughput async execution pipeline evaluating thousands of prompts across worker pools",
        color: "squareGreen",
      },
      {
        id: "semantic-intelligence",
        title: "Semantic Intelligence",
        description: "Vector embedding analysis, contextual drift detection, and semantic closeness scoring",
        color: "squarePurple",
      },
    ],
  },
  {
    sectionTitle: "BENCHMARKING & DOMAINS",
    items: [
      {
        id: "benchmarking",
        title: "Multi-Model Benchmarking",
        description: "Side-by-side comparative benchmarking for local models and commercial LLM APIs",
        color: "squareYellow",
      },
      {
        id: "domains",
        title: "Supported Benchmark Domains",
        description: "Tailored validation suites for Finance, Healthcare, Legal, Developer, and Cybersecurity",
        color: "squareBlue",
      },
      {
        id: "metrics",
        title: "Metrics Explained",
        description: "Comprehensive metric guide: Accuracy, Variance, Reliability, DRS, HPI, and Latency",
        color: "squareCyan",
      },
      {
        id: "screenshots",
        title: "Screenshots & Previews",
        description: "Trust dashboard previews, single model executive reports, and dataset validation visual UI",
        color: "squareOrange",
      },
      {
        id: "reporting",
        title: "Executive Reporting",
        description: "Audit-ready executive PDF summaries, sample-level forensic breakdowns, and JSON exports",
        color: "squareGreen",
      },
    ],
  },
  {
    sectionTitle: "DEPLOYMENT, INTEGRATIONS & PROVIDERS",
    items: [
      {
        id: "integrations",
        title: "Inference & Model Integrations",
        description: "Connect Ollama, Hugging Face, OpenAI, Anthropic, Gemini, AWS Bedrock, and custom API endpoints",
        color: "squareYellow",
      },
      {
        id: "roadmap",
        title: "Platform Roadmap",
        description: "Milestones for v0.5.5, Trust Advisor v0.6.0, agentic evaluations, and cloud sandbox",
        color: "squareBlue",
      },
      {
        id: "vision",
        title: "Philosophy & Vision",
        description: "Our mission to provide transparent, open, and reproducible trust evaluation for enterprise AI",
        color: "squarePurple",
      },
    ],
  },
  {
    sectionTitle: "COMMUNITY, GOVERNANCE & SECURITY",
    items: [
      {
        id: "contributing",
        title: "Contributing Guide",
        description: "How to contribute new evaluation benchmarks, metrics, and provider connectors to OpenVals",
        color: "squareGreen",
      },
      {
        id: "security-policy",
        title: "Security Policy",
        description: "Vulnerability reporting guidelines, response timeline SLAs, and safe harbor protections",
        color: "squareRose",
      },
      {
        id: "code-of-conduct",
        title: "Code of Conduct",
        description: "Community standards for fostering an inclusive, welcoming, and harassment-free environment",
        color: "squareCyan",
      },
    ],
  },
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DOC_SECTIONS;

    return DOC_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          section.sectionTitle.toLowerCase().includes(q)
      ),
    })).filter((section) => section.items.length > 0);
  }, [searchQuery]);

  return (
    <>
      <Header />
      <main className={styles.hfDocsContainer}>
        <div className={styles.contentWrapper}>
          {/* Header Area */}
          <div className={styles.headerArea}>
            <div className={styles.titleRow}>
              <span className={styles.titleIcon} role="img" aria-label="Documentation">
                📖
              </span>
              <h1 className={styles.pageTitle}>Documentation</h1>
            </div>
            <p className={styles.subtitle}>
              Guides, references, and API docs for the OpenVals ecosystem.
            </p>

            {/* Search Bar matching "Ask HuggingChat" style */}
            <form
              className={styles.searchBarForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.searchBarInner}>
                <div className={styles.searchIconLeft}>
                  <Bot size={18} />
                </div>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Ask OpenVals or search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search OpenVals documentation"
                />
                <div className={styles.searchRightActions}>
                  {searchQuery && (
                    <button
                      type="button"
                      className={styles.clearSearchBtn}
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className={styles.submitArrowBtn}
                    aria-label="Submit search"
                  >
                    <ArrowUp size={15} />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Documentation Sections */}
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <section key={section.sectionTitle} className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>{section.sectionTitle}</div>
                <div className={styles.gridTable}>
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/openvals-docs${item.id === "welcome" ? "" : `/${item.id}`}`}
                      className={styles.gridItem}
                    >
                      <div className={styles.itemTitleRow}>
                        <span className={`${styles.itemSquare} ${styles[item.color]}`} />
                        <h2 className={styles.itemTitle}>{item.title}</h2>
                      </div>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No documentation found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
