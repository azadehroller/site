# Visual Editing Not Working - Troubleshooting Guide

## Problem
When editing in Sanity Studio's Presentation Tool, draft changes don't appear in the preview. You need to publish to see changes.

## Root Cause
The draft mode/preview mode isn't being enabled properly on your production site (https://sa-rolls.netlify.app).

---

## Solution Checklist

### ✅ **Step 1: Verify Netlify Environment Variables**

Go to your Netlify dashboard: https://app.netlify.com/sites/sa-rolls/settings/env

Make sure these environment variables are set:

```
PUBLIC_SANITY_PROJECT_ID=rh0t6x75
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true
SANITY_API_READ_TOKEN=<your-token-from-local-.env>
```

**Critical:** The `SANITY_API_READ_TOKEN` must be set! This is the token that allows reading draft content.

---

### ✅ **Step 2: Test the Debug Endpoint**

After deploying, visit this URL in your browser:
```
https://sa-rolls.netlify.app/api/debug-preview
```

You should see JSON output like:
```json
{
  "environment": {
    "SANITY_API_READ_TOKEN": "SET (hidden)",  // ← Should say "SET"
    "PUBLIC_SANITY_VISUAL_EDITING_ENABLED": "true",
    "PUBLIC_SANITY_PROJECT_ID": "rh0t6x75",
    "PUBLIC_SANITY_DATASET": "production"
  },
  "cookies": {
    "previewCookie": "NOT SET",  // ← This is normal when not in preview
    "isPreviewDetected": false
  }
}
```

**If `SANITY_API_READ_TOKEN` says "NOT SET"**, you need to add it to Netlify environment variables!

---

### ✅ **Step 3: Test Draft Mode Enable Endpoint**

The Presentation Tool should automatically call this, but you can test it manually:

```
https://sa-rolls.netlify.app/api/draft-mode/enable
```

You might get a 401 error (expected without the secret), but it should NOT be a 404 or 500 error.

---

### ✅ **Step 4: Check Sanity Studio Configuration**

Your Studio is hosted at Sanity's cloud. Make sure the `previewUrl` is correct:

In `studio/sanity.config.ts`:
```typescript
previewUrl: {
  origin: 'https://sa-rolls.netlify.app',  // ← Must match your Netlify URL
  previewMode: {
    enable: '/api/draft-mode/enable',
    disable: '/api/draft-mode/disable',
  }
}
```

---

### ✅ **Step 5: Verify API Token Permissions**

Your Sanity API token needs at least **"Viewer"** permissions to read draft content.

Check at: https://sanity.io/manage/personal/project/rh0t6x75/api

The token should have:
- ✅ Read access
- ✅ Can read drafts

---

## How to Fix

### **Fix 1: Add Environment Variables to Netlify**

1. Go to: https://app.netlify.com/sites/sa-rolls/settings/env
2. Click "Add a variable"
3. Add each variable from your local `.env` file:
   - `SANITY_API_READ_TOKEN` (from `astro-app/.env`)
   - `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` = `true`
   - `PUBLIC_SANITY_PROJECT_ID` = `rh0t6x75`
   - `PUBLIC_SANITY_DATASET` = `production`
4. Click "Save"
5. **Redeploy your site** (Netlify > Deploys > Trigger deploy > Deploy site)

### **Fix 2: Redeploy After Changes**

After adding environment variables, you MUST redeploy:
1. Push your latest changes to GitHub
2. OR manually trigger a deploy in Netlify

---

## Testing Visual Editing

After deploying with environment variables:

1. **Open Sanity Studio**: https://www.sanity.io/@oqJGy5EBR/studio/...
2. **Go to Presentation Tool** (left sidebar)
3. **Edit a post** - make draft changes (don't publish)
4. **Check the preview** - you should see changes immediately
5. **Click on content** - visual editing overlays should appear

---

## Debug Locally

To test locally:

1. Start both servers:
   ```bash
   npm run dev
   ```

2. Open Studio at: http://localhost:3333
3. Go to Presentation Tool
4. Edit a post and verify draft changes appear immediately

If it works locally but not in production, the issue is with Netlify environment variables!

---

## Common Issues

### Issue: "Invalid secret" error
**Solution:** The Presentation Tool generates secrets automatically. If this persists, check that `@sanity/preview-url-secret` is installed in astro-app.

### Issue: Changes require publish to see
**Solution:** Environment variables not set on Netlify. See Fix 1 above.

### Issue: Visual editing overlays don't appear
**Solution:** Make sure `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` is set on Netlify.

### Issue: 404 on /api/draft-mode/enable
**Solution:** Redeploy your site. The API routes might not have been deployed properly.

---

## Quick Test Commands

**Check if token is set:**
```bash
curl https://sa-rolls.netlify.app/api/debug-preview
```

**Expected:** Should show `"SANITY_API_READ_TOKEN": "SET (hidden)"`

---

## Need Help?

If visual editing still doesn't work after following these steps:

1. Check the browser console for errors
2. Check Netlify deploy logs for errors
3. Verify all environment variables are saved and deployed
4. Make sure you redeployed after adding variables
