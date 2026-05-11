// chrome.jsx — Nav, Footer, ContactModal, Statement, CtaBand, Placeholder, Reveal, CredibilityBar

const { useState, useEffect, useRef, useMemo } = React;

// ─────── Reveal on scroll ───────
// @sync-target: src/components/Reveal.tsx
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>{children}</As>;
}

// ─────── Wordmark ───────
// @sync-target: src/components/Wordmark.tsx
function Wordmark({ size = 20, onDark = false }) {
  return (
    <span style={{
      fontFamily: "var(--serif)",
      fontWeight: 400,
      fontSize: size,
      letterSpacing: "0.08em",
      color: onDark ? "var(--paper)" : "var(--ink)",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5em",
      whiteSpace: "nowrap",
    }}>
      <span style={{
        display: "inline-block",
        width: "0.32em", height: "0.32em",
        background: "var(--signal)",
        marginTop: "0.08em",
        flexShrink: 0,
      }} />
      <span style={{ whiteSpace: "nowrap" }}>Buika Elements</span>
    </span>
  );
}

// ─────── Top Nav ───────
// @sync-target: src/components/TopNav.tsx
function TopNav({ route, setRoute, lang, setLang, onOpenContact, copy }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
  }, [mobileOpen]);

  const items = [
    { key: "home", label: copy.nav.home },
    { key: "services", label: copy.nav.services },
    { key: "about", label: copy.nav.about },
    { key: "resources", label: copy.nav.resources },
  ];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
    background: "color-mix(in srgb, var(--paper) 92%, transparent)",
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
    borderBottom: scrolled ? "1px solid var(--stone)" : "1px solid transparent",
    transition: "border-color 200ms var(--ease)",
  };

  return (
    <>
      <header style={navStyle}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setRoute("home"); }} aria-label="Buika Elements home">
            <Wordmark size={18} />
          </a>
          <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {items.map(it => {
              const active = route === it.key;
              return (
                <a key={it.key} href={`#${it.key}`}
                   onClick={(e) => { e.preventDefault(); setRoute(it.key); }}
                   style={{
                     fontSize: 14, fontWeight: active ? 500 : 400,
                     color: active ? "var(--ink)" : "var(--ink-muted)",
                     paddingBottom: 4,
                     borderBottom: active ? "1px solid var(--ink)" : "1px solid transparent",
                     transition: "color 200ms var(--ease), border-color 200ms var(--ease)",
                   }}>
                  {it.label}
                </a>
              );
            })}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginLeft: 12 }}>
              <button onClick={() => setLang("en")} style={{
                color: lang === "en" ? "var(--ink)" : "var(--ink-muted)",
                fontWeight: lang === "en" ? 500 : 400,
              }}>EN</button>
              <span style={{ color: "var(--stone)" }}>/</span>
              <button onClick={() => setLang("es")} style={{
                color: lang === "es" ? "var(--ink)" : "var(--ink-muted)",
                fontWeight: lang === "es" ? 500 : 400,
              }}>ES</button>
            </div>
          </nav>
          <button className="nav-hamburger"
                  onClick={() => setMobileOpen(o => !o)}
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  style={{ display: "none", width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 12, position: "relative" }}>
              <div style={{
                position: "absolute", left: 0, right: 0, height: 1, background: "var(--ink)",
                top: mobileOpen ? 6 : 0,
                transform: mobileOpen ? "rotate(45deg)" : "none",
                transition: "all 200ms var(--ease)",
              }} />
              <div style={{
                position: "absolute", left: 0, right: 0, height: 1, background: "var(--ink)",
                top: mobileOpen ? 6 : 11,
                transform: mobileOpen ? "rotate(-45deg)" : "none",
                transition: "all 200ms var(--ease)",
              }} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 35,
        background: "var(--paper)",
        transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 300ms var(--ease)",
        paddingTop: 100, paddingInline: 24,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {items.map(it => (
          <button key={it.key} onClick={() => { setRoute(it.key); setMobileOpen(false); }}
                  style={{
                    fontFamily: "var(--serif)", fontSize: 40, lineHeight: 1.2,
                    textAlign: "left", padding: "12px 0",
                    color: route === it.key ? "var(--ink)" : "var(--ink-muted)",
                    borderBottom: "1px solid var(--stone)",
                  }}>
            {it.label}
          </button>
        ))}
        <button onClick={() => { onOpenContact(); setMobileOpen(false); }}
                style={{
                  fontFamily: "var(--serif)", fontSize: 40, lineHeight: 1.2,
                  textAlign: "left", padding: "12px 0", color: "var(--signal)",
                  borderBottom: "1px solid var(--stone)",
                }}>
          {copy.nav.contact} →
        </button>
        <div style={{ marginTop: 32, display: "flex", gap: 16, fontSize: 14 }}>
          <button onClick={() => setLang("en")} style={{ color: lang === "en" ? "var(--ink)" : "var(--ink-muted)", fontWeight: lang === "en" ? 500 : 400 }}>English</button>
          <span style={{ color: "var(--stone)" }}>/</span>
          <button onClick={() => setLang("es")} style={{ color: lang === "es" ? "var(--ink)" : "var(--ink-muted)", fontWeight: lang === "es" ? 500 : 400 }}>Español</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─────── Footer ───────
