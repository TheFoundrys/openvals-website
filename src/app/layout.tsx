import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://openvalidations.com"),
  title: "OpenVals - Enterprise AI Validation, Security & Compliance",
  description: "OpenVals helps enterprises validate, secure, and trust AI before production.",
  keywords: [
    "AI Validation",
    "AI Security",
    "AI Trust",
    "Model Validation",
    "AI Governance",
    "EU AI Act Compliance",
    "Responsible AI",
    "AI Performance Auditing",
    "AI Engineering",
    "Applied Data Science",
    "MLOps",
    "AI Quality Assurance",
    "Predictive Modeling",
    "Data Pipelines",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/openvals-square.png", type: "image/png", sizes: "192x192" },
      { url: "/openvals-square.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "OpenVals - AI Validation & Assurance Platform",
    description: "OpenVals helps enterprises validate, secure, and trust AI before production.",
    url: "https://openvalidations.com",
    siteName: "OpenVals",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/openvals-square.png",
        width: 1200,
        height: 1200,
        alt: "OpenVals",
      },
      {
        url: "/openvals-og.png",
        width: 1200,
        height: 630,
        alt: "OpenVals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenVals - The Trust Layer for AI",
    description: "OpenVals helps enterprises validate, secure, and trust AI before production.",
    images: ["/openvals-square.png", "/openvals-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OpenVals",
    url: "https://openvalidations.com",
    logo: "https://openvalidations.com/openvals-square.png",
    image: "https://openvalidations.com/openvals-square.png",
    description: "OpenVals helps enterprises validate, secure, and trust AI before production.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Synchronous inline script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('theme');localStorage.removeItem('next-themes');localStorage.removeItem('openvals-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(d?'dark':'light');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
