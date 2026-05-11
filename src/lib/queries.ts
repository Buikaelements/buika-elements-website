/**
 * Buika Elements — GROQ queries for whitepapers
 *
 * These are the queries the Next.js (or Astro) front-end runs against Sanity.
 * Each is parameterised; pass values via the client's params arg.
 *
 * Usage with @sanity/client:
 *
 *   import { createClient } from "@sanity/client";
 *   import { whitepaperBySlugQuery } from "./queries";
 *
 *   const client = createClient({ projectId, dataset: "production", apiVersion: "2025-01-01", useCdn: true });
 *   const paper = await client.fetch(whitepaperBySlugQuery, { slug: "csddd-readiness-2026" });
 */

// ─────────────────────────────────────────────────────────────
// 1. SINGLE WHITEPAPER — detail page
// ─────────────────────────────────────────────────────────────
//
// Returns everything the /resources/[slug] page renders, in both languages,
// with the author reference resolved and PDF asset URLs unwrapped.
// The front-end picks the language at render time based on the active locale.

export const whitepaperBySlugQuery = /* groq */ `
  *[_type == "whitepaper" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    subtitle,
    abstract,
    body,

    // PDF assets — resolve the file reference into a usable URL + size.
    "pdf": {
      "en": pdf.en.asset-> {
        "url": url,
        "size": size,
        "originalFilename": originalFilename
      },
      "es": pdf.es.asset-> {
        "url": url,
        "size": size,
        "originalFilename": originalFilename
      }
    },

    // Cover image — keep the asset ref for next-sanity-image / @sanity/image-url
    // plus alt text so the page can render <Image> with proper dimensions.
    coverImage {
      ...,
      "alt": alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },

    topic,
    tags,
    regions,
    regulations,
    readingTime,
    pageCount,

    // Resolve author reference into a flat object.
    "author": author-> {
      _id,
      name,
      title,
      "avatar": avatar.asset-> { url, "lqip": metadata.lqip }
    },

    access,
    publishedAt,
    updatedNote,

    // SEO — fall back to title/abstract if overrides are blank.
    "seo": {
      "metaTitle": coalesce(seo.metaTitle, title),
      "metaDescription": coalesce(seo.metaDescription, abstract),
      "ogImage": coalesce(seo.ogImage, coverImage),
      "noIndex": coalesce(seo.noIndex, false)
    },

    // 3 related papers: same topic, not this one, newest first.
    "related": *[
      _type == "whitepaper"
      && topic == ^.topic
      && _id != ^._id
      && !(_id in path("drafts.**"))
      && publishedAt <= now()
    ] | order(publishedAt desc) [0...3] {
      _id,
      slug,
      title,
      abstract,
      topic,
      readingTime,
      publishedAt,
      coverImage { ..., "alt": alt }
    }
  }
`;

// ─────────────────────────────────────────────────────────────
// 2. STATIC PATHS — for Next.js generateStaticParams / getStaticPaths
// ─────────────────────────────────────────────────────────────

export const whitepaperSlugsQuery = /* groq */ `
  *[_type == "whitepaper" && defined(slug.current) && !(_id in path("drafts.**"))]
  { "slug": slug.current }
`;

// ─────────────────────────────────────────────────────────────
// 3. RESOURCES INDEX — for /resources page
// ─────────────────────────────────────────────────────────────

export const resourcesIndexQuery = /* groq */ `
  *[_type == "whitepaper"
    && access != "private"
    && publishedAt <= now()
    && !(_id in path("drafts.**"))
  ] | order(featured desc, publishedAt desc) {
    _id,
    slug,
    title,
    abstract,
    coverImage { ..., "alt": alt, "lqip": asset->metadata.lqip },
    topic,
    regions,
    readingTime,
    publishedAt,
    featured,
    "authorName": author->name
  }
`;
