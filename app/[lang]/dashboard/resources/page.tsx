"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function ResourcesPage() {
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
                    {dict.dashboard.sidebar.resources}
                </h1>
                <p className="text-[#00000099] text-sm mt-1">
                    Explore curated tools and learning materials.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group p-4 rounded-2xl bg-[#F7FAF9] border border-border-stroke hover:border-brand-blue/30 transition-all">
                        <div className="aspect-video rounded-xl bg-gray-200 mb-4 overflow-hidden relative">
                            <div className="absolute inset-0 bg-brand-gradient opacity-10"></div>
                        </div>
                        <h3 className="font-bold text-black text-sm group-hover:text-brand-blue transition-colors">Resource Title {i}</h3>
                        <p className="text-xs text-[#00000099] mt-1 line-clamp-2">Brief description of the resource to provide context.</p>
                        <button className="mt-4 text-[10px] font-bold text-brand-blue uppercase tracking-wider">Download PDF</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
