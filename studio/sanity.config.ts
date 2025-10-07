import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {locations, mainDocuments} from './src/lib/presentation/resolve'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'


export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve: {locations, mainDocuments},
      previewUrl: [
        // Local development
        {
          origin: 'http://localhost:4321',
          previewMode: {
            enable: '/api/draft-mode/enable',
            disable: '/api/draft-mode/disable',
          }
        },
        // Production
        {
          origin: 'https://sa-rolls.netlify.app',
          previewMode: {
            enable: '/api/draft-mode/enable',
            disable: '/api/draft-mode/disable',
          }
        }
      ],
      allowOrigins: ['http://localhost:*', 'https://sa-rolls.netlify.app'],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
