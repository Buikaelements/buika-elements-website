"use client";

// @sync-source: prototype/chrome.jsx#TopNav
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { useContactModal } from "./ContactModalContext";
import { useLocale } from "./LocaleContext";

export function TopNav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useContactModal();
  const { locale, setLocale, copy } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const items = [
    { key: "home", path: "", label: copy.nav.home },
    { key: "services", path: "/services", label: copy.nav.services },
    { key: "about", path: "/about", label: copy.nav.about },
    { key: "resources", path: "/resources", label: copy.nav.resources },
  ];

  const homePath = `/${locale}`;
  const isActive = (path: string) => {
    const full = `${homePath}${path}`;
    if (path === "") return pathname === homePath || pathname === `${homePath}/`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "color-mix(in srgb, var(--paper) 92%, transparent)",
          backdropFilter: "blur(12px) saturate(140%)",
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
          borderBottom: scrolled ? "1px solid var(--stone)" : "1px solid transparent",
          transition: "border-color 200ms var(--ease)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link
              href={homePath as Route}
              aria-label="Buika Elements home"
              style={{ display: "inline-flex", alignItems: "center", color: "inherit" }}
            >
              <Wordmark size={22} />
            </Link>
            <span
              className="nav-tagline"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                paddingLeft: 20,
                borderLeft: "1px solid var(--stone)",
              }}
            >
              {copy.home.heroEyebrow}
            </span>
          </div>

          <nav
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: 36 }}
          >
            {items.map((it) => {
              const active = isActive(it.path);
              return (
                <Link
                  key={it.key}
                  href={`${homePath}${it.path}` as Route}
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--ink)" : "var(--ink-muted)",
                    paddingBottom: 4,
                    borderBottom: active ? "1px solid var(--ink)" : "1px solid transparent",
                    transition:
                      "color 200ms var(--ease), border-color 200ms var(--ease)",
                  }}
                >
                  {it.label}
                </Link>
              );
            })}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                marginLeft: 12,
              }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                style={{
                  color: locale === "en" ? "var(--ink)" : "var(--ink-muted)",
                  fontWeight: locale === "en" ? 500 : 400,
                }}
              >
                EN
              </button>
              <span style={{ color: "var(--stone)" }}>/</span>
              <button
                type="button"
                onClick={() => setLocale("es")}
                style={{
                  color: locale === "es" ? "var(--ink)" : "var(--ink-muted)",
                  fontWeight: locale === "es" ? 500 : 400,
                }}
              >
                ES
              </button>
            </div>
          </nav>

          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 20, height: 12, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "var(--ink)",
                  top: mobileOpen ? 6 : 0,
                  transform: mobileOpen ? "rotate(45deg)" : "none",
                  transition: "all 200ms var(--ease)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "var(--ink)",
                  top: mobileOpen ? 6 : 11,
                  transform: mobileOpen ? "rotate(-45deg)" : "none",
                  transition: "all 200ms var(--ease)",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 35,
          background: "var(--paper)",
          transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 300ms var(--ease)",
          paddingTop: 100,
          paddingInline: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items.map((it) => (
          <Link
            key={it.key}
            href={`${homePath}${it.path}` as Route}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--serif)",
              fontSize: 40,
              lineHeight: 1.2,
              textAlign: "left",
              padding: "12px 0",
              color: isActive(it.path) ? "var(--ink)" : "var(--ink-muted)",
              borderBottom: "1px solid var(--stone)",
            }}
          >
            {it.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            openModal();
            setMobileOpen(false);
          }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: 40,
            lineHeight: 1.2,
            textAlign: "left",
            padding: "12px 0",
            color: "var(--signal)",
            borderBottom: "1px solid var(--stone)",
          }}
        >
          {copy.nav.contact} →
        </button>
        <div style={{ marginTop: 32, display: "flex", gap: 16, fontSize: 14 }}>
          <button
            type="button"
            onClick={() => setLocale("en")}
            style={{
              color: locale === "en" ? "var(--ink)" : "var(--ink-muted)",
              fontWeight: locale === "en" ? 500 : 400,
            }}
          >
            English
          </button>
          <span style={{ color: "var(--stone)" }}>/</span>
          <button
            type="button"
            onClick={() => setLocale("es")}
            style={{
              color: locale === "es" ? "var(--ink)" : "var(--ink-muted)",
              fontWeight: locale === "es" ? 500 : 400,
            }}
          >
            Español
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-tagline { display: none !important; }
        }
      `}</style>
    </>
  );
}
