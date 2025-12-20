import React from 'react';
import Image from 'next/image';
import Container from '@/app/components/Container';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import TagPill from '../components/TagPill';
import ContactSection from '../components/ContactSection';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="px-4 text-center">
          <div className="flex justify-center mb-8">
            <TagPill label={dict.about.hero.pill} />
          </div>
          
          <h1 className="text-[42px] md:text-[64px] lg:text-[80px] leading-[1.05] font-normal text-black mb-10 max-w-5xl mx-auto tracking-tight">
            {dict.about.hero.title.text1} <br />
            {dict.about.hero.title.text2}
            <span className="font-bold">{dict.about.hero.title.highlight}</span>
          </h1>
          
          <p className="text-[#00000099] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {dict.about.hero.description}
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="relative w-full aspect-video md:aspect-21/9 rounded-[32px] overflow-hidden">
          <Image
            src="/images/about.png"
            alt="Leadership Team"
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white sm:py-16">
        <div className="mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-5">
            {dict.about.features.map((feature: { icon: string; text: string }) => (
              <div key={feature.text} className="flex flex-col items-center">
                <div className="mb-4 flex h-15 w-15">
                  <Image src={feature.icon} alt="" width={56} height={56} />
                </div>
                <p className="text-sm text-gray-600 max-w-[200px]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Role Section */}
      <section className="relative py-8 md:py-12 overflow-hidden md:mx-4 bg-white md:bg-transparent">
        {/* Desktop Container */}
        <div className="hidden md:block absolute inset-0 z-0 bg-[#F9FBFC] rounded-[2rem] overflow-hidden border border-gray-100/50">
          <div className="relative w-full h-full flex items-center justify-center">
             <Image
              src="/images/aboutmid.png"
              alt="Background"
              fill
              className="object-cover opacity-90"
            />
          </div>
        </div>

        <Container className="relative z-10 px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-stretch pt-8 pb-12">
            
            {/* Left Column: Title and bottom Description */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start min-h-[500px]">
              <div className="w-full">
                <h2 className="text-[28px] md:text-[32px] leading-[1.15] font-normal text-[#045A86] tracking-tight max-w-sm">
                  {dict.about.role.title}
                </h2>
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
                   <div className="w-16 h-[2px] bg-[#045A8633] overflow-hidden rounded-full">
                      <div className="w-1/2 h-full bg-[#185a84]"></div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
                  {dict.about.role.items.map((item: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-gray-100 rounded-3xl p-6 md:p-4 flex flex-col justify-between group h-full min-h-[140px] md:min-h-[110px] transition-all hover:shadow-lg"
                    >
                      <div className="w-12 h-12 md:w-10 md:h-10 bg-[#E6F0F5] rounded-lg flex items-center justify-center transition-transform duration-1500 ease-in-out group-hover:rotate-360">
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

            {/* Mobile Image and Description Block */}
            <div className="md:hidden relative w-full h-[450px] mt-6 rounded-[2rem] overflow-hidden">
              <Image
                src="/images/aboutmid.png"
                alt="Innovation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white text-[14px] leading-relaxed max-w-xs">
                  {dict.about.role.description}
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>
    
    
      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-8 mb-20 md:mb-32">
            {dict.about.stats.items.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-[48px] md:text-[64px] font-bold text-[#045A86] leading-none mb-4">
                  {stat.value}
                </span>
                <p className="text-[#00000099] text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center px-4">
            <p className="text-[#00000099] text-sm md:text-base leading-relaxed md:leading-loose">
              {dict.about.stats.description}
            </p>
          </div>
        </Container>
      </section>


      {/* Mission, Vision & Why Leadership Section */}
      <Container className="px-4 mb-20">
        <section className="relative pt-13 pb-1 overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/aboutline.png"
              alt=""
              fill
              className="object-cover opacity-50"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-start gap-8 px-8 md:px-16">
            {/* Mission Section */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2 block">
                {dict.about.missionVision.mission.pill}
              </span>
              <div className="w-16 h-1 bg-brand-blue/20 rounded-full mx-auto mb-6 flex">
                <div className="w-1/2 h-full bg-brand-blue rounded-full"></div>
              </div>
              <p className="text-[#00000099] text-base md:text-lg leading-relaxed">
                {dict.about.missionVision.mission.text}
              </p>
            </div>

            {/* Vision & Why Container (White Box) */}
            <div className="w-full max-w-5xl bg-white rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col items-center">
              {/* Vision section */}
              <div className="text-center mb-12">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2 block">
                  {dict.about.missionVision.vision.pill}
                </span>
                <div className="w-16 h-1 bg-brand-blue/20 rounded-full mx-auto mb-6 flex">
                  <div className="w-1/2 h-full bg-brand-blue rounded-full"></div>
                </div>
                <p className="text-[#00000099] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  {dict.about.missionVision.vision.text}
                </p>
              </div>

              {/* Why Leadership Matters Box (Nested) */}
              <div className="w-full max-w-4xl bg-[#E6EFEA] rounded-[32px] p-8 md:p-12 text-center">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2 block">
                  {dict.about.missionVision.why.pill}
                </span>
                <div className="w-16 h-1 bg-brand-blue/20 rounded-full mx-auto mb-6 flex">
                  <div className="w-1/2 h-full bg-brand-blue rounded-full"></div>
                </div>
                <p className="text-[#00000099] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
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
        backgroundImage="/images/contactbg.png"
      />

    </>
  );
}
