// app/[lang]/glm/page.tsx
import React from "react";
import Image from "next/image";
import Container from "../../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import AccordionSection from "../components/AccordionSection";
import ConnectorElbow from "../components/ConnectorElbow";
import earth from './earth.png'
type GLMItem = { title: string; description: string; icon?: string };

const defaultGLM = {
  hero: {
    title1: "UAE’s Government",
    title2Bold: "Leadership",
    title3: "Model",
    suffix: "(GLM)",
  },
  leadershipSpirit: {
    title: "Leadership spirit",
    items: [
      {
        title: "Enabler of people",
        description:
          "Inspires, encourages, and motivates others; reinforces human capabilities and talents through empowerment; effectively leverages others’ capabilities and demonstrates emotional intelligence.",
        icon: "users",
      },
      {
        title: "Open to the world",
        description:
          "Open-minded to different experiences; embraces the values of peace, tolerance and coexistence; enjoys an extensive network of relations and is well-versed in global culture.",
        icon: "globe",
      },
      {
        title: "Role model",
        description:
          "Shows values of integrity, humility and respect; embraces and promotes happiness and positivity; makes substantial contributions in representing the country in a positive way.",
        icon: "badge",
      },
    ],
  },
  futureOutlook: {
    title: "Future outlook",
    items: [
      {
        title: "Well-versed in Advanced Technology",
        description:
          "Awareness of new technologies and trends such as 4IR and AI, and how to get the most benefit out of these technologies to transform the way we live and work in the future.",
        icon: "cpu",
      },
      {
        title: "Futuristic",
        description:
          "Well-informed about global trends; able to imagine the future; anticipate and analyze opportunities through developing future scenarios and proactive plans.",
        icon: "spark",
      },
      {
        title: "Life-long Learner",
        description:
          "Seeks self-development to acquire and enhance diverse skills; passionate for knowledge, research and exploration.",
        icon: "book",
      },
      {
        title: "Innovative and disruptive",
        description:
          "Catalyst for change at the individual and institutional level; entrepreneurial and adventurous for whom nothing is impossible.",
        icon: "rocket",
      },
    ],
  },
  achievementsImpact: {
    title: "Achievements and impact",
    items: [
      {
        title: "Agile and fast",
        description:
          "Creates an environment which promotes and empowers change, achieving goals quickly and making efficient use of available resources.",
        icon: "bolt",
      },
      {
        title: "Smart, effective and efficient decision maker",
        description:
          "Adopts a critical, analytical style of thinking; mindful and gutsy decision parameters in achieving the most desirable outcome.",
        icon: "target",
      },
      {
        title: "Focuses on the government’s ultimate goals and achievements",
        description:
          "Strong advocate in achieving the government’s objectives; adds value in all aspects of work performance relating to national goals.",
        icon: "flag",
      },
    ],
  },
};

