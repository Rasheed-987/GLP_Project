import { getDictionary } from "../../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../../lib/i18n/config";
import Container from "../../../../../app/components/Container";
import Image from "next/image";
import Link from "next/link";
import TagPill from "../../components/TagPill";
import { notFound } from "next/navigation";
import { SmallCard, Article } from "../../resources/components/ArticlesInsightsSection";

export default async function ArticleDetailsPage({
  params,
}: {
  params: Promise<{ lang: Locale; id: string }>;
}) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  let article;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles/${id}?lang=${lang}`, { cache: 'no-store' });
    if (res.ok) {
      article = await res.json();
    }
  } catch (error) {
    console.error("Error fetching article:", error);
  }

  // Fallback to dictionary search
  if (!article) {
    article = dict.article.articles.find((a: any) => a.id === id || a.slug === id) || dict.article.articles[0];
  }

  if (!article) return notFound();

  const displayArticle = {
    ...article,
    title: article.title,
    excerpt: article.subtitle || article.excerpt,
    image: article.mainImage || article.image,
    date: article.date,
    tag: article.tag || dict.article.articles[0].tag || "Leadership",
    sections: article.sections || []
  };

  // Get related articles (exclude current one)
  const allArticles = dict.article.articles || [];
  const smallCards = allArticles
    .filter((a: any) => String(a.id) !== String(id) && a.slug !== id)
    .slice(0, 3);
  
  const caseStudies = dict.article.latestCaseStudies || "Our latest Case Studies";

  return (
    <>
      {/* Article Header */}
      <section className="mx-auto relative top-15 lg:top-27 lg:right-10 max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/${lang}/resources`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform ${lang === 'ar' ? 'rotate-180' : ''}`}
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{dict.article.back}</span>
        </Link>
      </section>

      <section className="mx-auto max-w-4xl">
        <div className="bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <TagPill label={displayArticle.tag} />
              <span className="text-sm text-gray-600 font-medium">{displayArticle.date}</span>
            </div>

            <h1 className="text-4xl text-black md:text-5xl lg:text-6xl font-bold leading-tight mb-8 max-w-4xl">
              {displayArticle.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
              {displayArticle.excerpt}
            </p>

            <div className="relative w-full h-75 md:h-100 lg:h-125 rounded-3xl overflow-hidden mb-16">
              <Image
                src={displayArticle.image}
                alt={displayArticle.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              {(displayArticle.sections ?? []).map((section: any, idx: number) => (
                <div key={section.id || idx} className="mb-16">
                  {(!section.type || section.type === "text") && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-6">
                        {section.heading}
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </>
                  )}

                  {section.type === "image" && (
                    <div className="relative w-full h-75 md:h-100 rounded-2xl overflow-hidden">
                      <Image
                        src={section.content}
                        alt={section.heading || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Grid */}
      <section className="pb-24 border-t border-gray-100">
        <Container className="px-4 sm:px-6 lg:px-8 pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-10">
            {caseStudies}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {smallCards.map((a: any, idx: number) => (
              <SmallCard key={String(a.id ?? a.slug ?? idx)} a={a} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href={`/${lang}/resources`}>
              <button
                type="button"
                className="rounded-full bg-[#0B5F6A] text-white px-8 py-3 text-[14px] font-bold hover:bg-[#0A5560] transition-colors shadow-sm"
              >
                {dict.resources.seeMore || "See More"}
              </button>
            </Link>
          </div>
        </Container>

        {/* Commented out original CaseStudiesGrid as per user request */}
        {/* 
        <CaseStudiesGrid
          title={dict.article.latestCaseStudies ?? dict.article.relatedArticles}
          items={(dict.article.articles || []).map((a: any) => ({
            id: a.id,
            slug: a.slug,
            date: a.date,
            title: a.title,
            excerpt: a.excerpt,
            image: a.image,
            mobileImage: a.mobileImage,
            stats: a.stats,
          }))}
          hrefBase={`/${lang}/article`}
        /> 
        */}
      </section>
    </>
  );
}
