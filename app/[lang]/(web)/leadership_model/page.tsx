// app/[lang]/glm/page.tsx
import React from "react";
import Image from "next/image";
import Container from "../../../components/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import AccordionSection from "../components/AccordionSection";
import ConnectorElbow from "../components/ConnectorElbow";
import GLMContent from "./GLMContent";

import earth from "./earth.png";
import sp1 from "../../../../public/images/sp1.png";
import sp2 from "../../../../public/images/sp2.png";
import sp3 from "../../../../public/images/sp3.png";
import fo1 from "../../../../public/images/fo1.png";
import fo2 from "../../../../public/images/fo2.png";
import fo3 from "../../../../public/images/fo3.png";
import fo4 from "../../../../public/images/fo4.png";
import ai1 from "../../../../public/images/ai1.png";
import ai2 from "../../../../public/images/ai2.png";
import ai3 from "../../../../public/images/ai3.png";

import type { StaticImageData } from "next/image";

type GLMItem = {
  title: string;
  description: string;
  icon?: string | StaticImageData;
};

type GLMDict = {
  hero: {
    title1: string;
    title2Bold: string;
    title3: string;
    suffix: string;
  };
  leadershipSpirit: {
    title: string;
    items: { title: string; description: string }[];
  };
  futureOutlook: {
    title: string;
    items: { title: string; description: string }[];
  };
  achievementsImpact: {
    title: string;
    items: { title: string; description: string }[];
  };
};

const defaultGLM: GLMDict = {
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
      },
      {
        title: "Open to the world",
        description:
          "Open-minded to different experiences; embraces the values of peace, tolerance and coexistence; enjoys an extensive network of relations and is well-versed in global culture.",
      },
      {
        title: "Role model",
        description:
          "Shows values of integrity, humility and respect; embraces and promotes happiness and positivity; makes substantial contributions in representing the country in a positive way.",
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
      },
      {
        title: "Futuristic",
        description:
          "Well-informed about global trends; able to imagine the future; anticipate and analyze opportunities through developing future scenarios and proactive plans.",
      },
      {
        title: "Life-long Learner",
        description:
          "Seeks self-development to acquire and enhance diverse skills; passionate for knowledge, research and exploration.",
      },
      {
        title: "Innovative and disruptive",
        description:
          "Catalyst for change at the individual and institutional level; entrepreneurial and adventurous for whom nothing is impossible.",
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
      },
      {
        title: "Smart, effective and efficient decision maker",
        description:
          "Adopts a critical, analytical style of thinking; mindful and gutsy decision parameters in achieving the most desirable outcome.",
      },
      {
        title: "Focuses on the government’s ultimate goals and achievements",
        description:
          "Strong advocate in achieving the government’s objectives; adds value in all aspects of work performance relating to national goals.",
      },
    ],
  },
};

// ✅ icons stay in code (stable) – text comes from dict
const ICONS = {
  leadershipSpirit: [sp3, sp1, sp2],
  futureOutlook: [fo1, fo2, fo4, fo3],
  achievementsImpact: [ai1, ai2, ai3],
};

// NEW: Mobile Components
const MobileLine = ({
  color,
  type,
}: {
  color: string;
  type: "full" | "start" | "none";
}) => {
  if (type === "none") return <div className="w-[2px]" />;
  
  return (
    <div className="w-[2px] relative flex flex-col items-center h-full">
      <div 
        className="w-full" 
        style={{ 
          backgroundColor: color, 
          height: type === "full" ? "100%" : "28px", 
          flexGrow: type === "full" ? 1 : 0
        }} 
      />
      {type === "start" && (
        <div 
          className="absolute top-[24px] w-[9px] h-[9px] rounded-full z-10" 
          style={{ backgroundColor: color }} 
        />
      )}
      {type === "full" && <div className="w-full flex-1" style={{ backgroundColor: color }} />}
    </div>
  );
};

