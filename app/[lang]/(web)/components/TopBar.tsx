import type { Locale } from "@/lib/i18n/config";
import Marquee from "react-fast-marquee";

type TopBarProps = {
  locale: Locale;
  dict: {
    topBar: {
      announcement: string;
      applyNow: string;
    };
  };
};

export default function TopBar({ locale, dict }: TopBarProps) {
  return (
    <div role="region" aria-label="announcement" className="w-full pt-2 px-2 md:px-0">
      <div className="bg-brand-gradient text-white rounded-full h-10  px-2 sm:px-6 flex items-center justify-between gap-2 md:gap-3 overflow-hidden">
        {/* Left Spacer to help center text on desktop */}
        <div className="w-6 h-6 hidden md:block flex-shrink-0"></div>

        {/* Center Scrolling Group */}
        <div className="flex-1 overflow-hidden min-w-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex items-center gap-4 sm:gap-8 px-4">
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {dict.topBar.announcement}
              </span>
              <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                14 days 07:00:51
              </span>
              <a
                href="#apply"
                className="inline-flex items-center rounded-full bg-white text-black hover:bg-white/90 transition-colors px-4 py-1.5 text-[10px] md:text-xs font-semibold whitespace-nowrap"
              >
                {dict.topBar.applyNow}
              </a>
            </div>
          </Marquee>
        </div>

        {/* Close button pushed to right */}
        <button
          className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
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
