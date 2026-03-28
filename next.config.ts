import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    // Required for GitHub Pages: site is served at /AlfaSky/ not at /
    basePath: isProd ? "/AlfaSky" : "",
    assetPrefix: isProd ? "/AlfaSky" : "",
    env: {
        // Exposed to client so non-next/image components can build correct public URLs
        NEXT_PUBLIC_BASE_PATH: isProd ? "/AlfaSky" : "",
    },
    images: {
        unoptimized: true, // Static export — images served as-is (pre-optimized by build-assets.py)
        loaderFile: "./src/imageLoader.ts", // Prepends basePath so next/image works under /AlfaSky/ on GitHub Pages
    },
};

export default nextConfig;
