"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Navbar } from "@/components/PillNav";
import { Footer } from "@/components/Footer";
import { OptimizedImage } from "@/components/OptimizedImage";
import GlareHover from "@/components/animations/GlareHover";

interface ServicePageContentProps {
    serviceKey: "estado" | "empresas" | "sanitarios" | "ejecutivo";
    imagePath: string;
}

export function ServicePageContent({ serviceKey, imagePath }: ServicePageContentProps) {
    const t = useTranslations("services");
    const locale = useLocale();
    const prefix = locale === 'es' ? '' : `/${locale}`;

    useEffect(() => {
        document.getElementById("flash-shield")?.remove();
    }, []);

    const capabilities = t.raw(`${serviceKey}.capabilities`) as string[] | undefined;
    const useCases = t.raw(`${serviceKey}.useCases`) as string[] | undefined;
    const howWeOperate = t.raw(`${serviceKey}.howWeOperate`) as Array<{ step: string; detail: string }> | undefined;

    return (
        <>
            <Navbar />

            <main className="pt-20">

                {/* ──────────── HERO BANNER ──────────── */}
                <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
                    <OptimizedImage
                        basePath={imagePath}
                        alt={t(`${serviceKey}.title`)}
                        className="w-full h-full object-cover"
                        priority
                    />
                    {/* Gradient overlay — fuerte al bottom */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(180deg, rgba(248,251,255,0.25) 0%, rgba(248,251,255,0.05) 30%, rgba(10,22,40,0.55) 75%, rgba(10,22,40,0.85) 100%)"
                        }}
                    />

                    {/* Breadcrumb + Título superpuesto en la imagen */}
                    <div className="absolute inset-0 flex items-end z-10">
                        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-14 w-full">
                            <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
                                <a href={`${prefix}/`} className="hover:text-white transition-colors">{t("backHome")}</a>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                                <span className="text-white/80">{t(`${serviceKey}.title`)}</span>
                            </nav>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
                            >
                                {t(`${serviceKey}.title`)}
                            </motion.h1>
                        </div>
                    </div>
                </section>

                {/* ──────────── DESCRIPCIÓN + PILLS ──────────── */}
                <section className="relative bg-white overflow-hidden">
                    {/* Línea accent + glow top */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

                    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                            {/* Columna izquierda — descripción */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span
                                        className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full text-white"
                                        style={{ background: "linear-gradient(135deg,#2E7DD1,#1B5FA0)" }}
                                    >
                                        Alfa Sky
                                    </span>
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-accent/30 to-transparent" />
                                </div>
                                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                                    {t(`${serviceKey}.description`)}
                                </p>
                            </motion.div>

                            {/* Columna derecha — pills características sólidas */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.25 }}
                            >
                                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">
                                    Características
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {(() => {
                                        const bullets = t.raw(`${serviceKey}.bullets`);
                                        if (!Array.isArray(bullets)) return null;
                                        return bullets.map((bullet: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl"
                                                style={{
                                                    background: "linear-gradient(135deg, #2E7DD1 0%, #1B5FA0 100%)",
                                                    boxShadow: "0 2px 8px rgba(46,125,209,0.30), inset 0 1px 0 rgba(255,255,255,0.15)"
                                                }}
                                            >
                                                <svg className="w-3.5 h-3.5 opacity-80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                                {bullet}
                                            </motion.span>
                                        ));
                                    })()}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ──────────── CAPACIDADES CLAVE ──────────── */}
                {capabilities && capabilities.length > 0 && (
                    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #EDF4FD 0%, #F4F8FE 100%)" }}>
                        {/* Decoración arc */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                <path d="M -10 60 Q 50 10 110 60" stroke="rgba(46,125,209,1)" strokeWidth="0.6" fill="none" />
                                <path d="M -10 75 Q 50 25 110 75" stroke="rgba(46,125,209,1)" strokeWidth="0.4" fill="none" />
                            </svg>
                        </div>

                        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-accent/30">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                                        {t("capabilitiesTitle")}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {capabilities.map((cap: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06, duration: 0.5 }}
                                            className="group transition-all duration-300 h-full"
                                        >
                                            <GlareHover className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-brand-accent/10 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/08 w-full h-full">
                                                <div className="mt-0.5 w-6 h-6 rounded-lg bg-brand-accent flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-brand-navy leading-snug">{cap}</span>
                                            </GlareHover>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ──────────── CASOS DE USO ──────────── */}
                {useCases && useCases.length > 0 && (
                    <section className="bg-white relative overflow-hidden">
                        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                                        {t("useCasesTitle")}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {useCases.map((uc: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06, duration: 0.5 }}
                                            className="transition-all duration-300 h-full"
                                        >
                                            <GlareHover className="flex items-start gap-4 p-5 rounded-2xl border border-surface-border bg-surface-secondary hover:border-brand-accent/20 hover:bg-blue-50/30 w-full h-full">
                                                <span
                                                    className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold text-white flex items-center justify-center mt-0.5"
                                                    style={{ background: "linear-gradient(135deg,#2E7DD1,#1B5FA0)" }}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-neutral-600 leading-relaxed">{uc}</span>
                                            </GlareHover>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ──────────── CÓMO OPERAMOS ──────────── */}
                {howWeOperate && howWeOperate.length > 0 && (
                    <section
                        className="relative overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B3A5C 50%, #0A1628 100%)" }}
                    >
                        {/* Grid pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                <defs>
                                    <pattern id="svcGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(91,164,230,1)" strokeWidth="0.3" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#svcGrid)" />
                            </svg>
                        </div>

                        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">
                                    {t("howWeOperateTitle")}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {howWeOperate.map((item: { step: string; detail: string }, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                            className="relative group"
                                        >
                                            {/* Connector */}
                                            {i < 3 && (
                                                <div className="hidden lg:block absolute top-10 left-full w-6 h-[1px] bg-gradient-to-r from-brand-accent/40 to-brand-accent/10 z-10" />
                                            )}
                                            <GlareHover
                                                className="rounded-2xl p-6 h-full border border-white/10 hover:border-brand-accent/40 transition-all duration-300 hover:translate-y-[-4px] w-full"
                                                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-lg font-bold font-display text-white"
                                                    style={{ background: "linear-gradient(135deg,#2E7DD1,#1B5FA0)", boxShadow: "0 4px 12px rgba(46,125,209,0.35)" }}
                                                >
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>
                                                <h3 className="font-display font-semibold text-white mb-2 relative z-10">
                                                    {item.step}
                                                </h3>
                                                <p className="text-sm text-white/60 leading-relaxed relative z-10">
                                                    {item.detail}
                                                </p>
                                            </GlareHover>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ──────────── CTA STRIP ──────────── */}
                <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">
                    {/* Glow decorativo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Tag */}
                            <span className="inline-block mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full border border-brand-accent/25 text-brand-accent bg-brand-accent/5">
                                Contacto
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
                                {t("ctaStripTitle")}
                            </h2>
                            <p className="text-neutral-500 mb-10 text-lg">
                                Contamos con atención 24/7 para asesorarte.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href={`${prefix}/#contacto`} className="btn-primary text-base">
                                    {t("contactSpecialist")}
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                                <a href={`${prefix}/`} className="btn-secondary text-base">
                                    {t("backHome")}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
