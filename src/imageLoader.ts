type ImageLoaderProps = {
    src: string;
    width?: number;
    quality?: number;
};

/**
 * Custom Next.js image loader that prepends the basePath so that
 * next/image works correctly when deployed under a subdirectory
 * (e.g. GitHub Pages at /AlfaSky/).
 */
export default function imageLoader({ src }: ImageLoaderProps): string {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    // Don't double-prefix if src already includes basePath
    if (basePath && src.startsWith(basePath)) return src;
    return `${basePath}${src}`;
}
