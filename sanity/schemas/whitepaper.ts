/**
 * Buika Elements — Whitepaper content type
 * Sanity v3 schema
 *
 * Design intent:
 * - Bilingual (EN / ES) as a first-class concern, not an afterthought.
 * - Editor surface optimised for Simon (one author, low cadence, high care).
 * - Every field that appears on the public Resources index is required & validated
 *   so a half-finished draft can never ship.
 * - PDF is the canonical artefact; the abstract + metadata exist to make it
 *   discoverable and to render the listing card without opening the PDF.
 */

import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const whitepaper = defineType({
  name: "whitepaper",
  title: "Whitepaper",
  type: "document",
  icon: DocumentTextIcon,

  // Editor groups — keeps the form scannable for a non-technical author.
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "metadata", title: "Metadata" },
    { name: "seo", title: "SEO & Social" },
    { name: "publishing", title: "Publishing" },
  ],

  fields: [
    // ─────────── CONTENT ───────────

    defineField({
      name: "title",
      title: "Title",
      type: "object",
      group: "content",
      description: "Editorial title. Keep under ~70 characters.",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "string",
          validation: (R) => R.required().max(120),
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "string",
          validation: (R) => R.required().max(120),
        }),
      ],
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "object",
      group: "content",
      description: "Optional editorial deck. One sentence.",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "es", title: "Español", type: "string" }),
      ],
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "Used for /resources/[slug]. Generated from English title; locked once published.",
      options: {
        source: (doc: any) => doc?.title?.en ?? "",
        maxLength: 80,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 80),
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "abstract",
      title: "Abstract",
      type: "object",
      group: "content",
      description:
        "2–4 sentences. Renders on the Resources index card and at the top of the detail page. Avoid marketing voice.",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 4,
          validation: (R) =>
            R.required().min(120).max(600).warning("Aim for 200–400 characters."),
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "text",
          rows: 4,
          validation: (R) => R.required().min(120).max(600),
        }),
      ],
    }),

    defineField({
      name: "body",
      title: "Body (optional, for HTML reading view)",
      type: "object",
      group: "content",
      description:
        "Optional. If present, renders an HTML reading version alongside the PDF. Leave empty to ship PDF-only.",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
              styles: [
                { title: "Paragraph", value: "normal" },
                { title: "Heading 2", value: "h2" },
                { title: "Heading 3", value: "h3" },
                { title: "Pull quote", value: "blockquote" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Emphasis", value: "em" },
                  { title: "Strong", value: "strong" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "External link",
                    fields: [
                      { name: "href", type: "url", title: "URL" },
                    ],
                  },
                ],
              },
            }),
            defineArrayMember({ type: "image", options: { hotspot: true } }),
            defineArrayMember({
              name: "callout",
              type: "object",
              title: "Callout",
              fields: [
                { name: "label", type: "string", title: "Label (e.g. NOTE, FIGURE)" },
                { name: "body", type: "text", title: "Body" },
              ],
            }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "array",
          of: [
            defineArrayMember({ type: "block" }),
            defineArrayMember({ type: "image", options: { hotspot: true } }),
          ],
        }),
      ],
    }),

    // ─────────── ASSETS ───────────

    defineField({
      name: "pdf",
      title: "PDF",
      type: "object",
      group: "content",
      description:
        "The canonical PDF in each language. EN required at minimum; ES strongly preferred at launch.",
      fields: [
        defineField({
          name: "en",
          title: "English PDF",
          type: "file",
          options: { accept: "application/pdf" },
          validation: (R) => R.required(),
        }),
        defineField({
          name: "es",
          title: "Spanish PDF",
          type: "file",
          options: { accept: "application/pdf" },
        }),
      ],
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      description:
        "Used on the Resources index card and as the OG image. 3:2 ratio. Editorial — avoid stock photography.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),

    // ─────────── METADATA ───────────

    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      group: "metadata",
      description: "Primary topic — drives the Resources index filter chips.",
      options: {
        list: [
          { title: "Sourcing & supply chain", value: "sourcing" },
          { title: "Compliance & regulation", value: "compliance" },
          { title: "Workwear & technical fabrics", value: "workwear" },
          { title: "Quality & QA", value: "quality" },
          { title: "Costing & negotiation", value: "costing" },
          { title: "Country briefs", value: "country-brief" },
          { title: "Field notes", value: "field-notes" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "metadata",
      description: "Free-form tags. Used for cross-linking, not the main filter.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    defineField({
      name: "regions",
      title: "Regions covered",
      type: "array",
      group: "metadata",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "China", value: "china" },
              { title: "Vietnam", value: "vietnam" },
              { title: "Bangladesh", value: "bangladesh" },
              { title: "Myanmar", value: "myanmar" },
              { title: "Cambodia", value: "cambodia" },
              { title: "India", value: "india" },
              { title: "EU (regulatory)", value: "eu" },
            ],
          },
        }),
      ],
      options: { layout: "tags" },
    }),

    defineField({
      name: "regulations",
      title: "Regulations referenced",
      type: "array",
      group: "metadata",
      description: "Optional. Surfaces in the detail page sidebar for compliance-flavoured pieces.",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "CSRD", value: "csrd" },
              { title: "CSDDD", value: "csddd" },
              { title: "EUDR", value: "eudr" },
              { title: "EU ESPR", value: "espr" },
              { title: "REACH", value: "reach" },
              { title: "EN ISO 20471", value: "en-iso-20471" },
              { title: "EN ISO 13688", value: "en-iso-13688" },
              { title: "Oeko-Tex 100", value: "oeko-tex-100" },
            ],
          },
        }),
      ],
      options: { layout: "tags" },
    }),

    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      group: "metadata",
      description: "Calculated estimate. Shown on the index card.",
      validation: (R) => R.required().min(1).max(120).integer(),
    }),

    defineField({
      name: "pageCount",
      title: "Page count (PDF)",
      type: "number",
      group: "metadata",
      validation: (R) => R.min(1).integer(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "metadata",
      to: [{ type: "person" }],
      description:
        "Default: Simon Buika. Reference doc so we can add guest authors later without migration.",
      validation: (R) => R.required(),
    }),

    // ─────────── GATING ───────────

    defineField({
      name: "access",
      title: "Access",
      type: "string",
      group: "publishing",
      description:
        "Open: anyone can download. Email-gated: capture email before download. Private: signed link only.",
      options: {
        list: [
          { title: "Open download", value: "open" },
          { title: "Email-gated", value: "gated" },
          { title: "Private (signed link)", value: "private" },
        ],
        layout: "radio",
      },
      initialValue: "gated",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "publishing",
      description: "When this whitepaper went live. Used for sort order.",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "updatedNote",
      title: "Update note",
      type: "object",
      group: "publishing",
      description:
        "Optional. If you revise a published paper, write a one-line note explaining what changed and why.",
      fields: [
        defineField({ name: "date", title: "Updated on", type: "datetime" }),
        defineField({ name: "en", title: "Note (EN)", type: "string" }),
        defineField({ name: "es", title: "Note (ES)", type: "string" }),
      ],
    }),

    defineField({
      name: "featured",
      title: "Feature on Resources index",
      type: "boolean",
      group: "publishing",
      description: "Pins to the top of /resources. Limit to one piece at a time.",
      initialValue: false,
    }),

    // ─────────── SEO ───────────

    defineField({
      name: "seo",
      title: "SEO overrides",
      type: "object",
      group: "seo",
      description:
        "Leave blank to inherit from title + abstract. Override only when the editorial title is unsuitable for search.",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "object",
          fields: [
            { name: "en", type: "string", title: "EN" },
            { name: "es", type: "string", title: "ES" },
          ],
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "object",
          fields: [
            { name: "en", type: "text", rows: 2, title: "EN" },
            { name: "es", type: "text", rows: 2, title: "ES" },
          ],
        }),
        defineField({
          name: "ogImage",
          title: "Social share image override",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "noIndex",
          title: "Hide from search engines",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],

  // Sort newest first by default in the Studio listing.
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title (EN), A–Z",
      name: "titleAsc",
      by: [{ field: "title.en", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title.en",
      subtitle: "topic",
      media: "coverImage",
      featured: "featured",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, featured, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
          })
        : "Draft";
      return {
        title: `${featured ? "★ " : ""}${title ?? "Untitled"}`,
        subtitle: `${subtitle ?? "—"} · ${date}`,
        media,
      };
    },
  },
});
