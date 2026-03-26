import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // AlfaSky design tokens
                brand: {
                    navy: "#0A1628",        // Deep navy — primary text on light
                    dark: "#0F1D32",        // Slightly lighter dark
                    blue: "#1B3A5C",        // Core brand blue
                    accent: "#2E7DD1",      // Bright accent blue
                    light: "#5BA4E6",       // Light blue highlights
                    sky: "#8EC8F0",         // Sky-soft blue
                    ice: "#C4E0F5",         // Icy pale blue
                },
                neutral: {
                    950: "#050A12",         // Almost black with blue cast
                    900: "#0A1221",         // Very dark
                    800: "#121E33",         // Dark panels
                    700: "#1C2D48",         // Cards/surfaces
                    600: "#2A3F5F",         // Borders
                    500: "#4A5B78",         // Muted text on light
                    400: "#8A9AB5",         // Secondary text
                    300: "#B0BDD0",         // Tertiary
                    200: "#D0D9E6",         // Light borders
                    100: "#E8EDF4",         // Light surfaces
                    50: "#F4F7FB",          // Near white
                },
                // Light theme surfaces
                surface: {
                    primary: "#ffffff",
                    secondary: "#f8fbff",
                    tertiary: "#f0f4fa",
                    border: "#e2e8f2",
                    "border-subtle": "#edf1f7",
                },
                // shadcn-ui CSS variable colors
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-sora)", "var(--font-inter)", "system-ui", "sans-serif"],
            },
            fontSize: {
                "display-xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
                "display-lg": ["clamp(2.25rem, 4vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
                "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
                "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
            },
            backgroundImage: {
                "grain": "url('/media/ui/grain.svg')",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-hero": "linear-gradient(180deg, rgba(248,251,255,0.85) 0%, rgba(248,251,255,0.3) 40%, rgba(248,251,255,0.5) 70%, rgba(248,251,255,0.92) 100%)",
                "gradient-panel": "linear-gradient(180deg, transparent 0%, rgba(248,251,255,0.85) 100%)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "spin-slow": "spin 20s linear infinite",
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.8s ease-out forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                slideUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
