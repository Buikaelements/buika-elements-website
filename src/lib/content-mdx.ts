/**
 * MDX content loader — reads whitepapers from src/content/whitepapers/.
 *
 * Each whitepaper lives in its own directory:
 *   src/content/whitepapers/{slug}/
 *     meta.json   — structured metadata (Zod-validated)
 *     en.mdx      — English body (optional frontmatter, MDX content)
 *     es.mdx      — Spanish body (optional)
 *
 * Assets (cover images, PDFs) are co-located in public/content/whitepapers/{slug}/
 * and referenced in meta.json by relative path. This module resolves them to
 * absolute URLs so components never branch on source for asset handling.
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import type {
  Whitepaper,
  WhitepaperCard,
  ContentSource,
  CoverImage,
  PdfAsset,
  PersonRef,
} from "./types";

const SOURCE: ContentSource = "mdx";

const CONTENT_DIR = join(process.cwd(), "src/content/whitepapers");
const PUBLIC_ASSET_BASE = "/content/whitepapers";

/* ─── Zod schema for meta.json ─── */

const localisedStringSchema = z.object({
  en: z.string(),
  es: z.string().optional(),
});

const pdfAssetSchema = z
  .object({
    url: z.string(),
    size: z.number(),
    originalFilename: z.string(),
  })
  .nullable();

const metaSchema = z.object({
  _id: z.string(),
  slug: z.object({ current: z.string() }),
  title: localisedStringSchema,
  subtitle: localisedStringSchema.optional(),
  abstract: localisedStringSchema,
  pdf: z.object({ en: pdfAssetSchema, es: pdfAssetSchema }),
  coverImage: z
    .object({
      alt: z.string(),
      src: z.string(),
    })
    .optional(),
  topic: z.enum([
    "sourcing",
    "compliance",
    "workwear",
    "quality",
    "costing",
    "country-brief",
    "field-notes",
  ]),
  tags: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  regulations: z.array(z.string()).optional(),
  readingTime: z.number(),
  pageCount: z.number().optional(),
  author: z.object({
    _id: z.string(),
    name: z.string(),
    title: z.string().optional(),
  }),
  access: z.enum(["open", "gated", "private"]),
  publishedAt: z.string(),
  updatedNote: z
    .object({
      date: z.string().optional(),
      en: z.string().optional(),
      es: z.string().optional(),
    })
    .optional(),
  seo: z.object({
    metaTitle: localisedStringSchema,
    metaDescription: localisedStringSchema,
    ogImage: z
      .object({
        alt: z.string(),
        src: z.string(),
      })
      .optional(),
    noIndex: z.boolean(),
  }),
  featured: z.boolean().optional().default(false),
});

type MetaJson = z.infer<typeof metaSchema>;

/* ─── Helpers ─── */

function resolveAssetPath(slug: string, relativePath: string): string {
  // meta.json stores paths like "/content/whitepapers/{slug}/file.ext"
  // Return as-is if already absolute, otherwise prepend base.
  if (relativePath.startsWith("/")) return relativePath;
  return `${PUBLIC_ASSET_BASE}/${slug}/${relativePath}`;
}

function toCoverImage(slug: string, raw?: MetaJson["coverImage"]): CoverImage | undefined {
  if (!raw) return undefined;
  return {
    alt: raw.alt,
    src: resolveAssetPath(slug, raw.src),
  };
}

function toPdfAsset(slug: string, raw: PdfAsset): PdfAsset {
  if (!raw) return null;
  return {
    url: resolveAssetPath(slug, raw.url),
    size: raw.size,
    originalFilename: raw.originalFilename,
  };
}

