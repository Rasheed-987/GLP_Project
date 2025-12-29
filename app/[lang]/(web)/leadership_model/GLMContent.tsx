"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import AccordionSection from "../components/AccordionSection";
import Image from "next/image";

type Props = {
  glm: any;
  earth: any;
  leadershipContent: React.ReactNode;
  futureContent: React.ReactNode;
  achievementsContent: React.ReactNode;
  lang: string;
};

const MobileLine = ({
  color,
  type,
  isRtl,
}: {
  color: string;
  type: "full" | "start" | "none";
  isRtl?: boolean;
}) => {
  if (type === "none") return <div className="w-[3px] h-full bg-transparent" />;

  return (
    <div className="w-[3px] relative flex flex-col items-center h-full">
      {/* Continuous vertical line */}
      <div
        className="w-full"
        style={{
          backgroundColor: color,
          height: type === "start" ? "45px" : "100%",
        }}
      />

{/* for mobile */}
      {/* Horizontal bend connecting into the header underline */}
      {type === "start" && (
        <div
          className="absolute h-[3px]"
          style={{
            width: color === "#059669" ? "68px" : "36px", // Increased by 4px for horizontal shift
            backgroundColor: color,
            [isRtl ? "right" : "left"]: "1px",
            top: "44.5px", // Align vertical end
            transform: "translateY(-50%)", // Center vertically on the 22px point
          }}
        />
      )}
    </div>
  );
};

