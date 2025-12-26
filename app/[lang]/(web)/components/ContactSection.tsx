
import React from 'react';
import Image from 'next/image';

type ContactSectionProps = {
    titleLine1: string;
    titleLine2: string;
    titlehighlight?: string;
    titleLine2Bold?: string;
    description: string;
    button: string;
    button2?: string;
    backgroundImage?: string;
    blurDataURL?: string;
};

export default function ContactSection({
    titleLine1,
    titleLine2,
    titlehighlight,
    titleLine2Bold,
    description,
    button,
    button2,
    backgroundImage = '/images/contactbackground.png',
    blurDataURL
}: ContactSectionProps) {
    return (
        <section className="px-4 pb-20 text-white">
            <div className="relative w-full max-w-8xl mx-auto rounded-3xl overflow-hidden min-h-[350px] md:min-h-[450px] flex flex-col items-center justify-center text-center p-4 md:p-8">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Contact Background"
                        fill
                        className="object-cover"
                        priority
                        placeholder={blurDataURL ? "blur" : undefined}
                        blurDataURL={blurDataURL}
                    />
                </div>

                {/* Content Overlay */}

                <div className="relative z-10 max-w-3xl md:px-4">

                    <h2 className="mb-3 leading-tight">
                        <span className="block text-2xl md:text-4xl mb-1">
                            <span className="font-normal">{titleLine1}</span>
                            <span className="font-bold"> {titlehighlight}</span>
                        </span>
                        {titleLine2Bold ? (
                            <span className="block text-2xl md:text-4xl font-normal">
                                {titleLine2} <span className="font-bold">{titleLine2Bold}</span>
                            </span>
                        ) : (
                            <span className="block text-2xl md:text-4xl font-extrabold">{titleLine2}</span>
                        )}
                    </h2>
                    <p className="text-white/90 text-xs md:text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            className="inline-flex items-center justify-center px-5 py-4 rounded-full bg-white text-black/80 hover:cursor-pointer font-extrabold text-xs md:text-sm capitalize leading-none transition-transform duration-200 ease-out hover:scale-105"
                        >
                            {button}
                        </button>
                        {button2 && (
                            <button
                                className="inline-flex items-center justify-center px-5 py-4 rounded-full border border-white text-white hover:cursor-pointer font-extrabold text-xs md:text-sm capitalize leading-none transition-transform duration-200 ease-out hover:scale-105"
                            >
                                {button2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
