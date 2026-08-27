import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  experimental: {},
  async redirects() {
    return [
      { source: '/products/cc-400', destination: '/products/dc-400', permanent: true },
      { source: '/en/products/cc-400', destination: '/en/products/dc-400', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
