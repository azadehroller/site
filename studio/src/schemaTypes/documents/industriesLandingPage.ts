import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Industries Landing Page schema - Singleton document for the industries index
 */

export default defineType({
  name: 'industriesLandingPage',
  title: 'Industries Landing',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Industries',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description for the industries landing page',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the industries landing page',
      group: 'content',
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
      initialValue: 'dark',
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
    prepare() {
      return {
        title: '🏭 Industries Landing',
      }
    },
  },
})
