import type { Metadata } from "next";
import localFont from "next/font/local";
import { GlobalCursorWrapper } from "@/components/GlobalCursorWrapper";
import { FlashShieldRemover } from "@/components/FlashShieldRemover";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = localFont({
    src: [
        {
            path: "../../public/fonts/inter-latin-wght-normal.woff2",
            style: "normal",
        },
        {
            path: "../../public/fonts/inter-latin-ext-wght-normal.woff2",
            style: "normal",
        },
    ],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

const sora = localFont({
    src: [
        {
            path: "../../public/fonts/sora-latin-wght-normal.woff2",
            style: "normal",
        },
        {
            path: "../../public/fonts/sora-latin-ext-wght-normal.woff2",
            style: "normal",
        },
    ],
    variable: "--font-sora",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: "Alfa Sky — Operador Aéreo Premium en Argentina",
    description:
        "Vuelos privados, charters y soluciones aéreas premium para gobierno, empresas, servicios sanitarios y aviación ejecutiva.",
    icons: {
        icon: "/assets/ui/Favicon.png",
        apple: "/assets/ui/Logo.png",
    },
    openGraph: {
        title: "Alfa Sky — Operador Aéreo Premium en Argentina",
        description:
            "Vuelos privados, charters y soluciones aéreas premium.",
        type: "website",
        locale: "es_AR",
        siteName: "Alfa Sky",
        images: [{ url: "/assets/ui/Logo.png", width: 512, height: 512 }],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Inline backgroundColor matches the new light theme —
        // applies before any CSS file loads, eliminating FOUC flash.
        <html suppressHydrationWarning style={{ backgroundColor: "#f8fbff" }} className={cn("font-sans", geist.variable)}>
            <head>
                {/* theme-color: browser uses this for tab/chrome color while loading. */}
                <meta name="theme-color" content="#f8fbff" />
                {/* Belt-and-suspenders: a render-blocking <style> in <head>
                    so the browser applies light bg before it paints anything. */}
                <style
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: "html,body{background-color:#f8fbff !important}" }}
                />
            </head>
            <body
                className={`${inter.variable} ${sora.variable} font-sans antialiased grain-overlay`}
                style={{ backgroundColor: "#f8fbff" }}
            >
                {/* FLASH SHIELD — pure HTML, no React/CSS dependencies.
                    Covers the page from the very first browser paint.
                    Removed by LoadingOverlay.useEffect once React is running.
                    Uses the light bg color to match the new theme. */}
                <div
                    id="flash-shield"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 99999,
                        backgroundColor: "#f8fbff",
                        pointerEvents: "none",
                    }}
                />
                <FlashShieldRemover />
                {children}
                <GlobalCursorWrapper />
            </body>
        </html>
    );
}
