import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Using local images now; keep remotePatterns empty to avoid external calls
    remotePatterns: [],
  },

  // Enable experimental features for better RTL support
  experimental: {},
};

export default nextConfig;
