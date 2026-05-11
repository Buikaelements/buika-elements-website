// @sync-source: prototype/chrome.jsx#CredibilityBar
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { Fragment } from "react";

/**
 * CredibilityBar — thin strip of credential bullets beneath the hero.
 * Separated by small bullet characters on desktop, wrapped on mobile.
 */
export function CredibilityBar({ items }: { items: string[] }) {
  return (
    <div style={{ background: "var(--slate)", borderBottom: "none", borderTop: "none" }}>
      <div className="container" style={{ paddingBlock: 20 }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px 24px",
          fontSize: 14, color: "rgba(243,239,230,0.65)", letterSpacing: "0.06em",
          alignItems: "center", justifyContent: "space-between",
          fontFamily: "var(--mono)", textTransform: "uppercase",
        }}>
          {items.map((it, i) => (
            <Fragment key={i}>
              <span>{it}</span>
              {i < items.length - 1 && <span style={{ color: "rgba(243,239,230,0.2)" }} aria-hidden>·</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
