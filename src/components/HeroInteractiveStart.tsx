"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import styles from "./ui.module.css";

import { marketingSignupHref } from "@/lib/openvalsUrls";

const SIGNUP_URL = marketingSignupHref("website", 15);

export default function HeroInteractiveStart() {
  const [copied, setCopied] = useState(false);
  const command = "pip install openvals";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <code className={styles.terminalCodeLine}>
              <span className={styles.terminalPromptSign}>&gt;</span>
              <span className={styles.terminalCodeText}>
                pip install <span className={styles.terminalPkgHighlight}>openvals</span>
              </span>
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className={styles.terminalCopyBtn}
              title="Copy to clipboard"
              aria-label={copied ? "Copied" : "Copy install command"}
            >
              {copied ? <Check size={15} className={styles.terminalCheckIcon} /> : <Copy size={15} />}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.trustActions}>
        <a
          href={SIGNUP_URL}
          className={`${styles.button} ${styles.primary} ${styles.trustActionButton} ${styles.trustActionPrimary}`}
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
