"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Locale } from "../../../lib/i18n/config";
import { getDictionary } from "../../../lib/i18n/dictionaries";
import Link from "next/link";
import {
    ArrowRight,
    TrendingUp,
    Clock,
    Calendar,
    ChevronRight,
    User,
    Loader2
} from "lucide-react";
import LoadingScreen from "../../../components/LoadingScreen";
import {
    useDashboardStats,
    useRecentArticles,
    useRecentNews,
    useRecentTestimonials
} from "../../../hooks/useDashboard";

export default function DashboardPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);
    const [fullName, setFullName] = useState<string>("Admin");

    // React Query Hooks
    const { data: statsData, isLoading: statsLoading } = useDashboardStats();
    const { data: recentArticles, isLoading: articlesLoading } = useRecentArticles(lang);
    const { data: recentNews, isLoading: newsLoading } = useRecentNews(lang);
    const { data: recentTestimonials, isLoading: testimonialsLoading } = useRecentTestimonials(lang);

    const loading = statsLoading || articlesLoading || newsLoading || testimonialsLoading;

    useEffect(() => {
        getDictionary(lang).then(setDict);

        // Get user from localStorage safely after mount
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.fullName) {
                    setFullName(user.fullName);
                }
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }
    }, [lang]);

    if (!dict) return null;

    const stats = [
        {
            label: dict.dashboard.sidebar.articles,
            value: (statsData?.articles || 0).toString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            ),
            color: "text-brand-blue",
            bg: "bg-brand-blue/10",
            href: `/${lang}/dashboard/articles`
        },
        {
            label: dict.dashboard.sidebar.news,
            value: (statsData?.news || 0).toString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
            ),
            color: "text-[#019977]",
            bg: "bg-[#019977]/10",
            href: `/${lang}/dashboard/news`
        },
        {
            label: dict.dashboard.sidebar.testimonials,
            value: (statsData?.testimonials || 0).toString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
            ),
            color: "text-brand-blue",
            bg: "bg-brand-blue/10",
            href: `/${lang}/dashboard/testimonials`
        },
    ];


    if (loading || !dict) {
        return <LoadingScreen />;
    }

    return (
        <div className="space-y-10 pb-10 text-[#00000099] animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-black tracking-tight">
                    {dict.dashboard.overview.welcome} <span className="text-brand-blue">{fullName}</span>
                </h1>
                <p className="text-[#00000099] text-sm mt-1.5 font-medium">
                    Here&apos;s what&apos;s happening across your modules today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <Link
                        key={idx}
                        href={stat.href}
                        className="group relative p-6 rounded-3xl bg-white border border-border-stroke hover:border-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-blue/5 overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-[#019977] bg-[#E6F4F1] px-2 py-1 rounded-full uppercase tracking-wider">
                                <TrendingUp className="w-3 h-3" />
                                Updated
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#00000066] uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-bold text-black">{stat.value}</span>
                                <span className="text-[10px] font-bold text-[#00000066] uppercase tracking-wider">published</span>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-brand-blue group-hover:gap-3 transition-all uppercase tracking-widest">
                            {dict.dashboard.overview.viewAll}
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Articles & News */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Recent Articles */}
                    <section className="bg-white rounded-3xl border border-border-stroke p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-brand-blue/5 text-brand-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.recentArticles}</h3>
                            </div>
                            <Link href={`/${lang}/dashboard/articles`} className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-all flex items-center gap-1 group">
                                {dict.dashboard.overview.viewAll}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentArticles?.length > 0 ? (
                                recentArticles.map((article: any, i: number) => (
                                    <div key={i} className="group p-4 rounded-2xl bg-[#F7FAF9] border border-transparent hover:border-brand-blue/20 hover:bg-white hover:shadow-lg hover:shadow-brand-blue/5 transition-all cursor-pointer">
                                        <h4 className="font-bold text-black group-hover:text-brand-blue transition-colors mb-2">
                                            {typeof article.title === 'string' ? article.title : (lang === 'ar' ? article.title?.ar : article.title?.en)}
                                        </h4>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-[#00000066] uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {typeof article.date === 'string' ? article.date : (lang === 'ar' ? article.date?.ar : article.date?.en)}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />
                                                {new Date(article.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-center py-6 text-[#00000066]">No articles found.</p>
                            )}
                        </div>
                    </section>

                    {/* Latest News */}
                    <section className="bg-white rounded-3xl border border-border-stroke p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-brand-green/5 text-brand-green">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.latestNews}</h3>
                            </div>
                            <Link href={`/${lang}/dashboard/news`} className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-all flex items-center gap-1 group">
                                {dict.dashboard.overview.viewAll}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentNews?.length > 0 ? (
                                recentNews.map((news: any, i: number) => (
                                    <div key={i} className="p-4 rounded-2xl border border-border-stroke space-y-3 relative overflow-hidden group hover:border-brand-blue/20 transition-all">
                                        <span className="absolute top-0 right-0 w-16 h-16 bg-brand-green/5 rounded-bl-[40px]"></span>
                                        <h4 className="font-bold text-black text-sm line-clamp-1 pr-4">
                                            {typeof news.topic === 'string' ? news.topic : (lang === 'ar' ? news.topic?.ar : news.topic?.en)}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-medium text-[#00000066]">
                                                {typeof news.expiryDate === 'string' ? news.expiryDate : (lang === 'ar' ? news.expiryDate?.ar : news.expiryDate?.en)}
                                            </p>
                                            <span className="px-2 py-0.5 bg-[#E6F4F1] text-[#019977] text-[8px] font-bold uppercase rounded-full">
                                                {typeof news.status === 'string' ? news.status : (lang === 'ar' ? news.status?.ar : news.status?.en)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-center py-6 text-[#00000066] col-span-full">No news found.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Testimonials */}
                <div className="lg:col-span-4 h-full">
                    <section className="bg-white rounded-3xl border border-border-stroke p-8 space-y-6 h-full flex flex-col">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-brand-blue/5 text-brand-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.latestTestimonials}</h3>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            {recentTestimonials?.length > 0 ? (
                                recentTestimonials.map((t: any, i: number) => (
                                    <div key={i} className="p-5 rounded-2xl bg-[#F7FAF9] border border-border-stroke space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-black">{typeof t.name === 'string' ? t.name : (lang === 'ar' ? t.name?.ar : t.name?.en)}</p>
                                                <p className="text-[10px] text-[#00000066] font-medium">{typeof t.profession === 'string' ? t.profession : (lang === 'ar' ? t.profession?.ar : t.profession?.en)}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs italic leading-relaxed text-[#00000099] line-clamp-3">
                                            &quot;{typeof t.description === 'string' ? t.description : (lang === 'ar' ? t.description?.ar : t.description?.en)}&quot;
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-center py-6 text-[#00000066]">No testimonials found.</p>
                            )}
                        </div>
                        <Link href={`/${lang}/dashboard/testimonials`} className="mt-6 w-full py-4 bg-[#F7FAF9] rounded-2xl text-xs font-bold text-black hover:bg-[#E6F4F1] transition-all flex items-center justify-center gap-2 group cursor-pointer border border-border-stroke">
                            Explore All Testimonials
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </section>
                </div>

            </div>
        </div>
    );
}
