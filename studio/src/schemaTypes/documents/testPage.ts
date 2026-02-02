import {defineField, defineType} from 'sanity'

/**
 * Test Page schema - Singleton document for testing components
 */

export default defineType({
  name: 'testPage',
  title: 'Test Page',
  type: 'document',
  icon: () => '🧪',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Test Page',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for testing components',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Test Page',
        subtitle: 'For testing components',
      }
    },
  },
})
