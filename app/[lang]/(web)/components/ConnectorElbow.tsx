import React from "react";

export default function ConnectorElbow({
  color,
  dotX = 0,
  dotY = 33,
  elbowX = 200,
  endX = 520,
  endY = 38,
}: {
  color: string;
  dotX?: number;  // ✅ where on the globe ring (x)
  dotY?: number;  // ✅ where on the globe ring (y)
  elbowX?: number; // where elbow happens
  endX?: number;   // how far it extends to the right
  endY?: number;   // y of the horizontal segment
}) {
  return (
    <svg
      width={endX}
      height={120}
      viewBox="0 0 520 120"
      className="block overflow-visible"
      aria-hidden="true"
    >
      <circle cx={dotX} cy={dotY} r="10" fill={color} />

      <path
        d={`M ${dotX} ${dotY} L ${elbowX} ${endY} L ${endX} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
