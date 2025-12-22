"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n/config";

interface SidebarProps {
    lang: Locale;
    dict: any;
}

export default function Sidebar({ lang, dict }: SidebarProps) {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(["resources"]); // Default resources expanded if needed

    const toggleMenu = (label: string) => {
        setExpandedMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const menuItems = [
        {
            href: `/${lang}/dashboard/home`,
            label: dict.dashboard.sidebar.dashboard,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            ),
        },
        {
            label: dict.dashboard.sidebar.resources,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
            ),
            isParent: true,
            children: [
                {
                    href: `/${lang}/dashboard/articles`,
                    label: dict.dashboard.sidebar.articles,
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.062.51.11.77.143.882.112 1.77.167 2.66.167h.75a2.25 2.25 0 002.25-2.25v-4.5a2.25 2.25 0 00-2.25-2.25h-.75c-.89 0-1.778.055-2.66.167a7.19 7.19 0 01-.77.143m0 9.18V6.162" />
                </svg>
            ),
        },
        {
            href: `/${lang}/dashboard/testimonials`,
            label: dict.dashboard.sidebar.testimonials,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="w-64 h-screen bg-[#F7FAF9] border-r border-border-stroke flex flex-col fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="p-6">
                <Link href={`/${lang}/dashboard`} className="flex items-center gap-3">
                    <Image src="/images/logo.png" alt="UGLP logo" width={40} height={40} className="rounded-sm" />
                    <span className="font-bold text-xl tracking-tight text-black">UAEGLP</span>
                </Link>
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
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all
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
                                                    className={`flex items-center gap-3 py-2 text-sm font-medium transition-all
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
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
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
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-[#00000099] hover:bg-red-50 hover:text-red-600 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    {dict.dashboard.sidebar.logout}
                </button>
            </div>
        </aside>
    );
}
