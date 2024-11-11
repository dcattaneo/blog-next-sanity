import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    ppr: "incremental", // The experimental feature "experimental.ppr" can only be enabled when using the latest canary version of Next.js.
    after: true, // Set to true (unstable_after)
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
