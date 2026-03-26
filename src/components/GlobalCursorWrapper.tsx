"use client";

import { CustomCursor } from "@/components/CustomCursor";

/**
 * GlobalCursorWrapper — "use client" boundary that mounts CustomCursor
 * at the root layout level so it persists across ALL routes.
 *
 * This component is imported by the root layout.tsx (which is a server
 * component). By isolating the client component here, we avoid making
 * the root layout itself a client component.
 */
export function GlobalCursorWrapper() {
    return <CustomCursor />;
}
