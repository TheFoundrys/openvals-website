"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";

interface DocsProductSwitcherProps {
  currentSuite: "openvals" | "aixlence";
  className?: string;
}

const SUITES = [
  {
    id: "openvals" as const,
    name: "OpenVals Docs",
    href: "/openvals-docs",
    description: "Trust infrastructure, DRS & model evaluation",
  },
  {
    id: "aixlence" as const,
    name: "AIxLence Docs",
    href: "/aixlence-docs",
    description: "Readiness diagnostics & roadmap",
  },
];

export default function DocsProductSwitcher({
  currentSuite,
  className = "",
}: DocsProductSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProduct =
    SUITES.find((s) => s.id === currentSuite) || SUITES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Switcher Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px 12px",
          borderRadius: "7px",
          border: isOpen
            ? "1px solid var(--docs-accent, #2563eb)"
            : "1px solid var(--docs-pill-border, #cbd5e1)",
          background: "var(--docs-pill-bg, #f1f5f9)",
          color: "var(--docs-heading, #0f172a)",
          fontSize: "13.5px",
          fontWeight: 600,
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.15s ease",
          boxShadow: isOpen
            ? "0 0 0 2px var(--docs-accent-subtle, rgba(37, 99, 235, 0.2))"
            : "none",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor =
              "var(--docs-pill-border-hover, #94a3b8)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor =
              "var(--docs-pill-border, #cbd5e1)";
          }
        }}
      >
        <span>{currentProduct.name}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
            color: "var(--docs-muted, #64748b)",
          }}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 7px)",
            left: 0,
            minWidth: "210px",
            background: "var(--docs-dropdown-bg, #ffffff)",
            border: "1px solid var(--docs-dropdown-border, #e2e8f0)",
            borderRadius: "8px",
            padding: "5px",
            boxShadow:
              "var(--docs-dropdown-shadow, 0 14px 34px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06))",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            animation: "docsDropdownIn 0.12s ease-out",
          }}
        >
          {SUITES.map((suite) => {
            const isActive = suite.id === currentSuite;
            return (
              <Link
                key={suite.id}
                href={suite.href}
                onClick={() => setIsOpen(false)}
                role="menuitem"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? "var(--docs-accent, #2563eb)"
                    : "var(--docs-text, #334155)",
                  background: isActive
                    ? "var(--docs-accent-subtle, rgba(37, 99, 235, 0.08))"
                    : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "var(--docs-code-bg, rgba(0, 0, 0, 0.05))";
                    e.currentTarget.style.color =
                      "var(--docs-heading, #0f172a)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color =
                      "var(--docs-text, #334155)";
                  }
                }}
              >
                <span>{suite.name}</span>
                {isActive && (
                  <Check
                    size={16}
                    style={{
                      color: "var(--docs-accent, #2563eb)",
                      flexShrink: 0,
                      marginLeft: "12px",
                      strokeWidth: 2.5,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
