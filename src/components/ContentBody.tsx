"use client";

/**
 * ContentBody — renders article body from any content source.
 *
 * The body is a discriminated union keyed by `kind`:
 *   - "mdx"           → render via next-mdx-remote (RSC parent passes compiled JSX)
 *   - "portable-text" → render via @portabletext/react
 *
 * Because compileMDX is RSC-only, the MDX branch expects pre-compiled content
 * passed as children from a server component wrapper. This client component
 * handles the Portable Text branch directly.
 */

import { PortableText } from "@portabletext/react";
import type { Body } from "@/lib/types";

export function ContentBody({
  body,
  locale,
}: {
  body?: Body;
  locale: "en" | "es";
}) {
  if (!body) return null;

  if (body.kind === "portable-text") {
    const content = locale === "es" ? body.es : body.en;
    if (!content) return null;
    return <PortableText value={content as never} />;
  }

  // MDX content is pre-compiled by the server component and passed as children.
  // This component should not be used directly for MDX; use ContentBodyMdx
  // (server) instead. We return null here to avoid hydration mismatches.
  return null;
}
