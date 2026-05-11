/**
 * Plausible analytics script — loaded only in production when the domain
 * env var is set. Script is self-hosted-friendly via NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC.
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.js";
  if (!domain || process.env.NODE_ENV !== "production") return null;
  return <script defer data-domain={domain} src={src} />;
}
