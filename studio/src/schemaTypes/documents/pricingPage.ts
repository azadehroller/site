import {defineField, defineType} from 'sanity'

/**
 * Pricing Page schema - Singleton document for the pricing page
 */

export default defineType({
  name: 'pricingPage',
  title: 'Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Pricing',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A subtitle or tagline for the pricing page',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the pricing page',
      of: [
        {
          type: 'columnsBlock',
        },
        {
          type: 'divider',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '💰 Pricing',
      }
    },
  },
})

