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
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <AuthCheck lang={lang}>
            <DashboardLayoutClient lang={lang} dict={dict}>
                {children}
            </DashboardLayoutClient>
        </AuthCheck>
    );
}
