"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface Stat {
  value: string;
  label: string;
}

interface CarouselItem {
  tag: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  logo: string;
  stats: Stat[];
}

interface CarouselProps {
  items: CarouselItem[];
  lang: string;
}

export default function Carousel({ items, lang }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: lang === "ar" ? "rtl" : "ltr",
    align: "center",
    containScroll: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group overflow-hidden ">
      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex -ml-4 lg:-ml-10">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] lg:flex-[0_0_92%] min-w-0 flex flex-col lg:flex-row gap-6 pl-4 lg:pl-10">
              {/* Left Image Side */}
              <div className="lg:w-4/12 relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[32px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.author}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-xs font-bold text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Right Content Side */}
              <div className="lg:w-8/12 bg-[#E6EFEA] rounded-[32px] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative lg:h-[600px] overflow-hidden">
                <div>
                  <div className="text-brand-green text-5xl font-serif mb-4 leading-none">“</div>
                  <p className="text-xl md:text-2xl leading-tight text-brand-blue font-medium mb-8">
                    {item.quote}
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="h-1 w-12 bg-brand-blue mb-4" />
                      <h4 className="text-lg font-bold text-brand-blue uppercase tracking-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-[#00000099] font-medium uppercase tracking-widest mt-1">
                        {item.role}
                      </p>
                    </div>
                    <div className="relative w-28 h-14">
                      <Image
                        src={item.logo}
                        alt="Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#0000001A]">
                  <div className="grid grid-cols-3 gap-8">
                    {item.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="text-center lg:text-left">
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#00000099] uppercase font-medium leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 lg:left-8 top-[20.6rem] md:top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-green transition-all transform hover:scale-110 active:scale-95 border border-gray-100"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 lg:right-8   top-[20.6rem] md:top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-green transition-all transform hover:scale-110 active:scale-95 border border-gray-100"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
