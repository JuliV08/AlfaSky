"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GradientText from "@/components/animations/GradientText";

export function CabinExperienceSlot() {
    const t = useTranslations("cabin");

    return (
        <section className="section-padding bg-white relative overflow-hidden section-bg-glow">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-display-md font-display font-bold mb-2 flex justify-center">
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
                    className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
                >
                    <iframe
                        src="https://www.youtube.com/embed/QzAFbrlJsv4?rel=0&modestbranding=1&color=white"
                        title="Alfa Sky — Cabina Experience"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-2xl"
                        loading="lazy"
                    />
                </motion.div>
            </div>
        </section>
    );
}
