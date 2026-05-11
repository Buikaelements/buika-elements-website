"use client";

// @sync-source: prototype/resources.jsx#ResourcesPage
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";
import { deriveCategory } from "@/lib/whitepaper-display";
import { pickLocale } from "@/lib/locale";
import type { WhitepaperCard } from "@/lib/types";

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
  });
}



function formatRead(card: WhitepaperCard, locale: string): string {
  if (card.access === "gated" || card.access === "private") {
    const pages = card.pageCount ?? card.readingTime;
    return locale === "es"
      ? `PDF ${pages} páginas`
      : `${pages}-page PDF`;
  }
  return locale === "es" ? `${card.readingTime} min` : `${card.readingTime} min read`;
}

function formatLang(card: WhitepaperCard): string {
  const hasEn = true; // English is always required
  const hasEs = !!card.title.es;
  if (hasEn && hasEs) return "EN · ES";
  return "EN";
}

export function ResourcesIndex({ cards, showHub = true }: { cards: WhitepaperCard[]; showHub?: boolean }) {
  const { copy, locale } = useLocale();
  const r = copy.resources;
  const [filter, setFilter] = useState<string>(r.filters[0]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  // Reset to "All" when locale changes (filter labels are localised).
  useEffect(() => {
    setFilter(r.filters[0]);
  }, [locale, r.filters]);

  const filtered = useMemo(() => {
    const f = filter;
    const all = r.filters[0];
    if (f === all) return cards;
    return cards.filter((c) => {
      const cat = deriveCategory(c.topic, c.access, locale);
      if (f === "Essays" || f === "Ensayos") return !cat.isWhitepaper && !cat.isFieldNote;
      if (f === "Whitepapers") return cat.isWhitepaper;
      if (f === "Field notes" || f === "Notas de campo") return cat.isFieldNote;
      return true;
    });
  }, [filter, cards, locale, r.filters]);

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(true);
      return;
    }
    setEmailErr(false);
    setSubscribed(true);
    const w = window as unknown as { plausible?: (e: string) => void };
    if (w.plausible) w.plausible("Newsletter signup");
  };

  return (
    <>
      {/* Knowledge Hub featured card */}
      {showHub && <section style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="container">
          <a
            href={r.hub.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textDecoration: "none", color: "inherit" }}
          >
            <div
              className="hub-card"
              style={{
                background: "var(--teal)",
                borderRadius: 2,
                padding: "48px 56px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 48,
                alignItems: "center",
                transition: "filter 180ms var(--ease)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.filter = "brightness(0.96)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.filter = "none")}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginBottom: 20,
                  }}
                >
                  {r.hub.eyebrow}
                </div>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    margin: "0 0 20px",
                    color: "var(--ink)",
                    textWrap: "balance",
                  }}
                >
                  {r.hub.head}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 17px)",
                    lineHeight: 1.6,
                    color: "rgba(10,10,11,0.62)",
                    margin: "0 0 24px",
                    maxWidth: 640,
                    textWrap: "pretty",
                  }}
                >
                  {r.hub.body}
                </p>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                  }}
                >
                  {r.hub.meta}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 12,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--signal)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.hub.cta} →
                </span>
              </div>
            </div>
          </a>
        </div>
        <style>{`@media (max-width: 760px) {
          .hub-card { grid-template-columns: 1fr !important; padding: 32px 28px !important; gap: 24px !important; }
        }`}</style>
      </section>}

      {/* Filters */}
      <section
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          borderTop: "1px solid var(--stone)",
          borderBottom: "1px solid var(--stone)",
          position: "sticky",
          top: 72,
          background: "color-mix(in srgb, var(--paper) 96%, transparent)",
          backdropFilter: "blur(8px)",
          zIndex: 20,
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {r.filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontSize: 13,
                    padding: "8px 16px",
                    color: filter === f ? "var(--paper)" : "var(--ink)",
                    background: filter === f ? "var(--ink)" : "transparent",
                    border: "1px solid " + (filter === f ? "var(--ink)" : "var(--stone)"),
                    borderRadius: 2,
                    transition: "all 180ms var(--ease)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}
            >
              {filtered.length} / {cards.length}
            </div>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section style={{ paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((c, i) => {
              const cat = deriveCategory(c.topic, c.access, locale);
              const slug = c.slug.current;
              const dateStr = formatDate(c.publishedAt, locale);
              return (
                <Reveal key={`${slug}-${i}`} delay={i * 40}>
                  <Link
                    href={`/${locale}/resources/${slug}` as Route}
                    style={{ display: "block", color: "inherit", textDecoration: "none" }}
                  >
                    <article
                      className="res-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "140px 1fr 180px",
                        gap: 32,
                        padding: "40px 0",
                        borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--stone)",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: 12,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: cat.isWhitepaper ? "var(--signal)" : "var(--ink-muted)",
                            marginBottom: 8,
                          }}
                        >
                          {cat.isWhitepaper && "↓ "}
                          {cat.label}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{dateStr}</div>
                      </div>
                      <div>
                        <h3
                          className="serif"
                          style={{
                            fontSize: "clamp(22px, 2vw, 28px)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.005em",
                            marginBottom: 12,
                            textWrap: "balance",
                          }}
                        >
                          {pickLocale(locale, c.title.en, c.title.es)}
                        </h3>
                        <p
                          style={{
                            fontSize: 16,
                            lineHeight: 1.55,
                            color: "var(--ink-muted)",
                            margin: 0,
                            maxWidth: 640,
                            textWrap: "pretty",
                          }}
                        >
                          {pickLocale(locale, c.abstract.en, c.abstract.es)}
                        </p>
                        {cat.isWhitepaper && (
                          <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-muted)", fontStyle: "italic" }}>
                            {locale === "es" ? "Descarga requiere email" : "Download requires email"}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: "right", fontSize: 13, color: "var(--ink-muted)" }}>
                        <div>{formatRead(c, locale)}</div>
                        <div style={{ marginTop: 6, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em" }}>{formatLang(c)}</div>
                        <div style={{ marginTop: 16, color: "var(--signal)", fontSize: 14 }}>→</div>
                      </div>
                    </article>
                  </Link>
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
          <div
            className="nl-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "center" }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Newsletter</div>
              <h3
                className="serif"
                style={{
                  fontSize: "clamp(26px, 2.4vw, 34px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.008em",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                {r.newsletter.head}
              </h3>
            </div>
            <div>
              {subscribed ? (
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--signal)",
                  }}
                >
                  ✓ {locale === "es" ? "Suscrito. Te hemos enviado un email de confirmación." : "Subscribed. Check your inbox for a confirmation email."}
                </div>
              ) : (
                <form
                  onSubmit={submitNewsletter}
                  style={{ display: "flex", gap: 0, alignItems: "stretch", borderBottom: "1px solid var(--ink)" }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailErr(false);
                    }}
                    placeholder={r.newsletter.placeholder}
                    style={{
                      flex: 1,
                      border: 0,
                      background: "transparent",
                      padding: "14px 0",
                      fontSize: 17,
                      outline: "none",
                      color: emailErr ? "#A33" : "var(--ink)",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "var(--ink)",
                      color: "var(--paper)",
                      padding: "0 24px",
                      fontSize: 14,
                      fontWeight: 500,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {r.newsletter.cta} <span>→</span>
                  </button>
                </form>
              )}
              {emailErr && (
                <div style={{ color: "#A33", fontSize: 13, marginTop: 8 }}>Please enter a valid email.</div>
              )}
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
