
import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/Container";
import type { Locale } from "@/lib/i18n/config";

type FooterProps = {
    locale: Locale;
    dict?: any; // We'll infer/use specific type if available, but dict is usually large.
};

export default function Footer({ locale, dict }: FooterProps) {
    return (
        <footer className="bg-white pt-6 pb-8">
            <Container className="px-4">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
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

                        <p className="text-gray-500 text-[15px] max-w-56 leading-[1.2]">
                            {dict.footer.description}
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex gap-x-24 md:ml-24">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-2">
                            <Link href={`/${locale}/programs`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px] ">
                                {dict.nav.programmes}
                            </Link>
                            <Link href={`/${locale}/approach`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px]">
                                {dict.nav.approach}
                            </Link>
                            <Link href={`/${locale}/partnership`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px]">
                                {dict.nav.partnership}
                            </Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-2">
                            <Link href={`/${locale}/alumni`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px]">
                                {dict.nav.alumni}
                            </Link>
                            <Link href={`/${locale}/resources`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px]">
                                {dict.nav.resources}
                            </Link>
                            <Link href={`/${locale}/about`} className="text-black font-semibold hover:text-brand-from transition-colors text-[15px]">
                                {dict.nav.about || 'About'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-5 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-sm  text-black/80 font-semibold">
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
