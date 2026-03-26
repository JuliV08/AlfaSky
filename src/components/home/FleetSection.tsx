"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { FleetModal } from "./FleetModal";
import GlareHover from "@/components/animations/GlareHover";
import GradientText from "@/components/animations/GradientText";

const FLEET = [
    { key: "atr42", image: "/media/fleet/atr42" },
    { key: "kingair200", image: "/media/fleet/kingair200" },
    { key: "learjet50", image: "/media/fleet/learjet50" },
    { key: "citationv", image: "/media/fleet/citationv" },
] as const;

export function FleetSection() {
    const t = useTranslations("fleet");
    const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);

    const handleClose = useCallback(() => setSelectedAircraft(null), []);

    const selectedImage = FLEET.find(a => a.key === selectedAircraft)?.image ?? "";

    return (
        <section id="flota" className="section-padding bg-surface-secondary relative overflow-hidden">

            {/* ─── Blueprint technical decoration ─── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    {/* Technical grid lines */}
                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(46,125,209,0.04)" strokeWidth="0.3" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(46,125,209,0.04)" strokeWidth="0.3" />
                    <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(46,125,209,0.03)" strokeWidth="0.3" />
                    <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(46,125,209,0.03)" strokeWidth="0.3" />

                    {/* Dashed measurement markers */}
                    <line x1="10" y1="10" x2="90" y2="10" stroke="rgba(46,125,209,0.04)" strokeWidth="0.2" strokeDasharray="3,4" />
                    <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(46,125,209,0.04)" strokeWidth="0.2" strokeDasharray="3,4" />

                    {/* Corner bracket marks — blueprint style */}
                    <path d="M 5 10 L 5 5 L 10 5" stroke="rgba(46,125,209,0.06)" strokeWidth="0.4" fill="none" />
                    <path d="M 90 5 L 95 5 L 95 10" stroke="rgba(46,125,209,0.06)" strokeWidth="0.4" fill="none" />
                    <path d="M 5 90 L 5 95 L 10 95" stroke="rgba(46,125,209,0.06)" strokeWidth="0.4" fill="none" />
                    <path d="M 90 95 L 95 95 L 95 90" stroke="rgba(46,125,209,0.06)" strokeWidth="0.4" fill="none" />

                    {/* Abstract aircraft silhouette — angular, technical, right side */}
                    <polyline
                        points="60,50 65,46 78,44 82,45 82,47 78,47 75,50 78,53 82,53 82,55 78,56 65,54 60,50"
                        stroke="rgba(46,125,209,0.055)" strokeWidth="0.35" fill="none"
                    />
                    {/* Wing */}
                    <polyline
                        points="68,47 70,38 73,38 72,47"
                        stroke="rgba(46,125,209,0.04)" strokeWidth="0.3" fill="none"
                    />

                    {/* Constellation dots */}
                    {[[15, 30], [35, 70], [55, 20], [80, 60], [20, 85]].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="0.5" fill="rgba(46,125,209,0.08)" />
                    ))}
                </svg>
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-4"
                >
                    <h2 className="text-display-lg font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {t("sectionTitle")}
                        </GradientText>
                    </h2>
                    <p className="text-neutral-500 max-w-lg mx-auto mb-4">
                        {t("sectionDescription")}
                    </p>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full mb-16" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FLEET.map((aircraft, idx) => (
                        <motion.div
                            key={aircraft.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="premium-border transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-brand-accent/10">
                                <GlareHover className="rounded-2xl overflow-hidden bg-white w-full h-full">
                                    {/* Image hero */}
                                    <div className="aspect-square relative overflow-hidden">
                                        <OptimizedImage
                                            basePath={aircraft.image}
                                            alt={t(`aircraft.${aircraft.key}.name`)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                        />
                                    </div>

                                    {/* Info footer panel */}
                                    <div className="p-5 bg-white border-t border-surface-border">
                                        <h3 className="font-display font-semibold text-brand-navy mb-1">
                                            {t(`aircraft.${aircraft.key}.name`)}
                                        </h3>
                                        <p className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
                                            {t(`aircraft.${aircraft.key}.type`)}
                                        </p>
                                        <button
                                            onClick={() => setSelectedAircraft(aircraft.key)}
                                            className="inline-flex items-center gap-2 text-sm text-brand-accent font-medium hover:text-brand-blue hover:gap-3 transition-all duration-300"
                                        >
                                            {t("viewDetails")}
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </GlareHover>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <FleetModal
                aircraftKey={selectedAircraft}
                imagePath={selectedImage}
                onClose={handleClose}
            />
        </section>
    );
}
