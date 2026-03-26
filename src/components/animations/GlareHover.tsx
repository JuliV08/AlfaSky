import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import './GlareHover.css';

interface GlareHoverProps {
    width?: string;
    height?: string;
    background?: string;
    borderRadius?: string;
    borderColor?: string;
    children: React.ReactNode;
    glareColor?: string;
    glareOpacity?: number;
    glareAngle?: number;
    glareSize?: number;
    transitionDuration?: number;
    playOnce?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const GlareHover = ({
    width = '100%',
    height = '100%',
    background = 'transparent',
    borderRadius = '16px',
    borderColor = 'transparent', // Usually we let the child card handle its own border
    children,
    glareColor = '#ffffff',
    glareOpacity = 0.5,
    glareAngle = -45,
    glareSize = 250,
    transitionDuration = 800,
    playOnce = false,
    className = '',
    style = {}
}: GlareHoverProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsPlaying(true);
            const timer = setTimeout(() => {
                setIsPlaying(false);
            }, transitionDuration);
            return () => clearTimeout(timer);
        }
    }, [isInView, transitionDuration]);

    const hex = glareColor.replace('#', '');
    let rgba = glareColor;

    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }

    const vars = {
        '--gh-width': width,
        '--gh-height': height,
        '--gh-bg': background,
        '--gh-br': borderRadius,
        '--gh-angle': `${glareAngle}deg`,
        '--gh-duration': `${transitionDuration}ms`,
        '--gh-size': `${glareSize}%`,
        '--gh-rgba': rgba,
        '--gh-border': borderColor,
    } as React.CSSProperties;

    return (
        <div
            ref={containerRef}
            className={`glare-hover ${playOnce ? 'glare-hover--play-once' : ''} ${isPlaying ? 'glare-playing' : ''} ${className}`}
            style={{ ...vars, ...style }}
        >
            {children}
        </div>
    );
};

export default GlareHover;
