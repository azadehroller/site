// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tailwindcss from '@tailwindcss/vite';
import astrobook from 'astrobook';

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, __dirname, "");
import sanity from '@sanity/astro'
import { defineConfig, passthroughImageService } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel/serverless";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

// Adapter selection — supports running on both Vercel (primary) and Netlify (fallback).
// Detection order:
//   1. DEPLOY_TARGET env var (manual override: "vercel" | "netlify")
//   2. process.env.VERCEL  → set automatically on Vercel builds
//   3. process.env.NETLIFY → set automatically on Netlify builds
//   4. Default → Vercel (primary host)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
function selectAdapter() {
  const target =
    (process.env.DEPLOY_TARGET || '').toLowerCase() ||
    (process.env.VERCEL ? 'vercel' : '') ||
    (process.env.NETLIFY ? 'netlify' : '') ||
    'vercel';

  if (target === 'netlify') {
    return netlify({
      edgeMiddleware: true, // Use Edge Functions for faster cold starts (~50ms vs ~2s)
    });
  }

  return vercel({
    // Run middleware as a Vercel Edge Function for faster cold starts.
    edgeMiddleware: true,
    // Image optimisation is opt-in; leaving disabled for now to avoid surprise
    // billing during the comparison phase. Flip to `true` after we benchmark.
    imageService: false,
    // Surface Web Vitals in the Vercel dashboard at no extra runtime cost.
    webAnalytics: { enabled: false },
  });
}

// https://astro.build/config
export default defineConfig({
  // Server output is required for SSR and visual editing
  output: 'server',
  adapter: selectAdapter(),
  // Passthrough image service: don't bundle `sharp`. Avoids the Vercel adapter's
  // esbuild step choking on Sharp's `node:` prefix imports, and matches our
  // decision to skip platform image optimisation during the comparison phase.
  // All <Image> tags will pass src/width/height through verbatim — the source
  // (Sanity CDN) already serves optimised images via URL params.
  image: {
    service: passthroughImageService(),
  },
  checker: {
    typescript: false,
  },
  vite: {
    plugins: [tailwindcss()],
    // Production build: minify JS/CSS (default true; set explicitly so it's guaranteed)
    build: {
      minify: 'esbuild', // fast; use true for default (esbuild)
      cssMinify: true,
    },
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: true, // Enable CDN for faster reads of published content
      apiVersion: "2024-12-08", // Set to date of setup to use the latest API version
      // No studioBasePath - using standalone studio
      stega: {
        // Default to localhost for development, use env var for production
        studioUrl: process.env.PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
      },
    }),
    react(), // Required for visual editing
    // Astrobook: only include in dev/preview — adds ~11 MB to production build (storybook pages,
    // story JS bundles, Google Fonts CSS import). Excluding it from production builds reduces
    // deploy size from ~17 MB to ~6 MB and removes the Google Fonts @import from the CSS bundle.
    ...(process.env.NODE_ENV === 'production' ? [] : [
      astrobook({
        directory: 'src/stories',
        subpath: '/storybook',
        css: ['./src/styles/global.css', './src/styles/storybook.css'],
      }),
    ]),
  ],
});
