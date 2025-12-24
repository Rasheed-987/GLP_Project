"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";
import {
    Newspaper,
    MessageSquare,
    FileText,
    ArrowRight,
    TrendingUp,
    Clock,
    Calendar,
    ChevronRight,
    User,
    Loader2
} from "lucide-react";
import clientApi from "@/lib/clientApi";

export default function DashboardPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);
    const [fullName, setFullName] = useState<string>("Admin");
    const [statsData, setStatsData] = useState({
        articles: 0,
        news: 0,
        testimonials: 0
    });
    const [recentArticles, setRecentArticles] = useState<any[]>([]);
    const [recentNews, setRecentNews] = useState<any[]>([]);
    const [recentTestimonials, setRecentTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDictionary(lang).then(setDict);

        const fetchData = async () => {
            try {
                setLoading(true);
                const [articlesRes, newsRes, testimonialsRes] = await Promise.all([
                    clientApi.get("/api/articles"),
                    clientApi.get("/api/news"),
                    clientApi.get("/api/testimonials")
                ]);

                const articles = articlesRes.data;
                const news = newsRes.data;
                const testimonials = testimonialsRes.data;

                setStatsData({
                    articles: articles.length,
                    news: news.length,
                    testimonials: testimonials.length
                });

                setRecentArticles(articles.slice(0, 3));
                setRecentNews(news.slice(0, 4));
                setRecentTestimonials(testimonials.slice(0, 2));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

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
            value: statsData.articles.toString(),
            icon: <FileText className="w-5 h-5" />,
            color: "text-brand-blue",
            bg: "bg-brand-blue/10",
            href: `/${lang}/dashboard/articles`
        },
        {
            label: dict.dashboard.sidebar.news,
            value: statsData.news.toString(),
            icon: <Newspaper className="w-5 h-5" />,
            color: "text-[#019977]",
            bg: "bg-[#019977]/10",
            href: `/${lang}/dashboard/news`
        },
        {
            label: dict.dashboard.sidebar.testimonials,
            value: statsData.testimonials.toString(),
            icon: <MessageSquare className="w-5 h-5" />,
            color: "text-brand-blue",
            bg: "bg-brand-blue/10",
            href: `/${lang}/dashboard/testimonials`
        },
    ];


    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
            </div>
        );
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
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.recentArticles}</h3>
                            </div>
                            <Link href={`/${lang}/dashboard/articles`} className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-all flex items-center gap-1 group">
                                {dict.dashboard.overview.viewAll}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentArticles.length > 0 ? (
                                recentArticles.map((article, i) => (
                                    <div key={i} className="group p-4 rounded-2xl bg-[#F7FAF9] border border-transparent hover:border-brand-blue/20 hover:bg-white hover:shadow-lg hover:shadow-brand-blue/5 transition-all cursor-pointer">
                                        <h4 className="font-bold text-black group-hover:text-brand-blue transition-colors mb-2">
                                            {lang === 'ar' ? article.title.ar : article.title.en}
                                        </h4>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-[#00000066] uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {lang === 'ar' ? article.date.ar : article.date.en}
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
                                    <Newspaper className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.latestNews}</h3>
                            </div>
                            <Link href={`/${lang}/dashboard/news`} className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-all flex items-center gap-1 group">
                                {dict.dashboard.overview.viewAll}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentNews.length > 0 ? (
                                recentNews.map((news, i) => (
                                    <div key={i} className="p-4 rounded-2xl border border-border-stroke space-y-3 relative overflow-hidden group hover:border-brand-blue/20 transition-all">
                                        <span className="absolute top-0 right-0 w-16 h-16 bg-brand-green/5 rounded-bl-[40px]"></span>
                                        <h4 className="font-bold text-black text-sm line-clamp-1 pr-4">
                                            {lang === 'ar' ? news.topic.ar : news.topic.en}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-medium text-[#00000066]">
                                                {lang === 'ar' ? news.expiryDate.ar : news.expiryDate.en}
                                            </p>
                                            <span className="px-2 py-0.5 bg-[#E6F4F1] text-[#019977] text-[8px] font-bold uppercase rounded-full">
                                                {lang === 'ar' ? news.status.ar : news.status.en}
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
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-black text-lg">{dict.dashboard.overview.latestTestimonials}</h3>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            {recentTestimonials.length > 0 ? (
                                recentTestimonials.map((t, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-[#F7FAF9] border border-border-stroke space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-black">{lang === 'ar' ? t.name.ar : t.name.en}</p>
                                                <p className="text-[10px] text-[#00000066] font-medium">{lang === 'ar' ? t.profession.ar : t.profession.en}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs italic leading-relaxed text-[#00000099] line-clamp-3">
                                            &quot;{lang === 'ar' ? t.description.ar : t.description.en}&quot;
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
