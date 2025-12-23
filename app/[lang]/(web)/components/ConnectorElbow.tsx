import React from "react";

export default function ConnectorElbow({
  color,
  dotX = 0,
  dotY = 38,
  elbowX = 80,
  endX = 220,
  endY = 38,
}: {
  color: string;
  dotX?: number;  // where the dot starts (x)
  dotY?: number;  // where the dot starts (y)
  elbowX?: number; // where elbow happens
  endX?: number;   // how far it extends to the right
  endY?: number;   // y of the horizontal segment
}) {
  return (
    <svg
      width={endX}
      height={80}
      viewBox={`0 0 ${endX} 80`}
      className="block overflow-visible"
      aria-hidden="true"
    >
      {/* Dot at the start */}
      <circle cx={dotX + 5} cy={dotY} r="6" fill={color} />

      {/* Horizontal line from dot to end */}
      <path
        d={`M ${dotX + 5} ${endY} L ${endX} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
