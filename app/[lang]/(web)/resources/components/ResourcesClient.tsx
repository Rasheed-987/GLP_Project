"use client";

import React, { useMemo, useState } from "react";
import VideoTile from "./VideoTile";
import ArticlesInsightsSection from "./ArticlesInsightsSection";

type TabKey = "articles" | "videos" | "reports";
type VideoCard = { title: string; image: string; href?: string };

export type Article = {
  id?: string | number;
  slug?: string;
  date?: string;
  title: string;
  excerpt?: string;
  image: string;
  href?: string;
};

interface ResourcesClientProps {
  tabs: { key: TabKey; label: string }[];
  subtitle: Record<string, string>;
  videoCards: VideoCard[];
  articles: Article[];
  reports: any[];
  seeMoreText: string;
  lang: string;
}

export default function ResourcesClient({
  tabs,
  subtitle,
  videoCards,
  articles,
  reports,
  seeMoreText,
}: ResourcesClientProps) {
  const [active, setActive] = useState<TabKey>("videos");

  const activeSubtitle = subtitle?.[active] ?? "";

  const showVideos = active === "videos";
  const showArticles = active === "articles";
  const showReports = active === "reports";

  // optional: keep only 7 like screenshot (1 featured + 6)
  const articlesForSection = useMemo(() => articles?.slice(0, 7) ?? [], [articles]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

      <p className="mt-4 text-[13.5px] md:text-[15px] text-slate-500 text-center max-w-2xl px-4">
        {activeSubtitle}
      </p>

      {/* Content */}
      <div className="w-full mt-10 md:mt-14">
        {/* VIDEOS */}
        {showVideos && (
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
                  backgroundImage: "linear-gradient(90deg, #045A86 0%, #019977 100%)",
                }}
              >
                {seeMoreText}
              </button>
            </div>
          </>
        )}

        {/* ARTICLES */}
        {showArticles && (
          <ArticlesInsightsSection items={articlesForSection} seeMoreText={seeMoreText} />
        )}

        {/* REPORTS */}
        {showReports && (
          <div className="grid grid-cols-1 gap-6 w-full">
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">Coming Soon</p>
              <p className="text-sm text-slate-400 mt-1">
                We are compiling the latest research for you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
