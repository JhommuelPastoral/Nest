import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",      
        pathname: "/**" 
      },
    ],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