function metaToWhitepaper(meta: MetaJson, body: Whitepaper["body"]): Whitepaper {
  const slug = meta.slug.current;
  return {
    _id: meta._id,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    abstract: meta.abstract,
    body,
    pdf: {
      en: toPdfAsset(slug, meta.pdf.en),
      es: toPdfAsset(slug, meta.pdf.es),
    },
    coverImage: toCoverImage(slug, meta.coverImage),
    topic: meta.topic,
    tags: meta.tags,
    regions: meta.regions,
    regulations: meta.regulations,
    readingTime: meta.readingTime,
    pageCount: meta.pageCount,
    featured: meta.featured,
    author: meta.author as PersonRef,
    access: meta.access,
    publishedAt: meta.publishedAt,
    updatedNote: meta.updatedNote,
    seo: meta.seo,
    related: [], // populated after all papers are loaded
    _source: SOURCE,
  };
}

function toCard(wp: Whitepaper): WhitepaperCard {
  return {
    _id: wp._id,
    slug: wp.slug,
    title: wp.title,
    abstract: wp.abstract,
    coverImage: wp.coverImage,
    topic: wp.topic,
    regions: wp.regions,
    readingTime: wp.readingTime,
    publishedAt: wp.publishedAt,
    featured: wp.featured,
    access: wp.access,
    pageCount: wp.pageCount,
    authorName: wp.author.name,
    _source: SOURCE,
  };
}

/* ─── Loaders ─── */

async function loadAllWhitepapers(): Promise<Whitepaper[]> {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const papers: Whitepaper[] = [];

  for (const dir of dirs) {
    const slug = dir.name;
    const dirPath = join(CONTENT_DIR, slug);

    // Read and validate meta.json
    const metaRaw = await readFile(join(dirPath, "meta.json"), "utf-8");
    const metaParsed = JSON.parse(metaRaw) as unknown;
    const meta = metaSchema.parse(metaParsed);

    // Guard against slug/directory desync
    if (meta.slug.current !== slug) {
      throw new Error(
        `[content-mdx] Directory "${slug}" does not match slug.current "${meta.slug.current}" in meta.json`
      );
    }

    // Read MDX bodies — EN required (skip whitepaper if missing), ES optional with EN fallback
    let enSource: string;
    try {
      enSource = await readFile(join(dirPath, "en.mdx"), "utf-8");
    } catch {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[content-mdx] Missing en.mdx for "${slug}" — skipping`);
      }
      continue;
    }

    let esSource: string;
    try {
      esSource = await readFile(join(dirPath, "es.mdx"), "utf-8");
    } catch {
      esSource = enSource;
      if (process.env.NODE_ENV === "development") {
        console.warn(`[content-mdx] Missing es.mdx for "${slug}" — falling back to EN`);
      }
    }

    const body: Whitepaper["body"] = { kind: "mdx", en: enSource, es: esSource };

    papers.push(metaToWhitepaper(meta, body));
  }

  // Sort: featured first, then publishedAt desc (same as GROQ)
  papers.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });

  // Populate related: same topic, not self, newest first, limit 3
  for (const wp of papers) {
    wp.related = papers
      .filter((other) => other.topic === wp.topic && other._id !== wp._id)
      .slice(0, 3)
      .map(toCard);
  }

  return papers;
}

/* ─── Public API (mirrors content.ts) ─── */

let _cache: Whitepaper[] | null = null;
let _loading: Promise<Whitepaper[]> | null = null;

async function getAll(): Promise<Whitepaper[]> {
  if (_cache) return _cache;
  if (_loading) return _loading;
  _loading = loadAllWhitepapers().then((p) => {
    _cache = p;
    return p;
  });
  return _loading;
}

export async function getWhitepaperBySlug(slug: string): Promise<Whitepaper | null> {
  const all = await getAll();
  return all.find((w) => w.slug.current === slug) ?? null;
}

export async function getAllWhitepaperSlugs(): Promise<Array<{ slug: string }>> {
  const all = await getAll();
  return all.map((w) => ({ slug: w.slug.current }));
}

export async function getResourcesIndex(): Promise<WhitepaperCard[]> {
  const all = await getAll();
  // Exclude private access and future-dated papers (same as GROQ)
  const now = new Date().toISOString();
  return all
    .filter((w) => w.access !== "private" && w.publishedAt <= now)
    .map(toCard);
}
