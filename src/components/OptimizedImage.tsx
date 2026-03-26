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
    return (
        <>
            {priority && (
                <link
                    rel="preload"
                    as="image"
                    href={`${basePath}.webp`}
                    imageSrcSet={`${basePath}.avif`}
                />
            )}
            <picture>
                <source srcSet={`${basePath}.avif`} type="image/avif" />
                <source srcSet={`${basePath}.webp`} type="image/webp" />
                <img
                    src={`${basePath}.jpg`}
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
