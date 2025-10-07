// Sanity client with token for preview URL secret validation
import { createClient } from '@sanity/client'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.PUBLIC_SANITY_STUDIO_DATASET
const token = import.meta.env.SANITY_API_READ_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing required Sanity project configuration')
}

if (!token) {
  throw new Error('SANITY_API_READ_TOKEN is required for preview URL secret validation')
}

export const clientWithToken = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-12-08',
  token,
})
