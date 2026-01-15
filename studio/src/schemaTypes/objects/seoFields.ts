import {defineField} from 'sanity'

/**
 * Reusable SEO fields for page documents
 * These fields should be added to the 'seo' group in each page schema
 */

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    group: 'seo',
    description: 'Override the page title for search engines (recommended: 50-60 characters)',
    validation: (Rule) => Rule.max(70).warning('SEO titles should be under 70 characters'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    group: 'seo',
    rows: 3,
    description: 'Meta description for search engines (recommended: 150-160 characters)',
    validation: (Rule) => Rule.max(320).warning('Meta descriptions should be under 160 characters for best results'),
  }),
  defineField({
    name: 'seoImage',
    title: 'Social Share Image',
    type: 'image',
    group: 'seo',
    description: 'Image used when sharing on social media (Open Graph / Twitter). Recommended size: 1200x630 pixels',
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
    description: 'If enabled, this page will not be indexed by search engines',
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

/**
 * SEO group definition to add to document schemas
 */
export const seoGroup = {
  name: 'seo',
  title: 'SEO',
}
