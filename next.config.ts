import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mm.bing.net',
      },
    ],
  },
};

export default nextConfig;
