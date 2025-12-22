import React from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import ContactSection from "../components/ContactSection";
import ProgramCard from "../components/ProgramCard";
import TagPill from "../components/TagPill";

export default async function ProgramsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            {/* hero section  */}
            <section className="bg-white pt-20 pb-10 px-4">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 md:space-y-8">
                    {/* Pill Component */}
                    <TagPill label={dict.programs.hero.pill} />


                    {/* Main Heading */}
                    <h1 className="text-black  whitespace-pre-wrap ">
                        <span className="block text-4xl md:text-[4rem] md:-tracking-[0.05rem] font-bold leading-[1] ">
                            {dict.programs.hero.title}
                        </span>
                        <span className="block text-3xl md:text-[3rem] max-w-2xl md:-tracking-[0.05rem] leading-[1]  md:leading-[0.9] font-normal ">
                            {dict.programs.hero.subtitle}
                        </span>
                    </h1>

                    {/* Subheading Description */}
                    <p className="max-w-xl text-sm sm:text-base  md:text-lg text-[#00000099] leading-[1.3] whitespace-pre-wrap">
                        {dict.programs.hero.description}
                    </p>
                </div>
            </section>

            {/* programs section */}
            <section className="bg-white pb-5 sm:pb-10 md:pb-20 px-4 space-y-12">
                {dict.programs.items?.map((item, index) => {
                    const isLast = index === (dict.programs.items?.length ?? 0) - 1;
                    return (
                        <div
                            key={item.id}
                            className={`${isLast ? "relative" : "sticky  top-32"} w-full`}
                            style={{ zIndex: index + 1 }}
                        >
                            <ProgramCard
                                item={item}
                                reversed={index % 2 === 0} // Index 0 (First): Image Left. Index 1 (Second): Image Right.
                            />
                        </div>
                    );
                })}
            </section>

            {/* contact section  */}
            <ContactSection
                titleLine1={dict.programs.contact.titleLine1}
                titleLine2={dict.programs.contact.titleLine2}
                description={dict.programs.contact.description}
                button={dict.programs.contact.button}
            />
        </>
    );
}
