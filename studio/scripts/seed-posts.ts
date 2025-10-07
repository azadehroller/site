import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'
import {resolve} from 'path'
import {randomUUID} from 'crypto'

// Load environment variables from .env file
dotenv.config({path: resolve(__dirname, '../.env')})

// Load environment variables
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is required')
  console.log('Create a token at: https://sanity.io/manage')
  console.log('Then run: SANITY_API_TOKEN=your-token npm run seed')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-12-08',
})

const demoPosts = [
  {
    _type: 'post',
    title: 'Getting Started with Web Development',
    slug: {_type: 'slug', current: 'getting-started-web-development'},
    excerpt: 'Learn the fundamentals of web development and start your journey into building modern websites.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Web development is an exciting field that combines creativity with technical skills. In this guide, we\'ll explore the basics of HTML, CSS, and JavaScript.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'The Future of JavaScript Frameworks',
    slug: {_type: 'slug', current: 'future-javascript-frameworks'},
    excerpt: 'Exploring the evolving landscape of JavaScript frameworks and what developers should know.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'JavaScript frameworks continue to evolve at a rapid pace. From React to Vue, Svelte to Solid, each framework brings unique approaches to building user interfaces.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Understanding TypeScript Benefits',
    slug: {_type: 'slug', current: 'understanding-typescript-benefits'},
    excerpt: 'Discover why TypeScript has become the preferred choice for large-scale JavaScript applications.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'TypeScript adds static typing to JavaScript, helping developers catch errors early and write more maintainable code. Its adoption has grown significantly in recent years.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Building Responsive Layouts with CSS Grid',
    slug: {_type: 'slug', current: 'responsive-layouts-css-grid'},
    excerpt: 'Master CSS Grid to create flexible and responsive layouts with ease.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'CSS Grid revolutionized web layout design. It provides a powerful two-dimensional layout system that makes creating complex responsive designs much simpler than before.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Introduction to Astro: The Modern Static Site Builder',
    slug: {_type: 'slug', current: 'introduction-to-astro'},
    excerpt: 'Learn about Astro, a new approach to building fast, content-focused websites.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Astro is a modern static site builder that delivers lightning-fast performance by shipping zero JavaScript by default. It\'s perfect for content-focused websites.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Mastering Git and Version Control',
    slug: {_type: 'slug', current: 'mastering-git-version-control'},
    excerpt: 'Essential Git commands and workflows every developer should know.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Git is an essential tool for modern software development. Understanding branching, merging, and collaboration workflows is crucial for working in teams.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Web Performance Optimization Techniques',
    slug: {_type: 'slug', current: 'web-performance-optimization'},
    excerpt: 'Practical tips to make your websites faster and more efficient.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Website performance directly impacts user experience and SEO. From image optimization to lazy loading, there are many techniques to speed up your site.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Accessible Web Design Principles',
    slug: {_type: 'slug', current: 'accessible-web-design-principles'},
    excerpt: 'Creating inclusive websites that everyone can use, regardless of ability.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Web accessibility ensures that everyone, including people with disabilities, can use your website. Following WCAG guidelines helps create more inclusive digital experiences.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'The Rise of Edge Computing',
    slug: {_type: 'slug', current: 'rise-of-edge-computing'},
    excerpt: 'How edge computing is transforming web application deployment and performance.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Edge computing brings computation closer to users, reducing latency and improving performance. Platforms like Vercel Edge and Cloudflare Workers are making this technology accessible.',
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Content Management with Sanity CMS',
    slug: {_type: 'slug', current: 'content-management-sanity-cms'},
    excerpt: 'Explore the power of structured content and headless CMS architecture.',
    body: [
      {
        _key: randomUUID(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: randomUUID(),
            _type: 'span',
            text: 'Sanity is a headless CMS that treats content as data. Its flexible content modeling and real-time collaboration features make it ideal for modern web applications.',
          },
        ],
      },
    ],
  },
]

async function seedPosts() {
  console.log('Starting to seed blog posts...')

  try {
    for (const post of demoPosts) {
      const result = await client.create(post)
      console.log(`✓ Created post: ${post.title} (ID: ${result._id})`)
    }

    console.log('\n✅ Successfully created 10 demo blog posts!')
    console.log('You can now view them in your Sanity Studio.')
  } catch (error) {
    console.error('Error creating posts:', error)
    process.exit(1)
  }
}

seedPosts()
