# Buika Elements — Design System & Outreach Reference

> **Purpose:** Single reference for anyone designing customer-facing materials — emails, decks, LinkedIn, proposals, whitepapers — using the Buika Elements brand. Everything here is derived from the live codebase (`src/styles/`, `src/lib/copy.ts`) and the original brand identity at buikaelements.com.

---

## 1. Brand in one sentence

> *"Production partner in Asia for European B2B brands."*

**What that means in practice:**
- Not a sourcing agent. Not a directory. An external buying team.
- Loyalty sits entirely with the client — never the factory.
- 16+ years on the ground. Physical presence in Da Nang, Vietnam.
- Serves European workwear, sportswear, and technical outerwear brands.

---

## 2. Colour Palette

All values are CSS custom properties defined in `src/styles/tokens.css` and `shared/tokens.css`.

### Core palette

| Token | Hex | Usage |
|---|---|---|
| `--teal` | `#44BBA4` | Brand signature. Hero background, primary CTA fills, decorative accents. |
| `--teal-dark` | `#157060` | Teal text on light backgrounds. Passes WCAG AA (5.3:1 on `--paper`). |
| `--ink` | `#0A0A0B` | Primary body text, headings on light backgrounds. |
| `--ink-muted` | `#4A4A4E` | Secondary text, captions, labels. |
| `--ink-faint` | `#8A8A90` | Placeholder text, disabled states, metadata. |
| `--paper` | `#F3EFE6` | Warm off-white. Default page background. |
| `--paper-pure` | `#FBF9F3` | Slightly cooler white. Cards, modal backgrounds. |
| `--stone` | `#E2DDD1` | Borders, dividers, light surface accents. |
| `--stone-soft` | `#EDE8DC` | Subtle backgrounds, hover states on light sections. |
| `--slate` | `#14161C` | Dark section backgrounds (contrast panels, footers). |
| `--slate-soft` | `#1C1F26` | Slightly lighter dark — use for dark cards or gradients. |
| `--signal` | `#0F2A5C` | Deep navy. Authority & trust. Button hover, blockquote borders, active nav. |

### Colour rules for outreach

| Situation | Background | Text | CTA |
|---|---|---|---|
| **Email hero / header** | `#44BBA4` (teal) | `#0A0A0B` (ink) | `#0A0A0B` button → hover `#0F2A5C` |
| **Email body** | `#F3EFE6` (paper) | `#0A0A0B` (ink) | `#0A0A0B` button |
| **Dark panel / contrast section** | `#14161C` (slate) | `#F3EFE6` (paper) | `#F3EFE6` button → hover `#0F2A5C` |
| **Whitepaper / PDF body** | `#FBF9F3` (paper-pure) | `#0A0A0B` (ink) | `#157060` (teal-dark) links |
| **LinkedIn banner** | `#44BBA4` (teal) | `#0A0A0B` (ink) | — |

**Do not:**
- Use `#44BBA4` teal as a text colour on light backgrounds (fails contrast at 2.2:1).
- Use white text on `#44BBA4` teal (fails contrast at 2.2:1).
- Use more than one teal section per page or per email.
- Use the signal navy `#0F2A5C` as a background — it reads as too corporate.

---

## 3. Typography

### Typefaces

| Token | Font | Weights | Role |
|---|---|---|---|
| `--serif` | **Source Serif 4** (optical-size variable) | 400 (regular), 400 italic | Display headlines, pull quotes, document titles |
| `--sans` | **Inter** | 400, 500, 600 | Body text, UI labels, eyebrows, buttons |
| `--mono` | **JetBrains Mono** | 400, 500 | Data, stats, metadata labels, timestamps |

Google Fonts CDN URLs for email/deck use:
```
Source Serif 4: https://fonts.google.com/specimen/Source+Serif+4
Inter:          https://fonts.google.com/specimen/Inter
JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono
```

**Email fallback stack:**
- Display: `"Source Serif 4", Georgia, "Times New Roman", serif`
- Body: `"Inter", -apple-system, Arial, sans-serif`

### Type scale

