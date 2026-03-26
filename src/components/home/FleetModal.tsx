"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

interface FleetModalProps {
    aircraftKey: string | null;
    imagePath: string;
    onClose: () => void;
}

export function FleetModal({ aircraftKey, imagePath, onClose }: FleetModalProps) {
    const t = useTranslations("fleet");

    // Lock body scroll when modal is open
    useEffect(() => {
        if (aircraftKey) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, [aircraftKey]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            {aircraftKey && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm" />

                    {/* Modal — light theme */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-surface-border shadow-2xl shadow-brand-navy/10"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-tertiary border border-surface-border flex items-center justify-center text-neutral-400 hover:text-brand-navy hover:bg-surface-secondary transition-all duration-200"
                            aria-label={t("modal.close")}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Hero image */}
                        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                            <OptimizedImage
                                basePath={imagePath}
                                alt={t(`aircraft.${aircraftKey}.name`)}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            {/* Name + type */}
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-1">
                                {t(`aircraft.${aircraftKey}.name`)}
                            </h3>
                            <p className="text-sm text-brand-accent uppercase tracking-wider mb-4">
                                {t(`aircraft.${aircraftKey}.type`)}
                            </p>

                            {/* Headline */}
                            <p className="text-lg text-neutral-600 font-medium mb-6">
                                {t(`aircraft.${aircraftKey}.headline`)}
                            </p>

                            {/* Benefits */}
                            <ul className="space-y-3 mb-8">
                                {(t.raw(`aircraft.${aircraftKey}.benefits`) as string[]).map((benefit: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-600">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#contacto"
                                    onClick={onClose}
                                    className="btn-primary"
                                >
                                    {t("requestQuote")}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
