import Image from "next/image";
import Link from "next/link";
import TagPill from "./TagPill";

type Stat = {
  value: string;
  label: string;
};

type Item = {
  id: string;
  slug?: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  mobileImage?: string;
  stats?: Stat[];
};

export default function CaseStudiesGrid({
  title,
  items,
  hrefBase,
}: {
  title: string;
  items: Item[];
  hrefBase: string;
}) {
  const visible = (items || []).slice(0, 3);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => {
            const href = `${hrefBase}${item.slug ? `/${item.slug}` : ""}`;
            return (
              <article
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
              >
                {/* Mobile View - Image with overlays */}
                <div className="relative w-full h-64 overflow-hidden md:hidden">
                  <Image
                    src={item.mobileImage || item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <TagPill label={item.date} className="bg-white text-gray-700 border-transparent" />
                  </div>

                  {/* Arrow Button */}
                  <div className="absolute bottom-4 right-4">
                    <Link
                      href={href}
                      aria-label={`Open ${item.title}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-transform hover:scale-110"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12L12 4M12 4H6M12 4V10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Desktop View - Image without overlays */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden hidden md:block">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  {/* Desktop date - shows only on md and above */}
                  <p className="hidden md:block text-[12px] text-gray-500 font-medium mb-2">
                    {item.date}
                  </p>

                  <Link href={href} className="block">
                    <h3 className="text-lg md:text-xl font-bold text-black md:text-black hover:text-teal-600 transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {/* Desktop arrow button - shows only on md and above */}
                  <div className="hidden md:flex justify-end mt-4">
                    <Link
                      href={href}
                      aria-label={`Open ${item.title}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-90"
                    >
                      <span aria-hidden>↗</span>
                    </Link>
                  </div>

                  {/* Stats Section - shows only on mobile */}
                  {item.stats && item.stats.length > 0 && (
                    <div className="md:hidden space-y-3 border-t border-gray-100 pt-4">
                      {item.stats.map((stat, idx) => (
                        <div key={idx} className="flex items-baseline gap-3">
                          <span className="text-2xl font-bold text-teal-700">
                            {stat.value}
                          </span>
                          <span className="text-sm text-gray-600">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
