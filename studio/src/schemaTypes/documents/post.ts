import {defineField, defineType} from 'sanity'
import {seoGroup} from '../objects/seoFields'

// Custom SEO fields for blog posts - seoImage inherits from featuredImage if not set
const blogSeoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    group: 'seo',
    description: 'Override the page title for search engines. Defaults to post title if empty.',
    validation: (Rule) => Rule.max(70).warning('SEO titles should be under 70 characters'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    group: 'seo',
    rows: 3,
    description: 'Meta description for search engines. Defaults to excerpt if empty.',
    validation: (Rule) => Rule.max(320).warning('Meta descriptions should be under 160 characters for best results'),
  }),
  // Legacy field from HubSpot migration - kept for backwards compatibility
  defineField({
    name: 'metaDescription',
    title: 'Meta Description (Legacy)',
    type: 'text',
    group: 'seo',
    rows: 3,
    hidden: true,
    description: 'Deprecated: This field was migrated from HubSpot. Please use SEO Description instead.',
  }),
  defineField({
    name: 'seoImage',
    title: 'Social Share Image',
    type: 'image',
    group: 'seo',
    description: 'Override the social share image. If empty, the Featured Image will be used automatically.',
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Alternative text for accessibility',
      }),
    ],
  }),
  defineField({
    name: 'noIndex',
    title: 'Hide from Search Engines',
    type: 'boolean',
    group: 'seo',
    description: 'If enabled, this post will not be indexed by search engines',
    initialValue: false,
  }),
  defineField({
    name: 'canonicalUrl',
    title: 'Canonical URL',
    type: 'url',
    group: 'seo',
    description: 'Optional: Specify if this content exists elsewhere and should point to that URL',
  }),
]

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Metadata'},
    {name: 'hubspot', title: 'HubSpot Data'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
    }),

    // Featured image - now using Sanity assets
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'metadata',
    }),

    // Updated At - for "Last updated" display
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'metadata',
      description: 'Last update date (from HubSpot or manual)',
    }),

    // Topics / Categories
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      group: 'metadata',
      of: [
        {
          type: 'reference',
          to: [{type: 'blogTopic'}],
        },
      ],
      description: 'Blog topics/categories for filtering and related articles',
    }),

    // Author reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'blogAuthor'}],
      group: 'metadata',
    }),

    // Tags (simple string array for additional tagging)
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    // HubSpot reference ID for matching
    defineField({
      name: 'hubspotId',
      title: 'HubSpot Post ID',
      type: 'string',
      group: 'hubspot',
      readOnly: true,
      description: 'Original HubSpot post ID (used for data matching and syncing)',
    }),

    // HubSpot URL for reference
    defineField({
      name: 'hubspotUrl',
      title: 'HubSpot URL',
      type: 'url',
      group: 'hubspot',
      readOnly: true,
      description: 'Original HubSpot URL',
    }),

    // SEO (custom for blog posts - inherits featured image)
    ...blogSeoFields,

    // Body content - STANDALONE modular blocks (not nested)
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      group: 'content',
      description: 'Add content sections. Each block is standalone.',
      of: [
        // Text Block - rich text section with inline images (standalone)
        {type: 'blogTextBlock'},

        // Video Block - embedded video (standalone)
        {type: 'blogVideoBlock'},

        // Image Block - image section (standalone)
        {type: 'blogImageBlock'},

        // Table Block - HTML table (standalone)
        {type: 'blogTableBlock'},

        // Table Data - Structured table (user-friendly, standalone)
        {type: 'blogTableData'},

        // FAQ Block - Accordion-style FAQs (standalone)
        {type: 'blogFAQBlock'},

        // Quote Block - Customer testimonials/quotes (standalone)
        {type: 'blogQuoteBlock'},

        // Raw HTML Block - for complex content (standalone)
        {type: 'blogRawHtmlBlock'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
