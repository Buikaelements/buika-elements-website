// services.jsx — Services page (full service detail inline)

// @sync-target: src/components/ServicesList.tsx, src/app/[locale]/services/page.tsx
function ServicesPage({ copy, onCta }) {
  return (
    <>
      <section style={{ paddingTop: 180, paddingBottom: 96 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="sv-hero">
              <div className="eyebrow" style={{ marginBottom: 40 }}>{copy.services.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 1000, marginBottom: 32 }}>{copy.services.head}</h1>
              <p className="lede" style={{ maxWidth: 720, color: "var(--ink-muted)" }}>{copy.services.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .sv-hero { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      <section>
        <div className="container">
          {copy.services.list.map((s, i) => (
            <Reveal key={i}>
              <article style={{
                paddingBlock: 96,
                borderTop: "1px solid var(--ink)",
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24,
                }}>
                  <div style={{ gridColumn: "1 / span 4" }} className="sv-meta">
                    <div className="num-serif" style={{
                      fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1, color: "var(--ink-muted)",
                      marginBottom: 24,
                    }}>0{i+1}</div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "var(--ink-muted)",
                      lineHeight: 1.5, maxWidth: 260,
                    }}>
                      {s.situation}
                    </div>
                  </div>
                  <div style={{ gridColumn: "5 / span 8" }} className="sv-body">
                    <h2 className="h2" style={{ marginBottom: 28, maxWidth: 780 }}>{s.title}</h2>
                    <p style={{
                      fontSize: "clamp(17px, 1.35vw, 19px)", lineHeight: 1.6, maxWidth: 680,
                      marginBottom: 40, textWrap: "pretty",
                    }}>{s.intro}</p>
                    <ul style={{
                      listStyle: "none", margin: 0, padding: 0,
                      borderTop: "1px solid var(--stone)",
                      maxWidth: 720,
                    }}>
                      {s.bullets.map((b, j) => (
                        <li key={j} style={{
                          borderBottom: "1px solid var(--stone)",
                          padding: "18px 0",
                          display: "grid", gridTemplateColumns: "32px 1fr", gap: 12,
                          fontSize: 16, lineHeight: 1.55, color: "var(--ink)",
                        }}>
                          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--signal)", paddingTop: 4 }}>
                            0{j+1}
                          </span>
                          <span style={{ textWrap: "pretty" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{
                      marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--ink)",
                      maxWidth: 720,
                    }}>
                      <div className="eyebrow" style={{ marginBottom: 16, color: "var(--signal)" }}>Outcome</div>
                      <p className="serif" style={{
                        fontSize: "clamp(20px, 1.9vw, 24px)", lineHeight: 1.35,
                        letterSpacing: "-0.005em", margin: 0, textWrap: "balance",
                      }}>{s.outcome}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        head="Not sure which service fits your situation?"
        body="Tell us where you are and what you're trying to solve. We'll suggest the right structure in a first call."
        cta="Book a call"
        onClick={onCta}
      />

      <style>{`@media (max-width: 900px) {
        .sv-meta, .sv-body { grid-column: 1 / -1 !important; }
        .sv-meta { margin-bottom: 32px; }
      }`}</style>
    </>
  );
}

Object.assign(window, { ServicesPage });
