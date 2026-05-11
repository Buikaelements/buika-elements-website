"use client";

// @sync-source: prototype/about.jsx#AboutPage (Operate section)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";

export function AboutOperate() {
  const { copy } = useLocale();
  const a = copy.about;

  return (
    <section className="section" style={{ background: "var(--signal)", color: "var(--paper)" }}>
      <div className="container-site">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
          <div style={{ gridColumn: "2 / span 3" }} className="op-left">
            <div className="eyebrow" style={{ marginBottom: 20, color: "rgba(243,239,230,0.5)" }}>{a.operateEyebrow}</div>
          </div>
          <div style={{ gridColumn: "5 / span 7" }} className="op-right">
            <h2 className="h2" style={{ marginBottom: 56, maxWidth: 600, color: "var(--paper)" }}>{a.operateHead}</h2>
            <ol className="num-list op-num-list" style={{ borderColor: "rgba(243,239,230,0.15)" }}>
              {a.operate.map((line, i) => (
                <li key={i} style={{ borderTopColor: "rgba(243,239,230,0.15)", borderBottomColor: "rgba(243,239,230,0.15)" }}>
                  <p
                    style={{
                      fontSize: "clamp(17px, 1.3vw, 19px)",
                      lineHeight: 1.55,
                      margin: 0,
                      color: "rgba(243,239,230,0.82)",
                      textWrap: "pretty",
                    }}
                  >
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .op-left { grid-column: 1 / -1 !important; margin-bottom: 24px; }
          .op-right { grid-column: 1 / -1 !important; }
        }
        .op-num-list li::before { color: var(--teal) !important; }
        .op-num-list li { border-top-color: rgba(243,239,230,0.15) !important; }
        .op-num-list li:last-child { border-bottom-color: rgba(243,239,230,0.15) !important; }
      `}</style>
    </section>
  );
}
