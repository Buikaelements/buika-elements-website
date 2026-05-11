"use client";

// @sync-source: prototype/chrome.jsx#ContactModal
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useEffect, useState } from "react";
import { useContactModal } from "./ContactModalContext";
import { useLocale } from "./LocaleContext";

type Errors = Partial<Record<"name" | "company" | "email" | "brief" | "consent", true>>;

export function ContactModal() {
  const { isOpen, closeModal, preset } = useContactModal();
  const { locale, copy } = useLocale();
  const c = copy.contactModal;

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    brief: preset?.note ?? "",
    country: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    if (!isOpen) {
      setSubmitted(false);
      setErrors({});
      setErrorMsg(null);
      setSubmitting(false);
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (isOpen && preset?.note) {
      setForm((f) => ({ ...f, brief: preset.note ?? "" }));
    }
  }, [isOpen, preset]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = true;
    if (!form.company.trim()) e.company = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.brief.trim() || form.brief.trim().length < 10) e.brief = true;
    if (!form.consent) e.consent = true;
    return e;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    if (data.get("company_url")) {
      // honeypot — silently succeed.
      setSubmitted(true);
      return;
    }
    const es = validate();
    setErrors(es);
    if (Object.keys(es).length > 0) return;

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          country: form.country,
          message: form.brief,
          locale,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j?.error || "Submission failed");
      }
      setSubmitted(true);
      const w = window as unknown as { plausible?: (e: string) => void };
      if (w.plausible) w.plausible("Contact form submit");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(10,10,11,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper)",
          width: "100%",
          maxWidth: 720,
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "48px clamp(24px, 4vw, 56px) 56px",
          animation: "slideUp 300ms var(--ease)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div className="eyebrow">{c.eyebrow}</div>
          <button
            type="button"
            onClick={closeModal}
            aria-label={c.close}
            style={{
              fontSize: 13,
              color: "var(--ink-muted)",
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>×</span> {c.close}
          </button>
        </div>

        {submitted ? (
          <div style={{ paddingBlock: 40 }}>
            <div className="signal-rule" style={{ marginBottom: 24 }} />
            <h2 id="contact-modal-title" className="h2" style={{ marginBottom: 16 }}>
              {c.success}
            </h2>
            <p className="lede text-ink-muted">{c.sub}</p>
          </div>
        ) : (
          <>
            <h2 id="contact-modal-title" className="h2" style={{ marginBottom: 16 }}>
              {c.head}
            </h2>
            <p className="lede text-ink-muted" style={{ marginBottom: 40 }}>
              {c.sub}
            </p>
            <form
              onSubmit={submit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              <div
                className="modal-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
              >
                <div className={`field ${errors.name ? "err" : ""}`}>
                  <label>
                    {c.name} <span className="req">*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </div>
                <div className={`field ${errors.company ? "err" : ""}`}>
                  <label>
                    {c.company} <span className="req">*</span>
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    autoComplete="organization"
                  />
                </div>
              </div>
              <div className={`field ${errors.email ? "err" : ""}`}>
                <label>
                  {c.email} <span className="req">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="err-msg">Please enter a valid email address.</span>
                )}
              </div>
              <div className={`field ${errors.brief ? "err" : ""}`}>
                <label>
                  {c.brief} <span className="req">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder={c.briefPh}
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                />
              </div>
              <div className="field">
                <label>{c.country}</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
              </div>
              <label
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
                aria-hidden
              >
                Company URL
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
              <label className={`consent ${errors.consent ? "err" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>{c.consent}</span>
              </label>
              {errorMsg && (
                <div
                  role="alert"
                  style={{
                    padding: "12px 16px",
                    border: "1px solid var(--signal)",
                    color: "var(--signal)",
                    fontSize: 14,
                  }}
                >
                  {errorMsg}
                </div>
              )}
              <div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "…" : c.submit} <span className="arr">→</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
        @media (max-width: 640px) { .modal-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
