import type { Locale } from "@/lib/i18n/config";

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
    <div role="region" aria-label="announcement" className="w-full py-2">
      <div className="bg-brand-gradient text-white rounded-full h-10 md:h-12 px-4 sm:px-6 flex items-center justify-center gap-3 sm:gap-6">
        
        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
          {dict.topBar.announcement}
        </span>

        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
          14 days 07:00:51
        </span>

        <a
          href="#apply"
          className="inline-flex items-center rounded-full bg-white text-black hover:bg-white/90 transition-colors px-4 py-1.5 text-xs font-semibold whitespace-nowrap"
        >
          {dict.topBar.applyNow}
        </a>

        {/* Close button */}
        <button
          className="inline-flex items-center justify-center w-6 h-6 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
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
