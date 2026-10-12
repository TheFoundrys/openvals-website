import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/vals-index",
        destination: "/openvals-index",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/openvals-docs",
        permanent: true,
      },
      {
        source: "/docs/:slug*",
        destination: "/openvals-docs/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
