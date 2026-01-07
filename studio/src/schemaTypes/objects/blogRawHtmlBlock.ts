import {defineType, defineField} from 'sanity'

/**
 * Blog Raw HTML Block - STANDALONE raw HTML section for blog posts
 * Used for complex content that can't be represented as other block types
 * This is a page section, not nested inside text blocks
 */

export default defineType({
  name: 'blogRawHtmlBlock',
  title: 'Raw HTML Block',
  type: 'object',
  icon: () => '🔧',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'html',
      title: 'HTML Code',
      type: 'text',
      rows: 15,
      description: 'Raw HTML for complex content (embeds, custom widgets, etc.)',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      html: 'html',
    },
    prepare({label, html}) {
      const stripped = html
        ? html.replace(/<[^>]*>/g, '').substring(0, 60)
        : 'Empty HTML block'
      return {
        title: label || '🔧 Raw HTML Block',
        subtitle: stripped + '...',
      }
    },
  },
})

