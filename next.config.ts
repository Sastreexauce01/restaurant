import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shadcnblocks.com',
        port: '',
        pathname: 'images/block/***',
        search: '',
      },
    ],
  },
};


export default nextConfig;
