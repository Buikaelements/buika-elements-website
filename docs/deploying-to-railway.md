# Deploying Buika Elements to Railway

Railway is a developer-friendly platform that deploys applications from GitHub or the CLI with zero configuration. It supports Next.js via Node.js or Docker, and is a great choice if you want a simple, serverful deployment with full Next.js feature support.

> **Official docs:** [docs.railway.com/guides/nextjs](https://docs.railway.com/guides/nextjs)  
> **Next.js deployment templates:** [railway.com/templates?q=nextjs](https://railway.com/templates?q=nextjs)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Configure Next.js for Self-Hosting](#configure-nextjs-for-self-hosting)
3. [Option A: Deploy from GitHub](#option-a-deploy-from-github)
4. [Option B: Deploy from the CLI](#option-b-deploy-from-the-cli)
5. [Option C: Deploy with a Dockerfile](#option-c-deploy-with-a-dockerfile)
6. [Environment Variables](#environment-variables)
7. [Public Domain & Custom Domain](#public-domain--custom-domain)
8. [Monitoring & Logs](#monitoring--logs)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A [GitHub account](./creating-github-account.md) with the Buika Elements repository pushed.
- A [Sanity account](./creating-sanity-account.md) with a live project.
- A [Railway account](https://railway.com/) (free trial includes $5 of usage).
- Node.js 18+ installed locally (for CLI option).

---

## Configure Next.js for Self-Hosting

Railway is a self-hosted environment, so Next.js needs to produce a **standalone build**.

1. Open `next.config.mjs` (or `next.config.ts`) in the project root.
2. Add the `output` option:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
```

3. Update the `start` script in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "node .next/standalone/server.js",
    "lint": "next lint"
  }
}
```

> **Note:** The existing `next.config.mjs` in this repo does not yet include `output: "standalone"`. Add it before deploying to Railway.

---

## Option A: Deploy from GitHub

This is the easiest method for teams that already use GitHub.

1. Go to [railway.com/new](https://railway.com/new).
2. Click **"Deploy from GitHub repo"**.
3. If prompted, authorize Railway to access your GitHub account and select the `buika-elements` repository.
4. Railway will auto-detect that it is a Node.js / Next.js project and use the scripts in `package.json`.
5. Click **Deploy**.
6. Wait for the build to complete. You can watch real-time logs in the dashboard.
7. Once deployed, the service is created but **not publicly accessible by default**.

### Generate a Public URL

1. In the Railway dashboard, click on your new service.
2. Go to the **Settings** tab → **Networking** section.
3. Click **Generate Domain**.
4. Railway creates a public URL like `https://buika-elements.up.railway.app`.

---

## Option B: Deploy from the CLI

Useful for quick iterations or when you want to deploy without pushing to GitHub.

### 1. Install the Railway CLI

```bash
pnpm i -g @railway/cli
```

### 2. Authenticate

```bash
railway login
```

This opens a browser tab to authorize the CLI.

### 3. Initialize a Project

From the project root:

```bash
railway init
```

Follow the prompts to name your project (e.g., `buika-elements`).

### 4. Configure Standalone Output

Ensure you have already added `output: "standalone"` to `next.config.mjs` and updated the `start` script as described in the [configuration section](#configure-nextjs-for-self-hosting).

### 5. Deploy

```bash
railway up
```

Railway will scan, compress, and upload your files, then build and deploy them. Real-time logs appear in your terminal.

### 6. Generate a Public URL

```bash
railway domain
```

This creates a public domain for your service.

---

## Option C: Deploy with a Dockerfile

For maximum control over the runtime environment, use Docker.

1. Create a `Dockerfile` in the project root:

```dockerfile
FROM node:lts-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

2. Ensure `next.config.mjs` has `output: "standalone"`.
3. Deploy via GitHub or CLI:
   - **GitHub:** Railway auto-detects the `Dockerfile` and uses it.
   - **CLI:** `railway up` — same command, Docker build happens automatically.

---

## Environment Variables

After the first deployment, add your environment variables in the Railway dashboard:

1. Click on your service in the project canvas.
2. Go to the **Variables** tab.
3. Click **New Variable** and add each key-value pair from `.env.example`:

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

4. Click **Deploy** (or let Railway auto-redeploy if you have auto-deploy enabled).

> **Tip:** Railway supports [shared variables](https://docs.railway.com/guides/variables#referencing-another-services-variable) if you later add a PostgreSQL database or Redis cache.

---

## Public Domain & Custom Domain

### Railway-Provided Domain

1. Service → **Settings** → **Networking**.
2. Click **Generate Domain**.

### Custom Domain

1. Service → **Settings** → **Networking**.
2. Click **Custom Domain**.
3. Enter your domain (e.g., `buikaelements.com`).
4. Railway provides DNS records (CNAME or A).
5. Add the records at your DNS provider and wait for propagation.
6. Railway auto-provisions an SSL certificate.

---

## Monitoring & Logs

- **Build Logs:** Visible during deployment in the dashboard or CLI.
- **Runtime Logs:** Service → **Logs** tab. Filter by timestamp or search for keywords.
- **Metrics:** Service → **Metrics** tab for CPU, memory, and request latency.
- **Observability:** Railway offers integrations with Datadog and custom webhooks.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Cannot find module" on start | Ensure `output: "standalone"` is in `next.config.mjs` and the `start` script points to `.next/standalone/server.js`. |
| "Build succeeds but site 404s" | Make sure the service has a public domain generated. |
| "Sanity images not loading" | Verify `cdn.sanity.io` is in `images.remotePatterns`. Also check that `NEXT_PUBLIC_*` vars are set. |
| "Contact form fails" | Check that `HUBSPOT_ACCESS_TOKEN` and `RESEND_API_KEY` are correctly entered. Review runtime logs. |
| "Out of memory during build" | Railway free/hobby plans have RAM limits. Upgrade the service instance or enable swap in Docker. |
| "Env variables not appearing in browser" | Only variables prefixed with `NEXT_PUBLIC_` are inlined at build time. Rebuild after changing them. |

---

## Resources

- [Railway — Next.js Guide](https://docs.railway.com/guides/nextjs)
- [Railway — Environment Variables](https://docs.railway.com/guides/variables)
- [Railway — CLI Documentation](https://docs.railway.com/cli)
- [Railway — Docker Deployments](https://docs.railway.com/builds/dockerfiles)
- [Next.js — Standalone Output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
