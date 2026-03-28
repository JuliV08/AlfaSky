"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlareHover from "@/components/animations/GlareHover";
import GradientText from "@/components/animations/GradientText";

const WA_NUMBER = "5491135151981";

export function ContactSection() {
    const t = useTranslations("contact");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const text = [
            `Hola Alfa Sky! 👋`,
            ``,
            `*Nombre:* ${name}`,
            email ? `*Email:* ${email}` : null,
            ``,
            `*Mensaje:*`,
            message,
        ]
            .filter((line) => line !== null)
            .join("\n");

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="contacto" className="section-padding bg-white relative overflow-hidden section-bg-glow">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 bg-brand-accent/[0.03] rounded-full blur-[120px]" />

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
                    <p className="text-neutral-500 max-w-lg mx-auto">
                        {t("sectionDescription")}
                    </p>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-brand-accent to-brand-light mx-auto mt-6 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="premium-border">
                            <GlareHover className="rounded-2xl bg-white p-6 md:p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="text-sm text-neutral-500 mb-2 block">{t("form.name")}</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-surface-border rounded-xl px-5 py-4 text-brand-navy placeholder:text-neutral-400 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 outline-none transition-all duration-300"
                                            placeholder={t("form.name")}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-neutral-500 mb-2 block">{t("form.email")}</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-surface-border rounded-xl px-5 py-4 text-brand-navy placeholder:text-neutral-400 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 outline-none transition-all duration-300"
                                            placeholder={t("form.email")}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-neutral-500 mb-2 block">{t("form.message")}</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-surface-border rounded-xl px-5 py-4 text-brand-navy placeholder:text-neutral-400 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 outline-none transition-all duration-300 resize-none"
                                            placeholder={t("form.message")}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!name || !message}
                                        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {/* WhatsApp icon */}
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        {t("form.submit")}
                                    </button>
                                </form>
                            </GlareHover>
                        </div>
                    </motion.div>

                    {/* Direct contact */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="flex flex-col justify-center gap-6"
                    >
                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/${WA_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="premium-border transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-green-500/10">
                                <GlareHover className="rounded-2xl bg-white p-6 flex items-center gap-5 w-full">
                                    <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500/20 transition-colors duration-300 shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="z-10 relative">
                                        <p className="font-medium text-brand-navy">{t("whatsapp")}</p>
                                        <p className="text-sm text-neutral-500">{t("phone")}</p>
                                    </div>
                                </GlareHover>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${t("emailAddress")}`}
                            className="group"
                        >
                            <div className="premium-border transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-brand-accent/10">
                                <GlareHover className="rounded-2xl bg-white p-6 flex items-center gap-5 w-full">
                                    <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-colors duration-300 shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div className="z-10 relative">
                                        <p className="font-medium text-brand-navy">{t("emailLabel")}</p>
                                        <p className="text-sm text-neutral-500">{t("emailAddress")}</p>
                                    </div>
                                </GlareHover>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
