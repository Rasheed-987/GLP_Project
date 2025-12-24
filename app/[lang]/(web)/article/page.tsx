import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import Image from "next/image";
import Link from "next/link";
import CaseStudiesGrid from "../components/CaseStudiesGrid";
import TagPill from "../components/TagPill";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const article = dict.article.articles[0]; // Get first article as example

  return (
    <>
      {/* Article Header */}
      <section className="mx-auto relative top-15 lg:top-27 lg:right-10 max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform"
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
            {/* Header Top Row */}
            <div className="flex items-center justify-between mb-8">

              <TagPill label={article.tag} />

              <span className="text-sm text-gray-600 font-medium">{article.date}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl text-black md:text-5xl lg:text-6xl font-bold leading-tight mb-8 max-w-4xl">
              {article.title}
            </h1>

            {/* Article Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Featured Image */}
            <div className="relative w-full h-75 md:h-100 lg:h-125 rounded-3xl overflow-hidden mb-16">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Article Content Sections */}
        <div className="bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              {(article.sections ?? []).map((section: any) => (
                <div key={section.id} className="mb-16">
                  {section.type === "text" && (
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
                        alt={section.heading}
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

        {/* Latest Case Studies (Related) */}

      </section>

      {/* Our Latest Case studies */}
      <section>
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
          hrefBase={`/${lang}/(web)/article`}
        />
      </section>

    </>
  );
}
