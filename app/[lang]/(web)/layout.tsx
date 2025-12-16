import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Container from "../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

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
      <Container className="px-10">
        <Navbar locale={lang} dict={dict} />
      </Container>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
