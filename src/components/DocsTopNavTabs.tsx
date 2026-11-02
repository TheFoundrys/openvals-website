"use client";

import React from "react";
import Link from "next/link";

export interface DocsTabItem {
  id: string;
  label: string;
  href: string;
  active: boolean;
}

interface DocsTopNavTabsProps {
  tabs: DocsTabItem[];
  className?: string;
}

export default function DocsTopNavTabs({
  tabs,
  className = "",
}: DocsTopNavTabsProps) {
  return (
    <nav
      className={className}
      aria-label="Docs sections"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "28px",
        height: "100%",
      }}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            height: "100%",
            fontSize: "14.5px",
            fontWeight: tab.active ? 700 : 500,
            color: tab.active
              ? "var(--docs-heading, #ffffff)"
              : "var(--docs-muted, #9ca3af)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "color 0.15s ease",
            padding: "0 2px",
          }}
          onMouseEnter={(e) => {
            if (!tab.active) {
              e.currentTarget.style.color = "var(--docs-heading, #ffffff)";
            }
          }}
          onMouseLeave={(e) => {
            if (!tab.active) {
              e.currentTarget.style.color = "var(--docs-muted, #9ca3af)";
            }
          }}
        >
          <span>{tab.label}</span>
          {tab.active && (
            <span
              style={{
                position: "absolute",
                bottom: "-1px",
                left: 0,
                right: 0,
                height: "2px",
                background: "var(--docs-accent, #2563eb)",
                borderRadius: "2px 2px 0 0",
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}

