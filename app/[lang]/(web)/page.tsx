import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Hero from "./components/Hero";

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Hero
      title={dict.home.title}
      description={dict.home.description}
      backgroundImage="/images/home1.png"
      buttons={{
        primary: {
          text: dict.nav.programmes,
          href: `/${lang}/programmes`,
        },
        secondary: {
          text: dict.nav.partnership,
          href: `/${lang}/partnership`,
        },
      }}
    />
  );
}

