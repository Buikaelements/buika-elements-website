/**
 * Buika Elements — locale proxy (Next 16 file convention; was `middleware.ts`).
 *
 * Any request that doesn't start with /en or /es is redirected to the
 * locale that best matches the Accept-Language header, falling back to
 * DEFAULT_LOCALE. Static assets and Next internals are excluded via the
 * matcher below.
 *
 * We deliberately do NOT store the last-used locale in a cookie: the
 * language is a property of the URL, not the browser. The in-page
 * language switcher rewrites the URL (see swapLocale in lib/i18n.ts).
 */
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./lib/i18n";

function detectLocale(req: NextRequest): Locale {
  const header = req.headers.get("accept-language") ?? "";
  // Parse the first 3 language tags and take the first match we support.
  const tags = header
    .split(",")
    .map((t) => t.split(";")[0]!.trim().toLowerCase())
    .slice(0, 5);
  for (const tag of tags) {
    const base = tag.split("-")[0] as Locale;
    if ((LOCALES as readonly string[]).includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Already locale-prefixed? Pass through.
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Root redirects via next.config.mjs, but handle deep paths too.
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, the Sanity Studio, and anything with a
  // file extension (images, fonts, PDFs, favicon). Studio and /api manage
  // their own auth; we don't want a locale prefix on them.
  matcher: ["/((?!_next|api|studio|.*\\..*).*)"],
};
