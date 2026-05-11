# MDX Content System — Author Guide

> How to create and edit whitepapers, essays, and field notes using Git-based MDX files.

---

## What is this?

The MDX content system stores all editorial content (whitepapers, essays, field notes) as **plain text files in Git** instead of a database or CMS dashboard. This means:

- You write in Markdown — familiar, fast, and version-controlled.
- Every change is a Git commit — full history, easy rollbacks, peer review via pull requests.
- No CMS login required — edit in VS Code, commit, push, and the site rebuilds automatically.
- Content travels with the code — cloning the repo gives you everything.

---

## Directory structure

Each whitepaper lives in its own directory under `src/content/whitepapers/`:

```
src/content/whitepapers/
└── {slug}/                    ← URL-friendly identifier (e.g. "csrd-european-workwear-asia")
    ├── meta.json              ← Structured metadata (required)
    ├── en.mdx                 ← English body (required)
    └── es.mdx                 ← Spanish body (optional)
```

Assets (cover images, PDF downloads) live in the **public** directory, mirrored by slug:

```
public/content/whitepapers/
└── {slug}/
    ├── cover.jpg              ← Cover image (displayed on cards and detail page)
    ├── {slug}-en.pdf          ← English PDF download
    └── {slug}-es.pdf          ← Spanish PDF download (optional)
```

> **Important:** The slug in the directory name **must match** `slug.current` inside `meta.json`. If they differ, the build will fail with a clear error message.

---

## `meta.json` reference

`meta.json` is the single source of truth for a whitepaper's metadata. It is validated at build time — if a required field is missing or malformed, the build will fail and tell you exactly what is wrong.

### Required fields

| Field | Type | Description | Example |
|---|---|---|---|
| `_id` | string | Unique identifier. Any string, but keep it descriptive. | `"wp-csrd-workwear"` |
| `slug.current` | string | URL slug. Must match the directory name. | `"csrd-european-workwear-asia"` |
| `title.en` | string | English title. Used in page `<h1>`, cards, and Open Graph. | `"CSRD for European workwear brands..."` |
| `abstract.en` | string | English abstract. One-paragraph summary. Used in cards and meta descriptions. | `"A practical reading of CSRD scope 3..."` |
| `topic` | string | One of: `sourcing`, `compliance`, `workwear`, `quality`, `costing`, `country-brief`, `field-notes`. | `"compliance"` |
| `readingTime` | number | Estimated reading time in minutes. | `32` |
| `author._id` | string | Author identifier. | `"person-simon"` |
| `author.name` | string | Author display name. | `"Simon Buika"` |
| `access` | string | One of: `open`, `gated`, `private`. Controls download behaviour. | `"gated"` |
| `publishedAt` | string | ISO 8601 publish date. | `"2026-03-12T09:00:00.000Z"` |
| `seo.metaTitle.en` | string | English `<title>` tag and Open Graph title. | `"CSRD for European workwear brands in Asia"` |
| `seo.metaDescription.en` | string | English `<meta name="description">`. | `"Scope 3 Category 1 practical guidance..."` |
| `seo.noIndex` | boolean | If `true`, search engines are asked not to index this page. | `false` |

### Optional fields

| Field | Type | Description | Example |
|---|---|---|---|
| `title.es` | string | Spanish title. | `"CSRD para marcas europeas de workwear..."` |
| `subtitle.en` / `subtitle.es` | string | Subtitle shown under the title on the detail page. | `"A practical field guide for sustainability officers"` |
| `abstract.es` | string | Spanish abstract. | `"Lectura práctica de los requisitos de CSRD..."` |
| `pdf.en` / `pdf.es` | object | PDF download metadata. `url`, `size` (bytes), `originalFilename`. | See example below. |
| `coverImage` | object | Cover image metadata. `alt` (accessibility text) and `src` (path). | `{"alt": "Factory floor", "src": "/content/whitepapers/.../cover.jpg"}` |
| `tags` | string[] | Free-form tags for future filtering. | `["CSRD", "ESG", "supply chain"]` |
| `regions` | string[] | Geographic regions mentioned. | `["china", "vietnam", "bangladesh", "eu"]` |
| `regulations` | string[] | Regulations or standards referenced. | `["csrd", "csddd"]` |
| `pageCount` | number | Number of pages (for gated/private PDFs). Shown as "32-page PDF". | `32` |
| `author.title` | string | Author job title. | `"Founder"` |
| `updatedNote.date` | string | Last-updated date (ISO 8601). | `"2026-04-15T09:00:00.000Z"` |
| `updatedNote.en` / `updatedNote.es` | string | Update description shown on the detail page. | `"Updated with 2026 Q1 factory data."` |
| `seo.metaTitle.es` / `seo.metaDescription.es` | string | Spanish SEO metadata. | — |
| `seo.ogImage` | object | Custom Open Graph image. Overrides `coverImage` for social sharing. | `{"alt": "...", "src": "/content/whitepapers/.../og.jpg"}` |
| `featured` | boolean | If `true`, the whitepaper may receive prominent placement. | `true` |

