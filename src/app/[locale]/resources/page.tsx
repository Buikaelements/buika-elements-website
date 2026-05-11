// @sync-source: prototype/resources.jsx#ResourcesPage (composition only — ResourcesIndex lives in src/components/ResourcesIndex.tsx)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { getResourcesIndex } from "@/lib/content";
import { ResourcesHubCard } from "@/components/ResourcesHubCard";
import { ResourcesIndex } from "@/components/ResourcesIndex";

export const dynamic = "force-static";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);
  const r = copy.resources;
  const cards = await getResourcesIndex();

  return (
    <>
      {/* 1. Knowledge Hub — first */}
      <ResourcesHubCard />

      {/* 2. Hero — second */}
      <section style={{ paddingTop: 80, paddingBottom: 72, background: "var(--signal)", color: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="res-hero">
              <div className="eyebrow" style={{ marginBottom: 40, color: "rgba(243,239,230,0.5)" }}>{r.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 1100, marginBottom: 32, color: "var(--paper)" }}>{r.head}</h1>
              <p className="lede" style={{ maxWidth: 640, color: "rgba(243,239,230,0.65)" }}>{r.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .res-hero { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      {/* 3. Filters + articles + newsletter — third */}
      <ResourcesIndex cards={cards} />
    </>
  );
}
