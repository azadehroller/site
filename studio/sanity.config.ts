import {defineConfig} from 'sanity'
import {deskStructure} from './deskStructure'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './src/lib/presentation/resolve'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Automatically detect environment and set preview URL accordingly
// - When Studio runs on localhost, ALWAYS use local Astro dev server
// - When Studio runs in production (deployed), use production URL
const productionPreviewUrl = 'https://sa-rolls.netlify.app'
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
      allowOrigins: ['http://localhost:*', 'https://sa-rolls.netlify.app', 'https://*.sanity.studio'],
    }),
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
})
