import {defineField, defineType} from 'sanity'

/**
 * Features Landing Page schema - Singleton document for the features index
 */

export default defineType({
  name: 'featuresLandingPage',
  title: 'Features Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Features',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description for the features landing page',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the features landing page',
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
        title: '✨ Features Landing',
      }
    },
  },
})