| Class | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `.h1` | `clamp(48px, 7.5vw, 88px)` | 400 | −0.025em | Hero headline |
| `.h2` | `clamp(36px, 4.6vw, 56px)` | 400 | −0.015em | Section headers |
| `.h3` | `clamp(26px, 2.4vw, 34px)` | 400 | −0.008em | Card/feature heads |
| `.h4` | `clamp(22px, 1.8vw, 26px)` | 400 | −0.005em | Sub-section heads |
| `.lede` | `clamp(18px, 1.55vw, 21px)` | 400 | — | Introductory paragraph |
| `.body` | `17px` | 400 | — | Default body copy |
| `.eyebrow` | `12px` | 500 | +0.14em | Section labels (ALL CAPS) |
| `.small` | `14px` | 400 | — | Captions, footnotes |
| `.num-serif` | inherit | 400 | −0.035em | Statistics, large numbers |

### Typography rules

- **Headlines** always use Source Serif 4, weight 400. Never bold.
- **Eyebrows** always Inter, 12px, 500 weight, ALL CAPS, 0.14em letter-spacing.
- **Stats/numbers** use `.num-serif` class (Source Serif 4 with lnum + tnum features).
- **Do not justify** body text. Left-align on LTR.
- Use `text-wrap: balance` on headings to avoid orphaned words.

---

## 4. Spacing & Rhythm

The system uses an `8px` base step with three rhythm values for section spacing.

| Token | Value (desktop) | Value (mobile ≤900px) | Use |
|---|---|---|---|
| `--step` | `8px` | `8px` | Base unit — multiply for spacing |
| `--rhythm-major` | `160px` | `96px` | Major section padding (`.section`) |
| `--rhythm-sub` | `96px` | `64px` | Sub-section padding (`.section-sub`) |
| `--rhythm-para` | `28px` | `28px` | Paragraph spacing |
| `--gutter` | `24px` | `24px` | Grid column gap |

**Email/deck spacing guide:**
- Section top/bottom padding: 64–80px
- Paragraph spacing: 20–24px
- Button margin from copy: 32–40px
- Logo clearance from edge: 24px minimum

---

## 5. Logo

**File:** `public/images/logo.png`
**Format:** PNG, 1402 × 225px (aspect ratio ~6.2:1)
**Contents:** Full horizontal lockup — circle-B icon + "Buika Elements" wordmark + "GARMENT SOURCING SERVICES" sub-label.

### Usage

| Context | Treatment |
|---|---|
| **Web nav** | Circle-B icon only (clip to ~32px square), followed by "BUIKA ELEMENTS" in Source Serif 4 |
| **Email header** | Full horizontal lockup at ≤180px wide |
| **Deck title slide** | Full lockup, centred, white or dark background |
| **Favicon / avatar** | Circle-B icon only, cropped square |
| **Co-branding / proposals** | Full lockup, left-aligned, above or below partner mark |

### Colour backgrounds the logo works on

| Background | Logo version |
|---|---|
| `#44BBA4` teal | Black version (circle fills black) ✓ |
| `#F3EFE6` paper | Black version ✓ |
| `#14161C` slate | **White version needed** (invert in image editor) |
| White `#FFF` | Black version ✓ |

---

## 6. Photography Style

All source images are in `public/images/`. Use these as references for any commissioned or stock photography.

| File | Subject | Where to use |
|---|---|---|
| `hero-city-sunset.jpeg` | Shanghai at golden hour — aerial sweep of the Huangpu River | Hero sections, email headers, deck covers |
| `hero-shanghai-night.jpg` | The Bund at night — city lights on the river | Dark panel backgrounds, contrast sections |
| `simon-portrait.png` | Simon Caballero, founder | About page, proposals, author bylines |
| `outdoor-wear-collage.avif` | Outdoor technical garment collection | Services page, product context |
| `work-wear-collage.avif` | Workwear product grid | Services page, category references |
| `safety-shoes-collage.avif` | Safety footwear collection | Services page |
| `world-map.png` | Global coverage map with country markers | Coverage sections, decks |
| `earth-asia.png` | Asia globe icon | Feature icons, slide accents |
| `buika-info.png` | Infographic / process diagram | How-we-work sections |
| `service-sourcing.jpg` | Consultation scene | Sourcing service card |
| `service-supply-chain.jpg` | Supply chain / logistics | Supply chain service card |

