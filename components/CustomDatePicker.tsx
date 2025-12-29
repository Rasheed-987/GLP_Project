"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface CustomDatePickerProps {
    name: string;
    defaultValue?: string;
    onChange?: (date: string) => void;
    lang: "en" | "ar";
    label?: string;
    required?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name,
    defaultValue = "",
    onChange,
    lang,
    label,
    required = false,
}) => {
    const [selectedDate, setSelectedDate] = useState<string>(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const monthsEn = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthsAr = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysAr = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

    const currentMonths = lang === "ar" ? monthsAr : monthsEn;
    const currentDays = lang === "ar" ? daysAr : daysEn;

    useEffect(() => {
        if (defaultValue) {
            const date = new Date(defaultValue);
            if (!isNaN(date.getTime())) {
                setSelectedDate(defaultValue);
                setCurrentMonth(date);
            }
        }
    }, [defaultValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const startOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateSelect = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
        setIsOpen(false);
        if (onChange) onChange(formattedDate);
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysCount = getDaysInMonth(year, month);
        const startDay = startOfMonth(year, month);
        const days = [];

        // Empty spaces before start of month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
        }

        // Actual days
        for (let d = 1; d <= daysCount; d++) {
            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
            const isSelected = selectedDate === new Date(year, month, d).toISOString().split("T")[0];

            days.push(
                <button
                    key={d}
                    type="button"
                    onClick={() => handleDateSelect(d)}
                    className={`h-10 w-10 rounded-xl text-sm font-medium transition-all
            ${isSelected ? "bg-brand-gradient text-white shadow-md shadow-brand-blue/20" :
                            isToday ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-black/5 text-[#00000099]"}`}
                >
                    {d}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && (
                <label className={`block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 ${lang === "ar" ? "text-right" : ""}`}>
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all flex items-center justify-between group"
            >
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-brand-blue" />
                    <span className={`text-sm ${selectedDate ? "text-black" : "text-[#00000044]"}`}>
                        {selectedDate || (lang === "ar" ? "اختر التاريخ..." : "Select date...")}
                    </span>
                </div>
                {!selectedDate && required && (
                    <span className="text-red-500 text-xs">*</span>
                )}
                {selectedDate && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate("");
                            if (onChange) onChange("");
                        }}
                        className="p-1 hover:bg-black/5 rounded-full"
                    >
                        <X className="w-3.5 h-3.5 text-[#00000044]" />
                    </div>
                )}
            </button>

            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={selectedDate} required={required} />

            {isOpen && (
                <div
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="absolute z-[120] top-full mt-2 left-0 md:right-auto w-[320px] bg-white rounded-3xl border border-border-stroke shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200"
                >
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-black/5 rounded-xl text-[#00000066] transition-colors"
                        >
                            <ChevronLeft className={`w-5 h-5 ${lang === "ar" ? "rotate-180" : ""}`} />
                        </button>
                        <div className="text-sm font-bold text-black">
                            {currentMonths[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </div>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-black/5 rounded-xl text-[#00000066] transition-colors"
                        >
                            <ChevronRight className={`w-5 h-5 ${lang === "ar" ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {currentDays.map(day => (
                            <div key={day} className="h-10 flex items-center justify-center text-[10px] font-bold text-[#00000044] uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
