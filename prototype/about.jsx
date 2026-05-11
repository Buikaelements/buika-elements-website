// about.jsx — About page

// @sync-target: src/components/AboutBio.tsx, src/components/AboutStats.tsx, src/components/AboutOperate.tsx, src/app/[locale]/about/page.tsx
function AboutPage({ copy, onCta }) {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 180, paddingBottom: 96 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="about-hero-inner">
              <div className="eyebrow" style={{ marginBottom: 40 }}>{copy.about.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 900, marginBottom: 32 }}>{copy.about.head}</h1>
              <p className="lede" style={{ maxWidth: 720, color: "var(--ink-muted)" }}>{copy.about.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .about-hero-inner { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      {/* Bio split */}
      <section style={{ paddingBlock: "var(--rhythm-sub)" }}>
        <div className="container">
          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 80,
          }} className="bio-grid">
            <div>
              <Placeholder label="SIMON PORTRAIT — 4:5" ratio="4/5" sublabel="To commission" />
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--ink-muted)",
                marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--stone)",
              }}>
                <span>Fig. 01</span>
                <span>Da Nang · 2026</span>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, color: "var(--signal)" }}>Founder</div>
              <h2 className="serif" style={{
                fontSize: "clamp(28px, 2.6vw, 36px)", lineHeight: 1.15,
                letterSpacing: "-0.005em", margin: 0, marginBottom: 8,
              }}>{copy.about.bio.name}</h2>
              <div style={{ fontSize: 15, color: "var(--ink-muted)", marginBottom: 48 }}>{copy.about.bio.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {copy.about.bio.paragraphs.map((p, i) => (
                  <p key={i} style={{
                    fontSize: "clamp(17px, 1.3vw, 19px)", lineHeight: 1.6, margin: 0,
                    color: "var(--ink)", textWrap: "pretty",
                  }}>{p}</p>
                ))}
              </div>
              <div style={{
                marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--stone)",
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--ink-muted)",
              }}>
                {copy.about.bio.location}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .bio-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* Stats block */}
      <section style={{ paddingBlock: "var(--rhythm-sub)", borderTop: "1px solid var(--stone)" }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 56 }}>{copy.about.statsEyebrow}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="stats-grid">
            {copy.about.stats.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 24 }}>
                  <div className="num-serif" style={{
                    fontSize: "clamp(64px, 8vw, 108px)", lineHeight: 1, color: "var(--ink)",
                    marginBottom: 20,
                  }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)", letterSpacing: "0.02em", maxWidth: 180, textWrap: "pretty" }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }`}</style>
      </section>

      {/* How we operate */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 3" }} className="op-left">
              <div className="eyebrow" style={{ marginBottom: 20 }}>{copy.about.operateEyebrow}</div>
            </div>
            <div style={{ gridColumn: "5 / span 7" }} className="op-right">
              <h2 className="h2" style={{ marginBottom: 56, maxWidth: 600 }}>{copy.about.operateHead}</h2>
              <ol className="num-list">
                {copy.about.operate.map((p, i) => (
                  <li key={i}>
                    <p style={{
                      fontSize: "clamp(17px, 1.3vw, 19px)", lineHeight: 1.55, margin: 0,
                      color: "var(--ink)", textWrap: "pretty",
                    }}>{p}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) {
          .op-left { grid-column: 1 / -1 !important; margin-bottom: 24px; }
          .op-right { grid-column: 1 / -1 !important; }
        }`}</style>
      </section>

      <Statement eyebrow="Principle">{copy.about.statement}</Statement>

      <CtaBand head={copy.about.bottomCta.head} body={copy.about.bottomCta.body} cta={copy.about.bottomCta.cta} onClick={onCta} />
    </>
  );
}

Object.assign(window, { AboutPage });
