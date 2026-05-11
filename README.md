# Buika Elements

> **Audience:** This README is written for an LLM agent (or a new engineer) onboarding to the project. It covers what the project is, how the two surfaces fit together, how to run it, and — critically — **how to update styling and copy without breaking the prototype↔Next sync model**.

Production-partner-in-Asia marketing site for Simon Caballero. Bilingual (EN/ES). Two surfaces share design language but have very different purposes:

- **`prototype/`** — a single-file React-in-the-browser HTML canvas. Source of truth for design (markup, structure, copy decisions). No build step.
- **`src/`** — Next.js 16 production app. Self-contained CSS, Tailwind v4 utilities, Sanity-ready, deploys to Vercel.

Read `SYNC.md` next — it documents the formal contract between the two surfaces.

---

## How to run it locally

The project uses **Bun** as package manager and runtime.

```bash
bun install
bun run dev                      # http://localhost:3000 → redirects to /en
```

That's it. No env vars required for local dev — the app boots from Git-based MDX (`CONTENT_SOURCE=mdx` is the default). To develop without content, set `CONTENT_SOURCE=mock`.

To open the prototype:

- **Recommended:** open `prototype/Buika Elements (bundled).html` directly in Chrome (`file://`). It inlines all JSX and loads with no server needed.
- The non-bundled `prototype/Buika Elements.html` only works when served over HTTP (CORS blocks `file://` from XHR-fetching the external `*.jsx` scripts that Babel-in-browser needs).

Both surfaces use the same Google fonts, the same color tokens, and produce visually-identical pages.

### Other scripts

```bash
bun run build         # next build
bun run start         # next start
bun run lint          # next lint
bun run typecheck     # tsc --noEmit
bun run sanity:dev    # Sanity Studio at http://localhost:3333
```

### Environment variables

Copy `.env.example` → `.env.local` if/when you wire up production integrations:

| Var | Used by |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | `src/lib/sanity.ts` |
| `SANITY_READ_TOKEN` | preview drafts |
| `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_LEAD_LIST_ID` | `/api/contact` |
| `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_REPLY_TO`, `CONTACT_NOTIFICATION_TO` | `/api/contact` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | analytics |
| `CONTENT_SOURCE` | `mdx` / `sanity` / `mock` — where whitepapers are loaded from |
| `NEXT_PUBLIC_USE_MOCK_DATA` | **Deprecated.** Use `CONTENT_SOURCE=mock` instead. |

### Content workflow (MDX default)

Whitepapers and essays live as **MDX files in Git** under `src/content/whitepapers/{slug}/`:

```
src/content/whitepapers/
├── csrd-european-workwear-asia/
│   ├── en.mdx          ← English body (Markdown/MDX)
│   ├── es.mdx          ← Spanish body (optional)
│   └── meta.json       ← structured metadata (Zod-validated)
```

**To add a new whitepaper:**

1. Create a directory under `src/content/whitepapers/{slug}/`.
2. Write `meta.json` with title, abstract, topic, access, etc.
3. Write `en.mdx` (required) and optionally `es.mdx`.
   - For images, use JSX `<Image src="/content/whitepapers/{slug}/photo.jpg" width={1200} height={800} alt="..." />` so Next.js can optimise them. Plain Markdown `![alt](path)` works but skips optimisation.
4. Place cover image and PDF in `public/content/whitepapers/{slug}/`.
5. Commit and push. The site rebuilds automatically.

> **Full author guide:** `docs/mdx-content-system.md` — complete `meta.json` reference, category derivation rules, locale fallback behaviour, asset paths, and troubleshooting.

**To switch to Sanity** (if Simon wants the Studio dashboard later):

```env
CONTENT_SOURCE=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=...
```

**To develop offline without any content:**

```env
CONTENT_SOURCE=mock
```

---

## Stack

| Concern | Choice |
|---|---|
| Package manager / runtime | **Bun 1.x** |
| Framework | **Next.js 16** (App Router, RSC, ISR, `typedRoutes`) |
| Styling | **Tailwind v4** (`@theme` block in `globals.css`) + project CSS in `src/styles/{tokens,base,sections}.css` |
| Fonts | **`next/font/google`** self-hosting (Source Serif 4 with `opsz` axis, Inter, JetBrains Mono) |
| CMS (when wired) | Sanity v5 |
| Forms | `/api/contact` → HubSpot CRM + Resend |
| Analytics | Plausible (cookieless) |
| Type system | TypeScript strict + `typedRoutes` |
| i18n | Custom `[locale]` segment, `proxy.ts` (Next 16 file convention) detects + redirects |

---

## Repo topology

