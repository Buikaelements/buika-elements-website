"use client";

// @sync-source: prototype/home.jsx#HeroTypographic
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useContactModal } from "./ContactModalContext";
import { useLocale } from "./LocaleContext";

export function HomeHero() {
  const { copy } = useLocale();
  const { openModal } = useContactModal();
  const h = copy.home;

  return (
    <section
      style={{
        background: "var(--teal)",
        color: "var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Text zone — pure teal, no overlap with photo */}
      <div className="container" style={{ position: "relative", paddingTop: 96, paddingBottom: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
          <div style={{ gridColumn: "2 / span 8" }} className="hero-inner">
            <h1
              className="serif"
              style={{
                fontSize: "clamp(48px, 7.4vw, 92px)",
                lineHeight: 1.03,
                letterSpacing: "-0.028em",
                fontWeight: 400,
                margin: 0,
                color: "var(--ink)",
                textWrap: "balance",
              }}
            >
              {h.heroHeadline[0]}
              <br />
              {h.heroHeadline[1]}
            </h1>
            <p
              style={{
                marginTop: 36,
                fontSize: "clamp(17px, 1.4vw, 20px)",
                lineHeight: 1.55,
                color: "rgba(10,10,11,0.62)",
                maxWidth: 600,
              }}
            >
              {h.heroSub}
            </p>
            <div style={{ marginTop: 40 }}>
              <button className="btn btn-primary" onClick={() => openModal()}>
                {h.heroCta} <span className="arr">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Photo zone — pulled up behind the text bottom */}
      <HeroImage />
      <style>{`@media (max-width: 760px) { .hero-inner { grid-column: 1 / -1 !important; } }`}</style>
    </section>
  );
}

function HeroImage() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(320px, 42vw, 560px)",
        marginTop: "-120px",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Short teal-to-transparent seam at the very top — blends with the text zone */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, var(--teal) 0%, transparent 28%)",
        zIndex: 1,
      }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-city-sunset.jpeg"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
          display: "block",
          maxWidth: "none",
        }}
      />
    </div>
  );
}
