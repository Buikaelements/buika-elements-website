// @sync-source: prototype/resource-detail.jsx#ResourceDetailPage
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { getWhitepaperBySlug, getAllWhitepaperSlugs } from "@/lib/content";
import { deriveCategory } from "@/lib/whitepaper-display";
import { pickLocale } from "@/lib/locale";
import { ResourceDetailGate } from "@/components/ResourceDetailGate";
import { ContentBodyMdx } from "@/components/ContentBodyMdx";
import { ContentBody } from "@/components/ContentBody";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllWhitepaperSlugs();
  return slugs.flatMap(({ slug }) => [
    { locale: "en", slug },
    { locale: "es", slug },
  ]);
}

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
  });
}

function formatRead(wp: NonNullable<Awaited<ReturnType<typeof getWhitepaperBySlug>>>, locale: Locale): string {
  if (wp.access === "gated" || wp.access === "private") {
    const pages = wp.pageCount ?? wp.readingTime;
    return locale === "es" ? `PDF ${pages} páginas` : `${pages}-page PDF`;
  }
  return locale === "es" ? `${wp.readingTime} min` : `${wp.readingTime} min read`;
}

function formatLang(wp: NonNullable<Awaited<ReturnType<typeof getWhitepaperBySlug>>>): string {
  const hasEs = !!wp.title.es;
  return hasEs ? "EN · ES" : "EN";
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Locale = locale;

  const wp = await getWhitepaperBySlug(slug);
  if (!wp) notFound();

  const copy = getCopy(locale);
  const isWp = wp.access === "gated" || wp.access === "private";
  const isGated = wp.access === "gated";
  const category = deriveCategory(wp.topic, wp.access, lang).label;
  const dateStr = formatDate(wp.publishedAt, lang);

  const title = pickLocale(lang, wp.title.en, wp.title.es);
  const abstract = pickLocale(lang, wp.abstract.en, wp.abstract.es);

  // Related articles (already resolved by the content layer)
  const related = wp.related.slice(0, 2);

  return (
    <>
      {/* ─── Header ─── */}
      <section style={{ paddingTop: 120, paddingBottom: 48 }}>
        <div className="container">
          <Link
            href={`/${locale}/resources` as Route}
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              marginBottom: 32,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            ← {lang === "es" ? "Recursos" : "Resources"}
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            <div style={{ gridColumn: "2 / span 10" }} className="rd-head">
              <div className="eyebrow" style={{ marginBottom: 20, color: isWp ? "var(--signal)" : undefined }}>
                <span>{category}</span>
                <span style={{ margin: "0 12px", color: "var(--ink-faint)" }}>·</span>
                <span style={{ color: "var(--ink-muted)" }}>{dateStr}</span>
              </div>

              <h1 className="h1" style={{ marginBottom: 24, maxWidth: 1100 }}>{title}</h1>

              <p className="lede" style={{ maxWidth: 720, color: "var(--ink-muted)" }}>{abstract}</p>

              <dl
                className="rd-meta"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, auto)",
                  gap: "12px 48px",
                  margin: "36px 0 0",
                  padding: 0,
                  borderTop: "1px solid var(--stone)",
                  paddingTop: 24,
                }}
              >
                <div>
                  <dt
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "es" ? "Autor" : "Author"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{wp.author.name}</dd>
                </div>
                <div>
                  <dt
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "es" ? "Formato" : "Format"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{formatRead(wp, lang)}</dd>
                </div>
                <div>
                  <dt
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "es" ? "Idiomas" : "Languages"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{formatLang(wp)}</dd>
                </div>
                <div>
                  <dt
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "es" ? "Publicado" : "Published"}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{dateStr}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 760px) {
            .rd-head { grid-column: 1 / -1 !important; }
            .rd-meta { grid-template-columns: repeat(2, auto) !important; gap: 20px 32px !important; }
          }
        `}</style>
      </section>

      {/* ─── Body / gate ─── */}
      <section style={{ paddingBottom: 72 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            {/* Left: body */}
            <div style={{ gridColumn: isWp ? "2 / span 7" : "2 / span 8" }} className="rd-body">
              {wp.body ? (
                wp.body.kind === "mdx" ? (
                  <ContentBodyMdx source={pickLocale(lang, wp.body.en, wp.body.es)} />
                ) : (
                  <ContentBody body={wp.body} locale={lang} />
                )
              ) : null}
            </div>
            {/* Right: gate / download */}
            <aside style={{ gridColumn: isWp ? "10 / span 3" : "11 / span 2" }} className="rd-aside">
              <div style={{ position: "sticky", top: 96 }}>
                <ResourceDetailGate locale={lang} isGated={isGated} />
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .rd-body { grid-column: 1 / -1 !important; }
            .rd-aside { grid-column: 1 / -1 !important; }
            .rd-aside > div { position: static !important; }
          }
        `}</style>
      </section>

      {/* ─── Related ─── */}
      {related.length > 0 && (
        <section style={{ paddingBlock: 72, borderTop: "1px solid var(--stone)" }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 40 }}>
              {lang === "es" ? "Lectura relacionada" : "Related reading"}
            </div>
            <div
              className="rd-related"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}
            >
              {related.map((r, i) => {
                const rSlug = r.slug.current;
                const rCat = deriveCategory(r.topic, r.access, lang);
                const rDate = formatDate(r.publishedAt, lang);
                return (
                  <Link
                    key={i}
                    href={`/${locale}/resources/${rSlug}` as Route}
                    style={{ display: "block", paddingTop: 24, borderTop: "1px solid var(--ink)", textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: rCat.isWhitepaper ? "var(--signal)" : "var(--ink-muted)",
                        marginBottom: 12,
                      }}
                    >
                      {rCat.label} · {rDate}
                    </div>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "clamp(20px, 1.8vw, 24px)",
                        lineHeight: 1.25,
                        letterSpacing: "-0.005em",
                        marginBottom: 12,
                        textWrap: "balance",
                      }}
                    >
                      {pickLocale(lang, r.title.en, r.title.es)}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)", margin: 0, maxWidth: 480 }}>
                      {pickLocale(lang, r.abstract.en, r.abstract.es)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
          <style>{`@media (max-width: 760px) { .rd-related { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
        </section>
      )}
    </>
  );
}
