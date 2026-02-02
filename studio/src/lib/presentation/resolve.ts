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
        {title: doc?.title || 'Untitled', href: `/blog/${doc?.slug}`},
        {title: 'Blog Index', href: `/blog`},
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
  industriesLandingPage: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Industries', href: '/industries'},
      ],
    }),
  }),
  featuresLandingPage: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Features', href: '/features'},
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
  feature: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Feature', href: `/features/${doc?.slug}`},
      ],
    }),
  }),
  industry: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Industry', href: `/industries/${doc?.slug}`},
      ],
    }),
  }),
  solution: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Solution', href: `/solutions/${doc?.slug}`},
      ],
    }),
  }),
  testPage: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Test Page', href: '/test'},
      ],
    }),
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
      route: '/industries',
      filter: `_type == "industriesLandingPage"`,
    },
    {
      route: '/features',
      filter: `_type == "featuresLandingPage"`,
    },
    {
      route: '/blog/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
    {
      route: '/features/:slug',
      filter: `_type == "feature" && slug.current == $slug`,
    },
    {
      route: '/industries/:slug',
      filter: `_type == "industry" && slug.current == $slug`,
    },
    {
      route: '/solutions/:slug',
      filter: `_type == "solution" && slug.current == $slug`,
    },
    {
      route: '/test',
      filter: `_type == "testPage"`,
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