// @sync-target: src/components/Footer.tsx
function Footer({ copy, setRoute, onOpenContact }) {
  return (
    <footer style={{ background: "var(--slate)", color: "var(--paper)", paddingBlock: 96, marginTop: 0 }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)",
          gap: 48,
        }} className="footer-grid">
          <div>
            <Wordmark size={24} onDark />
            <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: "rgba(243,239,230,0.7)", maxWidth: 260 }}>
              {copy.footer.positioning}
            </p>
          </div>
          <div>
            <div className="eyebrow on-dark" style={{ marginBottom: 20 }}>{copy.footer.nav}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["home", "services", "about", "resources"].map((k, i) => (
                <button key={k} onClick={() => setRoute(k)} style={{ textAlign: "left", fontSize: 15, color: "var(--paper)" }}>
                  {copy.footer.navItems[i]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow on-dark" style={{ marginBottom: 20 }}>{copy.footer.legal}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {copy.footer.legalItems.map(l => (
                <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize: 15, color: "rgba(243,239,230,0.75)" }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow on-dark" style={{ marginBottom: 20 }}>{copy.footer.contact}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
              <a href={`mailto:${copy.footer.email}`} style={{ color: "var(--paper)", borderBottom: "1px solid rgba(243,239,230,0.4)", paddingBottom: 2, alignSelf: "flex-start" }}>{copy.footer.email}</a>
              <span style={{ color: "rgba(243,239,230,0.7)" }}>{copy.footer.address}</span>
              <a href="#" onClick={e => e.preventDefault()} style={{ color: "rgba(243,239,230,0.7)", alignSelf: "flex-start" }}>{copy.footer.linkedin}</a>
              <button onClick={onOpenContact} style={{ color: "var(--paper)", textAlign: "left", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                {copy.footer.book} <span>→</span>
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 96, paddingTop: 24, borderTop: "1px solid rgba(243,239,230,0.12)",
                      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                      fontSize: 13, color: "rgba(243,239,230,0.55)" }}>
          <span>{copy.footer.copy}</span>
          <span>buikaelements.com</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ─────── Credibility bar ───────
// @sync-target: src/components/CredibilityBar.tsx
function CredibilityBar({ items }) {
  return (
    <div style={{ background: "var(--paper)", borderBottom: "1px solid var(--stone)", borderTop: "1px solid var(--stone)" }}>
      <div className="container" style={{ paddingBlock: 20 }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px 24px",
          fontSize: 13, color: "var(--ink-muted)", letterSpacing: "0.02em",
          alignItems: "center", justifyContent: "space-between",
        }}>
          {items.map((it, i) => (
            <React.Fragment key={i}>
              <span>{it}</span>
              {i < items.length - 1 && <span style={{ color: "var(--stone)" }} aria-hidden>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────── Statement / pull quote ───────
// @sync-target: src/components/Statement.tsx
function Statement({ children, eyebrow, align = "left" }) {
  return (
    <section style={{ paddingBlock: "var(--rhythm-major)" }}>
      <div className="container">
        <div style={{
          maxWidth: 900,
          marginInline: align === "center" ? "auto" : 0,
          textAlign: align,
        }}>
          {eyebrow && <div className="eyebrow" style={{ marginBottom: 32 }}>{eyebrow}</div>}
          <div className="signal-rule" style={{ marginBottom: 24, marginInline: align === "center" ? "auto" : 0 }} />
          <p className="serif" style={{
            fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.22,
            letterSpacing: "-0.01em", margin: 0, textWrap: "balance",
          }}>
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────── CTA band (dark) ───────
// @sync-target: src/components/CtaBand.tsx
function CtaBand({ head, body, cta, onClick }) {
  return (
    <section style={{ background: "var(--slate)", color: "var(--paper)", paddingBlock: 140 }}>
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <Reveal>
            <h2 className="serif" style={{
              fontSize: "clamp(36px, 4.6vw, 56px)", lineHeight: 1.08,
              letterSpacing: "-0.015em", margin: 0, color: "var(--paper)", textWrap: "balance",
            }}>
              {head}
            </h2>
            {body && (
              <p style={{
                marginTop: 28, fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.6,
                color: "rgba(243,239,230,0.75)", maxWidth: 640,
              }}>{body}</p>
            )}
            <div style={{ marginTop: 40 }}>
              <button className="btn btn-primary-on-dark" onClick={onClick}>
                {cta} <span className="arr">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────── Placeholder tile ───────
// @sync-target: src/components/Placeholder.tsx
function Placeholder({ label, ratio = "4/5", fill = false, sublabel }) {
  return (
    <div className="placeholder" style={{
      aspectRatio: fill ? undefined : ratio,
      width: "100%",
      height: fill ? "100%" : undefined,
      minHeight: fill ? undefined : 120,
    }}>
      <span className="ph-label">
        <span className="ph-dot" />
        {label}{sublabel && <span style={{ opacity: 0.5, marginLeft: 8 }}>— {sublabel}</span>}
      </span>
    </div>
  );
}

// ─────── Contact Modal ───────
// @sync-target: src/components/ContactModal.tsx, src/components/ContactModalContext.tsx
function ContactModal({ open, onClose, copy }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", brief: "", country: "", consent: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    if (!open) { setSubmitted(false); setErrors({}); }
  }, [open]);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.company.trim()) e.company = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.brief.trim() || form.brief.trim().length < 10) e.brief = true;
    if (!form.consent) e.consent = true;
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const es = validate();
    setErrors(es);
    if (Object.keys(es).length === 0) setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 60,
      background: "rgba(10,10,11,0.55)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--paper)", width: "100%", maxWidth: 720,
        maxHeight: "92vh", overflowY: "auto",
        padding: "48px clamp(24px, 4vw, 56px) 56px",
        animation: "slideUp 300ms var(--ease)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div className="eyebrow">{copy.contactModal.eyebrow}</div>
          <button onClick={onClose} aria-label={copy.contactModal.close}
                  style={{ fontSize: 13, color: "var(--ink-muted)", display: "inline-flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>×</span> {copy.contactModal.close}
          </button>
        </div>

        {submitted ? (
          <div style={{ paddingBlock: 40 }}>
            <div className="signal-rule" style={{ marginBottom: 24 }} />
            <h2 className="h2" style={{ marginBottom: 16 }}>{copy.contactModal.success}</h2>
            <p className="lede text-ink-muted">{copy.contactModal.sub}</p>
          </div>
        ) : (
          <>
            <h2 className="h2" style={{ marginBottom: 16 }}>{copy.contactModal.head}</h2>
            <p className="lede text-ink-muted" style={{ marginBottom: 40 }}>{copy.contactModal.sub}</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 28 }} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="modal-row">
                <div className={`field ${errors.name ? "err" : ""}`}>
                  <label>{copy.contactModal.name} <span className="req">*</span></label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className={`field ${errors.company ? "err" : ""}`}>
                  <label>{copy.contactModal.company} <span className="req">*</span></label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div className={`field ${errors.email ? "err" : ""}`}>
                <label>{copy.contactModal.email} <span className="req">*</span></label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                {errors.email && <span className="err-msg">Please enter a valid email address.</span>}
              </div>
              <div className={`field ${errors.brief ? "err" : ""}`}>
                <label>{copy.contactModal.brief} <span className="req">*</span></label>
                <textarea rows={4} placeholder={copy.contactModal.briefPh}
                          value={form.brief} onChange={e => setForm({ ...form, brief: e.target.value })} />
              </div>
              <div className="field">
                <label>{copy.contactModal.country}</label>
                <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>
              <label className={`consent ${errors.consent ? "err" : ""}`}>
                <input type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} />
                <span>{copy.contactModal.consent}</span>
              </label>
              <div>
                <button type="submit" className="btn btn-primary">
                  {copy.contactModal.submit} <span className="arr">→</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
        @media (max-width: 640px) { .modal-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

Object.assign(window, { Reveal, Wordmark, TopNav, Footer, CredibilityBar, Statement, CtaBand, Placeholder, ContactModal });
