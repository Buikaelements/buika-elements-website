// home.jsx — Home page with 3 hero variants + all sections

// @sync-target: src/components/HomeHero.tsx
function HeroTypographic({ copy, onCta, variant = "standard" }) {
  // variant: "standard" | "stacked" | "indexed"
  const baseSlate = {
    background: "var(--slate)", color: "var(--paper)", position: "relative",
    minHeight: "min(860px, 100dvh)", display: "flex", alignItems: "center",
    paddingTop: 140, paddingBottom: 120, overflow: "hidden",
  };

  if (variant === "stacked") {
    return (
      <section style={baseSlate}>
        <BgTexture />
        <div className="container" style={{ position: "relative", width: "100%" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24,
          }}>
            <div style={{ gridColumn: "2 / span 10" }} className="hero-inner">
              <div className="eyebrow on-dark" style={{ marginBottom: 40 }}>
                <span className="dot" style={{ color: "var(--signal)" }}>●</span>&nbsp;&nbsp;{copy.home.heroEyebrow}
              </div>
              <h1 className="serif" style={{
                fontSize: "clamp(56px, 9vw, 116px)", lineHeight: 0.98, letterSpacing: "-0.035em",
                fontWeight: 400, margin: 0, color: "var(--paper)", textWrap: "balance",
              }}>
                {copy.home.heroHeadline[0]}<br/>
                <span style={{ color: "rgba(243,239,230,0.55)" }}>{copy.home.heroHeadline[1]}</span>
              </h1>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
                marginTop: 80, alignItems: "end",
              }} className="hero-stacked-row">
                <p style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.55,
                  color: "rgba(243,239,230,0.78)", maxWidth: 520, margin: 0,
                }}>{copy.home.heroSub}</p>
                <div style={{ justifySelf: "start" }}>
                  <button className="btn btn-primary-on-dark" onClick={onCta}>
                    {copy.home.heroCta} <span className="arr">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <HeroFoot lang="BUIKAELEMENTS.COM" />
        </div>
        <style>{`@media (max-width: 760px) { .hero-stacked-row { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
      </section>
    );
  }

  if (variant === "indexed") {
    return (
      <section style={baseSlate}>
        <BgTexture />
        <div className="container" style={{ position: "relative", width: "100%" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24,
          }}>
            <div style={{ gridColumn: "2 / span 2", borderTop: "1px solid rgba(243,239,230,0.2)", paddingTop: 24 }} className="hero-idx-col">
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(243,239,230,0.55)", marginBottom: 140 }}>
                Index<br/>01 / 04
              </div>
              <div className="eyebrow on-dark">
                {copy.home.heroEyebrow}
              </div>
            </div>
            <div style={{ gridColumn: "4 / span 8", borderTop: "1px solid rgba(243,239,230,0.2)", paddingTop: 24 }} className="hero-idx-main">
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(243,239,230,0.55)", marginBottom: 140 }}>
                Da Nang · Vietnam &nbsp;&nbsp;—&nbsp;&nbsp; 2026
              </div>
              <h1 className="serif" style={{
                fontSize: "clamp(44px, 6.2vw, 78px)", lineHeight: 1.05, letterSpacing: "-0.022em",
                fontWeight: 400, margin: 0, color: "var(--paper)", textWrap: "balance",
              }}>
                {copy.home.heroHeadline[0]} {copy.home.heroHeadline[1]}
              </h1>
              <p style={{
                marginTop: 40, fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.6,
                color: "rgba(243,239,230,0.78)", maxWidth: 620,
              }}>{copy.home.heroSub}</p>
              <div style={{ marginTop: 48 }}>
                <button className="btn btn-primary-on-dark" onClick={onCta}>
                  {copy.home.heroCta} <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
          <HeroFoot lang="BUIKAELEMENTS.COM" />
        </div>
        <style>{`@media (max-width: 900px) {
          .hero-idx-col { grid-column: 2 / -2 !important; }
          .hero-idx-main { grid-column: 2 / -2 !important; padding-top: 8px !important; border-top: 0 !important; }
          .hero-idx-col > div:nth-child(1) { margin-bottom: 32px !important; }
          .hero-idx-main > div:nth-child(1) { margin-bottom: 32px !important; }
        }`}</style>
      </section>
    );
  }

  // standard (default) — the briefs' spec: left-aligned, col 2-9
  return (
    <section style={baseSlate}>
      <BgTexture />
      <div className="container" style={{ position: "relative", width: "100%" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24,
        }}>
          <div style={{ gridColumn: "2 / span 8" }} className="hero-inner">
            <div className="eyebrow on-dark" style={{ marginBottom: 56 }}>
              <span style={{ color: "var(--signal)" }}>●</span>&nbsp;&nbsp;{copy.home.heroEyebrow}
            </div>
            <h1 className="serif" style={{
              fontSize: "clamp(48px, 7.4vw, 92px)", lineHeight: 1.03, letterSpacing: "-0.028em",
              fontWeight: 400, margin: 0, color: "var(--paper)", textWrap: "balance",
            }}>
              {copy.home.heroHeadline[0]}<br/>{copy.home.heroHeadline[1]}
            </h1>
            <p style={{
              marginTop: 40, fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55,
              color: "rgba(243,239,230,0.78)", maxWidth: 600,
            }}>{copy.home.heroSub}</p>
            <div style={{ marginTop: 48 }}>
              <button className="btn btn-primary-on-dark" onClick={onCta}>
                {copy.home.heroCta} <span className="arr">→</span>
              </button>
            </div>
          </div>
        </div>
        <HeroFoot lang="BUIKAELEMENTS.COM" />
      </div>
      <style>{`@media (max-width: 760px) { .hero-inner { grid-column: 1 / -1 !important; } }`}</style>
    </section>
  );
}

function BgTexture() {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent 0, transparent 48px, rgba(243,239,230,0.018) 48px, rgba(243,239,230,0.018) 49px)",
      opacity: 0.7,
    }} />
  );
}

function HeroFoot({ lang }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: -48, paddingInline: "clamp(24px, 4vw, 48px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
      color: "rgba(243,239,230,0.4)", pointerEvents: "none",
    }}>
      <span>Est. 2009 — 16 YRS</span>
      <span>{lang}</span>
    </div>
  );
}

// ─────── Positioning block ───────
// @sync-target: src/components/HomePositioning.tsx
function PositioningBlock({ copy }) {
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
              {copy.home.positioningBody.map((p, i) => (
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

// ─────── Two-column contrast ───────
// @sync-target: src/components/HomeContrast.tsx
function ContrastBlock({ copy }) {
  const c = copy.home.contrast;
  return (
    <section style={{ paddingBlock: "var(--rhythm-sub)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 48 }}>{copy.home.contrastEyebrow}</div>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
            borderTop: "1px solid var(--ink)",
          }} className="contrast-grid">
            <div style={{
              padding: "48px 48px 48px 0", background: "transparent",
              color: "var(--ink-muted)",
            }} className="contrast-cell">
              <div style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 24,
              }}>{c.left.label}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                {c.left.lines.map((l, i) => (
                  <li key={i} className="serif" style={{ fontSize: "clamp(22px, 2.1vw, 28px)", lineHeight: 1.25, letterSpacing: "-0.005em" }}>{l}</li>
                ))}
              </ul>
            </div>
            <div style={{
              padding: "48px", background: "transparent",
              borderLeft: "2px solid var(--signal)",
              color: "var(--ink)",
            }} className="contrast-cell">
              <div style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 24, color: "var(--signal)",
              }}>{c.right.label}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                {c.right.lines.map((l, i) => (
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

// ─────── Three-step process ───────
// @sync-target: src/components/HomeSteps.tsx
function StepsBlock({ copy }) {
  return (
    <section className="section" style={{ background: "var(--stone-soft)" }}>
      <div className="container">
        <div style={{ marginBottom: 72 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>{copy.home.stepsEyebrow}</div>
          <h2 className="h2" style={{ maxWidth: 760 }}>{copy.home.stepsHead}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="steps-grid">
          {copy.home.steps.map((s, i) => (
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

// ─────── Why Buika — 2x2 ───────
// @sync-target: src/components/HomeWhy.tsx
function WhyBlock({ copy }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 72 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>{copy.home.whyEyebrow}</div>
          <h2 className="h2" style={{ maxWidth: 760 }}>{copy.home.whyHead}</h2>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          borderTop: "1px solid var(--ink)",
        }} className="why-grid">
          {copy.home.why.map((w, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                padding: "40px 48px 40px 0",
                borderRight: i % 2 === 0 ? "1px solid var(--stone)" : "none",
                borderBottom: i < 2 ? "1px solid var(--stone)" : "none",
                paddingLeft: i % 2 === 1 ? 48 : 0,
              }} className="why-cell">
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 16,
                }}>0{i+1}</div>
                <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.22, letterSpacing: "-0.005em", marginBottom: 16 }}>
                  {w.label}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, textWrap: "pretty", maxWidth: 480 }}>
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) {
        .why-grid { grid-template-columns: 1fr !important; }
        .why-cell { padding: 32px 0 !important; border-right: 0 !important; border-bottom: 1px solid var(--stone) !important; }
        .why-cell:last-child { border-bottom: 0 !important; }
      }`}</style>
    </section>
  );
}

