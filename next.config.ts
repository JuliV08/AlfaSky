import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    // Required for GitHub Pages: site is served at /AlfaSky/ not at /
    basePath: process.env.NODE_ENV === "production" ? "/AlfaSky" : "",
    assetPrefix: process.env.NODE_ENV === "production" ? "/AlfaSky/" : "",
    images: {
        unoptimized: true, // Static export — images served as-is (pre-optimized by build-assets.py)
    },
};

export default nextConfig;
