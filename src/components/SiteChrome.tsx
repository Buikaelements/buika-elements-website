// @sync-source: prototype/app.jsx#App (Tweaks panel intentionally omitted in Next)
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import { LocaleProvider } from "./LocaleContext";
import { ContactModalProvider } from "./ContactModalContext";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { ContactModal } from "./ContactModal";

export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  copy: Copy;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider initialLocale={locale}>
      <ContactModalProvider>
        <TopNav />
        <main style={{ paddingTop: 0 }}>{children}</main>
        <Footer />
        <ContactModal />
      </ContactModalProvider>
    </LocaleProvider>
  );
}
