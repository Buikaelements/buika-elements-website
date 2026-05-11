/**
 * Content fetchers — abstraction layer over all content sources.
 *
 * All page components import from here, not directly from the Sanity client
 * or MDX loader. The CONTENT_SOURCE env var transparently switches between:
 *
 *   - "mdx"  (default)  → src/content/whitepapers/  (Git-based MDX files)
 *   - "sanity"           → Sanity CMS via GROQ queries
 *   - "mock"             → src/lib/mock-data.ts      (offline fallback)
 *
 * Why three sources instead of two:
 *   - MDX is the default for the one-author editorial workflow.
 *   - Sanity remains available if Simon wants a dashboard later.
 *   - Mock lets the team develop and run tests without any CMS or content dir.
 *
 * Staged migration (complete):
 *   1. Ship loader + types with CONTENT_SOURCE=mock (no behavior change). ✅
 *   2. Author MDX files and verify. ✅
 *   3. Flip default to "mdx". ✅
 */

import { sanityClient } from "./sanity";
import {
  whitepaperBySlugQuery,
  whitepaperSlugsQuery,
  resourcesIndexQuery,
} from "./queries";
import {
  getWhitepaperBySlug as mdxGetWhitepaperBySlug,
  getAllWhitepaperSlugs as mdxGetAllWhitepaperSlugs,
  getResourcesIndex as mdxGetResourcesIndex,
} from "./content-mdx";
import { MOCK_WHITEPAPERS, MOCK_WHITEPAPER_CARDS } from "./mock-data";
import type { Whitepaper, WhitepaperCard } from "./types";

const SOURCE = (process.env.CONTENT_SOURCE ?? "mdx") as
  | "mdx"
  | "sanity"
  | "mock";

export async function getWhitepaperBySlug(
  slug: string
): Promise<Whitepaper | null> {
  switch (SOURCE) {
    case "mdx":
      return mdxGetWhitepaperBySlug(slug);
    case "sanity":
      return sanityClient.fetch<Whitepaper | null>(whitepaperBySlugQuery, {
        slug,
      });
    case "mock":
      return MOCK_WHITEPAPERS.find((w) => w.slug.current === slug) ?? null;
    default:
      return MOCK_WHITEPAPERS.find((w) => w.slug.current === slug) ?? null;
  }
}

export async function getAllWhitepaperSlugs(): Promise<
  Array<{ slug: string }>
> {
  switch (SOURCE) {
    case "mdx":
      return mdxGetAllWhitepaperSlugs();
    case "sanity":
      return sanityClient.fetch<Array<{ slug: string }>>(whitepaperSlugsQuery);
    case "mock":
      return MOCK_WHITEPAPERS.map((w) => ({ slug: w.slug.current }));
    default:
      return MOCK_WHITEPAPERS.map((w) => ({ slug: w.slug.current }));
  }
}

export async function getResourcesIndex(): Promise<WhitepaperCard[]> {
  switch (SOURCE) {
    case "mdx":
      return mdxGetResourcesIndex();
    case "sanity":
      return sanityClient.fetch<WhitepaperCard[]>(resourcesIndexQuery);
    case "mock":
      return MOCK_WHITEPAPER_CARDS;
    default:
      return MOCK_WHITEPAPER_CARDS;
  }
}
