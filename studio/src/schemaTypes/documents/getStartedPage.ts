import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Get Started Page schema - Singleton document for the Get Started page
 * Part of the Singles collection
 */

export default defineType({
  name: 'getStartedPage',
  title: 'Get Started Page',
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
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange sections for the Get Started page',
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
        title: '🚀 Get Started',
      }
    },
  },
})
