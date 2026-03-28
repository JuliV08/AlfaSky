import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true, // Static export — images served as-is (pre-optimized by build-assets.py)
    },
};

export default nextConfig;
