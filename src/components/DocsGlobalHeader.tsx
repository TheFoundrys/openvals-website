"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import DocsProductSwitcher from "./DocsProductSwitcher";
import DocsTopNavTabs, { DocsTabItem } from "./DocsTopNavTabs";

interface DocsGlobalHeaderProps {
  currentSuite: "openvals" | "aixlence";
  tabs: DocsTabItem[];
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function DocsGlobalHeader({
  currentSuite,
  tabs,
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}: DocsGlobalHeaderProps) {
  return (
    <header
      className="docsGlobalHeader"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "var(--docs-header, rgba(255, 255, 255, 0.94))",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* ROW 1: Brand Logo + Product Switcher Pill */}
      <div
        className="docsGlobalHeaderRow1"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "54px",
          padding: "0 28px",
          borderBottom: "1px solid var(--docs-border-soft, #e2e8f0)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Logo without glyph */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "var(--docs-heading, #0f172a)",
              fontSize: "19px",
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <span>OpenVals</span>
          </Link>

          {/* Switcher Pill Button directly beside logo */}
          <DocsProductSwitcher currentSuite={currentSuite} />
        </div>

        {/* Mobile Menu Toggle Button */}
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="docsMobileMenuBtn"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "6px",
              border: "1px solid var(--docs-border, rgba(255, 255, 255, 0.15))",
              background: "var(--docs-card, #121420)",
              color: "var(--docs-heading, #ffffff)",
              cursor: "pointer",
            }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </div>

      {/* ROW 2: Horizontal Tabs with Pink Underline */}
      <div
        className="docsGlobalHeaderRow2"
        style={{
          display: "flex",
          alignItems: "center",
          height: "42px",
          padding: "0 28px",
          borderBottom: "1px solid var(--docs-border-soft, #e2e8f0)",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <DocsTopNavTabs tabs={tabs} />
      </div>
    </header>
  );
}
