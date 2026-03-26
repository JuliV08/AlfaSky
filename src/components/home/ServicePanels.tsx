"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { OptimizedImage } from "@/components/OptimizedImage";
import { HeroGlowDivider } from "@/components/home/HeroGlowDivider";
import GradientText from "@/components/animations/GradientText";

const DotGrid = dynamic(
    () => import("@/components/backgrounds/DotGrid"),
    {
        ssr: false,
        loading: () => <div style={{ background: "transparent" }} />,
    }
);

const PANELS = [
    { key: "estado", desktopImg: "/media/home/panel-estado-d", mobileImg: "/media/home/panel-estado-m" },
    { key: "empresas", desktopImg: "/media/home/panel-empresas-d", mobileImg: "/media/home/panel-empresas-m" },
    { key: "sanitarios", desktopImg: "/media/home/panel-sanitarios-d", mobileImg: "/media/home/panel-sanitarios-m" },
    { key: "ejecutivo", desktopImg: "/media/home/panel-ejecutivo-d", mobileImg: "/media/home/panel-ejecutivo-m" },
] as const;

export function ServicePanels() {
    const t = useTranslations("panels");
    const ts = useTranslations("services");

    return (
        <section id="servicios" className="relative overflow-hidden">

            {/* ─── TOP GRADIENT STRIP — dramatic transition from hero ─── */}
            <div
                className="absolute top-0 left-0 right-0 h-40 z-0 pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, rgba(46,125,209,0.06) 0%, rgba(46,125,209,0.02) 50%, transparent 100%)"
                }}
            />

            {/* ─── HERO GLOW DIVIDER ─── */}
            <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
                <HeroGlowDivider />
            </div>

            {/* Main background */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #EEF4FC 0%, #F8FBFF 30%, #F4F8FE 70%, #EFF5FC 100%)" }} />

            {/* Aero dot-grid background — interactive canvas */}
            <div className="absolute inset-0 z-[1] pointer-events-auto">
                <DotGrid
                    dotSize={3}
                    gap={20}
                    baseColor="#B8CEE4"
                    activeColor="#2E7DD1"
                    proximity={200}
                    shockRadius={300}
                    shockStrength={5}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full border border-brand-accent/20 text-brand-accent bg-white/60 backdrop-blur-sm">
                        {ts("sectionLabel") || "Nuestros Servicios"}
                    </span>
                    <h2 className="text-display-lg font-display font-bold mb-4 flex justify-center">
                        <GradientText animationSpeed={4} showBorder={false}>
                            {ts("sectionTitle") || "Servicios"}
                        </GradientText>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                    {PANELS.map((panel, idx) => (
                        <motion.a
                            key={panel.key}
                            href={`#servicio-${panel.key}`}
                            data-cursor="panel"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group"
                        >
                            <div
                                className="rounded-2xl overflow-hidden transition-all duration-500 hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-brand-accent/15"
                                style={{
                                    background: "white",
                                    border: "1px solid rgba(46,125,209,0.12)",
                                    boxShadow: "0 2px 12px rgba(10,22,40,0.06), 0 8px 32px rgba(46,125,209,0.06)"
                                }}
                            >
                                {/* Image */}
                                <div className="aspect-[10/9] md:aspect-[4/3] relative overflow-hidden">
                                    <div className="absolute inset-0 hidden md:block">
                                        <OptimizedImage
                                            basePath={panel.desktopImg}
                                            alt={t(`${panel.key}.title`)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <div className="absolute inset-0 block md:hidden">
                                        <OptimizedImage
                                            basePath={panel.mobileImg}
                                            alt={t(`${panel.key}.title`)}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Gradient overlay on image bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
                                </div>

                                {/* Info panel */}
                                <div className="p-5 md:p-6">
                                    <h3 className="font-display text-lg md:text-xl font-semibold text-brand-navy mb-2">
                                        {t(`${panel.key}.title`)}
                                    </h3>
                                    <p className="text-sm text-neutral-500 mb-4">
                                        {t(`${panel.key}.short`)}
                                    </p>
                                    <span
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg group-hover:gap-3 transition-all duration-300"
                                        style={{
                                            background: "linear-gradient(135deg, #2E7DD1 0%, #1B5FA0 100%)",
                                            boxShadow: "0 2px 8px rgba(46,125,209,0.25)"
                                        }}
                                    >
                                        {ts("viewDetail")}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
