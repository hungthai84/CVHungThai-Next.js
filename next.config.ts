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
    'ais-dev-6hxzxkkaot2jhscqrhah3o-498435453400.asia-southeast1.run.app',
    'ais-pre-6hxzxkkaot2jhscqrhah3o-498435453400.asia-southeast1.run.app',
    'ais-dev-dbvmw6fehab24wduzejal4-102425859277.asia-southeast1.run.app',
    'ais-pre-dbvmw6fehab24wduzejal4-102425859277.asia-southeast1.run.app',
    'ais-dev-p3fcqewq6orsf7mo7g35ip-414821367668.asia-southeast1.run.app',
    'ais-pre-p3fcqewq6orsf7mo7g35ip-414821367668.asia-southeast1.run.app',
    'ais-dev-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app',
    'ais-pre-ydssgl7762xdlufsdggais-498435453400.asia-southeast1.run.app'
  ],
};

export default nextConfig;
