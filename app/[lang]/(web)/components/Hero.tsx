"use client";
import Image from "next/image";

type HeroProps = {
  title: string;
  description: string;
  backgroundImage: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
};

export default function Hero({ title, description, backgroundImage, buttons }: HeroProps) {
  return (
    <div className="relative h-100vh md:h-[700px] w-full">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex h-full items-center justify-start text-white">
        <div className="max-w-2xl px-4 md:px-10">
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          <p className="mt-4 text-lg md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={buttons.primary.href} className="rounded-full bg-white px-8 py-3 text-black font-semibold text-center">
              {buttons.primary.text}
            </a>
            <a href={buttons.secondary.href} className="rounded-full border border-white px-8 py-3 font-semibold text-center">
              {buttons.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

