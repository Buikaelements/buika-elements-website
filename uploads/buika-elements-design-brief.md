# BUIKA ELEMENTS — WEBSITE DESIGN BRIEF

**Version 1.0 · For implementer handoff · 2026**
Project: Full replacement of buikaelements.com
Source positioning: `Buika_Elements_Positioning_v3.md`
Source copy: `Buika_Web_Copy_v2.md` (English + Spanish, production-ready)
Source operations: `Buika_Operational_Model_v2.md` (for mechanism names only)

---

## 0. How to use this document

This is a design brief, not an architecture document. It specifies **what gets built, how it looks, and what it must communicate**. It is deliberately tech-agnostic — the implementer (or whoever selects the stack) is free to execute it in Astro, Webflow, Framer, Next.js, or anything else, provided the functional requirements in §15 are met.

What this brief **does** cover:
- Strategic positioning the design must hold
- Visual system (typography, color, grid, motion, imagery)
- Information architecture and page-by-page specifications
- Component library with behavior and states
- Functional requirements (Resources CMS, gated downloads, forms)
- Accessibility, responsive, and SEO expectations
- Phased build plan

What this brief **does not** cover:
- Tech stack selection — decided separately
- Hosting, analytics, CRM integration beyond the email-capture contract
- Copywriting — all production copy is locked in `Buika_Web_Copy_v2.md`
- Legal pages (Privacy, Terms) — to be drafted by client counsel

If any implementation decision isn't covered here, the implementer should **default to the principle that produces the most restraint and the most distance from sourcing-agent visual vocabulary** (see §4).

---

## 1. Strategic context in one paragraph

Buika Elements is the external buying team for European B2B workwear and sportswear brands that want to produce in Asia without building an in-house team. It is not a sourcing agent. It is not a trading company. It is not an operational intermediary. It is a production partner built on 16 years of manufacturer-side experience, based in Da Nang, Vietnam, with a consolidated network of 3–5 factories across China, Vietnam, and Bangladesh. The client works directly with the factory. Buika provides the selection judgment before, and the strategic layer after. The website must communicate this positioning at every level — in hierarchy, in imagery, in motion, in the shape of every component. The current site positions Buika as a sourcing agent sitting between brand and factory. Replacing that framing is the first job of the rebuild.

---

## 2. What the design must communicate

Three signal loads, carried simultaneously. Every component should be evaluated against at least one of these.

**Authority.** 16 years on the ground. $200M+ managed. 50M+ garments. The alternative to hiring a Head of Asia Sourcing at €80K–120K. This is an institutional comparison. The site must feel like that decision is reasonable.

**Voice.** Opinionated, direct, specific. *"Most sourcing conversations start with a quote. Ours start with questions."* The design must make room for this register rather than flatten it into generic B2B.

**Groundedness.** Da Nang, factory-side experience, knowing what a FOB price hides. Not a European office managing emails. The site must feel inhabited — specific to a real person operating in a real place.

---

## 3. What the design must never communicate

The positioning document lists four verbal patterns Buika never says. Each has a visual analogue. The design must never render any of them.

| Verbal pattern banned in copy | Visual pattern banned in design |
|---|---|
| *"Sourcing agent"* | Service tile catalog, product-menu layouts, trust-badge rows |
| *"We connect you with factories"* | World map with pins or connecting lines, factory logo grid, "our network" tile gallery |
| *"We manage production for you"* | Factory photography as primary visual, process diagrams with Buika as the middle node |
| *"We are the bridge"* | Handshake iconography, bridge imagery, puzzle pieces, connector graphics, any arrow showing client → Buika → factory |

**Additional banned visual vocabulary:**

