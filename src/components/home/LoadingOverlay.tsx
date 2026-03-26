"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const DarkVeil = dynamic(() => import("@/components/backgrounds/DarkVeil"), {
    ssr: false,
});

const LightPillar = dynamic(() => import("@/components/backgrounds/LightPillar"), {
    ssr: false,
});

// ─── Orbital Planet Loader ───
// Elliptical rings in 3D perspective with orbiting dots traveling along them.
// Minimal, premium, aeronautical. Works on white background with subtle glow.
function OrbitalLoader({ isExiting }: { isExiting: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.9 : 1 }}
            transition={{ delay: isExiting ? 0 : 0.15, duration: 0.6 }}
            className="relative flex items-center justify-center"
            style={{ width: 180, height: 180 }}
        >
            <style>{`
                @keyframes orbit-1 {
                    from { transform: rotateX(65deg) rotateZ(0deg); }
                    to   { transform: rotateX(65deg) rotateZ(360deg); }
                }
                @keyframes orbit-2 {
                    from { transform: rotateX(65deg) rotateY(40deg) rotateZ(0deg); }
                    to   { transform: rotateX(65deg) rotateY(40deg) rotateZ(360deg); }
                }
                @keyframes orbit-3 {
                    from { transform: rotateX(65deg) rotateY(-35deg) rotateZ(0deg); }
                    to   { transform: rotateX(65deg) rotateY(-35deg) rotateZ(360deg); }
                }
                @keyframes core-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 12px 4px rgba(46,125,209,0.15); }
                    50%      { transform: scale(1.08); box-shadow: 0 0 20px 6px rgba(46,125,209,0.25); }
                }

                .orbital-ring {
                    position: absolute;
                    border-radius: 50%;
                    border-style: solid;
                    pointer-events: none;
                }
                .orbital-ring-1 {
                    inset: 8px;
                    border-width: 1px;
                    border-color: rgba(46,125,209,0.25);
                    animation: orbit-1 4s linear infinite;
                }
                .orbital-ring-2 {
                    inset: 24px;
                    border-width: 1px;
                    border-color: rgba(91,164,230,0.2);
                    animation: orbit-2 5.5s linear infinite;
                }
                .orbital-ring-3 {
                    inset: 40px;
                    border-width: 1px;
                    border-color: rgba(46,125,209,0.15);
                    animation: orbit-3 7s linear infinite;
                }

                /* Orbiting dot — positioned at top-center of its ring */
                .orbital-dot {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    top: -3px;
                    left: 50%;
                    margin-left: -3px;
                }

                .orbital-core {
                    position: absolute;
                    inset: 50%;
                    width: 14px;
                    height: 14px;
                    margin: -7px 0 0 -7px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2E7DD1 0%, #5BA4E6 100%);
                    animation: core-pulse 2.5s ease-in-out infinite;
                    z-index: 2;
                }
            `}</style>

            <div style={{ perspective: "600px", width: 180, height: 180, position: "relative" }}>
                {/* Ring 1 — outermost */}
                <div className="orbital-ring orbital-ring-1">
                    <div className="orbital-dot" style={{
                        background: "#2E7DD1",
                        boxShadow: "0 0 6px 2px rgba(46,125,209,0.5)",
                    }} />
                </div>

                {/* Ring 2 — middle */}
                <div className="orbital-ring orbital-ring-2">
                    <div className="orbital-dot" style={{
                        width: 5, height: 5, top: -2.5, marginLeft: -2.5,
                        background: "#5BA4E6",
                        boxShadow: "0 0 5px 1px rgba(91,164,230,0.45)",
                    }} />
                </div>

                {/* Ring 3 — innermost */}
                <div className="orbital-ring orbital-ring-3">
                    <div className="orbital-dot" style={{
                        width: 4, height: 4, top: -2, marginLeft: -2,
                        background: "#8EC8F0",
                        boxShadow: "0 0 4px 1px rgba(142,200,240,0.4)",
                    }} />
                </div>

                {/* Core "planet" */}
                <div className="orbital-core" />
            </div>
        </motion.div>
    );
}

export function LoadingOverlay() {
    const t = useTranslations("loading");
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        document.getElementById("flash-shield")?.remove();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            setIsLoading(false);
            return;
        }

        const minTime = new Promise((r) => setTimeout(r, 2200));
        const ready = new Promise<void>((resolve) => {
            if (document.readyState === "complete") resolve();
            else window.addEventListener("load", () => resolve(), { once: true });
        });

        Promise.all([minTime, ready]).then(() => {
            setIsExiting(true);
            setTimeout(() => setIsLoading(false), 700);
        });
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
                    style={{ backgroundColor: "#0B1F3A", height: '100dvh', width: '100vw' }}
                >
                    {/* DarkVeil background — desktop only */}
                    <div className="absolute top-0 left-0 z-0 hidden md:block" style={{ height: '100dvh', width: '100vw' }}>
                        <DarkVeil
                            hueShift={180}
                            speed={0.4}
                            noiseIntensity={0}
                            scanlineIntensity={0}
                            scanlineFrequency={0}
                            warpAmount={0}
                        />
                    </div>

                    {/* LightPillar background — mobile only */}
                    <div className="absolute top-0 left-0 z-0 block md:hidden" style={{ height: '100dvh', width: '100vw' }}>
                        <LightPillar
                            topColor="#020bf7"
                            bottomColor="#9eb6ff"
                            intensity={1}
                            rotationSpeed={0.3}
                            glowAmount={0.002}
                            pillarWidth={3}
                            pillarHeight={0.4}
                            noiseIntensity={0.5}
                            pillarRotation={25}
                            interactive={false}
                            mixBlendMode="screen"
                            quality="low"
                        />
                    </div>

                    {/* Orbital planet loader */}
                    <div className="relative z-10">
                        <OrbitalLoader isExiting={isExiting} />
                    </div>

                    {/* Logo + brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -5 : 0 }}
                        transition={{ delay: isExiting ? 0 : 0.3, duration: 0.5 }}
                        className="flex flex-col items-center gap-4 relative z-10"
                    >
                        <img
                            src="/assets/ui/LogoTransparent.png"
                            alt="Alfa Sky"
                            style={{ width: '100%', maxWidth: '360px', height: 'auto', objectFit: 'contain', display: 'block' }}
                        />

                        <p className="text-white/50 tracking-widest uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>
                            {t('text')}
                        </p>
                    </motion.div>

                    {/* Loading bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isExiting ? 1 : 0.75 }}
                        transition={{ duration: isExiting ? 0.3 : 2.2, ease: "easeInOut" }}
                        className="absolute bottom-14 w-28 h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent origin-left z-10"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
