// @sync-source: prototype/chrome.jsx#Statement
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import type { ReactNode } from "react";

/**
 * Statement — editorial pull-quote section used to separate major blocks
 * with a single declarative sentence. Appears once per page max.
 */
export function Statement({
  children,
  eyebrow,
  align = "left",
}: {
  children: ReactNode;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  return (
    <section style={{ paddingBlock: "var(--rhythm-sub)", background: "var(--stone-soft)" }}>
      <div className="container">
        <div style={{
          maxWidth: 900,
          marginInline: align === "center" ? "auto" : 0,
          textAlign: align,
          borderLeft: align === "left" ? "3px solid var(--teal)" : "none",
          paddingLeft: align === "left" ? 32 : 0,
        }}>
          {eyebrow && <div className="eyebrow" style={{ marginBottom: 24, color: "var(--teal-dark)" }}>{eyebrow}</div>}
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
