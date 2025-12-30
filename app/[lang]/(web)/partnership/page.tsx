import React from 'react';
import Image from 'next/image';
import type { Locale } from "../../../../lib/i18n/config";
import Container from "../../../../app/components/Container";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import Button from '../components/Button';
import TagPill from '../components/TagPill';
import DynamicCarousel from '../components/DynamicCarousel';
import ContactSection from '../components/ContactSection';
import { getImageBlur } from '../../../../lib/image';

export default async function PartnershipPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const heroBlur = await getImageBlur("/images/partnership_herobg.webp");
    const aboutBlur = await getImageBlur("/images/partenrship_about.png");
    const arrowBlur = await getImageBlur("/images/glp_arrow.png");
    const modelBlur = await getImageBlur("/images/model_bg.webp");
    const contactBlur = await getImageBlur("/images/contactbackground.png");

    return (
        <>
            <section>
                <Container className="w-full mt-20 md:mt-0 px-4 ">
                    <Image
                        src="/images/partnership_herobg.webp"
                        alt="Partnership"
                        width={1920}
                        height={600}
                        className="w-full h-[200px] rounded-xl md:h-auto object-cover"
                        priority
                        placeholder={heroBlur ? "blur" : undefined}
                        blurDataURL={heroBlur}
                    />
                </Container>
            </section>

            {/* Partnership Content Section */}
            <section className="pb-4 md:pb-8 pt-4 md:pt-10">
                <Container className="px-4 md:px-8">
                    {/* Top Section: Label, Title, Description, Button */}
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-32 md:mb-16 mb-8">
                        {/* Left Column: Label, Line, Title */}
                        <div className="w-full lg:w-1/2">
                            {/* Label */}

                            <TagPill label={dict.partnership.label} className="mb-2" />



                            {/* Title with Gradient */}
                            <h2 className={`text-[1.5rem] md:text-[2.5rem] lg:max-w-[600px] max-w-[200px] text-black ${lang === 'ar' ? 'leading-[1.3] md:leading-[1.2] tracking-normal' : 'leading-[1.2] md:leading-[1] tracking-[1.5px]'}`}>
                                <span className="font-medium">{dict.partnership.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.title.highlight1}</span>
                            </h2>
                        </div>

                        {/* Right Column: Description and Button */}
                        <div className="w-full lg:w-1/2 flex flex-col md:ps-32 justify-start md:pt-10 gap-6">
                            <p className="text-[#00000099] text-xs md:text-[15px] leading-[1.2]">
                                {dict.partnership.description}
                            </p>
                            <div>
                                <Button className="w-full md:w-[40%] ">
                                    {dict.partnership.button}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            {/* partnership about section  */}
            <section className="pb-12 md:pb-24">
                <Container className="px-4 md:px-8">
                    <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-8 lg:gap-16 ">
                        {/* Title and Description */}

                    
                        <div className="w-full lg:w-6/12 order-1 flex flex-col">

                    <div className=" md:mb-8">
                            <span className="text-brand-blue text-[11px] md:text-[14px] font-semibold uppercase tracking-[1.2] md:tracking-[1.6] mb-2 md:mb-4 block">
                                {dict.partnership.about.label}
                            </span>

                            {/* Separator Line */}
                            <div className="w-14 md:w-20 h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-8">
                                <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                            </div>

                            {/* Title with Gradient */}
                            <h2 className="text-[1.25rem] max-w-md md:text-[1.5rem] leading-[1.2] md:leading-[1.1] md:mb-6 bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent mb-6">
                                <span className="font-extrabold">{dict.partnership.about.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.about.title.highlight1}</span>
                                <span className="font-normal">{dict.partnership.about.title.text2}</span>
                                <span className="font-extrabold">{dict.partnership.about.title.highlight2}</span>
                                <span className="font-normal">{dict.partnership.about.title.text3}</span>
                            </h2>
                            </div>
                            <div className="w-full lg:mt-auto">
                                <p className="text-[#00000099] leading-relaxed text-[13px] md:text-[15px] max-w-lg">
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
                                    placeholder={aboutBlur ? "blur" : undefined}
                                    blurDataURL={aboutBlur}
                                />
                            </div>
                        </div>


                    </div>
                </Container>
            </section>

            {/* Three-step approach section */}
            <section className="pb-12 md:pb-24 pt-12 md:pt-24 bg-white">
                <Container className="px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-28 relative">
                        {/* Left Side: Sticky Title and Arrow */}
                        <div className="w-full lg:w-6/12 lg:sticky lg:top-32 h-fit">
                            <h2 className="text-[1.25rem] md:text-[1.6rem] max-w-lg leading-[1.2] md:leading-[1.1] mb-8 bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                <span className="font-normal">{dict.partnership.approach.title.text1}</span>
                                <span className="font-extrabold">{dict.partnership.approach.title.highlight1}</span>
                                <span className="font-normal">{dict.partnership.approach.title.text2}</span>
                            </h2>
                            <div className="relative -ms-14 xl:ms-0 w-full aspect-[4/3] md:min-h-[400px]">
                                <Image
                                    src="/images/glp_arrow.png"
                                    alt="GLP Arrow"
                                    fill
                                    className="object-contain object-left-top"
                                    placeholder={arrowBlur ? "blur" : undefined}
                                    blurDataURL={arrowBlur}
                                />
                            </div>
                        </div>

                        {/* Right Side: Steps */}
                        <div className="w-full lg:w-6/12 space-y-5 lg:space-y-7">
                            {dict.partnership.approach.steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col md:gap-6">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-2xl md:text-3xl font-light gradient-text opacity-40">
                                            {step.number}
                                        </span>
                                        <h3 className="text-xl md:text-[1.75rem] font-medium -tracking-[0.9px] gradient-text">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[#00000099] max-w-md  mt-5 md:mt-24 text-xs md:text-[15px] leading-relaxed ">
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
            <section className="relative py-8 md:py-12 overflow-hidden md:mx-4 bg-white md:bg-transparent">
                {/* Desktop Background - Hidden on Mobile */}
                <div className="hidden md:block absolute inset-0 z-0 h-[650px] 2xl:h-[800px] overflow-hidden rounded-[1rem]">
                    <Image
                        src="/images/model_bg.webp"
                        alt="Background"
                        fill
                        className="object-fill"
                        placeholder={modelBlur ? "blur" : undefined}
                        blurDataURL={modelBlur}
                    />
                </div>

                <Container className="relative z-10 px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        {/* Left Side: Text Content */}
                        <div className="w-full lg:w-8/12">
                            <p className="text-brand-blue md:text-white tracking-[1] md:tracking-[0.5px] text-[10px] md:text-[13px] font-semibold pb-2 md:pb-3">
                                {dict.partnership.offer.pill}
                            </p>

                            {/* Separator Line */}
                            <div className="w-20 md:w-24 h-[2px] md:h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-6">
                                <div className="h-full w-1/2 bg-brand-blue md:bg-white rounded-full"></div>
                            </div>

                            {/* Title - Teal on Mobile, White on Desktop */}
                            <h2 className="text-[1.1rem] md:text-[1.5rem] max-w-sm  leading-[1.1] bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent lg:text-white lg:bg-none font-medium mb-8">
                                <span className="font-bold">{dict.partnership.offer.title.text1}{dict.partnership.offer.title.highlight1}</span>
                                {dict.partnership.offer.title.text2}
                                <span className="font-bold">{dict.partnership.offer.title.highlight2}</span>
                                {dict.partnership.offer.title.text3}
                                <span className="font-bold">{dict.partnership.offer.title.highlight3}</span>
                            </h2>

                            {/* Mobile Image and Overlaid Description Block - Hidden on Desktop */}
                            <div className="md:hidden relative w-full h-[500px] mb-12 rounded-[1rem] overflow-hidden">
                                <Image
                                    src="/images/model_bg.webp"
                                    alt="Innovation"
                                    fill
                                    className="object-cover"
                                    placeholder={modelBlur ? "blur" : undefined}
                                    blurDataURL={modelBlur}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-3 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                    <p className="text-white text-[13px] leading-[1.3] max-w-xs">
                                        {dict.partnership.offer.description}
                                    </p>
                                </div>
                            </div>

                            {/* Desktop Description - Hidden on Mobile */}
                            <p className="hidden md:block text-white text-[13px] md:text-[15px] leading-[1.3] max-w-md pt-56">
                                {dict.partnership.offer.description}
                            </p>
                        </div>

                        {/* Right Side: Offer Cards */}
                        <div className="w-full lg:w-4/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            {dict.partnership.offer.cards.map((card, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-[1rem] p-6 md:p-4 flex flex-col justify-between group h-full min-h-[140px] md:min-h-[110px] transition-all hover:shadow-lg">
                                    <div className="w-12 h-12 md:w-10 md:h-10 bg-[#E6EFEA] rounded-lg flex items-center justify-center transition-transform duration-[1500ms] ease-in-out group-hover:rotate-[360deg]">
                                        <Image
                                            src={card.icon}
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="object-contain transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-[360deg] md:w-5 md:h-5"
                                        />
                                    </div>
                                    <span className="text-[13px] md:text-[14px] text-[#00000099] font-medium leading-tight tracking-tight mt-4 md:mt-0">
                                        {card.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white pt-20">
                <Container className="px-4 md:px-14">
                    <span className="text-brand-blue text-[11px] md:text-[14px] font-semibold uppercase tracking-[1.2] md:tracking-[1.6] mb-2 md:mb-4 block">
                        {dict.partnership.caseStudies.label}
                    </span>

                    {/* Separator Line */}
                    <div className="w-14 md:w-20 h-[3px] bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-8">
                        <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                    </div>

                    <p className="text-[#00000099] text-[13px] md:text-[14px] leading-[1.4] max-w-md">
                        {dict.partnership.caseStudies.description}
                    </p>
                </Container>
            </section>

            <section className="bg-white pb-32 pt-5">
                <DynamicCarousel lang={lang} graduateLabel={dict.home.alumni.graduateLabel} />
                <div className="flex justify-center mt-12">
                    <Button>
                        {dict.home.alumni.graduatesStories}
                    </Button>
                </div>
            </section>

            {lang === 'ar' ? (
                <ContactSection
                    titleLine1={dict.partnership.contact.title1}
                    titleLine2={dict.partnership.contact.title2}
                    description={dict.partnership.contact.description}
                    button={dict.partnership.contact.button1}
                    button2={dict.partnership.contact.button2}
                    blurDataURL={contactBlur}
                />
            ) : (
                <ContactSection
                    titleLine1={dict.partnership.contact.titleLine1}
                    titleLine2Bold={dict.partnership.contact.titleLine2Bold}
                    titleLine2={dict.partnership.contact.titleLine2}
                    description={dict.partnership.contact.description}
                    button={dict.partnership.contact.button}
                    blurDataURL={contactBlur}
                />
            )}

        </>
    );
}