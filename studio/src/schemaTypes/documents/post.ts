import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
    {name: 'hubspot', title: 'HubSpot Data'},
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

    // External image support
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'url',
          title: 'Image URL',
          type: 'url',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
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

    // SEO Title (custom title for search engines)
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Custom title for search engines (if different from post title)',
    }),

    // Meta description for SEO
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'SEO meta description (max 160 characters)',
      validation: (rule) => rule.max(300),
    }),

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