const MobileSectionLayout = ({
  children,
  activeColor,
}: {
  children: React.ReactNode;
  activeColor: string;
}) => {
  const RED = "#E11D48";
  const BLACK = "#111827";
  const GREEN = "#059669";
  
  const lines = [
    { color: GREEN, type: activeColor === GREEN ? "start" : "full" },
    { color: BLACK, type: activeColor === BLACK ? "start" : activeColor === GREEN ? "none" : "full" },
    { color: RED, type: activeColor === RED ? "start" : "none" },
  ];

  return (
    <div className="flex gap-4 lg:hidden">
      <div className="flex gap-3 pt-1 shrink-0">
         {lines.map((l, i) => (
           <MobileLine key={i} color={l.color} type={l.type as any} />
         ))}
      </div>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

const MobileGlobeConnector = () => {
  return (
    <div className="lg:hidden flex gap-3 pt-4 pb-0 justify-start px-0 h-[60px] items-end">
       <div className="flex gap-3 shrink-0">
          {/* Green Line - Longest */}
          <div className="w-[2px] relative h-[60px] bg-transparent">
             <div className="absolute bottom-0 w-full bg-[#059669] h-full" />
             <div className="absolute top-0 -left-[3px] w-[8px] h-[8px] rounded-full bg-[#059669]" />
          </div>
          
          {/* Black Line - Medium */}
          <div className="w-[2px] relative h-[60px] bg-transparent">
             <div className="absolute bottom-0 w-full bg-[#111827] h-[75%]" />
             <div className="absolute top-[25%] -left-[3px] w-[8px] h-[8px] rounded-full bg-[#111827]" />
          </div>

          {/* Red Line - Shortest */}
          <div className="w-[2px] relative h-[60px] bg-transparent">
             <div className="absolute bottom-0 w-full bg-[#E11D48] h-[50%]" />
             <div className="absolute top-[50%] -left-[3px] w-[8px] h-[8px] rounded-full bg-[#E11D48]" />
          </div>
       </div>
    </div>
  )
}

function safeGLM(dictGlm: Partial<GLMDict> | undefined): GLMDict {
  // merge dict with default, but keep arrays safe
  const merged: GLMDict = {
    hero: { ...defaultGLM.hero, ...(dictGlm?.hero || {}) },
    leadershipSpirit: {
      title: dictGlm?.leadershipSpirit?.title ?? defaultGLM.leadershipSpirit.title,
      items:
        dictGlm?.leadershipSpirit?.items?.length
          ? dictGlm.leadershipSpirit.items
          : defaultGLM.leadershipSpirit.items,
    },
    futureOutlook: {
      title: dictGlm?.futureOutlook?.title ?? defaultGLM.futureOutlook.title,
      items:
        dictGlm?.futureOutlook?.items?.length
          ? dictGlm.futureOutlook.items
          : defaultGLM.futureOutlook.items,
    },
    achievementsImpact: {
      title: dictGlm?.achievementsImpact?.title ?? defaultGLM.achievementsImpact.title,
      items:
        dictGlm?.achievementsImpact?.items?.length
          ? dictGlm.achievementsImpact.items
          : defaultGLM.achievementsImpact.items,
    },
  };

  return merged;
}

const Item = ({ color, item }: { color: string; item: GLMItem }) => (
  <div className="flex gap-4">
    <div 
      className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border-[1.5px] flex items-center justify-center bg-white shadow-sm" 
      style={{ borderColor: color }}
    >
      {item.icon ? (
        <Image src={item.icon} alt={item.title} width={24} height={24} className="object-contain" />
      ) : null}
    </div>

    <div className="min-w-0 flex-1 pt-1">
      <p className="text-[14.5px] md:text-[16px] font-bold leading-tight" style={{ color }}>
        {item.title}
      </p>
      <p className="text-[#000000b3] text-[12.5px] md:text-[13.5px] leading-[1.6] mt-2.5 max-w-[95%]">
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

  // ✅ get glm from en/ar files
  const glmText = safeGLM((dict as any)?.glm);

  // ✅ attach icons (same for EN/AR)
  const glm = {
    ...glmText,
    leadershipSpirit: {
      ...glmText.leadershipSpirit,
      items: glmText.leadershipSpirit.items.map((it, i) => ({
        ...it,
        icon: ICONS.leadershipSpirit[i],
      })),
    },
    futureOutlook: {
      ...glmText.futureOutlook,
      items: glmText.futureOutlook.items.map((it, i) => ({
        ...it,
        icon: ICONS.futureOutlook[i],
      })),
    },
    achievementsImpact: {
      ...glmText.achievementsImpact,
      items: glmText.achievementsImpact.items.map((it, i) => ({
        ...it,
        icon: ICONS.achievementsImpact[i],
      })),
    },
  };

  const RED = "#E11D48";
  const BLACK = "#111827";
  const GREEN = "#059669";

  const leadershipContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 pt-4">
      <Item color={RED} item={glm.leadershipSpirit.items[0]} />
      <Item color={RED} item={glm.leadershipSpirit.items[1]} />
      <div className="md:col-span-2 max-w-[520px]">
        <Item color={RED} item={glm.leadershipSpirit.items[2]} />
      </div>
    </div>
  );

  const futureContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 pt-4">
      {glm.futureOutlook.items.map((it: GLMItem, idx: number) => (
        <Item key={idx} color={BLACK} item={it} />
      ))}
    </div>
  );

  const achievementsContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 pt-4">
      <Item color={GREEN} item={glm.achievementsImpact.items[0]} />
      <Item color={GREEN} item={glm.achievementsImpact.items[1]} />
      <Item color={GREEN} item={glm.achievementsImpact.items[2]} />
    </div>
  );

  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-20 pb-10">
        <Container className="px-4">
          {lang === "en" ? (<h1 className="text-center text-black leading-[1.05] mt-9 mb-10">
            <span className="block text-3xl md:text-5xl font-medium">
              {glm.hero.title1}{" "}
              <span className="font-extrabold">{glm.hero.title2Bold}</span>
            </span>
            <span className="block text-3xl md:text-5xl font-extrabold">
              {glm.hero.title3}{" "}
              <span className="font-semibold text-black">{glm.hero.suffix}</span>
            </span>
          </h1>)
:
          ( <h1 className="flex justify-center text-center text-black leading-[1.05] mt-9 mb-10 gap-3">
           <span className="block text-3xl md:text-5xl font-semibold">نموذج القيادة</span>
            <span className="text-3xl md:text-5xl font-regular">لحكومة الإمارات</span>
          </h1>)}
        </Container>
      </section>

      {/* MAIN LAYOUT */}
      <section className="pb-16 md:pb-24 lg:overflow-hidden">
        <Container className="px-4 lg:overflow-visible">
          <GLMContent 
            glm={glm} 
            earth={earth}
            leadershipContent={leadershipContent}
            futureContent={futureContent}
            achievementsContent={achievementsContent}
            lang={lang}
          />
        </Container>
      </section>
    </>
  );
}
