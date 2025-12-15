export default function TopBar() {
  return (
    <div
      role="region"
      aria-label="announcement"
      className="bg-brand-gradient text-white w-full h-8 md:h-10 flex items-center justify-center px-3 text-xs md:text-sm"
    >
      <div className="max-w-7xl w-full flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <span className="opacity-90">Nafis Leadership Program Admissions Now Open</span>
        </div>
        <div className="ml-auto flex items-center gap-2 whitespace-nowrap">
          <span className="opacity-90 hidden sm:inline">14 days 07:00:51</span>
          <a
            href="#apply"
            className="inline-flex items-center rounded-full bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 text-xs font-medium"
          >
            Apply now
          </a>
        </div>
      </div>
    </div>
  );
}
