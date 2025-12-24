"use client";

import React from "react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md animate-in fade-in duration-500">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-brand-blue/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-4 bg-brand-gradient rounded-full opacity-20 animate-pulse" />
            </div>
            <p className="mt-6 text-sm font-bold text-brand-blue tracking-widest uppercase animate-pulse font-outfit">
                Loading Dashboard...
            </p>
        </div>
    );
}
