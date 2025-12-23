import React from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import Container from '@/app/components/Container';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Button from '../components/Button';
import TagPill from '../components/TagPill';
import Carousel from '../components/Carousel';
import ContactSection from '../components/ContactSection';

export default async function AlumniPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>


            {/* Alumni Hero Section */}
            <section className="pt-20 md:pt-28">
                <Container className="px-4 md:px-8">
                    {/* Top Section: Label, Title, Description, Button */}
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-32 md:mb-10 mb-8">
                        {/* Left Column: Label, Line, Title */}
                        <div className="w-full lg:w-1/2">
                            {/* Label */}

                            <TagPill label={dict.alumniPage.label} className="mb-2" />



                            {/* Title with Gradient */}
                            <h2 className="text-[1.75rem] md:text-[2.6rem] leading-[1] md:leading-[1] tracking-[1.5] text-black ">
                                <span className="font-medium">{dict.alumniPage.title.text1}</span>
                                <span className="font-extrabold">{dict.alumniPage.title.highlight1}</span>
                                <br className="hidden md:block" />
                                <span className="font-medium">{dict.alumniPage.title.text2}</span>
                            </h2>
                        </div>

                        {/* Right Column: Description and Button */}
                        <div className="w-full lg:w-1/2 flex flex-col md:ps-32 justify-end md:pt-10 gap-6">
                            <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.2]">
                                {dict.alumniPage.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
            <section>
                <Container className="w-full px-4 ">
                    <Image
                        src="/images/alumni_hero.png"
                        alt="Alumni"
                        width={1920}
                        height={600}
                        className="w-full h-[200px] rounded-xl md:h-auto object-cover"
                        priority
                    />
                </Container>
            </section>


            <section className="relative py-4 px-4 md:py-8 md:px-8 overflow-hidden mt-7">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 mx-4 overflow-hidden rounded-[1.5rem] ">
                    <Image
                        src="/images/bg_1.png"
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>

                <Container className="relative z-10 px-4">
                    <div className="bg-white rounded-[1.5rem] p-4 md:p-6 lg:p-8">
                        <div className="">
                            <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-32 md:mb-16 mb-8">
                                {/* Left Column: Title */}
                                <div className="w-full lg:w-1/2">
                                    {/* Title with Gradient */}
                                    <h2 className="text-[1.15rem] max-w-md md:text-[1.6rem] leading-[1.3] md:leading-[1.2] bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                        <span className="font-normal">{dict.alumniPage.community.title.text1}</span>
                                        <span className="font-extrabold">{dict.alumniPage.community.title.highlight1}</span>
                                        <span className="font-normal">{dict.alumniPage.community.title.text2}</span>
                                    </h2>
                                </div>

                                {/* Right Column: Description and Button */}
                                <div className="w-full lg:w-1/2 flex flex-col md:ps-32 justify-start gap-5 md:gap-10">
                                    <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.2]">
                                        {dict.alumniPage.community.description}
                                    </p>
                                    <div>
                                        <Button className="w-full md:w-auto bg-[#047D75] hover:bg-[#03665F] text-white rounded-full px-8 py-3">
                                            {dict.alumniPage.community.button}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <section className="pt-6 sm:pt-20 md:pt-32 ">
                                <Container className="px-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
                                        {dict.alumniPage.community.features.map((feature, idx) => (
                                            <div key={idx} className="flex flex-col items-start text-start gap-4">
                                                <div className="bg-[#EDF5F4] rounded-md p-2 flex items-center justify-center w-10 h-10">
                                                    <div className="w-4.5 h-4.5 relative flex-shrink-0">
                                                        <Image
                                                            src={`/images/${feature.icon}`}
                                                            alt=""
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <h3 className="font-bold text-[15px] text-black/90">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="text-[#00000099] text-[13px] md:text-[14px] leading-[1.4]">
                                                        {feature.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Container>
                            </section>
                        </div>
                    </div>
                </Container>
            </section>



            {/* Impact Section */}
            <section className="bg-white pt-10 md:pt-28 pb-10">
                <Container className="px-4 flex flex-col items-center text-center">
                    <h2 className="text-[1.75rem] md:text-[1.9rem] gradient-text leading-[1.2] md:leading-[1.2] mb-6 max-w-2xl">
                        <span className="font-medium text-[#047D75]">{dict.alumniPage.impactSection.title.text1}</span>
                        <br className="" />
                        <span className="font-bold gradient-text ">
                            {dict.alumniPage.impactSection.title.highlight1}
                        </span>
                    </h2>

                    <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.4] max-w-md">
                        {dict.alumniPage.impactSection.description}
                    </p>
                </Container>
            </section>

            <section className="bg-white md:pb-32 mb-10 pt-5">
                <Carousel items={dict.home.alumni.items} lang={lang} />
                <div className="flex justify-center mt-12">
                    <Button>
                        {dict.home.alumni.graduatesStories}
                    </Button>
                </div>
            </section>

            <ContactSection
                titleLine1={dict.alumniPage.contact.titleLine1}
                titleLine2={dict.alumniPage.contact.titleLine2}
                titleLine2Bold={dict.alumniPage.contact.titleLine2Bold}
                description={dict.alumniPage.contact.description}
                button={dict.alumniPage.contact.button}
            />

        </>
    );
}