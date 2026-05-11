# Deploying Buika Elements to Vercel

Vercel is the company behind Next.js, making it the most seamless platform for deploying this application. It supports all Next.js features out of the box, including Server Components, Route Handlers, ISR, and the Image Optimization API.

> **Official docs:** [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)  
> **Next.js deployment guide:** [nextjs.org/docs/app/getting-started/deploying](https://nextjs.org/docs/app/getting-started/deploying)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Import from GitHub](#import-from-github)
3. [Configure Environment Variables](#configure-environment-variables)
4. [Deploy](#deploy)
5. [Custom Domain](#custom-domain)
6. [Preview Deployments](#preview-deployments)
7. [ISR & Revalidation on Vercel](#isr--revalidation-on-vercel)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A [GitHub account](./creating-github-account.md) with the Buika Elements repository pushed.
- A [Sanity account](./creating-sanity-account.md) with a live project.

---

## Import from GitHub

1. Go to [vercel.com/new](https://vercel.com/new).
2. Sign up or log in with your **GitHub** account.
3. Authorize Vercel to access your repositories.
4. Find and select the `buika-elements` repository from the list.
5. Vercel automatically detects that it is a **Next.js** project and pre-fills the build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install` (or `npm install` / `yarn`)
6. Click **Deploy**.

Vercel will clone the repo, install dependencies, build the app, and deploy it to a `*.vercel.app` subdomain. This usually takes 1–3 minutes.

---

## Configure Environment Variables

After the first deploy (or during import), you must add the environment variables from `.env.example`.

1. In the Vercel dashboard, select your project.
2. Go to **Settings** → **Environment Variables**.
3. Add each variable one by one:

| Key | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your_sanity_project_id | Production, Preview |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` | Production, Preview |
| `SANITY_READ_TOKEN` | your_sanity_read_token | Production, Preview |
| `NEXT_PUBLIC_SANITY_STUDIO_BASE_PATH` | `/studio` | Production, Preview |
| `HUBSPOT_ACCESS_TOKEN` | your_hubspot_token | Production |
| `RESEND_API_KEY` | your_resend_key | Production |
| `RESEND_FROM` | `Buika Elements <hello@buikaelements.com>` | Production |
| `RESEND_REPLY_TO` | `simon@buikaelements.com` | Production |
| `CONTACT_NOTIFICATION_TO` | `simon@buikaelements.com` | Production |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `buikaelements.com` | Production |
| `NEXT_PUBLIC_SUBSTACK_URL` | `https://buikaelements.substack.com` | Production |
| `CONTENT_SOURCE` | `mdx` or `sanity` | Production, Preview |

4. Click **Save**.
5. **Redeploy** the project so the new variables take effect:
   - Go to the **Deployments** tab → click the three dots on the latest deploy → **Redeploy**.

> **Security note:** Never commit `.env.local` to Git. Vercel's environment variable UI keeps secrets encrypted.

---

## Deploy

### Automatic Deploys

Vercel deploys automatically on every push to the `main` branch. No additional configuration is needed.

### Manual Deploy via CLI

Install the Vercel CLI:

```bash
pnpm i -g vercel
```

Then, from the project root:

```bash
vercel --prod
```

This builds and deploys the app directly from your local machine.

---

## Custom Domain

1. In the Vercel dashboard, go to your project → **Settings** → **Domains**.
2. Enter your domain, e.g., `buikaelements.com`.
3. Vercel will provide DNS records (A or CNAME) to add at your registrar.
4. Add the records and wait for propagation (usually a few minutes to an hour).
5. Vercel automatically provisions an SSL certificate via Let's Encrypt.

> **Tip:** If you use Cloudflare for DNS, set the proxy status to **DNS only** (gray cloud) for the apex domain to avoid conflicts with Vercel's SSL provisioning.

---

## Preview Deployments

Every pull request or push to a non-`main` branch gets its own **preview URL**:

- Pushes to branches: `https://buika-elements-git-branch-name.vercel.app`
- Pull requests: `https://buika-elements-git-branch-name.vercel.app`

This is ideal for reviewing changes before merging. Preview deployments use the same environment variables as production unless you configure separate **Preview** values in the settings.

---

## ISR & Revalidation on Vercel

Buika Elements uses Incremental Static Regeneration (ISR) to keep content fresh without rebuilding the entire site.

- **Timed revalidation:** Pages like `/en/resources` revalidate automatically after a set interval (configured in the page source).
- **On-demand revalidation:** When a Sanity editor publishes a new whitepaper, a webhook can call `/api/revalidate` to regenerate only the affected pages.

On Vercel, ISR works without extra configuration — the platform handles caching and stale-while-revalidate at the edge.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Build failed" | Check the build logs. Common causes: missing env vars, TypeScript errors, or a failed Sanity query. |
| "Sanity images not loading" | Ensure `cdn.sanity.io` is in `next.config.mjs` `images.remotePatterns`. It is already configured in this repo. |
| "Contact form submissions fail" | Verify `HUBSPOT_ACCESS_TOKEN` and `RESEND_API_KEY` are set correctly. |
| "Studio at /studio returns 404" | The Studio is standalone in the `sanity/` folder. Either deploy it separately (`pnpm sanity deploy`) or embed it by adding the optional `app/studio/[[...index]]/page.tsx` route. |
| "Locale redirect loop" | Make sure the `NEXT_PUBLIC_` Sanity variables are available at build time; missing public env vars can cause middleware issues. |

---

## Resources

- [Vercel — Next.js Framework Guide](https://vercel.com/docs/frameworks/nextjs)
- [Vercel — Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel — Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Next.js — Deploying Guide](https://nextjs.org/docs/app/getting-started/deploying)
