import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["imgv3.fotor.com"], // Add allowed image domains here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
