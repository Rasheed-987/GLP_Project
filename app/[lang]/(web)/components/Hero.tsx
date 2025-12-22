"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

type HeroProps = {
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  backgroundImage: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
};

export default function Hero({ title, description, backgroundImage, buttons }: HeroProps) {
  return (
    <div className="flex flex-col md:block relative w-full md:rounded-[32px] md:overflow-hidden md:h-[600px] lg:h-[700px]">
      {/* 1. Header & Description (Order 1 on mobile) */}
      <div className="order-1 md:absolute md:inset-0 md:z-20 flex items-end pointer-events-none">
        <div className="w-full max-w-2xl md:px-12 py-6 md:pb-14 pointer-events-auto">
          <h1 className="text-[32px] mt-10 md:mt-6 md:mt-0 md:text-5xl lg:text-[56px] font-normal leading-[1.0] text-zinc-900 md:text-white tracking-wide">
            {title.prefix}
            <span className="font-bold block md:inline">{title.highlight}</span>
            {title.suffix}
          </h1>
          <p className="mt-4 text-zinc-600 md:text-white/90 text-base md:text-lg leading-relaxed max-w-lg tracking-wide">
            {description}
          </p>
          
          {/* Desktop Buttons (Hidden on mobile) */}
          <div className="hidden md:flex mt-8 flex-col sm:flex-row gap-4">
  {/* Primary button */}
  <Link
    href={buttons.primary.href}
    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-black  transition"
  >
    {buttons.primary.text}
  </Link>

  {/* Secondary (transparent) button */}
  <Link
    href={buttons.secondary.href}
    className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition"
  >
    {buttons.secondary.text}
  </Link>
</div>

        </div>
      </div>

      {/* 2. Image Block (Order 2 on mobile) */}
      <div className="order-2 relative h-[280px] sm:h-[400px] md:absolute md:inset-0 md:h-full w-full">
        <Image
          src={backgroundImage}
          alt={`${title.prefix}${title.highlight}${title.suffix}`}
          fill
          className="object-cover rounded-[32px] md:rounded-none"
          priority
        />
        {/* Desktop Overlay */}
        <div className="hidden md:block absolute inset-0 bg-black/20" />
      </div>

      {/* 3. Mobile Buttons (Order 3 on mobile, Hidden on desktop) */}
      <div className="order-3 md:hidden flex flex-col gap-3 mt-6">
        <Link 
          href={buttons.primary.href} 
          className="w-full inline-flex items-center justify-center rounded-full bg-brand-gradient text-white py-4 text-sm font-bold shadow-sm"
        >
          {buttons.primary.text}
        </Link>
        <Link 
          href={buttons.secondary.href} 
          className="w-full p-[1.5px] rounded-full bg-brand-gradient"
        >
          <div className="w-full bg-white rounded-full py-[14.5px] flex items-center justify-center">
            <span className="text-[#006A8E] text-sm font-bold">
              {buttons.secondary.text}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

