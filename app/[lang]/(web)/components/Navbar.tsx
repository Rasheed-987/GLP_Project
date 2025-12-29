"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import LocaleSwitcher from "../../../../app/components/LocaleSwitcher";
import type { Locale } from "../../../../lib/i18n/config";
import { useRouter } from "next/navigation";

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
      description: string;
    };

  };
};

export default function Navbar({ locale, dict }: NavbarProps) {

  const router = useRouter();

  const leftMenu = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/partnership`, label: dict.nav.partnership },
    { href: `/${locale}/leadership_model`, label: dict.nav.leadershipModel },
    { href: `/${locale}/programs`, label: dict.nav.programmes },
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const menuImages = ["/images/menuimg1.png", "/images/menuimg2.png", "/images/menuimg3.png"];



  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % menuImages.length);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, menuImages.length]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <div
      className={`w-full transition-colors duration-200 ${open ? 'fixed left-1/2 -translate-x-1/2 w-full max-w-[1800px] bg-white z-50 overflow-y-auto' : 'relative z-40 w-full bg-transparent'}`}
      style={{
        top: open ? 'var(--topbar-height, 52px)' : 'auto',
        height: open ? 'calc(100vh - var(--topbar-height, 52px))' : 'auto'
      }}
    >
      <header className={`w-full ${open ? 'fixed left-1/2 -translate-x-1/2 w-full max-w-[1800px] z-60 bg-white' : 'z-60'}`}
        style={{
          top: open ? 0 : 'var(--topbar-height, 52px)'
        }}
      >
        <div className="flex h-14 md:h-14 items-center justify-between px-4 md:px-6">
          {/* Left: logo and locale switcher */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link href={`/${locale}`} aria-label="UGLP home" className="flex items-center">
              <Image src="/images/logo.png" alt="UGLP logo" width={48} height={48} className="rounded-sm md:w-10 md:h-10" />
            </Link>
            <LocaleSwitcher currentLocale={locale} isMenuOpen={open} className={open ? "flex" : "flex"} />
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button className="cursor-pointer inline-flex items-center h-10 md:h-10 rounded-full bg-brand-gradient text-white px-5 md:px-6 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity" onClick={() => router.push(`/${locale}/sign-in`)}>
              {dict.nav.login}
            </button>
            {!open && (
              <div className="relative group/menu">
                {/* Ghost Element for Layout Stability */}
                <div aria-hidden="true" className="invisible inline-flex items-center justify-center h-10 w-10 md:h-10 md:w-auto rounded-full border border-black/10 md:px-4 gap-2">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="md:w-[14px] md:h-[10px]"><path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  <span className="hidden md:inline">{dict.nav.menu}</span>
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="cursor-pointer absolute right-0 top-0 group inline-flex items-center justify-center h-10 w-10 md:h-10 md:w-auto rounded-full border border-black/10 bg-white md:px-4 text-sm font-bold text-black hover:border-transparent transition-all duration-300 gap-2 group-hover/menu:gap-0"
                  aria-label="Open menu"
                >
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[14px] md:h-[10px] transition-all duration-300 group-hover/menu:opacity-0 group-hover/menu:scale-0 group-hover/menu:w-0 overflow-hidden"
                  >
                    <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="hidden md:inline transition-all duration-300 group-hover/menu:scale-105">{dict.nav.menu}</span>
                </button>
              </div>
            )}
            {open && (
              <div className="relative group/close">
                {/* Ghost Element for Layout Stability */}
                <div aria-hidden="true" className="invisible inline-flex items-center justify-center h-10 w-10 md:h-10 md:w-auto rounded-full border border-black/10 md:px-5 gap-2">
                  <span className="font-normal text-xl md:text-sm">✕</span>
                  <span className="hidden md:inline text-sm font-bold">{dict.nav.close}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer absolute right-0 top-0 group inline-flex items-center justify-center h-10 w-10 md:h-10 md:w-auto rounded-full border border-black/10 bg-white text-zinc-900 hover:border-transparent transition-all duration-300 md:px-5 gap-2 group-hover/close:gap-0"
                  aria-label="Close menu"
                >
                  <span aria-hidden className="font-normal text-xl md:text-sm transition-all duration-300 group-hover/close:opacity-0 group-hover/close:scale-0 group-hover/close:w-0 overflow-hidden">✕</span>
                  <span className="hidden md:inline text-sm font-bold transition-all duration-300 group-hover/close:scale-105">{dict.nav.close}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Content */}
      {open && (
        <div className="bg-white pt-16 md:pt-20 min-h-full flex flex-col">
          {/* MOBILE MENU (md:hidden) */}
          <div className="flex-1 overflow-y-auto md:hidden px-4 py-6">
            <div className="flex flex-col">
              {[...leftMenu, ...rightMenu].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="w-full border-b border-black/10 py-4 text-sm font-bold text-black uppercase hover:text-brand-green transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Socials centered for mobile */}
            <div className="mt-12 mb-8 flex justify-center gap-8">
              <a href="#" aria-label="X (Twitter)" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* DESKTOP MENU (hidden md:grid) */}
          <div className="hidden md:grid z-50 grid-cols-3 flex-1">
            {/* Left Image Section */}
            <div className="flex flex-col justify-between p-6 border-r border-border-stroke h-full">
              <div
                className="relative w-full max-w-[320px] h-[350px] rounded-[24px] overflow-hidden mb-4 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {menuImages.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Leader Image"
                    fill
                    sizes="(min-width: 424px) 33vw, 100vw"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-300 ease-out ${i === activeImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                  />
                ))}
              </div>
              <div className="mt-2 shrink-0">
                <Image src="/images/logo2.png" alt="UGLP logo" width={70} height={70} className="mb-3" />
                <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">{dict.nav.description}</p>
              </div>
            </div>

            <div className="p-6 flex flex-col h-full overflow-y-auto">
              <nav className="space-y-2">
                {leftMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border-stroke pb-2 text-[30px] font-medium text-black hover-gradient-text transition-colors uppercase"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-6 shrink-0">
                <div className="flex items-center gap-4">
                  <a href="#" aria-label="X (Twitter)" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="#" aria-label="WhatsApp" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Menu */}
            <nav className="p-6 space-y-2">
              {rightMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border-stroke pb-2 text-[30px] font-medium text-black hover-gradient-text transition-colors uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
