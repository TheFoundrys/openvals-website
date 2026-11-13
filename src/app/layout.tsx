import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SQUARE_IMAGE,
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
} from "../lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
};

const home = createPageMetadata({
  title: "Enterprise AI Validation, Security & Compliance",
  description:
    "OpenVals helps enterprises validate, secure, and trust AI before production with independent benchmarks, DRS scoring, and assurance workflows.",
  path: "/",
});

export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Enterprise AI Validation, Security & Compliance`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: DEFAULT_SQUARE_IMAGE, type: "image/png", sizes: "192x192" },
      { url: DEFAULT_SQUARE_IMAGE, type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    ...home.openGraph,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
      {
        url: DEFAULT_SQUARE_IMAGE,
        width: 1200,
        height: 1200,
        alt: SITE_NAME,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_SQUARE_IMAGE}`,
      image: `${SITE_URL}${DEFAULT_SQUARE_IMAGE}`,
      description:
        "OpenVals helps enterprises validate, secure, and trust AI before production.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "OpenVals helps enterprises validate, secure, and trust AI before production.",
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Synchronous inline script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('openvals-theme');var d=s==='dark'||s==='light'?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(d?'dark':'light');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
        <link
          rel="preload"
          href="/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
