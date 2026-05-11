// resources.jsx — Resources index with working filters + newsletter

// @sync-target: src/components/ResourcesIndex.tsx, src/app/[locale]/resources/page.tsx
function ResourcesPage({ copy, onCta, lang, setRoute }) {
  const [filter, setFilter] = React.useState(copy.resources.filters[0]);
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);

  React.useEffect(() => { setFilter(copy.resources.filters[0]); }, [lang]);

  const filtered = React.useMemo(() => {
    const f = filter;
    const all = copy.resources.filters[0];
    if (f === all) return copy.resources.articles;
    // map labels to categories
    const map = {
      "Essays": ["Essay"],
      "Whitepapers": ["Whitepaper"],
      "Field notes": ["Field note"],
      "Ensayos": ["Ensayo"],
      "Whitepapers ": ["Whitepaper"],
      "Notas de campo": ["Nota de campo"],
    };
    // Normalize: check first category word
    return copy.resources.articles.filter(a => {
      if (f === "Essays" || f === "Ensayos") return a.category === "Essay" || a.category === "Ensayo";
      if (f === "Whitepapers") return a.category === "Whitepaper";
      if (f === "Field notes" || f === "Notas de campo") return a.category === "Field note" || a.category === "Nota de campo";
      return true;
    });
  }, [filter, copy]);

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr(true); return; }
    setEmailErr(false);
    setSubscribed(true);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 180, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="res-hero">
              <div className="eyebrow" style={{ marginBottom: 40 }}>{copy.resources.eyebrow}</div>
              <h1 className="h1" style={{ maxWidth: 1100, marginBottom: 32 }}>{copy.resources.head}</h1>
              <p className="lede" style={{ maxWidth: 640, color: "var(--ink-muted)" }}>{copy.resources.sub}</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .res-hero { grid-column: 1 / -1 !important; } }`}</style>
      </section>

      {/* Filters */}
      <section style={{ paddingTop: 24, paddingBottom: 24, borderTop: "1px solid var(--stone)", borderBottom: "1px solid var(--stone)", position: "sticky", top: 72, background: "color-mix(in srgb, var(--paper) 96%, transparent)", backdropFilter: "blur(8px)", zIndex: 20 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {copy.resources.filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{
                    fontSize: 13, padding: "8px 16px",
                    color: filter === f ? "var(--paper)" : "var(--ink)",
                    background: filter === f ? "var(--ink)" : "transparent",
                    border: "1px solid " + (filter === f ? "var(--ink)" : "var(--stone)"),
                    borderRadius: 2,
                    transition: "all 180ms var(--ease)",
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              {filtered.length} / {copy.resources.articles.length}
            </div>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section style={{ paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((a, i) => {
              const isWp = a.category === "Whitepaper";
              return (
                <Reveal key={`${a.title}-${i}`} delay={i * 40}>
                  <article style={{
                    display: "grid", gridTemplateColumns: "140px 1fr 180px",
                    gap: 32, padding: "40px 0",
                    borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--stone)",
                    cursor: "pointer",
                  }} className="res-row" onClick={() => setRoute && setRoute("resource:" + window.slugify(a.title))}>
                    <div>
                      <div style={{
                        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isWp ? "var(--signal)" : "var(--ink-muted)",
                        marginBottom: 8,
                      }}>
                        {isWp && "↓ "}{a.category}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{a.date}</div>
                    </div>
                    <div>
                      <h3 className="serif" style={{
                        fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2,
                        letterSpacing: "-0.005em", marginBottom: 12, textWrap: "balance",
                      }}>
                        {a.title}
                      </h3>
                      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-muted)", margin: 0, maxWidth: 640, textWrap: "pretty" }}>
                        {a.excerpt}
                      </p>
                      {isWp && (
                        <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-muted)", fontStyle: "italic" }}>
                          {lang === "es" ? "Descarga requiere email" : "Download requires email"}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right", fontSize: 13, color: "var(--ink-muted)" }}>
                      <div>{a.read}</div>
                      <div style={{ marginTop: 6, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>{a.lang}</div>
                      <div style={{ marginTop: 16, color: "var(--signal)", fontSize: 14 }}>→</div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: "80px 0", textAlign: "center", color: "var(--ink-muted)" }}>
                No resources match this filter yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: "var(--stone-soft)", paddingBlock: 96 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "center" }} className="nl-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Newsletter</div>
              <h3 className="serif" style={{ fontSize: "clamp(26px, 2.4vw, 34px)", lineHeight: 1.2, letterSpacing: "-0.008em", margin: 0, textWrap: "balance" }}>
                {copy.resources.newsletter.head}
              </h3>
            </div>
            <div>
              {subscribed ? (
                <div style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--signal)" }}>
                  ✓ {lang === "es" ? "Suscrito. Te hemos enviado un email de confirmación." : "Subscribed. Check your inbox for a confirmation email."}
                </div>
              ) : (
                <form onSubmit={submitNewsletter} style={{ display: "flex", gap: 0, alignItems: "stretch", borderBottom: "1px solid var(--ink)" }}>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailErr(false); }}
                         placeholder={copy.resources.newsletter.placeholder}
                         style={{
                           flex: 1, border: 0, background: "transparent",
                           padding: "14px 0", fontSize: 17, outline: "none",
                           color: emailErr ? "#A33" : "var(--ink)",
                         }} />
                  <button type="submit" style={{
                    background: "var(--ink)", color: "var(--paper)",
                    padding: "0 24px", fontSize: 14, fontWeight: 500,
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}>
                    {copy.resources.newsletter.cta} <span>→</span>
                  </button>
                </form>
              )}
              {emailErr && <div style={{ color: "#A33", fontSize: 13, marginTop: 8 }}>Please enter a valid email.</div>}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .nl-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <style>{`@media (max-width: 760px) {
        .res-row { grid-template-columns: 1fr !important; gap: 12px !important; padding: 28px 0 !important; }
        .res-row > div:last-child { text-align: left !important; }
      }`}</style>
    </>
  );
}

Object.assign(window, { ResourcesPage });
