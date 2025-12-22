// app/[lang]/faq/page.tsx
import React from "react";
import Image from "next/image";
import Container from "../../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import glpArrow from "../../../../public/images/glp_arrow.png";

type FaqItem = { q: string; a: string };
type FaqGroup = { label: string; items: FaqItem[] };

function PlusIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FaqRow({
  q,
  a,
  defaultOpen = false,
  isRTL,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
  isRTL: boolean;
}) {
  return (
    <details className="group border-b border-black/10 py-4" open={defaultOpen}>
      <summary
        className={[
          "list-none cursor-pointer select-none flex items-center justify-between gap-4",
          isRTL ? "" : "",
        ].join(" ")}
      >
        <span className="text-[13px] md:text-[14px] font-semibold text-slate-900">
          {q}
        </span>

        {/* plus on the edge */}
        <span className="text-slate-900/80 group-open:rotate-45 transition-transform">
          <PlusIcon />
        </span>
      </summary>

      <div
        className={[
          "mt-2 text-[12.5px] md:text-[13px] leading-[1.7] text-slate-600",
          isRTL ? "text-right" : "text-left",
        ].join(" ")}
      >
        {a}
      </div>
    </details>
  );
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const isRTL = String(lang).toLowerCase().startsWith("ar");

  // ✅ Use your Arabic resources FAQ
  const resourcesFaq = (dict as any)?.resources?.faq as
    | { title?: string; groups?: FaqGroup[] }
    | undefined;

  const pageTitle =
    resourcesFaq?.title || (dict as any)?.nav?.faq || "الأسئلة الشائعة";

  // subtitle not provided in dict → safe Arabic fallback
  const pageSub =
    "اعثر على إجابات سريعة حول برامجنا، ومعايير الأهلية، وآلية التقديم، والمزيد.";

  const groups: FaqGroup[] = Array.isArray(resourcesFaq?.groups)
    ? resourcesFaq!.groups
    : [];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-white text-slate-900">
      <main>
        <section className="py-16 md:py-20 px-4 lg:px-12">
          <Container className="px-4">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* LEFT */}
              <div className="relative">
                <h1
                  className={[
                    "text-[54px] md:text-[64px] font-medium tracking-tight text-slate-900",
                    isRTL ? "text-right" : "text-left",
                  ].join(" ")}
                >
                  {pageTitle}
                </h1>

                <p
                  className={[
                    "mt-4 text-[13px] md:text-[14px] leading-[1.7] text-slate-900",
                    isRTL ? "text-right" : "text-left",
                  ].join(" ")}
                >
                  {pageSub}
                </p>

                {/* decorative arrow image */}
                <div className={isRTL ? "flex justify-start" : "flex justify-start"}>
                  <Image
                    src={glpArrow}
                    className={[
                      "w-[100vw] md:w-[420px] lg:w-[620px] opacity-[0.7] scale-[1.2] lg:scale-[1]",
                      isRTL ? "-mr-8 lg:-mr-16 " : "-ml-8 lg:-ml-16 mt-12",
                    ].join(" ")}
                    alt=""
                    priority={false}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="">
                {groups.map((g: FaqGroup, gi: number) => (
                  <div key={gi} className={gi === 0 ? "" : "mt-14"}>
                    <div
                      className={[
                        "flex items-center justify-between",
                        isRTL ? "flex-row-reverse" : "",
                      ].join(" ")}
                    >
                      <p className="text-[12px] font-extrabold tracking-[0.16em] text-teal-800">
                        {g.label}
                      </p>
                      <div className="w-3 h-[2px] bg-slate-900/80 rounded" />
                    </div>

                    <div className="mt-4 border-t border-black/10">
                      {g.items.map((it: FaqItem, idx: number) => (
                        <FaqRow
                          key={idx}
                          q={it.q}
                          a={it.a}
                          defaultOpen={gi === 0 && idx === 0}
                          isRTL={isRTL}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
