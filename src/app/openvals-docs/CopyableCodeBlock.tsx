"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyableCodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div style={{ position: "relative", margin: "18px 0 0" }}>
      <pre style={{ margin: 0, padding: "22px 58px 22px 22px", overflowX: "auto", color: "var(--docs-text)", fontSize: "14px", lineHeight: 1.75, background: "var(--docs-code-bg)", border: "1px solid var(--docs-border)", borderRadius: "14px" }}>
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        title="Copy code"
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "34px",
          height: "34px",
          display: "grid",
          placeItems: "center",
          borderRadius: "8px",
          border: "1px solid var(--docs-border)",
          background: "var(--docs-card)",
          color: "var(--docs-text)",
          cursor: "pointer"
        }}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
