import React from 'react';
import Image from 'next/image';
import Container from "../../../../app/components/Container";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import TagPill from '../components/TagPill';
import ContactSection from '../components/ContactSection';
import { getImageBlur } from '../../../../lib/image';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const heroBlur = await getImageBlur("/images/about.webp");
  const midBlur = await getImageBlur("/images/aboutmid.webp");
  const contactBlur = await getImageBlur("/images/contactbg.webp");

  return (
    <>
      <section className="pt-24 pb-6 md:pt-32 md:pb-12">
        <div className="px-4 text-center">
          <div className="flex justify-center mb-4">
            <TagPill label={dict.about.hero.pill} />
          </div>

          <h1 className="text-[1.65rem] md:text-[1.9rem] lg:text-[2.8rem] leading-[1.1] font-normal text-black mb-5 max-w-lg mx-auto tracking-tight">
            {dict.about.hero.title.text1} <br />
            {dict.about.hero.title.text2}
            <span className="font-extrabold">{dict.about.hero.title.highlight}</span>
          </h1>

          <p className="text-[#00000099] text-[14px] md:text-[15px] max-w-lg mx-auto leading-[1.2]">
            {dict.about.hero.description}
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-4 sm:pb-6 md:pb-2" >
        <div className="relative w-full aspect-video md:aspect-21/9 rounded-[20px] overflow-hidden">
          <Image
            src="/images/about.webp"
            alt="Leadership Team"
            fill
            className="object-cover rounded-[20px]"
            priority
            placeholder={heroBlur ? "blur" : undefined}
            blurDataURL={heroBlur}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-20 md:mt-1 mt-12  bg-white ">
        <div className="mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-start sm:grid-cols-3 lg:grid-cols-5">
            {dict.about.features.map((feature: { icon: string; text: string }) => (
              <div key={feature.text} className="flex flex-col items-start">
                <div className="mb-4 flex h-10 w-10">
                  <Image src={feature.icon} alt="" width={56} height={56} />
                </div>
                <p className="text-sm text-gray-600 max-w-[200px]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Role Section */}
      <section className="relative pt-8 md:py-2 overflow-hidden md:mx-4 bg-white md:bg-transparent">
        {/* Desktop Container */}
        <div className="hidden md:block absolute inset-0 z-0 bg-[#F9FBFC] rounded-[1.5rem] overflow-hidden border border-gray-100/50">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/aboutmid.webp"
              alt="Background"
              fill
              className="object-cover opacity-90"
              placeholder={midBlur ? "blur" : undefined}
              blurDataURL={midBlur}
            />
          </div>
        </div>

        <Container className="relative z-10 px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-stretch pt-8 pb-12">

            {/* Left Column: Title and bottom Description */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start min-h-[500px]">
              <div className="w-full">
                <h2 className="text-[22px] gradient-text md:text-[30px] leading-[1.15] font-normal  tracking-tight max-w-xl">
                  <span className="font-extrabold">{dict.about.role.title.part1}</span>
                  {dict.about.role.title.part2}
                  <span className="font-extrabold">{dict.about.role.title.part3}</span>
                </h2>
              </div>

              {/* Mobile Image and Description Block */}
              <div className="md:hidden relative w-full h-[450px] mt-6 rounded-[2rem] overflow-hidden">
                <Image
                  src="/images/aboutmid.webp"
                  alt="Innovation"
                  fill
                  className="object-cover"
                  placeholder={midBlur ? "blur" : undefined}
                  blurDataURL={midBlur}
                />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-linear-to-t from-black/80 to-transparent">
                  <p className="text-white text-[14px] leading-relaxed max-w-xs">
                    {dict.about.role.description}
                  </p>
                </div>
              </div>

              {/* Desktop Description - Bottom Left */}
              <p className="hidden md:block text-[#00000099] text-sm leading-relaxed max-w-sm">
                {dict.about.role.description}
              </p>
            </div>

            {/* Middle Column: (Empty on desktop to let image show through) */}
            <div className="lg:col-span-4 hidden lg:block"></div>

            {/* Right Column: Pill and vertical Cards */}
            <div className="lg:col-span-4 flex flex-col items-end">
              <div className="w-full max-w-sm lg:max-w-none">
                <div className="flex flex-col items-start  mb-8 md:mb-12">
                  <p className="text-[#045A86] tracking-[1px] text-large font-bold uppercase mb-3">
                    {dict.about.role.pill}
                  </p>
                  <div className="mt-1">
                    <Image
                      src="/images/bar.png"
                      alt="bar"
                      width={80}
                      height={4}
                      className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
                  {dict.about.role.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border md:border-transparent border-black/20 rounded-2xl p-6 md:p-4 flex flex-col justify-between group h-full min-h-[140px] md:min-h-[110px] transition-all hover:shadow-lg"
                    >
                      <div className="w-12 h-12 md:w-10 md:h-10 bg-[#E6EFEA] rounded-lg flex items-center justify-center transition-transform duration-1500 ease-in-out group-hover:rotate-360">
                        <Image
                          src={item.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="object-contain transition-transform duration-1500 ease-in-out group-hover:-rotate-360 md:w-5 md:h-5"
                        />
                      </div>
                      <span className="text-[15px] md:text-[15px] text-[#00000099] font-medium leading-tight tracking-tight mt-4 md:mt-0">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>


      {/* Stats Section */}
      <section className=" md:py-10 bg-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-8 mb-10 md:mb-16">
            {dict.about.stats.items.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-[30px] md:text-[64px] font-bold gradient-text leading-none mb-4" dir="ltr">
                  {stat.value}
                </span>
                <p className="text-[#00000099] text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center px-4 mb-16 md:mb-28">
            <p className="text-[#00000099] text-sm md:text-base leading-[1.3]">
              {dict.about.stats.description}
            </p>
          </div>
        </Container>
      </section>


      {/* Mission, Vision & Why Leadership Section */}
      <Container className="px-4 mb-20">
        <section className="relative pt-13 pb-0 overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/aboutline.png"
              alt=""
              fill
              className="object-cover "
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-start gap-8 px-2 sm:px-8 md:px-16">
            {/* Mission Section */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-[0.8px] mb-4 block">
                {dict.about.missionVision.mission.pill}
              </span>
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/bar.png"
                  alt="bar"
                  width={80}
                  height={4}
                  className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                />
              </div>
              <p className="text-[#00000099] text-[14px] max-w-md md:text-[15px] leading-[1.2] ">
                {dict.about.missionVision.mission.text}
              </p>
            </div>

            {/* Vision & Why Container (White Box) */}
            <div className="w-full max-w-5xl bg-white rounded-[32px]  pt-8 md:pt-12 overflow-hidden flex flex-col items-center">
              {/* Vision section */}
              <div className="text-center mb-12 px-2">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-[0.8px] mb-4 block">
                  {dict.about.missionVision.vision.pill}
                </span>
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/images/bar.png"
                    alt="bar"
                    width={80}
                    height={4}
                    className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                  />
                </div>
                <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.2] max-w-md mx-auto">
                  {dict.about.missionVision.vision.text}
                </p>
              </div>

              {/* Why Leadership Matters Box (Nested) */}
              <div className="w-full bg-[#E6EFEA] max-w-lg rounded-xl p-8 md:p-12 text-center">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-[0.8px] mb-4 block">
                  {dict.about.missionVision.why.pill}
                </span>
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/images/bar.png"
                    alt="bar"
                    width={80}
                    height={4}
                    className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                  />
                </div>
                <p className="text-[#00000099] text-[14px] md:text-[15px] leading-[1.2] max-w-md mx-auto">
                  {dict.about.missionVision.why.text}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <ContactSection
        titleLine1={dict.about.cta.titleLine1}
        titleLine2={dict.about.cta.titleLine2}
        description={dict.about.cta.description}
        button={dict.about.cta.button1}
        button2={dict.about.cta.button2}
        backgroundImage="/images/contactbg.webp "
        blurDataURL={contactBlur}
      />

    </>
  );
}
