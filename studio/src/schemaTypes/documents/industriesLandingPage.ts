import {defineField, defineType} from 'sanity'

/**
 * Industries Landing Page schema - Singleton document for the industries index
 */

export default defineType({
  name: 'industriesLandingPage',
  title: 'Industries Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Industries',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description for the industries landing page',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the industries landing page',
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
        title: '🏭 Industries Landing',
      }
    },
  },
})

