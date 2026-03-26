"use client";

import { useTranslations } from "next-intl";
import { Navbar } from "@/components/PillNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    const t = useTranslations("privacy");

    const sections = t.raw("sections") as Array<{ title: string; content: string }>;

    return (
        <>
            <Navbar />

            <main className="pt-32 pb-20 bg-white">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-display-lg font-display font-bold text-brand-navy mb-6"
                    >
                        {t("title")}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="mb-8"
                    >
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-navy transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            {t("backLink")}
                        </a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-neutral-600 leading-relaxed mb-12"
                    >
                        {t("intro")}
                    </motion.p>

                    <div className="space-y-10">
                        {sections.map((section: { title: string; content: string }, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                            >
                                <h2 className="text-display-sm font-display font-semibold text-brand-navy mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-neutral-500 leading-relaxed">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
