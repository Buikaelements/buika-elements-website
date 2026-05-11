# SYNC.md — Prototype ↔ Next.js workflow

> **TL;DR.** The prototype in `/prototype` is the live design canvas. The Next.js app in `/src` is a downstream artifact, regenerated from the prototype on demand. CSS auto-syncs via `/shared`. JSX/TSX syncs only when the user says **"sync to next"**.

---

## Why this setup

The prototype is the only thing that runs as a live preview in our collaboration environment — single HTML file, Babel-in-browser, no Node required. The Next.js app cannot run here, so it's the wrong surface for design iteration.

Treating the prototype as the source of truth and the Next.js app as a compiled artifact lets us:

- Iterate on visual design fast, with the Tweaks panel live.
- Keep one place where structure, copy positioning, and components are authored.
- Avoid drift between two parallel codebases that drift the moment one is edited and the other is forgotten.

---

## Repo topology

```
buika-elements/
├─ shared/                          ← Prototype-only CSS (the prototype's source of truth)
│  ├─ tokens.css
│  ├─ base.css
│  └─ sections.css
│
├─ prototype/                       ← SOURCE OF TRUTH for design (markup + structure)
│  ├─ Buika Elements.html           ← canvas entry point (open in browser)
│  ├─ Buika Elements (bundled).html ← same, with all *.jsx inlined for file:// loading
│  ├─ styles.css                    ← thin shell, @imports ../shared/*
│  ├─ copy.js                       ← EN/ES copy bundle (production-locked)
│  ├─ chrome.jsx                    ← Reveal, Wordmark, TopNav, Footer, CredibilityBar,
│  │                                  Statement, CtaBand, Placeholder, ContactModal
│  ├─ home.jsx                      ← HeroTypographic + Positioning/Contrast/Steps/Why/
│  │                                  ServicesPreview/HomePage
│  ├─ services.jsx                  ← ServicesPage
│  ├─ about.jsx                     ← AboutPage (bio, stats, operate)
│  ├─ resources.jsx                 ← ResourcesPage (filters, list, newsletter)
│  ├─ resource-detail.jsx           ← ResourceDetailPage
│  ├─ tweaks-panel.jsx              ← TweaksPanel + Tweak* controls + useTweaks
│  └─ app.jsx                       ← TWEAK_DEFAULTS, SERIF_STACKS, PAPER_WARMTH_MAP,
│                                     SIGNAL_OPTIONS, HERO_VARIANTS, App shell, routing
│
├─ src/                             ← DOWNSTREAM ARTIFACT (regenerated from prototype on sync)
│  ├─ app/                          ← Next-only: routing, layouts, API routes, middleware
│  │  ├─ [locale]/{page,about,services,resources}/page.tsx   ← composes components
│  │  ├─ [locale]/layout.tsx        ← LocaleProvider, ContactModalProvider, next/font
│  │  └─ api/contact/route.ts       ← Next-only: HubSpot + Resend
│  ├─ components/                   ← regenerated from prototype/*.jsx (1-to-many split)
│  ├─ content/                      ← Git-based MDX whitepapers (Next-only, not from prototype)
│  │  └─ whitepapers/{slug}/        en.mdx + es.mdx + meta.json
│  ├─ lib/                          ← Next-only: sanity, queries, mock-data, copy.ts, i18n
│  ├─ proxy.ts                      ← Next-only: locale detection (Next 16+ file convention; was middleware.ts)
│  └─ styles/                       ← Self-contained CSS for the Next app
│     ├─ globals.css                ← entry: imports tokens/base/sections + Tailwind v4 + @theme
│     ├─ tokens.css                 ← Next's copy of design tokens
│     ├─ base.css                   ← Next's copy of reset/typography/buttons/forms
│     └─ sections.css               ← Next's copy of nav/footer/modal/sections CSS
│
├─ sanity/                          ← Next-only: Studio + schemas
└─ SYNC.md                          ← this file
```

---

## What auto-syncs vs what is manual

### Mirrored on demand (manual)

The Next app is **self-contained**. Its CSS lives under `src/styles/` (not `shared/`), so changes don't auto-propagate. When tokens, base styles, or section CSS change in either surface, mirror the change manually:

