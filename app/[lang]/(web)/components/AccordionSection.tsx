"use client";

import React, { useMemo, useState } from "react";

export default function AccordionSection({
  title,
  color,
  defaultOpen = true,
  children,
  showConnector = false,
}: {
  title: string;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  showConnector?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const icon = useMemo(() => (open ? "−" : "+"), [open]);

  return (
    <div className="pb-10">
      <div className="relative">
        {/* Connector line and dot - only on desktop */}
        {showConnector && (
          <div className="hidden lg:flex items-center absolute right-full top-1/2 -translate-y-1/2 pr-2">
            {/* Dot */}
            <div 
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            {/* Line */}
            <div 
              className="w-20 h-[2px]"
              style={{ backgroundColor: color }}
            />
          </div>
        )}
        
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between text-left gap-4 pb-4"
          style={{ borderBottom: `2px solid ${color}` }}
        >
          <h2 className="text-[18px] md:text-[20px] font-semibold" style={{ color }}>
            {title}
          </h2>

          <span className="text-[18px] md:text-[20px] font-semibold select-none" style={{ color }}>
            {icon}
          </span>
        </button>

        {/* small dash at far right (like screenshot) */}
      
      </div>

      {open ? <div className="pt-6">{children}</div> : null}
    </div>
  );
}
