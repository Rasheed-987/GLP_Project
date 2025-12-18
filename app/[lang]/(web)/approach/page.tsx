
import React from 'react';
import Image from 'next/image';
import Container from '../../../components/Container';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import TagPill from '../components/TagPill';
import Button from '../components/Button';
import ContactSection from '../components/ContactSection';

export default async function ApproachPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            {/* hero section */}
            <section className="py-20">
                <Container className="px-4">
                    <div className="flex flex-wrap lg:flex-nowrap gap-4 md:gap-8 lg:gap-16 items-center">

                        {/* Left Column: Text Content */}
                        <div className="w-full lg:w-4/12 flex flex-col items-start order-1">
                            {/* Pill */}
                            <TagPill label={dict.approach.hero.pill} className="mb-2" />

                            {/* Heading */}
                            <h1 className="text-black mb-4 md:mb-28 leading-tight">
                                <span className="block text-3xl md:text-[3.5rem] font-normal mb-1 ">
                                    {dict.approach.hero.title}
                                </span>
                                <span className="block text-4xl md:text-[3.5rem] font-extrabold">
                                    {dict.approach.hero.subtitle}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-[#00000099] text-sm md:text-base leading-[1.2] md:mb-8 lg:mb-0 max-w-lg">
                                {dict.approach.hero.description}
                            </p>
                            <div className="w-full hidden md:block lg:w-4/12 order-3 lg:order-1 mt-3 lg:mt-8">
                                <Button className='w-full md:w-auto whitespace-nowrap'>
                                    {dict.approach.hero.button}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="w-full lg:w-8/12 order-2">
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

                        {/* Button - appears after image on small screens, stays with text on large screens */}
                        <div className="w-full md:hidden lg:w-4/12 order-3 lg:order-1 mt-3 lg:mt-8">
                            <Button className='w-full md:w-auto'>
                                {dict.approach.hero.button}
                            </Button>
                        </div>

                    </div>
                </Container>
            </section>

            {/* Methodology Section */}
            <section className="pb-12 md:pb-28">
                <Container className="px-4">
                    <div className="bg-[#E6EFEA] rounded-2xl md:rounded-[1.5rem] p-4 lg:p-8">
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mb-8 md:mb-16 items-start">
                            {/* Left Side: Title */}
                            <div className="w-full lg:w-3/4 ">
                                <h2 className="text-[1.43rem] max-w-2xl md:text-[1.75rem] leading-[1.1] md:leading-[1.2] font-medium bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                    <span className="font-extrabold">{dict.approach.methodology.title.highlight1}</span>
                                    {dict.approach.methodology.title.text1}
                                    <span className="font-extrabold">{dict.approach.methodology.title.highlight2}</span>
                                    {dict.approach.methodology.title.text2}
                                    {dict.approach.methodology.title.highlight3}
                                </h2>
                            </div>

                            {/* Right Side: Description */}
                            <div className="w-full lg:w-1/4 flex flex-col gap-6">
                                <p className="text-[#00000099] leading-[1.2] text-sm md:text-base">
                                    {dict.approach.methodology.description1}
                                </p>
                                <p className="text-[#00000099] leading-[1.2] text-sm md:text-base">
                                    {dict.approach.methodology.description2}
                                </p>
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                            {/* Card 1: Advanced learning formats */}
                            <div className="bg-white rounded-xl p-4 h-full min-h-[80px] flex flex-col justify-between group">
                                <div className="w-10 h-10 bg-[#E6EFEA] rounded-sm flex items-center justify-center mb-2 transition-transform duration-[1500ms] ease-in-out group-hover:rotate-[360deg]">
                                    <Image
                                        src="/images/laptop.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="object-contain transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-[360deg]" // laptop often represents learning formats
                                    />
                                </div>
                                <span className="text-sm md:text-base text-[#00000099] font-medium leading-tight tracking-tight">
                                    {dict.approach.methodology.cards.format}
                                </span>
                            </div>

                            {/* Card 2: Strategic frameworks */}
                            <div className="bg-white rounded-xl p-4 h-full min-h-[80px] flex flex-col justify-between group">
                                <div className="w-10 h-10 bg-[#E6EFEA] rounded-sm flex items-center justify-center mb-2 transition-transform duration-[1500ms] ease-in-out group-hover:rotate-[360deg]">
                                    <Image
                                        src="/images/target.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="object-contain transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-[360deg]" // target usually represents strategy/goals/frameworks
                                    />
                                </div>
                                <span className="text-sm md:text-base text-[#00000099] font-medium leading-tight tracking-tight">
                                    {dict.approach.methodology.cards.frameworks}
                                </span>
                            </div>

                            {/* Card 3: Mentorship opportunities */}
                            <div className="bg-white rounded-xl p-4 h-full min-h-[80px] flex flex-col justify-between group">
                                <div className="w-10 h-10 bg-[#E6EFEA] rounded-sm flex items-center justify-center mb-2 transition-transform duration-[1500ms] ease-in-out group-hover:rotate-[360deg]">
                                    <Image
                                        src="/images/users.png"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="object-contain transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-[360deg]" // users represent mentorship/people
                                    />
                                </div>
                                <span className="text-sm md:text-base text-[#00000099] font-medium leading-tight tracking-tight">
                                    {dict.approach.methodology.cards.mentorship}
                                </span>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* Learning Methodology Section */}
            <section className="pb-8 md:pb-16">
                <Container className="px-4">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        {/* Label */}
                        <span className="text-brand-from text-[13px] md:text-[16px] font-semibold uppercase tracking-[1] md:tracking-[1.6] mb-2">
                            {dict.approach.learningMethodology.label}
                        </span>

                        {/* Separator Line */}
                        <div className=" w-24 md:w-28 h-[2px] md:h-1 bg-[#045A8633] rounded-full overflow-hidden mb-8 md:mb-12">
                            <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                        </div>


                        {/* Title - Gradient applied to whole block */}
                        <h2 className="text-[1.5rem] md:text-[2.5rem] leading-[0.9] md:leading-[0.8] mb-4 md:mb-7 bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                            <span className="block mb-1 md:mb-2">
                                <span className="font-normal">{dict.approach.learningMethodology.title.line1.text1}</span>
                                <span className="font-extrabold">{dict.approach.learningMethodology.title.line1.highlight1}</span>
                                <span className="font-normal">{dict.approach.learningMethodology.title.line1.text2}</span>
                                <span className="font-extrabold">{dict.approach.learningMethodology.title.line1.highlight2}</span>
                            </span>
                            <span className="block">
                                <span className="font-normal">{dict.approach.learningMethodology.title.line2.text3}</span>
                                <span className="font-extrabold">{dict.approach.learningMethodology.title.line2.highlight3}</span>
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-[#00000099] text-[15px] md:text-[16px] leading-[1.2] max-w-2xl">
                            {dict.approach.learningMethodology.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Key Formats Section */}
            <section className="pb-12 md:pb-24">
                <Container className="px-4">
                    <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-8 lg:gap-16 items-center">
                        {/* Title and List */}
                        <div className="w-full md:ps-16 lg:w-6/12 order-1">
                            <h3 className="text-[#045A86] font-bold text-xs md:text-base uppercase mb-3 md:mb-8 tracking-[1.2]">
                                {dict.approach.learningMethodologyPart2.title}
                            </h3>

                            <ul className="space-y-2 mb-4 lg:mb-44">
                                {dict.approach.learningMethodologyPart2.items.map((item, idx) => {
                                    const icons = [
                                        'stand.png', // Interactive workshops
                                        'file.png',  // Capstone projects
                                        'pin.png',   // Field visits
                                        'users.png', // Mentoring
                                        'laptop.png' // Digital learning
                                    ];
                                    return (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="shrink-0 w-4 h-4 relative">
                                                <Image
                                                    src={`/images/${icons[idx]}`}
                                                    alt=""
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="text-[#00000099] text-sm md:text-[16px] leading-[1.2]">
                                                {item}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="w-full md:block hidden  ">
                                <p className="text-[#00000099] leading-[1.2] text-sm md:text-[16px] max-w-sm">
                                    {dict.approach.learningMethodologyPart2.description}
                                </p>
                            </div>
                        </div>

                        {/* Image - appears after list on small screens */}
                        <div className="w-full lg:w-6/12 order-2">
                            <div className="relative w-full h-full min-h-[300px] lg:min-h-[600px] rounded-2xl lg:rounded-[1.5rem] overflow-hidden">
                                <Image
                                    src="/images/LearningMethodology.png"
                                    alt="Learning Methodology"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Description - appears after image on small screens, with title/list on large screens */}
                        <div className="w-full md:hidden block order-3 ">
                            <p className="text-[#00000099] leading-[1.2] text-sm md:text-[16px] max-w-sm">
                                {dict.approach.learningMethodologyPart2.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* About UAELGM Section */}
            <section className="pb-4 md:pb-8">
                <Container className="px-4">
                    {/* Top Section: Label, Title, Description, Button */}
                    <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-32 md:mb-16 mb-8">
                        {/* Left Column: Label, Line, Title */}
                        <div className="w-full lg:w-1/2">
                            {/* Label */}
                            <span className="text-brand-from text-[12px] md:text-[15px] font-semibold uppercase tracking-[1.2] md:tracking-[1.6] mb-2 md:mb-4 block">
                                {dict.approach.aboutUAELGM.label}
                            </span>

                            {/* Separator Line */}
                            <div className="w-14 md:w-20 h-0.5 bg-[#045A8633] rounded-full overflow-hidden mb-4 md:mb-8">
                                <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                            </div>

                            {/* Title with Gradient */}
                            <h2 className="text-[1.2rem] md:text-[1.55rem] leading-[1.2] md:leading-[1.1]    bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                <span className="font-normal">{dict.approach.aboutUAELGM.title.text1}</span>
                                <span className="font-extrabold">{dict.approach.aboutUAELGM.title.highlight1}</span>
                                <span className="font-normal">{dict.approach.aboutUAELGM.title.text2}</span>
                                <span className="font-extrabold">{dict.approach.aboutUAELGM.title.highlight2}</span>
                                <span className="font-normal">{dict.approach.aboutUAELGM.title.text3}</span>
                            </h2>
                        </div>

                        {/* Right Column: Description and Button */}
                        <div className="w-full lg:w-1/2 flex flex-col md:ps-32 justify-start md:pt-18 gap-6">
                            <p className="text-[#00000099] text-[14px] md:text-[16px] leading-[1.2]">
                                {dict.approach.aboutUAELGM.description}
                            </p>
                            <div>
                                <Button className="w-full md:w-auto">
                                    {dict.approach.aboutUAELGM.button}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Three Pillars */}
                    <div className="border border-gray-200 rounded-3xl md:rounded-2xl overflow-hidden">
                        {/* Pillars Title */}
                        <div className="border-b border-gray-200 py-6">
                            <h3 className="text-center text-brand-from font-bold text-sm md:text-base uppercase tracking-[1.2]">
                                {dict.approach.aboutUAELGM.pillarsTitle}
                            </h3>
                        </div>

                        {/* Pillars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {dict.approach.aboutUAELGM.pillars.map((pillar, idx) => (
                                <div
                                    key={idx}
                                    className={`bg-white p-5 text-center ${idx !== 2 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
                                >
                                    <h4
                                        className="font-extrabold text-lg md:text-[1.3rem] bg-gradient-to-r from-[#045A86] to-[#019977]  bg-clip-text text-transparent "
                                    >
                                        {pillar.title}
                                    </h4>

                                    <p className="text-[#00000099] text-sm md:text-[15px] leading-[1.2]">
                                        {pillar.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/*  Image Section */}
            <section className="w-full px-4 ">
                <Image
                    src="/images/approach_about.png"
                    alt="About UAELGM"
                    width={1920}
                    height={600}
                    className="w-full h-auto"
                    priority
                />
            </section>

            {/* Alumni Network Section */}
            <section className="relative py-4 px-4 md:py-8 md:px-8 overflow-hidden mt-40">
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
                        <div className="flex flex-col-reverse  lg:flex-row gap-4 lg:gap-8 items-start">
                            {/* Left Column: Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-[4/3] w-full md:min-h-[600px] rounded-2xl  md:rounded-[1.5rem] overflow-hidden">
                                    <Image
                                        src="/images/alumni.png"
                                        alt="Alumni Network"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="w-full lg:w-1/2">
                                {/* Label */}
                                <span className="text-brand-from text-[13px] md:text-[15px] font-semibold uppercase tracking-[1.6] mb-2 md:mb-4 block">
                                    {dict.approach.alumniNetwork.label}
                                </span>

                                {/* Separator Line */}
                                <div className="w-20 md:w-24 h-[2px] md:h-1 bg-[#045A8633] rounded-full overflow-hidden mb-3 md:mb-5">
                                    <div className="h-full w-1/2 bg-[#045A86] rounded-full"></div>
                                </div>

                                {/* Title with Gradient */}
                                <h2 className="text-[1.4rem] max-w-sm md:text-[1.75rem] leading-[1.2] mb-6 bg-gradient-to-r from-[#045A86] to-[#019977] bg-clip-text text-transparent">
                                    <span className="font-normal ">{dict.approach.alumniNetwork.title.text1}</span>
                                    <span className="font-extrabold">{dict.approach.alumniNetwork.title.highlight1}</span>
                                </h2>

                                {/* Description */}
                                <p className="text-[#00000099] text-base md:text-[16px] leading-[1.2] mb-5 md:mb-44">
                                    {dict.approach.alumniNetwork.description}
                                </p>

                                {/* Benefits Title */}
                                <h3 className="text-brand-from font-bold text-[12px] md:text-[15px] uppercase tracking-[1.2] mb-4">
                                    {dict.approach.alumniNetwork.benefitsTitle}
                                </h3>

                                {/* Benefits List */}
                                <ul className="space-y-4">
                                    {dict.approach.alumniNetwork.benefits.map((benefit, idx) => {
                                        const icons = ['key.png', 'msg_chat.png', 'link.png', 'laptop.png'];
                                        return (
                                            <li key={idx} className="flex items-center md:items-start gap-3">
                                                <div className="shrink-0 w-4 h-4 relative mt-0.5">
                                                    <Image
                                                        src={`/images/${icons[idx]}`}
                                                        alt=""
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.2]">
                                                    {benefit}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="pt-7 pb-28 md:pb-40">
                <Container className="px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
                        {dict.approach.features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-start text-start gap-2">
                                <div className='border border-gray-300 rounded-full p-3'>
                                    <div className="w-4 h-4 relative flex-shrink-0">
                                        <Image
                                            src={`/images/${feature.icon}`}
                                            alt=""
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <p className="text-[#00000099] text-sm md:text-[14px] leading-[1.2]">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Contact Section */}
            <ContactSection
                titleLine1={dict.approach.contact.titleLine1}
                titleLine2={dict.approach.contact.titleLine2}
                description={dict.approach.contact.description}
                button={dict.approach.contact.button}
            />

        </>
    );
}
