import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Hero from "./components/Hero";
import Image from "next/image";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const programs = dict.programs.items.slice(0, 3);
  const images = ["/images/homemid1.png", "/images/homemid2.png", "/images/homemid3.png"];

  return (
    <>
      <div className="px-4 ">
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
      </div>
      <div className="py-12 bg-white sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-6">
            {dict.home.features.map((feature) => (
              <div key={feature.text} className="flex flex-col items-center">
                <div className="mb-4 flex h-15 w-15 ">
                  <Image src={feature.icon} alt="" width={56} height={56} />
                </div>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-2">
                    <Image src="/images/bar.png" alt="bar" width={2} height={16} />
                    <p className="font-semibold text-brand-green">{dict.home.about.pill}</p>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold text-gray-900">{dict.home.about.title}</h2>
                </div>
                <p className="text-gray-600 lg:mt-12">{dict.home.about.description}</p>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {programs.map((program, index) => (
                  <div key={program.title} className="relative rounded-2xl overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={program.title}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-xs font-semibold uppercase mb-2 opacity-90">{program.tag}</p>
                      <h3 className="text-xl font-bold">{program.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


      
    </>
  );
}

