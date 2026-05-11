// resource-detail.jsx — Single article/whitepaper detail (placeholder until Sanity)

function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

// @sync-target: src/app/[locale]/resources/[slug]/page.tsx
function ResourceDetailPage({ copy, lang, slug, setRoute, onCta }) {
  const article = React.useMemo(() => {
    const list = copy.resources.articles;
    return list.find(a => slugify(a.title) === slug) || list[0];
  }, [slug, copy]);

  const isWp = article.category === "Whitepaper";
  const isGated = !!article.gated;

  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errs, setErrs] = React.useState({});
  const [delivered, setDelivered] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true;
    if (!consent) next.consent = true;
    setErrs(next);
    if (Object.keys(next).length === 0) setDelivered(true);
  };

  // Related: same category, not this one, first 2.
  const related = copy.resources.articles
    .filter(a => a.category === article.category && a.title !== article.title)
    .slice(0, 2);

  // Placeholder body paragraphs (since prototype has no real body field).
  const placeholderBody = lang === "es"
    ? [
        "Esta página es una vista previa. El cuerpo del documento se gestionará desde Sanity una vez integrado el CMS.",
        "Mientras tanto, el resumen y los metadatos provienen del documento de copy. La descarga del PDF está sujeta a verificación de email; el enlace se envía a tu bandeja, no se sirve directamente.",
      ]
    : [
        "This page is a preview. The document body will be managed in Sanity once the CMS is wired up.",
        "Meanwhile, the abstract and metadata come from the copy document. PDF downloads are gated by email verification; the link is sent to your inbox rather than served directly.",
      ];

  return (
    <>
      {/* ─── Header ─── */}
      <section style={{ paddingTop: 180, paddingBottom: 64 }}>
        <div className="container">
          <button onClick={() => setRoute("resources")}
                  className="mono"
                  style={{
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--ink-muted)", marginBottom: 48, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}>
            ← {lang === "es" ? "Recursos" : "Resources"}
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="rd-head">
              <div className="eyebrow" style={{ marginBottom: 32, color: isWp ? "var(--signal)" : undefined }}>
                <span>{article.category}</span>
                <span style={{ margin: "0 12px", color: "var(--ink-faint)" }}>·</span>
                <span style={{ color: "var(--ink-muted)" }}>{article.date}</span>
              </div>

              <h1 className="h1" style={{ marginBottom: 40, maxWidth: 1100 }}>{article.title}</h1>

              <p className="lede" style={{ maxWidth: 720, color: "var(--ink-muted)" }}>{article.excerpt}</p>

              <dl style={{
                display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "12px 48px",
                margin: "56px 0 0", padding: 0,
                borderTop: "1px solid var(--stone)", paddingTop: 24,
              }} className="rd-meta">
                <div>
                  <dt className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 4 }}>
                    {lang === "es" ? "Autor" : "Author"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>Simon Buika</dd>
                </div>
                <div>
                  <dt className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 4 }}>
                    {lang === "es" ? "Formato" : "Format"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{article.read}</dd>
                </div>
                <div>
                  <dt className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 4 }}>
                    {lang === "es" ? "Idiomas" : "Languages"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{article.lang}</dd>
                </div>
                <div>
                  <dt className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 4 }}>
                    {lang === "es" ? "Publicado" : "Published"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{article.date}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 760px) {
            .rd-head { grid-column: 1 / -1 !important; }
            .rd-meta { grid-template-columns: repeat(2, auto) !important; gap: 20px 32px !important; }
          }
        `}</style>
      </section>

      {/* ─── Body / gate ─── */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            {/* Left: body */}
            <div style={{ gridColumn: "2 / span 7" }} className="rd-body">
              {placeholderBody.map((p, i) => (
                <p key={i} className="body" style={{ marginBottom: 24, color: "var(--ink-muted)", maxWidth: 680 }}>{p}</p>
              ))}

              <div style={{
                marginTop: 48, padding: "20px 24px",
                borderLeft: "2px solid var(--signal)", background: "var(--stone-soft)",
              }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--signal)", marginBottom: 6 }}>
                  {lang === "es" ? "Marcador de posición" : "Placeholder"}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-muted)" }}>
                  {lang === "es"
                    ? "El contenido completo se servirá desde Sanity. Esquema y consultas GROQ ya definidos."
                    : "Full body will be served from Sanity. Schema and GROQ queries already defined."}
                </div>
              </div>
            </div>

            {/* Right: gate / download */}
            <aside style={{ gridColumn: "10 / span 3" }} className="rd-aside">
              <div style={{ position: "sticky", top: 120 }}>
                {isGated ? (
                  delivered ? (
                    <div style={{ padding: 24, border: "1px solid var(--stone)" }}>
                      <div className="signal-rule" style={{ marginBottom: 16 }} />
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--signal)", marginBottom: 12 }}>
                        ✓ {lang === "es" ? "Enlace enviado" : "Link sent"}
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)", margin: 0 }}>
                        {lang === "es"
                          ? `Hemos enviado el PDF a ${email}. El enlace caduca en 24 horas.`
                          : `We've emailed the PDF to ${email}. The link expires in 24 hours.`}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={submit} style={{ padding: 24, border: "1px solid var(--ink)" }} noValidate>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--signal)", marginBottom: 12 }}>
                        ↓ {lang === "es" ? "Descarga gratuita" : "Free download"}
                      </div>
                      <h4 className="h4" style={{ marginBottom: 8 }}>
                        {lang === "es" ? "Solicita el PDF" : "Request the PDF"}
                      </h4>
                      <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 24, lineHeight: 1.5 }}>
                        {lang === "es"
                          ? "Te enviaremos el enlace por email. Sin listas de marketing automáticas."
                          : "We'll email you the link. No automatic marketing lists."}
                      </p>

                      <div className={"field" + (errs.email ? " err" : "")} style={{ marginBottom: 16 }}>
                        <label htmlFor="rd-email">{lang === "es" ? "Email profesional" : "Work email"} <span className="req">*</span></label>
                        <input id="rd-email" type="email" value={email}
                               onChange={e => { setEmail(e.target.value); setErrs(p => ({ ...p, email: false })); }} />
                        {errs.email && <div className="err-msg">{lang === "es" ? "Email no válido." : "Please enter a valid email."}</div>}
                      </div>

                      <label className="consent" style={{ marginBottom: 20 }}>
                        <input type="checkbox" checked={consent}
                               onChange={e => { setConsent(e.target.checked); setErrs(p => ({ ...p, consent: false })); }} />
                        <span>
                          {lang === "es"
                            ? "Acepto recibir el PDF y comunicaciones ocasionales sobre este tema."
                            : "I agree to receive the PDF and occasional related correspondence."}
                        </span>
                      </label>
                      {errs.consent && <div className="err-msg" style={{ marginTop: -12, marginBottom: 16 }}>{lang === "es" ? "Requerido." : "Required."}</div>}

                      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                        {lang === "es" ? "Enviar enlace" : "Send link"} <span className="arr">→</span>
                      </button>
                    </form>
                  )
                ) : (
                  <div style={{ padding: 24, border: "1px solid var(--stone)" }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>
                      {lang === "es" ? "Lectura abierta" : "Open reading"}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--ink-muted)", margin: 0, lineHeight: 1.5 }}>
                      {lang === "es" ? "Sin descarga. Lectura completa arriba." : "No download. Full read above."}
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .rd-body { grid-column: 1 / -1 !important; }
            .rd-aside { grid-column: 1 / -1 !important; }
            .rd-aside > div { position: static !important; }
          }
        `}</style>
      </section>

      {/* ─── Related ─── */}
      {related.length > 0 && (
        <section style={{ paddingBlock: 96, borderTop: "1px solid var(--stone)" }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 40 }}>
              {lang === "es" ? "Lectura relacionada" : "Related reading"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="rd-related">
              {related.map((r, i) => (
                <a key={i} onClick={(e) => { e.preventDefault(); setRoute("resource:" + slugify(r.title)); }}
                   href="#" style={{ display: "block", paddingTop: 24, borderTop: "1px solid var(--ink)" }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: r.category === "Whitepaper" ? "var(--signal)" : "var(--ink-muted)", marginBottom: 12 }}>
                    {r.category} · {r.date}
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(20px, 1.8vw, 24px)", lineHeight: 1.25, letterSpacing: "-0.005em", marginBottom: 12, textWrap: "balance" }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)", margin: 0, maxWidth: 480 }}>{r.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 760px) { .rd-related { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
        </section>
      )}
    </>
  );
}

Object.assign(window, { ResourceDetailPage, slugify });
