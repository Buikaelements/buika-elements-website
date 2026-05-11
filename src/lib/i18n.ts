/**
 * i18n helpers.
 *
 * Two locales (EN, ES) with URL-prefix routing. Every route lives under
 * /[locale]/... — there is no unprefixed root.
 *
 * LOCALES is the single source of truth. Anywhere that needs to enumerate
 * locales (middleware, generateStaticParams, language switcher) pulls from here.
 */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Pick the right variant from a { en, es } nested-object field with graceful
 * fallback to English. Handles undefined / partially translated content.
 */
export function pickLocale<T>(
  field: { en?: T; es?: T } | undefined,
  locale: Locale
): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field.en;
}

/**
 * Build a locale-prefixed path. Components should use this instead of
 * hand-concatenating strings so we never ship a bare /resources URL.
 */
export function localePath(locale: Locale, path = "") {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalised === "/" ? "" : normalised}`;
}

/**
 * Swap the locale prefix on the current path. Used by the language switcher.
 */
export function swapLocale(pathname: string, next: Locale): string {
  const match = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (match) return `/${next}${match[2] ?? ""}`;
  return `/${next}${pathname}`;
}

/**
 * UI string table — chrome-only labels (nav, footer, contact modal,
 * resource gate). Page body copy lives in lib/copy.ts so editors who
 * own marketing copy don't have to wade through interaction strings.
 *
 * Keys are flat dot-paths so a missing translation in one locale falls
 * back to English without a structural mismatch.
 */
export const strings = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.resources": "Resources",
    "nav.cta": "Request a conversation",

    "footer.tagline":
      "Independent fund-formation and operating-partner advisory for European mid-market sponsors.",
    "footer.navigate": "Navigate",
    "footer.contact": "Contact",
    "footer.briefing": "The Quarterly Briefing",
    "footer.briefingNote":
      "Quiet, occasional notes on European mid-market structure. No promotion.",
    "footer.emailPlaceholder": "Your email",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    "contact.eyebrow": "Confidential",
    "contact.head": "Request a conversation",
    "contact.intro":
      "Tell us a little about the mandate. We respond within two business days.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.firm": "Firm",
    "contact.topic": "Topic",
    "contact.topicPlaceholder": "Select a topic",
    "contact.message": "Brief description",
    "contact.privacy":
      "Submitted information is treated as confidential and used only to respond to your enquiry. See our privacy notice.",
    "contact.cancel": "Cancel",
    "contact.submit": "Send",
    "contact.submitting": "Sending…",
    "contact.received": "Received",
    "contact.successHead": "Thank you. We have your note.",
    "contact.successBody":
      "Simon will review personally and respond within two business days.",
    "contact.close": "Close",
    "contact.errorGeneric":
      "Something went wrong. Please email simon@buikaelements.com directly.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.resources": "Recursos",
    "nav.cta": "Solicitar una conversación",

    "footer.tagline":
      "Asesoría independiente en constitución de fondos y socios operativos para gestoras del mid-market europeo.",
    "footer.navigate": "Navegación",
    "footer.contact": "Contacto",
    "footer.briefing": "El Informe Trimestral",
    "footer.briefingNote":
      "Notas ocasionales sobre la estructura del mid-market europeo. Sin promoción.",
    "footer.emailPlaceholder": "Su correo",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",

    "contact.eyebrow": "Confidencial",
    "contact.head": "Solicitar una conversación",
    "contact.intro":
      "Cuéntenos brevemente sobre el mandato. Respondemos en dos días hábiles.",
    "contact.name": "Nombre",
    "contact.email": "Correo",
    "contact.firm": "Firma",
    "contact.topic": "Tema",
    "contact.topicPlaceholder": "Seleccione un tema",
    "contact.message": "Descripción breve",
    "contact.privacy":
      "La información enviada se trata como confidencial y se utiliza únicamente para responder a su consulta. Consulte nuestro aviso de privacidad.",
    "contact.cancel": "Cancelar",
    "contact.submit": "Enviar",
    "contact.submitting": "Enviando…",
    "contact.received": "Recibido",
    "contact.successHead": "Gracias. Hemos recibido su mensaje.",
    "contact.successBody":
      "Simon lo revisará personalmente y responderá en dos días hábiles.",
    "contact.close": "Cerrar",
    "contact.errorGeneric":
      "Ha ocurrido un error. Por favor escriba directamente a simon@buikaelements.com.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type StringKey = keyof (typeof strings)["en"];
