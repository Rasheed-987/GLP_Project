
import React from 'react';
import Image from 'next/image';

type ContactSectionProps = {
    titleLine1: string;
    titleLine2: string;
    description: string;
    button: string;
    backgroundImage?: string;
};

export default function ContactSection({
    titleLine1,
    titleLine2,
    description,
    button,
    backgroundImage = '/images/contactbg.png'
}: ContactSectionProps) {
    return (
        <section className="px-4 pb-20">
            <div className="relative w-full max-w-8xl mx-auto rounded-3xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center p-8">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Contact Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-2xl px-4">
                    <h2 className="text-white mb-3 leading-tight">
                        <span className="block text-2xl md:text-3xl  mb-1">{titleLine1}</span>
                        <span className="block text-2xl md:text-3xl font-extrabold">{titleLine2}</span>
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mb-8 max-w-xs mx-auto leading-relaxed">
                        {description}
                    </p>
                    <button
                        className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-white text-black/80 hover:cursor-pointer hover:text-brand-from font-extrabold text-sm md:text-[14px] capitalize leading-none transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:translate-y-0.5"
                    >
                        {button}
                    </button>

                </div>
            </div>
        </section>
    );
}
