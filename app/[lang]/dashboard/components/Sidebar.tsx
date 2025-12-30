"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";

interface SidebarProps {
    lang: Locale;
    dict: any;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ lang, dict, isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(["resources"]); // Default resources expanded if needed
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const toggleMenu = (label: string) => {
        setExpandedMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const menuItems = [
        {
            href: `/${lang}/dashboard`,
            label: dict.dashboard.sidebar.dashboard,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25v2.25a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            ),
        },
        {
            label: dict.dashboard.sidebar.resources,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-19.5 0A2.25 2.25 0 0 0 2.25 15v1.5a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25m-19.5 0h19.5m-11.25-3v-1.5a2.25 2.25 0 0 1 2.25-2.25h3a2.25 2.25 0 0 1 2.25 2.25v1.5m-7.5 0h7.5" />
                </svg>
            ),
            isParent: true,
            children: [
                {
                    href: `/${lang}/dashboard/articles`,
                    label: dict.dashboard.sidebar.articles,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    ),
                },
            ]
        },
        {
            href: `/${lang}/dashboard/news`,
            label: dict.dashboard.sidebar.news,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
            ),
        },
        {
            href: `/${lang}/dashboard/testimonials`,
            label: dict.dashboard.sidebar.testimonials,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
            ),
        },
        {
            href: `/${lang}/dashboard/settings`,
            label: dict.dashboard.sidebar.settings || "Settings",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`w-64 h-screen bg-[#F7FAF9] border-r border-border-stroke flex flex-col fixed top-0 z-50 transition-all duration-300 transform 
                ${lang === 'ar' ? 'right-0 border-l border-r-0' : 'left-0 border-r border-l-0'}
                ${isOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}
                md:translate-x-0
            `}>
                {/* Logo and Close Button */}
                <div className="p-6 flex items-center justify-between">
                    <Link href={`/${lang}/dashboard`} className="flex items-center gap-3">
                        <Image src="/images/logo.png" alt="UGLP logo" width={40} height={40} className="rounded-sm" />
                        <span className="font-bold text-xl tracking-tight text-black">UAEGLP</span>
                    </Link>

                    {/* Close Button for Mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 text-[#00000066] hover:bg-black/5 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        if (item.isParent) {
                            const isExpanded = expandedMenus.includes(item.label);
                            const isChildActive = item.children?.some(child => pathname.startsWith(child.href));

                            return (
                                <div key={item.label} className="space-y-1">
                                    <button
                                        onClick={() => toggleMenu(item.label)}
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer
                                            ${isChildActive
                                                ? "text-black bg-black/5"
                                                : "text-[#00000099] hover:bg-black/5 hover:text-black"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={isChildActive ? "text-brand-blue" : "text-[#00000066]"}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {isExpanded && (
                                        <div className="pl-12 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            {item.children?.map((child) => {
                                                const isChildActive = pathname.startsWith(child.href);
                                                return (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={`flex items-center gap-3 py-2 text-sm font-medium transition-all cursor-pointer
                                                            ${isChildActive ? "text-brand-blue" : "text-[#00000066] hover:text-black"}`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        const isActive = pathname.startsWith(item.href || "");
                        return (
                            <Link
                                key={item.href}
                                href={item.href || ""}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer
                                    ${isActive
                                        ? "bg-brand-gradient text-white shadow-md shadow-brand-blue/10"
                                        : "text-[#00000099] hover:bg-black/5 hover:text-black"
                                    }`}
                            >
                                <span className={isActive ? "text-white" : "text-[#00000066]"}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-border-stroke">
                    <button
                        onClick={async () => {
                            setIsLoggingOut(true);
                            // Clear user data
                            localStorage.removeItem("user");
                            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

                            // Simulate a small delay for better UX
                            await new Promise(resolve => setTimeout(resolve, 600));

                            setIsLoggingOut(false);
                            router.push(`/${lang}/sign-in`);
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-[#00000099] hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {isLoggingOut ? (
                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        )}
                        {isLoggingOut ? "Logging out..." : dict.dashboard.sidebar.logout}
                    </button>
                </div>
            </aside>
        </>
    );
}
