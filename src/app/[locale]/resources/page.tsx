// @sync-source: prototype/resources.jsx#ResourcesPage (composition only — ResourcesIndex lives in src/components/ResourcesIndex.tsx)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getResourcesIndex } from "@/lib/content";
import { ResourcesIndex } from "@/components/ResourcesIndex";

export const dynamic = "force-static";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const cards = await getResourcesIndex();

  return <ResourcesIndex cards={cards} />;
}
