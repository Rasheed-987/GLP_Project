import React from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale } from "@/lib/i18n/config";
import Sidebar from "./components/Sidebar";
import AuthCheck from "./components/AuthCheck";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";
import UserProfile from "./components/UserProfile";

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
            <div className="flex min-h-screen bg-white">
                {/* Sidebar */}
                <Sidebar lang={lang} dict={dict} />

                {/* Main Content */}
                <div className={`flex-1 flex flex-col no-scrollbar transition-all duration-300 ${lang === 'ar' ? 'md:pr-64' : 'md:pl-64'}`}>
                    {/* Topbar Placeholder */}
                    <header className="h-16 border-b border-border-stroke flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-semibold text-[#00000099]">
                                {dict.dashboard.sidebar.dashboard}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <LocaleSwitcher currentLocale={lang} />
                            <UserProfile />
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-8 pb-12">
                        {children}
                    </main>
                </div>
            </div>
        </AuthCheck>
    );
}
