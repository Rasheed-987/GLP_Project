import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string; // Allow passing className for width and other overrides
};

export default function Button({ children, className = '', disabled, ...props }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            className={`px-8 py-3.5 rounded-full text-sm font-bold transition-all
                ${disabled
                    ? 'bg-[#B6CDC1] text-black cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#045A86] to-[#019977] hover:from-[#019977] hover:to-[#045A86] text-white '
                } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
