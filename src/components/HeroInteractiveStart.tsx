"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import styles from "./ui.module.css";

const SIGNUP_URL = "https://prod.openvalidations.com/auth/signup";

export default function HeroInteractiveStart() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = async (cmd: string, id: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className={styles.heroInteractiveContainer}>
      <div className={styles.terminalCardWrapper}>
        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalWindowDots} aria-hidden="true">
              <span className={styles.terminalDotRed} />
              <span className={styles.terminalDotYellow} />
              <span className={styles.terminalDotGreen} />
            </div>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalRow}>
              <code className={styles.terminalCodeLine}>
                <span className={styles.terminalPromptSign}>&gt;</span>
                <span className={styles.terminalCodeText}>
                  pip install <span className={styles.terminalPkgHighlight}>openvals</span>
                </span>
              </code>
              <button
                type="button"
                onClick={() => handleCopy("pip install openvals", "pip")}
                className={styles.terminalCopyBtn}
                title="Copy to clipboard"
                aria-label={copiedCmd === "pip" ? "Copied" : "Copy pip install command"}
              >
                {copiedCmd === "pip" ? (
                  <Check size={15} className={styles.terminalCheckIcon} />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>

            <div className={styles.terminalRow}>
              <code className={styles.terminalCodeLine}>
                <span className={styles.terminalPromptSign}>&gt;</span>
                <span className={styles.terminalCodeText}>
                  uv pip install <span className={styles.terminalPkgHighlight}>openvals</span>
                </span>
              </code>
              <button
                type="button"
                onClick={() => handleCopy("uv pip install openvals", "uv")}
                className={styles.terminalCopyBtn}
                title="Copy to clipboard"
                aria-label={copiedCmd === "uv" ? "Copied" : "Copy uv pip install command"}
              >
                {copiedCmd === "uv" ? (
                  <Check size={15} className={styles.terminalCheckIcon} />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.trustActions}>
        <a
          href={SIGNUP_URL}
          className={`${styles.button} ${styles.primary} ${styles.trustActionButton} ${styles.trustActionPrimary}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up
        </a>
        <Link
          href="/book-a-demo"
          className={`${styles.button} ${styles.secondary} ${styles.trustActionButton}`}
        >
          Book a Demo
        </Link>
      </div>

      <p className={styles.heroCapabilityRow} aria-label="Core capabilities">
        {(["Evaluate", "Benchmark", "Validate", "Trust"] as const).map((label, index) => (
          <Fragment key={label}>
            {index > 0 ? (
              <span className={styles.heroCapabilitySep} aria-hidden="true">
                ·
              </span>
            ) : null}
            <span className={styles.heroCapabilityItem}>{label}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
