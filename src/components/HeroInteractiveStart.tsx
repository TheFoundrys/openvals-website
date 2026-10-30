"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Copy, Check, Info } from "lucide-react";
import styles from "./ui.module.css";

export default function HeroInteractiveStart() {
  const [activeTab, setActiveTab] = useState<"product" | "terminal">("product");
  const [pkgManager, setPkgManager] = useState<"pip" | "uv">("pip");
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const command = pkgManager === "pip" ? "pip install openvals" : "uv add openvals";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className={styles.heroInteractiveContainer}>
      {/* ── SEGMENTED PILL SWITCH (Matching Image 2 & 3) ── */}
      <div className={styles.heroSegmentedToggle} role="tablist">
        <button
          type="button"
          role="tab"
          data-tab="product"
          aria-selected={activeTab === "product"}
          onClick={() => setActiveTab("product")}
          className={`${styles.heroToggleOption} ${activeTab === "product" ? styles.heroToggleOptionActive : ""}`}
        >
          Start in the product
        </button>

        <button
          type="button"
          role="tab"
          data-tab="terminal"
          aria-selected={activeTab === "terminal"}
          onClick={() => setActiveTab("terminal")}
          className={`${styles.heroToggleOption} ${activeTab === "terminal" ? styles.heroToggleOptionActive : ""}`}
        >
          Start in your terminal
        </button>
      </div>

      {/* ── TAB CONTENT: PRODUCT CTAs vs TERMINAL CODE BOX ── */}
      <div className={styles.heroTabContentArea}>
        <AnimatePresence mode="wait">
          {activeTab === "product" ? (
            <motion.div
              key="product-ctas"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className={styles.heroActionsRow}
            >
              <Link
                href="https://dev.openvalidations.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroPrimaryBtn}
              >
                <span>Sign Up</span>
                {/* <ArrowRight size={17} /> */}
              </Link>

              <Link
                href="/assessment"
                className={styles.heroSecondaryBtn}
              >
                <span>Book a Free Assessment</span>
                {/* <ArrowRight size={16} /> */}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="terminal-box"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className={styles.terminalCardWrapper}
            >
              {/* Terminal Box matching Image 3 */}
              <div className={styles.terminalBox}>
                {/* Header with package manager tab: [ pip ] install */}
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalPkgTabs}>
                    <button
                      type="button"
                      onClick={() => setPkgManager("pip")}
                      className={`${styles.terminalTabBtn} ${pkgManager === "pip" ? styles.terminalTabBtnActive : ""}`}
                    >
                      pip
                    </button>
                    <button
                      type="button"
                      onClick={() => setPkgManager("uv")}
                      className={`${styles.terminalTabBtn} ${pkgManager === "uv" ? styles.terminalTabBtnActive : ""}`}
                    >
                      uv
                    </button>
                    <span className={styles.terminalSubLabel}>install</span>
                  </div>
                </div>

                {/* Command Line with Hot Pink $ and Copy Button */}
                <div className={styles.terminalBody}>
                  <div className={styles.terminalCodeLine}>
                    <span className={styles.terminalPromptSign}>$</span>
                    <span className={styles.terminalCodeText}>{command}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.terminalCopyBtn}
                    aria-label="Copy terminal install command"
                    title={copied ? "Copied!" : "Copy to clipboard"}
                  >
                    {copied ? (
                      <Check size={15} className={styles.terminalCheckIcon} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* Sub-row: "What does this run?" on left + AI Provider Icons on right */}
              <div className={styles.terminalMetaRow}>
                <div className={styles.terminalHelpWrap}>
                  <button
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    className={styles.terminalHelpLink}
                  >
                    <Info size={13} />
                    <span>What does this run?</span>
                  </button>

                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.terminalTooltip}
                    >
                      Installs the open-source OpenVals Python package for automated LLM benchmarking, safety evaluation, and red-teaming directly in your terminal.
                      <div style={{ marginTop: "6px" }}>
                        <Link href="/openvals-docs" className={styles.terminalTooltipDocLink}>
                          View CLI Documentation →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* AI Ecosystem Icons matching Image 3 */}
                <div className={styles.terminalEcosystemIcons}>
                  {/* Claude / Anthropic (Asterisk / Sunburst) */}
                  <span className={styles.ecosystemIcon} title="Claude / Anthropic">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v3.1a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 13.9a1.5 1.5 0 0 1 1.5 1.5v3.1a1.5 1.5 0 0 1-3 0v-3.1a1.5 1.5 0 0 1 1.5-1.5zm8.5-4.9a1.5 1.5 0 0 1-1.5 1.5h-3.1a1.5 1.5 0 0 1 0-3H19a1.5 1.5 0 0 1 1.5 1.5zm-13.9 0a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1 0-3h3.1a1.5 1.5 0 0 1 1.5 1.5zm10.7-6.2a1.5 1.5 0 0 1 0 2.12l-2.19 2.19a1.5 1.5 0 1 1-2.12-2.12l2.19-2.19a1.5 1.5 0 0 1 2.12 0zm-9.8 9.8a1.5 1.5 0 0 1 0 2.12l-2.19 2.19a1.5 1.5 0 0 1-2.12-2.12l2.19-2.19a1.5 1.5 0 0 1 2.12 0zm0-9.8a1.5 1.5 0 0 1 2.12 0l2.19 2.19a1.5 1.5 0 1 1-2.12 2.12l-2.19-2.19a1.5 1.5 0 0 1 0-2.12zm9.8 9.8a1.5 1.5 0 0 1 2.12 0l2.19 2.19a1.5 1.5 0 0 1-2.12 2.12l-2.19-2.19a1.5 1.5 0 0 1 0-2.12z" />
                    </svg>
                  </span>

                  {/* OpenAI */}
                  <span className={styles.ecosystemIcon} title="OpenAI">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.5 10.7a5.5 5.5 0 0 0-.5-4.5 5.6 5.6 0 0 0-4-2.8 5.6 5.6 0 0 0-5.1 1.1 5.5 5.5 0 0 0-4.3.4A5.6 5.6 0 0 0 4.8 8a5.5 5.5 0 0 0-2.4 4.1 5.6 5.6 0 0 0 1.2 5 5.6 5.6 0 0 0 4 2.8 5.6 5.6 0 0 0 5.1-1.1 5.5 5.5 0 0 0 4.3-.4 5.6 5.6 0 0 0 2.8-3.1 5.5 5.5 0 0 0 2.4-4.1 5.6 5.6 0 0 0-.7-.5zM12 14.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z" />
                    </svg>
                  </span>

                  {/* Hugging Face / Open Models Isometric Cube */}
                  <span className={styles.ecosystemIcon} title="Hugging Face & Open Models">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.12 6.4-6.05-3.5a2 2 0 0 0-2 0l-6.05 3.5A2 2 0 0 0 6 8.13v7a2 2 0 0 0 1.02 1.73l6.05 3.5a2 2 0 0 0 2 0l6.05-3.5A2 2 0 0 0 22 15.13v-7a2 2 0 0 0-.88-1.73z" />
                      <path d="m12 22 8.94-5.16" />
                      <path d="M12 12v10" />
                      <path d="m12 12-8.94-5.16" />
                    </svg>
                  </span>

                  {/* Ollama / Local LLMs */}
                  <span className={styles.ecosystemIcon} title="Ollama / Local LLMs">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-6H7v-2h6v2zm4 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-6h-2v-2h2v2z" />
                    </svg>
                  </span>

                  {/* Gemini Sparkle */}
                  <span className={styles.ecosystemIcon} title="Google Gemini">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1C12 7.075 7.075 12 1 12c6.075 0 11 4.925 11 11 0-6.075 4.925-11 11-11-6.075 0-11-4.925-11-11z" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