```
buika-elements/
├─ prototype/                       ← SOURCE OF TRUTH for design
│  ├─ Buika Elements.html           canvas entry (open via http:// only)
│  ├─ Buika Elements (bundled).html canvas with inlined JSX (works on file://)
│  ├─ styles.css                    thin shell, @imports ../shared/*.css
│  ├─ copy.js                       window.COPY — bilingual production copy
│  ├─ chrome.jsx                    Reveal, Wordmark, TopNav, Footer, CredibilityBar,
│  │                                Statement, CtaBand, Placeholder, ContactModal
│  ├─ home.jsx                      HeroTypographic + Positioning/Contrast/Steps/Why/
│  │                                ServicesPreview/HomePage
│  ├─ services.jsx                  ServicesPage
│  ├─ about.jsx                     AboutPage
│  ├─ resources.jsx                 ResourcesPage (filters, list, newsletter)
│  ├─ resource-detail.jsx           ResourceDetailPage
│  ├─ tweaks-panel.jsx              dev-only Tweaks UI (prototype only — NOT in Next)
│  └─ app.jsx                       App shell + hash routing + Tweaks state
│
├─ shared/                          ← prototype-only CSS + manifest
│  ├─ tokens.css                    design tokens (colors, type, rhythm, --container)
│  ├─ base.css                      reset, typography, buttons, forms, placeholders
│  ├─ sections.css                  per-page section CSS
│  └─ component-map.json            authoritative prototype↔Next mapping
│
├─ src/                             ← Next.js production app (self-contained)
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx              <html>, next/font, LocaleProvider,
│  │  │  │                          ContactModalProvider, JIT seed div
│  │  │  ├─ page.tsx                home composition
│  │  │  ├─ services/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ resources/page.tsx
│  │  │  └─ resources/[slug]/page.tsx
│  │  ├─ api/contact/route.ts       HubSpot + Resend (Next-only)
│  │  └─ layout.tsx                 root html shell
│  ├─ components/                   regenerated from prototype/*.jsx (1-to-many split)
│  ├─ content/                      Git-based MDX whitepapers (default content source)
│  │  └─ whitepapers/{slug}/        en.mdx + es.mdx + meta.json + assets
│  ├─ lib/
│  │  ├─ copy.ts                    typed mirror of prototype/copy.js
│  │  ├─ i18n.ts                    locale helpers
│  │  ├─ mock-data.ts               local resources fallback
│  │  ├─ sanity.ts, queries.ts, content.ts, content-mdx.ts
│  │  └─ types.ts
│  ├─ proxy.ts                      locale detection (was middleware.ts in <16)
│  └─ styles/
│     ├─ globals.css                entry: tokens/base/sections + Tailwind v4 + @theme
│     ├─ tokens.css                 Next's copy of design tokens
│     ├─ base.css                   Next's copy of reset/typography
│     └─ sections.css               Next's copy of section CSS
│
├─ sanity/                          Studio + schemas
├─ SYNC.md                          ★ READ THIS — formal sync contract
└─ README.md                        ← you are here
```

---

## The mental model

**The prototype is the design canvas; the Next app is the artifact.** Until launch, the prototype is where you make decisions. The Next app is regenerated from the prototype when changes need to ship.

There are three types of edits, with different workflows:

| Type of edit | Where you change it | What auto-updates |
|---|---|---|
| **Design tokens** (color, type, rhythm) | `shared/tokens.css` (proto) **and** `src/styles/tokens.css` (Next) | both surfaces, after manual mirror |
| **Reset / typography / button CSS** | `shared/base.css` (proto) **and** `src/styles/base.css` (Next) | both surfaces, after manual mirror |
| **Per-section CSS** (nav, footer, modal, hero, contrast, etc.) | `shared/sections.css` (proto) **and** `src/styles/sections.css` (Next) | both surfaces, after manual mirror |
| **Markup / component logic** | `prototype/*.jsx` first → then mirrored to `src/components/*.tsx` on a "sync to next" pass | Next app, manually |
| **Copy** | `prototype/copy.js` first → then mirrored to `src/lib/copy.ts` (typed) | Next app, manually |

> **Important:** the Next app no longer imports from `shared/`. Each surface owns its own CSS. When you change a token or section rule, **mirror to both files**.

---

## How to update STYLING

### 1. Pick the right file

| What you're changing | File (prototype) | File (Next) |
|---|---|---|
| Color, font family, spacing tokens, container width, ease curve | `shared/tokens.css` | `src/styles/tokens.css` |
| Reset, typography classes (`.h1`/`.lede`/`.eyebrow`/`.serif`), buttons, forms, `.container`, `.section`, `.placeholder`, `.reveal` | `shared/base.css` | `src/styles/base.css` |
| Page-section CSS (nav, footer, modal, mobile-sheet, hero-stacked, etc.) | `shared/sections.css` | `src/styles/sections.css` |
| Tailwind utilities (only if a real class usage drives it) | n/a (prototype has no Tailwind) | add `@theme` keys in `src/styles/globals.css` AND a real class usage in source so the JIT generates it |

