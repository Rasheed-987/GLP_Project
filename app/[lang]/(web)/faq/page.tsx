// app/[lang]/faq/page.tsx
import React from "react";
import Image from "next/image";
import Container from "../../../components/Container";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import glpArrow from "../../../../public/images/glp_arrow.png";

type FaqItem = { q: string; a: string };
type FaqGroup = { label: string; items: FaqItem[] };

function PlusIcon() {
  return (
    <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
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
    <details className="group border-b border-gray-100 py-6" open={defaultOpen}>
      <summary
        className="list-none cursor-pointer select-none flex items-center justify-between gap-4"
      >
        <span className="text-[14px] md:text-[15px] font-bold text-black leading-tight">
          {q}
        </span>

        <span className="text-black shrink-0">
          <PlusIcon />
        </span>
      </summary>

      <div
        className={[
          "mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#00000099]",
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

  const resourcesFaq = (dict as any)?.resources?.faq as
    | { title?: string; groups?: FaqGroup[] }
    | undefined;

  const pageTitle = resourcesFaq?.title || (dict as any)?.nav?.faq || "FAQ";

  const pageSub = isRTL 
    ? "اعثر على إجابات سريعة حول برامجنا، ومعايير الأهلية، وآلية التقديم، والمزيد."
    : "Find quick answers about our programmes, eligibility, application process, and more";

  const groups: FaqGroup[] = Array.isArray(resourcesFaq?.groups)
    ? resourcesFaq!.groups
    : [];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-white text-slate-900 min-h-screen">
      <main className="pt-16 md:pt-24 pb-20">
        <Container className="px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* LEFT - Sticky Content */}
            <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
              <h1 className="text-[48px] md:text-[64px] font-medium tracking-tight text-black mb-6">
                {pageTitle}
              </h1>

              <p className="text-[14px] md:text-[15px] leading-relaxed text-[#00000099] max-w-sm mb-12">
                {pageSub}
              </p>

              {/* Decorative Pattern */}
              <div className={`relative hidden lg:block`}>
                 <Image
                    src={glpArrow}
                    className={[
                      "w-screen md:w-[420px] lg:w-[620px] opacity-[0.7] scale-[1.2] lg:scale-[1]",
                      isRTL ? "-mr-8 lg:-mr-16 -scale-x-100" : "-ml-8 lg:-ml-16 mt-12",
                    ].join(" ")}
                    alt=""
                  />
              </div>
            </div>

            {/* RIGHT - FAQ Groups */}
            <div className="lg:col-span-7">
              {groups.map((g: FaqGroup, gi: number) => (
                <div key={gi} className={gi === 0 ? "" : "mt-20"}>
                  <p className="text-[12px] font-bold tracking-widest text-[#006A8E] uppercase mb-6">
                    {g.label}
                  </p>

                  <div className="border-t border-gray-100">
                    {g.items.map((it: FaqItem, idx: number) => (
                      <FaqRow
                        key={idx}
                        q={it.q}
                        a={it.a}
                        isRTL={isRTL}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
