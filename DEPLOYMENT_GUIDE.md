# Production Deployment Guide

This guide explains how to deploy the Sanity Studio and Astro frontend to production with visual editing and presentation tool support.

## Overview

- **Astro Frontend**: Hosted on Netlify at `https://sa-rolls.netlify.app`
- **Sanity Studio**: Hosted on Sanity at `https://sa-rolls.sanity.studio`
- **Project ID**: `rh0t6x75`
- **Dataset**: `production`

## Prerequisites

1. Netlify account with access to the project
2. Sanity account with access to project `rh0t6x75`
3. Sanity CLI installed: `npm install -g @sanity/cli`

---

## Step 1: Configure Netlify Environment Variables

Go to your Netlify dashboard and set the following environment variables:

### Required Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `PUBLIC_SANITY_PROJECT_ID` | `rh0t6x75` | Sanity project identifier |
| `PUBLIC_SANITY_DATASET` | `production` | Dataset name |
| `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` | `true` | Enable visual editing features |
| `PUBLIC_SANITY_STUDIO_URL` | `https://sa-rolls.sanity.studio` | URL where Studio is hosted |
| `SANITY_API_READ_TOKEN` | (copy from `astro-app/.env`) | API token for reading content |

### How to Set Variables

1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Click "Add a variable"
3. Add each variable from the table above
4. Click "Save"

---

## Step 2: Configure Sanity Environment Variables

You need to set the preview URL in Sanity so the Studio knows where to load previews from.

### Method 1: Using Sanity Dashboard (Recommended)

1. Go to https://sanity.io/manage
2. Select project `rh0t6x75`
3. Navigate to **API** → **Environment Variables**
4. Add a new variable:
   - **Key**: `SANITY_STUDIO_PREVIEW_URL`
   - **Value**: `https://sa-rolls.netlify.app`
5. Save the variable

### Method 2: Using Sanity CLI

From the `studio` directory, run:

```bash
cd studio
npx sanity env:add SANITY_STUDIO_PREVIEW_URL
# When prompted, enter: https://sa-rolls.netlify.app
```

---

## Step 3: Deploy Sanity Studio

After setting the environment variable, deploy the Studio:

```bash
npm run deploy --workspace=studio
```

Or from the `studio` directory:

```bash
cd studio
npm run deploy
```

**Important**: The Studio must be redeployed after setting `SANITY_STUDIO_PREVIEW_URL` because the variable is compiled into the bundle at build time.

---

## Step 4: Deploy Astro App to Netlify

### Option 1: Git Push (Automatic)

Simply push to your main branch:

```bash
git push origin main
```

Netlify will automatically build and deploy.

### Option 2: Manual Deploy

```bash
npm run build --workspace=astro-app
netlify deploy --prod --dir=astro-app/dist
```

---

## Step 5: Verify Deployment

### Check Environment Variables

Visit: `https://sa-rolls.netlify.app/api/debug-preview`

You should see:
- ✅ `SANITY_API_READ_TOKEN`: SET
- ✅ `PUBLIC_SANITY_PROJECT_ID`: rh0t6x75
- ✅ `PUBLIC_SANITY_DATASET`: production
- ✅ `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`: true
- ✅ `PUBLIC_SANITY_STUDIO_URL`: https://sa-rolls.sanity.studio

### Test Visual Editing

1. Go to https://sa-rolls.sanity.studio
2. Open the **Presentation** tool from the sidebar
3. Select a post to preview
4. Verify:
   - ✅ Preview loads from `https://sa-rolls.netlify.app` (not localhost)
   - ✅ Draft changes appear without publishing
   - ✅ Visual editing overlays appear when clicking content
   - ✅ No CORS errors in browser console

---

## Troubleshooting

### Issue: Studio shows "Unable to connect to preview"

**Cause**: `SANITY_STUDIO_PREVIEW_URL` is not set or Studio wasn't redeployed after setting it.

**Fix**:
1. Verify the environment variable is set in Sanity dashboard
2. Redeploy Studio: `npm run deploy --workspace=studio`

### Issue: Preview loads localhost instead of production

**Cause**: Environment variable wasn't available during Studio build.

**Fix**:
1. Check that `SANITY_STUDIO_PREVIEW_URL` is set in Sanity dashboard
2. Redeploy Studio to pick up the variable

### Issue: Visual editing overlays don't appear

**Cause**: `PUBLIC_SANITY_STUDIO_URL` not set in Netlify.

**Fix**:
1. Add `PUBLIC_SANITY_STUDIO_URL=https://sa-rolls.sanity.studio` in Netlify
2. Redeploy the Astro app

### Issue: CORS errors in browser console

**Cause**: Netlify site URL not added to Sanity CORS origins.

**Fix**:
1. Go to https://sanity.io/manage
2. Select project `rh0t6x75`
3. Navigate to **API** → **CORS origins**
4. Add `https://sa-rolls.netlify.app` with credentials enabled
5. Add `https://*.netlify.app` for deploy previews (optional)

### Issue: Draft mode cookie not set

**Cause**: Missing CORS headers or cookie security settings.

**Fix**: This should be resolved by the code changes in this project. Ensure you've deployed the latest version with:
- CORS headers in `/api/draft-mode/enable.ts` and `/api/draft-mode/disable.ts`
- Production-aware cookie settings (`secure: true`, `sameSite: 'none'` for HTTPS)

---

## Local Development

For local development, the app defaults to:
- Astro: `http://localhost:4321`
- Studio: `http://localhost:3333`

Run both servers:

```bash
npm run dev
```

This will start both the Astro app and Sanity Studio concurrently.

---

## Alternative: Deploy with Environment Variable

If you prefer not to use Sanity's dashboard environment variables, you can deploy with the variable set in the command:

```bash
SANITY_STUDIO_PREVIEW_URL=https://sa-rolls.netlify.app npm run deploy --workspace=studio
```

**Note**: This requires setting the variable every time you deploy, which is error-prone. Using Sanity's dashboard is recommended.

---

## Summary Checklist

- [ ] Set all required environment variables in Netlify
- [ ] Set `SANITY_STUDIO_PREVIEW_URL` in Sanity dashboard
- [ ] Deploy Sanity Studio with `npm run deploy --workspace=studio`
- [ ] Deploy Astro app (git push or manual deploy)
- [ ] Verify environment variables at `/api/debug-preview`
- [ ] Test presentation tool and visual editing in production
- [ ] Check browser console for any errors

---

## Need Help?

- Check the [Sanity Presentation documentation](https://www.sanity.io/docs/presentation)
- Review `VISUAL_EDITING_TROUBLESHOOTING.md` for common issues
- Verify environment variables are correctly set in both platforms
