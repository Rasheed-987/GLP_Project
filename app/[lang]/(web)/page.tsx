import { getDictionary } from "../../../lib/i18n/dictionaries";
import type { Locale } from "../../../lib/i18n/config";
import Hero from "./components/Hero";
import Button from "./components/Button";
import Image from "next/image";
import Link from "next/link";
import DynamicCarousel from "./components/DynamicCarousel";
import ContactSection from "./components/ContactSection";
import PartnersMarquee from "./components/PartnersMarquee";
import InteractiveProgramCard from "./components/InteractiveProgramCard";
import NominationForm from "./components/NominationForm";
import Container from "../../../app/components/Container";
import { getImageBlur } from "../../../lib/image";
import { getBaseUrl } from "../../../lib/getBaseUrl";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const programs = dict.programs.items.slice(0, 3);

  // Generate blurs for main images
  const heroBlur = await getImageBlur("/images/home1.webp");
  const shiekhBlur = await getImageBlur("/images/shiekh.webp");
  const bottomImageBlur = await getImageBlur("/images/homebottom.webp");
  const cardBgBlur = await getImageBlur("/images/gb.webp");

  const foregroundImages = ["/images/homecenter1.png", "/images/homecenter2.png", "/images/homecenter3.png"];
  const foregroundBlurs = await Promise.all(
    foregroundImages.map((img) => getImageBlur(img))
  );

  return (
    <>
      {/* Hero Section: Main introduction with primary call-to-action */}
      <div className="px-4 ">
        <Hero
          lang={lang}
          title={{
            prefix: dict.home.hero.titlePrefix,
            highlight: dict.home.hero.titleHighlight,
            suffix: dict.home.hero.titleSuffix,
          }}
          description={dict.home.description}
          backgroundImage="/images/home1.webp"
          blurDataURL={heroBlur}
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
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {dict.home.features.map((feature) => (
              <div key={feature.text} className="flex flex-col items-start">
                <div className="mb-3 flex h-11 w-11 items-center justify-center shrink-0">
                  <Image src={feature.icon} alt="" width={44} height={44} className="object-contain" />
                </div>
                <p className="text-sm 2xl:text-base text-[#00000099] text-start md:text-center">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* About & Programs Section: Detailed introduction to GLP and preview of available programs */}
      <section className=" pb-7 md:pb-16 md:pt-16 bg-white">
        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12">
            <div>
              <div className="flex flex-col items-start gap-2 mb-2">
                <p className="text-xs 2xl:text-base font-bold mb-1 tracking-widest bg-brand-gradient bg-clip-text text-transparent uppercase leading-none">
                  {dict.home.about.pill}
                </p>
                <div className="mb-3">
                  <Image
                    src="/images/bar.png"
                    alt="bar"
                    width={80}
                    height={4}
                    className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                  />
                </div>
              </div>
              <h2 className="mt-3 md:mt-4 text-[24px] md:text-[28px] leading-tight font-normal">
                <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                  <span className={lang === "ar" ? "font-extrabold" : "font-bold"}>{dict.home.about.title.part1}</span>
                  {dict.home.about.title.part2}
                  <span className={lang === "ar" ? "font-extrabold" : "font-bold"}>{dict.home.about.title.part3}</span>
                  {dict.home.about.title.part4}
                </span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-[500px] lg:justify-self-end  lg:mt-12">{dict.home.about.description}</p>
          </div>
          <div className="md:mt-12 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program, index) => {
              const isInteractive = index < 3;

              return (
                <InteractiveProgramCard
                  key={program.title}
                  program={program}
                  isInteractive={isInteractive}
                  foregroundImage={foregroundImages[index]}
                  backgroundBlur={cardBgBlur}
                  foregroundBlur={foregroundBlurs[index]}
                  index={index}
                  dict={dict}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Programs CTA Section: Direct link to the full programs list */}
      <section className="bg-white pb-16 min-w-full md:w-fit">
        <div className="flex justify-center min-w-full md:w-fit px-4">
          <Link href={`/${lang}/programmes`} className="w-full md:w-fit">
            <Button className="w-full bg-brand-green!">{dict.approach.contact.button}</Button>
          </Link>
        </div>
      </section>

      <section className="bg-white pb-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="bg-[#E6EFEA] md:rounded-[32px] rounded-[24px] px-6 py-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content: Quote and Author */}
            <div className="contents lg:flex lg:w-7/12 flex-col lg:self-stretch lg:justify-between order-1 lg:order-2">
              <div className="flex flex-col justify-start   order-1">
                <div className="mb-3">
                  <Image
                    src={lang === "ar" ? "/images/arabicqoute.png" : "/images/englishqoute.png"}
                    alt="quote"
                    width={8}
                    height={8}
                    className="w-3 h-auto"
                  />
                </div>
                <p className="text-[24px] md:text-[30px] leading-tight font-normal md:mb-8">
                  <span className="gradient-text">
                    {dict.home.quote.text}
                    <span className={lang === "ar" ? "font-extrabold" : "font-bold"}>{dict.home.quote.highlight}</span>
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start lg:mb-0 order-3 lg:order-2">
                <div className="mb-3">
                  <Image
                    src="/images/bar.png"
                    alt="bar"
                    width={80}
                    height={4}
                    className={`w-20 h-auto ${lang === "ar" ? "scale-x-[-1]" : ""}`}
                  />
                </div>
                <p className="text-xs md:text-sm font-bold tracking-[0.8px] text-[#006A8E] uppercase text-start">
                  {dict.home.quote.author}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full lg:w-5/12 flex justify-center lg:justify-end order-2 lg:order-1">
              <Image
                src="/images/shiekh.webp"
                alt="H.H. Sheikh Mohammed Bin Rashid Al Maktoum"
                width={500}
                height={600}
                className="object-contain"
                placeholder={shiekhBlur ? "blur" : undefined}
                blurDataURL={shiekhBlur}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Testimonials Section: Carousel displaying success stories from previous graduates */}
      <section className="bg-white pb-7 md:pb-32">

        <Container className="flex flex-col items-start gap-2 mb-6 px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest bg-brand-gradient bg-clip-text text-transparent uppercase leading-none">
            {dict.home.alumni.pill}
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
        </Container>
        <div className="">
          <DynamicCarousel lang={lang} graduateLabel={dict.home.alumni.graduateLabel} />
        </div>
      </section>

      {/* Alumni Stories CTA Section: Link to view all alumni stories */}
      <section className="bg-white pb-32 min-w-full md:w-fit">
        <div className="flex justify-center min-w-full md:w-fit px-7">
          <Link href={`/${lang}/alumni`} className="min-w-full md:w-fit">
            <Button className="bg-brand-green! min-w-full md:w-fit">{dict.home.alumni.graduatesStories}</Button>
          </Link>
        </div>
      </section>
      {/* Nomination Section: Information and form for recommending potential leaders */}
      <section className="bg-white pb-32">
        <div className="mx-auto px-6 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left Column: Text Content */}
            <div className="lg:max-w-md">
              <div className="leading-[1.1] mb-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  <span className="gradient-text">
                    {dict.home.nomination.title}
                  </span>
                </h2>
                <h2 className={`text-xl md:text-3xl ${lang === "ar" ? "font-extrabold" : "font-extrabold"}`}>
                  <span className="gradient-text">
                    {dict.home.nomination.titleHighlight}
                  </span>
                  {/* commet */}
                </h2>
              </div>
              <p className="text-[#6B7280] text-base leading-[1.2] mb-10">
                {dict.home.nomination.description}
              </p>



              <div className="lg:mt-32">
                <h3 className="text-[12px] font-bold tracking-[0.1em] text-[#006A8E] mb-6">
                  {dict.home.nomination.recommendTitle}
                </h3>
                <div className="space-y-5">
                  {dict.home.nomination.recommendList.map((item: { icon: string; text: string }, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                        <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
                      </div>
                      <p className="text-[#4B5563] text-[15px] leading-[1.2]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Nomination Form */}
            <div className="bg-[#E6EFEA] rounded-[24px] p-6 md:p-10">
              <NominationForm dict={dict.home.nomination.form} />
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Recognition Section: Showcasing strategic partners and media presence */}
      <section className="bg-white pb-5 md:pb-32">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column: Partners Content */}
            <div className="bg-[#E9F1EE] p-5 md:p-16 flex rounded-[24px] md:rounded-0 flex-col justify-between">
              <div>
                <div className="flex flex-col items-start gap-2 mb-8">
                  <p className="text-xs font-bold tracking-widest bg-brand-gradient bg-clip-text text-transparent uppercase leading-none">
                    {dict.home.partners.pill}
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

                <h2 className="text-[24px] md:text-[30px] leading-tight font-normal">
                  <span className="bg-brand-gradient bg-clip-text text-transparent inline-block">
                    {dict.home.partners.title}{" "}
                    <span className={lang === "ar" ? "font-extrabold" : "font-bold"}>{dict.home.partners.titleHighlight}</span>
                    {dict.home.partners.titleSuffix}
                  </span>
                </h2>
              </div>

              <div className="mt-20">
                <p className="text-[13px] text-[#4B5563]/70 mb-8">
                  {dict.home.partners.subTitle}
                </p>
                <PartnersMarquee>
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
                </PartnersMarquee>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative h-[500px] lg:h-auto overflow-hidden rounded-[24px] md:rounded-[32px]">
              <Image
                src="/images/homebottom.webp"
                alt="Meeting"
                fill
                className="object-cover"
                placeholder={bottomImageBlur ? "blur" : undefined}
                blurDataURL={bottomImageBlur}
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

