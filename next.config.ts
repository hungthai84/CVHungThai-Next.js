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
    'ais-dev-p3fcqewq6orsf7mo7g35ip-414821367668.asia-southeast1.run.app',
    'ais-pre-p3fcqewq6orsf7mo7g35ip-414821367668.asia-southeast1.run.app',
    'ais-dev-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app',
    'ais-pre-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app'
  ],
};

export default nextConfig;
