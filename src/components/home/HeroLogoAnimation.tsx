"use client";

/**
 * HeroLogoAnimation — Premium particle animation around the brand logo.
 * 
 * Creates floating micro-dot "contrail" particles that orbit softly around
 * the logo area, giving an aerospace-instrument / aero-HUD feel.
 * 
 * Uses a lightweight Canvas 2D (not Three.js) for performance.
 * Respects prefers-reduced-motion: shows static constellation instead.
 */

import { useRef, useEffect, useState, useMemo } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    baseOpacity: number;
    life: number;
    maxLife: number;
    hue: number; // blue range 200-220
}

function createParticle(w: number, h: number): Particle {
    const cx = w / 2;
    const cy = h / 2;
    // Spawn in an elliptical ring around center
    const angle = Math.random() * Math.PI * 2;
    const radiusMult = 0.25 + Math.random() * 0.35; // 25-60% from center
    const rx = radiusMult * w * 0.5;
    const ry = radiusMult * h * 0.5;

    const speed = 0.15 + Math.random() * 0.3;
    // Tangential drift with slight outward/inward component
    const tangent = angle + Math.PI / 2 + (Math.random() - 0.5) * 0.4;

    return {
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        vx: Math.cos(tangent) * speed,
        vy: Math.sin(tangent) * speed,
        radius: 0.8 + Math.random() * 1.5,
        opacity: 0,
        baseOpacity: 0.2 + Math.random() * 0.5,
        life: 0,
        maxLife: 120 + Math.random() * 200, // frames
        hue: 200 + Math.random() * 20,
    };
}

export function HeroLogoAnimation({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(false);

    const prefersReducedMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || prefersReducedMotion) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0;
        let h = 0;
        const dpr = Math.min(window.devicePixelRatio, 2);

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Particle pool
        const PARTICLE_COUNT = 45;
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = createParticle(w || 400, h || 400);
            p.life = Math.random() * p.maxLife; // stagger
            particles.push(p);
        }

        // Occasional "contrail" lines between nearby particles
        let rafId: number;
        let frame = 0;

        const tick = () => {
            rafId = requestAnimationFrame(tick);
            frame++;

            ctx.clearRect(0, 0, w, h);
            const cw = w || 400;
            const ch = h || 400;

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.life++;

                // Fade in/out
                const lifeRatio = p.life / p.maxLife;
                if (lifeRatio < 0.15) {
                    p.opacity = p.baseOpacity * (lifeRatio / 0.15);
                } else if (lifeRatio > 0.8) {
                    p.opacity = p.baseOpacity * (1 - (lifeRatio - 0.8) / 0.2);
                } else {
                    p.opacity = p.baseOpacity;
                }

                // Gentle drift with slight gravity toward center
                const dx = cw / 2 - p.x;
                const dy = ch / 2 - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const pull = 0.002;
                p.vx += (dx / (dist + 1)) * pull;
                p.vy += (dy / (dist + 1)) * pull;

                p.x += p.vx;
                p.y += p.vy;

                // Respawn if expired or out of bounds
                if (p.life >= p.maxLife || p.x < -20 || p.x > cw + 20 || p.y < -20 || p.y > ch + 20) {
                    Object.assign(p, createParticle(cw, ch));
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 65%, 65%, ${p.opacity})`;
                ctx.fill();

                // Subtle glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 65%, 65%, ${p.opacity * 0.15})`;
                ctx.fill();
            }

            // Draw faint connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const ddx = a.x - b.x;
                    const ddy = a.y - b.y;
                    const d = Math.sqrt(ddx * ddx + ddy * ddy);
                    if (d < 70) {
                        const lineOpacity = (1 - d / 70) * Math.min(a.opacity, b.opacity) * 0.4;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `hsla(210, 60%, 60%, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        // Start after a short delay for smooth entrance
        const timer = setTimeout(() => {
            setVisible(true);
            rafId = requestAnimationFrame(tick);
        }, 300);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, [prefersReducedMotion]);

    // Reduced-motion fallback: static constellation dots
    if (prefersReducedMotion) {
        return (
            <div className={`${className} relative`}>
                <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-20">
                    {[...Array(12)].map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const r = 120 + (i % 3) * 30;
                        return (
                            <circle
                                key={i}
                                cx={200 + Math.cos(angle) * r}
                                cy={200 + Math.sin(angle) * r}
                                r={1.5}
                                fill="#5BA4E6"
                            />
                        );
                    })}
                </svg>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 1.2s ease-out",
            }}
        />
    );
}
