"use client";

// @sync-source: prototype/home.jsx#PositioningBlock
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * HomePositioning — the "what Buika Elements is" section. Editorial two-
 * column block: eyebrow on the left, heading + paragraphs on the right.
 * Sets the argumentative frame for the rest of the page.
 */
export function HomePositioning() {
  const { copy } = useLocale();

  return (
    <section className="section">
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24,
        }}>
          <div style={{ gridColumn: "2 / span 3" }} className="pos-left">
            <div className="eyebrow">{copy.home.positioningEyebrow}</div>
          </div>
          <div style={{ gridColumn: "5 / span 7" }} className="pos-right">
            <Reveal>
              <h2 className="h2" style={{ marginBottom: 40 }}>
                {(() => {
                  const parts = copy.home.positioningHead.split(/\.\s+/);
                  return parts.length >= 2 ? (
                    <>
                      <span style={{ color: "var(--ink-muted)" }}>{parts[0]}.</span><br/>
                      <span>{parts.slice(1).join(". ")}</span>
                    </>
                  ) : copy.home.positioningHead;
                })()}
              </h2>
              {copy.home.positioningBody.map((p: string, i: number) => (
                <p key={i} style={{
                  fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.6,
                  margin: i === 0 ? "0 0 24px" : 0, textWrap: "pretty",
                }}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) {
        .pos-left { grid-column: 1 / -1 !important; margin-bottom: 32px; }
        .pos-right { grid-column: 1 / -1 !important; }
      }`}</style>
    </section>
  );
}