### 2. Edit BOTH copies

When you change a rule in `shared/tokens.css`, copy the same change to `src/styles/tokens.css`. Same for `base.css` and `sections.css`. The structure is intentionally identical — diff and mirror is a one-line operation.

### 3. Tailwind utility usage

Tailwind v4 in Next is JIT — utilities only get generated when their class names appear in scanned source files (`src/app/**`, `src/components/**`, `src/lib/**`). Custom theme keys are declared in the `@theme { }` block in `src/styles/globals.css`:

```css
@theme {
  --color-paper: var(--paper);          /* generates bg-paper, text-paper, etc. */
  --color-signal: var(--signal);
  --font-display: var(--serif);         /* generates font-display utility */
  --font-body: var(--sans);
  --font-code: var(--mono);
}
```

To make a new utility available:
1. Add the `--color-*` / `--font-*` / etc. key to the `@theme` block (point at a token CSS var).
2. Use the class name in at least one TSX file. There's a hidden JIT-seed `<div hidden className="bg-paper bg-stone …">` in `src/app/[locale]/layout.tsx` that pre-emits the common token utilities so they're always available — extend it as needed.

### 4. Verify alignment with the prototype

After changes, eyeball both surfaces side-by-side. The fastest check:
- Open `prototype/Buika Elements (bundled).html` in one Chrome tab.
- Open `http://localhost:3000/en` in another.
- Use the same viewport width on both. Scroll the same page. Differences should be sub-pixel font rendering only.

For programmatic verification, use the chrome-devtools MCP tooling: emulate viewport (`375` / `768` / `1280` / `1920`), take metrics via `evaluate_script`, diff section heights, headings, padding.

### 5. Token catalog (quick reference)

```css
/* shared/tokens.css and src/styles/tokens.css — kept in sync */
--ink:#0A0A0B;  --ink-muted:#4A4A4E;  --ink-faint:#8A8A90;
--paper:#F3EFE6;  --paper-pure:#FBF9F3;  --stone:#E2DDD1;  --stone-soft:#EDE8DC;
--slate:#14161C;  --slate-soft:#1C1F26;
--signal:#0F2A5C;
--serif: "Source Serif 4", "EB Garamond", Georgia, serif;
--sans:  "Inter", ui-sans-serif, system-ui, sans-serif;
--mono:  "JetBrains Mono", ui-monospace, Menlo, monospace;
--step: 8px;
--rhythm-major: 160px;  --rhythm-sub: 96px;  --rhythm-para: 28px;
--container: 100%;       /* fluid; .container adds padding-inline: clamp(24px, 4vw, 48px) */
--gutter: 24px;
--ease: cubic-bezier(.2,.6,.2,1);
```

The Next side additionally redeclares `--serif/--sans/--mono` in `globals.css` to inject `next/font` variables (`var(--font-serif), …`) so the self-hosted Google Fonts take precedence. Don't change those override lines unless you know you're swapping the font loader.

---

## How to update COPY

All user-facing strings live in two files (one per surface) with identical structure:

- **Prototype:** `prototype/copy.js` — `window.COPY = { en: {…}, es: {…} }`
- **Next:** `src/lib/copy.ts` — typed export `getCopy(locale): Copy` + nested types (`HomeCopy`, `ServicesCopy`, `AboutCopy`, etc.)

### Steps to add or edit copy

1. **Edit `prototype/copy.js` first.** This is the source of truth. Make the change in the appropriate `en.*` and `es.*` sub-tree.
2. **Mirror to `src/lib/copy.ts`.** Same key, same value, both locales. If you're adding a new top-level key (e.g. `services.bottomCta`), update the corresponding TypeScript type at the top of `copy.ts` first, then add the EN and ES blocks.
3. **Reload the prototype** (refresh `Buika Elements (bundled).html`) to confirm the prototype renders the new copy correctly.
4. **Reload the Next app** to confirm both locales work — `/en` and `/es`.
5. If a string was added (not edited) the consuming component may need an update too. Search `prototype/*.jsx` for the closest analogue and mirror that into the Next component.

### Production-locked strings

The copy in `prototype/copy.js` is treated as **production-locked** unless explicitly told otherwise. Don't paraphrase, don't reflow, don't tweak punctuation as a "drive-by improvement". If the user asks to change a string, change exactly that string in both files — leave the rest alone.

### Bilingual rule

