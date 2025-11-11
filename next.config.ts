import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    // Force apex domain to redirect to canonical www host
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "delphinassociates.com",
          },
        ],
        destination: "https://www.delphinassociates.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
