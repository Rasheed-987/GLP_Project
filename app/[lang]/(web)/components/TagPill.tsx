import React from 'react';

type TagPillProps = {
    label: string;
    className?: string;
};

export default function TagPill({ label, className = '' }: TagPillProps) {
    return (
        <div className={`inline-flex items-center bg-[#E3EFF6] border border-[#045A8633] px-3 py-1.5 rounded-full ${className}`}>
            <span className="text-brand-from text-[13px] font-bold uppercase tracking-[1] leading-none">
                {label}
            </span>
        </div>
    );
}
