
import React from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import ContactSection from "../components/ContactSection";
import ProgramCard from "../components/ProgramCard";

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
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
                    {/* Pill Component */}
                    <div className="inline-block bg-[#E3EFF6] border border-[#045A8633] px-4 py-1.5 rounded-full">
                        <span className="text-brand-from text-base font-bold uppercase tracking-wider">
                            {dict.programs.hero.pill}
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className=" text-black whitespace-pre-wrap ">
                        <span className="block text-4xl md:text-[4rem] md:-tracking-[0.1rem] font-extrabold leading-[1] ">
                            {dict.programs.hero.title}
                        </span>
                        <span className="block text-3xl md:text-[3.5rem] max-w-2xl md:-tracking-[0.1rem] leading-[0.9] font-normal ">
                            {dict.programs.hero.subtitle}
                        </span>
                    </h1>

                    {/* Subheading Description */}
                    <p className="max-w-xl text-base  md:text-lg text-[#00000099] leading-[1.3] whitespace-pre-wrap">
                        {dict.programs.hero.description}
                    </p>
                </div>
            </section>

            {/* programs section */}
            <section className="bg-white pb-20 px-4 space-y-8">
                {dict.programs.items?.map((item, index) => (
                    <ProgramCard
                        key={item.id}
                        item={item}
                        reversed={index % 2 === 0} // Index 0 (First): Image Left. Index 1 (Second): Image Right.
                    />
                ))}
            </section>

            {/* contact section  */}
            <ContactSection lang={lang} />
        </>
    );
}
