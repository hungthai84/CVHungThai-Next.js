import type { NextConfig } from 'next';

const nextConfig: any = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    '*.run.app',
    'localhost:3000',
    '127.0.0.1:3000',
    'ais-dev-yf3b5yqxxjmrlzw7id7gkc-102425859277.asia-southeast1.run.app',
    'ais-pre-yf3b5yqxxjmrlzw7id7gkc-102425859277.asia-southeast1.run.app',
  ],
};

export default nextConfig;
