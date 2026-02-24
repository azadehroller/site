// Local preview config: uses Node adapter so "astro preview" works.
// Netlify adapter does not support preview; use this for production-like local testing.
// Deployment still uses the default astro.config.mjs (Netlify).
import baseConfig from "./astro.config.mjs";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...baseConfig,
  adapter: node({ mode: "standalone" }),
});
