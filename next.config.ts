import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["jjikplacestorage0063.blob.core.windows.net"],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.ts",
        },
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/req/:path*",
        destination: "https://api.vworld.kr/req/:path*",
      },
    ];
  },
};

export default nextConfig;
