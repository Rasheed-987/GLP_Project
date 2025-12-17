
import React from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default async function ContactSection({ lang }: { lang: Locale }) {
    const dict = await getDictionary(lang);
    const content = dict.programs.contact;

    return (
        <section className="px-4 pb-20">
            <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center p-8">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/contactbg.png"
                        alt="Contact Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-2xl px-4">
                    <h2 className="text-white mb-3 leading-tight">
                        <span className="block text-2xl md:text-3xl  mb-1">{content.titleLine1}</span>
                        <span className="block text-2xl md:text-3xl font-extrabold">{content.titleLine2}</span>
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mb-8 max-w-xs mx-auto leading-relaxed">
                        {content.description}
                    </p>
                    <button
                        className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-white text-black/80 hover:cursor-pointer hover:text-brand-from font-extrabold text-sm md:text-[13px] capitalize leading-none transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:translate-y-0.5"
                    >
                        {content.button}
                    </button>

                </div>
            </div>
        </section>
    );
}
