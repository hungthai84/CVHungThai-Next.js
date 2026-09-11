import type { NextConfig } from 'next';

const nextConfig: any = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    'ais-dev-ruwu6aiuxu6pkuncsczmrn-102425859277.asia-southeast1.run.app',
    'ais-pre-ruwu6aiuxu6pkuncsczmrn-102425859277.asia-southeast1.run.app'
  ],
};

export default nextConfig;
