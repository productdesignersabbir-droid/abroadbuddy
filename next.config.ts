import type { NextConfig } from "next";

// Built as plain files (the `out` folder) for Namecheap shared hosting.
const nextConfig: NextConfig = {
  output: "export",
  // Each page becomes folder/index.html, which Apache serves without rewrites.
  trailingSlash: true,
  images: {
    // There's no image server on static hosting; photos load straight from Unsplash.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
