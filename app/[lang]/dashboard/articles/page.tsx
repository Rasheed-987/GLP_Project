"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function ArticlesPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);

    React.useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    if (!dict) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">
                    {dict.dashboard.sidebar.articles}
                </h1>
                <p className="text-[#00000099] text-sm mt-1">
                    Insights and updates from the world of government leadership.
                </p>
            </div>

            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl bg-[#F7FAF9] border border-border-stroke hover:border-brand-blue/30 transition-all group">
                        <div className="w-full md:w-48 aspect-video rounded-xl bg-gray-200 overflow-hidden relative shrink-0">
                            <div className="absolute inset-0 bg-brand-gradient opacity-10"></div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest mb-1">Insights</span>
                            <h3 className="font-bold text-black text-lg group-hover:text-brand-blue transition-colors">Article Title {i}</h3>
                            <p className="text-sm text-[#00000099] mt-2 line-clamp-2 max-w-2xl">This is a summary of the article that explains the key takeaways and why you should read it.</p>
                            <div className="mt-4 flex items-center gap-4 text-[10px] text-[#00000066] font-medium">
                                <span>24 Dec 2025</span>
                                <span>•</span>
                                <span>6 min read</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