### Complete example

```json
{
  "_id": "wp-csrd-workwear",
  "slug": { "current": "csrd-european-workwear-asia" },
  "title": {
    "en": "CSRD for European workwear brands producing in Asia: what factories can and cannot document today",
    "es": "CSRD para marcas europeas de workwear produciendo en Asia: qué pueden documentar las fábricas hoy"
  },
  "subtitle": {
    "en": "A practical field guide for sustainability officers and procurement leads",
    "es": "Una guía práctica de campo para responsables de sostenibilidad y compras"
  },
  "abstract": {
    "en": "A practical reading of CSRD scope 3 Category 1 requirements...",
    "es": "Lectura práctica de los requisitos de CSRD alcance 3 Categoría 1..."
  },
  "pdf": {
    "en": {
      "url": "/content/whitepapers/csrd-european-workwear-asia/csrd-european-workwear-asia-en.pdf",
      "size": 2400000,
      "originalFilename": "csrd-european-workwear-asia-en.pdf"
    },
    "es": {
      "url": "/content/whitepapers/csrd-european-workwear-asia/csrd-european-workwear-asia-es.pdf",
      "size": 2400000,
      "originalFilename": "csrd-european-workwear-asia-es.pdf"
    }
  },
  "coverImage": {
    "alt": "Factory floor in Ningbo with sustainability documentation on clipboards",
    "src": "/content/whitepapers/csrd-european-workwear-asia/cover.jpg"
  },
  "topic": "compliance",
  "tags": ["CSRD", "ESG", "supply chain", "workwear"],
  "regions": ["china", "vietnam", "bangladesh", "eu"],
  "regulations": ["csrd", "csddd"],
  "readingTime": 32,
  "pageCount": 32,
  "author": {
    "_id": "person-simon",
    "name": "Simon Buika",
    "title": "Founder"
  },
  "access": "gated",
  "publishedAt": "2026-03-12T09:00:00.000Z",
  "seo": {
    "metaTitle": {
      "en": "CSRD for European workwear brands in Asia",
      "es": "CSRD para marcas europeas de workwear en Asia"
    },
    "metaDescription": {
      "en": "Scope 3 Category 1 practical guidance for tier-1 and tier-2 Asian suppliers.",
      "es": "Guía práctica de alcance 3 Categoría 1 para proveedores asiáticos tier-1 y tier-2."
    },
    "noIndex": false
  },
  "featured": true
}
```

---

## How `topic` and `access` determine the category label

The Resources page automatically derives the category label from two fields:

| `topic` | `access` | English label | Spanish label |
|---|---|---|---|
| `field-notes` | any | Field note | Nota de campo |
| anything else | `gated` or `private` | Whitepaper | Whitepaper |
| anything else | `open` | Essay | Ensayo |

This is automatic — you do not set the label manually. Just pick the right `topic` and `access` values.

### Access levels explained

| Level | Behaviour |
|---|---|
| `open` | Content is fully visible. No gate. Format shows as "{readingTime} min read". |
| `gated` | Content is fully visible, but a download gate appears in the sidebar. User must submit an email to receive the PDF. Format shows as "{pageCount}-page PDF" (or falls back to `readingTime`). |
| `private` | Same gate behaviour as `gated`, but the content signals higher exclusivity. Format shows as "{pageCount}-page PDF". |

---

## Writing MDX content (`en.mdx` / `es.mdx`)

MDX is Markdown with JSX. For most whitepapers, you will write plain Markdown. JSX is available if you need custom layouts, embedded components, or optimised images.

### Supported Markdown

Everything standard Markdown supports:

```mdx
## Heading 2

### Heading 3

Regular paragraph text. **Bold**, *italic*, and `inline code` work.

- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item

> A blockquote. Used for pull quotes or highlighted statements.

---

A horizontal rule for section breaks.
```

### Images

