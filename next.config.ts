import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/braille1010111',
  assetPrefix: '/braille1010111/',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
