"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("footer");
    const pathname = usePathname();
    const localeBase = pathname.startsWith("/en") ? "/en" : "";

    return (
        <footer className="bg-brand-navy border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6 relative w-[240px] h-[90px]">
                            <Image
                                src="/assets/ui/LogoTransparent.png"
                                alt="Alfa Sky"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 240px, 240px"
                            />
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                            {t("description")}
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                            Links
                        </h4>
                        <ul className="space-y-3">
                            {(["services", "fleet", "contact", "privacy"] as const).map(
                                (key) => (
                                    <li key={key}>
                                        <a
                                            href={key === "privacy" ? `${localeBase}/privacy/` : `${localeBase}/#${key === "services" ? "servicios" : key === "fleet" ? "flota" : "contacto"}`}
                                            className="text-sm text-neutral-300 hover:text-white transition-colors duration-200"
                                        >
                                            {t(`links.${key}`)}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                            Contacto
                        </h4>
                        <ul className="space-y-3 text-sm text-neutral-300">
                            <li>{t("contact.address")}</li>
                            <li>
                                <a
                                    href={`mailto:${t("contact.email")}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {t("contact.email")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`https://wa.me/5491135151981`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    {t("contact.phone")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                        <p className="text-xs text-neutral-500">{t("copyright")}</p>
                        <div className="flex items-center gap-4">
                            <a href={`${localeBase}/privacy/`} className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                                Privacy
                            </a>
                        </div>
                    </div>
                    {/* Villex credit */}
                    <p className="text-sm text-neutral-400 flex items-center gap-1.5">
                        Hecho con{" "}
                        <svg className="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {" "}por{" "}
                        <a
                            href="https://villex.com.ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold tracking-wide"
                            style={{
                                background: "linear-gradient(90deg, #e040fb, #536dfe)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            VILLEX
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
