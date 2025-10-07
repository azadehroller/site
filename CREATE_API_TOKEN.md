# URGENT: Create API Token for Visual Editing

## The Problem
Your `.env` file shows `SANITY_API_READ_TOKEN=` is empty. This is why visual editing is not working.

## Quick Fix Steps

### Step 1: Create the API Token

1. **Open this link in your browser:**
   https://sanity.io/manage/personal/project/rh0t6x75/api

2. **Click "Add API token"**

3. **Configure the token:**
   - Name: `Visual Editing Token` (or any name you prefer)
   - Permissions: Select **"Viewer"** or **"Editor"**
   - Click **"Save"**

4. **Copy the token** (it will only be shown once!)

### Step 2: Add the Token to Your .env File

Edit the file: `/astro-app/.env`

Find this line:
```env
SANITY_API_READ_TOKEN=
```

Replace it with:
```env
SANITY_API_READ_TOKEN=your-copied-token-here
```

### Step 3: Restart Your Dev Servers

Stop both servers with `Ctrl+C` and restart:
```bash
npm run dev
```

### Step 4: Test Again

1. Open Sanity Studio: http://localhost:3333
2. Click "Presentation" in the sidebar
3. Visual editing should now work! ✅

## Additional Notes

### About the 404 Error

The 404 error on the enable endpoint is happening because Sanity Studio is generating its own preview secret that doesn't match what's in your `.env` file. Once the API token is added, the presentation tool should work without hitting the enable endpoint, OR you can update the preview secret.

### If You Still See Errors After Adding the Token

The preview secret in your `.env` is:
```
SANITY_PREVIEW_SECRET=skET9FhrmFY7y5QJC4p6PdJJTERQ6PyibF7yriR2oMLXvtd2mOcgWVWUW46uwwUakAN0uX9Vmn8oVEUJCtPyatKlcf9cvozWE00o7wxZRkYxdgtxprTiAOK9oDcWd1Tfc2uAxuGs3rAlVrUhDDP4gSvj4xNoZfHvgo25mTkb7chBM4aqH8i0
```

If needed, you can update the Sanity Studio config to use this specific secret, but try with just the API token first.

## Bottom Line

**YOU NEED TO CREATE AND ADD THE API TOKEN.** That's the main blocker right now.

Direct link to create token: https://sanity.io/manage/personal/project/rh0t6x75/api

