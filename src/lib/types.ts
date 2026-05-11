/**
 * Shared content types — shape returned by all content sources (MDX, Sanity, mock).
 *
 * Keep these in sync with:
 *   - sanity/schemas/whitepaper.ts  (source of truth for Sanity field shape)
 *   - src/lib/content-mdx.ts        (Zod schema for meta.json)
 *   - src/lib/queries.ts            (GROQ projections)
 *
 * Consider codegen later (@sanity/codegen-cli) once schemas stabilise.
 */

export type ContentSource = "mdx" | "sanity" | "mock";

export type LocalisedString = { en: string; es?: string };
export type LocalisedText = { en: string; es?: string };

export type PdfAsset = {
  url: string;
  size: number;
  originalFilename: string;
} | null;

export type CoverImage = {
  alt: string;
  lqip?: string;
  dimensions?: { width: number; height: number };
  asset?: { _ref: string };
  /** For mock/MDX data — a plain URL to an image. */
  src?: string;
};

export type PersonRef = {
  _id: string;
  name: string;
  title?: string;
  avatar?: { url: string; lqip?: string };
};

export type WhitepaperTopic =
  | "sourcing"
  | "compliance"
  | "workwear"
  | "quality"
  | "costing"
  | "country-brief"
  | "field-notes";

export type WhitepaperAccess = "open" | "gated" | "private";

/** Portable Text block — opaque here; Sanity source validates at fetch time. */
export type PortableTextBlock = unknown;

/** Discriminated union: the renderer switches on `kind` for type-safe narrowing.
 *  `en` is required by the loader contract — Spanish is optional with EN fallback. */
export type Body =
  | { kind: "mdx"; en: string; es?: string }
  | { kind: "portable-text"; en: PortableTextBlock[]; es?: PortableTextBlock[] };

export type WhitepaperCard = {
  _id: string;
  slug: { current: string };
  title: LocalisedString;
  abstract: LocalisedText;
  coverImage?: CoverImage;
  topic: WhitepaperTopic;
  regions?: string[];
  readingTime: number;
  pageCount?: number;
  publishedAt: string;
  featured: boolean;
  access: WhitepaperAccess;
  authorName: string;
  _source: ContentSource;
};

export type Whitepaper = {
  _id: string;
  slug: { current: string };
  title: LocalisedString;
  subtitle?: LocalisedString;
  abstract: LocalisedText;
  body?: Body;
  pdf: { en: PdfAsset; es: PdfAsset };
  coverImage?: CoverImage;
  topic: WhitepaperTopic;
  tags?: string[];
  regions?: string[];
  regulations?: string[];
  readingTime: number;
  pageCount?: number;
  featured: boolean;
  author: PersonRef;
  access: WhitepaperAccess;
  publishedAt: string;
  updatedNote?: { date?: string; en?: string; es?: string };
  seo: {
    metaTitle: LocalisedString;
    metaDescription: LocalisedText;
    ogImage?: CoverImage;
    noIndex: boolean;
  };
  related: WhitepaperCard[];
  _source: ContentSource;
};
