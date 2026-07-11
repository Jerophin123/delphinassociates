import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: allow tunnel + LAN hosts to load /_next dev resources (HMR).
  // Next 16 deliberately rejects a bare "*" (wildcards may only match
  // subdomain labels), so cover every origin we use instead.
  // Ignored in production builds.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "**.trycloudflare.com",
    "*.ngrok-free.app",
    "*.loca.lt",
    "*.local",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    qualities: [75, 85],
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
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" }
        ],
      },
    ];
  },
};

export default nextConfig;
