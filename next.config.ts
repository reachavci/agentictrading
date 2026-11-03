import type { NextConfig } from "next";

// The page is still prerendered as static HTML at build time; Vercel serves it from its CDN.
// (Not using `output: "export"`, because static exports can't send custom headers.)
const nextConfig: NextConfig = {
  images: { unoptimized: true },

  // Private notebook: tell search engines not to index or follow anything on this site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
