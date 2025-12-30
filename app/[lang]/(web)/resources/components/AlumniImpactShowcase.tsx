// components/AlumniImpactShowcase.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";
import cod from "../../../../../public/images/cod.png";


type Stat = { value: string; label: string };

export type ShowcaseCard = {
  id: string | number;
  date?: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  stats: Stat[];
};

export type FeaturedShowcase = {
  badge?: string;
  image: string;
  href?: string;
  quote: string;
  name: string;
  role: string;
  logoImage?: string;
  stats: Stat[];
};

function ArrowUpRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10 7h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ✅ Single circle component (no nesting) */
function ActionCircle({
  href = "#",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Open"
      className={[
        "grid place-items-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:opacity-95 transition",
        className,
      ].join(" ")}
    >
      <ArrowUpRightIcon />
    </Link>
  );
}

function DatePill({ date, isRTL }: { date?: string; isRTL?: boolean }) {
  if (!date) return null;
  return (
    <div className={["absolute top-6 z-10", isRTL ? "right-7" : "left-7"].join(" ")}>
      <span className="inline-flex items-center rounded-full bg-[#E6EEF3] text-[#045A86] border border-[#045A8633] px-5 py-2 text-[16px] font-extrabold tracking-[0.06em]">
        {date}
      </span>
    </div>
  );
}

function BigFeatured({
  data,
  lang,
}: {
  data: FeaturedShowcase;
  lang: "en" | "ar";
}) {
  const isRTL = lang === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={[
        "grid grid-cols-1 lg:grid-cols-[0.6fr_1.15fr] gap-6 lg:gap-6 lg:h-[70vh]",
        isRTL ? "lg:[grid-template-columns:1.15fr_0.6fr]" : "",
      ].join(" ")}
    >
      {/* Left Image */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#F3F5F6] h-full">
        {data.badge ? (
          <div className={["absolute top-6 z-10", isRTL ? "right-6" : "left-6"].join(" ")}>
            <span className="inline-flex items-center rounded-full bg-[#E6EEF3] text-[#045A86] border border-[#045A8633] px-3 py-1 text-[11px] font-extrabold tracking-[0.06em]">
              {data.badge}
            </span>
          </div>
        ) : null}

        <div className="relative h-full">
          <Image src={data.image} alt="" fill className="object-cover" priority={false} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.06) 100%)",
            }}
          />
        </div>

        <ActionCircle
          href={data.href}
          className={[
            "absolute bottom-7 w-[56px] h-[56px] bg-white/90 text-slate-900 shadow-sm",
            isRTL ? "left-7" : "right-7",
          ].join(" ")}
        />
      </div>

      {/* Right Quote Card */}
      <div className="overflow-hidden rounded-[28px] bg-[#EAF1EC] h-full">
        <div className="h-full px-10 pt-10 pb-8 flex flex-col">
          {/* Quote (TOP in your screenshot) */}
          <div className={["flex flex-col gap-3", isRTL ? "text-right" : "text-left"].join(" ")}>
            <div className="text-[#0C5A77] text-[16px] md:text-[20px] lg:text-[24px] leading-none font-extrabold">
              {isRTL ? "”" : "“"}
            </div>
            <p className="text-[#0C5A77] text-[16px] md:text-[18px] lg:text-[20px] leading-[1.45] font-medium">
              {data.quote}
            </p>
          </div>

          {/* Spacer pushes bottom block down */}
          <div className="flex-1" />

          {/* Bottom block */}
          <div>
            {/* name + role + logo row */}
            <div className="mt-10 flex items-center justify-between gap-8">
              <div className={["min-w-0", isRTL ? "text-right" : "text-left"].join(" ")}>
                <div className={["flex items-center", isRTL ? "justify-end" : ""].join(" ")}>
                  <span className="h-[4px] w-[58px] rounded-full bg-[#0C5A77]" />
                  <span className="h-[4px] w-[58px] rounded-full bg-[#0C5A771F]" />
                </div>

                <p className="mt-6 text-[10px] md:text-[11px] lg:text-[12px] font-extrabold tracking-[0.14em] text-[#0C5A77] uppercase">
                  {data.name}
                </p>
                <p className="mt-1 text-[10px] md:text-[11px] lg:text-[12px] font-extrabold tracking-[0.12em] text-[#00000099] uppercase">
                  {data.role}
                </p>
              </div>

              {data.logoImage ? (
                <div className="relative w-[250px] h-[70px] opacity-95">
                  <Image src={cod} alt="" fill className="object-contain object-right" />
                </div>
              ) : (
                <div className="w-[150px] h-[44px]" />
              )}
            </div>

            {/* divider */}
            <div className="mt-4 h-px w-full bg-black/10" />

            {/* stats */}
            <div className="mt-10 grid grid-cols-3 gap-5 lg:gap-10 text-center">
              {data.stats.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div
                    className="text-[30px] md:text-[40px] lg:text-[56px] leading-none font-medium"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #045A86 0%, #019977 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {s.value}
                  </div>

                  <div className="mt-4 text-[12px] md:text-[22px] lg:text-[22px] text-[#00000099]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* end bottom block */}
        </div>
      </div>
    </div>
  );
}

