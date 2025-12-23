import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Hero from "./components/Hero";
import Button from "./components/Button";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";
import ContactSection from "./components/ContactSection";
import Marquee from "react-fast-marquee";
import InteractiveProgramCard from "./components/InteractiveProgramCard";

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
      {/* Hero Section: Main introduction with primary call-to-action */}
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
              text: dict.home.hero.button1,
              href: `/${lang}/programs`,
            },
            secondary: {
              text: dict.home.partnerWithUs,
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
                  <Image src={feature.icon} alt="" width={56} height={46} />
                </div>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* About & Programs Section: Detailed introduction to GLP and preview of available programs */}
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
              <h2 className="mt-4 text-[24px] md:text-[28px] leading-tight font-normal">
                <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                  <span className="font-bold">{dict.home.about.title.part1}</span>
                  {dict.home.about.title.part2}
                  <span className="font-bold">{dict.home.about.title.part3}</span>
                  {dict.home.about.title.part4}
                </span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-[500px] lg:justify-self-end lg:mt-12">{dict.home.about.description}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program, index) => {
              const isInteractive = index < 3;
              const foregroundImages = ["/images/homecenter1.png", "/images/homecenter2.png", "/images/homecenter3.png"];

              return (
                <InteractiveProgramCard
                  key={program.title}
                  program={program}
                  isInteractive={isInteractive}
                  foregroundImage={foregroundImages[index]}
                  index={index}
                  dict={dict}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Programs CTA Section: Direct link to the full programs list */}
      <section className="bg-white pb-16">
        <div className="flex justify-center">
          <Link href={`/${lang}/programmes`}>
            <Button className="bg-brand-green!">{dict.approach.contact.button}</Button>
          </Link>
        </div>
      </section>

      {/* Leadership Quote Section: Inspirational message from H.H. Sheikh Mohammed Bin Rashid Al Maktoum */}
      <section className="bg-white pb-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="bg-[#E6EFEA] rounded-[32px] px-6 py-12 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Mobile: Quote text first */}
            <div className="w-full lg:hidden flex flex-col justify-center order-1">
              <p className="text-3xl md:text-4xl text-brand-green font-serif mb-6">&quot;</p>
              <p className="text-[24px] md:text-[30px] leading-tight font-normal mb-8">
                <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                  {dict.home.quote.text}
                  <span className="font-bold">{dict.home.quote.highlight}</span>
                </span>
              </p>
            </div>

            {/* Image */}
            <div className="relative w-full lg:w-5/12 flex justify-center lg:justify-end order-2 lg:order-1">
              <Image
                src="/images/shiekh.png"
                alt="H.H. Sheikh Mohammed Bin Rashid Al Maktoum"
                width={500}
                height={600}
                className="object-contain drop-shadow-xl"
              />
            </div>

            {/* Desktop: Quote text and author */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center order-3 lg:order-2">
              {/* Desktop only */}
              <div className="hidden lg:block">
                <p className="text-3xl md:text-4xl text-brand-green font-serif mb-6">&quot;</p>
                <p className="text-[24px] md:text-[30px] leading-tight font-normal mb-8">
                  <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                    {dict.home.quote.text}
                    <span className="font-bold">{dict.home.quote.highlight}</span>
                  </span>
                </p>
              </div>

              {/* Mobile: Author at bottom */}
              <div className="w-full lg:hidden">
                <div className="h-1 w-10 bg-[#006A8E] mb-4"></div>
                <p className="text-xs md:text-sm font-bold tracking-widest text-[#006A8E] uppercase">
                  {dict.home.quote.author}
                </p>
              </div>

              {/* Desktop: Author */}
              <div className="hidden lg:block">
                <div className="h-1 w-10 bg-[#006A8E] mb-4"></div>
                <p className="text-xs md:text-sm font-bold tracking-widest text-[#006A8E] uppercase">
                  {dict.home.quote.author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Testimonials Section: Carousel displaying success stories from previous graduates */}
      <section className="bg-white pb-32">
        <div className="">
          <Carousel items={dict.home.alumni.items} lang={lang} />
        </div>
      </section>

      {/* Alumni Stories CTA Section: Link to view all alumni stories */}
      <section className="bg-white pb-32">
        <div className="flex justify-center">
          <Link href={`/${lang}/alumni`}>
            <Button className="bg-brand-green!">{dict.home.alumni.graduatesStories}</Button>
          </Link>
        </div>
      </section>
      {/* Nomination Section: Information and form for recommending potential leaders */}
      <section className="bg-white pb-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Text Content */}
            <div className="lg:max-w-lg">
              <div className="leading-[1.1] mb-6">
                <h2 className="text-lg md:text-xl font-bold">
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {dict.home.nomination.title}
                  </span>
                </h2>
                <h2 className="text-xl md:text-3xl font-bold">
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {dict.home.nomination.titleHighlight}
                  </span>
                  {/* commet */}
                </h2>
              </div>
              <p className="text-[#6B7280] text-base leading-relaxed mb-10">
                {dict.home.nomination.description}
              </p>

              <div className="mt-12">
                <h3 className="text-[12px] font-bold tracking-[0.1em] text-[#006A8E] mb-6">
                  {dict.home.nomination.recommendTitle}
                </h3>
                <div className="space-y-5">
                  {dict.home.nomination.recommendList.map((item: { icon: string; text: string }, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                        <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
                      </div>
                      <p className="text-[#4B5563] text-[15px] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Nomination Form */}
            <div className="bg-[#E9F1EE] rounded-[24px] p-6 md:p-10">
              <form className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold tracking-widest text-brand-blue mb-4">
                    {dict.home.nomination.form.yourDetails}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={dict.home.nomination.form.fullName}
                      className="w-full px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                    />
                    <input
                      type="text"
                      placeholder={dict.home.nomination.form.organization}
                      className="w-full px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder={dict.home.nomination.form.email}
                    className="w-full mt-3 px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold tracking-widest text-brand-blue mb-4">
                    {dict.home.nomination.form.nomineeDetails}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={dict.home.nomination.form.nomineeName}
                      className="w-full px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                    />
                    <input
                      type="text"
                      placeholder={dict.home.nomination.form.nomineeOrg}
                      className="w-full px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder={dict.home.nomination.form.nomineeEmail}
                    className="w-full mt-3 px-5 py-3 rounded-full bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
                  />
                  <textarea
                    placeholder={dict.home.nomination.form.reason}
                    rows={4}
                    className="w-full mt-3 px-5 py-3 rounded-[20px] bg-white/50 border border-black/5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 resize-none text-sm"
                  />
                </div>

                <Button className="w-full py-4 rounded-full tracking-widest uppercase text-sm">
                  {dict.home.nomination.form.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Recognition Section: Showcasing strategic partners and media presence */}
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

                <h2 className="text-[24px] md:text-[30px] leading-tight font-normal">
                  <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                    {dict.home.partners.title}{" "}
                    <span className="font-bold">{dict.home.partners.titleHighlight}</span>
                    {dict.home.partners.titleSuffix}
                  </span>
                </h2>
              </div>

              <div className="mt-20">
                <p className="text-[13px] text-[#4B5563]/70 mb-8">
                  {dict.home.partners.subTitle}
                </p>
                <Marquee speed={50} gradient={true} gradientColor="#E9F1EE" gradientWidth={60} pauseOnHover={true}>
                  <div className="flex items-center gap-4 mx-2">
                    <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                    </div>
                    <div className="px-6 py-2.5 rounded-full bg-[#006A8E] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Logo</span>
                    </div>
                  </div>
                </Marquee>
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
      {/* Final Contact Section: Closing global call-to-action for the entire page */}
      <ContactSection
        titleLine1={dict.home.contact.titleLine1}
        titleLine2={dict.home.contact.titleLine2}
        description={dict.home.contact.description}
        button={dict.home.contact.button}
        button2={dict.home.contact.button2}
      />
    </>
  );
}