const MobileSectionLayout = ({
  children,
  activeColor,
  isRtl,
}: {
  children: React.ReactNode;
  activeColor: string;
  isRtl: boolean;
}) => {
  const RED = "#E11D48";
  const BLACK = "#111827";
  const GREEN = "#059669";

  const lines = [
    {
      color: GREEN,
      type:
        activeColor === GREEN
          ? "start"
          : activeColor === BLACK || activeColor === RED
          ? "full"
          : "none",
      left: "-4px",
    },
    {
      color: BLACK,
      type:
        activeColor === BLACK ? "start" : activeColor === RED ? "full" : "none",
      left: "28px",
    },
    { color: RED, type: activeColor === RED ? "start" : "none", left: "52px" },
  ];

  return (
    <div className="flex gap-0 lg:hidden min-h-[100px] -mt-[4px]">
      <div className={`relative w-[60px] shrink-0 pt-0`}>
        {lines.map((l, i) => (
          <div
            key={i}
            className="absolute h-full top-0"
            style={{ [isRtl ? "right" : "left"]: l.left }}
          >
            <MobileLine color={l.color} type={l.type as any} isRtl={isRtl} />
          </div>
        ))}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};

const MobileGlobeConnector = ({ isRtl }: { isRtl: boolean }) => {
  return (
    <div
      className={`lg:hidden flex pt-0 pb-0 justify-start h-[120px] items-end`}
    >
      {/* Relative container to hold absolute lines */}
      <div className={`relative h-full w-[60px] shrink-0 -mt-[4px]`}>
        {/* Green Line - Outer (Aligned with -20px on globe) */}
        <div
          className="absolute w-[3px] h-full bg-[#059669]"
          style={{ [isRtl ? "right" : "left"]: "-4px" }}
        />

        {/* Black Line - Middle */}
        <div
          className="absolute w-[3px] h-full bg-[#111827]"
          style={{ [isRtl ? "right" : "left"]: "28px" }}
        />

        {/* Red Line - Inner */}
        <div
          className="absolute w-[3px] h-full bg-[#E11D48]"
          style={{ [isRtl ? "right" : "left"]: "52px" }}
        />
      </div>
    </div>
  );
};
export default function GLMContent({
  glm,
  earth,
  leadershipContent,
  futureContent,
  achievementsContent,
  lang,
}: Props) {
  const isRtl = lang === "ar";
  const RED = "#E11D48";
  const BLACK = "#111827";
  const GREEN = "#059669";

  const [openStates, setOpenStates] = useState({
    leadership: true,
    future: true,
    achievements: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  const dotRef1 = useRef<HTMLDivElement>(null);
  const dotRef2 = useRef<HTMLDivElement>(null);
  const dotRef3 = useRef<HTMLDivElement>(null);

  const headerRef1 = useRef<HTMLButtonElement>(null);
  const headerRef2 = useRef<HTMLButtonElement>(null);
  const headerRef3 = useRef<HTMLButtonElement>(null);

  const [paths, setPaths] = useState({
    leadership: "",
    future: "",
    achievements: "",
  });

  const updatePaths = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    const getPath = (
      dot: React.RefObject<HTMLDivElement | null>,
      header: React.RefObject<HTMLButtonElement | null>,
      isRedLine = false
    ) => {
      if (!dot.current || !header.current) return "";
      const dRect = dot.current.getBoundingClientRect();
      const hRect = header.current.getBoundingClientRect();

      const x1 = dRect.left + dRect.width / 2 - cRect.left;
      const y1 = dRect.top + dRect.height / 2 - cRect.top;
// responsible for position of line

      const x2 = isRtl ? hRect.right - cRect.left : hRect.left - cRect.left;
      const y2 = hRect.top + hRect.height -1.5 - cRect.top;

      // Elbow point: For red line, bend opposite direction (235° instead of 135°)
      let elbowX;
      if (isRedLine) {
        elbowX = isRtl ? x2 + 120 : x2 - 120; // More pronounced 235° angle offset
      } else {
        elbowX = isRtl ? x2 + 50 : x2 - 50; // Normal 135° angle
      }

      // Offset to extend the horizontal line past the elbow for smoother connection
      const elbowOffset = isRtl ? -3 : 3;

      // M start -> L elbow -> L end (with slight extension past elbow)
      return `M ${x1} ${y1} L ${elbowX + elbowOffset} ${y2} L ${x2} ${y2}`;
    };

    setPaths({
      leadership: getPath(dotRef1, headerRef1, true), // Red line with 235° angle
      future: getPath(dotRef2, headerRef2),
      achievements: getPath(dotRef3, headerRef3),
    });
  };

  useLayoutEffect(() => {
    // Update immediately
    updatePaths();

    // Then update continuously for 500ms to cover the 300ms CSS transition
    let frameId: number;
    const startTime = Date.now();

    const syncPaths = () => {
      updatePaths();
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        frameId = requestAnimationFrame(syncPaths);
      }
    };

    frameId = requestAnimationFrame(syncPaths);

    window.addEventListener("resize", updatePaths);
    return () => {
      window.removeEventListener("resize", updatePaths);
      cancelAnimationFrame(frameId);
    };
  }, [openStates]);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(updatePaths);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex flex-col ${
        isRtl ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-0 lg:gap-0 items-start relative lg:min-h-[900px]`}
      ref={containerRef}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Connector lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        style={{ zIndex: 11 }}
      >
        <path d={paths.leadership} stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={paths.future} stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={paths.achievements}
          stroke={GREEN}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* LEFT/RIGHT: Globe */}
      <div
        className={`w-full lg:w-auto flex ${
          isRtl ? "justify-start pr-4" : "justify-start pl-4"
        } lg:px-0 lg:justify-start lg:absolute ${
          isRtl ? "lg:-right-[200px]" : "lg:-left-[200px]"
        } lg:top-[20px]`}
      >
        <div
          className="relative w-[320px] md:w-[380px] lg:w-[400px] aspect-square overflow-visible"
          ref={globeRef}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden bg-white shadow-lg">
            <Image
              src={earth}
              alt="Globe"
              fill
              className="object-cover animate-spin-slow"
              priority
            />
          </div>
          <div className="absolute -inset-5 rounded-full border-2 border-[#EDEDED] shadow-inner" />

          {/* Desktop Dots */}
          <div
            ref={dotRef1}
            className="hidden lg:block absolute w-3 h-3 rounded-full bg-[#E11D48] z-20 shadow-md"
            style={{
              top: "20%",
              [isRtl ? "left" : "right"]: "2%",
              transform: `translate(${isRtl ? "-50%" : "50%"}, -50%)`,
            }}
          />
          <div
            ref={dotRef2}
            className="hidden lg:block absolute w-3 h-3 rounded-full bg-[#111827] z-20 shadow-md"
            style={{
              top: "42%",
              [isRtl ? "left" : "right"]: "-4%",
              transform: `translate(${isRtl ? "-50%" : "50%"}, -50%)`,
            }}
          />
          <div
            ref={dotRef3}
            className="hidden lg:block absolute w-3 h-3 rounded-full bg-[#059669] z-20 shadow-md"
            style={{
              top: "72%",
              [isRtl ? "left" : "right"]: "0%",
              transform: `translate(${isRtl ? "-50%" : "50%"}, -50%)`,
            }}
          />

          <div className="lg:hidden">
            {/* Green - Outer (Top Section) - X_page=-4, X_rel=-20, Y=126 */}
            <div
              className="absolute w-[3px] bg-[#059669] z-10"
              style={{
                top: "126px",
                bottom: "-4px",
                [isRtl ? "right" : "left"]: "-20px",
              }}
            />
            <div
              className="absolute w-[10px] h-[10px] rounded-full bg-[#059669] border-2 border-white z-20"
              style={{
                top: "126px",
                [isRtl ? "right" : "left"]: "-24px",
                transform: "translateY(-50%)",
              }}
            />

            {/* Black - Middle - X_page=28, X_rel=12, Y=264 */}
            <div
              className="absolute w-[3px] bg-[#111827] z-10"
              style={{
                top: "264px",
                bottom: "-4px",
                [isRtl ? "right" : "left"]: "12px",
              }}
            />
            <div
              className="absolute w-[10px] h-[10px] rounded-full bg-[#111827] border-2 border-white z-20"
              style={{
                top: "264px",
                [isRtl ? "right" : "left"]: "8px",
                transform: "translateY(-50%)",
              }}
            />

            {/* Red - Inner (Bottom Section) - X_page=52, X_rel=36, Y=291 */}
            <div
              className="absolute w-[3px] bg-[#E11D48] z-10"
              style={{
                top: "291px",
                bottom: "-4px",
                [isRtl ? "right" : "left"]: "36px",
              }}
            />
            <div
              className="absolute w-[10px] h-[10px] rounded-full bg-[#E11D48] border-2 border-white z-20"
              style={{
                top: "291px",
                [isRtl ? "right" : "left"]: "32px",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT/LEFT: Content */}
      <div className={`w-full ${isRtl ? "lg:mr-[400px]" : "lg:ml-[400px]"}`}>
        <MobileGlobeConnector isRtl={isRtl} />

        {/* Leadership spirit */}
        <div>
          <div className="hidden lg:block">
            <AccordionSection
              title={glm.leadershipSpirit.title}
              color={RED}
              defaultOpen
              headerRef={headerRef1}
              onToggle={(open) =>
                setOpenStates((s) => ({ ...s, leadership: open }))
              }
            >
              {leadershipContent}
            </AccordionSection>
          </div>
          <div className="lg:hidden">
            <MobileSectionLayout activeColor={RED} isRtl={isRtl}>
              <AccordionSection
                title={glm.leadershipSpirit.title}
                color={RED}
                defaultOpen
              >
                {leadershipContent}
              </AccordionSection>
            </MobileSectionLayout>
          </div>
        </div>

        {/* Future outlook */}
        <div>
          <div className="hidden lg:block">
            <AccordionSection
              title={glm.futureOutlook.title}
              color={BLACK}
              defaultOpen
              headerRef={headerRef2}
              onToggle={(open) =>
                setOpenStates((s) => ({ ...s, future: open }))
              }
            >
              {futureContent}
            </AccordionSection>
          </div>
          <div className="lg:hidden">
            <MobileSectionLayout activeColor={BLACK} isRtl={isRtl}>
              <AccordionSection
                title={glm.futureOutlook.title}
                color={BLACK}
                defaultOpen
              >
                {futureContent}
              </AccordionSection>
            </MobileSectionLayout>
          </div>
        </div>

        {/* Achievements and impact */}
        <div>
          <div className="hidden lg:block">
            <AccordionSection
              title={glm.achievementsImpact.title}
              color={GREEN}
              defaultOpen
              headerRef={headerRef3}
              onToggle={(open) =>
                setOpenStates((s) => ({ ...s, achievements: open }))
              }
            >
              {achievementsContent}
            </AccordionSection>
          </div>
          <div className="lg:hidden">
            <MobileSectionLayout activeColor={GREEN} isRtl={isRtl}>
              <AccordionSection
                title={glm.achievementsImpact.title}
                color={GREEN}
                defaultOpen
              >
                {achievementsContent}
              </AccordionSection>
            </MobileSectionLayout>
          </div>
        </div>
      </div>
    </div>
  );
}
