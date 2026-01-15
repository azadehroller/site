import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Pricing Page schema - Singleton document for the pricing page
 */

export default defineType({
  name: 'pricingPage',
  title: 'Pricing',
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
      initialValue: 'Pricing',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A subtitle or tagline for the pricing page',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the pricing page',
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
        title: '💰 Pricing',
      }
    },
  },
})
