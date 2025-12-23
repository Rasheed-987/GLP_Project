"use client";

import React, { useMemo, useState, useEffect } from "react";

export default function AccordionSection({
  title,
  color,
  defaultOpen = true,
  children,
  onToggle,
  headerRef,
}: {
  title: string;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
  headerRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const icon = useMemo(() => (open ? "−" : "+"), [open]);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="pb-10 relative group/accordion">
      <div className="relative">
        <button
          ref={headerRef}
          type="button"
          onClick={handleToggle}
          className="w-full flex items-center justify-between text-start gap-4 pb-4 relative z-10"
          style={{ borderBottom: `2px solid ${color}` }}
        >
          <h2 className="text-[18px] md:text-[20px] font-semibold" style={{ color }}>
            {title}
          </h2>

          <span className="text-[18px] md:text-[20px] font-semibold select-none" style={{ color }}>
            {icon}
          </span>
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pt-6 relative">
           {children}
        </div>
      </div>
    </div>
  );
}
