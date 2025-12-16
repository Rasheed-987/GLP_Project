
import React from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default async function ContactSection({ lang }: { lang: Locale }) {
    const dict = await getDictionary(lang);
    const content = dict.programs.contact;

    return (
        <section className="px-4 pb-20">
            <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
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
                    <h2 className="text-white mb-6 leading-tight">
                        <span className="block text-3xl md:text-5xl font-normal mb-1">{content.titleLine1}</span>
                        <span className="block text-3xl md:text-[3.5rem] font-extrabold">{content.titleLine2}</span>
                    </h2>
                    <p className="text-white/90 text-sm md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                        {content.description}
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors">
                        {content.button}
                    </button>
                </div>
            </div>
        </section>
    );
}
