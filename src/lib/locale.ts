import type { Locale } from "./i18n";

/**
 * Pick the locale-specific value, falling back to English when the
 * target locale is missing. Used for title, abstract, and body fields
 * across both Whitepaper and WhitepaperCard.
 */
export function pickLocale<T>(
  locale: Locale,
  en: T,
  es?: T
): T {
  return locale === "es" && es !== undefined ? es : en;
}
