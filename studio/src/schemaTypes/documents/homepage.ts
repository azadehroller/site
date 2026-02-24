import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Homepage schema - Singleton document for the homepage
 */

export default defineType({
  name: 'homepage',
  title: 'Homepage',
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
      initialValue: 'Home',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the homepage',
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
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
          {title: 'Industry Report', value: 'industry_report'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'announcementBarSettings',
      group: 'settings',
    }),
    defineField({
      name: 'newTitle',
      title: 'New Title (Experiment)',
      type: 'experimentString',
      description: 'A/B test variant for the homepage title',
      group: 'content',
    }),
    // SEO
    ...seoFields,
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Homepage',
      }
    },
  },
})
