import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'
import {resolve} from 'path'

// Load environment variables from .env file
dotenv.config({path: resolve(__dirname, '../.env')})

// Load environment variables
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-12-08',
})

async function deletePosts() {
  console.log('Fetching all posts...')

  try {
    const posts = await client.fetch<Array<{_id: string; title: string}>>(
      `*[_type == "post"]{ _id, title }`
    )

    if (posts.length === 0) {
      console.log('No posts found to delete.')
      return
    }

    console.log(`Found ${posts.length} posts. Deleting...`)

    for (const post of posts) {
      await client.delete(post._id)
      console.log(`✓ Deleted: ${post.title} (ID: ${post._id})`)
    }

    console.log('\n✅ Successfully deleted all posts!')
  } catch (error) {
    console.error('Error deleting posts:', error)
    process.exit(1)
  }
}

deletePosts()
