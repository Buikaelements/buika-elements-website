"use client";

// @sync-source: prototype/chrome.jsx#ContactModal
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Ctx = {
  isOpen: boolean;
  openModal: (preset?: { topic?: string; note?: string }) => void;
  closeModal: () => void;
  preset: { topic?: string; note?: string } | null;
};

const ContactModalContext = createContext<Ctx | null>(null);

/**
 * ContactModalProvider — single source of truth for the global "Request a
 * conversation" modal. Anything in the tree can trigger it via openModal()
 * and optionally pass a preset (subject + body) so contextual CTAs land on
 * a primed form.
 */
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<{ topic?: string; note?: string } | null>(null);

  const openModal = useCallback((p?: { topic?: string; note?: string }) => {
    setPreset(p ?? null);
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal, preset }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
