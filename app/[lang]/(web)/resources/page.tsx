"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Container from "../../../components/Container";

type TabKey = "articles" | "videos" | "reports";
type VideoCard = { title: string; image: string };

const tabs: { key: TabKey; label: string; helper?: string }[] = [
    { key: "articles", label: "Articles & Insights" },
    { key: "videos", label: "Video Library" },
    { key: "reports", label: "Reports & Research" },
];

const faqItems = [
    {
        q: "What is the UAE Government Leaders Programme (GLP)?",
        a: "GLP is a national initiative dedicated to developing Emirati leadership across various career stages. It offers structured, experience-driven programmes built around the UAE Government Leadership Model.",
    },
    { q: "Who are the programmes designed for?", a: "" },
    { q: "Is GLP only for government employees?", a: "" },
    { q: "What is the duration of each programme?", a: "" },
    { q: "Are these academic or certified programmes?", a: "" },
    { q: "Are these academic or certified programmes?", a: "" },
];

function Pill({
    active,
    children,
    onClick,
}: {
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "rounded-full px-7 py-3 text-[12px] font-semibold border transition",
                active
                    ? "bg-[#E6EFEA] text-slate-900 border-[#00000033]"
                    : "bg-white text-slate-700 border-[#00000033] hover:bg-slate-50",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function PlusIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function PlayIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M10 8.5v7l6-3.5-6-3.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

function ArrowCircleIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M13.5 7.5h3v3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5 13.5 16.5 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
                stroke="currentColor"
                strokeWidth="1.4"
                opacity="0.9"
            />
        </svg>
    );
}
function VideoTile({ card }: { card: VideoCard }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
      <div className="relative aspect-[16/9]">
        <Image src={card.image} alt={card.title} fill className="object-cover" priority={false} />

        {/* bottom black gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.81) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.0) 90%)",
          }}
        />

        {/* play button */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 grid place-items-center shadow">
            <PlayIcon />
          </div>
        </div>

        {/* title */}
        <div className="absolute left-4 bottom-4 right-14">
          <p className="text-white text-[13px] md:text-[20px] font-semibold leading-snug drop-shadow">
            {card.title}
          </p>
        </div>

        {/* small action circle */}
        <div className="absolute right-4 bottom-4">
          <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur border border-white/25 grid place-items-center text-white">
            <ArrowCircleIcon />
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ResourcesPage() {
    const [active, setActive] = useState<TabKey>("videos");

    const cards = useMemo<VideoCard[]>(() => {
        // Replace these with your real assets (local or remote)
        // Put files in /public/images/resources/...
        return [
            {
                title: "Strategic partnership between Egypt and UAE\nin government modernization",
                image: "/images/menu_image.png",
            },
            {
                title: "Session with Professor James Robinson",
                image: "/images/menu_image.png",
            },
            {
                title: "UAEGLP session with Mr. Masood Ahmed from\nIMF",
                image: "/images/menu_image.png",
            },
            {
                title: "Roadshow by UAEGLP Alumni",
                image: "/images/menu_image.png",
            },
        ];
    }, []);

    return (
        <>
            {/* HERO */}
            <section className="pt-10 md:pt-12 pb-10 md:pb-12 px-12">
                <Container className="px-4 mt-20">
                    <div className="flex flex-col items-center text-center">
                        <span className="inline-flex items-center rounded-full border border-[#045A8633] bg-[#E6EEF3] text-[#045A86] px-3 py-1 text-[13px] font-extrabold tracking-[0.14em]">
                            RESOURCES
                        </span>

                        <h1 className="mt-4 text-slate-900 leading-[1.05]">
                            <span className="block text-[40px] md:text-[56px] font-medium">
                                Stay <span className="font-extrabold">Informed</span>,
                            </span>
                            <span className="block text-[40px] md:text-[56px] font-medium">
                                Stay <span className="font-extrabold">Inspired</span>
                            </span>
                        </h1>

                        <p className="mt-4 max-w-[620px] text-[13px] md:text-[14px] leading-[1.55] text-slate-600 mb-12">
                            Explore curated insights, tools, and updates to support your <br /> continued growth as a leader in government and beyond            </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {tabs.map((t) => (
                                <Pill key={t.key} active={active === t.key} onClick={() => setActive(t.key)}>
                                    {t.label}
                                </Pill>
                            ))}
                        </div>

                        <p className="mt-4 text-[13.5px] md:text-[15px] text-slate-500">
                            Watch talks, programme highlights, expert interviews, and leadership stories.
                        </p>
                    </div>
                </Container>
            </section>

            {/* GRID */}
            <section className="pb-14 md:pb-20">
                <Container className="px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((c, idx) => (
                            <VideoTile key={idx} card={c} />
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            className="rounded-full bg-teal-700 text-white px-6 py-2.5 text-[12px] font-bold hover:bg-teal-800"
                        >
                            See more
                        </button>
                    </div>
                </Container>
            </section>

            {/* FAQ BLOCK (as in screenshot section) */}
            <section className="py-16 md:py-20 border-t border-black/5">
                <Container className="px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div>
                            <h2 className="text-[30px] font-extrabold text-slate-900">FAQ</h2>
                        </div>

                        <div className="min-w-0">
                            <div className="border-t border-black/10">
                                {faqItems.map((it, idx) => (
                                    <details key={idx} className="group border-b border-black/10 py-4" open={idx === 0}>
                                        <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-4">
                                            <span className="text-[13px] md:text-[14px] font-semibold text-slate-900">
                                                {it.q}
                                            </span>
                                            <span className="text-slate-900/70 group-open:rotate-45 transition-transform">
                                                <PlusIcon />
                                            </span>
                                        </summary>

                                        {it.a ? (
                                            <div className="mt-2 text-[12.5px] md:text-[13px] leading-[1.55] text-slate-600 max-w-[760px]">
                                                {it.a}
                                            </div>
                                        ) : null}
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA BANNER */}
            <section className="pb-16 md:pb-24">
                <Container className="px-4">
                    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-700 px-6 md:px-12 py-16 md:py-40">
                        {/* subtle pattern */}
                        <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
                            <svg viewBox="0 0 1200 420" className="w-full h-full" fill="none" aria-hidden="true">
                                <path d="M140 310 L330 120 L520 310 L330 500 Z" fill="white" opacity="0.18" />
                                <path d="M860 250 L1040 110 L1220 250 L1040 390 Z" fill="white" opacity="0.12" />
                                <path d="M-40 120 L120 -40 L280 120 L120 280 Z" fill="white" opacity="0.10" />
                            </svg>
                        </div>

                        <div className="relative flex flex-col items-center text-center">
                            <h3 className="text-white text-[22px] md:text-[28px] font-extrabold">
                                Have an insight to share?
                            </h3>
                            <p className="mt-2 text-white/85 text-[12.5px] md:text-[13px] max-w-[420px]">
                                Interested in contributing to our content or hosting a session?
                            </p>

                            <button
                                type="button"
                                className="mt-6 rounded-full bg-white text-slate-900 px-6 py-2.5 text-[12px] font-bold hover:bg-slate-50"
                            >
                                Contact us
                            </button>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
