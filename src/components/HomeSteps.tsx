"use client";

// @sync-source: prototype/home.jsx#StepsBlock
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * HomeSteps — three large numbered process blocks. 3-column grid on
 * desktop, collapses to a single column on mobile. Each step: serif
 * numeral over title and body, separated from neighbours by a hairline.
 */
export function HomeSteps() {
  const { copy } = useLocale();

  return (
    <section className="section" style={{ background: "var(--stone-soft)" }}>
      <div className="container">
        <div style={{ marginBottom: 72 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>{copy.home.stepsEyebrow}</div>
          <h2 className="h2" style={{ maxWidth: 760 }}>{copy.home.stepsHead}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="steps-grid">
          {copy.home.steps.map((s: { n: string; title: string; body: string }, i: number) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 32 }}>
                <div className="num-serif" style={{ fontSize: 52, lineHeight: 1, marginBottom: 24, color: "var(--ink)" }}>{s.n}</div>
                <h3 className="serif" style={{ fontSize: "clamp(22px, 1.9vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.005em", marginBottom: 20, textWrap: "balance" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, textWrap: "pretty" }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
