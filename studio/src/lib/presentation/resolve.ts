import {defineDocuments, defineLocations} from 'sanity/presentation'

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
}

// Configures documents presentation tool should open by default when navigating to an URL
export const mainDocuments = defineDocuments([
  {
    route: '/post/:slug',
    filter: `_type == "post" && slug.current == $slug`,
  },
])
