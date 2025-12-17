
import React from 'react';
import Image from 'next/image';
import Container from '../../../components/Container';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import TagPill from '../components/TagPill';
import Button from '../components/Button';

export default async function ApproachPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <section className="py-12 md:py-20">
            <Container className="px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-4/12 flex flex-col items-start">
                        {/* Pill */}
                        <TagPill label={dict.approach.hero.pill} className="mb-6" />

                        {/* Heading */}
                        <h1 className="text-black mb-28 leading-tight">
                            <span className="block text-4xl md:text-[3.5rem] font-normal mb-1 ">
                                {dict.approach.hero.title}
                            </span>
                            <span className="block text-4xl md:text-[3.5rem] font-extrabold">
                                {dict.approach.hero.subtitle}
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#00000099] text-sm md:text-base leading-[1.2] mb-8 max-w-lg">
                            {dict.approach.hero.description}
                        </p>

                        {/* Button */}
                        <Button>
                            {dict.approach.hero.button}
                        </Button>
                    </div>

                    {/* Right Column: Image */}
                    <div className="w-full lg:w-8/12">
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                            <Image
                                src="/images/approach_hero.png"
                                alt="UAE Government Leaders Program Approach"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}