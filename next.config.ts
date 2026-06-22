import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {},
  async redirects() {
    return [
      { source: '/products/cc-400', destination: '/products/dc-400', permanent: true },
    ];
  },
};

export default nextConfig;
