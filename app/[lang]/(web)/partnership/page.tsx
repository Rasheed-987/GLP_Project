import React from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import Container from '@/app/components/Container';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Button from '../components/Button';
import TagPill from '../components/TagPill';
import Carousel from '../components/Carousel';

export default async function PartnershipPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <section>
                <Container className="w-full px-4 ">
                    <Image
                        src="/images/partnership_herobg.png"
                        alt="Partnership"
                        width={1920}
                        height={600}
                        className="w-full h-auto"
                        priority
                    />
                </Container>
            </section>

            {/* Partnership Content Section */}
            <section className="pb-4 md:pb-8 pt-10">
                <Container className="px-8">
                    {/* Top Section: Label, Title, Description, Button */}
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-32 md:mb-16 mb-8">
                        {/* Left Column: Label, Line, Title */}
                        <div className="w-full lg:w-1/2">
                            {/* Label */}

                            <TagPill label={dict.partnership.label} className="mb-2" />



                            {/* Title with Gradient */}
                            <h2 className="text-[1.2rem] md:text-[2.8rem] leading-[1.2] md:leading-[1] tracking-[1.5] text-black ">
                                <span className="font-medium">{dict.partnership.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.title.highlight1}</span>
                            </h2>
                        </div>

                        {/* Right Column: Description and Button */}
                        <div className="w-full lg:w-1/2 flex flex-col md:ps-32 justify-start md:pt-10 gap-6">
                            <p className="text-[#00000099] text-[14px] md:text-[16px] leading-[1.2]">
                                {dict.partnership.description}
                            </p>
                            <div>
                                <Button className="w-full md:w-[40%]">
                                    {dict.partnership.button}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            {/* partnership about section  */}
            <section className="pb-12 md:pb-24">
                <Container className="px-8">
                    <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-8 lg:gap-16 items-start">
                        {/* Title and Description */}
                        <div className="w-full lg:w-6/12  order-1">

                            <span className="text-brand-blue text-[12px] md:text-[15px] font-semibold uppercase tracking-[1.2] md:tracking-[1.6] mb-2 md:mb-4 block">
                                {dict.partnership.about.label}
                            </span>

                            {/* Separator Line */}
                            <div className="w-14 md:w-20 h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-8">
                                <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                            </div>

                            {/* Title with Gradient */}
                            <h2 className="text-[1.2rem] max-w-md md:text-[1.7rem] leading-[1.2] md:leading-[1.1] bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent mb-6 md:mb-48">
                                <span className="font-extrabold">{dict.partnership.about.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.about.title.highlight1}</span>
                                <span className="font-normal">{dict.partnership.about.title.text2}</span>
                                <span className="font-extrabold">{dict.partnership.about.title.highlight2}</span>
                            </h2>
                            <div className="w-full md:block hidden">
                                <p className="text-[#00000099] leading-[1.2] text-sm md:text-[16px] max-w-lg">
                                    {dict.partnership.about.description}
                                </p>
                            </div>
                        </div>

                        {/* Image - appears after content on small screens */}
                        <div className="w-full lg:w-6/12 order-2">
                            <div className="relative w-full h-full min-h-[300px] lg:min-h-[600px] rounded-2xl lg:rounded-[1.5rem] overflow-hidden">
                                <Image
                                    src="/images/partenrship_about.png"
                                    alt="Partnership About"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Description - appears after image on small screens, with title on large screens */}
                        <div className="w-full md:hidden block order-3">
                            <p className="text-[#00000099] leading-[1.2] text-sm md:text-[16px] max-w-sm">
                                {dict.partnership.about.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Three-step approach section */}
            <section className="pb-12 md:pb-24 pt-12 md:pt-24 bg-white">
                <Container className="px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-28 relative">
                        {/* Left Side: Sticky Title and Arrow */}
                        <div className="w-full lg:w-6/12 lg:sticky lg:top-32 h-fit">
                            <h2 className="text-[1.5rem] md:text-[1.85rem] max-w-lg leading-[1.2] md:leading-[1.1] mb-8 bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                <span className="font-normal">{dict.partnership.approach.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.approach.title.highlight1}</span>
                                <span className="font-normal">{dict.partnership.approach.title.text2}</span>
                            </h2>
                            <div className="relative -ms-14 w-full aspect-[4/3] md:min-h-[400px]">
                                <Image
                                    src="/images/glp_arrow.png"
                                    alt="GLP Arrow"
                                    fill
                                    className="object-contain object-left-top"
                                />
                            </div>
                        </div>

                        {/* Right Side: Steps */}
                        <div className="w-full lg:w-6/12 space-y-20 lg:space-y-7">
                            {dict.partnership.approach.steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col gap-6">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-3xl md:text-4xl font-light gradient-text opacity-40">
                                            {step.number}
                                        </span>
                                        <h3 className="text-2xl md:text-[2rem] font-medium -tracking-[0.9px] gradient-text">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[#00000099] max-w-md mt-24 text-[14px] md:text-[16px] leading-relaxed ">
                                        {step.description}
                                    </p>
                                    {idx !== dict.partnership.approach.steps.length - 1 && (
                                        <div className="h-[2px] bg-gray-100 w-full md:w-[90%] mt-4 md:mt-10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* What We Offer Section */}
            <section className="relative py-8 overflow-hidden mx-4 ">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[1rem] md:rounded-[1.5rem]">
                    <Image
                        src="/images/model_bg.png"
                        alt="Background"
                        fill
                        className="object-fill"
                    />
                    {/* <div className="absolute inset-0 bg-[#045A86] opacity-80 md:bg-black/40"></div> */}
                </div>

                <Container className="relative z-10 px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        {/* Left Side: Text Content */}
                        <div className="w-full lg:w-8/12">
                            <p className="text-white text-sm text-semibold pb-3" >{dict.partnership.offer.pill} </p>
                            {/* Separator Line */}
                            <div className=" w-20 md:w-24 h-[2px] md:h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-6">
                                <div className="h-full w-1/2 bg-white rounded-full"></div>
                            </div>
                            <h2 className="text-[2rem] md:text-[1.7rem] max-w-sm leading-[1.1] text-white  font-medium">
                                <span className="font-extrabold">{dict.partnership.offer.title.text1}{dict.partnership.offer.title.highlight1}</span>
                                {dict.partnership.offer.title.text2}
                                <span className="font-extrabold">{dict.partnership.offer.title.highlight2}</span>
                                {dict.partnership.offer.title.text3}
                                <span className="font-extrabold">{dict.partnership.offer.title.highlight3}</span>
                            </h2>

                            <p className="text-white text-[14px] md:text-[15px] leading-[1.3] max-w-md pt-20 md:pt-68">
                                {dict.partnership.offer.description}
                            </p>
                        </div>

                        {/* Right Side: Offer Cards */}
                        <div className="w-full lg:w-4/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            {dict.partnership.offer.cards.map((card, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-2 md:p-4 flex flex-col justify-between group h-full min-h-[110px] transition-all hover:shadow-lg">
                                    <div className="w-10 h-10 bg-[#E6EFEA] rounded-lg flex items-center justify-center  transition-transform duration-[1500ms] ease-in-out group-hover:rotate-[360deg]">
                                        <Image
                                            src={card.icon}
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="object-contain transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-[360deg]"
                                        />
                                    </div>
                                    <span className="text-[14px] md:text-[15px] text-[#00000099] font-medium leading-tight tracking-tight">
                                        {card.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white pt-20">
                <Container className="px-14">
                    <span className="text-brand-blue text-[12px] md:text-[15px] font-semibold uppercase tracking-[1.2] md:tracking-[1.6] mb-2 md:mb-4 block">
                        {dict.partnership.caseStudies.label}
                    </span>

                    {/* Separator Line */}
                    <div className="w-14 md:w-20 h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-8">
                        <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                    </div>

                    <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.4] max-w-md">
                        {dict.partnership.caseStudies.description}
                    </p>
                </Container>
            </section>

            <section className="bg-white pb-32 pt-5">
                <Carousel items={dict.home.alumni.items} lang={lang} />
            </section>
        </>
    );
}