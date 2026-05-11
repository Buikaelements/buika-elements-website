# Deploying Buika Elements to Cloudflare

Cloudflare Workers lets you run Next.js at the edge, close to your users. The official **OpenNext adapter** supports App Router, Server Components, ISR, Middleware, and more.

> **Official docs:** [developers.cloudflare.com/workers/framework-guides/web-apps/nextjs](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs)  
> **OpenNext Cloudflare docs:** [opennext.js.org/cloudflare](https://opennext.js.org/cloudflare)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Option A: Automatic Deployment (Recommended)](#option-a-automatic-deployment-recommended)
3. [Option B: Manual Configuration](#option-b-manual-configuration)
4. [Environment Variables on Cloudflare](#environment-variables-on-cloudflare)
5. [Custom Domain](#custom-domain)
6. [Local Preview & Testing](#local-preview--testing)
7. [Important Considerations](#important-considerations)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A [GitHub account](./creating-github-account.md) with the Buika Elements repository.
- A [Sanity account](./creating-sanity-account.md) with a live project.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is sufficient).
- Node.js 18+ installed locally.

---

## Option A: Automatic Deployment (Recommended)

Cloudflare can auto-detect Next.js and generate the required configuration.

1. Install the Wrangler CLI globally:
   ```bash
   pnpm add -g wrangler@latest
   ```
2. Log in to Cloudflare:
   ```bash
   wrangler login
   ```
   This opens a browser tab to authorize the CLI.
3. From the **project root**, run:
   ```bash
   npx wrangler deploy
   ```

Wrangler will:
- Detect that the project is Next.js.
- Install the `@opennextjs/cloudflare` adapter automatically.
- Generate a `wrangler.jsonc` configuration file.
- Build the app and deploy it to a `*.workers.dev` subdomain.

> **Note:** This requires `compatibility_date` of `2024-09-23` or later and the `nodejs_compat` flag. Wrangler handles this automatically.

---

## Option B: Manual Configuration

If you prefer full control over the setup, follow these steps:

### 1. Install Dependencies

```bash
pnpm add @opennextjs/cloudflare@latest
pnpm add -D wrangler@latest
```

### 2. Create `wrangler.jsonc`

In the project root, create `wrangler.jsonc`:

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "buika-elements",
  "compatibility_date": "2026-04-26",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  }
}
```

> Update `compatibility_date` to today's date.

### 3. Create `open-next.config.ts`

In the project root, create `open-next.config.ts`:

```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig();
```

### 4. Update `package.json` Scripts

Add the following scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

### 5. Deploy

```bash
pnpm run deploy
```

This builds the app with the OpenNext adapter and deploys it to Cloudflare Workers.

---

## Environment Variables on Cloudflare

Cloudflare Workers uses **Workers Builds** or the Wrangler CLI for environment variables.

### Using Workers Builds (Git Integration)

1. In the Cloudflare dashboard, go to **Workers & Pages** → your project.
2. Navigate to **Settings** → **Build Variables and secrets**.
3. Add all variables from `.env.example`:

| Variable | Example Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123de` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
| `SANITY_READ_TOKEN` | `sk...` |
| `HUBSPOT_ACCESS_TOKEN` | `pat-na1-...` |
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM` | `Buika Elements <hello@buikaelements.com>` |
| `RESEND_REPLY_TO` | `simon@buikaelements.com` |
| `CONTACT_NOTIFICATION_TO` | `simon@buikaelements.com` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `buikaelements.com` |
| `NEXT_PUBLIC_SUBSTACK_URL` | `https://buikaelements.substack.com` |
| `CONTENT_SOURCE` | `mdx` or `sanity` |

> **Important:** Both `NEXT_PUBLIC_*` and non-public variables must be defined here. The build process needs access to all of them for SSG and inlining.

### Using Wrangler CLI

```bash
wrangler secret put SANITY_READ_TOKEN
wrangler secret put RESEND_API_KEY
# ... repeat for each secret
```

For non-secret public variables, add them to `wrangler.jsonc`:

```json
{
  "vars": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "abc123de",
    "NEXT_PUBLIC_SANITY_DATASET": "production"
  }
}
```

---

## Custom Domain

1. In the Cloudflare dashboard, go to **Workers & Pages** → select your project.
2. Click **Triggers** → **Custom Domains**.
3. Click **Add Custom Domain**.
4. Enter your domain (e.g., `buikaelements.com`) and follow the prompts.
5. Since Cloudflare is also your DNS provider, the domain will validate automatically if the DNS records are already managed in the same account.

---

## Local Preview & Testing

Cloudflare Workers runs on the `workerd` runtime, which is different from Node.js. Always test with the preview command before deploying:

```bash
pnpm run preview
```

This starts a local server that closely matches the production Workers environment. Use it to verify:

- Sanity data fetching
- Contact form API routes
- Image optimization
- Middleware behavior

---

## Important Considerations

| Feature | Status | Notes |
|---|---|---|
| App Router | ✅ Supported | Fully functional |
| Pages Router | ✅ Supported | Fully functional |
| Route Handlers | ✅ Supported | `/api/contact` works |
| React Server Components | ✅ Supported | Default in Next.js 16 |
| ISR | ✅ Supported | Revalidation via cache API |
| Middleware | ✅ Supported | Standard Edge Middleware |
| Image Optimization | ✅ Supported | Via Cloudflare Images |
| Node.js in Middleware | ❌ Not yet | Avoid Node.js APIs in `middleware.ts` |

### Image Optimization

The Cloudflare adapter routes `next/image` through Cloudflare Images automatically. No extra configuration is needed for basic usage.

### Caching

OpenNext uses Cloudflare's cache for ISR. You can configure caching behavior in `open-next.config.ts`. See the [OpenNext caching docs](https://opennext.js.org/cloudflare/caching) for advanced options.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Build fails with Node.js errors" | Ensure `nodejs_compat` is in `compatibility_flags`. |
| "Environment variables missing at build time" | Add them to Workers Builds variables, not just Wrangler secrets. |
| "Images return 404" | Verify `cdn.sanity.io` is in `next.config.mjs` `images.remotePatterns`. |
| "API routes timeout" | Workers have a 30-second CPU limit for paid plans (lower on free). Keep contact-form processing lean. |
| "TypeScript errors with Wrangler types" | Run `pnpm run cf-typegen` to regenerate `cloudflare-env.d.ts`. |

---

## Resources

- [Cloudflare — Next.js Framework Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs)
- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler)
- [Cloudflare Workers Limits](https://developers.cloudflare.com/workers/platform/limits)
