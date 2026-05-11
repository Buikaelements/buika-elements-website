"use client";

// @sync-source: prototype/chrome.jsx#CtaBand
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useContactModal } from "./ContactModalContext";
import { Reveal } from "./Reveal";

/**
 * CtaBand — dark section-closing CTA used at the bottom of Home, Services,
 * About. Always opens the global contact modal; no other action surface.
 *
 * Each page passes its own headline/body/CTA from copy.ts so the closing
 * note matches the page's argument (Home: "ready to stop guessing"; About:
 * "want to understand if Buika fits"; etc).
 */
export function CtaBand({
  head,
  body,
  cta,
}: {
  head: string;
  body?: string;
  cta: string;
}) {
  const { openModal } = useContactModal();
  return (
    <section style={{ background: "var(--teal)", color: "var(--ink)", paddingBlock: 100 }}>
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <Reveal>
            <h2 className="serif" style={{
              fontSize: "clamp(36px, 4.6vw, 56px)", lineHeight: 1.08,
              letterSpacing: "-0.015em", margin: 0, color: "var(--ink)", textWrap: "balance",
            }}>
              {head}
            </h2>
            {body && (
              <p style={{
                marginTop: 28, fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.6,
                color: "rgba(10,10,11,0.62)", maxWidth: 640,
              }}>{body}</p>
            )}
            <div style={{ marginTop: 40 }}>
              <button className="btn btn-primary" onClick={() => openModal()}>
                {cta} <span className="arr">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
