import React from "react";
import { getDictionary } from "../../../lib/i18n/dictionaries";
import { Locale } from "../../../lib/i18n/config";
import AuthCheck from "./components/AuthCheck";
import DashboardLayoutClient from "./components/DashboardLayoutClient";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return (
        <AuthCheck lang={locale}>
            <DashboardLayoutClient lang={locale} dict={dict}>
                {children}
            </DashboardLayoutClient>
        </AuthCheck>
    );
}
