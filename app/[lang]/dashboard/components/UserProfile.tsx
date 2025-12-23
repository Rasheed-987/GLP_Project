"use client";

import React, { useState } from "react";

// Initialize user from localStorage
const getUserFromStorage = () => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            return JSON.parse(storedUser);
        } catch (e) {
            console.error("Failed to parse user data", e);
            return null;
        }
    }
    return null;
};

export default function UserProfile() {
    const [user] = useState<{ fullName: string; email: string } | null>(getUserFromStorage);

    if (!user) {
        return (
            <div className="flex items-center gap-3 animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="hidden md:block">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    // Get initials
    const initials = user.fullName
        ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    return (
        <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-black leading-none">{user.fullName}</span>
                <span className="text-xs text-[#00000066] mt-0.5">{user.email}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shadow-md shadow-brand-blue/20">
                {initials}
            </div>
        </div>
    );
}
