
import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../../../public/images/arrow111.png";

export type Article = {
    id: string;
    slug: string;
    tag?: string;
    date?: string;
    title: string;
    excerpt?: string;
    image: string;
    content?: string;
};

export default function ArticleTile({ article, lang }: { article: Article; lang: string }) {
    const href = `/${lang}/resources/${article.slug}`;

    return (
        <Link
            href={href}
            className="group relative block overflow-hidden rounded-[20px] bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
            <div className="relative aspect-[1.6]">
                <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

                {/* tag */}
                {article.tag && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {article.tag}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium uppercase tracking-widest mb-3">
                    {article.date && <span>{article.date}</span>}
                </div>

                <h3 className="text-slate-900 text-[18px] md:text-[20px] font-bold leading-tight mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {article.title}
                </h3>

                {article.excerpt && (
                    <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-6">
                        {article.excerpt}
                    </p>
                )}

                <div className="flex items-center text-teal-700 text-[13px] font-bold mt-auto">
                    Read Article
                    <svg className="w-4 h-4 ml-2 rtl:rotate-180 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
