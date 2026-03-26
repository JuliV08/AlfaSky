"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/LanguageSelector";
import Image from "next/image";

export function Navbar() {
    const t = useTranslations("nav");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    const pathname = usePathname();
    const isSubPage = pathname !== "/" && pathname !== "/en" && pathname !== "/en/";
    const localeBase = pathname.startsWith("/en") ? "/en" : "";

    const resolveHref = (anchor: string) => isSubPage ? `${localeBase}/${anchor}` : anchor;

    const navLinks = [
        { label: t("services"), href: resolveHref("#servicios") },
        { label: t("fleet"), href: resolveHref("#flota") },
        { label: t("process"), href: resolveHref("#proceso") },
        { label: t("why"), href: resolveHref("#nosotros") },
        { label: t("contact"), href: resolveHref("#contacto") },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 border-b ${isScrolled ? "border-black/5 shadow-sm" : "border-transparent shadow-none"}`}
                style={{
                    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
                    backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
                    WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
                    transition: "background-color 0.6s ease, backdrop-filter 0.6s ease, -webkit-backdrop-filter 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
                    {/* Logo - Tamaño estrictamente reducido para garantizar que nunca toque los bordes del navbar */}
                    <a href={isSubPage ? `${localeBase}/` : "#"} className="relative z-10 flex items-center group w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] shrink-0 transform origin-left md:ml-2">
                        <motion.div
                            className="relative w-full h-full"
                            style={{ display: 'block' }}
                            initial={{ filter: 'none', scale: 1 }}
                            whileHover={{
                                scale: 1.08,
                                filter: 'drop-shadow(0 0 14px rgba(46,125,209,0.5)) drop-shadow(0 0 28px rgba(46,125,209,0.25))',
                            }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <Image
                                src="/assets/ui/FaviconTransparent.png"
                                alt="Alfa Sky"
                                fill
                                priority
                                className="object-contain drop-shadow-md"
                                sizes="(max-width: 1024px) 160px, 200px"
                            />
                        </motion.div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-neutral-500 hover:text-brand-navy transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                        <LanguageSelector />
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Menu"
                    >
                        <motion.span
                            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-[1.5px] bg-brand-navy origin-center"
                        />
                        <motion.span
                            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-[1.5px] bg-brand-navy"
                        />
                        <motion.span
                            animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-[1.5px] bg-brand-navy origin-center"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer — light */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl lg:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                    className="text-2xl font-display font-medium text-brand-navy hover:text-brand-accent transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <LanguageSelector />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
