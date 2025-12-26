
import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../../../public/images/arrow111.png";

type VideoCard = { title: string; image: string; href?: string };

function PlayIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
        </svg>
    );
}

export default function VideoTile({ card }: { card: VideoCard }) {
    const Wrap: any = card.href ? Link : "div";
    const wrapProps = card.href ? { href: card.href } : {};

    return (
        <Wrap
            {...wrapProps}
            className="relative block overflow-hidden rounded-[30px] bg-slate-100 shadow-sm transition-transform hover:scale-[1.01]"
        >
            <div className="relative aspect-video">
                <Image src={card.image} alt={card.title} fill className="object-cover" />

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
                    <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 grid place-items-center">
                        <PlayIcon />
                    </div>
                </div>

                {/* title */}
                <div className="absolute left-8 bottom-8 right-14">
                    <p className="text-white text-left text-[13px] md:text-[18px] lg:text-[20px] mr-12 font-bold leading-snug drop-shadow whitespace-pre-line">
                        {card.title}
                    </p>
                </div>

                {/* action circle */}
                <div className="absolute right-8 bottom-8">
                    <div className="rounded-full bg-white/25 backdrop-blur border border-white/25 grid place-items-center text-white">
                        <Image src={arrow} alt="arrow" className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]" />
                    </div>
                </div>
            </div>
        </Wrap>
    );
}
