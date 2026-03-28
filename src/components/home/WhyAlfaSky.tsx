"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Stepper, { Step } from "@/components/animations/Stepper";
import GlareHover from "@/components/animations/GlareHover";
import GradientText from "@/components/animations/GradientText";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const CARD_IMAGES = [
    // Experiencia Operativa -> Pilots & Ground Crew
    `${BP}/media/home/why-experiencia.webp`,
    // Flota Versátil -> Mixed Private Jets & Medical
    `${BP}/media/home/why-flota.webp`,
    // Coordinación 24/7 -> Dispatch Control Room
    `${BP}/media/home/why-coordinacion.webp`,
];

// Signos de interrogación MUY visibles — grandes, con color sólido
// [left%, top%, fontSize rem, rotación deg, opacidad]
const Q_MARKS: [number, number, number, number, number][] = [
    [3, 8, 8.0, -22, 0.08],
    [12, 60, 6.0, 15, 0.06],
    [22, 20, 12.0, -8, 0.07],
    [38, 78, 7.0, 25, 0.08],
    [52, 10, 5.5, -30, 0.06],
    [62, 55, 16.0, 12, 0.05],
    [75, 4, 7.5, -12, 0.07],
    [85, 72, 8.5, 35, 0.06],
    [48, 40, 20.0, -3, 0.04],
    [18, 88, 6.0, -18, 0.07],
    [92, 35, 5.0, 20, 0.06],
    [8, 42, 9.0, 8, 0.05],
];

export function WhyAlfaSky() {
    const t = useTranslations("why");
    const locale = useLocale();
    const isEs = locale === "es";

    return (
        <section id="nosotros" className="section-padding relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #F0F5FB 0%, #F8FBFF 40%, #F0F5FB 100%)" }}
        >
            {/* ─── Signos ? decorativos — VISIBLES y dramáticos ─── */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                {Q_MARKS.map(([left, top, size, rot, opacity], i) => (
                    <span
                        key={i}
                        className="absolute font-black"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            fontSize: `${size}rem`,
                            lineHeight: 1,
                            color: `rgba(46,125,209,${opacity})`,
                            fontFamily: "system-ui, sans-serif",
                            transform: `rotate(${rot}deg)`,
                            userSelect: "none",
                        }}
                    >
                        ?
                    </span>
                ))}
            </div>

            {/* Soft center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative px-4 lg:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-display-lg font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {t("sectionTitle")}
                        </GradientText>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Stepper
                        initialStep={1}
                        backButtonText={isEs ? "Anterior" : "Previous"}
                        nextButtonText={isEs ? "Siguiente" : "Next"}
                        completeButtonText={isEs ? "Completar" : "Complete"}
                    >
                        {[0, 1, 2].map((i) => (
                            <Step key={i}>
                                <div className="flex flex-col md:block relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-brand-accent/15 group bg-white">
                                    <div className="w-full h-[220px] sm:h-[280px] md:h-auto md:aspect-[16/9] relative overflow-hidden">
                                        <img
                                            src={CARD_IMAGES[i]}
                                            alt={t(`pillars.${i}.title`)}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                    {/* Text Footer Overlay */}
                                    <div className="md:absolute md:inset-x-0 md:bottom-0 bg-white md:bg-white/95 md:backdrop-blur-md p-6 md:p-8 md:border-t md:border-brand-accent/10 transition-transform duration-500 md:transform md:translate-y-2 md:group-hover:translate-y-0">
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy mb-2">
                                            {t(`pillars.${i}.title`)}
                                        </h3>
                                        <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                                            {t(`pillars.${i}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </Step>
                        ))}
                    </Stepper>
                </motion.div>
            </div>
        </section>
    );
}
