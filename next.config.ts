import type { NextConfig } from 'next';

const nextConfig: any = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    'ais-dev-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app',
    'ais-pre-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app'
  ],
};

export default nextConfig;
