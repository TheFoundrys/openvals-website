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
  title: "OpenVals | The Trust Layer for AI",
  description: "AI systems are being deployed faster than they are understood. OpenVals ensures they are secure, reliable, and validated.",
  keywords: ["AI Validation", "AI Security", "AI Trust", "Red Teaming", "Model Validation"],
  openGraph: {
    title: "OpenVals | The Trust Layer for AI",
    description: "AI systems are being deployed faster than they are understood. OpenVals ensures they are secure, reliable, and validated.",
    url: "https://openvals.com",
    siteName: "OpenVals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenVals | The Trust Layer for AI",
    description: "AI systems are being deployed faster than they are understood. OpenVals ensures they are secure, reliable, and validated.",
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
    url: "https://openvals.com",
    description: "The Trust Layer for AI. OpenVals ensures AI systems are secure, reliable, and validated before they reach the real world.",
  };

  return (
    <html lang="en">
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
