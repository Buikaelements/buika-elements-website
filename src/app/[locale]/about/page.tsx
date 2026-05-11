// @sync-source: prototype/about.jsx#AboutPage (composition only — child sections live in src/components/About*.tsx)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { AboutBio } from "@/components/AboutBio";
import { AboutStats } from "@/components/AboutStats";
import { AboutOperate } from "@/components/AboutOperate";
import { Statement } from "@/components/Statement";
import { CtaBand } from "@/components/CtaBand";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);
  const a = copy.about;

  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--slate)", color: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="about-hero-inner">
              <div className="eyebrow" style={{ marginBottom: 40, color: "rgba(243,239,230,0.5)" }}>{a.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 900, marginBottom: 32, color: "var(--paper)" }}>{a.head}</h1>
              <p className="lede" style={{ maxWidth: 720, color: "rgba(243,239,230,0.65)" }}>{a.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .about-hero-inner { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      <AboutBio />
      <AboutStats />
      <AboutOperate />
      <Statement eyebrow="Principle">{a.statement}</Statement>
      <CtaBand
        head={a.bottomCta.head}
        body={a.bottomCta.body}
        cta={a.bottomCta.cta}
      />
    </>
  );
}
