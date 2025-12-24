"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { Locale } from "../../lib/i18n/config";

interface DatePickerProps {
    value?: string;
    onChange: (date: string) => void;
    lang: Locale;
    placeholder?: string;
    label?: string;
    dir?: "ltr" | "rtl";
}

export default function DatePicker({ value, onChange, lang, placeholder, label, dir = "ltr" }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value.split('.').reverse().join('-')) : new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const formatDate = (date: Date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}.${m}.${y}`;
    };

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        onChange(formatDate(selectedDate));
        setIsOpen(false);
    };

    const changeMonth = (offset: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const monthName = viewDate.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long' });
    const yearNumber = viewDate.getFullYear();

    const weekdays = lang === 'ar'
        ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] // Sun to Sat
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const days = [];
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const startDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let i = 1; i <= totalDays; i++) {
        const isSelected = value === formatDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));
        days.push(
            <button
                key={i}
                type="button"
                onClick={() => handleDateSelect(i)}
                className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all hover:bg-brand-blue/10 hover:text-brand-blue cursor-pointer
                    ${isSelected ? "bg-brand-gradient text-white shadow-md shadow-brand-blue/20" : "text-black"}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="relative w-full" ref={containerRef} dir={dir}>
            {label && <label className={`block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{label}</label>}
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={value || ""}
                    placeholder={placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all cursor-pointer ${dir === 'rtl' ? 'text-right pr-10' : 'pl-10 text-left'}`}
                />
                <CalendarIcon className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue pointer-events-none ${dir === 'rtl' ? 'right-4' : 'left-4'}`} />
                {value && (
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onChange(""); }}
                        className={`absolute top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full text-[#00000033] hover:text-red-500 transition-colors ${dir === 'rtl' ? 'left-4' : 'right-4'}`}
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className={`absolute z-[200] mt-2 bg-white/80 backdrop-blur-xl border border-border-stroke rounded-3xl shadow-2xl p-6 w-[320px] animate-in fade-in zoom-in-95 duration-200 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-black/5 rounded-xl transition-colors cursor-pointer">
                            {dir === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>
                        <div className="text-sm font-bold text-black">
                            {monthName} {yearNumber}
                        </div>
                        <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-black/5 rounded-xl transition-colors cursor-pointer">
                            {dir === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekdays.map(day => (
                            <div key={day} className="h-8 flex items-center justify-center text-[10px] font-bold text-[#00000033] uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {days}
                    </div>
                </div>
            )}
        </div>
    );
}
