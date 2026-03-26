"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlareHover from "@/components/animations/GlareHover";
import GradientText from "@/components/animations/GradientText";
import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("@/components/Antigravity"), { ssr: false });

export function ProcessSection() {
    const t = useTranslations("process");

    return (
        <section id="proceso" className="section-padding bg-white relative overflow-hidden">

            {/* ─── Antigravity — very subtle corner accent, not invasive ─── */}
            <div className="absolute inset-0 z-0" style={{ opacity: 0.07, pointerEvents: 'none' }}>
                <Antigravity
                    count={400}
                    magnetRadius={10}
                    ringRadius={9}
                    waveSpeed={0.4}
                    waveAmplitude={2}
                    particleSize={1.5}
                    lerpSpeed={0.05}
                    color="#0034d1"
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="capsule"
                    fieldStrength={10}
                />
            </div>

            {/* Subtle aero grid */}
            <div className="absolute inset-0 aero-grid-bg pointer-events-none z-[1]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-display-lg font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {t("sectionTitle")}
                        </GradientText>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full" />
                </motion.div>

                {/* Cards with clean inline connectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-0">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.12 }}
                            className="relative group flex items-stretch"
                        >
                            {/* Card */}
                            <div className="flex-1 mx-3 premium-border transition-all duration-500 hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-brand-accent/15">
                                <GlareHover className="rounded-2xl bg-white/95 p-8 h-full w-full">

                                    {/* Step badge */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent/60">
                                            {t("stepLabel")}
                                        </span>
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-light flex items-center justify-center shadow-lg shadow-brand-accent/25 group-hover:shadow-brand-accent/40 transition-all duration-500">
                                            <span className="text-white font-display font-black text-lg leading-none">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="font-display text-xl font-black text-brand-navy mb-3 group-hover:text-brand-accent transition-colors duration-500 leading-tight">
                                        {t(`steps.${i}.title`)}
                                    </h3>
                                    <p className="text-base text-neutral-500 leading-relaxed">
                                        {t(`steps.${i}.description`)}
                                    </p>

                                </GlareHover>
                            </div>

                            {/* Connector — sits between cards, only on desktop, not after last card */}
                            {i < 3 && (
                                <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 w-8 z-20">
                                    <motion.div
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        whileInView={{ scaleX: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.12 + 0.5 }}
                                        className="origin-left w-full flex items-center"
                                    >
                                        {/* Line */}
                                        <div className="flex-1 h-[2px] bg-gradient-to-r from-brand-accent/50 to-brand-accent/20 rounded-full" />
                                        {/* Arrow */}
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0 -ml-[1px]">
                                            <path d="M1 1L9 5L1 9" stroke="rgba(46,125,209,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
