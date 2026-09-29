# CLAUDE.md

ROLLER marketing site (www.roller.software): an Astro 4 SSR frontend backed by a Sanity v5 Studio. It is an npm workspaces monorepo on Node 20 (`.nvmrc`).

See `README.md` (setup), `astro-app/README.md` (frontend structure) and `DEPLOYMENT_GUIDE.md` (hosting, webhook). When a doc disagrees with the code, the code is correct.

## Layout

```
astro-app/   Astro frontend (SSR, output: 'server')          → localhost:4321
studio/      Sanity Studio (schemas, desk structure, Presentation) → localhost:3333
archive/     Retired Astrobook stories. Not built.
figma-screenshots/, *.html   Design references only. `*.html` is gitignored.
temp/        Scratch area, gitignored.
```

## Commands

Run from the repo root unless noted:

```bash
npm install --legacy-peer-deps           # CI uses this flag; peer conflicts break a plain install
npm run dev                              # Astro + Studio concurrently

npm run build     --workspace=astro-app  # production build (8 GB heap)
npm run check     --workspace=astro-app  # astro check
npm run typecheck --workspace=astro-app  # tsc --noEmit
npm run storybook --workspace=astro-app  # Astrobook at /storybook (dev only)
npm run preview   --workspace=astro-app  # build + preview via astro.preview.config.mjs

npm run deploy    --workspace=studio     # sanity deploy
npm run seed      --workspace=studio     # scripts/seed-posts.ts (needs SANITY_API_TOKEN)
```

There is no test suite and no lint script. Use `typecheck` and `check` to verify changes. `astro.config.mjs` sets `checker.typescript: false`, so the build does not type-check for you.

## Environment

- `astro-app/.env`: see `astro-app/.env.example`. The key variables are `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` (the `PUBLIC_SANITY_STUDIO_*` names are aliases for the same values), `SANITY_API_READ_TOKEN` (server-only, needed for drafts), `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`, `PUBLIC_SANITY_STUDIO_URL`, `SANITY_WEBHOOK_SECRET`, the purge tokens (`NETLIFY_*` / `VERCEL_*`), and `SITE`.
- `studio/.env`: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and optionally `SANITY_STUDIO_PREVIEW_URL`.
- Never commit secrets. `.env` files are gitignored, and only `.env.example` templates are tracked.

## Hosting

- **Vercel is primary. Netlify is kept as a fallback** during a migration and comparison phase. `astro.config.mjs` `selectAdapter()` picks the adapter from `DEPLOY_TARGET`, then `VERCEL`, then `NETLIFY`, and defaults to Vercel.
- Vercel config lives in `astro-app/vercel.json`. Netlify config lives in the root `netlify.toml`. Both set `X-Robots-Tag: noindex` on every route.
- On Vercel, middleware must stay `edgeMiddleware: false`. The Edge runtime forbids WASM compilation, which silently breaks A/B cookies, geo, and cache sharding. The config comment explains this.
- Images use `passthroughImageService`: there is no sharp. Resizing is done through Sanity CDN URL params (`@utils/image` → `urlFor`).
- Astrobook is excluded when `NODE_ENV=production`.
- Deployed Studio: `https://roller-software.sanity.studio`, pinned by `appId` in `studio/sanity.cli.ts`. `sa-rolls.sanity.studio` is an old host, so don't reintroduce it. Presentation previews point at the Vercel app and also allow the Netlify origin.

## Frontend architecture (`astro-app/src`)

### Path aliases

The aliases are defined in `tsconfig.json`: `@components`, `@utils`, `@layouts`, `@templates`, `@styles`, `@types`. Use them instead of `../` imports.

### Data fetching

