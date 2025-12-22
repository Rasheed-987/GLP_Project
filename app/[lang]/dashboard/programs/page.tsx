"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function ProgramsPage() {
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
                    {dict.dashboard.sidebar.programs}
                </h1>
                <p className="text-[#00000099] text-sm mt-1">
                    Your active and recommended leadership programs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#F7FAF9] border border-border-stroke space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="bg-[#E6EEF3] text-[#045A86] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Active</span>
                            <span className="text-[10px] font-bold text-[#00000066]">Started: Jan 2025</span>
                        </div>
                        <h3 className="text-lg font-bold text-black">UAE Government Leadership Program</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#00000099]">Overall Progress</span>
                                <span className="font-bold text-black">60%</span>
                            </div>
                            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                                <div className="h-full w-3/5 bg-brand-gradient"></div>
                            </div>
                        </div>
                        <div className="pt-4 flex gap-4">
                            <button className="flex-1 py-3 px-4 rounded-xl bg-brand-gradient text-white text-xs font-bold hover:opacity-90 transition-opacity">Continue Module</button>
                            <button className="px-4 py-3 rounded-xl border border-border-stroke text-xs font-bold text-black hover:bg-black/5">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