For **optimised images** (recommended for cover photos, diagrams, charts):

```mdx
<Image
  src="/content/whitepapers/csrd-european-workwear-asia/factory-floor.jpg"
  width={1200}
  height={800}
  alt="Factory floor in Ningbo showing assembly lines"
/>
```

This uses Next.js `<Image>` with automatic optimisation, lazy loading, and responsive sizing.

For **simple inline images** where optimisation is not critical:

```mdx
![Alt text](/content/whitepapers/csrd-european-workwear-asia/diagram.png)
```

> **Tip:** Always use `<Image src width height alt />` for photos and diagrams. Plain `![alt](path)` skips optimisation and may cause layout shift.

### Links

```mdx
[Internal link](/en/resources)
[External link](https://example.com)
```

Internal links use Next.js client-side navigation. External links automatically open in a new tab with `rel="noopener noreferrer"`. Both receive the project's link styling (signal colour, subtle underline animation).

### Frontmatter

You **do not need** YAML frontmatter in `.mdx` files. `meta.json` is the single source of truth for titles, abstracts, dates, and SEO. If you add frontmatter, it is ignored.

---

## Locale handling

### File naming

- `en.mdx` — English body (always required).
- `es.mdx` — Spanish body (optional but strongly recommended for bilingual content).

### Fallback behaviour

If `es.mdx` is missing, the Spanish version of the page **falls back to the English body**. The title, abstract, and SEO metadata still show Spanish if `title.es`, `abstract.es`, and `seo.*.es` are present in `meta.json`.

This means you can publish a whitepaper with Spanish metadata but English body content while the Spanish translation is in progress. Visitors will see Spanish navigation, titles, and summaries, with the body in English.

### Spanish metadata without Spanish body

A common workflow:

1. Publish `meta.json` with both `title.en` / `title.es` and `abstract.en` / `abstract.es`.
2. Write and publish `en.mdx`.
3. Omit `es.mdx` for now.
4. The site shows Spanish cards and hero text, but renders the English body.
5. Later, add `es.mdx` — the Spanish body appears immediately on the next deploy.

---

## Asset management

### Cover image

- **Location:** `public/content/whitepapers/{slug}/cover.jpg`
- **Reference:** `meta.json` → `coverImage.src`
- **Format:** JPG or PNG. Recommend 1200×800px or larger.
- **Alt text:** Required for accessibility. Write in the language of the page (English alt for English pages).

### PDF downloads

- **Location:** `public/content/whitepapers/{slug}/{slug}-en.pdf` (and `-es.pdf`)
- **Reference:** `meta.json` → `pdf.en.url` and `pdf.es.url`
- **Size:** `pdf.en.size` and `pdf.es.size` in **bytes**. Used for display (e.g. "2.4 MB").

> **Note:** The PDF files are served as static assets. They are not processed or validated by the build. Make sure the files exist at the paths you reference, or the download links will 404.

### Additional images inside the body

Store them in the same `public/content/whitepapers/{slug}/` directory and reference them with absolute paths:

```mdx
<Image
  src="/content/whitepapers/csrd-european-workwear-asia/tier-2-diagram.png"
  width={800}
  height={600}
  alt="Diagram showing tier-1 and tier-2 supplier relationships"
/>
```

---

## Step-by-step: Adding a new whitepaper

1. **Choose a slug.** URL-friendly, kebab-case, descriptive. Example: `vietnam-textile-costing-2026`.

2. **Create the directory structure:**
   ```bash
   mkdir src/content/whitepapers/vietnam-textile-costing-2026
   mkdir public/content/whitepapers/vietnam-textile-costing-2026
   ```

3. **Write `meta.json`.** Copy an existing `meta.json` as a template. Update every field. Ensure `slug.current` matches the directory name.

4. **Write `en.mdx`.** Write the body content in Markdown/MDX.

5. **(Optional) Write `es.mdx`.** Spanish translation.

6. **Add assets:**
   - Copy cover image to `public/content/whitepapers/{slug}/cover.jpg`
   - Copy PDFs to `public/content/whitepapers/{slug}/{slug}-en.pdf` (and `-es.pdf`)

7. **Verify locally:**
   ```bash
   bun run build
   ```
   The build will validate `meta.json` and report any errors.

8. **Commit and push:**
   ```bash
   git add src/content/whitepapers/vietnam-textile-costing-2026
   git add public/content/whitepapers/vietnam-textile-costing-2026
   git commit -m "Add whitepaper: Vietnam textile costing 2026"
   git push
   ```

