import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avataaars.io',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true, // ⚠️ Only use if you trust the image source
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
