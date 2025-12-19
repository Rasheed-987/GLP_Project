'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProgramCardProps {
  program: {
    tag: string;
    title: string;
    description: string;
  };
  isInteractive: boolean;
  foregroundImage: string;
  index: number;
  dict: {
    nav: {
      expand: string;
      close: string;
    };
  };
}

export default function InteractiveProgramCard({
  program,
  isInteractive,
  foregroundImage,
  index,
  dict,
}: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div key={program.title} className="group relative rounded-[32px] overflow-hidden aspect-4/5 lg:aspect-3/4 bg-brand-green">
      {/* Background Pattern */}
      <Image
        src="/images/gb.png"
        alt=""
        fill
        className="object-cover"
      />

      {/* Foreground Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src={foregroundImage}
          alt={program.title}
          fill
          className={`object-contain object-bottom-right pointer-events-none transition-transform duration-500 ease-out ${isInteractive ? 'group-hover:scale-105' : ''}`}
        />
      </div>

      {/* Overlays for text readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent h-1/2" />
      <div
        className={`absolute inset-0 z-20 bg-linear-to-t from-black/80 via-transparent transition-opacity duration-500 ${
          isInteractive
            ? 'opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hidden lg:block'
            : 'opacity-100'
        } ${isExpanded ? 'opacity-100' : ''}`}
      />

      {/* Content (Pill, Title, and Description) */}
      <div className="absolute inset-0 z-30 p-8 flex flex-col pointer-events-none">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
            {program.tag}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-[90%]">
          {program.title}
        </h3>

        {/* Desktop: Description shows on hover */}
        <div
          className={`mt-auto transition-all duration-500 transform hidden lg:block ${
            isInteractive
              ? 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-white/90 text-sm leading-relaxed max-w-[95%]">
            {program.description}
          </p>
        </div>

        {/* Mobile: Preview text on initial load */}
        <div
          className={`mt-50 transition-all duration-500 transform lg:hidden ${
            isExpanded ? 'opacity-0 translate-y-4 hidden' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-white/90 text-sm leading-relaxed max-w-[95%] line-clamp-2">
            {program.description}
          </p>
        </div>

        {/* Mobile: Full description shows on expand */}
        {isExpanded && (
          <div className="lg:hidden mb-3 absolute bottom-20 left-8 right-8 transition-all duration-500 transform">
            <p className="text-white/90 text-sm leading-relaxed max-w-[95%]">
              {program.description}
            </p>
          </div>
        )}
      </div>

      {/* Mobile: Expand/Close Link */}
      <div className="absolute bottom-8 left-8 right-8 z-40 lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="pointer-events-auto text-white text-sm font-bold uppercase tracking-wider hover:underline transition-all duration-300"
        >
          {isExpanded ? dict.nav.close : dict.nav.expand}
        </button>
      </div>
    </div>
  );
}