### Photography direction
- **Preferred:** Aerial, documentary, industrial. Real factories, real cities, real product.
- **Avoid:** Stock-photo handshakes, generic "business people in suits", overly bright studio product shots.
- **Treatment:** Photos may be darkened slightly for text overlay. Never add teal colour overlays — let the photo breathe.
- **Ratio:** Hero images suit 16:9 or panoramic (3:1). Service thumbnails suit 1:1 or 4:3.

---

## 7. UI Components

### Buttons

| Class | Background | Text | Hover |
|---|---|---|---|
| `.btn-primary` | `--ink` (#0A0A0B) | `--paper` | Background → `--signal` |
| `.btn-primary-on-dark` | `--paper` | `--ink` | Background → `--signal`, text → `--paper` |
| `.btn-secondary` | transparent | `--ink` | Fill `--ink`, text `--paper` |
| `.btn-secondary-on-dark` | transparent | `--paper` | Fill `--paper`, text `--ink` |

All buttons: height 48px, horizontal padding 22px, font-size 15px, font-weight 500, border-radius 2px.

Arrow indicator `→` inside buttons animates `translateX(3px)` on hover.

**For email CTAs** (no CSS classes available):
```
Background: #0A0A0B  |  Text: #F3EFE6  |  Padding: 14px 24px
Border-radius: 2px   |  Font: Inter 15px 500
```

### Dividers / Rules

| Class | Description |
|---|---|
| `.hair-rule` | 1px `--stone` full-width |
| `.signal-rule` | 1px `--signal` navy, 48px wide — used as accent under eyebrows |
| `.ink-rule` | 1px `--ink` at 12% opacity |

### Eyebrow pattern

Used above every major section heading:

```
● EYEBROW TEXT
[heading below]
```

The `●` dot is coloured `--signal` (navy). The label is Inter 12px/500/ALL CAPS/0.14em tracking, coloured `--ink-muted`. On dark backgrounds use `rgba(243,239,230,0.65)`.

---

## 8. Voice & Tone

### Character
- **Precise.** We do not inflate. We name the specific problem, the specific country, the specific risk.
- **Direct.** No hedging. "We tell clients which factory we use and why."
- **Experienced but not arrogant.** Authority earned from 16 years inside factories — not from credentials on a wall.
- **No jargon for jargon's sake.** FOB, CSRD, CSDDD are used because clients use them — not to impress.

### Sentence style
- Short sentences preferred. One idea per sentence.
- Em dashes `—` for interruptions and clarifications, not parentheses.
- Lists when there are ≥3 parallel items. Never bulleted for narrative.
- Numbers below 10 are written out in prose ("three factories"), numerals in data context ("3–5 factories").

### Things we never say
- "Best-in-class", "end-to-end solutions", "synergies", "leverage"
- "We are passionate about…"
- "Seamless" (overused)
- "Partner" used as a verb

---

## 9. Key Messages (Production-Locked Copy)

These strings are production-locked. Do not paraphrase. Use verbatim in outreach.

### Positioning headline
> *"Not a sourcing agent. Your production partner in Asia."*

### Hero headline
> *"Your buying team in Asia. No conflict of interest."*

### Hero sub
> *"We select the right manufacturer for your product, manage the introduction, and stay as your strategic partner throughout the relationship. You work directly with the factory. We make sure it's the right one."*

### Core credibility bar (4 items)
1. 16+ years on the ground in Asia
2. China, Vietnam, Bangladesh, Myanmar
3. European workwear & sportswear
4. EN ISO · CSRD · CSDDD

### The contrast statement
| Direct factory | Buika Elements |
|---|---|
| Recommends itself. | Recommends the right factory for your product. |
| Fills its own lines. | Defends your brief. |
| Defends its own interests when problems arise. | Always on your side. |

### Statement (use as pull quote)
> *"Transparency is not a risk — it's what makes the relationship work."*

### Bottom CTA
> *"Ready to stop guessing which factory is right for your product? Tell us what you're working on. We'll tell you which country, which type of factory, and what a realistic price looks like — before you commit to anything."*

### About (founder voice)
> *"I founded Buika Elements because I saw a gap that nobody was filling honestly. Brands going direct to factories were getting capacity, not advice. Brands using agents were getting a middle layer with no real accountability. Neither was what a European brand actually needed."*
> — Simon Caballero, Founder

---

## 10. Outreach Templates

### Cold email (EN)

**Subject line options:**
- `Asia production for [Company] — a direct question`
- `[Company] + Asia supply chain — 3 things worth knowing`
- `Your Asia production: a quick read`

**Body structure:**
```
[Eyebrow: brief context — 1 sentence]

[Problem you've identified for this specific company]

[What Buika Elements does — 2 sentences max, from hero copy]

[One specific proof point — stat or outcome from services copy]

[Single CTA: "30 minutes is enough. No pitch deck."]

Simon Caballero
Buika Elements — Production partner in Asia
simon@buikaelements.com
Da Nang, Vietnam
```

**Example:**
> You're producing workwear in China and CSRD reporting is arriving faster than most brands expected.
>
> Buika Elements is the external buying team for European brands producing in Asia — 16 years of factory-side experience, present in Da Nang, loyalty to the client only.
>
> We've helped brands close the scope 3 Category 1 documentation gap before the first audit, not during it.
>
> 30 minutes is enough. No pitch deck.
>
> Simon Caballero
> Buika Elements — Production partner in Asia
> simon@buikaelements.com

---

### LinkedIn outreach (EN)

**Character limit:** 300 characters for connection request note.

```
Hi [Name] — I noticed [Company] produces [category] in [country].
Buika Elements is the external buying team for European brands in Asia.
Worth a 20-min call? No deck, just a direct conversation.
— Simon
```

**Follow-up message (after connection):**
```
[Name], thanks for connecting.

Quick context: Buika Elements works with European brands that
need a buying team in Asia without the conflict of interest
that comes with a direct factory or a sourcing agent.

Given [Company]'s work in [category], one conversation might
be worth it — especially with CSRD requirements moving fast.

Available for a 30-minute call this week or next?
```

---

### Proposal / deck structure

1. **Cover** — Logo + headline + client name + date. Teal or slate background.
2. **Situation** — 1 slide: what we understand about the client's challenge (specific, not generic).
3. **The gap** — 1 slide: why going direct and using an agent both fail the same way. Use the contrast table.
4. **What Buika Elements does** — 1–2 slides: positioning headline + 3 service descriptions.
5. **Proof** — 1 slide: stats (16+ years, $200M+ production volume, 50M+ garments, 4 countries).
6. **Process** — 1 slide: the 3-step workflow (understand → select & introduce → stay as strategic layer).
7. **Principles** — 1 slide: the 4 operating principles from `about.operate`.
8. **Proposed engagement** — 1 slide: specific recommendation for this client.
9. **Next step** — 1 slide: "30 minutes is enough. No pitch deck." + contact details.

**Deck colour usage:**
- Odd sections: `--paper` (#F3EFE6) background, `--ink` text
- Even sections or contrast panels: `--slate` (#14161C) background, `--paper` text
- Cover and hero slides: `--teal` (#44BBA4) background, `--ink` text
- Accent dots, rule lines: `--signal` (#0F2A5C) navy

---

## 11. Contact & Brand Details

| | |
|---|---|
| **Website** | buikaelements.com |
| **Email** | simon@buikaelements.com |
| **Location** | Da Nang, Vietnam |
| **Founded** | 2009 (Est. 2009 — 16 YRS) |
| **Languages** | English · Spanish |
| **LinkedIn** | linkedin.com/company/buikaelements |

---

## 12. File Index (public/images/)

```
logo.png                      Full horizontal wordmark lockup (1402×225px)
hero-city-sunset.jpeg         Shanghai aerial at golden hour — hero use
hero-shanghai-night.jpg       The Bund at night — dark panel use
simon-portrait.png            Founder portrait
outdoor-wear-collage.avif     Outdoor technical garments
work-wear-collage.avif        Workwear product grid
safety-shoes-collage.avif     Safety footwear
buika-info.png                Process/info graphic
world-map.png                 Global coverage map
earth-asia.png                Asia globe icon (300×300px)
service-sourcing.jpg          Sourcing service illustration
service-supply-chain.jpg      Supply chain illustration
```

Whitepapers (EN + ES PDFs) are in `public/content/whitepapers/{slug}/`.

---

*Last updated: May 2026. Derived from `src/styles/tokens.css`, `src/lib/copy.ts`, and `src/components/`. When tokens or copy change in the codebase, update this file to match.*