| Concern | Prototype file | Next file |
|---|---|---|
| Design tokens (colors, type, rhythm) | `shared/tokens.css` | `src/styles/tokens.css` |
| Reset, typography, buttons, forms, placeholder | `shared/base.css` | `src/styles/base.css` |
| Page-section CSS (nav, footer, modal, sections) | `shared/sections.css` | `src/styles/sections.css` |

The Next app additionally loads Tailwind v4 (utilities only — preflight comes via `@import "tailwindcss"` but is overridden by `base.css` which is unscoped). Project tokens are re-exposed as Tailwind theme keys via the `@theme` block in `globals.css`, so utilities like `bg-paper`, `text-signal`, `font-display` map back to the same CSS vars inline styles use.

### Manual sync on command (markup, structure, component logic)

Everything in `prototype/*.jsx` corresponds to one or more files in `src/components/*.tsx`. These do **not** auto-sync. The user triggers sync with a phrase like **"sync to next"** or **"export the prototype"**.

---

## Component mapping (1-to-many)

> **Source of truth:** `shared/component-map.json`. The table below is its prose rendering. When the JSON changes, regenerate this table. When the table changes, update the JSON. They must agree.

The prototype groups components by page; the Next app splits them per-component for tree-shaking + RSC boundaries. The mapping:

| Prototype file | Function in prototype | Next.js destination |
|---|---|---|
| `chrome.jsx` | `Reveal` | `src/components/Reveal.tsx` |
| `chrome.jsx` | `Wordmark` | `src/components/Wordmark.tsx` |
| `chrome.jsx` | `TopNav` | `src/components/TopNav.tsx` |
| `chrome.jsx` | `Footer` | `src/components/Footer.tsx` |
| `chrome.jsx` | `CredibilityBar` | `src/components/CredibilityBar.tsx` |
| `chrome.jsx` | `Statement` | `src/components/Statement.tsx` |
| `chrome.jsx` | `CtaBand` | `src/components/CtaBand.tsx` |
| `chrome.jsx` | `Placeholder` | `src/components/Placeholder.tsx` |
| `chrome.jsx` | `ContactModal` | `src/components/ContactModal.tsx` (+ `ContactModalContext.tsx`) |
| `home.jsx` | `HeroTypographic` | `src/components/HomeHero.tsx` |
| `home.jsx` | `PositioningBlock` | `src/components/HomePositioning.tsx` |
| `home.jsx` | `ContrastBlock` | `src/components/HomeContrast.tsx` |
| `home.jsx` | `StepsBlock` | `src/components/HomeSteps.tsx` |
| `home.jsx` | `WhyBlock` | `src/components/HomeWhy.tsx` |
| `home.jsx` | `ServicesPreview` | `src/components/ServicesList.tsx` (preview variant inline at home/page.tsx) |
| `home.jsx` | `HomePage` (composition) | `src/app/[locale]/page.tsx` |
| `about.jsx` | `AboutPage` (bio/stats/operate) | `src/components/AboutBio.tsx` + `AboutStats.tsx` + `AboutOperate.tsx` (composed in `src/app/[locale]/about/page.tsx`) |
| `services.jsx` | `ServicesPage` | `src/components/ServicesList.tsx` (composed in `src/app/[locale]/services/page.tsx`) |
| `resources.jsx` | `ResourcesPage` | `src/components/ResourcesIndex.tsx` (composed in `src/app/[locale]/resources/page.tsx`) |
| `resource-detail.jsx` | `ResourceDetailPage` | `src/app/[locale]/resources/[slug]/page.tsx` (body content comes from `src/lib/content.ts`, not the prototype) |
| `tweaks-panel.jsx` | `TweaksPanel` + `useTweaks` | `src/components/TweaksPanel.tsx` + `TweaksProvider.tsx` |
| `app.jsx` | `TWEAK_DEFAULTS`, `SERIF_STACKS`, `PAPER_WARMTH_MAP`, `SIGNAL_OPTIONS`, `HERO_VARIANTS` | `src/components/TweaksProvider.tsx` (top-of-file exports) |
| `app.jsx` | `App` shell + routing | `src/app/[locale]/layout.tsx` (providers) + `src/components/SiteChrome.tsx` (chrome) |
| `copy.js` | `COPY` object (EN/ES) | `src/lib/copy.ts` (typed) |

