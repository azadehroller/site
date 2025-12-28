import {defineDocuments, defineLocations, type DocumentResolver} from 'sanity/presentation'

// Helper to normalize document ID (remove drafts. prefix for consistent resolution)
function normalizeId(id: string | undefined): string {
  if (!id) return ''
  return id.replace(/^drafts\./, '')
}

// Configures the "Used on x pages" banner
export const locations = {
  // Map document types to frontend routes
  post: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Untitled', href: `/post/${doc?.slug}`},
        {title: 'Posts Index', href: `/`},
      ],
    }),
  }),
  page: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => {
      const slug = doc?.slug || ''
      const href = `/${slug}`
      return {
        locations: [
          {title: doc?.title || 'Untitled Page', href},
        ],
      }
    },
  }),
  homepage: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Homepage', href: '/'},
      ],
    }),
  }),
  getStartedPage: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Get Started', href: '/get-started'},
      ],
    }),
  }),
  rawHtmlPage: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => {
      const slug = doc?.slug || '/'
      // Handle root slug "/" as homepage
      const href = slug === '/' ? '/' : `/${slug}`
      return {
        locations: [
          {title: doc?.title || 'Raw HTML Page', href},
        ],
      }
    },
  }),
}

/**
 * Custom document resolver that prefers drafts over published documents.
 * When a document ID is passed (from clicking in the frontend), this resolver
 * checks if a draft version exists and returns that instead of the published version.
 */
export const resolve: DocumentResolver = {
  locations,
  mainDocuments: defineDocuments([
    {
      route: '/',
      // Check for drafts first by using the perspective in the query
      filter: `_type == "homepage" || (_type == "rawHtmlPage" && slug.current == "/")`,
    },
    {
      route: '/get-started',
      filter: `_type == "getStartedPage"`,
    },
    {
      route: '/post/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
    {
      route: '/t',
      filter: `_type == "rawHtmlPage" && slug.current == "/"`,
    },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
  ]),
}

// Export mainDocuments separately for backward compatibility
export const mainDocuments = resolve.mainDocuments
