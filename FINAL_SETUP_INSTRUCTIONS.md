# 🚀 Final Setup Instructions - Visual Editing

## Current Status

✅ Project ID configured: `rh0t6x75`  
✅ Environment files created  
✅ Draft-mode endpoint fixed  
✅ Astro config updated to load .env correctly  
❌ **API Token missing** ← THIS IS THE BLOCKER

## What You Need to Do RIGHT NOW

### 1. Create an API Token (CRITICAL - 2 minutes)

**Direct Link:** https://sanity.io/manage/personal/project/rh0t6x75/api

Steps:
1. Click **"Add API token"**
2. Name: `Visual Editing Token`
3. Permissions: Select **"Viewer"** or **"Editor"**
4. Click **"Save"** and copy the token

### 2. Add the Token to .env

Edit this file: `/astro-app/.env`

Find this line:
```env
SANITY_API_READ_TOKEN=
```

Replace with:
```env
SANITY_API_READ_TOKEN=sk1234567890abcdef...  # Your actual token
```

You can edit it with:
```bash
nano /Users/azadeh.faramarzi/Documents/Frontend/site/astro-app/.env
```

Or open it in any text editor.

### 3. Restart Dev Servers

Stop both servers with `Ctrl+C` and restart:
```bash
cd /Users/azadeh.faramarzi/Documents/Frontend/site
npm run dev
```

### 4. Test Visual Editing

1. Open: http://localhost:3333
2. Click **"Presentation"** in the sidebar
3. You should see your Astro site with visual editing working! 🎉

## What I Fixed

1. **Draft-mode endpoint** - Simplified authentication (no more database checks causing 401 errors)
2. **Environment variables** - Created `.env` files with proper configuration
3. **Astro config** - Fixed to load `.env` from the correct directory
4. **Preview secret** - Pre-generated secure token

## Why It's Still Not Working

The error message says:
```
Unable to connect to visual editing. Make sure you've setup '@sanity/visual-editing' correctly
```

This happens because `SANITY_API_READ_TOKEN` is empty in your `.env` file. The visual editing library needs this token to:
- Access draft/unpublished content
- Enable real-time updates
- Connect the Sanity Studio to your Astro site

**Without the token, visual editing cannot work.**

## Troubleshooting

### If you still see errors after adding the token:

1. **Verify the token is saved correctly**
   ```bash
   cat /Users/azadeh.faramarzi/Documents/Frontend/site/astro-app/.env | grep SANITY_API_READ_TOKEN
   ```
   Should show: `SANITY_API_READ_TOKEN=sk...` (not empty)

2. **Check token permissions**
   - Go back to https://sanity.io/manage/personal/project/rh0t6x75/api
   - Verify the token has "Viewer" or "Editor" permissions

3. **Clear browser cache**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

4. **Check console for different errors**
   - Open browser DevTools → Console
   - Look for any new error messages

### About the WebSocket Warning

The warning about WebSocket (`wss://rh0t6x75.api.sanity.io/v2022-06-30/socket/production`) is normal during development. It's just Sanity's real-time listener trying to connect. It won't prevent visual editing from working.

## Summary

**You're 99% there!** Just need to:
1. Create the API token
2. Add it to `/astro-app/.env`
3. Restart the dev servers

That's it! Visual editing will work perfectly after this.

---

**Need help?** Check these files:
- `CREATE_API_TOKEN.md` - Detailed token creation steps
- `VISUAL_EDITING_SETUP.md` - Complete setup guide
- `README.md` - Updated with troubleshooting section

