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
    ];
  },
};

export default nextConfig;
