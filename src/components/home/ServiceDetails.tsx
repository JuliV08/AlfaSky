"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { OptimizedImage } from "@/components/OptimizedImage";
import GlareHover from "@/components/animations/GlareHover";
import GradientText from "@/components/animations/GradientText";

const SERVICES = [
    { key: "estado", image: "/media/services/estado/secondary" },
    { key: "empresas", image: "/media/services/empresas/secondary" },
    { key: "sanitarios", image: "/media/services/sanitarios/secondary" },
    { key: "ejecutivo", image: "/media/services/ejecutivo/secondary" },
] as const;

export function ServiceDetails() {
    const t = useTranslations("services");
    const locale = useLocale();
    const prefix = locale === 'es' ? '' : `/${locale}`;

    return (
        <>
            {SERVICES.map((service, idx) => (
                <section
                    key={service.key}
                    id={`servicio-${service.key}`}
                    className={`section-padding relative overflow-hidden ${idx % 2 === 0 ? "bg-white" : "bg-surface-secondary"
                        }`}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}>
                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1 w-full"
                            >
                                <div className="premium-border">
                                    <GlareHover className="relative rounded-2xl overflow-hidden aspect-video bg-surface-tertiary w-full">
                                        <OptimizedImage
                                            basePath={service.image}
                                            alt={t(`${service.key}.title`)}
                                            className="w-full h-full object-cover relative z-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                                    </GlareHover>
                                </div>
                            </motion.div>

                            {/* Text */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1"
                            >
                                <h2 className="text-display-md font-display font-bold mb-4">
                                    <GradientText animationSpeed={4} showBorder={false}>
                                        {t(`${service.key}.title`)}
                                    </GradientText>
                                </h2>
                                <p className="text-neutral-500 leading-relaxed mb-8 text-lg">
                                    {t(`${service.key}.description`)}
                                </p>

                                {/* Service features as pills */}
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {(t.raw(`${service.key}.bullets`) as string[]).map(
                                        (bullet: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                                                className="service-pill"
                                            >
                                                <span className="pill-dot" />
                                                {bullet}
                                            </motion.span>
                                        )
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a href={`${prefix}/servicios/${service.key}/`} className="btn-primary">
                                        {t("viewDetail")}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </a>
                                    <a href={`${prefix}/#contacto`} className="btn-secondary">
                                        {t("contactSpecialist")}
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
