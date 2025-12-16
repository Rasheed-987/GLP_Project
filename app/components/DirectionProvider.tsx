"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

export default function DirectionProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
