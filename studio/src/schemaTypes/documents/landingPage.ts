import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Landing Page document type - For root-level landing pages
 * These pages have slugs directly at the root (e.g., /page-slug)
 */

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: () => '🎯',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'The URL path for this page (e.g., "my-page" will be accessible at /my-page)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange sections for this landing page',
      of: [
        {
          type: 'columnsBlock',
        },
        {
          type: 'divider',
        },
      ],
    }),
    // Settings
    defineField({
      name: 'headerTheme',
      title: 'Header Theme',
      type: 'string',
      group: 'settings',
      description: 'Set the header theme for this page. This affects the header appearance.',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Industry Report', value: 'industry_report' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'announcementBarSettings',
      group: 'settings',
    }),
    // SEO
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Landing Page',
        subtitle: `/${slug}`,
      }
    },
  },
})
