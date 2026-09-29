# Deployment Guide

How the frontend and the Studio are deployed, and how preview, visual editing and cache purging are connected.

## Overview

| Piece | Host | Config |
|---|---|---|
| Astro frontend (primary) | Vercel: `https://site-studio-sanity-astro.vercel.app` | `astro-app/vercel.json` |
| Astro frontend (fallback) | Netlify: `https://sa-rolls.netlify.app` | root `netlify.toml` |
| Sanity Studio | `https://roller-software.sanity.studio` | `studio/sanity.config.ts`, `studio/sanity.cli.ts` |
| Content | Sanity project `rh0t6x75`, dataset `production` | |

The site is in a Netlify → Vercel migration. Both frontends build from the same code. `astro.config.mjs` `selectAdapter()` picks the adapter automatically: `DEPLOY_TARGET` first, then `VERCEL`, then `NETLIFY`, with Vercel as the default. Both hosts send `X-Robots-Tag: noindex` until launch.

The production domain is `www.roller.software`. Analytics, consent and HubSpot scripts run only on that hostname (`astro-app/src/utils/host.ts`).

---

## 1. Frontend environment variables

Set these in the Vercel project, and in Netlify if you're keeping it in sync:

| Variable | Value | Purpose |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `rh0t6x75` | Sanity project |
| `PUBLIC_SANITY_DATASET` | `production` | Dataset |
| `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` | `true` | Allow visual editing for editors (normal visitors are unaffected) |
| `PUBLIC_SANITY_STUDIO_URL` | `https://roller-software.sanity.studio` | Target of the stega "Open in Studio" links |
| `SANITY_API_READ_TOKEN` | Viewer token | Reading drafts in preview (server-only) |
| `SANITY_WEBHOOK_SECRET` | random string | Verifies `/api/revalidate` calls |
| `SITE` | full site URL | Builds absolute URLs for cache purges |
| `VERCEL_TOKEN` (+ `VERCEL_TEAM_ID` if team-scoped) | Vercel PAT | CDN purge on Vercel. `VERCEL_PROJECT_ID` is injected automatically. |
| `NETLIFY_CACHE_PURGE_TOKEN`, `NETLIFY_SITE_ID` | Netlify PAT + site ID | CDN purge on Netlify |

Create tokens at sanity.io/manage → project → API → Tokens. Never paste tokens into a committed file.

## 2. Deploy the frontend

Push to `main`. Vercel (and Netlify, if connected) builds automatically.

- **Vercel:** the root directory is `astro-app`. `vercel.json` installs from the repo root with `npm install --legacy-peer-deps --include=optional`, then runs `npm run build`.
- **Netlify:** `netlify.toml` builds with `npm run build --workspace=astro-app` and publishes `astro-app/dist`.

## 3. Deploy the Studio

```bash
npm run deploy --workspace=studio
```

The Studio's Presentation preview URL comes from `SANITY_STUDIO_PREVIEW_URL`, or falls back to the Vercel URL. It is compiled into the bundle, so **redeploy the Studio after changing it**. A Studio running on localhost always previews `http://localhost:4321`.

Presentation may iframe `localhost`, both deployed frontends, `*.vercel.app` (branch previews) and `*.sanity.studio` (`allowOrigins` in `sanity.config.ts`).

### Studio host

The Studio lives at `https://roller-software.sanity.studio`. Deploys target it through the pinned `appId` in `studio/sanity.cli.ts`. `/admin` on either frontend redirects there.

## 4. Cache purge webhook

Pages are cached at the CDN (headers are set in `astro-app/src/middleware.ts`). A Sanity webhook purges them on publish. Create one webhook per frontend at sanity.io/manage → API → Webhooks:

- **URL:** `https://<host>/api/revalidate`
- **Trigger:** Create, Update, Delete
- **Secret:** the same value as `SANITY_WEBHOOK_SECRET`
- **Filter:** see the header comment in `astro-app/src/pages/api/revalidate.ts`

## 5. CORS

At sanity.io/manage → API → CORS origins, add each frontend origin with **credentials allowed**. For branch previews, also add `https://*.vercel.app`.

## 6. Verify

1. Open the deployed Studio, then **Presentation**.
2. Check that the preview loads the deployed frontend (not localhost), that draft edits show without publishing, that clicking content focuses the right field, and that the console shows no CORS errors.
3. `/api/debug-preview` reports which preview env vars are set.

## Troubleshooting

| Symptom | Likely cause → fix |
|---|---|
| Presentation says "Unable to connect" | Preview URL wrong or Studio not redeployed → check `SANITY_STUDIO_PREVIEW_URL`, redeploy the Studio |
| Preview loads localhost in the deployed Studio | Env var missing at Studio build time → set it and redeploy |
| No click-to-edit overlays | `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` / `SANITY_API_READ_TOKEN` missing, or no `sanity-preview` cookie → check env vars and CORS credentials |
| "Open in Studio" goes to the wrong Studio | `PUBLIC_SANITY_STUDIO_URL` not set to `https://roller-software.sanity.studio` on that platform |
| Published content is stale | Webhook missing or failing → check webhook delivery logs and the purge tokens |
| A/B cookies or geo missing on Vercel | Middleware moved to the Edge runtime → keep `edgeMiddleware: false` (see `astro.config.mjs`) |
