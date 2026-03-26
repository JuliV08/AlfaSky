"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GradientText from "@/components/animations/GradientText";

const PLACEHOLDER_ICONS = [
    // Compass / tourism
    <svg key="tourism" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>,
    // Calendar / events
    <svg key="events" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>,
    // Academic cap / academy
    <svg key="academy" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>,
];

export function PlaceholderSection() {
    const t = useTranslations("placeholder");

    return (
        <section className="section-padding bg-surface-secondary relative overflow-hidden section-bg-arcs">
            {/* Subtle aero grid */}
            <div className="absolute inset-0 aero-grid-bg" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-display-lg font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {t("sectionTitle")}
                        </GradientText>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.12 }}
                            className="group"
                        >
                            <div className="premium-border transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-brand-accent/10">
                                <div className="rounded-2xl bg-white p-8 md:p-10 text-center h-full">
                                    {/* Coming soon badge */}
                                    <div className="flex justify-end mb-4">
                                        <div className="px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/15">
                                            <span className="text-[10px] uppercase tracking-[0.15em] text-brand-accent font-medium">
                                                {t("comingSoon")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Placeholder image area */}
                                    <div className="w-full aspect-[4/3] rounded-xl bg-surface-tertiary mb-8 flex items-center justify-center border border-dashed border-surface-border group-hover:border-brand-accent/20 transition-colors duration-500">
                                        <div className="text-neutral-300 group-hover:text-neutral-400 transition-colors duration-500">
                                            {PLACEHOLDER_ICONS[i]}
                                        </div>
                                    </div>

                                    <h3 className="font-display text-lg font-semibold text-brand-navy mb-3">
                                        {t(`items.${i}.title`)}
                                    </h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        {t(`items.${i}.description`)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
