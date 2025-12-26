"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LocaleSwitcher from "../../../../app/components/LocaleSwitcher";
import UserProfile from "./UserProfile";
import { Menu } from "lucide-react";
import { Locale } from "../../../../lib/i18n/config";

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    lang: Locale;
    dict: any;
}

export default function DashboardLayoutClient({
    children,
    lang,
    dict,
}: DashboardLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <Sidebar
                lang={lang}
                dict={dict}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col no-scrollbar transition-all duration-300 ${lang === 'ar' ? 'md:pr-64' : 'md:pl-64'}`}>
                {/* Topbar */}
                <header className="h-16 border-b border-border-stroke flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Visible on Mobile */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-[#00000099] hover:bg-black/5 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

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
                <main className="p-4 md:p-8 pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
