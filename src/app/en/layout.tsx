"use client";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

export default function EnLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <div lang="en">{children}</div>
        </NextIntlClientProvider>
    );
}
