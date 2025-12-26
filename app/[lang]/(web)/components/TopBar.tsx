"use client";

import { useState, useEffect } from "react";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";


type TopBarProps = {
  locale: Locale;
  dict: {
    topBar: {
      announcement: string;
      applyNow: string;
    };
  };
};

interface NewsData {
  id: string;
  topic: string;
  content: string;
  expiryDate: string;
  applyNowUrl: string;
  createdAt: string;
}

export default function TopBar({ locale, dict }: TopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [news, setNews] = useState<NewsData | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/latest?lang=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [locale]);

  useEffect(() => {
    if (!news?.expiryDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(news.expiryDate) - +new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${days} days ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return "";
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [news]);

  useEffect(() => {
    const root = document.documentElement;
    if (isVisible && news) {
      root.style.setProperty("--topbar-height", "52px");
    } else {
      root.style.setProperty("--topbar-height", "0px");
    }
  }, [isVisible, news]);

  if (!isVisible || !news) return null;

  return (
    <div role="region" aria-label="announcement" className="w-full pt-2 px-2 md:px-0">
      <div className="bg-brand-gradient text-white rounded-full h-10  px-2 sm:px-6 flex items-center justify-between gap-2 md:gap-3 overflow-hidden">
        {/* Left Spacer to help center text on desktop */}
        <div className="w-6 h-6 hidden md:block flex-shrink-0"></div>

        {/* Center Scrolling Group */}
        <div className="flex-1 flex justify-center overflow-hidden min-w-0">
            <div className="flex items-center gap-4 sm:gap-8 px-4">
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {news.content}
              </span>
              {timeLeft && (
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                  {timeLeft}
                </span>
              )}
              {news.applyNowUrl && (
                <a
                  href={news.applyNowUrl}
                  className="inline-flex items-center rounded-full bg-white text-black hover:bg-white/90 transition-colors px-4 py-1.5 text-[10px] md:text-xs font-semibold whitespace-nowrap"
                >
                  {dict.topBar.applyNow}
                </a>
              )}
            </div>
        </div>

        {/* Close button pushed to right */}
        <button
          onClick={() => setIsVisible(false)}
          className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 hover:bg-white/10 rounded-full transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Close announcement"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
