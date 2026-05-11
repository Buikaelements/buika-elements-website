"use client";

import { useLocale } from "./LocaleContext";

export function ResourcesHubCard() {
  const { copy } = useLocale();
  const r = copy.resources;

  return (
    <section style={{ paddingTop: 96, paddingBottom: 56 }}>
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
    </section>
  );
}
