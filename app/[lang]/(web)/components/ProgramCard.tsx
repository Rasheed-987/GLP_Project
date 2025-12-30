
import React from 'react';
import Image from 'next/image';
import Button from './Button';

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
    blurDataURL?: string;
    lang: string;
}

export default function ProgramCard({ item, reversed, blurDataURL, lang }: ProgramCardProps) {
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
                    <p className={`text-[#00000099] whitespace-pre-wrap mb-8 leading-[1.3] ${lang === 'ar' ? 'pt-1.5' : ''}`}>
                        {item.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8 md:mb-56">
                        {item.features.map((feature, idx) => {
                            const icons = ['target.png', 'users.png', 'globe.png', 'laptop.png'];
                            const iconName = icons[idx % icons.length];
                            const iconPath = `/images/${iconName}`;

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


                    <div className="border-t border-black/5 mt-6 mb-4"></div>

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
                <div className="w-full mb-4 md:mb-0 lg:w-1/2 relative min-h-[300px] lg:min-h-0 lg:h-auto lg:aspect-4/3 overflow-hidden rounded-2xl  md:rounded-xl bg-gray-200">
                    {/* Placeholder or actual image */}
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            placeholder={blurDataURL ? "blur" : undefined}
                            blurDataURL={blurDataURL}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Image Placeholder</div>
                    )}
                </div>
            </div>
        </div>
    );
}
