interface OptimizedImageProps {
    basePath: string;  // e.g. "/media/home/hero-bg-d" (no extension)
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
    width?: number;
    height?: number;
}

/**
 * Renders a <picture> element with AVIF → WebP → JPG sources.
 * Supports preload via priority prop.
 * basePath should be like "/media/home/hero-bg-d" (without extension).
 */
export function OptimizedImage({
    basePath,
    alt,
    className = "",
    priority = false,
    sizes,
    width,
    height,
}: OptimizedImageProps) {
    // Prepend the Next.js basePath so assets resolve correctly when deployed
    // under a subdirectory (e.g. GitHub Pages at /AlfaSky/).
    const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + basePath;

    return (
        <>
            {priority && (
                <link
                    rel="preload"
                    as="image"
                    href={`${base}.webp`}
                    imageSrcSet={`${base}.avif`}
                />
            )}
            <picture>
                <source srcSet={`${base}.avif`} type="image/avif" />
                <source srcSet={`${base}.webp`} type="image/webp" />
                <img
                    src={`${base}.jpg`}
                    alt={alt}
                    className={className}
                    loading={priority ? "eager" : "lazy"}
                    decoding={priority ? "sync" : "async"}
                    sizes={sizes}
                    width={width}
                    height={height}
                />
            </picture>
        </>
    );
}
