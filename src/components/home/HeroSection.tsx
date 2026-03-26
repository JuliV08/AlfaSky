"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HeroLogoAnimation } from "@/components/home/HeroLogoAnimation";
import { OptimizedImage } from "@/components/OptimizedImage";
import Image from "next/image";
import Orb from "@/components/home/Orb";

/* ─── Premium staggered choreography ─── */
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const LOAD_EXIT_DURATION = 2.9; // LoadingOverlay total duration (2.2s min + 0.7s exit)

// Phase offsets AFTER loading overlay fully disappears
const PHASE_1_DELAY = LOAD_EXIT_DURATION + 0.15; // Nav fade-in
const PHASE_2_DELAY = PHASE_1_DELAY + 0.45;      // Logo scale-up
const PHASE_3_DELAY = PHASE_2_DELAY + 0.5;        // Subtitle + CTA slide-up
const PHASE_4_DELAY = PHASE_3_DELAY + 0.3;        // Microcopy
const SCROLL_DELAY  = PHASE_4_DELAY + 0.5;        // Scroll indicator

export function HeroSection() {
    const t = useTranslations("hero");

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex flex-col items-center justify-center"
            style={{ overflowX: "clip", overflowY: "visible" }}
        >
            {/* Background image — desktop */}
            <div className="absolute inset-0 hidden md:block">
                <OptimizedImage
                    basePath="/media/home/hero-bg-d"
                    alt="Alfa Sky aerial view"
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* Background image — mobile */}
            <div className="absolute inset-0 block md:hidden">
                <OptimizedImage
                    basePath="/media/home/hero-bg-m"
                    alt="Alfa Sky aerial view"
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* LIGHT "daytime" overlay */}
            <div className="absolute inset-0 z-[1]"
                style={{
                    background: "linear-gradient(180deg, rgba(248,251,255,0.88) 0%, rgba(248,251,255,0.55) 35%, rgba(248,251,255,0.65) 65%, rgba(248,251,255,0.95) 100%)"
                }}
            />

            {/* Subtle vignette */}
            <div className="absolute inset-0 z-[1]">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(208,217,230,0.25) 100%)"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[1400px] mx-auto px-6 pt-32 pb-32">

                {/* ── Phase 2: Logo container ── */}
                <div className="relative w-96 h-[320px] md:w-[1000px] md:h-[550px] lg:w-[1250px] lg:h-[650px] mb-8 mt-12 flex items-center justify-center pointer-events-none">
                    
                    {/* The interactive Orb background, sized specifically to encircle the Logo tightly */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: PHASE_2_DELAY, ease: EASE_PREMIUM }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-[450px] h-[450px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] pointer-events-auto flex items-center justify-center -z-10"
                    >
                        <Orb
                            hoverIntensity={1.5}
                            rotateOnHover={true}
                            hue={0}
                            forceHoverState={false}
                            backgroundColor="#000000" // Black sets Alpha to 0, making it fully transparent
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, delay: PHASE_2_DELAY, ease: EASE_PREMIUM }}
                        className="relative w-full h-full pointer-events-none"
                    >
                        <HeroLogoAnimation className="absolute inset-0 w-full h-full pointer-events-none" />
                        <Image
                            src="/assets/ui/LogoTransparent.png"
                            alt="Alfa Sky"
                            fill
                            priority
                            className="relative z-10 object-contain drop-shadow-sm"
                            sizes="(max-width: 768px) 300px, 600px"
                        />
                    </motion.div>
                </div>

                {/* ── Phase 3b: CTA — slide-up + fade ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: PHASE_3_DELAY + 0.15, ease: EASE_PREMIUM }}
                    className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-4"
                >
                    <a href="#contacto" className="btn-primary text-base">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15M21 16.811c0 .864-.933 1.405-1.683.977-7.094-4.053-10.052-7.011-14.105-14.105-.428-.75.113-1.683.977-1.683H9" />
                        </svg>
                        {t("cta")}
                    </a>
                </motion.div>

                {/* ── Phase 4: Microcopy — gentle fade ── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: PHASE_4_DELAY }}
                    className="text-xs text-neutral-400 tracking-wide"
                >
                    {t("micro")}
                </motion.p>
            </div>

            {/* ── Scroll indicator — last to appear ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: SCROLL_DELAY, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    {t("scroll")}
                </span>
                <div className="scroll-indicator" />
            </motion.div>


        </section>
    );
}
