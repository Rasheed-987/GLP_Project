import React from "react";

export default function GLMConnectorLines({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* RED (Leadership spirit) */}
      <path
        d="M340 235 L520 140 L920 140"
        fill="none"
        stroke="#E11D48"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {/* small dash at far right */}
      <line
        x1="965"
        y1="140"
        x2="990"
        y2="140"
        stroke="#E11D48"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="340" cy="235" r="10" fill="#E11D48" />

      {/* BLACK (Future outlook) */}
      <path
        d="M360 470 L520 600 L920 600"
        fill="none"
        stroke="#111827"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="965"
        y1="600"
        x2="990"
        y2="600"
        stroke="#111827"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="360" cy="470" r="10" fill="#111827" />

      {/* GREEN (Achievements and impact) */}
      <path
        d="M285 820 L520 915 L920 915"
        fill="none"
        stroke="#059669"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="965"
        y1="915"
        x2="990"
        y2="915"
        stroke="#059669"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="285" cy="820" r="10" fill="#059669" />
    </svg>
  );
}
