"use client";

// @sync-source: prototype/chrome.jsx#Footer
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import Link from "next/link";
import type { Route } from "next";
import { Wordmark } from "./Wordmark";
import { useLocale } from "./LocaleContext";
import { useContactModal } from "./ContactModalContext";

/**
 * Footer — slate-on-paper. Four-column desktop (positioning | nav | legal |
 * contact), 2-up at ≤900px, single-column at ≤540px.
 */
export function Footer() {
  const { locale, copy } = useLocale();
  const { openModal } = useContactModal();

  const navHrefs = ["", "/services", "/about", "/resources"];

  return (
    <footer style={{ background: "var(--slate)", color: "var(--paper)", paddingBlock: 96, marginTop: 0 }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)",
            gap: 48,
          }}
          className="footer-grid"
        >
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
                <Link
                  key={k}
                  href={`/${locale}${navHrefs[i] ?? ""}` as Route}
                  style={{ textAlign: "left", fontSize: 15, color: "var(--paper)" }}
                >
                  {copy.footer.navItems[i]}
                </Link>
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
              <button onClick={() => openModal()} style={{ color: "var(--paper)", textAlign: "left", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                {copy.footer.book} <span>→</span>
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 96,
            paddingTop: 24,
            borderTop: "1px solid rgba(243,239,230,0.12)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "rgba(243,239,230,0.55)",
          }}
        >
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
