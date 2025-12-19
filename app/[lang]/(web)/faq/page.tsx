// app/[lang]/faq/page.tsx
import React from "react";
import Image from "next/image";
import Container from "../../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import glpArrow from "../../../../public/images/glp_arrow.png"
type FaqItem = { q: string; a: string };
type FaqGroup = { label: string; items: FaqItem[] };

const defaultFAQ: {
  pageTitle: string;
  pageSub: string;
  topBar: { text: string; countdown: string; cta: string };
  groups: FaqGroup[];
  footer: {
    blurb: string;
    cols: { title: string; links: string[] }[];
    bottomLeft: string;
    bottomRight: { privacy: string; terms: string };
  };
} = {
  pageTitle: "FAQ",
  pageSub: "Find quick answers about our programmes, eligibility,\napplication process, and more",
  topBar: {
    text: "Nafis Leadership Program Admissions Now Open",
    countdown: "14 days 07:00:51",
    cta: "Apply now",
  },
  groups: [
    {
      label: "GENERAL",
      items: [
        {
          q: "What is the UAE Government Leaders Programme (GLP)?",
          a: "GLP is a national initiative dedicated to developing Emirati leadership across various career stages. It offers structured, experience-driven programmes built around the UAE Government Leadership Model.",
        },
        { q: "Who are the programmes designed for?", a: "Content goes here." },
        { q: "Is GLP only for government employees?", a: "Content goes here." },
        { q: "What is the duration of each programme?", a: "Content goes here." },
        { q: "Are these academic or certified programmes?", a: "Content goes here." },
        { q: "Are these academic or certified programmes?", a: "Content goes here." },
      ],
    },
    {
      label: "APPLICATION & SELECTION",
      items: [
        { q: "How do I apply to a programme?", a: "Content goes here." },
        { q: "Can I apply to more than one programme?", a: "Content goes here." },
        { q: "What does the selection process involve?", a: "Content goes here." },
        { q: "Is there a cost to participate?", a: "Content goes here." },
        { q: "How can I access the Qiyadat platform?", a: "Content goes here." },
        { q: "What opportunities are available after graduation?", a: "Content goes here." },
      ],
    },
    {
      label: "FOR ENTITIES / PARTNERS",
      items: [
        { q: "Can our entity collaborate with GLP to develop a custom programme?", a: "Content goes here." },
        { q: "Do you work with private companies or only government bodies?", a: "Content goes here." },
      ],
    },
  ],
  footer: {
    blurb: "UAE Government Leaders\nProgram - Empowering\nthe next generation of\nEmirati leaders.",
    cols: [
      { title: "Programmes", links: ["Our approach", "Partnership"] },
      { title: "Alumni", links: ["Resources", "About"] },
    ],
    bottomLeft: "© 2025 UAE Government Leaders Program. All rights reserved.",
    bottomRight: { privacy: "Privacy Policy", terms: "Terms of Service" },
  },
};

function GlobeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 2c3 2.9 4.5 6.2 4.5 10S15 19.1 12 22c-3-2.9-4.5-6.2-4.5-10S9 4.9 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronBg() {
  // subtle striped chevron background like screenshot
  return (
    <svg
      className="absolute left-0 top-[130px] w-[540px] h-[320px] opacity-[0.18] pointer-events-none"
      viewBox="0 0 540 320"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="stripes" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0V6" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>

      {/* big chevron */}
      <path
        d="M25 170 L210 70 L395 170 L210 270 Z"
        fill="url(#stripes)"
        stroke="#0F172A"
        strokeOpacity="0.12"
        strokeWidth="2"
      />

      {/* faint second outline like the reference */}
      <path
        d="M12 170 L210 55 L410 170 L210 285 Z"
        fill="none"
        stroke="#0F172A"
        strokeOpacity="0.08"
        strokeWidth="2"
      />
    </svg>
  );
}

function PillButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={
        "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

function LogoMark() {
  // simple inline mark (replace with your real logo)
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid grid-cols-2 gap-1 rotate-45">
          <div className="w-3.5 h-3.5 bg-emerald-600" />
          <div className="w-3.5 h-3.5 bg-slate-900" />
          <div className="w-3.5 h-3.5 bg-rose-600" />
          <div className="w-3.5 h-3.5 bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function FaqRow({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-black/10 py-4" open={defaultOpen}>
      <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-4">
        <span className="text-[13px] md:text-[14px] font-semibold text-slate-900">{q}</span>
        <span className="text-slate-900/80 group-open:rotate-45 transition-transform">
          <PlusIcon />
        </span>
      </summary>

      <div className="mt-2 text-[12.5px] md:text-[13px] leading-[1.5] text-slate-600 ">
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

  const faq = (dict as any)?.faq ?? defaultFAQ;

  return (
    <div className="bg-white text-slate-900">
      <main>
        <section className="py-16 md:py-20 px-4 lg:px-12">
          <Container className="px-4">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Left */}
              <div className="relative ">
                <h1 className="text-[54px] md:text-[64px] font-medium tracking-tight text-slate-900">
                  {faq.pageTitle}
                </h1>
                <p className="mt-4 text-[13px] md:text-[14px] leading-[1.55] text-slate-900 whitespace-pre-line">
                  {faq.pageSub}
                </p>
                <Image src={glpArrow} className="w-[300px] md:w-[420px] lg:w-[620px] opacity-[0.7] -ml-12" alt="" />
              </div>

              {/* Right */}
              <div className="">
                {faq.groups.map((g: FaqGroup, gi: number) => (
                  <div key={gi} className={gi === 0 ? "" : "mt-14"}>
                    <div className="flex items-center justify-between">
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
