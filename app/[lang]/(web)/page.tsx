import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <div className="py-8">
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold mb-4">{dict.home.title}</h1>
          <p className="text-lg text-zinc-600">{dict.home.description}</p>
        </div>
      </div>
    </div>
  );
}
