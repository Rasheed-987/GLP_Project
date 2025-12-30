import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string; // Allow passing className for width and other overrides
    loading?: boolean;
};

export default function Button({ children, className = '', disabled, loading, ...props }: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={`px-8 cursor-pointer py-3.5 whitespace-nowrap rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2
                ${disabled || loading
                    ? 'bg-[#B6CDC1] text-black cursor-not-allowed'
                    : 'bg-brand-gradient text-white'
                } ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}
