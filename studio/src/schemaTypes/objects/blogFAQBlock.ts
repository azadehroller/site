import {defineField, defineType} from 'sanity'

/**
 * FAQ Block Schema - For blog posts
 * Uses HTML <details> and <summary> for accordion behavior
 */
export default defineType({
  name: 'blogFAQBlock',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional internal label for this FAQ block',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the FAQ section (e.g., "Frequently Asked Questions")',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'expandFirst',
      title: 'Expand First Item by Default',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({title, itemCount}) {
      return {
        title: title || 'FAQ Block',
        subtitle: `${itemCount || 0} FAQ items`,
      }
    },
  },
})
