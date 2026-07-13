import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // React <ViewTransition> on route navigations (see app/layout.tsx).
    viewTransition: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
