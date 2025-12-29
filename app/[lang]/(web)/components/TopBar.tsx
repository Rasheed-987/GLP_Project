"use client";

import { useState, useEffect } from "react";
import type { Locale } from "../../../../lib/i18n/config";

type TopBarProps = {
  locale: Locale;
  dict: {
    topBar: {
      announcement: string; // optional future use
      applyNow: string;
    };
  };
};

interface NewsData {
  id: string;
  topic: string;
  content: string;
  expiryDate?: string;
  applyNowUrl?: string;
  createdAt: string;
}

export default function TopBar({ locale, dict }: TopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [news, setNews] = useState<NewsData | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  const hasNews = Boolean(news?.content);

  /* ---------------- Fetch News ---------------- */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/latest?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, [locale]);

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    if (!news?.expiryDate) return;

    const calculateTimeLeft = () => {
      const diff = +new Date(news.expiryDate!) - +new Date();
      if (diff <= 0) return "";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${days} days ${hours
        .toString()
        .padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [news]);

  /* ---------------- Topbar Height Variable ---------------- */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--topbar-height",
      isVisible ? "52px" : "0px"
    );
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="announcement"
      className="w-full pt-2 px-2 md:px-0"
    >
      <div className="bg-brand-gradient text-white rounded-full h-10 px-2 sm:px-6 flex items-center justify-between gap-2 md:gap-3 overflow-hidden">
        {/* Left spacer (keeps center perfect on desktop) */}
        <div className="w-6 h-6 hidden md:block shrink-0" />

        {/* Center Content */}
        <div className="flex-1 flex justify-center min-w-0">
          {!hasNews ? (
            /* Placeholder */
            <span className="text-xs md:text-sm font-medium opacity-90">
              News coming soon
            </span>
          ) : (
            /* Real API Content */
            <div className="flex items-center gap-4 sm:gap-8 px-4">
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {news?.content}
              </span>

              {timeLeft && (
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                  {timeLeft}
                </span>
              )}

              {news?.applyNowUrl && (
                <a
                  href={news.applyNowUrl}
                  className="inline-flex items-center justify-center h-6 md:h-7 rounded-full bg-white text-black hover:bg-white/90 transition-colors px-4 text-[10px] md:text-xs font-semibold leading-none whitespace-nowrap"
                >
                  {dict.topBar.applyNow}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 hover:bg-white/10 rounded-full transition-colors shrink-0 cursor-pointer"
          aria-label="Close announcement"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 11M1 11L11 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
