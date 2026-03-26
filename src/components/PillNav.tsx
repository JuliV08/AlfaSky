'use client';

/**
 * PillNav — Premium pill-style navbar adapted from reactbits.dev.
 *
 * Adapted for Next.js (no react-router-dom).
 * Uses GSAP for the circle hover animation.
 * Integrates AlfaSky's LanguageSelector + scroll behaviour.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSelector } from '@/components/LanguageSelector';
import Image from 'next/image';

/* ── Hero choreography timing ── */
const LOAD_EXIT = 2.9; // LoadingOverlay total duration (2.2s delay + 0.7s exit)
const NAV_DELAY = LOAD_EXIT + 0.15; // Phase 1 delay

/* ═══════════════════════════════════════════════════════════ */

export function Navbar() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const isSubPage = pathname !== '/' && pathname !== '/en' && pathname !== '/en/';
    const localeBase = pathname.startsWith('/en') ? '/en' : '';
    const resolveHref = (anchor: string) => isSubPage ? `${localeBase}/${anchor}` : anchor;

    const navLinks = [
        { label: t('services'), href: resolveHref('#servicios') },
        { label: t('fleet'), href: resolveHref('#flota') },
        { label: t('process'), href: resolveHref('#proceso') },
        { label: t('why'), href: resolveHref('#nosotros') },
        { label: t('contact'), href: resolveHref('#contacto') },
    ];

    /* ── State ── */
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    /* ── Refs ── */
    const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
    const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
    const logoImgRef = useRef<HTMLDivElement>(null);
    const logoTweenRef = useRef<gsap.core.Tween | null>(null);
    const navItemsRef = useRef<HTMLDivElement>(null);
    const logoContainerRef = useRef<HTMLAnchorElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [navVisible, setNavVisible] = useState(false);

    const ease = 'power3.out';

    /* ── GSAP colours ── */
    const baseColor = '#ffffff';        // pill bar background
    const pillColor = '#0A1628';        // individual pill: dark navy for strong contrast
    const hoverCircleColor = '#2E7DD1'; // brand blue hover circle

    /* ── Scroll detection ── */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Phase 1 fade-in after loading overlay disappears ── */
    useEffect(() => {
        const timer = setTimeout(() => setNavVisible(true), NAV_DELAY * 1000);
        return () => clearTimeout(timer);
    }, []);

    /* ── Desktop breakpoint detection ── */
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        setIsDesktop(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* ── Body lock on mobile ── */
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    /* ── Build GSAP pill timelines ── */
    const layoutPills = useCallback(() => {
        circleRefs.current.forEach((circle, index) => {
            if (!circle?.parentElement) return;

            const pill = circle.parentElement;
            const rect = pill.getBoundingClientRect();
            const { width: w, height: h } = rect;

            // Compute circle geometry
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;

            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`,
            });

            const label = pill.querySelector('.pill-label') as HTMLElement | null;
            const hoverLabel = pill.querySelector('.pill-label-hover') as HTMLElement | null;

            if (label) gsap.set(label, { y: 0 });
            if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

            // Kill old timeline
            tlRefs.current[index]?.kill();

            const tl = gsap.timeline({ paused: true });
            tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
            if (label) {
                tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
            }
            if (hoverLabel) {
                gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
                tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
            }

            tlRefs.current[index] = tl;
        });
    }, [ease]);

    useEffect(() => {
        if (!isDesktop) return; // pills not in DOM yet
        // Small delay to ensure DOM has painted after conditional render
        const id = requestAnimationFrame(() => layoutPills());
        window.addEventListener('resize', layoutPills);
        if (document.fonts?.ready) {
            document.fonts.ready.then(layoutPills).catch(() => { /* noop */ });
        }
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener('resize', layoutPills);
        };
    }, [layoutPills, isDesktop]);

    /* ── Hover handlers ── */
    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: 'auto',
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: 'auto',
        });
    };

    const handleLogoEnter = () => {
        const el = logoImgRef.current;
        if (!el) return;
        logoTweenRef.current?.kill();
        gsap.set(el, { rotate: 0 });
        logoTweenRef.current = gsap.to(el, {
            rotate: 360,
            duration: 0.5,
            ease,
            overwrite: 'auto',
        });
    };

    /* ── CSS custom props ── */
    const cssVars = {
        '--pill-base': baseColor,
        '--pill-bg': pillColor,
        '--pill-hover-circle': hoverCircleColor,
        '--pill-text': '#ffffff',       // white text on dark navy pill
        '--pill-hover-text': '#ffffff', // stays white in hover state
    } as React.CSSProperties;

    return (
        <>
            {/* ═══ DESKTOP + MOBILE NAV BAR ═══ */}
            <nav
                className={`pill-nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'pill-nav--scrolled' : ''
                    }`}
                style={{
                    ...cssVars,
                    opacity: navVisible ? 1 : 0,
                    transform: navVisible ? 'translateY(0)' : 'translateY(-12px)',
                    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), background-color 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                } as React.CSSProperties}
            >
                <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between h-20">

                    {/* ── Logo — transparent, no circle ── */}
                    <a
                        ref={logoContainerRef}
                        href={isSubPage ? `${localeBase}/` : '#'}
                        className="flex items-center justify-center shrink-0"
                        onMouseEnter={handleLogoEnter}
                    >
                        <div ref={logoImgRef} className="relative w-[52px] h-[52px] lg:w-[60px] lg:h-[60px]">
                            <Image
                                src="/assets/ui/FaviconTransparent.png"
                                alt="Alfa Sky"
                                fill
                                priority
                                className="object-contain drop-shadow-sm"
                                sizes="80px"
                            />
                        </div>
                    </a>

                    {/* ── Desktop pill items ── */}
                    {isDesktop && (
                        <div
                            ref={navItemsRef}
                            className="flex pill-nav-items"
                        >
                            <ul className="pill-list">
                                {navLinks.map((item, i) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className="pill"
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            <span
                                                className="hover-circle"
                                                aria-hidden="true"
                                                ref={(el) => { circleRefs.current[i] = el; }}
                                            />
                                            <span className="label-stack">
                                                <span className="pill-label">{item.label}</span>
                                                <span className="pill-label-hover" aria-hidden="true">
                                                    {item.label}
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="pill-lang-selector">
                                <LanguageSelector />
                            </div>
                        </div>
                    )}

                    {/* ── Mobile hamburger — only shown when NOT desktop ── */}
                    {!isDesktop && (
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm gap-[5px] border-0 cursor-pointer"
                            aria-label="Menu"
                        >
                            <motion.span
                                animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-[2px] bg-brand-navy origin-center"
                            />
                            <motion.span
                                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block w-5 h-[2px] bg-brand-navy"
                            />
                            <motion.span
                                animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-[2px] bg-brand-navy origin-center"
                            />
                        </button>
                    )}
                </div>
            </nav>

            {/* ═══ MOBILE FULL-SCREEN DRAWER ═══ */}
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