---

## Files that are Next-only — never regenerated from the prototype

These have no prototype counterpart. Sync **never** rewrites them:

- `src/app/api/contact/route.ts` — HubSpot v3 contacts + Resend email
- `src/app/layout.tsx` — root html/body, fonts, Plausible
- `src/proxy.ts` — locale detection (Next 16+ file convention; was `middleware.ts`)
- `src/lib/sanity.ts`, `src/lib/queries.ts`, `src/lib/mock-data.ts`, `src/lib/types.ts`, `src/lib/i18n.ts`, `src/lib/content.ts`, `src/lib/content-mdx.ts`
- `src/components/ContentBody.tsx`, `src/components/ContentBodyMdx.tsx`
- `src/content/**` — MDX whitepapers (Git-based content, not generated from prototype)
- `src/components/PlausibleScript.tsx`
- `src/components/LocaleContext.tsx`
- `next.config.mjs`, `tsconfig.json`
- `sanity/**`
- `.env.example`, `README.md`, `SYNC.md`

---

## Transformation rules (what happens during sync)

When the user says "sync to next", apply these rules to convert prototype JSX → Next TSX:

1. **JSX → TSX.** Add explicit prop types. Functions become typed: `function HomeHero(): JSX.Element` or props-typed equivalents.
2. **`'use client'` directive** at top of any file that uses `useState`, `useEffect`, `useRef`, `useContext`, browser APIs (`window`, `localStorage`, `IntersectionObserver`), or event handlers. Pure-presentational components stay as RSC (no directive).
3. **Props → context.** Prototype passes `copy` and `lang` as props through every component. In Next, these come from `useLocale()` (defined in `LocaleContext.tsx`). Replace `({ copy, lang })` props with `const { copy, locale } = useLocale()`.
4. **`onCta` / `onOpenContact` props → `useContactModal()`.** Replace with `const { openModal } = useContactModal()` and call `openModal()`.
5. **`setRoute("about")` → `<Link href={`/${locale}/about`}>`** from `next/link`. Locale prefix is required. Next 16+ `typedRoutes` rejects template-literal `href`s (and `router.push` strings) because `RouteImpl<T>` only narrows literal route strings — cast with `as Route` (importing `import type { Route } from "next"`) at the call site. Static literals (e.g. `href="/en/about"`) don't need the cast.
6. **`<a href="#">` placeholder anchors → real `<Link>`** when the route exists, or keep as `<button>` when it triggers a modal.
7. **`<img src>` → `<Image>`** from `next/image` only when we have real assets. Striped placeholders stay as the `<Placeholder>` component (no Image wrap).
8. **Inline copy in JSX → `lib/copy.ts` lookup.** All user-facing strings already live in `prototype/copy.js`; the Next mirror is `src/lib/copy.ts`. If new copy was added in the prototype, mirror the structural change in `lib/copy.ts` first, then reference via `copy.home.foo`.
9. **Tweaks state → `useTweaks()` hook** from `TweaksProvider.tsx`. Don't duplicate `TWEAK_DEFAULTS`/`SERIF_STACKS`/etc — they live once in `TweaksProvider.tsx`.
10. **Page composition.** Prototype has `<HomePage>` rendering all sections; Next has `src/app/[locale]/page.tsx` doing the same composition with imports. Section ORDER must match the prototype exactly.
11. **CSS class names match 1:1.** `shared/*.css` defines them once. If the prototype introduces a new class, add it to `shared/sections.css` (or `base.css` if generic) — never inline-styles-only in TSX.
12. **Inline styles are OK** when they're prototype-y (one-off positions, animation values). Keep them inline in TSX too. Don't promote to CSS unless they're reused.

---

## The sync command, step by step

When the user says "sync to next" (or equivalent), I will:

