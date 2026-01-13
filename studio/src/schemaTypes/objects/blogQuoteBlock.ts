import {defineField, defineType} from 'sanity'

/**
 * Customer Quote Block Schema - For customer testimonials/quotes
 * Displays a quote with company logo and attribution
 */
export default defineType({
  name: 'blogQuoteBlock',
  title: 'Customer Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional internal label for this quote block',
    }),
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personTitle',
      title: 'Person Title/Role',
      type: 'string',
      description: 'e.g., "Owner, Playgrounds Cafe"',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Optional Stats',
      type: 'string',
      description: 'Optional large statistic to display above quote (e.g., "2x", "100%")',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'personName',
      media: 'companyLogo',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title ? `"${title.substring(0, 60)}${title.length > 60 ? '...' : ''}"` : 'Customer Quote',
        subtitle: subtitle || 'No attribution',
        media,
      }
    },
  },
})
