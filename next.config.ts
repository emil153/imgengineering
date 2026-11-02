import type { NextConfig } from "next";

/**
 * Server build only: the quote form needs a Route Handler (/api/quote), so static export is not used.
 * Prototype previews are captured from the running server instead.
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
