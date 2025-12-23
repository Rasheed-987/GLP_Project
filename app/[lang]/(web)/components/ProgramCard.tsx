
import React from 'react';
import Image from 'next/image';
import Button from './Button';

/* Use heroicons SVG for features (User, Clock, etc.) - simplified mapping for now */
const Icons = {
    development: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    ),
    project: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
    ),
    network: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
    ),
    calendar: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
    ),
    default: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
};

export type ProgramItem = {
    id: string;
    tag: string;
    title: string;
    description: string;
    features: string[];
    meta: { label: string; value: string }[];
    action: string;
    image: string;
    theme: string;
    actionDisabled?: boolean;
    note?: string;
};

interface ProgramCardProps {
    item: ProgramItem;
    reversed: boolean;
}

export default function ProgramCard({ item, reversed }: ProgramCardProps) {
    const isGreenTheme = item.theme === 'green';
    const bgColor = isGreenTheme ? 'bg-[#E4F3EF]' : 'bg-[#F7FAF9]';

    return (
        <div className={`w-full  mx-auto  p-5 rounded-2xl md:rounded-3xl overflow-hidden ${bgColor} `}>
            <div className={`flex flex-col-reverse ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                {/* Content Section */}
                <div className="w-full lg:w-1/2 md:px-4 lg:px-8 xl:px-12 self-start">
                    {/* Tag */}
                    <div className="inline-flex px-3 py-1 rounded-full bg-[#E6EEF3] border border-[#D8E5EB] mb-3">
                        <span className="flex items-center pt-[1px] md:pt-[2px] text-[10px] md:text-[13px] font-bold leading-none text-[#045A86] uppercase tracking-wider">
                            {item.tag}
                        </span>
                    </div>


                    {/* Title */}
                    <h2 className="text-[1.3rem] md:text-[1.7rem] font-bold text-black mb-2 leading-[1.1] tracking-tight">
                        {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#00000099] mb-8 leading-[1.3] ">
                        {item.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                        {item.features.map((feature, idx) => {
                            // Determine prefix and separator based on item.id
                            // nafis -> pro1_1, uaeglp -> pro2-1, strategic -> pro3_1
                            let prefix = '';
                            let separator = '_';

                            if (item.id === 'nafis') { prefix = 'pro1'; separator = '_'; }
                            else if (item.id === 'uaeglp') { prefix = 'pro2'; separator = '-'; }
                            else if (item.id === 'strategic') { prefix = 'pro3'; separator = '_'; }

                            const iconPath = `/images/${prefix}${separator}${idx + 1}.png`;

                            return (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="relative shrink-0 w-4 h-4 mt-0.5">
                                        <Image
                                            src={iconPath}
                                            alt=""
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-sm text-[#00000099]">{feature}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="border-t border-[1px] border-black/5 mt-6 mb-4"></div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-1  mb-8">
                        {item.meta.map((m, idx) => {
                            const isDuration = m.label.toLowerCase().includes('duration') || m.label.includes('المدة');
                            const iconName = isDuration ? 'clock.png' : 'graduation.png';

                            return (
                                <div key={idx} className="grid grid-cols-[24px_auto_1fr] md:grid-cols-[24px_80px_1fr] items-start gap-1 ">
                                    <div className="relative w-4 h-4 shrink-0 mt-0.5">
                                        <Image
                                            src={`/images/${iconName}`}
                                            alt=""
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-[14px] font-bold text-black shrink-0">{m.label}</span>
                                    <span className="text-sm text-[#00000099]">{m.value}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Button */}
                    <div className="w-full">
                        <Button
                            disabled={item.actionDisabled}
                            className="w-full"
                        >
                            {item.action}
                        </Button>
                        {item.note && (
                            <p className="text-center text-[#00000099] text-xs mt-2.5">
                                {item.note}
                            </p>
                        )}
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full mb-4 md:mb-0 lg:w-1/2 relative min-h-[300px] lg:min-h-0 lg:h-auto lg:aspect-[4/3] overflow-hidden rounded-2xl  md:rounded-xl bg-gray-200">
                    {/* Placeholder or actual image */}
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Image Placeholder</div>
                    )}
                </div>
            </div>
        </div>
    );
}
