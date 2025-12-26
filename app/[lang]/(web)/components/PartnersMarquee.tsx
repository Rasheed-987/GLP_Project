"use client";

import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

interface PartnersMarqueeProps {
  children: React.ReactNode;
}

export default function PartnersMarquee({ children }: PartnersMarqueeProps) {
  return (
    <Marquee speed={50} gradient={true} gradientColor="#E9F1EE" gradientWidth={60} pauseOnHover={true}>
      {children}
    </Marquee>
  );
}
