"use client";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/es.json";

export default function EsLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider locale="es" messages={messages}>
            <div lang="es">{children}</div>
        </NextIntlClientProvider>
    );
}
