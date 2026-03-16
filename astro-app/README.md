# astro-app

Astro-based marketing site with Sanity CMS, Tailwind CSS, and Netlify SSR.

## Stack

| Tool | Purpose |
|---|---|
| [Astro 4](https://astro.build) | Framework + file-based routing |
| [Sanity](https://sanity.io) | Headless CMS + Visual Editing |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [React](https://react.dev) | Required for Sanity Visual Editing only |
| [Netlify](https://netlify.com) | Hosting + Edge Functions |
| [Astrobook](https://astrobook.dev) | Component storybook |

## Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run storybook    # Open component storybook at /storybook
npm run build        # Production build
npm run preview      # Build + preview with Sanity draft mode
npm run check        # Astro type check
npm run typecheck    # TypeScript type check
```

## Path Aliases

Defined in [`tsconfig.json`](tsconfig.json). Use these instead of relative `../` imports:

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@utils/*` | `src/utils/*` |
| `@layouts/*` | `src/layouts/*` |
| `@templates/*` | `src/templates/*` |
| `@styles/*` | `src/styles/*` |
| `@types/*` | `src/types/*` |

```ts
// ✅ Use this
import Layout from '@layouts/Layout.astro';
import { getHomepage } from '@utils/sanity';

// ❌ Not this
import Layout from '../../layouts/Layout.astro';
```

## Project Structure

```
astro-app/
├── astro.config.mjs
├── tsconfig.json
├── .env                          ← secrets (never commit)
├── .env.example                  ← template for required env vars
│
├── public/
│   ├── images/icons/             ← SVG industry icons
│   ├── scripts/                  ← consent-controller, hubspot-forms, regional-consent
│   └── robots.txt
│
└── src/
    ├── env.d.ts                  ← Astro environment type definitions
    ├── middleware.ts             ← A/B test assignment + geo detection
    │
    ├── components/               ← @components/*
    │   ├── blocks/               ← CMS-driven content blocks (rendered by ColumnContent)
    │   │   ├── AdvancedImage.astro
    │   │   ├── Button.astro
    │   │   ├── ButtonStack.astro
    │   │   ├── CardSegmentation.astro
    │   │   ├── ColumnContent.astro   ← main block dispatcher
    │   │   ├── Columns.astro
    │   │   ├── ComparisonTable.astro
    │   │   ├── Divider.astro
    │   │   ├── FAQs.astro
    │   │   ├── FeaturesDetail.astro
    │   │   ├── FeaturesHorizontalSlider.astro
    │   │   ├── FeaturesPricingCard.astro
    │   │   ├── FeaturesStackedContent.astro
    │   │   ├── HeadingComposition.astro
    │   │   ├── HubspotForm.astro
    │   │   ├── ImageVideoModal.astro
    │   │   ├── IndustrySelector.astro
    │   │   ├── LogoSet.astro
    │   │   ├── Quote.astro
    │   │   ├── ResultsList.astro
    │   │   ├── RotatingText.astro
    │   │   ├── StatsSet.astro
    │   │   ├── TestimonialSlider.astro
    │   │   ├── TrustedPartner.astro
    │   │   └── WidgetUserReviewCard.astro
    │   │
    │   ├── blog/                 ← Portable Text renderers for blog post body
    │   │   ├── BlogFAQBlock.astro
    │   │   ├── BlogImageBlock.astro
    │   │   ├── BlogQuoteBlock.astro
    │   │   ├── BlogRawHtmlBlock.astro
    │   │   ├── BlogTableBlock.astro
    │   │   ├── BlogTableData.astro
    │   │   ├── BlogTextBlock.astro
    │   │   └── BlogVideoBlock.astro
    │   │
    │   ├── chat/                 ← AI chatbot
    │   │   └── ChatWidget.astro
    │   │
    │   ├── globals/              ← site-wide layout-level components
    │   │   ├── AnnouncementBar.astro
    │   │   ├── FeaturesSelector.astro
    │   │   ├── Footer.astro
    │   │   ├── Header.astro
    │   │   ├── IndustrySelectorGlobal.astro
    │   │   ├── StatsSetStackedGlobal.astro
    │   │   ├── TestimonialCarousel.astro
    │   │   ├── WidgetStats.astro
    │   │   └── WidgetUserReviews.astro
    │   │
    │   ├── tracking/             ← analytics + A/B experiment tracking
    │   │   └── ExperimentTracking.astro
    │   │
    │   └── ui/                   ← shared primitive UI components
    │       ├── Card.astro
    │       ├── ImageBlock.astro
    │       ├── InlineImage.astro
    │       ├── Pagination.astro
    │       ├── PortableTextLink.astro
    │       ├── RawHtml.astro
    │       ├── SanityImage.astro
    │       ├── VisualEditingIdle.astro
    │       └── Welcome.astro
    │
    ├── layouts/                  ← @layouts/*
    │   └── Layout.astro          ← base HTML shell (head, header, footer, SEO)
    │
    ├── pages/                    ← file-based routing (Astro convention)
    │   ├── index.astro           ← homepage
    │   ├── [slug].astro          ← generic CMS page
    │   ├── get-started.astro
    │   ├── test.astro            ← dev only (404 in production)
    │   ├── debug-preview.astro   ← dev only (404 in production)
    │   ├── api/
    │   │   ├── chat.ts           ← AI chatbot endpoint
    │   │   ├── revalidate.ts     ← Sanity on-demand revalidation
    │   │   ├── test-cookies.ts
    │   │   ├── debug-preview.ts
    │   │   ├── blog/
    │   │   │   ├── search.ts
    │   │   │   └── debug-post.ts
    │   │   └── draft-mode/
    │   │       ├── enable.ts     ← sets sanity-preview cookie
    │   │       └── disable.ts
    │   ├── blog/
    │   │   ├── index.astro
    │   │   ├── [slug].astro
    │   │   ├── page/[page].astro
    │   │   ├── author/[slug].astro
    │   │   └── topic/[slug].astro
    │   ├── competitors/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── features/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── industries/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── partners/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   └── solutions/
    │       └── [slug].astro
    │
    ├── templates/                ← @templates/*  page content components called by pages/
    │   ├── blog/
    │   │   └── BlogLanding.astro
    │   ├── competitors/
    │   │   └── CompetitorsLanding.astro
    │   ├── page/
    │   │   ├── HomePage.astro
    │   │   ├── Industries.astro
    │   │   └── GetStarted.astro
    │   └── partners/
    │       └── PartnersLanding.astro
    │
    ├── stories/                  ← Astrobook component stories (mirrors blocks/)
    │   └── *.stories.ts
    │
    ├── styles/                   ← @styles/*
    │   ├── global.css            ← Tailwind + global resets
    │   └── storybook.css         ← Storybook-specific overrides
    │
    ├── types/                    ← @types/*  shared TypeScript types
    │   └── index.ts              ← see file for extraction roadmap
    │
    └── utils/                    ← @utils/*
        ├── ai/                   ← LLM integrations
        │   ├── ollama.ts         ← answer generation (active)
        │   ├── openai.ts         ← OpenAI client (unused)
        │   └── vectorDb.ts       ← vector search (replaced by keyword search)
        ├── experiments.ts        ← A/B test value resolution
        ├── hubspot-loader.ts     ← HubSpot content loader (unused)
        ├── image.ts              ← Sanity image URL builder helpers
        ├── index.ts              ← shared utility functions (formatDate, etc.)
        ├── loadQuery.ts          ← Sanity GROQ query executor + cache
        ├── rateLimit.ts          ← API rate limiting
        ├── sanity.ts             ← all GROQ queries + exported TS types
        ├── sanityClientWithToken.ts ← authenticated Sanity client (draft mode)
        ├── sanityCmsContent.ts   ← keyword search over CMS content (chatbot)
        ├── stega.ts              ← Sanity stega string cleaning helpers
        └── visualEditing.ts      ← Visual Editing attribute helpers
```

## Pages → Templates pattern

Pages in `pages/` are thin route files. Heavy lifting lives in `templates/`:

```
pages/industries/index.astro  →  fetches data  →  renders templates/page/Industries.astro
pages/blog/index.astro        →  fetches data  →  renders templates/blog/BlogLanding.astro
```

This keeps routes clean and templates independently testable/reusable.

## CMS Content Blocks

All page content is CMS-driven. The rendering chain is:

```
Sanity document
  └── sections[]  (columnsBlock | divider | ...)
        └── Columns.astro
              └── ColumnContent.astro   ← dispatches to the right block component
                    └── blocks/*.astro
```

Adding a new block type: create `components/blocks/MyBlock.astro`, add the case to `ColumnContent.astro`, and register the schema in the Sanity `studio/`.

## Environment Variables

See `.env.example` for required variables. Key ones:

```bash
PUBLIC_SANITY_STUDIO_PROJECT_ID=   # Sanity project ID
PUBLIC_SANITY_STUDIO_DATASET=      # production | staging
PUBLIC_SANITY_STUDIO_URL=          # URL of the Sanity Studio
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true
SANITY_API_READ_TOKEN=             # Sanity viewer token (keep secret)
```
