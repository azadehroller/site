# astro-app

Astro SSR marketing site for [roller.software](https://www.roller.software), with content from Sanity and click-to-edit through Sanity's Presentation tool.

## Stack

| Tool | Purpose |
|---|---|
| [Astro 4](https://astro.build) | Framework, file-based routing, SSR (`output: 'server'`) |
| [Sanity](https://sanity.io) | Headless CMS + Visual Editing |
| Plain CSS + design tokens | Styling (`src/styles/`). Tailwind is **not** used. |
| [React](https://react.dev) | Only for Sanity Visual Editing, and loaded only in preview |
| [Vercel](https://vercel.com) (primary) / [Netlify](https://netlify.com) (fallback) | Hosting. The adapter is chosen in `astro.config.mjs`. |
| [Astrobook](https://github.com/ocavue/astrobook) | Component storybook (dev only) |
| GSAP, lottie-web | Animation |

## Commands

```bash
npm run dev          # Dev server at localhost:4321
npm run storybook    # Component storybook at /storybook
npm run build        # Production build
npm run preview      # Build + preview with Sanity draft mode
npm run check        # astro check
npm run typecheck    # tsc --noEmit
```

There is no test suite. The build does not type-check (`checker.typescript: false`), so run `typecheck` before pushing.

## Path aliases

These are defined in [`tsconfig.json`](tsconfig.json). Use them instead of relative `../` imports:

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@utils/*` | `src/utils/*` |
| `@layouts/*` | `src/layouts/*` |
| `@templates/*` | `src/templates/*` |
| `@styles/*` | `src/styles/*` |
| `@types/*` | `src/types/*` |

## Project structure

```
astro-app/
├── astro.config.mjs          ← adapter selection (Vercel/Netlify), Sanity integration
├── astro.preview.config.mjs  ← config for `npm run preview`
├── vercel.json               ← Vercel headers, redirects, install command
├── public/scripts/           ← consent-controller, regional-consent, hubspot-forms
└── src/
    ├── middleware.ts         ← A/B cookies, geo, CDN cache headers, /_debug gate
    ├── components/
    │   ├── blocks/           ← CMS content blocks; ColumnContent.astro is the dispatcher
    │   ├── blog/             ← Portable Text renderers for blog post bodies
    │   ├── chat/             ← AI chat widget
    │   ├── globals/          ← header, footer, mega menu, global widgets
    │   ├── standaloneTwoColumn/ ← variant helpers for StandaloneTwoColumnBlock
    │   ├── tracking/         ← experiment tracking
    │   └── ui/               ← shared primitives (Btn, Card, media, SanityVisualEditing…)
    ├── layouts/Layout.astro  ← HTML shell, SEO, globals, third-party scripts
    ├── pages/                ← routes: index, [slug] (catch-all), blog, competitors,
    │   │                       features, industries, partners, product, solutions, get-started
    │   ├── api/              ← chat, revalidate (Sanity webhook), draft-mode, blog search
    │   └── _debug/           ← dev-only pages (404 in production)
    ├── sanity/
    │   ├── queries/*.ts      ← GROQ queries + fetch functions, grouped by domain
    │   ├── types.ts          ← hand-written result types
    │   └── index.ts          ← re-exports (imported as `@utils/sanity`)
    ├── stories/              ← Astrobook stories
    ├── styles/index.css      ← the single CSS entry point (imports every other partial)
    ├── templates/            ← page bodies rendered by pages/
    └── utils/
        ├── loadQuery.ts      ← all Sanity fetches: preview detection + in-memory SWR cache
        ├── sanity.ts         ← backward-compatible barrel for src/sanity/
        ├── visualEditing.ts  ← data-sanity attribute helpers
        ├── stega.ts          ← cleanStega() for strings used as values, not text
        ├── experiments.ts    ← A/B test + geo resolution
        ├── host.ts           ← production-host check that gates third-party scripts
        ├── image.ts          ← Sanity image URL builder
        ├── ai/ollama.ts      ← chatbot answer generation
        └── sanityCmsContent.ts, rateLimit.ts, … ← chatbot support
```

## CMS content blocks

All page content comes from the CMS. The rendering chain is:

```
Sanity document
  └── sections[]  (columnsBlock | standaloneTwoColumnBlock | twoColumnSection)
        └── Columns.astro
              └── ColumnContent.astro   ← dispatches on item._type
                    └── blocks/*.astro | globals/*.astro
```

To add a block type, you need all of these:

1. A Studio schema in `studio/src/schemaTypes/objects/`, registered in `schemaTypes/index.ts`.
2. The block allowed in `studio/src/schemaTypes/objects/columnsBlock.ts`.
3. A GROQ projection in **every** query file that renders columns. The projections are duplicated, so grep for an existing block's `_type ==` to find them all.
4. A type in `src/sanity/types.ts`.
5. The component in `components/blocks/`, plus a branch in `ColumnContent.astro`.

## Environment variables

See `.env.example` for the full list. The key ones:

```bash
PUBLIC_SANITY_PROJECT_ID=              # Sanity project ID
PUBLIC_SANITY_DATASET=                 # production
PUBLIC_SANITY_STUDIO_URL=              # deployed Studio URL
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true
SANITY_API_READ_TOKEN=                 # Viewer token — server-only, never commit
SANITY_WEBHOOK_SECRET=                 # /api/revalidate signature
```

`.env` is gitignored. Keep real values out of git.
