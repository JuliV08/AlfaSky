"use client";

import { useEffect, useRef, useState, useMemo } from "react";

/**
 * CustomCursor — aeronautical blue dot + ring that follows the pointer.
 *
 * MOUNTING: This component should be placed in the ROOT layout (or a
 * global wrapper) so it persists across ALL routes. It adds
 * `custom-cursor-active` to <html> to enable `cursor:none`.
 *
 * SAFETY: If unmounted (mobile, reduced-motion, or SSR), the default
 * system cursor remains visible. There is ALWAYS a cursor.
 */
export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isPointerFine, setIsPointerFine] = useState(false);

    const prefersReducedMotion = useMemo(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    // Detect pointer type
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(pointer: fine)");
        setIsPointerFine(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Toggle cursor:none class on <html>
    useEffect(() => {
        const shouldActivate = isPointerFine && !prefersReducedMotion;
        if (shouldActivate) {
            document.documentElement.classList.add("custom-cursor-active");
        }
        return () => {
            document.documentElement.classList.remove("custom-cursor-active");
        };
    }, [isPointerFine, prefersReducedMotion]);

    // Cursor animation loop
    useEffect(() => {
        if (!isPointerFine || prefersReducedMotion) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let raf: number;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        raf = requestAnimationFrame(animate);

        // Hover enlargement on interactive elements
        const targets = "a, button, [data-cursor], input, textarea, select";
        const onEnter = () => {
            ring.style.width = "52px";
            ring.style.height = "52px";
            ring.style.borderColor = "rgba(46,125,209,0.65)";
            ring.style.boxShadow = "0 0 10px 2px rgba(46,125,209,0.15)";
        };
        const onLeave = () => {
            ring.style.width = "40px";
            ring.style.height = "40px";
            ring.style.borderColor = "rgba(46,125,209,0.35)";
            ring.style.boxShadow = "0 0 6px 1px rgba(46,125,209,0.08)";
        };

        const bindListeners = () => {
            document.querySelectorAll(targets).forEach(el => {
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
        };
        bindListeners();

        const observer = new MutationObserver(bindListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
        };
    }, [isPointerFine, prefersReducedMotion]);

    if (!isPointerFine || prefersReducedMotion) return null;

    return (
        <>
            {/* Dot — brand blue core */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[10000] pointer-events-none"
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "rgba(46,125,209,0.85)",
                    boxShadow: "0 0 6px 2px rgba(46,125,209,0.25)",
                    willChange: "transform",
                }}
            />
            {/* Ring — brand blue outline with subtle glow */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[10000] pointer-events-none"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(46,125,209,0.35)",
                    boxShadow: "0 0 6px 1px rgba(46,125,209,0.08)",
                    willChange: "transform",
                    transition: "width 0.25s ease-out, height 0.25s ease-out, border-color 0.25s ease-out, box-shadow 0.25s ease-out",
                }}
            />
        </>
    );
}
