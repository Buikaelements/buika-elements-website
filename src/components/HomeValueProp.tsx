"use client";

import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * HomeValueProp — replaces the Services preview on the home page.
 *
 * Leads with the client outcome (large serif headline) rather than the
 * service name. The service mechanics are secondary — they explain *how*
 * the outcome is reached, not *what* Buika sells.
 *
 * Layout per item:
 *   Left (cols 1–5):  "For whom" eyebrow  +  outcome headline (serif)
 *   Right (cols 7–12): body paragraph  +  service label
 */
export function HomeValueProp() {
  const { copy } = useLocale();
  const vp = copy.valueProp;

  return (
    <section className="section" style={{ background: "var(--paper)" }}>
      <div className="container">

        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 24,
            marginBottom: 80,
          }}
          className="vp-head"
        >
          <div style={{ gridColumn: "2 / span 3" }} className="vp-head-left">
            <div className="eyebrow" style={{ paddingTop: 6 }}>{vp.eyebrow}</div>
          </div>
          <div style={{ gridColumn: "5 / span 7" }} className="vp-head-right">
            <h2 className="h2">{vp.head}</h2>
          </div>
        </div>

        {/* Value prop items */}
        {vp.items.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: 24,
                paddingBlock: "72px",
                borderTop: "1px solid var(--stone)",
              }}
              className="vp-row"
            >
              {/* Left: number + for-whom + outcome headline */}
              <div style={{ gridColumn: "1 / span 6" }} className="vp-left">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      color: "var(--ink-muted)",
                      paddingTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {item.for}
                  </span>
                </div>
                <h3
                  className="serif"
                  style={{
                    fontSize: "clamp(26px, 2.6vw, 36px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    margin: 0,
                    textWrap: "balance",
                    color: "var(--ink)",
                  }}
                >
                  {item.outcome}
                </h3>
              </div>

              {/* Right: body + service label */}
              <div
                style={{ gridColumn: "7 / span 6", paddingTop: 4 }}
                className="vp-right"
              >
                <p
                  style={{
                    fontSize: "clamp(16px, 1.3vw, 18px)",
                    lineHeight: 1.65,
                    color: "var(--ink-muted)",
                    margin: "0 0 36px",
                    textWrap: "pretty",
                  }}
                >
                  {item.body}
                </p>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--signal)",
                  }}
                >
                  {item.service}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vp-head-left, .vp-head-right { grid-column: 1 / -1 !important; }
          .vp-head-left { margin-bottom: 16px; }
          .vp-left, .vp-right { grid-column: 1 / -1 !important; }
          .vp-left { margin-bottom: 28px; }
          .vp-row { padding-block: 48px !important; }
        }
      `}</style>
    </section>
  );
}
