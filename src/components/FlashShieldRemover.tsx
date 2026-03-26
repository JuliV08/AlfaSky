"use client";
import { useEffect } from "react";

/**
 * FlashShieldRemover — mounts on EVERY page via root layout.
 * Immediately removes the flash-shield overlay once React hydrates,
 * so service/privacy pages (which have no LoadingOverlay) don't stay
 * hidden behind the white shield.
 *
 * On home pages, LoadingOverlay handles the animated transition and
 * also calls remove() — calling it twice is safe (no-op).
 */
export function FlashShieldRemover() {
    useEffect(() => {
        const shield = document.getElementById("flash-shield");
        if (shield) shield.remove();
    }, []);
    return null;
}
