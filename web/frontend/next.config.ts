import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/python/:path*",
        destination: "https://cardiovascular-disease-predictor-3q.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
