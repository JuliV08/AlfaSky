"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GradientText from "@/components/animations/GradientText";

export function LocationSection() {
    const t = useTranslations("location");

    return (
        <section className="section-padding bg-surface-secondary relative overflow-hidden section-bg-dots">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-display-md font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {t("sectionTitle")}
                        </GradientText>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="premium-border transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/10">
                        <div className="rounded-2xl bg-white p-8 md:p-12 text-center">
                            {/* Location icon */}
                            <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-6 text-brand-accent">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>

                            <p className="text-lg text-neutral-600 mb-8">{t("address")}</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://maps.google.com/?q=Roma+450+La+Lucila+Buenos+Aires"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                    </svg>
                                    {t("googleMaps")}
                                </a>
                                <a
                                    href="https://waze.com/ul?q=Roma+450+La+Lucila+Buenos+Aires"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    {t("waze")}
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
