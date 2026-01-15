import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Competitors Landing Page schema - Singleton document for the competitors index
 */

export default defineType({
  name: 'competitorsLandingPage',
  title: 'Competitors Landing',
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
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Competitors',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A short description for the competitors landing page',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange sections for the competitors landing page',
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
        title: '⚔️ Competitors Landing',
      }
    },
  },
})
