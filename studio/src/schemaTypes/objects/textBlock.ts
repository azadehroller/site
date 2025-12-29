import {defineType, defineField} from 'sanity'

/**
 * Text Block - a simple rich text block for use inside columns
 */

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text content',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      content: 'content',
    },
    prepare({label, content}) {
      // Get first block's text for preview subtitle
      const firstBlock = content?.[0]
      const text = firstBlock?.children?.map((child: any) => child.text).join('') || 'Empty text block'
      return {
        title: label || 'Text Block',
        subtitle: text.length > 50 ? text.substring(0, 50) + '...' : text,
      }
    },
  },
})