- Icons of factories, shipping boxes, globes, cargo ships, gears, handshakes
- Stock photography of any kind
- AI-generated imagery (including the "human faces collage" currently on the site)
- "Get a quote" / "Find factories" / "Source now" transactional CTAs
- "+12 countries" or similar global-breadth claims
- Sector tiles with product imagery (outdoor wear / workwear / safety shoes as labeled photo tiles)
- Generic trust badges arrayed in rows
- Client logo walls (Buika doesn't publish client lists)

---

## 4. The anti-pattern test

Apply to every section before accepting it:

> **"Could this section, dropped unchanged onto a sourcing agent's website, look native there?"**

If yes, the section is wrong, regardless of how clean the typography is. Institutional minimalism does not save a world-map-with-pins.

Second test, for edge cases:

> **"Does this section visually imply that Buika sits between the client and the factory, or that Buika is the operational bottleneck?"**

If yes, redesign.

---

## 5. Visual direction

**Institutional foundation. Editorial execution. Documentary accent — scoped narrowly.**

### 5.1 The three layers

**Institutional foundation.** Swiss grid, precise proportions, confident restraint. Carries the authority signal. Reference: Linear's marketing site, private credit / institutional asset management firms, Stripe Press at its most reduced.

**Editorial execution.** A serif for display moments (the positioning line, service titles, pull-quotes). A clean neutral sans for body and UI. The serif is not a literary flourish — it is the signal that the business has things worth saying and is not hiding behind SaaS neutrality.

**Documentary accent.** Scoped to three subjects only: **Simon** (as advisor, in working contexts), **materials** (fabric and textile close-ups), and **place** (Da Nang, on-the-ground environments). Explicitly not: factory exteriors, rows of sewing machines, shipping containers, mass production floors. These images carry the "not-a-factory" constraint and must never read as "this is what we produce."

### 5.2 Reference vocabulary for the implementer

- **Stripe Press** — for serif/sans pairing, proportions, editorial gravity
- **Linear (marketing pages, not the product)** — for restraint, confidence, single-accent color use
- **Vollebak / Filson at their most restrained** — for textural, material-forward moments (not general styling)
- **Koto Studio / Rauch.cc** — for institutional grid and content density
- **What to ignore from these references:** product features, sales-led language, any animation more elaborate than fade-in

### 5.3 The atmosphere in one line

*Stripe Press proportions. Linear restraint. Simon's specificity where it can be shown.*

---

## 6. Typography system

### 6.1 Font pairing

**Display / serif — for headlines, section openers, pull-quotes, positioning statements.**
Candidates in order of preference:
1. **GT Sectra** (Grilli Type) — the closest match to the required register; paid license
2. **Canela** (Commercial Type) — slightly more literary; paid license
3. **Reckless** (Displaay) — strong display performance; paid license
4. **EB Garamond** (Google Fonts) — free fallback if licensing budget is constrained; acceptable but less distinctive

**Body / sans — for running text, UI, navigation, buttons, data.**
Candidates in order of preference:
1. **Söhne** (Klim Type Foundry) — the first-choice match; paid license
2. **Inter** (Google Fonts) — free; excellent performance; distinctive enough
3. **GT America** (Grilli Type) — alternative; paid license

**Recommendation:** If budget allows, **GT Sectra + Söhne**. If budget is constrained, **EB Garamond + Inter** performs acceptably and is free.

### 6.2 Type scale (desktop baseline; adjust proportionally for mobile — see §16)

| Role | Font | Size | Line height | Weight | Tracking |
|---|---|---|---|---|---|
| Display hero (H1) | Serif | 72–96px | 1.05 | 400 (Regular) | -0.02em |
| Section H2 | Serif | 48–56px | 1.1 | 400 | -0.01em |
| Sub-section H3 | Serif | 32–36px | 1.15 | 400 | -0.005em |
| Eyebrow / overline | Sans | 12px | 1.4 | 500 (Medium) | 0.12em uppercase |
| Body large (intro paragraphs) | Sans | 19–20px | 1.55 | 400 | 0 |
| Body base | Sans | 16–17px | 1.6 | 400 | 0 |
| Body small (captions, footer) | Sans | 14px | 1.5 | 400 | 0 |
| Button / UI | Sans | 15–16px | 1 | 500 | 0 |
| Data display (stats) | Serif | 96–128px | 1 | 400 | -0.03em |
| Micro (credibility bar items) | Sans | 13–14px | 1.4 | 500 | 0.02em |

### 6.3 Typographic rules

- **No all-caps body copy.** Eyebrow labels only.
- **No italicized decorative headlines.** Italic reserved for genuine emphasis in prose or for book/publication titles.
- **No letter-spacing theater.** Tracking adjustments are either tightening (negative values on large display type) or the single eyebrow convention. Nothing in between.
- **Line length for body prose: 60–75 characters.** Enforce via max-width on the text container, not by shortening paragraphs.
- **Widows and orphans.** Use CSS `text-wrap: pretty` or equivalent on all body text, and `text-wrap: balance` on H1/H2.
- **Numbers are serif.** The four stats on the About page, the credibility bar numerics (16+ years, etc.), and any in-body statistics all set in the serif display face at the appropriate size. Numerics do not get the sans treatment — the serif is part of how authority reads.

### 6.4 Bilingual considerations

- Spanish text tends to run **15–25% longer** than English. All text containers must accommodate this without collapsing layout. Test with the longest Spanish strings from `Buika_Web_Copy_v2.md` before approving any layout.
- Both fonts must support full diacritic coverage (ñ, á, é, í, ó, ú, ü, ¿, ¡, «»). All candidates above do.
- The hero headline in Spanish — *"Tu equipo de compras en Asia. Sin conflicto de intereses."* — is longer than the English. The layout must hold without requiring a smaller point size. Test first.

---

## 7. Color system

### 7.1 Palette

Monochromatic base plus one accent. No gradients. No secondary accents.

| Token | Role | Value (sRGB) | Notes |
|---|---|---|---|
| `--ink` | Primary text, base dark | `#0A0A0B` | Near-black, slight warmth. Not pure #000. |
| `--ink-muted` | Secondary text, metadata | `#4A4A4E` | Softened ink for captions, eyebrows, footer text. |
| `--paper` | Primary background | `#F7F5F0` | Warm off-white. Not `#FFF`. Paper register, not screen register. |
| `--paper-pure` | Deep-section alternative bg | `#FFFFFF` | Reserved for card interiors or specific contrast moments. |
| `--stone` | Neutral divider, subtle backgrounds | `#E4E0D8` | Warm stone; used for section delineation. |
| `--slate` | Deep section background | `#1C1F26` | For hero-ground treatments, dark CTAs, footer. Never generic navy. |
| `--signal` | Accent — CTAs, links on paper, active state | `#1E3A8A` or `#16235C` | **Ink blue.** Serious, not SaaS blue. Implementer to A/B two candidates in-context. |

**Banned colors:** green (sustainability cliché in the CSRD context), orange (startup energy), red (aggression), pastels, any gradient.

### 7.2 Usage rules

- `--paper` is the default page background. Not white.
- `--ink` on `--paper` is the default text pair. Verify WCAG AA for body (ratio ≥ 4.5:1); this pair clears.
- `--signal` is used for: link underlines in prose, primary CTA button fill, active nav state, progress indicators. It should appear **less often than the eye expects**, which is part of the discipline.
- `--slate` is the hero ground, the footer, and the one-per-page "dark band" section (see Home page §13.1).
- **Never** use accent color for headings, section dividers, decorative elements, or to signal categories.

### 7.3 Dark sections (on `--slate`)

- Text switches to `--paper` or `--paper-pure`.
- Links use `--paper` with 1px underline at 60% opacity; underline opacity lifts to 100% on hover.
- CTA buttons on dark sections: outline variant (1px `--paper` border, `--paper` text) or solid `--signal` fill with `--paper` text.

---

## 8. Grid and spacing

### 8.1 Grid

- **Desktop container:** 1440px reference, 1200px content max-width, 12-column internal grid, 24px gutter.
- **Tablet:** 8-column grid, 20px gutter, 48px side margin.
- **Mobile:** 4-column grid, 16px gutter, 24px side margin.

### 8.2 Spacing scale (8px base unit)

Use only these values. No arbitrary spacing.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 240`

### 8.3 Vertical rhythm between page sections

- **Major section break:** 160px desktop / 96px mobile
- **Sub-section break:** 96px desktop / 64px mobile
- **Within-section paragraph rhythm:** 24–32px

### 8.4 Containment rules

- Text-heavy sections (body prose) max-width **680px**.
- Full-page-width sections (hero, contrast block, stats) extend to container max.
- **No section should extend edge-to-edge of the viewport on desktop.** There is always side margin.

---

## 9. Imagery and art direction

### 9.1 v1 build: type-led, imagery-sparing

The initial launch ships without a photography library. Every page must hold **without imagery**, via typography, grid, and proportion. Imagery is additive, not structural.

### 9.2 The single Phase-1 commission: Simon's portrait

Required for the About page. Specification for the photographer:

- **Context:** environmental, not studio. Working context — at a factory, in Da Nang, in a workshop, at a desk with fabric samples or technical documents. Avoid generic office settings.
- **Light:** natural, directional. Not flat. Not heavily retouched.
- **Register:** editorial, not corporate. Think Stripe Press contributor photo, not LinkedIn headshot.
- **Framing:** medium shot preferred (waist up), candid register — Simon looking into camera is acceptable but not required; Simon engaged in an activity is stronger.
- **Format:** one 4:5 vertical (primary use) and one 3:2 horizontal (secondary use).
- **What to avoid:** posed arms-crossed executive poses; white backgrounds; heavily color-graded looks; smiling-at-camera corporate register.

This portrait can be commissioned in a half-day in Da Nang by a competent editorial photographer.

### 9.3 Art-direction guide for future photography (Phase 2)

The three subjects the design system supports:

**Simon — as advisor.** Environmental portraits and working contexts. On-site at factories *examining*, *considering*, *deliberating* — not *operating machinery* or *managing people*. These images carry the "judgment" signal.

**Materials.** Fabric close-ups. Trim and finish details. Technical textiles (FR, high-vis, softshell). Shot with shallow depth of field, natural light, macro register. These images carry the "product expertise" signal.

**Place.** Da Nang, Vietnam, regional context. Streetscapes, travel, the environment of operation. These images carry the "on the ground" signal.

**Explicitly outside the system:**

- Factory exteriors, factory signage
- Rows of sewing machines, mass production floors, assembly lines
- Shipping containers, logistics imagery, trucks, ports
- Group shots of factory workers
- Finished garments styled on models
- Aerial / map / infrastructure imagery

### 9.4 Image behavior

- Always published at 2x resolution (Retina) with modern formats (AVIF → WebP → JPEG fallback).
- No borders, no drop shadows, no rounded corners above 4px.
- Subtle grain or film texture acceptable on dark-section imagery; do not fake it on light sections.
- Captions: set in sans small (14px), `--ink-muted`, below image, left-aligned, max 2 lines.

---

## 10. Motion and interaction

### 10.1 Motion register

**Static-first with restrained scroll-reveal.** Content is present on initial load (no aggressive entry animations on hero). Below-the-fold sections fade in with a 12–16px vertical offset over 300–400ms, one section at a time as they enter the viewport.

**Banned motion patterns:**

- Parallax scrolling
- Kinetic typography (letters animating individually)
- Cursor-trailing effects
- Morphing / shape-shifting SVGs
- Looping background video
- Anything involving "marquees" or scrolling text banners

### 10.2 Hover and focus states

- **Text links in prose:** 1px underline, `--signal` color. On hover, underline thickness grows to 2px. No color change.
- **Nav items:** active state indicated by 1px underline offset 4px below baseline. On hover, underline appears with 200ms fade.
- **Primary CTA buttons:** solid `--ink` fill, `--paper` text. On hover, background shifts to `--signal` over 200ms. No scale transform, no shadow.
- **Secondary CTA buttons:** 1px `--ink` border, `--ink` text, transparent fill. On hover, fill becomes `--ink`, text becomes `--paper`. 200ms ease.
- **Focus states:** 2px `--signal` outline with 2px offset, always visible for keyboard users. Never `outline: none`.

### 10.3 Page transitions

- Standard browser navigation is acceptable (no SPA transition requirement).
- If the implementer builds with a framework supporting transitions, a simple 200ms cross-fade on main content is acceptable. Nothing more elaborate.

### 10.4 Language switch

- Instant. No animation. The page re-renders in the new language.

---

## 11. Information architecture

### 11.1 Site map

```
/                                   Home
/services                           Services index
/services/factory-selection         Service 1 detail
/services/embedded-production-partner   Service 2 detail
/services/eu-compliance-advisory    Service 3 detail
/about                              About
/resources                          Resources index (filterable)
/resources/[post-slug]              Resources article template
/resources/whitepapers/[slug]       Resources whitepaper (gated)
/legal/privacy                      Privacy policy
/legal/terms                        Terms

Spanish mirror at /es/* with the same tree:
/es/servicios/seleccion-de-fabrica
/es/servicios/partner-de-produccion
/es/servicios/advisory-compliance
/es/sobre-nosotros
/es/recursos
```

### 11.2 Top navigation

Four items. No dropdowns. No mega-menus.

`Home · Services · About · Resources`

Language switch top-right: `EN / ES`, active language emphasized with weight 500 and `--ink`, inactive at 400 and `--ink-muted`.

### 11.3 No dedicated Contact page

Contact is accessed via:
- Footer (form or direct email + scheduling link)
- Page-level CTAs that route to an anchored contact section or open a form modal
- The phrase *"Start the conversation"* / *"Book a call"* / *"Get in touch"* from `Buika_Web_Copy_v2.md`

Implementer chooses between (a) a page-anchored form at `#contact` on Home/About, or (b) a form modal opened by CTA buttons. Either is acceptable; the decision depends on stack. The CTA never routes to a standalone `/contact` page.

### 11.4 Footer structure

Three-column on desktop, stacked on mobile.

- **Left:** Buika Elements wordmark, one-line positioning statement, copyright.
- **Center:** secondary nav — Home, Services (expanded to 3 sub-pages on hover/tap), About, Resources, Privacy, Terms.
- **Right:** contact block — `simon@buikaelements.com`, Da Nang address, LinkedIn link, "Book a 30-min call →" link.

---

## 12. Component library

All components must be built as reusable units. Specified below with function, states, and content requirements. Not visual mockups — the implementer renders them within the visual system above.

### 12.1 Header / navigation

- Fixed-top, `--paper` background, 1px bottom border `--stone` that appears after 80px of scroll.
- Left: wordmark (text-based, not the current image logo — see §18).
- Center: four nav items.
- Right: language switch.
- Mobile: wordmark left, hamburger right; full-screen overlay menu on open, nav items set in serif display 32px, stacked vertically, 24px vertical rhythm.

### 12.2 Footer

As specified in §11.4.

### 12.3 CTA block (primary and secondary variants)

- **Primary:** solid `--ink` button, serif or sans label, 15–16px, 48px height, 24px horizontal padding. Right-arrow glyph `→` follows label with 8px gap.
- **Secondary:** outline variant, 1px border.
- **Inline text CTA:** link with `--signal` color and right-arrow glyph.

### 12.4 Hero (typographic — v1)

- Full viewport height on desktop (min 640px), not forced full-height on mobile (auto height).
- Background: `--slate` (dark).
- Content: eyebrow label (small sans, `--paper` at 60%), positioning headline (serif display, `--paper`, 72–96px), subheadline (sans body large, `--paper` at 80%), single primary CTA.
- Composition: left-aligned, content starts at column 2 of the 12-column grid, ends at column 9. Not centered.
- **Subtle Phase-2 upgrade:** the same layout can receive a full-bleed fabric close-up or Simon-at-work image as background with a 60% `--slate` overlay, once photography is commissioned. The typographic treatment stays identical.

### 12.5 Credibility bar

- One horizontal line, placed immediately below the hero.
- `--paper` background (light), `--ink-muted` text, sans 13–14px, tracking +0.02em.
- Four items separated by center-dot bullets: `16+ years on the ground in Asia  ·  China, Vietnam, Bangladesh, Myanmar  ·  European workwear & sportswear  ·  EN ISO · CSRD · CSDDD`
- Mobile: wraps to 2 lines. Never stack to 4 rows.

### 12.6 Two-column contrast block

- Two columns of equal width, each with a column header (serif 24–28px) and a short paragraph (sans body base).
- Left column: "Direct factory" — `--paper` background, `--ink-muted` text, feels lighter.
- Right column: "Buika Elements" — `--paper-pure` background (or subtle `--stone` separator on left edge), `--ink` text, feels weighted. Optional 2px left border in `--signal`.
- No icons. No arrows between columns. The typographic weight carries the contrast.
- Mobile: stacks vertically, left column first, right column second. The weighting still differentiates.

### 12.7 Three-step process

- Three numbered stages, numbered `01 · 02 · 03`. Numbers in serif display, 48–56px.
- Each step: number, subheadline (serif 24–28px), body paragraph (sans body large, ~60 words).
- Desktop: three columns, equal width, 32px gutter. Mobile: stacked, generous vertical rhythm between steps.
- **No icons.** **No connecting arrows between steps.** **No visual flow indicators.** The sequence reads numerically and nothing more. Any arrow implies Buika as flow-owner — banned per §3.

### 12.8 Stats block

- Horizontal row on desktop, 4 cells.
- Each cell: **serif display 96–128px number**, sans small eyebrow label below.
- Thin 1px top divider in `--stone`, 24px above numbers.
- Mobile: 2x2 grid.
- Numbers: `16+` · `$200M+` · `50M+` · `4`
- Labels: `Years on the ground in Asia` · `Managed in production volume` · `Garments exported` · `Countries of active production`

### 12.9 Service section / service card

Used on both the Services index and individual service pages.

- Each service rendered as a **generous prose section**, not a card. Hierarchy:
  1. Eyebrow label (the "For brands entering Asia…" framing line)
  2. H2 service title (serif)
  3. Intro paragraph (sans body large, ~60 words)
  4. Bulleted sub-services (4 items, sans body base)
  5. Closing "you finish this engagement knowing…" outcome line (sans body large, italicized or pulled visually)
  6. Service-specific CTA

- On the Services index page: the prose is condensed (intro paragraph only, no bullet list), and a "Read more →" link routes to the dedicated sub-page.
- On the sub-page: full depth as specified in the v2 copy.
- **No cards. No borders. No icons.** The services are separated by vertical rhythm (160px between services) and the eyebrow/heading system, not by visual containers.

### 12.10 Bio section (About page — Simon)

- Two-column split: portrait left (4:5 ratio, 480px wide desktop), prose right.
- Mobile: portrait full-width at top, prose below.
- Prose: name + title eyebrow, then three paragraphs of body large. Generous vertical rhythm (32px between paragraphs).
- Location line at bottom: *"Da Nang, Vietnam. Available in English and Spanish."*

### 12.11 Pull-quote / statement block

Used for key positioning lines and value statements. Examples in source copy:

- *"Transparency is not a risk — it's what makes the relationship work."*
- *"Relationships, not volume."*

- Serif display, 32–40px, `--ink`, centered or left-aligned at column-2-to-column-9 of the grid.
- Optional 1px top rule in `--signal`, 24px above quote, 48px wide, left-aligned.
- No attribution. The quote sits alone.

### 12.12 Resources article card

Used on Resources index.

- No thumbnail image at v1 (type-led). Phase 2 can add typographic/abstract covers.
- Content: eyebrow (category — "Essay", "Whitepaper", "Field note"), serif title (28–32px), sans excerpt (2–3 lines, body base), sans metadata (date · read time · language available).
- Entire card clickable. Hover: title underline appears.
- Stacked vertically on index; 96px vertical rhythm between cards. Desktop may allow 2-column layout if list grows beyond 12 items; default to single column.

### 12.13 Resources whitepaper card

- Visually distinguished from article cards by: **eyebrow label "Whitepaper"** in `--signal`, a small ↓ download glyph next to the title, and a clear "Gated" indicator (e.g. *"Download requires email"* in `--ink-muted` below excerpt).
- Click routes to the whitepaper landing page, not directly to PDF.

### 12.14 Whitepaper landing + gated download form

Dedicated page per whitepaper. Structure:

1. Eyebrow: "Whitepaper"
2. H1: title
3. Pull quote / TL;DR (serif display 32px)
4. 2–4 paragraphs of summary body prose (what's inside, who it's for)
5. Inline email-capture form:
   - Fields: email (required), first name (required), company (required), role (optional), country (optional dropdown)
   - Consent checkbox: "I agree to receive the whitepaper and occasional updates from Buika Elements. You can unsubscribe anytime."
   - Submit button: primary CTA, label "Send me the whitepaper →"
6. Post-submit state: success message and immediate download link; whitepaper PDF also sent to submitted email.
7. Below the form: "Related essays" section linking to 2–3 articles (same category).

Form spec in §15.3.

### 12.15 Contact form

Whether rendered on a Home/About anchor section or in a modal, fields:

- Name (required)
- Company (required)
- Email (required)
- What you're producing or trying to solve (required, textarea, placeholder mirrors the copy: *"Tell us what you're working on. We'll tell you which country, which type of factory, and what a realistic price looks like."*)
- Country of production (optional, text input)
- Consent checkbox (GDPR-compliant)
- Submit: "Start the conversation →"

### 12.16 Language switch

- `EN / ES` in top-right of header.
- Active language: `--ink`, weight 500. Inactive: `--ink-muted`, weight 400. Separator ` / ` in `--stone`.
- Click/tap re-routes to the equivalent page in the other language (maintains current URL path).
- If equivalent page doesn't exist (e.g. a blog post only in EN), switch routes to the language-specific Resources index with a message.

### 12.17 Eyebrow label

- Sans 12px, weight 500, tracking +0.12em, uppercase, `--ink-muted` on `--paper`, `--paper` at 70% on `--slate`.
- Used above every H1 and H2. Indicates the register of the section ("Service", "Principle", "Chapter", "Framework", etc.).

### 12.18 Framework mechanism block (for Country-Product Matching Framework)

This is named IP. It must not be rendered as a flowchart, funnel, or diagram with Buika at the center. Render it as:

- Eyebrow: "Framework"
- H3: "Country-Product Matching Framework"
- Short intro paragraph (sans body large) explaining the role
- A clean table of criteria (left column) and how they weight country selection (right column). Source: the table in `Buika_Operational_Model_v2.md` §Phase 02.
- Typography carries the authority — the framework reads as a named mechanism, not a visual metaphor.

---

## 13. Page specifications

### 13.1 Home

Sections, in order, separated by 160px vertical rhythm (96px mobile):

1. **Header** (fixed)
2. **Hero** — typographic, `--slate` ground. Eyebrow: "Production Partner · Asia". Headline: *"Your buying team in Asia. No conflict of interest."* Subheadline: from v2 copy. Single CTA: *"Let's talk →"*
3. **Credibility bar** — one horizontal line, `--paper` ground.
4. **Positioning block** — "What Buika Elements is" — serif H2, then body prose per v2 copy. Left-aligned, column 2–9 of grid. No imagery.
5. **Two-column contrast block** — "Direct factory" vs "Buika Elements" per v2 copy and §12.6.
6. **How It Works (3 steps)** — per v2 copy and §12.7. `--paper` ground.
7. **Why Buika Elements (4 differentiator cards)** — 2×2 grid on desktop, stacked on mobile. Each card: eyebrow, H3, short paragraph. `--paper-pure` cards on `--stone` section background, or all on `--paper` with 1px dividers between. No icons.
8. **Statement block** — pull quote: *"Transparency is not a risk — it's what makes the relationship work."*
9. **Bottom CTA section** — `--slate` ground. Large serif headline from v2 copy. Single primary CTA.
10. **Footer**

### 13.2 Services index (`/services`)

1. Header
2. Page hero — eyebrow "Services", H1: *"Three ways Buika Elements works with you"*, subhead per v2 copy. No imagery. `--paper` ground.
3. Three service sections (§12.9, condensed variant). Each with the situation eyebrow, title, intro paragraph, and "Read more →" link.
4. Sectors section — *"Who we work with"*, three sectors listed as **typography** (serif H3 per sector, short description), NOT as image tiles.
5. Bottom CTA — per v2 copy.
6. Footer

### 13.3 Service sub-page (one template, three variants)

Applies to `/services/factory-selection`, `/services/embedded-production-partner`, `/services/eu-compliance-advisory`.

1. Header
2. Breadcrumb: `Services / [Service name]`
3. Page hero — eyebrow: the situation line ("For brands entering Asia..."), H1: service title (serif display), subhead with the service description from v2 copy. No imagery.
4. Service detail section — full bulleted sub-services from v2 copy.
5. Closing outcome block — the "You finish this engagement knowing..." line, set as a pull-quote or statement block (§12.11).
6. **For Service 1 only:** Framework mechanism block (§12.18) introducing the Country-Product Matching Framework.
7. **For Service 3 only:** CSRD whitepaper promo — eyebrow "Related resource", title + 2-line excerpt, link to whitepaper landing page.
8. Related services — two remaining service titles with one-line descriptions, routing to their sub-pages.
9. Service-specific CTA block — the CTA copy varies by service (see §11.3).
10. Footer

### 13.4 About

1. Header
2. Page hero — eyebrow "About", H1: *"Built from the inside out."*, subhead per v2 copy. No imagery in hero — let the type carry it.
3. Simon bio section — §12.10 — portrait + prose split, per v2 copy.
4. Stats block — §12.8 — 4 big numbers.
5. "How we operate" — H2 + four principles from v2 copy. Rendered as **numbered list** (01 · 02 · 03 · 04) with each principle as a short paragraph. Not bullets. Not icons.
6. Statement block — pull quote from v2 copy: *"Relationships, not volume."*
7. Bottom CTA — 30-min call CTA per v2 copy.
8. Footer

### 13.5 Resources index (`/resources`)

1. Header
2. Page hero — eyebrow "Resources", H1: *"Essays and whitepapers on producing in Asia for European brands."* (implementer can lift from a v2 copy line or draft; confirm with client). Short subhead.
3. Filter bar — two filter chips: "All" (default), "Essays", "Whitepapers". Additional filters can be added later (language, topic). Filter interaction is client-side, instant, no page reload.
4. List of resources — chronologically reverse, newest first. Whitepaper cards (§12.13) and article cards (§12.12) share the list.
5. Pagination at 12 items per page.
6. Newsletter signup block near bottom — "Occasional field notes on producing in Asia. No spam." — simple email-capture form.
7. Footer

### 13.6 Resources article template

1. Header
2. Breadcrumb: `Resources / [Article category]`
3. Eyebrow: category (Essay, Field note, etc.)
4. H1: article title, serif display 56–72px.
5. Metadata line: date · read time · language(s) available · author (if applicable)
6. Lede paragraph — sans body large, 19–20px.
7. Article body — rich text rendering per CMS output. Must support: H2, H3, pull-quotes (§12.11), ordered/unordered lists, inline images (optional, captioned), code blocks (if technical), links with signal-color underlines.
8. Article prose max-width 680px, centered in column.
9. End-of-article CTA block — routes to contact or subscribes to newsletter.
10. Related articles — 2–3 articles from same category or tag.
11. Footer

### 13.7 Whitepaper landing page template

Per §12.14. Layout identical to articles but with gated download form replacing the article body.

---

## 14. Accessibility

- **WCAG 2.2 AA** as minimum bar.
- All text/background pairs ≥ 4.5:1 contrast (≥ 3:1 for large text and UI components).
- All interactive elements have visible focus states per §10.2.
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` used correctly.
- Heading hierarchy respected — one H1 per page, no skipping levels.
- All imagery has alt text. Decorative imagery (if any) has `alt=""`.
- Forms: every input labeled (visible label, not just placeholder). Error states specified below.
- Keyboard navigation: full site traversable with tab/shift-tab. Skip-to-content link at top of every page.
- Language attribute on `<html>` set correctly per language (`lang="en"` or `lang="es"`).
- No motion-based information conveyance. All scroll-reveal content also present without JS (graceful degradation).
- Respect `prefers-reduced-motion`: disable all scroll-reveal fades when set.

---

## 15. Functional requirements

### 15.1 Resources CMS

The Resources section must support **at minimum**:

- **Two content types:** `Article` and `Whitepaper`. Both have: title, slug, publish date, author (optional), excerpt, body content (rich text), category/tags, language (en/es), hero image (optional, Phase 2), SEO fields (meta title, meta description, OG image).
- **Whitepaper-specific fields:** PDF file upload, form-capture config, optional "chapter list" summary.
- **Multi-language support:** each article/whitepaper can have EN and/or ES versions linked. If only one exists, the language switch on that piece routes to the Resources index with a note.
- **Draft / published workflow.**
- **Admin access for Simon** — he must be able to publish an article without a developer.

### 15.2 Gated download flow

1. Visitor lands on whitepaper landing page.
2. Fills form (§12.14).
3. On submit:
   - Form validates client-side and server-side.
   - Email + metadata stored in database or piped to email-marketing tool (Mailchimp, ConvertKit, Resend with a stored contact list, or equivalent — implementer choice).
   - PDF link generated (either direct download or emailed).
   - Success state shown in-place, with immediate download link.
   - Confirmation email sent to submitter with: thank-you, download link, one-line on what Buika does, unsubscribe link.
4. GDPR compliance: explicit consent checkbox, privacy policy linked, data deletion on request.
5. Simon receives notification (email or CMS dashboard) of every download with name, email, company.

### 15.3 Form specifications (all forms)

- Client-side validation on blur and submit.
- Server-side validation always — never trust client.
- Error states: field border `--signal` → red variant; error message below field in sans small, red variant, with specific guidance ("Please enter a valid email address", not "Error").
- Success states: green confirmation banner replaces form, or inline success message.
- All forms rate-limited and spam-protected (hCaptcha, Turnstile, or honeypot — implementer choice).

### 15.4 Contact form destination

- All contact form submissions route to `simon@buikaelements.com`.
- Auto-reply to submitter acknowledging receipt within 24h.
- Optional: integration with Calendly / Cal.com for 30-min call booking, linked from contact CTAs ("Book a 30-min call →").

### 15.5 Newsletter capture

- Simple email-only form.
- Stores to same email tool as whitepaper capture.
- Double opt-in.
- Thank-you page after confirmation.

---

## 16. Responsive behavior

### 16.1 Breakpoints

- Mobile: 320–767px
- Tablet: 768–1023px
- Desktop: 1024–1439px
- Large desktop: 1440px+

### 16.2 Responsive rules

- **Hero:** full-height on desktop, auto-height (min 480px) on mobile. Display type scales down smoothly using `clamp()` — suggested: `clamp(48px, 10vw, 96px)` for H1.
- **Grid:** 12-col → 8-col → 4-col per breakpoint. Spacing scales proportionally (large section breaks go from 160px → 120px → 96px).
- **Nav:** horizontal desktop → hamburger overlay mobile (§12.1).
- **Two-column sections:** stack to single column on mobile, with visual hierarchy preserved through typography weighting.
- **Stats block:** 4-across desktop → 2×2 mobile.
- **Resources filter chips:** horizontal scroll on mobile if they overflow.

### 16.3 Mobile-specific

- Primary CTAs full-width in bottom-sheet sections (hero, bottom-CTA sections).
- Touch targets minimum 44×44px.
- No hover-dependent interactions — all content accessible without hover.

---

## 17. Bilingual implementation

### 17.1 Structure

- EN at root: `buikaelements.com/...`
- ES at `/es/` prefix: `buikaelements.com/es/...`
- URL slugs translated per language: `/services/factory-selection` ↔ `/es/servicios/seleccion-de-fabrica`.
- Canonical URLs and `hreflang` tags on every page pointing to the equivalent in the other language.

### 17.2 Parity rule

- **Primary pages launch with full parity:** Home, Services index + 3 sub-pages, About, Resources index, CSRD whitepaper.
- **Blog articles:** can launch in one language; language switch on article routes to the Resources index in the target language with a small notice.

### 17.3 Language detection

- No automatic redirect based on browser language. Respect the user's explicit URL choice.
- Remember selected language in a cookie for subsequent visits (do not auto-switch on first visit).

---

## 18. Brand elements

### 18.1 Wordmark

The current site uses an image-based logo that appears four times in the header due to a template issue. The rebuild should use a **text-based wordmark**:

- `BUIKA ELEMENTS` set in the display serif, weight 400, tracking +0.08em, in `--ink` on `--paper` and `--paper` on `--slate`.
- Size: 20px in nav, 32px in footer.
- No separate logo mark. No monogram. The wordmark alone.
- If a simple mark is desired later, a single geometric element (dot, em-dash, or minimal linework) may be added to the left of the wordmark — but **not in v1**.

### 18.2 Favicon

Square crop of a single serif capital `B` in `--ink` on `--paper`. Sized versions at 16px, 32px, 180px (Apple touch), 192px, 512px.

---

## 19. SEO requirements

- **Meta titles and descriptions per page.** Implementer writes drafts based on v2 copy headlines and subheadlines; client reviews.
- **Structured data:** `Organization` schema on Home, `Person` schema on About (Simon), `Article` schema on every article, `FAQPage` schema if FAQ sections are added later.
- **Open Graph images** per page — typographic covers generated consistently (Phase 2 can use an automated OG image system if the implementer's stack supports it).
- **Sitemap.xml** auto-generated, separate for EN and ES or unified with `<xhtml:link>` entries.
- **Robots.txt** permissive for all public content; block gated whitepaper PDFs from direct crawl.
- **Canonical tags** on every page.
- **Fast Core Web Vitals** — LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-range mobile.

---

## 20. Phase plan

### Phase 1 — v1 launch (the goal of this brief)

- All 8 pages specified in §11.1 built to full spec
- CSRD whitepaper integrated with gated download flow
- Simon portrait commissioned and integrated on About
- Full EN + ES parity on primary pages
- Resources CMS operational with admin access for Simon
- Newsletter capture functional
- All motion, accessibility, and responsive specifications met

### Phase 2 — Within 3 months of launch

- Additional whitepapers published (Simon's content pipeline)
- 6–12 blog articles published (EN first, ES to follow)
- Photography library commissioned per §9.3 art direction — Simon in working contexts, materials close-ups, Da Nang/place imagery
- Hero upgraded to include optional photographic background variant per §12.4
- OG image system for articles

### Phase 3 — When justified by traffic and strategy

- Case study section (if client confidentiality allows)
- Interactive tools (e.g. CSRD self-assessment, country-product matching intake wizard)
- Expanded Resources taxonomy (video, podcast episodes)

---

## 21. Content-to-component mapping

All copy is locked in `Buika_Web_Copy_v2.md` and takes precedence over any draft copy in this brief. Implementer maps v2 copy into components as follows:

| Page | v2 Copy section | Component |
|---|---|---|
| Home | Hero Headline, Subheadline, CTA | §12.4 Hero |
| Home | Credibility Bar | §12.5 Credibility bar |
| Home | Positioning Block | Prose section on `--paper` |
| Home | Two-Column Contrast Block | §12.6 |
| Home | How It Works (3 Steps) | §12.7 |
| Home | Why Buika Elements (4 cards) | 2×2 prose grid |
| Home | Bottom CTA | CTA section on `--slate` |
| Services index | Page Hero, Services 1–3 intros, Sectors, Bottom CTA | §13.2 |
| Services sub-pages | Service 1/2/3 full content | §13.3 |
| About | Page Hero, Simon Bio, Credentials, How We Operate, Bottom CTA | §13.4, §12.10, §12.8 |

The `Buika_Operational_Model_v2.md` document is **internal** and must not appear as content on the public site. The Country-Product Matching Framework is a named mechanism (§12.18) — the detail inside that document feeds the framework display but the operational model itself is not published.

---

## 22. Implementation prompt block

If this brief is being handed to an LLM-based implementation tool (Cursor, v0, Claude with code execution, etc.), the following prompt can be used as the handoff:

> You are implementing the Buika Elements website according to the attached design brief. Before you write any code or generate any layout:
>
> 1. Read the full brief end to end. It is a complete specification — do not invent requirements.
> 2. Pay particular attention to §3 (what the design must never communicate) and §4 (the anti-pattern test). Apply the anti-pattern test to every component before generating it.
> 3. Confirm the tech stack with the client before writing code. The brief is tech-agnostic; stack is decided separately.
> 4. All production copy lives in `Buika_Web_Copy_v2.md`. Do not rewrite or paraphrase it. Lift it verbatim.
> 5. The build is phased (§20). Phase 1 is type-led with a single commissioned portrait. Do not introduce stock photography, AI-generated imagery, or iconography to fill space.
> 6. When an ambiguous implementation decision arises, default to the option that produces the most restraint and the most distance from sourcing-agent visual vocabulary.
> 7. Deliver Phase 1 with: all 8 pages from §11.1, full EN/ES parity on primary pages, CSRD whitepaper gated flow, Simon portrait integrated, Resources CMS with admin access.
>
> Begin by presenting your proposed implementation plan (including tech stack recommendation, component scaffolding order, and integration points) back to the client for approval before writing production code.

---

## Appendix A — The anti-pattern test, quick reference

Before shipping any section, answer both:

1. Could this section, dropped unchanged onto a sourcing agent's website, look native there? → If yes, redesign.
2. Does this section visually imply that Buika sits between the client and the factory, or is the operational bottleneck? → If yes, redesign.

## Appendix B — Banned visual vocabulary (consolidated)

- World maps, pins, connection lines between geographies
- Bridge imagery, handshakes, puzzle pieces, connector graphics
- Process diagrams with Buika as a middle node
- Factory logo grids, "our network" tile galleries
- Factory exteriors, rows of sewing machines, shipping containers as primary imagery
- Service tiles laid out as a product-catalog menu
- Trust-badge rows (certifications, associations)
- Icons of factories, boxes, globes, handshakes, gears
- Stock photography of any kind
- AI-generated imagery
- "+12 countries" breadth claims
- Transactional CTAs ("Get a quote", "Find factories", "Source now")
- Gradients, pastels, SaaS-blue accent colors
- Parallax, kinetic typography, cursor-trailing effects, marquees

## Appendix C — Required visual vocabulary (consolidated)

- Text-led hero with typographic hierarchy
- Swiss grid, institutional proportions
- Serif display + clean sans body pairing
- Single ink-blue accent, used sparingly
- Named frameworks rendered as typography, not diagrams
- Simon's specificity (Velilla Group, 16 years, named countries) surfaced prominently
- Contrast block rendered as parallel typography, not diagrammed comparison
- Numbered sequences without arrows or flow indicators
- Serif numerics for all statistics
- Environmental Simon portrait on About
- Generous vertical rhythm and restraint

---

**End of brief. Version 1.0. For revision, contact the brief author.**
