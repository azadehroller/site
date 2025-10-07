# Production Visual Editing Setup

## Issue
In production, the Sanity Presentation Tool needs to know which URL to use for preview. By default, it uses `http://localhost:4321` for local development.

## Solution

### Option 1: Set Environment Variable in Sanity Dashboard (Recommended)

1. Go to https://sanity.io/manage
2. Select your project (`rh0t6x75`)
3. Go to **API** → **Datasets** → **production**
4. Click on **Environment variables**
5. Add a new variable:
   - **Name**: `SANITY_STUDIO_PREVIEW_URL`
   - **Value**: `https://sa-rolls.netlify.app`
6. Save and redeploy the Studio:
   ```bash
   npm run deploy --workspace=studio
   ```

### Option 2: Include in Build (Current Setup)

The Studio is currently configured to:
- Use `http://localhost:4321` for local development (default)
- Use `process.env.SANITY_STUDIO_PREVIEW_URL` if set for production

**For local development:**
- No changes needed - uses localhost by default

**For production deployment:**
- The environment variable needs to be set during the build process
- Sanity's build system will include it in the bundled JavaScript

## Current Configuration

**File**: `studio/sanity.config.ts`
```typescript
presentationTool({
  resolve: {locations, mainDocuments},
  previewUrl: {
    origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321',
    previewMode: {
      enable: '/api/draft-mode/enable',
      disable: '/api/draft-mode/disable',
    }
  },
})
```

## Testing

After setting the environment variable and redeploying:

1. Go to https://sa-rolls.sanity.studio/
2. Open the **Presentation** tool
3. Click on a post to edit
4. The preview should load from `https://sa-rolls.netlify.app/post/[slug]`
5. Changes should reflect in real-time
6. No more "comlink/heartbeat" timeout errors

## Troubleshooting

If visual editing still doesn't work:
- Check browser console for errors
- Verify `SANITY_API_READ_TOKEN` is set in Netlify environment variables
- Check Network tab for `/api/draft-mode/enable` requests (should return 307)
- Verify the preview cookie is being set
