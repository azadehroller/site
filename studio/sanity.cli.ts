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
    // App ID of the Sanity-hosted Studio for this project. Pinned so deploys
    // always target the same *.sanity.studio hostname. Look this up in
    // sanity.io/manage → project → Studios → <studio> → App ID.
    appId: 'qxu2nxd8a3u16jo85lmkoa4l',
    autoUpdates: true,
  },
  vite: (config: any) => {
    return {
      ...config,
      define: {
        ...config.define,
        'process.env.SANITY_STUDIO_PREVIEW_URL': JSON.stringify(
          process.env.SANITY_STUDIO_PREVIEW_URL || ''
        ),
      },
      resolve: {
        ...config.resolve,
        dedupe: [
          ...(config.resolve?.dedupe ?? []),
          'sanity',
          '@sanity/types',
          'react',
          'react-dom',
          'styled-components',
        ],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        holdUntilCrawlEnd: true,
      },
    }
  },
})
