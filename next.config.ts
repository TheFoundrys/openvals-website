import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Existing deploy constraint; prefer AVIF/WebP when optimization is enabled later.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/vals-index",
        destination: "/openvals-index",
        permanent: true,
      },
      {
        // Keep the docs hub at /docs; only slug pages redirect into openvals-docs.
        source: "/docs/:slug+",
        destination: "/openvals-docs/:slug+",
        permanent: true,
      },
      {
        source: "/openvals-docs/quick-start",
        destination: "/openvals-docs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
