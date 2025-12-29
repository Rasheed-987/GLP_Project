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
            <div key={index} className="flex-[0_0_85%] lg:flex-[0_0_92%] min-w-0 flex flex-col lg:flex-row gap-6 pl-4 lg:pl-10">
              {/* Left Image Side */}
              <div className="lg:w-4/12 2xl:w-3/12 relative aspect-square lg:aspect-auto lg:h-[500px] rounded-[20px] overflow-hidden">
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
              <div className="lg:w-8/12 bg-[#E6EFEA] rounded-[20px] p-8 md:p-12 lg:p-10 flex flex-col justify-between relative flex-1 lg:h-[500px] overflow-hidden">
                <div>
                  <div className="mb-4">
                    <Image
                      src={lang === "ar" ? "/images/casearabicqoute.png" : "/images/caseenglishqoute.png"}
                      alt="quote"
                      width={8}
                      height={8}
                      className="w-3 h-auto"
                    />
                  </div>
                  <div className="relative group/quote mb-4">
                    <p className="text-xl md:text-2xl leading-tight gradient-text font-medium line-clamp-4 cursor-default">
                      {item.quote}
                    </p>
                    {/* Hover Popup */}
                    <div className="absolute top-0 left-0 w-full opacity-0 pointer-events-none group-hover/quote:opacity-100 group-hover/quote:pointer-events-auto transition-opacity duration-300 z-50 bg-[#E6EFEA] rounded-xl p-2 -m-2 shadow-xl ring-1 ring-black/5">
                      <p className="text-xl md:text-2xl leading-tight gradient-text font-medium">
                        {item.quote}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="mb-3">
                        <Image
                          src="/images/bar.png"
                          alt="bar"
                          width={80}
                          height={4}
                          className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                        />
                      </div>
                      <h4 className="text-xs font-bold text-brand-blue uppercase tracking-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-[#00000099] font-bold uppercase mt-1">
                        {item.role}
                      </p>
                    </div>
                    <div className="relative w-40 h-20">
                      <Image
                        src={item.logo}
                        alt="Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#0000001A]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                    {item.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="flex items-center lg:block ">
                        <div className="text-4xl md:text-5xl font-bold text-center gradient-text mb-0 lg:mb-2 w-28 lg:w-auto shrink-0">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#00000099] text-right md:text-center text-nowrap uppercase font-medium leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
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
        className="absolute left-0 lg:left-8 rtl:left-auto rtl:right-0 rtl:lg:right-8 top-[20.6rem] md:top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-green transition-all transform hover:scale-110 active:scale-95 border border-gray-100"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 lg:right-8 rtl:right-auto rtl:left-0 rtl:lg:left-8 top-[20.6rem] md:top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-green transition-all transform hover:scale-110 active:scale-95 border border-gray-100"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
