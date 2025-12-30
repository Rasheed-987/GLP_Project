// components/ArticlesInsightsSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";


export type Article = {
  id?: string | number;
  slug?: string;
  href?: string;
  date?: string; // e.g. "09/16/2019"
  title: string;
  excerpt?: string;
  image: string;
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

export function ActionCircle({ href = "#", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} aria-label="Open article" className={className}>
      <div className="w-11 h-11 rounded-full bg-black text-white grid place-items-center hover:opacity-90 transition">
        <ArrowUpRightIcon />
      </div>
    </Link>
  );
}

function FeaturedCard({ a }: { a: Article }) {
  const href = a.href || (a.id ? `/article/${a.id}` : (a.slug ? `/article/${a.slug}` : "#"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-4 lg:gap-10 items-stretch">
      {/* LEFT IMAGE with BLUE BORDER */}
      <div className="rounded-[26px]  p-[6px]">
        <div className="relative overflow-hidden rounded-[22px] aspect-[16/10]">
          <Image src={a.image} alt={a.title} fill className="object-cover" />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="relative flex flex-col justify-start lg:pt-8 pb-8 text-left ">
        {a.date ? <p className="text-[11px] md:text-[12px] text-[#00000099] font-semibold">{a.date}</p> : null}

        <h3 className="mt-2 text-[18px] text-left md:text-[22px] lg:text-[26px] font-semibold text-slate-900 leading-snug">
          {a.title}
        </h3>

        <div className="mt-auto pt-6 flex items-end justify-between gap-6">
          <p className="text-[12.5px] text-[#00000099]  leading-[1.6] line-clamp-3 max-w-[520px]">
            {a.excerpt ?? ""}
          </p>

          <ActionCircle href={href} />
        </div>
      </div>
    </div>
  );
}

export function SmallCard({ a }: { a: Article }) {
  const href = a.href || (a.id ? `/article/${a.id}` : (a.slug ? `/article/${a.slug}` : "#"));

  return (
    <div className="w-full flex flex-col h-full group">
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-[22px] aspect-video shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
        <Image src={a.image} alt={a.title} fill className="object-cover" />
      </div>

      {/* TEXT */}
      <div className="pt-4 text-left flex flex-col flex-1">
        {a.date ? <p className="text-[11px] text-slate-500 font-semibold mb-1">{a.date}</p> : null}

        <h4 className="text-[14px] md:text-[15px] font-extrabold text-slate-900 leading-snug line-clamp-2 h-[2.8em]">
          {a.title}
        </h4>

        {/* excerpt + action circle aligned to the right (like screenshot) */}
        <div className="mt-auto pt-3 flex items-start justify-between gap-4">
          <p className="text-[12px] text-[#00000099] leading-[1.55] line-clamp-3 flex-1 font-medium h-[4.65em]">
            {a.excerpt ?? ""}
          </p>

          <ActionCircle href={href} className="shrink-0 translate-y-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default function ArticlesInsightsSection({
  items,
  seeMoreText = "See more",
  onSeeMore,
}: {
  items: Article[]; // first = featured
  seeMoreText?: string;
  onSeeMore?: () => void;
}) {
  const featured = items?.[0];
  const smallCards = (items ?? []).slice(1, 7); // 6 cards like screenshot

  return (
    <div className="w-full">
      {/* FEATURED */}
      {featured ? (
        <div className="mb-10">
          <FeaturedCard a={featured} />
        </div>
      ) : null}

      {/* GRID (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
        {smallCards.map((a, idx) => (
          <SmallCard key={String(a.id ?? a.slug ?? idx)} a={a} />
        ))}
      </div>

      {/* SEE MORE (solid teal like screenshot) */}
      <div className="mt-10 flex justify-center">
        <Button
          type="button"
          onClick={onSeeMore}
          className="px-7 py-2.5 text-[16px]"
        >
          {seeMoreText}
        </Button>
      </div>
    </div>
  );
}
