"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";

export default function DashboardPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);

    React.useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    if (!dict) return null;

    const stats = [
        { label: dict.dashboard.overview.activePrograms, value: "2", color: "from-[#045A86] to-[#019977]", href: `/${lang}/programs` },
        { label: dict.dashboard.overview.recentArticles, value: "5", color: "from-[#019977] to-[#045A86]", href: `/${lang}/articles` },
        { label: dict.dashboard.overview.newResources, value: "12", color: "from-[#045A86] to-[#019977]", href: `/${lang}/resources` },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">
                    {dict.dashboard.overview.welcome} <span className="gradient-text">User</span>
                </h1>
                <p className="text-[#00000099] text-sm mt-1">
                    Manage your learning journey and explore new opportunities.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <Link
                        key={idx}
                        href={stat.href}
                        className="group relative overflow-hidden p-6 rounded-2xl bg-[#F7FAF9] border border-border-stroke hover:border-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-blue/5"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-[100px] transition-all group-hover:scale-110`}></div>
                        <p className="text-sm font-semibold text-[#00000099] uppercase tracking-wider">
                            {stat.label}
                        </p>
                        <p className="text-4xl font-bold text-black mt-2">
                            {stat.value}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-blue group-hover:text-brand-green transition-colors">
                            {dict.dashboard.overview.viewAll}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Main Sections (Brief list) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Programs Snippet */}
                <div className="p-6 rounded-2xl border border-border-stroke bg-white space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-black">{dict.dashboard.sidebar.programs}</h3>
                        <Link href={`/${lang}/programs`} className="text-xs font-bold text-brand-blue hover:text-brand-green">
                            {dict.dashboard.overview.viewAll}
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-[#F7FAF9] border border-border-stroke flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-black">UAE Government Leadership Program</p>
                                <p className="text-[10px] text-[#00000099]">Progress: 60%</p>
                            </div>
                            <div className="w-10 h-1 rounded-full bg-black/5 overflow-hidden">
                                <div className="h-full w-3/5 bg-brand-gradient"></div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-[#F7FAF9] border border-border-stroke flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-black">Nafis Leadership Program</p>
                                <p className="text-[10px] text-[#00000099]">Progress: 15%</p>
                            </div>
                            <div className="w-10 h-1 rounded-full bg-black/5 overflow-hidden">
                                <div className="h-full w-1/5 bg-brand-gradient"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Articles Snippet */}
                <div className="p-6 rounded-2xl border border-border-stroke bg-white space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-black">{dict.dashboard.sidebar.articles}</h3>
                        <Link href={`/${lang}/articles`} className="text-xs font-bold text-brand-blue hover:text-brand-green">
                            {dict.dashboard.overview.viewAll}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-16 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-gradient opacity-10"></div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-black leading-tight line-clamp-1">
                                        The Future of AI in Government Leadership
                                    </p>
                                    <p className="text-[10px] text-[#00000099]">2 hours ago • 5 min read</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
