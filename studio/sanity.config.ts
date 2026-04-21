import {defineConfig} from 'sanity'
import {deskStructure} from './deskStructure'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './src/lib/presentation/resolve'
import {fieldLevelExperiments} from '@sanity/personalization-plugin'
// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Automatically detect environment and set preview URL accordingly.
// - When Studio runs on localhost → use local Astro dev server.
// - When Studio runs deployed     → use the configured production frontend.
//
// During the Netlify→Vercel migration we run two parallel frontends, so the
// canonical deployed preview URL is selectable. Priority order:
//   1. SANITY_STUDIO_PREVIEW_URL env var (per-deploy override)
//   2. Vercel (new primary)
// Netlify is still reachable from Studio because it's in `allowOrigins`, so an
// editor can paste its URL into Presentation's origin switcher when comparing.
const DEPLOYED_PREVIEW_URLS = {
  vercel: 'https://site-studio-sanity-astro.vercel.app',
  netlify: 'https://sa-rolls.netlify.app',
} as const

const productionPreviewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  DEPLOYED_PREVIEW_URLS.vercel
const developmentPreviewUrl = 'http://localhost:4321'

// Check if we're running locally (works both server-side and client-side)
const isLocalhost = typeof window !== 'undefined' 
  ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  : process.env.NODE_ENV !== 'production'

// ALWAYS use localhost preview when Studio is running locally
// Only use production URL when Studio is deployed
const previewUrl = isLocalhost ? developmentPreviewUrl : productionPreviewUrl


export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool({structure: deskStructure}),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        }
      },
      // Origins Presentation is allowed to iframe. Covers both production
      // deploys + Vercel preview URLs (*.vercel.app) so branch deploys are
      // previewable without a config change.
      allowOrigins: [
        'http://localhost:*',
        DEPLOYED_PREVIEW_URLS.vercel,
        DEPLOYED_PREVIEW_URLS.netlify,
        'https://*.vercel.app',
        'https://*.sanity.studio',
      ],
    }),

    fieldLevelExperiments({
      // Field types that you want to be able to experiment on
      fields: ['string'], 
      // Hardcoded experiments and variants
      experiments: [
        {
          id: 'homepage-title',
          label: 'Homepage Title',
          variants: [
            {
              id: 'control',
              label: 'Control',
            },
            {
              id: 'variant',
              label: 'Variant',
            },
          ],
        },
      ],
    })
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      // Prevent publishing/unpublishing templates for both industries and features
      if (context.schemaType === 'industry' || context.schemaType === 'feature') {
        // Check if document is a template (check document, draft, and published)
        const isTemplate = 
          context.document?.isTemplate === true ||
          context.draft?.isTemplate === true ||
          context.published?.isTemplate === true
        
        if (isTemplate) {
          return prev.filter((action) => {
            // Check the action name/id - actions are objects with an 'action' property
            const actionName = (action as any)?.action || (action as any)?.name || (action as any)?.id
            
            // Filter out publish and unpublish actions
            return actionName !== 'publish' && actionName !== 'unpublish'
          })
        }
      }
      return prev
    },
  },
} as Parameters<typeof defineConfig>[0])
