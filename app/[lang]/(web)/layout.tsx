import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Container from "../../components/Container";
import { getDictionary } from "../../../lib/i18n/dictionaries";
import type { Locale } from "../../../lib/i18n/config";

import Footer from "./components/Footer";

export default async function WebLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <div className="sticky top-0  mb-1 z-[100] bg-white">
        <Container className="px-4 mb-1">
          <TopBar locale={locale} dict={dict} />
        </Container>
      </div>
      <div className="relative">
        <header
          className="fixed left-0 right-0 z-50 w-full"
          style={{ top: 'var(--topbar-height, 52px)' }}
        >
          <Container className="">
            <Navbar locale={locale} dict={dict} />
          </Container>
        </header>
        <Container>
          <main>{children}</main>
        </Container>

        <Footer locale={locale} dict={dict} />
      </div>
    </>
  );
}
