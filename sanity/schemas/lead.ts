import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

/**
 * Lead — captured from gated downloads, contact form, newsletter.
 *
 * This is an OPTIONAL mirror of what we push to HubSpot. Useful for:
 *  - Seeing captures in Sanity without logging into HubSpot.
 *  - A fallback store if the HubSpot API call fails.
 *  - GDPR access/erasure requests (easier to audit in one place).
 *
 * Production server actions write to BOTH HubSpot and this type; HubSpot is
 * canonical and drives CRM workflows.
 */
export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Whitepaper download", value: "whitepaper" },
          { title: "Contact form", value: "contact" },
          { title: "Newsletter", value: "newsletter" },
        ],
      },
    }),
    defineField({
      name: "whitepaper",
      title: "Whitepaper (if source = whitepaper)",
      type: "reference",
      to: [{ type: "whitepaper" }],
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "consent",
      title: "Consent given",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "capturedAt",
      title: "Captured at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "hubspotContactId",
      title: "HubSpot contact ID",
      type: "string",
      readOnly: true,
      description: "Set by the server action once the HubSpot write succeeds.",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "source", date: "capturedAt" },
    prepare({ title, subtitle, date }) {
      const when = date
        ? new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
        : "—";
      return { title, subtitle: `${subtitle ?? "?"} · ${when}` };
    },
  },
});