1. **Read `shared/component-map.json`** as the authoritative manifest.
2. Run `grep` / `read_file` over `prototype/*.jsx` and the corresponding `src/components/*.tsx` to find structural diffs.
3. For each `entries[i]` in the manifest, regenerate the listed `next` files from the named `prototype` function, following the transformation rules above.
4. If the prototype added a new component or section: create the new TSX file, add to the appropriate `src/app/[locale]/*/page.tsx` composition, **add a new entry to `shared/component-map.json`**, and add corresponding rows to the SYNC.md mapping table.
5. If the prototype removed a component: delete the orphaned TSX (after confirming nothing else imports it), remove the entry from `shared/component-map.json`, remove the row from SYNC.md.
6. **Run the verification step below.** Do not declare sync complete until it passes.
7. If `prototype/copy.js` changed: mirror the change into `src/lib/copy.ts` (preserving its TS typing).
8. Surface a summary of files changed and call `done` on `prototype/Buika Elements.html` so the user can keep iterating.
9. **Do not** edit `shared/*.css` during sync — it's already the same on both sides.
10. **Do not** edit Next-only files (api/contact, sanity, lib, middleware, configs, sanity/, README, SYNC.md mapping) unless the prototype change semantically requires it (e.g. new copy keys → update `lib/copy.ts` types).

---

## Sync verification (mechanical drift check)

Run after every sync. The goal is to catch components added, renamed, or deleted on one side but not the other. Three checks:

### 1. Manifest ↔ prototype: every prototype function is mapped

For each `function NAME` (or top-level `const NAME =`) in `prototype/*.jsx`, confirm there is an entry in `shared/component-map.json` whose `prototype` field ends with `#NAME`. Use:

```
grep -E "^(function|const) [A-Z][a-zA-Z]+" prototype/*.jsx
```

Any function name not in the manifest is **drift**: either add it to the manifest (with a `next` destination) or document it as prototype-only (e.g. demo-harness components like `BgTexture`, `HeroFoot` that have no Next counterpart — list these in the manifest with `"next": []` and a note).

### 2. Manifest ↔ Next: every listed `next` file exists

For each `entries[i].next[j]` path in `shared/component-map.json`, confirm the file exists. Missing files mean the sync didn't actually land — re-run that entry.

### 3. Marker comments: source and target agree

Every `src/components/*.tsx` listed in the manifest must contain `@sync-source: <prototype-ref>` near the top.
Every `prototype/*.jsx` function listed in the manifest must contain `@sync-target: <next-paths>` directly above the function declaration.

```
grep -RE "@sync-(source|target)" prototype/ src/components/
```

If a marker is missing, the file was authored or edited without going through sync — fix the marker and re-verify the content.

### 4. Next-only allowlist

Any file under `src/components/` that does NOT appear as a `next` destination in the manifest should appear in `nextOnly[]`. Anything in neither list is undeclared — either map it to a prototype source or add it to `nextOnly[]`.

A failed verification step is not a soft warning — it means sync is incomplete. Resolve before claiming sync is done.

---

## v1 baseline

This document and the current state of `prototype/` ↔ `src/` represent **v1** of the design. As of this baseline:

- All page sections (Home, Services, About, Resources index, Resource detail) exist in both surfaces.
- The Tweaks panel exists in both surfaces with identical defaults: `serifFamily=Source Serif 4`, `paperWarmth=2`, `signalHue=#0F2A5C`, `heroVariant=standard`.
- The Contact modal exists in both surfaces with the same fields and validation rules.
- Copy is bilingual (EN/ES) and locked per the production copy doc; sync must preserve the production-locked strings unchanged unless explicitly told otherwise.
- The Next.js app additionally has: HubSpot+Resend `/api/contact`, Sanity scaffolding, `[locale]` routing with middleware, mock-data fallback. None of this is reflected in the prototype and that is correct.

Future syncs are diffs against this baseline.

---

## Anti-patterns to avoid

- ❌ Editing `src/components/*.tsx` directly when the same change applies to the prototype. The prototype change will overwrite it on the next sync.
- ❌ Adding new design tokens or component CSS only in `src/styles/globals.css`. Always add to `shared/*.css`.
- ❌ Adding new copy strings only in `src/lib/copy.ts`. Add to `prototype/copy.js` first, then mirror.
- ❌ Treating the Next app as the "real" codebase and the prototype as throwaway. Until production launch, it's the inverse.

---

*Maintained by the design+eng pair. If the workflow breaks down (e.g. the prototype outgrows Babel-in-browser, or the Next app needs structural changes the prototype can't express), revisit this file before papering over the gap.*
