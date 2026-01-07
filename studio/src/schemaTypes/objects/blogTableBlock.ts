import {defineType, defineField} from 'sanity'

/**
 * Blog Table Block - STANDALONE table section for blog posts
 * Stores HTML table content that can't be easily represented as portable text
 */

export default defineType({
  name: 'blogTableBlock',
  title: 'Table Block',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'tableHtml',
      title: 'Table HTML',
      type: 'text',
      rows: 10,
      description: 'HTML table content (preserved from original)',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed above or below the table',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      caption: 'caption',
      tableHtml: 'tableHtml',
    },
    prepare({label, caption, tableHtml}) {
      // Try to extract some text from the table for preview
      const stripped = tableHtml
        ? tableHtml.replace(/<[^>]*>/g, ' ').substring(0, 50).trim()
        : 'Empty table'
      return {
        title: label || caption || '📊 Table Block',
        subtitle: stripped + '...',
      }
    },
  },
})

