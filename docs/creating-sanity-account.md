# Creating a Sanity Account

Sanity is the headless CMS (Content Management System) that powers the whitepapers, team bios, and lead-capture data for Buika Elements. This guide walks you through creating a Sanity account, setting up a project, and connecting it to the Next.js app.

> **Official docs:** [sanity.io/docs/getting-started](https://www.sanity.io/docs/getting-started)  
> **Next.js quickstart:** [sanity.io/docs/next-js-quickstart](https://www.sanity.io/docs/next-js-quickstart)

---

## Table of Contents

1. [Create a Sanity Account](#create-a-sanity-account)
2. [Create a New Project](#create-a-new-project)
3. [Get Your Project Credentials](#get-your-project-credentials)
4. [Set Up the Sanity Studio Locally](#set-up-the-sanity-studio-locally)
5. [Connect the Next.js App to Sanity](#connect-the-nextjs-app-to-sanity)
6. [Invite Team Members](#invite-team-members)
7. [Next Steps](#next-steps)

---

## Create a Sanity Account

1. Go to [sanity.io/manage](https://sanity.io/manage) or [sanity.io/get-started](https://www.sanity.io/get-started).
2. Click **"Get started"** or **"Sign up"**.
3. You can sign up with:
   - **Google**
   - **GitHub**
   - **Email & password**
4. Complete any onboarding prompts. Sanity will ask a few questions about your use case — select **"Website"** and **"Next.js"** where applicable.

> **Pricing:** The free tier includes generous quotas (200k API requests/day, 10GB bandwidth, 5GB assets). It is more than enough for most Buika Elements deployments.

---

## Create a New Project

1. In the Sanity management dashboard, click **"Create new project"**.
2. Enter a project name, e.g., `Buika Elements`.
3. Choose an organization (optional) or keep it as a personal project.
4. Select your preferred **dataset**:
   - `production` — for live content.
   - `development` — for testing (you can create additional datasets later).
5. Set **Visibility** to **Private**.
6. Click **Create project**.

Sanity will provision your project and show you a project dashboard.

---

## Get Your Project Credentials

The Next.js app needs two public values to fetch content from Sanity:

| Variable | Where to Find It |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard → project card → **Project ID** |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` (or the name you chose) |

### Steps

1. From the Sanity dashboard, click on your **Buika Elements** project.
2. Go to the **API** tab.
3. Under **Project ID**, copy the short alphanumeric string (e.g., `abc123de`).
4. Under **Datasets**, confirm the name is `production`.
5. (Optional) Under **CORS Origins**, add:
   - `http://localhost:3000` — for local development
   - Your production domain (e.g., `https://buikaelements.com`) — after deployment

> **Note:** If you skip the CORS step, Sanity will usually prompt you to allow new origins automatically when you first run the app.

### Create a Read Token (Optional but Recommended)

For draft previews and secure asset URLs, create an API token:

1. In the same **API** tab, click **Add API token**.
2. Name it `Next.js Read Token`.
3. Set permissions to **Viewer** plus limited asset-read access.
4. Copy the token and store it securely. You will use it as `SANITY_READ_TOKEN` in your environment variables.

---

## Set Up the Sanity Studio Locally

The Buika Elements repo includes a standalone Sanity Studio in the `sanity/` folder.

### Prerequisites

- Node.js 18+ installed
- pnpm, npm, or yarn

### Steps

1. Open a terminal in the project root.
2. Install Studio dependencies:
   ```bash
   cd sanity
   pnpm install
   ```
3. Create a `.env` file inside the `sanity/` folder with:
   ```env
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```
4. Start the Studio:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3333](http://localhost:3333) in your browser.

You should see the Studio with three content sections:

- **Whitepapers & essays** — bilingual articles with PDF assets
- **People** — team bios
- **Leads (captured)** — contact-form submissions

### Deploy the Studio (Optional)

You can deploy the Studio to Sanity Cloud for free:

```bash
pnpm sanity deploy
```

This gives you a hosted URL like `https://buika-elements.sanity.studio` so content editors don't need to run it locally.

---

## Connect the Next.js App to Sanity

1. In the **project root**, create or edit `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
   SANITY_READ_TOKEN=your_read_token
   NEXT_PUBLIC_SANITY_STUDIO_BASE_PATH=/studio
   ```
2. Restart the Next.js dev server:
   ```bash
   pnpm dev
   ```
3. Verify the connection by visiting a page that loads Sanity data (e.g., `/en/resources`).

### Mock-Data Fallback

If you do not have a Sanity project yet, the app can still run using mock data:

```env
CONTENT_SOURCE=mock
```

This is enabled by default in the example environment file so developers can start immediately without a CMS.

---

## Invite Team Members

To let colleagues edit content:

1. Go to [sanity.io/manage](https://sanity.io/manage) → select your project.
2. Click the **Members** tab.
3. Click **Invite members**.
4. Enter their email addresses and assign roles:
   - **Administrator** — full control
   - **Editor** — can create, edit, and publish content
   - **Viewer** — read-only
5. Click **Send invites**.

---

## Next Steps

- **Add content** in the Studio: create whitepapers, upload PDFs, and publish.
- **Configure webhooks** so Sanity can trigger on-demand ISR revalidation on the front-end (see roadmap in `README.md`).
- **Deploy the app** to your chosen platform:
  - [Vercel](./deploying-to-vercel.md)
  - [Cloudflare](./deploying-to-cloudflare.md)
  - [Railway](./deploying-to-railway.md)

---

## Resources

- [Sanity Docs — Getting Started](https://www.sanity.io/docs/getting-started)
- [Sanity Docs — Next.js Quickstart](https://www.sanity.io/docs/next-js-quickstart)
- [Sanity Docs — GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Docs — Image URLs](https://www.sanity.io/docs/image-url)
