import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import Image from "next/image";
import Container from "../../../../app/components/Container";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <>
            <section className="bg-white min-h-screen py-20 lg:py-24">
                <Container className="px-4">
                    <div className="relative w-full rounded-[1rem] md:rounded-[2rem] overflow-hidden flex items-stretch bg-[#006251] aspect-auto landscape:aspect-[2.4/1] min-h-0 md:min-h-[650px]">
                        <Image
                            src="/images/contactbackground.webp"
                            alt="Contact Background"
                            fill
                            className="hidden md:block object-cover z-0"
                            priority
                        />
                        {/* Background Image Mobile */}
                        <Image
                            src="/images/contactmblbackground.webp"
                            alt="Contact Background"
                            fill
                            className="block md:hidden object-cover z-0"
                            priority
                        />

                        {/* Men Image Overlay */}
                        <div className={`absolute left-[50%] -translate-x-1/2 md:translate-x-0 bottom-[50%] w-full h-[60%] md:bottom-0 md:w-[80%] md:h-[80%] z-0 pointer-events-none md:-mb-4 ${isRtl ? 'md:right-[-2px] md:-mr-8' : 'md:left-[-2px] md:-ml-8'}`}>
                            <Image
                                src="/images/contactmen.webp"
                                alt="Contact Team"
                                fill
                                className={`object-contain object-bottom ${isRtl ? 'md:object-right' : 'md:object-left'}`}
                                priority
                            />
                        </div>

                        <div className="relative z-10 w-full p-4 md:p-4 lg:p-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16">
                            {/* Left Content: Heading, Description & Info */}
                            <div className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
                                {/* Heading & Description Row */}
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start">
                                    <h1 className=" flex-1/6 text-white text-[1.35rem] md:text-[2.2rem] lg:text-[1.8rem] leading-[1.05] lg:flex-[1.5]">
                                        <span className="font-normal block mb-1">{dict.contactPage.hero.title.text1}</span>
                                        <span className="font-extrabold">{dict.contactPage.hero.title.highlight1}</span>
                                    </h1>
                                    <p className="flex-1 text-white text-[14px] leading-[1.4]  md:leading-[1.3] lg:flex-1 lg:max-w-lg ">
                                        {dict.contactPage.hero.description}
                                    </p>
                                </div>

                                {/* Info Icons Below */}
                                <div className="px-7  ">
                                    <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center w-full justify-between gap-1">
                                        <div className="flex items-center gap-2 text-white">
                                            <div className="md:w-4 md:h-4 h-5 w-5 relative flex-shrink-0">
                                                <Image src="/images/phone.png" alt="Phone" fill className="object-contain invert brightness-0" />
                                            </div>
                                            <span className="text-[14px] font-medium whitespace-nowrap">{dict.contactPage.hero.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <div className="md:w-4 md:h-4 h-5 w-5 relative flex-shrink-0">
                                                <Image src="/images/pin.png" alt="Location" fill className="object-contain invert brightness-0" />
                                            </div>
                                            <span className="text-[14px] font-medium whitespace-nowrap">{dict.contactPage.hero.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <div className="md:w-4 md:h-4 h-5 w-5 relative flex-shrink-0">
                                                <Image src="/images/email.png" alt="Email" fill className="object-contain invert brightness-0" />
                                            </div>
                                            <span className="text-[14px] font-medium whitespace-nowrap">{dict.contactPage.hero.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for Mobile Image */}
                                <div className="h-[250px] md:hidden w-full"></div>

                            </div>

                            {/* Right Column: Form Card */}
                            <div className="w-full lg:w-[470px] bg-white rounded-[1rem] p-4 md:p-10 lg:p-9  self-center">
                                <h2 className="gradient-text text-[22px] md:text-[1.5rem] leading-[1.1] text-center mb-10">
                                    <span className="font-normal block mb-1">{dict.contactPage.form.title}</span>
                                    <span className="font-extrabold block">{dict.contactPage.form.titleHighlight}</span>
                                </h2>

                                <form className="space-y-4">
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder={dict.contactPage.form.name}
                                            className="w-full px-4 py-2 rounded-full border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#038174]/20 transition-all font-medium text-[14px]"
                                        />
                                        <input
                                            type="email"
                                            placeholder={dict.contactPage.form.email}
                                            className="w-full px-4 py-2 rounded-full border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#038174]/20 transition-all font-medium text-[14px]"
                                        />
                                        <input
                                            type="tel"
                                            placeholder={dict.contactPage.form.phone}
                                            className="w-full px-4 py-2 rounded-full border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#038174]/20 transition-all font-medium text-[14px]"
                                        />
                                        <Dropdown
                                            options={dict.contactPage.form.interests}
                                            placeholder={dict.contactPage.form.interest}
                                        />
                                        <textarea
                                            placeholder={dict.contactPage.form.message}
                                            rows={4}
                                            className="w-full px-4 py-2 rounded-[1.5rem] border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#038174]/20 transition-all resize-none font-medium text-[14px]"
                                        />
                                    </div>
                                    <Button className="w-full py-2  mt-4">
                                        {dict.contactPage.form.submit}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white pb-32">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                        {/* Left Column: Texts Content */}
                        <div className="lg:max-w-md">
                            <h2 className="text-3xl md:text-3xl gradient-text  leading-[1.1] mb-8">
                                <span className="">{dict.home.nomination.title}</span> <br />
                                <span className="font-bold">{dict.home.nomination.titleHighlight}</span>
                            </h2>
                            <p className="text-[#00000099] text-[15px] leading-[1.1] md:mb-16">
                                {dict.home.nomination.description}
                            </p>

                            <div className="md:mt-25 mt-10">
                                <h3 className="text-[14px] font-bold tracking-[0.01em] text-[#006A8E] mb-6">
                                    {dict.home.nomination.recommendTitle}
                                </h3>
                                <div className="space-y-4 max-w-xs">
                                    {dict.home.nomination.recommendList.map((item: { icon: string; text: string }, i: number) => (
                                        <div key={i} className="flex gap-5 items-start">
                                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                                <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
                                            </div>
                                            <p className="text-[#00000099] text-[14px] leading-[1.1]">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Nomination Form */}
                        <div className="bg-[#E9F1EE] rounded-[18px] p-4 md:p-8">
                            <form className="space-y-3">
                                <div>
                                    <h4 className="text-[14px] font-bold tracking-[0.01em] text-brand-blue mb-2">
                                        {dict.home.nomination.form.yourDetails}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder={dict.home.nomination.form.fullName}
                                            className="w-full px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder={dict.home.nomination.form.organization}
                                            className="w-full px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder={dict.home.nomination.form.email}
                                        className="w-full mt-4 px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-[14px] font-bold tracking-[0.01em] text-brand-blue mb-2 mt-6">
                                        {dict.home.nomination.form.nomineeDetails}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder={dict.home.nomination.form.nomineeName}
                                            className="w-full px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                        />
                                        <input
                                            type="text"
                                            placeholder={dict.home.nomination.form.nomineeOrg}
                                            className="w-full px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder={dict.home.nomination.form.nomineeEmail}
                                        className="w-full mt-4 px-4 py-2.5 rounded-full  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                    />
                                    <textarea
                                        placeholder={dict.home.nomination.form.reason}
                                        rows={4}
                                        className="w-full mt-4 px-4 py-2.5 rounded-[1rem]  border border-[#00000033] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 resize-none"
                                    />
                                </div>

                                <Button className="w-full py-3 mt-5">
                                    {dict.home.nomination.form.submit}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