function SmallShowcaseCard({
  item,
  lang,
}: {
  item: ShowcaseCard;
  lang: "en" | "ar";
}) {
  const isRTL = lang === "ar";
  const href = item.href || "#";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="overflow-hidden rounded-[28px] bg-white border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      {/* Image */}
      <div className="relative">
        <DatePill date={item.date} isRTL={isRTL} />

        <div className="relative aspect-[16/10]">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 45%)",
            }}
          />
        </div>

        {/* action circle (RIGHT on EN, LEFT on AR) */}
        <ActionCircle
          href={href}
          className={[
            "absolute bottom-6 w-[64px] h-[64px] bg-white",
            isRTL ? "left-6" : "right-6",
          ].join(" ")}
        />
      </div>

      {/* Content */}
      <div className={["px-7 pt-7 pb-7", isRTL ? "text-right" : "text-left"].join(" ")}>
        <h3
          className="text-lg lg:text-[20px] font-extrabold"
          style={{
            backgroundImage: "linear-gradient(90deg, #045A86 0%, #019977 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {item.title}
        </h3>

        <p className="mt-3 text-[15px] text-[#00000099] leading-[1.35] max-w-[95%]">
          {item.description}
        </p>

        {/* divider */}
        <div className="mt-7 h-px w-full bg-black/10" />

        {/* stats */}
        <div
          className={[
            "mt-8 grid text-center",
            item.stats.length >= 3 ? "grid-cols-3 gap-10" : "grid-cols-2 gap-10",
          ].join(" ")}
        >
          {item.stats.slice(0, 3).map((s, i) => (
            <div key={i}>
              <div
                className="text-[30px] font-semibold leading-none"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #045A86 0%, #019977 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.value}
              </div>
              <div className="mt-4 capitalize text-[13px] text-[#00000099] leading-[1.2] whitespace-pre-line">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AlumniImpactShowcase({
  featured,
  items,
  seeMoreText = "See more",
  onSeeMore,
  lang = "en",
}: {
  featured: FeaturedShowcase;
  items: ShowcaseCard[];
  seeMoreText?: string;
  onSeeMore?: () => void;
  /** ✅ pass from page: lang === 'ar' ? 'ar' : 'en' */
  lang?: "en" | "ar";
}) {
  const cards = items.slice(0, 6);
  const isRTL = lang === "ar";

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="w-full">
      <div className="w-full">
        <BigFeatured data={featured} lang={lang} />

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((it) => (
            <SmallShowcaseCard key={String(it.id)} item={it} lang={lang} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            onClick={onSeeMore}
            className="px-6 py-2.5 text-[16px]"
          >
            {seeMoreText}
          </Button>
        </div>
      </div>
    </section>
  );
}
