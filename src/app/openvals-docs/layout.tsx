import { pageMetadata } from "@/lib/seo";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = pageMetadata("/openvals-docs");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "light dark",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
