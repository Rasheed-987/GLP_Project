"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
    options: string[];
    placeholder: string;
    onChange?: (value: string) => void;
}

export default function Dropdown({
    options,
    placeholder,
    onChange,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Hidden Input for Form Submission if needed */}
            <input type="hidden" name="interest" value={selected} />

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-2.5 rounded-full border border-gray-200 bg-white
                text-left flex items-center justify-between
                focus:outline-none focus:ring-2 focus:ring-[#038174]/20 transition-all
                ${selected ? "text-gray-800" : "text-gray-400"}
                font-medium text-[15px]
            `}
            >
                <span className="truncate">{selected || placeholder}</span>
                <span className={`transform transition-transform duration-200 text-black/80 ${isOpen ? "rotate-180" : ""}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-[120%] left-0 w-full z-20">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-4 max-h-60 overflow-y-auto w-full flex flex-col items-start pl-2">
                        {options.map((option, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`
                                w-[calc(100%-1rem)] mx-2 text-left px-4 py-2 text-[15px] font-bold transition-all rounded-full border border-transparent
                                ${selected === option ? "text-[#038174] border-gray-200" : "text-black"} 
                                hover:text-[#038174] hover:border-gray-200
                            `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
