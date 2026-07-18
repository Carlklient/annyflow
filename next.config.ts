import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/brand/**",
      },
      {
        pathname: "/icons/**",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/portfolio/**",
      },
    ],
  },
};

export default nextConfig;
