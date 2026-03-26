'use client';

import { useRef, useEffect, useCallback, useMemo } from 'react';

/* ───────────────────────────────────────────────────────────
 * DotGrid — Interactive dot-matrix background (canvas-based).
 *
 * Adapted from reactbits.dev — rewritten WITHOUT gsap/InertiaPlugin
 * to avoid paid dependencies. Uses requestAnimationFrame spring physics.
 *
 * Colors tuned for AlfaSky brand: navy base → blue-accent active.
 * ─────────────────────────────────────────────────────────── */

function hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
    };
}

interface Dot {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    vx: number;
    vy: number;
}

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    shockRadius?: number;
    shockStrength?: number;
    className?: string;
    style?: React.CSSProperties;
}

const DotGrid = ({
    dotSize = 5,
    gap = 15,
    baseColor = '#051452',
    activeColor = '#340adb',
    proximity = 120,
    shockRadius = 250,
    shockStrength = 5,
    className = '',
    style,
}: DotGridProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const pointerRef = useRef({ x: -9999, y: -9999 });
    const rafIdRef = useRef<number>(0);

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    /* ── Build grid of dots ── */
    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cell = dotSize + gap;
        const cols = Math.floor((width + gap) / cell);
        const rows = Math.floor((height + gap) / cell);

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const startX = (width - gridW) / 2 + dotSize / 2;
        const startY = (height - gridH) / 2 + dotSize / 2;

        const dots: Dot[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                dots.push({
                    cx: startX + x * cell,
                    cy: startY + y * cell,
                    xOffset: 0,
                    yOffset: 0,
                    vx: 0,
                    vy: 0,
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    /* ── Animation loop: draw + spring physics + cursor repulsion ── */
    useEffect(() => {
        const proxSq = proximity * proximity;
        const radius = dotSize / 2;

        // Spring constants — snappy elastic return
        const stiffness = 0.06;
        const damping = 0.88;
        // Repulsion strength — how hard dots push away from cursor
        const repulsionForce = 0.8;

        let lastTime = performance.now();

        const draw = (now: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const dt = Math.min((now - lastTime) / 16.667, 3);
            lastTime = now;

            const w = canvas.style.width ? parseInt(canvas.style.width) : canvas.width;
            const h = canvas.style.height ? parseInt(canvas.style.height) : canvas.height;
            ctx.clearRect(0, 0, w * 2, h * 2);

            const { x: px, y: py } = pointerRef.current;

            for (const dot of dotsRef.current) {
                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;

                // ── Cursor repulsion: push dots away when within proximity ──
                if (dsq < proxSq && dsq > 0.01) {
                    const dist = Math.sqrt(dsq);
                    const falloff = 1 - dist / proximity;   // 1 at center → 0 at edge
                    const pushStrength = falloff * falloff * repulsionForce;
                    // Normalised push direction
                    dot.vx += (dx / dist) * pushStrength * dt;
                    dot.vy += (dy / dist) * pushStrength * dt;
                }

                // ── Spring back to origin ──
                const ax = -stiffness * dot.xOffset;
                const ay = -stiffness * dot.yOffset;
                dot.vx = (dot.vx + ax * dt) * damping;
                dot.vy = (dot.vy + ay * dt) * damping;
                dot.xOffset += dot.vx * dt;
                dot.yOffset += dot.vy * dt;

                // Snap tiny residual motion
                if (Math.abs(dot.xOffset) < 0.01 && Math.abs(dot.vx) < 0.01) {
                    dot.xOffset = 0;
                    dot.vx = 0;
                }
                if (Math.abs(dot.yOffset) < 0.01 && Math.abs(dot.vy) < 0.01) {
                    dot.yOffset = 0;
                    dot.vy = 0;
                }

                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;

                // ── Color interpolation ──
                let fillStyle = baseColor;
                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = 1 - dist / proximity;
                    const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                    const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                    const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                    fillStyle = `rgb(${r},${g},${b})`;
                }

                ctx.beginPath();
                ctx.arc(ox, oy, radius, 0, Math.PI * 2);
                ctx.fillStyle = fillStyle;
                ctx.fill();
            }

            rafIdRef.current = requestAnimationFrame(draw);
        };

        rafIdRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafIdRef.current);
    }, [proximity, baseColor, activeRgb, baseRgb, dotSize]);

    /* ── Resize observer ── */
    useEffect(() => {
        buildGrid();

        const ro = new ResizeObserver(buildGrid);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        return () => ro.disconnect();
    }, [buildGrid]);

    /* ── Pointer tracking + shock on click ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointerRef.current.x = e.clientX - rect.left;
            pointerRef.current.y = e.clientY - rect.top;
        };

        const onClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;

            for (const dot of dotsRef.current) {
                const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                if (dist < shockRadius) {
                    const falloff = Math.max(0, 1 - dist / shockRadius);
                    dot.vx += (dot.cx - cx) * shockStrength * falloff * 0.06;
                    dot.vy += (dot.cy - cy) * shockStrength * falloff * 0.06;
                }
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('click', onClick);
        };
    }, [shockRadius, shockStrength]);

    /* ── Reset pointer on leave ── */
    useEffect(() => {
        const onLeave = () => {
            pointerRef.current.x = -9999;
            pointerRef.current.y = -9999;
        };
        document.addEventListener('mouseleave', onLeave);
        return () => document.removeEventListener('mouseleave', onLeave);
    }, []);

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
                ...style,
            }}
        >
            <div
                ref={wrapperRef}
                style={{ width: '100%', height: '100%', position: 'relative' }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default DotGrid;
