/**
 * Sanity client — read-only from the front-end.
 *
 * useCdn: true is safe because content is public and we use ISR upstream to
 * keep it fresh. Drafts are read via a separate server-only client (see
 * sanityPreviewClient below) which requires SANITY_READ_TOKEN.
 */
import { createClient } from "@sanity/client";

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
});

/**
 * Server-only client for draft preview. Requires SANITY_READ_TOKEN to be set.
 * Never import this in a client component — the token is server-side only.
 */
export const sanityPreviewClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
  perspective: "previewDrafts",
});
