import React from "react";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import Container from "../../../components/Container";
import ContactSection from "../components/ContactSection";
import TagPill from "../components/TagPill";
import ResourcesClient from "./components/ResourcesClient";
import { getBaseUrl } from "../../../../lib/getBaseUrl";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  let articles = [];
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/articles?lang=${lang}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      // Map API fields to component fields
      articles = data.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        date: item.date,
        excerpt: item.subtitle, // Map subtitle -> excerpt
        image: item.mainImage,  // Map mainImage -> image
      }));
    } else {
      console.error("Failed to fetch articles");
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  // Fallback to dictionary if API fails or returns empty
  if (!articles || articles.length === 0) {
    articles = dict?.article?.articles || [];
  }

  const t = dict?.resources;
  const tArticle = dict?.article;

  if (!t) return null;

  const tabs = [
    { key: "articles" as const, label: t.tabs.articles },
    { key: "videos" as const, label: t.tabs.videos },
    { key: "reports" as const, label: t.tabs.reports },
  ];

  const hasSplitLines =
    t.hero?.titleLine1Prefix !== undefined ||
    t.hero?.titleLine1Bold !== undefined ||
    t.hero?.titleLine1Suffix !== undefined;

  return (
    <>
      {/* HERO */}
      <section className="pt-10 md:pt-12 pb-10 md:pb-12 px-6 lg:px-12">
        <Container className="px-4 mt-20">
          <div className="flex flex-col items-center text-center">
            <TagPill label={t.hero.pill} />

            <h1 className="mt-4 text-slate-900 leading-[1.05]">
              <span className="block text-[32px] md:text-[48px] lg:text-[56px] font-medium">
                {hasSplitLines ? (
                  <>
                    {t.hero.titleLine1Prefix ?? ""}
                    <span className="font-bold">{t.hero.titleLine1Bold ?? ""}</span>
                    {t.hero.titleLine1Suffix ?? ""}
                  </>
                ) : (
                  t.hero.titleLine1
                )}
              </span>

              <span className="block text-[32px] md:text-[48px] lg:text-[56px] font-medium">
                {hasSplitLines ? (
                  <>
                    {t.hero.titleLine2Prefix ?? ""}
                    <span className="font-bold">{t.hero.titleLine2Bold ?? ""}</span>
                    {t.hero.titleLine2Suffix ?? ""}
                  </>
                ) : (
                  t.hero.titleLine2
                )}
              </span>
            </h1>

            <p className="mt-8 max-w-[620px] text-[13px] md:text-[15px] leading-[1.55] text-slate-600 mb-12 text-center">
              {t.hero.description}
            </p>

            {/* ✅ Interactive Tabs/Grid */}
            <ResourcesClient
              tabs={tabs}
              subtitle={t.subtitle}
              videoCards={t.videoCards ?? []}
              articles={articles}
              seeMoreText={t.seeMore}
              lang={lang}
              reportsData={t.reportsData}
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-t border-black/5">
        <Container className="px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-extrabold text-slate-900">{t.faq.title}</h2>
            </div>

            <div className="min-w-0">
              {t.faq.groups.map((g: any, gi: number) => (
                <div key={gi} className={gi === 0 ? "" : "mt-14"}>
                 
                  <div className="mt-4 border-t border-black/10">
                    {g.items.map((it: any, idx: number) => (
                      <details
                        key={idx}
                        className="group border-b border-black/10 py-4"
                        open={gi === 0 && idx === 0}
                      >
                        <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-4">
                          <span className="text-[13px] md:text-[14px] font-semibold text-slate-900">
                            {it.q}
                          </span>
                          <span className="text-slate-900/70 group-open:rotate-45 transition-transform">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path
                                d="M12 5v14M5 12h14"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </summary>

                        {it.a ? (
                          <div className="mt-2 text-[12.5px] md:text-[13px] leading-[1.55] text-slate-600 max-w-[760px]">
                            {it.a}
                          </div>
                        ) : null}
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <Container className="px-8">
          <ContactSection
            titleLine1={t.cta.title}
            titleLine2=""
            description={t.cta.description}
            button={t.cta.button}
          />
        </Container>
      </section>
    </>
  );
}