9. **Deploy.** If Vercel/Railway/Cloudflare is connected, the site rebuilds automatically. The new whitepaper appears at `/{locale}/resources/vietnam-textile-costing-2026`.

---

## Step-by-step: Editing an existing whitepaper

1. **Find the directory:** `src/content/whitepapers/{slug}/`

2. **Edit the relevant files:**
   - Fix a typo → edit `en.mdx` or `es.mdx`
   - Update metadata → edit `meta.json`
   - Replace cover image → overwrite `public/content/whitepapers/{slug}/cover.jpg`
   - Update PDF → overwrite the `.pdf` file and update `meta.json` → `pdf.*.size`

3. **Build locally to catch validation errors:**
   ```bash
   bun run build
   ```

4. **Commit and push.**

---

## Common patterns

### Reusing a paragraph as the abstract

The `abstract` in `meta.json` and the opening paragraph of `en.mdx` often say the same thing. That is fine — the abstract is used for cards and SEO; the body paragraph is what readers see first on the detail page. They can be identical or the body can expand on the abstract.

### Updating a whitepaper after publication

Add an `updatedNote` to `meta.json`:

```json
"updatedNote": {
  "date": "2026-04-15T09:00:00.000Z",
  "en": "Updated with 2026 Q1 factory data from Ningbo and Ho Chi Minh City.",
  "es": "Actualizado con datos de fábricas del Q1 2026 de Ningbo y Ciudad Ho Chi Minh."
}
```

This appears on the detail page below the hero metadata.

### Related articles are automatic

You do not configure related articles manually. The site automatically links up to 3 other whitepapers that share the same `topic`, sorted by newest first. If you want a whitepaper to appear as "related" on another page, ensure both share the same `topic` value.

### Hiding a whitepaper from search engines

Set `seo.noIndex` to `true`. The page remains live and linkable, but search engines are asked not to index it. Useful for drafts or time-sensitive content.

### Making a whitepaper "featured"

Set `featured: true`. The Resources index may use this flag to determine prominent placement (exact treatment depends on the frontend implementation).

---

## Troubleshooting

### Build fails with "Directory does not match slug.current"

The directory name and `meta.json` → `slug.current` must be identical. Example:
- Directory: `src/content/whitepapers/csrd-european-workwear-asia/`
- `meta.json`: `"slug": { "current": "csrd-european-workwear-asia" }`

If one has a typo, fix it and rebuild.

### Build fails with a Zod validation error

The error message tells you exactly which field is wrong. Common causes:
- Missing required field (e.g. forgot `seo.metaTitle.en`)
- Wrong `topic` value (must be one of the 7 allowed strings)
- Wrong `access` value (must be `open`, `gated`, or `private`)
- `publishedAt` not in ISO 8601 format

### Cover image does not appear

Check:
1. File exists at `public/content/whitepapers/{slug}/cover.jpg`
2. `meta.json` → `coverImage.src` points to the correct path
3. The path in `meta.json` starts with `/` (e.g. `/content/whitepapers/...` not `content/whitepapers/...`)

### Spanish page shows English body

This happens when `es.mdx` is missing. Add `es.mdx` to the directory, or verify that `meta.json` has `title.es` and `abstract.es` set (these control the hero text independently of the body).

### PDF download link 404s

Check:
1. File exists at `public/content/whitepapers/{slug}/{slug}-en.pdf`
2. `meta.json` → `pdf.en.url` matches the actual file path
3. `pdf.en.size` is set to the file size in bytes (used for display only, does not affect the link)

---

## Quick reference

| Task | Files to edit |
|---|---|
| Fix a typo in the body | `en.mdx` or `es.mdx` |
| Change the title | `meta.json` → `title.en` / `title.es` |
| Update the abstract | `meta.json` → `abstract.en` / `abstract.es` |
| Change category display | `meta.json` → `topic` or `access` |
| Replace cover image | Overwrite `public/content/whitepapers/{slug}/cover.jpg` |
| Add/update PDF | Overwrite `.pdf` file + update `meta.json` → `pdf.*` |
| Update publish date | `meta.json` → `publishedAt` |
| Hide from search engines | `meta.json` → `seo.noIndex: true` |
| Mark as featured | `meta.json` → `featured: true` |
| Add an update note | `meta.json` → `updatedNote` |
| Add Spanish translation | Create `es.mdx` + fill `title.es`, `abstract.es`, `seo.*.es` |
