// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, __dirname, "");
import sanity from '@sanity/astro'
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;


// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

// https://astro.build/config
export default defineConfig({
  // Server output is required for SSR and visual editing
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2024-12-08", // Set to date of setup to use the latest API version
      // No studioBasePath - using standalone studio
      stega: {
        // Default to localhost for development, use env var for production
        studioUrl: process.env.PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
      },
    }),
    react(), // Required for visual editing
  ],
});
