import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 82],
    // Local art is now pre-sized WebP, so optimized variants stay valid for a
    // year instead of being re-derived every 60s (the default).
    minimumCacheTTL: 31536000,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['192.168.100.8', 'localhost', '127.0.0.1'],
};

export default nextConfig;
