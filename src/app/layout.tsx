import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

/**
 * Root layout.
 *
 * Intentionally minimal — the locale-aware <html lang> attribute lives in
 * src/app/[locale]/layout.tsx so we don't render the wrong language on
 * static pages. This root layout is only reached via redirects from
 * middleware; in practice every real request hits the [locale] layout.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://buikaelements.com"
  ),
  title: {
    default: "Buika Elements — Production partner in Asia",
    template: "%s · Buika Elements",
  },
  description:
    "Your buying team in Asia. 16+ years of manufacturer-side experience across China, Vietnam, Bangladesh, Myanmar. Da Nang.",
  openGraph: {
    type: "website",
    siteName: "Buika Elements",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
