/**
 * Mock dataset — used when CONTENT_SOURCE=mock.
 *
 * Lets the Next.js app run end-to-end without a real Sanity project.
 * Mirrors what the GROQ queries in src/lib/queries.ts would return, so the
 * page components don't know (or care) which source the data came from.
 *
 * Seed content is the same six articles from the prototype's copy.js so the
 * new pages visually match what the client has already signed off on.
 */

import type { Whitepaper, WhitepaperCard, PersonRef, Body } from "./types";

// ─────────────────────────────────────────────────────────────
// People
// ─────────────────────────────────────────────────────────────

const simon: PersonRef = {
  _id: "person-simon",
  name: "Simon Buika",
  title: "Founder",
};

// ─────────────────────────────────────────────────────────────
// Whitepapers / essays / field notes
// ─────────────────────────────────────────────────────────────

export const MOCK_WHITEPAPERS: Whitepaper[] = [
  {
    _id: "wp-csrd-workwear",
    slug: { current: "csrd-european-workwear-asia" },
    title: {
      en: "CSRD for European workwear brands producing in Asia: what factories can and cannot document today",
      es: "CSRD para marcas europeas de workwear produciendo en Asia: qué pueden documentar las fábricas hoy",
    },
    abstract: {
      en: "A practical reading of CSRD scope 3 Category 1 requirements, what tier-1 and tier-2 suppliers in China, Vietnam, and Bangladesh actually track, and how to close the gap before your first audit.",
      es: "Lectura práctica de los requisitos de CSRD alcance 3 Categoría 1, qué documentan en realidad los proveedores tier-1 y tier-2 en China, Vietnam y Bangladesh, y cómo cerrar la brecha antes de la primera auditoría.",
    },
    pdf: {
      en: { url: "/mock-pdfs/csrd-workwear-en.pdf", size: 2_400_000, originalFilename: "csrd-workwear-en.pdf" },
      es: { url: "/mock-pdfs/csrd-workwear-es.pdf", size: 2_400_000, originalFilename: "csrd-workwear-es.pdf" },
    },
    topic: "compliance",
    regions: ["china", "vietnam", "bangladesh", "eu"],
    regulations: ["csrd", "csddd"],
    readingTime: 32,
    pageCount: 32,
    featured: true,
    author: simon,
    access: "gated",
    publishedAt: "2026-03-12T09:00:00.000Z",
    seo: {
      metaTitle: { en: "CSRD for European workwear brands in Asia", es: "CSRD para marcas europeas de workwear en Asia" },
      metaDescription: {
        en: "Scope 3 Category 1 practical guidance for tier-1 and tier-2 Asian suppliers.",
        es: "Guía práctica de alcance 3 Categoría 1 para proveedores asiáticos tier-1 y tier-2.",
      },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
  {
    _id: "wp-fob-hides",
    slug: { current: "what-fob-price-hides" },
    title: {
      en: "What a FOB price actually hides",
      es: "Lo que realmente esconde un precio FOB",
    },
    abstract: {
      en: "Three things the quote on the PI does not show you — and the two questions you should always ask before accepting a number from a factory you have not visited.",
      es: "Tres cosas que la cotización del PI no muestra — y las dos preguntas que siempre deberías hacer antes de aceptar un número de una fábrica que no has visitado.",
    },
    pdf: { en: null, es: null },
    topic: "costing",
    readingTime: 9,
    featured: false,
    author: simon,
    access: "open",
    publishedAt: "2026-02-14T09:00:00.000Z",
    seo: {
      metaTitle: { en: "What a FOB price hides", es: "Lo que esconde un FOB" },
      metaDescription: {
        en: "The three things Asian factory quotes routinely omit.",
        es: "Las tres cosas que las cotizaciones de fábrica asiáticas omiten.",
      },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
  {
    _id: "wp-vietnam-bangladesh",
    slug: { current: "vietnam-bangladesh-technical-outerwear" },
    title: {
      en: "Why Vietnam and Bangladesh are no longer interchangeable for technical outerwear",
      es: "Por qué Vietnam y Bangladesh ya no son intercambiables para outerwear técnico",
    },
    abstract: {
      en: "Lead time reality, fabric availability, and the slow structural shift that European buyers are ignoring at the quoting stage.",
      es: "Realidad de lead times, disponibilidad de tejidos, y el cambio estructural lento que los compradores europeos están ignorando en la fase de cotización.",
    },
    pdf: { en: null, es: null },
    topic: "country-brief",
    regions: ["vietnam", "bangladesh"],
    readingTime: 6,
    featured: false,
    author: simon,
    access: "open",
    publishedAt: "2026-01-20T09:00:00.000Z",
    seo: {
      metaTitle: { en: "Vietnam vs Bangladesh for technical outerwear" },
      metaDescription: { en: "Structural shift in sourcing, ignored at quote stage." },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
  {
    _id: "wp-third-option",
    slug: { current: "third-option-direct-vs-sourcing-agent" },
    title: {
      en: "The third option between going direct and using a sourcing agent",
      es: "La tercera opción entre ir directo y usar un agente de sourcing",
    },
    abstract: {
      en: "Why the two dominant models for European brands producing in Asia both fail the same way — and what an external buying team does differently.",
      es: "Por qué los dos modelos dominantes para marcas europeas produciendo en Asia fallan de la misma manera — y qué hace diferente un equipo de compras externo.",
    },
    pdf: { en: null, es: null },
    topic: "sourcing",
    readingTime: 11,
    featured: false,
    author: simon,
    access: "open",
    publishedAt: "2025-12-05T09:00:00.000Z",
    seo: {
      metaTitle: { en: "The third option: external buying team" },
      metaDescription: { en: "Why direct-to-factory and agent models both fail European brands." },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
  {
    _id: "wp-country-matching",
    slug: { current: "country-product-matching-framework" },
    title: {
      en: "Country-Product Matching Framework: an introduction",
      es: "Marco de correspondencia País-Producto: una introducción",
    },
    abstract: {
      en: "The structured criteria we use to match a product specification to a country and factory profile. First public outline of the selection mechanism.",
      es: "Los criterios estructurados que usamos para emparejar una especificación de producto con un perfil de país y fábrica. Primer esbozo público del mecanismo de selección.",
    },
    pdf: {
      en: { url: "/mock-pdfs/country-matching-en.pdf", size: 1_800_000, originalFilename: "country-matching-en.pdf" },
      es: null,
    },
    topic: "sourcing",
    regions: ["china", "vietnam", "bangladesh", "myanmar"],
    readingTime: 24,
    pageCount: 24,
    featured: true,
    author: simon,
    access: "gated",
    publishedAt: "2025-11-02T09:00:00.000Z",
    seo: {
      metaTitle: { en: "Country-Product Matching Framework" },
      metaDescription: { en: "Structured criteria for matching specification to country." },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
  {
    _id: "wp-softshell-mill",
    slug: { current: "morning-softshell-mill-ningbo" },
    title: {
      en: "A morning in a softshell mill outside Ningbo",
      es: "Una mañana en una fábrica de softshell a las afueras de Ningbo",
    },
    abstract: {
      en: "Notes on what you see on a technical fabric audit that never makes it onto the PI.",
      es: "Notas sobre lo que ves en una auditoría de tejido técnico que nunca llega al PI.",
    },
    pdf: { en: null, es: null },
    topic: "field-notes",
    regions: ["china"],
    readingTime: 5,
    featured: false,
    author: simon,
    access: "open",
    publishedAt: "2025-10-18T09:00:00.000Z",
    seo: {
      metaTitle: { en: "A morning in a softshell mill outside Ningbo" },
      metaDescription: { en: "Field notes from a technical fabric audit." },
      noIndex: false,
    },
    related: [],
    _source: "mock",
  },
];

// Populate related cross-references after initial array construction.
for (const wp of MOCK_WHITEPAPERS) {
  wp.related = MOCK_WHITEPAPERS
    .filter((other) => other.topic === wp.topic && other._id !== wp._id)
    .slice(0, 3)
    .map(toCard);
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function toCard(wp: Whitepaper): WhitepaperCard {
  return {
    _id: wp._id,
    slug: wp.slug,
    title: wp.title,
    abstract: wp.abstract,
    coverImage: wp.coverImage,
    topic: wp.topic,
    regions: wp.regions,
    readingTime: wp.readingTime,
    publishedAt: wp.publishedAt,
    featured: wp.featured,
    access: wp.access,
    pageCount: wp.pageCount,
    authorName: wp.author.name,
    _source: "mock",
  };
}

export const MOCK_WHITEPAPER_CARDS: WhitepaperCard[] = MOCK_WHITEPAPERS
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map(toCard);
