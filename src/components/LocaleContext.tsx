"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Route } from "next";
import { type Locale, swapLocale } from "@/lib/i18n";
import { type Copy, getCopy } from "@/lib/copy";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  copy: Copy;
};

const LocaleContext = createContext<Ctx | null>(null);

/**
 * LocaleProvider — single source of truth for the active locale and the
 * matching production copy bundle. URL-prefix is canonical (middleware
 * pins it); this provider syncs with browser navigation and exposes a
 * setter that swaps the prefix while preserving the rest of the path.
 *
 * `copy` is derived in-render so a locale switch updates everything in
 * one paint without consumers needing to re-fetch.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const m = pathname.match(/^\/(en|es)(?:\/|$)/);
    if (m && m[1] !== locale) setLocaleState(m[1] as Locale);
  }, [pathname, locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    router.push(swapLocale(pathname, next) as Route);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, copy: getCopy(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
