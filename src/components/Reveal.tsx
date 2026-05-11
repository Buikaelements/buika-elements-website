"use client";

// @sync-source: prototype/chrome.jsx#Reveal
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveal — IntersectionObserver-driven fade+rise on first view.
 *
 * We avoid running the observer for users with prefers-reduced-motion
 * (see .reveal rules in globals.css — it disables the transition entirely).
 * If the observer is unavailable (old browser or SSR), we render visible.
 */
export function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref as never} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>{children}</As>;
}