- `sanity/queries/*.ts` holds GROQ queries and fetch functions grouped by domain. `sanity/types.ts` holds the hand-written result types (there is no typegen). `sanity/index.ts` re-exports both.
- `utils/sanity.ts` is a backward-compatible barrel only. Import from `@utils/sanity`, but edit the files under `src/sanity/`.
- Every fetch goes through `utils/loadQuery.ts` `loadQuery({ query, params, request, queryType })`:
  - It reads the `sanity-preview` cookie. When the cookie is set, it fetches with the token, turns stega and source maps on, disables the CDN, and uses the perspective from the `sanity-preview-perspective` cookie (default `drafts`).
  - Published reads go through an in-memory stale-while-revalidate cache. The TTL is tiered by `queryType` (`global` 30 min, `page` 10 min, `default` 5 min in prod; 1 min in dev).
  - **Always pass `Astro.request`.** Without it, preview mode can't be detected.
- `getLayoutData(request)` fetches the header, footer, and other globals. Pages fetch it in parallel with the page data and pass it to `Layout` as `layoutSanity`.

### Rendering pipeline

- `pages/*` are thin route files. They fetch data and render `layouts/Layout.astro`, plus a `templates/*` component for the more complex landing pages.
- A page's `sections[]` is dispatched by `_type`, for example in `pages/[slug].astro`: `columnsBlock` → `components/blocks/Columns.astro`, plus `standaloneTwoColumnBlock` and `twoColumnSection`.
- Each column's content array is rendered by **`components/blocks/ColumnContent.astro`**, the main block dispatcher. It is an `if/else` chain on `item._type` that maps each type to a component in `components/blocks/` or `components/globals/`.
- `*Reference` types (for example `logoSetReference` and `widgetStatsReference`) point at singleton or global documents defined in `studio/src/schemaTypes/documents/globals.ts` and related files.
- `pages/[slug].astro` is the catch-all. It tries `landingPage` first, then `page`. For a missing document it returns `new Response(null, {status: 404})`. Never redirect to `/404` from this route: the redirect would loop back into the catch-all.
- Blog post bodies are Portable Text rendered by `components/blog/Blog*Block.astro`.

### Adding or changing a content block

A block touches several places, and each one must be updated:

1. Studio schema: `studio/src/schemaTypes/objects/<block>.ts`, registered in `studio/src/schemaTypes/index.ts`.
2. Allow the block in column content: `studio/src/schemaTypes/objects/columnsBlock.ts`, and anywhere else it should be insertable.
3. GROQ projection: the `_type == '<block>' => {...}` projections are **duplicated across many query files**. These include `pages.ts` (both `getPage` and `getLandingPage`), `homepage.ts`, `features.ts`, `industries.ts`, `product.ts`, `partners.ts`, `competitors.ts`, `solutions.ts`, and `get-started.ts`. Grep for an existing block type to find them all. A missing projection means missing fields on that page type.
4. Type: add it to `astro-app/src/sanity/types.ts` and the `ColumnContent` union.
5. Component: add it in `components/blocks/`, then add a branch in `ColumnContent.astro`.
6. Presentation routing (for new document types only): update `studio/src/lib/presentation/resolve.ts`, `studio/deskStructure.ts`, and the type → URL map in `pages/api/revalidate.ts`.

### Visual editing (Sanity Presentation)

- The React bundle loads **only** when `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` **and** the `sanity-preview` cookie is present. The cookie is set by `/api/draft-mode/enable` and cleared by `/api/draft-mode/disable`. Normal visitors never get React.
- Stega embeds invisible characters in strings. Pass any string used as a CSS value, class name, variant key, `switch` value, URL, or animation input through `cleanStega()` (`@utils/stega`). Otherwise comparisons fail in preview mode only. Visible text should keep its stega characters.
- For click-to-edit on nested items, use `createBlockEditInfo` / `createDataSanityAttrs` from `@utils/visualEditing`. Pass `documentId`, `documentType`, `sectionKey`, and `columnName` down through the components, following the existing pattern.
- `components/ui/SanityVisualEditing.tsx` wraps `<VisualEditing>` to sync `onPerspectiveChange` into the perspective cookie.

### Middleware and caching (`src/middleware.ts`)

