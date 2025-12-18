import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Container from "../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

import Footer from "./components/Footer";

export default async function WebLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Container className="px-4">
        <TopBar locale={lang} dict={dict} />
      </Container>
      <div className="relative">
        <header className="absolute top-0 left-0 right-0 z-20 w-full">
          <Container className="px-10">
            <Navbar locale={lang} dict={dict} />
          </Container>
        </header>
        <Container>
          <main>{children}</main>
        </Container>

        <Footer locale={lang} dict={dict} />
      </div>
    </>
  );
}
