"use client";

// @sync-source: prototype/home.jsx#ServicesPreview, prototype/services.jsx#ServicesPage
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import Link from "next/link";
import type { Route } from "next";
import { useLocale } from "./LocaleContext";
import { Reveal } from "./Reveal";

/**
 * ServicesList — two modes via the `variant` prop.
 *
 * - "preview" (used on the home page): a compact three-row editorial
 *   block with eyebrow + serif title + intro and a "Read more →" link
 *   per row, separated by hairlines.
 * - "full" (default, used on the services page): the deeper per-service
 *   article layout with bullet list and an outcome block, mirroring
 *   prototype/services.jsx#ServicesPage.
 */
export function ServicesList({ variant = "full" }: { variant?: "preview" | "full" }) {
  const { locale, copy } = useLocale();
  const s = copy.services;

  if (variant === "preview") {
    return (
      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="container">
          <div
            style={{
              marginBottom: 72,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
            }}
            className="sp-head"
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>{s.eyebrow}</div>
              <h2 className="h2" style={{ maxWidth: 640 }}>{s.head}</h2>
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
              01 · 02 · 03
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {s.list.map((it, i) => (
              <Reveal key={it.title} delay={i * 60}>
                <Link
                  href={`/${locale}/services` as Route}
                  style={{ color: "inherit", textDecoration: "none", display: "block" }}
                >
                  <article
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr minmax(auto, 200px)",
                      gap: 32,
                      padding: "48px 0",
                      borderTop: "1px solid var(--stone)",
                    }}
                    className="sp-row"
                  >
                    <div
                      className="num-serif"
                      style={{ fontSize: 36, lineHeight: 1, color: "var(--ink-muted)" }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 12,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-muted)",
                          marginBottom: 12,
                        }}
                      >
                        {it.situation}
                      </div>
                      <h3
                        className="serif"
                        style={{
                          fontSize: "clamp(24px, 2.4vw, 34px)",
                          lineHeight: 1.18,
                          letterSpacing: "-0.008em",
                          marginBottom: 16,
                        }}
                      >
                        {it.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 17,
                          lineHeight: 1.6,
                          color: "var(--ink-muted)",
                          margin: 0,
                          maxWidth: 680,
                          textWrap: "pretty",
                        }}
                      >
                        {it.intro}
                      </p>
                    </div>
                    <div
                      style={{ justifySelf: "end", alignSelf: "center" }}
                      className="sp-arrow"
                    >
                      <span
                        className="link-cta"
                        style={{ color: "var(--signal)", fontSize: 14 }}
                      >
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
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

  // full (default) — mirrors prototype/services.jsx#ServicesPage's per-service section
  const bgAlternate = ["var(--paper)", "var(--stone-soft)", "var(--paper)", "var(--stone-soft)"];
  return (
    <section>
      {s.list.map((it, i) => {
        const isDark = false;
        const bg = bgAlternate[i] ?? "var(--paper)";
        return (
          <Reveal key={it.title}>
            <article style={{ background: bg, paddingBlock: 72 }}>
              <div className="container">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 24,
                  }}
                >
                  <div style={{ gridColumn: "1 / span 4" }} className="sv-meta">
                    <div
                      className="num-serif"
                      style={{
                        fontSize: "clamp(56px, 7vw, 88px)",
                        lineHeight: 1,
                        color: "var(--teal)",
                        marginBottom: 24,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                        lineHeight: 1.5,
                        maxWidth: 260,
                      }}
                    >
                      {it.situation}
                    </div>
                  </div>
                  <div style={{ gridColumn: "5 / span 8" }} className="sv-body">
                    <h2 className="h2" style={{ marginBottom: 28, maxWidth: 780 }}>
                      {it.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "clamp(17px, 1.35vw, 19px)",
                        lineHeight: 1.6,
                        maxWidth: 680,
                        marginBottom: 40,
                        textWrap: "pretty",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {it.intro}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        borderTop: "1px solid var(--stone)",
                        maxWidth: 720,
                      }}
                    >
                      {it.bullets.map((b, j) => (
                        <li
                          key={b}
                          style={{
                            borderBottom: "1px solid var(--stone)",
                            padding: "16px 0",
                            display: "grid",
                            gridTemplateColumns: "32px 1fr",
                            gap: 12,
                            fontSize: 16,
                            lineHeight: 1.55,
                            color: "var(--ink)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: 12,
                              letterSpacing: "0.1em",
                              color: "var(--teal-dark)",
                              paddingTop: 4,
                            }}
                          >
                            0{j + 1}
                          </span>
                          <span style={{ textWrap: "pretty" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        marginTop: 36,
                        paddingTop: 24,
                        paddingLeft: 20,
                        borderTop: "none",
                        borderLeft: "3px solid var(--teal)",
                        maxWidth: 720,
                      }}
                    >
                      <div className="eyebrow" style={{ marginBottom: 14, color: "var(--teal-dark)" }}>
                        Outcome
                      </div>
                      <p
                        className="serif"
                        style={{
                          fontSize: "clamp(20px, 1.9vw, 24px)",
                          lineHeight: 1.35,
                          letterSpacing: "-0.005em",
                          margin: 0,
                          textWrap: "balance",
                        }}
                      >
                        {it.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
      <style>{`@media (max-width: 900px) {
        .sv-meta, .sv-body { grid-column: 1 / -1 !important; }
        .sv-meta { margin-bottom: 32px; }
      }`}</style>
    </section>
  );
}
