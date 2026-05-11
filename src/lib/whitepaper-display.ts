import type { Locale } from "./i18n";
import type { WhitepaperTopic, WhitepaperAccess } from "./types";

/**
 * Derive a human-readable category label from topic + access.
 * Centralised so the index and detail page never drift.
 */
export function deriveCategory(
  topic: WhitepaperTopic,
  access: WhitepaperAccess,
  locale: Locale
): { label: string; isWhitepaper: boolean; isFieldNote: boolean } {
  const isFieldNote = topic === "field-notes";
  const isWhitepaper = access === "gated" || access === "private";
  const label = isFieldNote
    ? locale === "es"
      ? "Nota de campo"
      : "Field note"
    : isWhitepaper
      ? "Whitepaper"
      : locale === "es"
        ? "Ensayo"
        : "Essay";
  return { label, isWhitepaper, isFieldNote };
}
