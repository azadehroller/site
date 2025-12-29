import {defineField, defineType} from 'sanity'

/**
 * Not Found Page schema - Singleton document for the 404 page
 */

export default defineType({
  name: 'notFoundPage',
  title: 'Not Found Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Page Not Found',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: '404',
      description: 'The main heading displayed on the 404 page',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      initialValue: "Sorry, the page you're looking for doesn't exist.",
      description: 'The message displayed below the heading',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the 404 page',
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
        title: '🚫 Not Found Page (404)',
      }
    },
  },
})

