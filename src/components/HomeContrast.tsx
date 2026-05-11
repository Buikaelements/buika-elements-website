"use client";

// @sync-source: prototype/home.jsx#ContrastBlock
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * HomeContrast — the head-to-head between "direct factory" and "Buika
 * Elements". Two columns separated by a vertical signal-coloured rule.
 * Each row is one parallel claim, so left/right read across.
 */
export function HomeContrast() {
  const { copy } = useLocale();
  const c = copy.home.contrast;

  return (
    <section style={{ paddingBlock: "var(--rhythm-sub)", background: "var(--signal)", color: "var(--paper)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 48, color: "rgba(243,239,230,0.55)" }}>{copy.home.contrastEyebrow}</div>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
            borderTop: "1px solid rgba(243,239,230,0.2)",
          }} className="contrast-grid">
            <div style={{
              padding: "48px 48px 48px 0", background: "transparent",
              color: "rgba(243,239,230,0.55)",
            }} className="contrast-cell">
              <div style={{
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 24,
              }}>{c.left.label}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                {c.left.lines.map((l: string, i: number) => (
                  <li key={i} className="serif" style={{ fontSize: "clamp(22px, 2.1vw, 28px)", lineHeight: 1.25, letterSpacing: "-0.005em" }}>{l}</li>
                ))}
              </ul>
            </div>
            <div style={{
              padding: "48px", background: "transparent",
              borderLeft: "2px solid var(--teal)",
              color: "var(--paper)",
            }} className="contrast-cell">
              <div style={{
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 24, color: "var(--teal)",
              }}>{c.right.label}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                {c.right.lines.map((l: string, i: number) => (
                  <li key={i} className="serif" style={{ fontSize: "clamp(22px, 2.1vw, 28px)", lineHeight: 1.25, letterSpacing: "-0.005em" }}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 760px) {
        .contrast-grid { grid-template-columns: 1fr !important; }
        .contrast-cell { padding: 32px !important; padding-left: 0 !important; }
        .contrast-cell + .contrast-cell { padding: 32px !important; }
      }`}</style>
    </section>
  );
}
