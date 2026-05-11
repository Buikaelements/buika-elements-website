"use client";

// @sync-source: prototype/about.jsx#AboutPage (Bio section)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useLocale } from "./LocaleContext";

export function AboutBio() {
  const { copy } = useLocale();
  const bio = copy.about.bio;

  return (
    <section style={{ paddingBlock: "var(--rhythm-sub)" }}>
      <div className="container-site">
        <div
          className="bio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: 80,
          }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/simon-portrait.png"
              alt="Simon Caballero — Founder, Buika Elements"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "center 55%",
                display: "block",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid var(--stone)",
              }}
            >
              <span>Fig. 01</span>
              <span>Da Nang · 2026</span>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16, color: "var(--signal)" }}>
              Founder
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(28px, 2.6vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.005em",
                margin: 0,
                marginBottom: 8,
              }}
            >
              {bio.name}
            </h2>
            <div style={{ fontSize: 15, color: "var(--ink-muted)", marginBottom: 48 }}>
              {bio.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {bio.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "clamp(17px, 1.3vw, 19px)",
                    lineHeight: 1.6,
                    margin: 0,
                    color: "var(--ink)",
                    textWrap: "pretty",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
            <div
              style={{
                marginTop: 48,
                paddingTop: 24,
                borderTop: "1px solid var(--stone)",
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}
            >
              {bio.location}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .bio-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
