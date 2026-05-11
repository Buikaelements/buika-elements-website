"use client";

// @sync-source: prototype/resource-detail.jsx#ResourceDetailPage (gate form only)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * ResourceDetailGate — sticky aside that gates whitepaper PDFs behind
 * an email + consent form. Mirrors the prototype's two-state UX (form
 * → "link sent" success). Submission is currently a no-op success;
 * HubSpot + Resend wiring lands with the gate-form milestone.
 */
export function ResourceDetailGate({
  locale,
  isGated,
}: {
  locale: Locale;
  isGated: boolean;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errs, setErrs] = useState<{ email?: boolean; consent?: boolean }>({});
  const [delivered, setDelivered] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: boolean; consent?: boolean } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true;
    if (!consent) next.consent = true;
    setErrs(next);
    if (Object.keys(next).length === 0) setDelivered(true);
  };

  if (!isGated) {
    return (
      <div style={{ padding: 24, border: "1px solid var(--stone)" }}>
        <div
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            marginBottom: 12,
          }}
        >
          {locale === "es" ? "Lectura abierta" : "Open reading"}
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-muted)", margin: 0, lineHeight: 1.5 }}>
          {locale === "es" ? "Sin descarga. Lectura completa arriba." : "No download. Full read above."}
        </p>
      </div>
    );
  }

  if (delivered) {
    return (
      <div style={{ padding: 24, border: "1px solid var(--stone)" }}>
        <div className="signal-rule" style={{ marginBottom: 16 }} />
        <div
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--signal)",
            marginBottom: 12,
          }}
        >
          ✓ {locale === "es" ? "Enlace enviado" : "Link sent"}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)", margin: 0 }}>
          {locale === "es"
            ? `Hemos enviado el PDF a ${email}. El enlace caduca en 24 horas.`
            : `We've emailed the PDF to ${email}. The link expires in 24 hours.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ padding: 24, border: "1px solid var(--ink)" }} noValidate>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--signal)",
          marginBottom: 12,
        }}
      >
        ↓ {locale === "es" ? "Descarga gratuita" : "Free download"}
      </div>
      <h4 className="h4" style={{ marginBottom: 8 }}>
        {locale === "es" ? "Solicita el PDF" : "Request the PDF"}
      </h4>
      <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 24, lineHeight: 1.5 }}>
        {locale === "es"
          ? "Te enviaremos el enlace por email. Sin listas de marketing automáticas."
          : "We'll email you the link. No automatic marketing lists."}
      </p>

      <div className={"field" + (errs.email ? " err" : "")} style={{ marginBottom: 16 }}>
        <label htmlFor="rd-email">
          {locale === "es" ? "Email profesional" : "Work email"} <span className="req">*</span>
        </label>
        <input
          id="rd-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrs((p) => ({ ...p, email: false }));
          }}
        />
        {errs.email && (
          <div className="err-msg">{locale === "es" ? "Email no válido." : "Please enter a valid email."}</div>
        )}
      </div>

      <label className="consent" style={{ marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrs((p) => ({ ...p, consent: false }));
          }}
        />
        <span>
          {locale === "es"
            ? "Acepto recibir el PDF y comunicaciones ocasionales sobre este tema."
            : "I agree to receive the PDF and occasional related correspondence."}
        </span>
      </label>
      {errs.consent && (
        <div className="err-msg" style={{ marginTop: -12, marginBottom: 16 }}>
          {locale === "es" ? "Requerido." : "Required."}
        </div>
      )}

      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        {locale === "es" ? "Enviar enlace" : "Send link"} <span className="arr">→</span>
      </button>
    </form>
  );
}
