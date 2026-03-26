"use client";

import { motion } from "framer-motion";

/**
 * HeroGlowDivider — premium pulsing runway strip at the bottom of hero.
 *
 * Glow BLOOMS DOWNWARD. All layers are contained within the wrapper div
 * which has overflow:hidden to prevent horizontal scrollbar.
 *
 *  - Layer 1: Bright thin core line (2px)
 *  - Layer 2: Intense downward glow blob (60px, blur 12px)
 *  - Layer 3: Broader ambient wash (120px, blur 30px)
 *  - Layer 4: Wide atmospheric haze (200px, blur 50px)
 */
export function HeroGlowDivider() {
    return (
        <div
            className="relative w-full"
            style={{
                height: "80px",
                overflow: "visible",   // let blur bloom downward
                pointerEvents: "none",
            }}
        >
            {/* Layer 2 — intense close downward bloom */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "0%",
                    right: "0%",
                    height: "80px",
                    background: "linear-gradient(180deg, rgba(46,125,209,0.35) 0%, rgba(46,125,209,0.12) 40%, transparent 100%)",
                    filter: "blur(12px)",
                    zIndex: 3,
                }}
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Layer 3 — ambient glow downward */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "0%",
                    right: "0%",
                    height: "150px",
                    background: "linear-gradient(180deg, rgba(46,125,209,0.2) 0%, rgba(91,164,230,0.06) 35%, transparent 100%)",
                    filter: "blur(30px)",
                    zIndex: 2,
                }}
                animate={{ opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Layer 4 — atmospheric haze (covers entire width) */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "-10%",
                    right: "-10%",
                    height: "250px",
                    background: "linear-gradient(180deg, rgba(46,125,209,0.12) 0%, rgba(91,164,230,0.03) 30%, transparent 65%)",
                    filter: "blur(50px)",
                    zIndex: 1,
                }}
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
        </div>
    );
}
