"use client";

// @sync-source: prototype/home.jsx#WhyBlock
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * HomeWhy — "four things, stated plainly". 2×2 grid on desktop, stacked
 * on mobile. Each cell: mono numeral over a serif label and a body
 * paragraph. No icons; the restraint IS the visual treatment.
 */
export function HomeWhy() {
  const { copy } = useLocale();

  return (
    <section className="section" style={{ background: "var(--slate)", color: "var(--paper)" }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 20, color: "rgba(243,239,230,0.5)" }}>{copy.home.whyEyebrow}</div>
          <h2 className="h2" style={{ maxWidth: 760, color: "var(--paper)" }}>{copy.home.whyHead}</h2>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          borderTop: "1px solid rgba(243,239,230,0.15)",
        }} className="why-grid">
          {copy.home.why.map((w: { label: string; body: string }, i: number) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                padding: "40px 48px 40px 0",
                borderRight: i % 2 === 0 ? "1px solid rgba(243,239,230,0.12)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(243,239,230,0.12)" : "none",
                paddingLeft: i % 2 === 1 ? 48 : 0,
              }} className="why-cell">
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--teal)", marginBottom: 16,
                }}>0{i+1}</div>
                <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.22, letterSpacing: "-0.005em", marginBottom: 16, color: "var(--paper)" }}>
                  {w.label}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(243,239,230,0.6)", margin: 0, textWrap: "pretty", maxWidth: 480 }}>
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) {
        .why-grid { grid-template-columns: 1fr !important; }
        .why-cell { padding: 32px 0 !important; border-right: 0 !important; border-bottom: 1px solid rgba(243,239,230,0.12) !important; }
        .why-cell:last-child { border-bottom: 0 !important; }
      }`}</style>
    </section>
  );
}
