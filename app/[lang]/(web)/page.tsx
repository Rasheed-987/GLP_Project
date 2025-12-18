import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Hero from "./components/Hero";
import Button from "./components/Button";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";
import ContactSection from "./components/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const programs = dict.programs.items.slice(0, 3);

  return (
    <>
      <div className="px-4 ">
        <Hero
          title={{
             prefix: dict.home.hero.titlePrefix,
             highlight: dict.home.hero.titleHighlight,
             suffix: dict.home.hero.titleSuffix,
          }}
          description={dict.home.description}
          backgroundImage="/images/home1.png"
          buttons={{
            primary: {
              text: dict.nav.programmes,
              href: `/${lang}/programmes`,
            },
            secondary: {
              text: dict.nav.partnership,
              href: `/${lang}/partnership`,
            },
          }}
        />
      </div>
      <div className="py-12 bg-white sm:py-16">
        <div className="mx-auto  px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-6">
            {dict.home.features.map((feature) => (
              <div key={feature.text} className="flex flex-col items-center">
                <div className="mb-4 flex h-15 w-15 ">
                  <Image src={feature.icon} alt="" width={56} height={56} />
                </div>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
        <section className="py-16 bg-white">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex flex-col items-start gap-2 mb-2">
                    <p className="text-xs font-bold tracking-widest bg-brand-gradient bg-clip-text text-transparent uppercase leading-none">
                      {dict.home.about.pill}
                    </p>
                    <div className="mt-1">
                      <Image src="/images/bar.png" alt="bar" width={80} height={4} className="w-20 h-auto" />
                    </div>
                  </div>
                  <h2 className="mt-4 text-[28px] md:text-[32px] leading-tight font-normal">
                    <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                      <span className="font-bold">{dict.home.about.title.part1}</span>
                      {dict.home.about.title.part2}
                      <span className="font-bold">{dict.home.about.title.part3}</span>
                      {dict.home.about.title.part4}
                    </span>
                  </h2>
                </div>
                <p className="text-gray-600 max-w-[500px] lg:mt-12">{dict.home.about.description}</p>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((program, index) => {
                  const isInteractive = index < 2;
                  const foregroundImages = ["/images/homecenter1.png", "/images/homecenter2.png", "/images/homecenter3.png"];
                  
                  return (
                    <div key={program.title} className="group relative rounded-[32px] overflow-hidden aspect-4/5 lg:aspect-3/4 bg-brand-green">
                      {/* Background Pattern */}
                      <Image
                        src="/images/gb.png"
                        alt=""
                        fill
                        className="object-cover"
                      />
                      
                      {/* Foreground Image */}
                      <div className="absolute inset-0 z-10">
                        <Image
                          src={foregroundImages[index]}
                          alt={program.title}
                          fill
                          className={`object-contain object-bottom-right pointer-events-none transition-transform duration-500 ease-out ${isInteractive ? 'group-hover:scale-105' : ''}`}
                        />
                      </div>
                      
                      {/* Overlays for text readability */}
                      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent h-1/2" />
                      <div className={`absolute inset-0 z-20 bg-linear-to-t from-black/80 via-transparent transition-opacity duration-500 ${isInteractive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

                      {/* Content (Pill, Title, and Description) */}
                      <div className="absolute inset-0 z-30 p-8 flex flex-col pointer-events-none">
                        <div className="mb-4">
                          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                            {program.tag}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-[90%]">
                          {program.title}
                        </h3>
                        
                        <div className={`mt-auto transition-all duration-500 transform ${isInteractive ? 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0' : 'opacity-100 translate-y-0'}`}>
                          <p className="text-white/90 text-sm leading-relaxed max-w-[95%]">
                            {program.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        <section className="bg-white pb-16">
            <div className="flex justify-center">
                <Link href={`/${lang}/programmes`}>
                    <Button className="bg-brand-green!">{dict.approach.contact.button}</Button>
                </Link>
            </div>
        </section>
        
        <section className="bg-white pb-32">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="bg-[#E6EFEA] rounded-[32px] px-6 py-12 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                     <div className="relative w-full lg:w-5/12 flex justify-center lg:justify-end">
                        <Image 
                            src="/images/shiekh.png" 
                            alt="H.H. Sheikh Mohammed Bin Rashid Al Maktoum" 
                            width={500} 
                            height={600}
                            className="object-contain drop-shadow-xl"
                        />
                     </div>
                     <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <p className="text-4xl md:text-5xl text-brand-green font-serif mb-6">&quot;</p>
                        <p className="text-[28px] md:text-[36px] leading-tight font-normal mb-8">
                            <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                                {dict.home.quote.text}
                                <span className="font-bold">{dict.home.quote.highlight}</span>
                            </span>
                        </p>
                         <div>
                            <div className="h-1 w-10 bg-brand-dark-blue mb-4"></div>
                            <p className="text-xs md:text-sm font-bold tracking-widest text-brand-dark-blue uppercase">
                                {dict.home.quote.author}
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        <section className="bg-white pb-32">
            <div className="">
                <Carousel items={dict.home.alumni.items} lang={lang} />
            </div>
        </section>

        <section className="bg-white pb-32">
            <div className="flex justify-center">
                <Link href={`/${lang}/alumni`}>
                    <Button className="bg-brand-green!">{dict.home.alumni.graduatesStories}</Button>
                </Link>
            </div>
        </section>
        <section className="bg-white pb-32">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Text Content */}
                    <div className="lg:max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-8">
                            <span className="text-[#006A8E]">{dict.home.nomination.title}</span> <br />
                            <span className="text-[#003B4F]">{dict.home.nomination.titleHighlight}</span>
                        </h2>
                        <p className="text-[#6B7280] text-lg leading-relaxed mb-16">
                            {dict.home.nomination.description}
                        </p>

                        <div className="mt-25">
                            <h3 className="text-[13px] font-bold tracking-[0.1em] text-[#006A8E] mb-10">
                                {dict.home.nomination.recommendTitle}
                            </h3>
                            <div className="space-y-8">
                                {dict.home.nomination.recommendList.map((item: { icon: string; text: string }, i: number) => (
                                    <div key={i} className="flex gap-5 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                                            <Image src={item.icon} alt="" width={24} height={24} className="object-contain" />
                                        </div>
                                        <p className="text-[#4B5563] text-[17px] leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Nomination Form */}
                    <div className="bg-[#E9F1EE] rounded-[32px] p-8 md:p-12">
                        <form className="space-y-5">
                            <div>
                                <h4 className="text-xs font-bold tracking-widest text-brand-dark-blue mb-6">
                                    {dict.home.nomination.form.yourDetails}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder={dict.home.nomination.form.fullName}
                                        className="w-full px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder={dict.home.nomination.form.organization}
                                        className="w-full px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder={dict.home.nomination.form.email}
                                    className="w-full mt-4 px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                />
                            </div>

                            <div>
                                <h4 className="text-xs font-bold tracking-widest text-brand-dark-blue mb-6">
                                    {dict.home.nomination.form.nomineeDetails}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder={dict.home.nomination.form.nomineeName}
                                        className="w-full px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder={dict.home.nomination.form.nomineeOrg}
                                        className="w-full px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder={dict.home.nomination.form.nomineeEmail}
                                    className="w-full mt-4 px-6 py-4 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                />
                                <textarea 
                                    placeholder={dict.home.nomination.form.reason}
                                    rows={4}
                                    className="w-full mt-4 px-6 py-4 rounded-[20px] bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 resize-none"
                                />
                            </div>

                            <button className="w-full py-5 rounded-full bg-gradient-to-r from-brand-dark-blue to-brand-green text-white font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                                {dict.home.nomination.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-white pb-32">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column: Partners Content */}
                    <div className="bg-[#E9F1EE] p-8 md:p-16 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col items-start gap-2 mb-8">
                                <p className="text-xs font-bold tracking-widest bg-brand-gradient bg-clip-text text-transparent uppercase leading-none">
                                    {dict.home.partners.pill}
                                </p>
                                <div className="mt-1">
                                    <Image src="/images/bar.png" alt="bar" width={80} height={4} className="w-20 h-auto" />
                                </div>
                            </div>
                            
                            <h2 className="text-[28px] md:text-[36px] leading-tight font-normal">
                                <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                                    {dict.home.partners.title}{" "}
                                    <span className="font-bold">{dict.home.partners.titleHighlight}</span>
                                    {dict.home.partners.titleSuffix}
                                </span>
                            </h2>
                        </div>

                        <div className="mt-20">
                            <p className="text-[14px] text-[#4B5563]/70 mb-8">
                                {dict.home.partners.subTitle}
                            </p>
                            <div className="flex items-center gap-4">
                                {/* Logo Pills with varying opacities to match the design fade effect */}
                                <div className="px-6 py-2.5 rounded-full bg-[#006A8E]/10 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-[#006A8E]/30 tracking-widest uppercase">Logo</span>
                                </div>
                                <div className="px-6 py-2.5 rounded-full bg-[#066480]/60 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                                </div>
                                <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                                </div>
                                <div className="px-6 py-2.5 rounded-full bg-[#066480]/60 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                                </div>
                                <div className="px-6 py-2.5 rounded-full bg-[#006A8E]/10 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-[#006A8E]/30 tracking-widest uppercase">Logo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative h-[500px] lg:h-auto overflow-hidden rounded-[32px]">
                        <Image 
                            src="/images/homebottom.png" 
                            alt="Meeting" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
        <ContactSection 
            titleLine1={dict.home.contact.title1}
            titleLine2={dict.home.contact.title2}
            description={dict.home.contact.description}
            button={dict.home.contact.button1}
            button2={dict.home.contact.button2}
        />
    </>
  );
}

