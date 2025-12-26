import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Transpile packages that may have issues with App Router
  transpilePackages: ['react-hot-toast', 'react-fast-marquee'],
};

export default nextConfig;
