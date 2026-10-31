import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "AIxLence Docs | OpenVals",
  description:
    "AIxLence enterprise AI readiness diagnostic, capability levels, 36-question assessment, value realization simulator, and transformation roadmap.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "light dark",
};

export default function AIxlenceDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

