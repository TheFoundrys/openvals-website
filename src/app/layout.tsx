import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://openvalidations.com"),
  title: "OpenVals - Enterprise AI Validation, Security & Compliance",
  description: "OpenVals provides industrial-grade AI model validation, adversarial red teaming, and regulatory compliance for the EU AI Act and NIST. Build trustworthy AI systems today.",
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
    "Data Pipelines"
  ],
  openGraph: {
    title: "OpenVals - AI Validation & Assurance Platform",
    description: "Enterprise-grade trust layer for AI. We validate, secure, and certify machine learning models for production readiness.",
    url: "https://openvalidations.com",
    siteName: "OpenVals",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logos/open%20vals%20logo.png",
        width: 1200,
        height: 630,
        alt: "OpenVals Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenVals - The Trust Layer for AI",
    description: "Rigorous AI validation and adversarial red teaming to ensure model security and reliability.",
    images: ["/logos/open%20vals%20logo.png"],
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
    description: "The Trust Layer for AI. OpenVals ensures AI systems are secure, reliable, and validated before they reach the real world.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}

