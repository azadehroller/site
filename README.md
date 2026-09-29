# ROLLER site

Marketing site for [roller.software](https://www.roller.software). An npm-workspaces monorepo:

| Workspace | What | Local URL |
|---|---|---|
| [`astro-app/`](astro-app/README.md) | Astro 4 SSR frontend | http://localhost:4321 |
| [`studio/`](studio/) | Sanity v5 Studio (schemas, desk structure, Presentation) | http://localhost:3333 |

Sanity project `rh0t6x75`, dataset `production`.

## Getting started

Requires Node 20 (`nvm use`).

```bash
npm install --legacy-peer-deps
cp astro-app/.env.example astro-app/.env   # fill in project ID + SANITY_API_READ_TOKEN
cp studio/.env.example studio/.env         # fill in SANITY_STUDIO_PROJECT_ID
npm run dev                                # starts the frontend and the Studio
```

Sign in to the local Studio with your Sanity account. Open **Presentation** to edit pages visually against the local frontend.

Never commit `.env` files. They are gitignored, and only the `.env.example` templates belong in git.

## Visual editing

Visual editing needs `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` and a Viewer token in `SANITY_API_READ_TOKEN`. The Studio's Presentation tool calls `/api/draft-mode/enable`, which sets the `sanity-preview` cookie. The overlay and draft content load only when that cookie is present, so normal visitors never download the React bundle.

If Presentation can't connect:

- Check the token and that the project ID matches in both `.env` files.
- Restart both dev servers after changing an `.env` file.
- Make sure the frontend origin is listed in the project's CORS origins at [sanity.io/manage](https://sanity.io/manage), with credentials allowed.

## More docs

- [`astro-app/README.md`](astro-app/README.md): frontend structure, block rendering, path aliases
- [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md): Vercel/Netlify, Studio deploy, cache purge webhook
- [`CLAUDE.md`](CLAUDE.md): architecture notes and gotchas
