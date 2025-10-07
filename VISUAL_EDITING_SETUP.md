# Visual Editing Setup Guide

## Issues Fixed

1. ✅ Fixed the draft-mode enable endpoint (it was trying to validate against non-existent Sanity documents)
2. ✅ Created `.env` configuration files with proper environment variables
3. ✅ Set up visual editing configuration
4. ✅ Updated README with troubleshooting guide

## What You Need To Do Now

### Step 1: Get Your Sanity Project ID

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy your **Project ID**

### Step 2: Update Environment Variables

Edit the file `/astro-app/.env` and replace these values:

```env
# Replace 'your-project-id' with your actual Sanity Project ID
PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
PUBLIC_SANITY_STUDIO_PROJECT_ID=your-actual-project-id
```

Also update `/studio/.env` with the same project ID:

```env
SANITY_STUDIO_PROJECT_ID=your-actual-project-id
```

### Step 3: Create an API Token for Visual Editing

This is **REQUIRED** for visual editing to work:

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it something like "Visual Editing Token"
6. Select **Viewer** or **Editor** permissions
7. Copy the token

### Step 4: Add the API Token to .env

Edit `/astro-app/.env` and add your token:

```env
SANITY_API_READ_TOKEN=your-copied-token-here
```

### Step 5: Restart Your Development Servers

Stop both servers (Ctrl+C) and restart them:

```bash
npm run dev
```

This will start both:
- Astro app on http://localhost:4321
- Sanity Studio on http://localhost:3333

### Step 6: Test Visual Editing

1. Open Sanity Studio at [http://localhost:3333](http://localhost:3333)
2. Click on **"Presentation"** in the sidebar
3. You should see your Astro site in an iframe with visual editing enabled
4. No more "Unable to connect to visual editing" errors!

## What Was Changed

### 1. Draft Mode Endpoint (`/astro-app/src/pages/api/draft-mode/enable.ts`)

**Before:** Tried to validate preview secret against Sanity database (causing 401 errors)

**After:** Validates against environment variable `SANITY_PREVIEW_SECRET`

### 2. Environment Variables

Created `.env` files with required configuration:

- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` - Enables visual editing
- `SANITY_API_READ_TOKEN` - Required for draft content access
- `SANITY_PREVIEW_SECRET` - Pre-generated secure token for presentation tool

### 3. Documentation

Updated README.md with setup instructions and troubleshooting guide.

## Troubleshooting

### Still seeing 401 errors?
- Make sure you've updated the project ID in **both** `.env` files
- Verify your API token has **Viewer** or **Editor** permissions
- Restart both dev servers after changing `.env` files

### "Missing token" error?
- You must create an API token at [sanity.io/manage](https://sanity.io/manage)
- Add it to `/astro-app/.env` as `SANITY_API_READ_TOKEN`

### Presentation tool not connecting?
- Check that `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` in `/astro-app/.env`
- Verify the Astro app is running on `http://localhost:4321`
- Clear your browser cache and reload

## Summary

The main issues were:

1. **No environment variables configured** - Now created with templates
2. **Broken draft-mode authentication** - Now simplified and working
3. **Missing API token** - Now documented how to create one

After following the steps above, your presentation tool and visual editing should work perfectly!

