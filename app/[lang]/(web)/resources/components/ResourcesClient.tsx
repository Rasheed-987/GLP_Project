// app/[lang]/(web)/resources/components/ResourcesClient.tsx
"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });
import VideoTile from "./VideoTile";
import ArticlesInsightsSection from "./ArticlesInsightsSection";
import AlumniImpactShowcase, {
  FeaturedShowcase,
  ShowcaseCard,
} from "./AlumniImpactShowcase";

type TabKey = "articles" | "videos" | "reports";

type VideoCard = {
  title: string;
  image: string;
  href?: string;
};

export type Article = {
  id?: string | number;
  slug?: string;
  date?: string;
  title: string;
  excerpt?: string;
  image: string;
  href?: string;
};

type ReportsData = {
  featured: FeaturedShowcase;
  cards: ShowcaseCard[];
};

interface ResourcesClientProps {
  tabs: { key: TabKey; label: string }[];
  subtitle: Record<string, string>;
  videoCards: VideoCard[];
  articles: Article[];
  seeMoreText: string;
  lang: "en" | "ar";
  reportsData?: ReportsData; // ✅ comes from dict.resources.reportsData
}

export default function ResourcesClient({
  tabs,
  subtitle,
  videoCards,
  articles,
  seeMoreText,
  lang,
  reportsData,
}: ResourcesClientProps) {
  const [active, setActive] = useState<TabKey>("videos");

  const activeSubtitle = subtitle?.[active] ?? "";

  // keep only 7 like screenshot (1 featured + 6 small cards)
  const articlesForSection = useMemo(
    () => articles?.slice(0, 7) ?? [],
    [articles]
  );

  const featured = reportsData?.featured;
  const reportCards = reportsData?.cards ?? [];

  const isArabic = lang === "ar";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Tabs */}
      <div className="mt-8 w-full">
        {/* Desktop View: Static and Centered */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setActive(tb.key)}
              className={[
                "rounded-full px-7 py-3 text-[12px] font-semibold border transition-all",
                tb.key === active
                  ? "bg-[#E6EFEA] text-slate-900 border-[#00000033]"
                  : "bg-white text-slate-700 border-[#00000033] hover:bg-slate-50",
              ].join(" ")}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Mobile View: Continuous Moving (Marquee) */}
        <div className="md:hidden">
          <Marquee
            speed={40}
            gradient={true}
            gradientColor="white"
            gradientWidth={40}
            play={true}
          >
            <div className="flex items-center gap-3 px-4 py-1">
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  type="button"
                  onClick={() => setActive(tb.key)}
                  className={[
                    "rounded-full px-7 py-3 text-[12px] font-semibold border transition-all shrink-0",
                    tb.key === active
                      ? "bg-[#E6EFEA] text-slate-900 border-[#00000033]"
                      : "bg-white text-slate-700 border-[#00000033] hover:bg-slate-50",
                  ].join(" ")}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] md:text-[15px] text-slate-500 text-center max-w-2xl px-4">
        {activeSubtitle}
      </p>

      {/* Content */}
      <div className="w-full mt-10 md:mt-14">
        {/* VIDEOS */}
        {active === "videos" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {videoCards.map((c, idx) => (
                <VideoTile key={idx} card={c} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className="rounded-full text-white px-6 py-2.5 text-[14px] font-bold shadow-sm transition hover:brightness-95"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #045A86 0%, #019977 100%)",
                }}
              >
                {seeMoreText}
              </button>
            </div>
          </>
        )}

        {/* ARTICLES */}
        {active === "articles" && (
          <ArticlesInsightsSection
            items={articlesForSection}
            seeMoreText={seeMoreText}
          />
        )}

        {/* REPORTS */}
        {active === "reports" && featured ? (
          <div dir={isArabic ? "rtl" : "ltr"}>
            <AlumniImpactShowcase
              featured={featured}
              items={
                reportCards.length >= 6
                  ? reportCards
                  : [...reportCards, ...reportCards].slice(0, 6)
              }
              seeMoreText={seeMoreText}
            />
          </div>
        ) : null}

        {/* REPORTS fallback if missing in dict */}
        {active === "reports" && !featured ? (
          <div className="py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">
              {isArabic ? "قريباً" : "Coming Soon"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {isArabic
                ? "نعمل على إعداد أحدث التقارير والأبحاث."
                : "We are compiling the latest research for you."}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
