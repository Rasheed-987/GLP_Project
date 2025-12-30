"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/Container";
import type { Locale } from "../../../../lib/i18n/config";
import { usePathname } from "next/navigation";

type FooterProps = {
    locale: Locale;
    dict?: any; // We'll infer/use specific type if available, but dict is usually large.
};

export default function Footer({ locale, dict }: FooterProps) {
    const pathname = usePathname();
    return (
        <footer className="bg-white pt-6 pb-8">
            <Container className="px-4">
                <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 mb-4 md:mb-8">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-start gap-6 max-w-sm">
                        <div className="inline-block">
                            <Image
                                src="/images/logo2.png"
                                alt="UGLP"
                                width={120}
                                height={60}
                                className="h-auto w-auto max-w-full"
                            />
                        </div>


                        <p className="text-gray-500 text-[14px] md:text-[15px] max-w-[14rem] leading-[1.2]">

                            {dict.footer.description}
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex gap-x-24 md:ml-24">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-2">
                            <Link href={`/${locale}/programs`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/programs` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.programmes}
                            </Link>
                            <Link href={`/${locale}/approach`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/approach` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.approach}
                            </Link>
                            <Link href={`/${locale}/partnership`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/partnership` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.partnership}
                            </Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-2">
                            <Link href={`/${locale}/alumni`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/alumni` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.alumni}
                            </Link>
                            <Link href={`/${locale}/resources`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/resources` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.resources}
                            </Link>
                            <Link href={`/${locale}/about`} className={`font-semibold transition-colors text-[13px] md:text-[15px] ${pathname === `/${locale}/about` ? 'gradient-text' : 'text-black hover:text-brand-blue'}`}>
                                {dict.nav.about || 'About'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-3 md:pt-5 border-t border-gray-300 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 text-xs md:text-sm  text-black/80 font-semibold">
                    <p>{dict.footer.copyright}</p>
                    <div className="flex gap-6">
                        <Link href={`/${locale}/privacy`} className="hover:text-black transition-colors">
                            {dict.footer.privacyPolicy}
                        </Link>
                        <Link href={`/${locale}/terms`} className="hover:text-black transition-colors">
                            {dict.footer.termsOfService}
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