Every string that exists in EN must exist in ES (and vice versa). The `LocaleProvider` will throw at runtime if a key is missing for the active locale. When in doubt, copy the EN value into ES with `[ES TODO]` rather than omit the key — that's caught at translation review time, not at user request time.

---

## How to update MARKUP / COMPONENTS

This is the most involved kind of change because it crosses the prototype↔Next boundary.

### Authoritative mapping

`shared/component-map.json` is the manifest. It lists every prototype function and the Next file(s) it generates. The "sync to next" workflow uses it as the work list. Read `SYNC.md` for the full rules.

### Workflow when the user asks for a markup/component change

1. **Edit the prototype first.** Find the right `prototype/*.jsx` function and make the change. Verify visually in `Buika Elements (bundled).html`.
2. **Identify the corresponding Next file(s)** via `shared/component-map.json`.
3. **Apply the same change to the Next TSX** following the transformation rules in SYNC.md:
   - Add `'use client'` if the component uses `useState`/`useEffect`/event handlers/browser APIs.
   - Replace `{ copy, lang }` props with `useLocale()`.
   - Replace `onCta` / `onOpenContact` props with `useContactModal().openModal()`.
   - Replace `setRoute("about")` with `<Link href={`/${locale}/about` as Route}>` (cast template-literal `href`s as `Route` from `next` because `typedRoutes` is on).
   - Replace `<a href="#">` placeholder anchors with real `<Link>` (or keep as `<button>` if it triggers a modal).
   - Inline styles stay inline; CSS class names match 1:1.
4. **Verify in both surfaces** at multiple viewports (mobile / tablet / desktop / wide).
5. **Run `bunx tsc --noEmit`** to catch type errors before committing.

### Anti-patterns

- ❌ Editing a `src/components/*.tsx` directly when the same change applies to the prototype — your change will get overwritten on the next sync.
- ❌ Adding a new component CSS class only in `src/styles/sections.css` without mirroring to `shared/sections.css`.
- ❌ Inventing a new copy string only in `src/lib/copy.ts` — add to `prototype/copy.js` first.
- ❌ Renaming a prototype function without updating `shared/component-map.json`.

---

## Things you should NOT touch on the Next side

The "Next-only" allowlist in `shared/component-map.json` lists files that are not regenerated from the prototype. Don't sync these:

- `src/app/api/contact/route.ts` — HubSpot + Resend integration
- `src/app/layout.tsx` — root `<html>`/`<body>` shell
- `src/proxy.ts` — locale detection (Next 16+ file convention)
- `src/lib/sanity.ts`, `queries.ts`, `mock-data.ts`, `types.ts`, `i18n.ts`, `content.ts`
- `src/components/PlausibleScript.tsx`, `src/components/LocaleContext.tsx`, `src/components/ContactModalContext.tsx`, `src/components/ResourceDetailGate.tsx`
- `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`
- `sanity/**`
- `.env.example`, `README.md`, `SYNC.md`

---

## Verification checklist before declaring "done"

After ANY change to copy, styling, or markup:

1. ✅ `bunx tsc --noEmit` exits 0.
2. ✅ Both `/en` and `/es` render without runtime errors.
3. ✅ Prototype `Buika Elements (bundled).html` still renders correctly.
4. ✅ At 375 / 768 / 1280 / 1920 viewports: no overflow, no layout breakage, sections appear in the same order on Next as on the prototype.
5. ✅ If you added a new string: it appears in both EN and ES.
6. ✅ If you added a new prototype function: `shared/component-map.json` has a new entry mapping it to its Next destination (or `"next": []` if prototype-only).

---

## Conventions

- **Inline styles are OK** when they're prototype-y (one-off positions, animation values, content-driven tweaks). Mirror exactly between prototype and Next. Don't promote to CSS unless reused.
- **Class names match 1:1** between the two surfaces. `container` and `container-site` are aliased to the same rule.
- **Reveal stagger** uses `delay={i * 60}` or `i * 80` patterns — mirror what the prototype does, don't invent your own.
- **No emojis** in production strings or commit messages unless explicitly requested.
- **No ad-hoc abstractions.** If the prototype does X inline, the Next side should also do X inline. Don't refactor "while you're there".

---

## Roadmap (next milestones)

1. ✅ MDX content system — Git-based whitepapers with `meta.json` + `en.mdx`/`es.mdx` (default source).
2. Gated download flow wired through `/api/revalidate` + Resend.
3. Studio embed at `/studio` with Sanity auth (switch via `CONTENT_SOURCE=sanity`).
4. Plausible custom events: modal opens, gate conversions, language switches.
5. Once production launches: revisit whether the prototype should be archived or kept as a design playground.

---

© Buika Elements. Source closed; this README documents the build for the team.
