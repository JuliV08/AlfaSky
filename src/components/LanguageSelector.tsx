"use client";

import { usePathname } from "next/navigation";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LanguageSelector() {
    const pathname = usePathname();

    // pathname here is relative to basePath (Next.js strips it), e.g. "/" or "/en/servicios/ejecutivo/"
    const isEn = pathname.startsWith("/en");

    const esPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
    const enPath = isEn ? pathname : `/en${pathname === "/" ? "" : pathname}`;

    return (
        <div className="flex items-center gap-1 text-sm">
            <a
                href={`${BP}${esPath}`}
                className={`px-2.5 py-1.5 rounded-md transition-all duration-200 ${!isEn
                    ? "text-brand-navy bg-brand-accent/10 font-medium"
                    : "text-neutral-400 hover:text-brand-navy"
                    }`}
            >
                ES
            </a>
            <span className="text-neutral-300">/</span>
            <a
                href={`${BP}${enPath}`}
                className={`px-2.5 py-1.5 rounded-md transition-all duration-200 ${isEn
                    ? "text-brand-navy bg-brand-accent/10 font-medium"
                    : "text-neutral-400 hover:text-brand-navy"
                    }`}
            >
                EN
            </a>
        </div>
    );
}
