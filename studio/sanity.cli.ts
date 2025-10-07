/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
  deployment: {
    appId: 'ibwfcr9lpav9nc8f3h4n2nj3',
    autoUpdates: true,
  },
  vite: (config: any) => {
    // Inject environment variables during build
    return {
      ...config,
      define: {
        ...config.define,
        'process.env.SANITY_STUDIO_PREVIEW_URL': JSON.stringify(
          process.env.SANITY_STUDIO_PREVIEW_URL || ''
        ),
      },
    }
  },
})