- It returns 404 for `/_debug/*` outside dev.
- For each page request it assigns A/B cookies (`ab-test`, `ab-headingComposition`) and resolves geo (`utils/experiments.ts`). The results are exposed on `Astro.locals.abTest`, `abTestHeadingComposition`, and `geo`.
- The experiment IDs in `utils/experiments.ts` must match `fieldLevelExperiments` in `studio/sanity.config.ts`.
- The middleware is the **single source of truth for SSR page cache headers**. It sets `Cache-Control`, `Netlify-CDN-Cache-Control`, `CDN-Cache-Control`, `Netlify-Vary`, and `Vary: x-ab-variant`. Don't add page cache headers in `netlify.toml` or `vercel.json`.
- Preview and `/api/*` responses are never cached.
- `/api/revalidate` is the Sanity webhook. It checks the HMAC signature, clears the `loadQuery` cache, and purges the Netlify and/or Vercel CDN.

### Third-party scripts

`utils/host.ts` `isProductionHost()` gates analytics, consent (Usercentrics), and HubSpot so they only run on `www.roller.software`. Staging builds are still `PROD`, so the check happens per request. `PUBLIC_ENABLE_THIRD_PARTY_SCRIPTS=true` forces the scripts on. The consent and HubSpot loaders live in `public/scripts/`.

### Other

- `/api/chat` + `components/chat/` is an AI chat widget. It answers with Ollama (`utils/ai/ollama.ts`, `OLLAMA_URL`) from keyword-searched Sanity content configured by the `chatbotConfig` document. It uses `utils/rateLimit.ts`.
- Animations use GSAP and lottie-web.

## Styling

- `src/styles/index.css` is the **only** CSS entry point, and only `Layout.astro` imports it. Partials are imported only from `index.css`, and the file order matters: reset → tokens (`colors`, `spacings`, `typography`, `breakpoints`) → `layout` → `*-utils` → `integrations` → `global`.
- Use the design-system CSS variables, for example `--primary-50`, `--secondary-50`, `--neutral-*`, and the spacing and type tokens. Don't hardcode a hex or size when a matching token exists.
- Component styles live in scoped `<style>` blocks inside `.astro` files.
- There is **no Tailwind**. `utilities.css`, `layout.css` and `*-utils.css` define a fixed set of plain-CSS utility classes with Tailwind-style names (in `@layer utilities`). Only classes defined there exist: there are no responsive prefixes (`md:`) and no arbitrary values. Handle responsive behaviour with `@media` in the component's `<style>`.
- **Figma is the style source** (see `.cursor/rules/figma-first-styling.mdc`). When building or restyling a section, pull specs with the Figma MCP (`get_design_context` + `get_variable_defs`) for the desktop and mobile nodes, then map them onto the existing tokens. Don't style from `figma-screenshots/` or `library.html` images alone.

## Studio (`studio/`)

- `sanity.config.ts` configures the structure tool (with `deskStructure.ts`), Vision, Presentation (with `src/lib/presentation/resolve.ts` for document → URL locations), and the personalization plugin (field-level experiments).
- A custom document action removes publish and unpublish from `industry` and `feature` documents marked `isTemplate`.
- Schemas are split into `src/schemaTypes/documents/` (pages, singletons, globals) and `src/schemaTypes/objects/` (blocks). Every schema must be registered in `src/schemaTypes/index.ts`.
- Prettier settings (in `studio/package.json`): no semicolons, single quotes, `printWidth` 100, no bracket spacing. Match that style in Studio code. `astro-app` code mostly uses semicolons and double quotes in `.astro` files. Follow the file you're editing.

## Conventions

- Commits follow Conventional Commits with a scope, for example `fix(visual-editing): …`, `feat(blocks): …`, `chore(deps): …`, `refactor(globals): …`.
- Make Sanity props null-safe (`?.` and defaults). Content may be partially filled in drafts.
- Pages that need SSR set `export const prerender = false`. The whole app is SSR anyway, because it uses `output: 'server'`.
