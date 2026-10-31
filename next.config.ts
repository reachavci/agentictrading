import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to /out.
// Vercel serves it as a static site (no server needed).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
