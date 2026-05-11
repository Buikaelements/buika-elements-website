"use client";

// @sync-source: prototype/about.jsx#AboutPage (Stats section)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

export function AboutStats() {
  const { copy } = useLocale();
  const a = copy.about;

  return (
    <section style={{ paddingBlock: "var(--rhythm-sub)", background: "var(--teal)" }}>
      <div className="container-site">
        <div className="eyebrow" style={{ marginBottom: 56, color: "rgba(10,10,11,0.55)" }}>{a.statsEyebrow}</div>
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}
        >
          {a.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div style={{ borderTop: "1px solid rgba(10,10,11,0.2)", paddingTop: 24 }}>
                <div
                  className="num-serif"
                  style={{
                    fontSize: "clamp(64px, 8vw, 108px)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    marginBottom: 20,
                  }}
                >
                  {stat.n}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(10,10,11,0.62)",
                    letterSpacing: "0.02em",
                    maxWidth: 180,
                    textWrap: "pretty",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}
