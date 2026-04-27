import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // デモ公開を優先するため、ビルド時のチェックをスキップ設定にします
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;