// @sync-source: prototype/home.jsx#HomePage (composition only — child sections live in src/components/Home*.tsx)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { HomeHero } from "@/components/HomeHero";
import { CredibilityBar } from "@/components/CredibilityBar";
import { HomePositioning } from "@/components/HomePositioning";
import { HomeContrast } from "@/components/HomeContrast";
import { HomeSteps } from "@/components/HomeSteps";
import { HomeWhy } from "@/components/HomeWhy";
import { HomeValueProp } from "@/components/HomeValueProp";
import { CtaBand } from "@/components/CtaBand";

/**
 * Home — server-rendered with the production copy bundle. Each section is
 * a thin client component so we keep the static content streamable while
 * still allowing scroll reveals on the client.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);

  return (
    <>
      <HomeHero />
      <CredibilityBar items={copy.home.credibility} />
      <HomePositioning />
      <HomeContrast />
      <HomeSteps />
      <HomeWhy />
      <HomeValueProp />
      <CtaBand
        head={copy.home.bottomCta.head}
        body={copy.home.bottomCta.body}
        cta={copy.home.bottomCta.cta}
      />
    </>
  );
}