// ─────── Services preview on home ───────
// @sync-target: src/components/ServicesList.tsx
function ServicesPreview({ copy, setRoute }) {
  return (
    <section className="section" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ marginBottom: 72, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }} className="sp-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{copy.services.eyebrow}</div>
            <h2 className="h2" style={{ maxWidth: 640 }}>{copy.services.head}</h2>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            01 · 02 · 03
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {copy.services.list.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <article style={{
                display: "grid", gridTemplateColumns: "72px 1fr minmax(auto, 200px)",
                gap: 32, padding: "48px 0",
                borderTop: "1px solid var(--stone)",
              }} className="sp-row">
                <div className="num-serif" style={{ fontSize: 36, lineHeight: 1, color: "var(--ink-muted)" }}>0{i+1}</div>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>
                    {s.situation}
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: 1.18, letterSpacing: "-0.008em", marginBottom: 16 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, maxWidth: 680, textWrap: "pretty" }}>
                    {s.intro}
                  </p>
                </div>
                <div style={{ justifySelf: "end", alignSelf: "center" }} className="sp-arrow">
                  <span className="link-cta" style={{ color: "var(--signal)", fontSize: 14 }}>Read more →</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) {
        .sp-head { flex-direction: column !important; align-items: flex-start !important; }
        .sp-row { grid-template-columns: 48px 1fr !important; gap: 16px !important; padding: 32px 0 !important; }
        .sp-arrow { display: none !important; }
      }`}</style>
    </section>
  );
}

// ─────── HomePage composition ───────
// @sync-target: src/app/[locale]/page.tsx
function HomePage({ copy, onCta, heroVariant }) {
  return (
    <>
      <HeroTypographic copy={copy} onCta={onCta} variant={heroVariant} />
      <CredibilityBar items={copy.home.credibility} />
      <PositioningBlock copy={copy} />
      <ContrastBlock copy={copy} />
      <StepsBlock copy={copy} />
      <WhyBlock copy={copy} />
      <ServicesPreview copy={copy} />
      <CtaBand head={copy.home.bottomCta.head} body={copy.home.bottomCta.body} cta={copy.home.bottomCta.cta} onClick={onCta} />
    </>
  );
}

Object.assign(window, { HomePage });
