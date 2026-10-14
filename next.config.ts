import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: "https://dev.openvalidations.com/api/v1",
    // NEXT_PUBLIC_API_BASE_URL: "http://192.168.1.120:8001/api/v1",
    NEXT_PUBLIC_APP_URL: "https://dev.openvalidations.com",
    // NEXT_PUBLIC_APP_URL: "http://192.168.1.120:3003",
  },
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
