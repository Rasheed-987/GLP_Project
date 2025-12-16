"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";
import type { Locale } from "@/lib/i18n/config";

type NavbarProps = {
  locale: Locale;
  dict: {
    nav: {
      home: string;
      partnership: string;
      leadershipModel: string;
      programmes: string;
      alumni: string;
      about: string;
      approach: string;
      resources: string;
      faq: string;
      contact: string;
      menu: string;
      close: string;
      login: string;
    };
    home: {
      title: string;
      description: string;
    };
  };
};

export default function Navbar({ locale, dict }: NavbarProps) {
  const leftMenu = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/partnership`, label: dict.nav.partnership },
    { href: `/${locale}/leadership-model`, label: dict.nav.leadershipModel },
    { href: `/${locale}/programmes`, label: dict.nav.programmes },
    { href: `/${locale}/alumni`, label: dict.nav.alumni },
  ];

  const rightMenu = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/approach`, label: dict.nav.approach },
    { href: `/${locale}/resources`, label: dict.nav.resources },
    { href: `/${locale}/faq`, label: dict.nav.faq },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
    
      <header className="sticky top-0 z-60 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between">
          {/* Left: menu trigger (mobile), logo, AR */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className=" inline-flex items-center justify-center h-9 w-9 rounded-md border border-black/10 text-black/80 hover:bg-black/5"
              aria-label="Open menu"
            >
              <span className="i-heroicons-bars-3 w-5 h-5"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 6.75H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.75 12H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.75 17.25H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
            {dict.nav.menu}
            </button>
            <Link href={`/${locale}`} aria-label="UGLP home" className="flex items-center">
              <Image src="/images/logo.png" alt="UGLP logo" width={32} height={32} className="rounded-sm" />
            </Link>
            <LocaleSwitcher currentLocale={locale} />
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="inline-flex items-center h-9 rounded-full bg-brand-gradient text-white px-4 text-xs font-medium shadow-sm">{dict.nav.login}</button>
            {open && (
              <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center h-9 rounded-full border border-black/10 px-4 text-xs text-zinc-800">
                <span aria-hidden className="mr-1">✕</span> {dict.nav.close}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      {open && (
        <div className=" bg-white">
         
          {/* Menu Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            {/* Left Image Section */}
            <div className="hidden md:flex flex-col justify-between p-8 border-r">
              <Image
                src="/images/menu_image.png"
                alt="Leader Image"
                width={300}
                height={400}
                sizes="(min-width: 768px) 33vw, 100vw"
                priority
                className="w-full h-auto object-cover rounded-lg mb-4"
              />

              <div className="text-sm text-zinc-600 mt-6">
                <p className="font-medium text-zinc-800">
                  {dict.home.title}
                </p>
                <p>
                  {dict.home.description}
                </p>
              </div>
            </div>

            {/* Center Menu */}
            <nav className="p-8 space-y-4">
              {leftMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b pb-3 text-lg hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Menu */}
            <nav className="p-8 space-y-4">
              {rightMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b pb-3 text-lg hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