const Icon = ({ name }: { name?: string }) => {
  const common = "w-4 h-4";
  switch (name) {
    case "users":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11ZM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M4 20c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 14.7c.65-.14 1.33-.2 2-.2 3.3 0 6 2.3 6 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "globe":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M2 12h20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 2c3 2.9 4.5 6.2 4.5 10S15 19.1 12 22c-3-2.9-4.5-6.2-4.5-10S9 4.9 12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "badge":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 15 6l5 .7-3.7 3.6.9 5.1L12 13.8 7.8 15.4l.9-5.1L5 6.7 10 6l2-4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8 22l4-2 4 2v-7H8v7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cpu":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M9 9h6v6H9V9Z" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 10V6h4M20 10V6h-4M4 14v4h4M20 14v4h-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M10 4h4M10 20h4M4 12h2M18 12h2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.4 6.1L19 12l-5.6 3.9L12 22l-1.4-6.1L5 12l5.6-3.9L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "book":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 5.5C4 4.12 5.12 3 6.5 3H20v17H6.5C5.12 20 4 18.88 4 17.5v-12Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 7h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "rocket":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M14 4c3.5.3 6 3.2 6 6.8-2 2-4.8 3.6-8 4.2L6 21l.9-6c.6-3.2 2.2-6 4.2-8 1-1 2-2 2.9-3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 14.5l-3-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "target":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 12l7-7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "flag":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 22V3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M5 4h12l-2 4 2 4H5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M2 12h20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

const Item = ({ color, item }: { color: string; item: GLMItem }) => (
  <div className="flex gap-3">
    <div
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
      style={{ borderColor: color, color }}
    >
      <Icon name={item.icon} />
    </div>

    <div className="min-w-0">
      <p className="text-[13px] md:text-[14px] font-semibold text-black leading-tight">
        {item.title}
      </p>
      <p className="text-[#00000099] text-[12.5px] md:text-[13px] leading-[1.35] mt-1">
        {item.description}
      </p>
    </div>
  </div>
);

export default async function GLMPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const glm = (dict as any)?.glm ?? defaultGLM;

  const RED = "#E11D48";
  const BLACK = "#111827";
  const GREEN = "#059669";

  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-20 pb-10 md:pb-12">
        <Container className="px-4">
          <h1 className="text-center text-black leading-[1.05] mt-9 mb-10">
            <span className="block text-3xl md:text-5xl font-medium">
              {glm.hero.title1}{" "}
              <span className="font-extrabold">{glm.hero.title2Bold}</span>
            </span>
            <span className="block text-3xl md:text-5xl font-extrabold">
              {glm.hero.title3}{" "}
              <span className="font-semibold text-black/60">{glm.hero.suffix}</span>
            </span>
          </h1>
        </Container>
      </section>

      {/* MAIN LAYOUT */}
      <section className="pb-16 md:pb-24">
        <Container className="px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            {/* LEFT: Globe */}
            <div className="w-full lg:w-[38%] flex justify-center lg:justify-start relative -left-30">
              <div className="relative w-[320px] md:w-[380px] lg:w-[750px] aspect-square overflow-visible">
                <div className="absolute inset-0 rounded-full overflow-hidden bg-white">
                  {/* use globe if you have it */}
                  <Image
                    src={earth}
                    alt="Globe"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute -inset-5 rounded-full border border-black/10" />
              </div>
            </div>

            {/* RIGHT: Content */}
            <div className="w-full lg:w-[92%]">
              {/* Leadership spirit */}
              <div className="lg:grid lg:grid-cols-[220px_1fr] lg:-ml-[140px]">
                <div className="hidden lg:flex justify-start pt-2">
                  <ConnectorElbow color={RED} dotY={90} endY={38} />
                </div>

                <AccordionSection title={glm.leadershipSpirit.title} color={RED} defaultOpen>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Item color={RED} item={glm.leadershipSpirit.items[0]} />
                    <Item color={RED} item={glm.leadershipSpirit.items[1]} />
                    <div className="md:col-span-2 max-w-[520px]">
                      <Item color={RED} item={glm.leadershipSpirit.items[2]} />
                    </div>
                  </div>
                </AccordionSection>
              </div>

              {/* Future outlook */}
              <div className="lg:grid lg:grid-cols-[220px_1fr] lg:-ml-[140px]">
                <div className="hidden lg:flex justify-start pt-2">
                  <ConnectorElbow color={BLACK} dotY={34} endY={38} />
                </div>

                <AccordionSection title={glm.futureOutlook.title} color={BLACK} defaultOpen>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {glm.futureOutlook.items.map((it: GLMItem, idx: number) => (
                      <Item key={idx} color={BLACK} item={it} />
                    ))}
                  </div>
                </AccordionSection>
              </div>

              {/* Achievements and impact */}
              <div className="lg:grid lg:grid-cols-[220px_1fr] lg:-ml-[140px]">
                <div className="hidden lg:flex justify-start pt-2">
                  <ConnectorElbow color={GREEN} dotY={-40} endY={38} />
                </div>

                <AccordionSection title={glm.achievementsImpact.title} color={GREEN} defaultOpen>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Item color={GREEN} item={glm.achievementsImpact.items[0]} />
                    <Item color={GREEN} item={glm.achievementsImpact.items[1]} />
                    <div className="md:col-span-2 max-w-[600px]">
                      <Item color={GREEN} item={glm.achievementsImpact.items[2]} />
                    </div>
                  </div>
                </AccordionSection>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
