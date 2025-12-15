"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/partnership", label: "PARTNERSHIP" },
  { href: "/leadership-model", label: "LEADERSHIP MODEL" },
  { href: "/programmes", label: "PROGRAMMES" },
  { href: "/alumni", label: "ALUMNI" },
  { href: "/approach", label: "APPROACH" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center md:hidden h-9 w-9 rounded-md border border-black/10 text-black/80 hover:bg-black/5"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="i-heroicons-bars-3 w-5 h-5"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 6.75H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.75 12H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.75 17.25H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
          </button>
          <Link href="/" className="font-semibold tracking-tight text-zinc-900">
            UGLP
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-zinc-900 text-zinc-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1 h-8 rounded-full border border-black/10 px-3 text-xs text-zinc-700">AR</button>
          <button className="inline-flex items-center h-8 rounded-full bg-foreground text-background px-3 text-xs">Log in</button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="px-4 py-3 grid grid-cols-1 gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
