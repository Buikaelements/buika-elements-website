// @sync-source: prototype/services.jsx#ServicesPage (composition only — ServicesList lives in src/components/ServicesList.tsx)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { ServicesList } from "@/components/ServicesList";
import { CtaBand } from "@/components/CtaBand";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);
  const s = copy.services;

  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--teal)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="sv-hero">
              <div className="eyebrow" style={{ marginBottom: 40, color: "rgba(10,10,11,0.55)" }}>{s.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 1000, marginBottom: 32, color: "var(--ink)" }}>{s.head}</h1>
              <p className="lede" style={{ maxWidth: 720, color: "rgba(10,10,11,0.62)" }}>{s.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .sv-hero { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      <ServicesList />

      <CtaBand
        head={s.bottomCta.head}
        body={s.bottomCta.body}
        cta={s.bottomCta.cta}
      />
    </>
  );
}
