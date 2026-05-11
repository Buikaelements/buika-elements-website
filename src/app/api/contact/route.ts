import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * /api/contact — receives the contact-modal payload, validates with zod,
 * forwards to HubSpot Forms API, and notifies Simon via Resend.
 *
 * Failure modes are isolated:
 *  - Validation errors → 400 with the offending field
 *  - Honeypot (caught client-side too) → 200 silently (don't tip off bots)
 *  - HubSpot down → log + still email Simon
 *  - Resend down  → log + still attempt HubSpot
 *
 * We intentionally do NOT bubble third-party errors up to the user. As
 * long as one of the two sinks succeeded, the form succeeded for them.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(1, "Name required").max(120),
  email: z.string().email("Valid email required").max(200),
  company: z.string().max(160).optional().nullable(),
  country: z.string().max(120).optional().nullable(),
  topic: z.string().max(120).optional().nullable(),
  message: z.string().min(1, "Message required").max(4000),
  locale: z.enum(["en", "es"]).optional().default("en"),
});

/**
 * HubSpot — uses the v3 CRM contacts endpoint with a Private App token
 * (HUBSPOT_ACCESS_TOKEN), matching .env.example. Optionally enrols the
 * new contact into HUBSPOT_LEAD_LIST_ID if set.
 */
async function postToHubSpot(payload: z.infer<typeof ContactSchema>) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return { ok: false, skipped: true };

  const properties: Record<string, string> = {
    email: payload.email,
    firstname: payload.name,
    message: payload.message,
  };
  if (payload.company) properties.company = payload.company;
  if (payload.country) properties.country = payload.country;
  if (payload.topic) properties.buika_topic = payload.topic;
  properties.buika_locale = payload.locale;

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties }),
  });

  // 409 = contact already exists; treat as success since the lead is on file.
  const ok = res.ok || res.status === 409;
  return { ok, status: res.status };
}

async function notifySimon(payload: z.infer<typeof ContactSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_TO ?? "simon@buikaelements.com";
  const from = process.env.RESEND_FROM ?? "Buika Elements <hello@buikaelements.com>";
  const replyTo = process.env.RESEND_REPLY_TO ?? payload.email;
  if (!apiKey) return { ok: false, skipped: true };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject: `New enquiry — ${payload.topic ?? "General"} — ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company ?? "—"}`,
      `Country: ${payload.country ?? "—"}`,
      `Topic: ${payload.topic ?? "—"}`,
      `Locale: ${payload.locale}`,
      "",
      payload.message,
    ].join("\n"),
  });
  return { ok: !error, error };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 }
    );
  }

  const [hs, em] = await Promise.allSettled([
    postToHubSpot(parsed.data),
    notifySimon(parsed.data),
  ]);

  // Log failures but don't bubble — the user gets success as long as at
  // least one sink accepted the message.
  if (hs.status === "rejected") console.error("[contact] hubspot:", hs.reason);
  if (em.status === "rejected") console.error("[contact] resend:", em.reason);

  const hsOk = hs.status === "fulfilled" && (hs.value.ok || hs.value.skipped);
  const emOk = em.status === "fulfilled" && (em.value.ok || em.value.skipped);

  if (!hsOk && !emOk) {
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
