// @sync-source: prototype/chrome.jsx#SiteChrome (composition only — TopNav, Footer, ContactModal live in src/components/)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { SiteChrome } from "@/components/SiteChrome";
import { PlausibleScript } from "@/components/PlausibleScript";

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  const copy = getCopy(typedLocale);

  return (
    <html lang={typedLocale} className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* JIT seed: forces Tailwind v4 to emit our token utilities + CSS vars
            even when no real component currently uses them. Safe to delete
            once components rely on these classes for real. */}
        <div
          hidden
          className="bg-paper bg-paper-pure bg-stone bg-stone-soft bg-slate bg-slate-soft bg-ink bg-teal text-ink text-ink-muted text-ink-faint text-paper text-signal text-teal-dark border-stone border-signal border-teal font-display font-body font-code"
        />
        <SiteChrome locale={typedLocale} copy={copy}>
          {children}
        </SiteChrome>
        <PlausibleScript />
      </body>
    </html>
  );
}
