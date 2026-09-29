import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Product Landing Page — singleton for the Product landing index (/product).
 */

export default defineType({
  name: 'productLandingPage',
  title: 'Product Landing',
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
      initialValue: 'Product',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary for editors (optional)',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Sections for the Product landing page',
      group: 'content',
      of: [{type: 'columnsBlock'}, {type: 'standaloneTwoColumnBlock'}, {type: 'divider'}],
    }),
    defineField({
      name: 'headerTheme',
      title: 'Header Theme',
      type: 'string',
      group: 'settings',
      description: 'Header appearance on this page.',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
          {title: 'Industry Report', value: 'industry_report'},
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
    ...seoFields,
  ],
  preview: {
    prepare() {
      return {
        title: '📦 Product Landing',
      }
    },
  },
})
