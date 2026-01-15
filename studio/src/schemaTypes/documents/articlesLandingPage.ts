import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Articles Landing Page schema - Singleton document for the articles index
 */

export default defineType({
  name: 'articlesLandingPage',
  title: 'Articles Landing',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Articles',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A short description for the articles landing page',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange sections for the articles landing page',
      of: [
        {
          type: 'columnsBlock',
        },
        {
          type: 'divider',
        },
      ],
    }),
    // SEO
    ...seoFields,
  ],
  preview: {
    prepare() {
      return {
        title: '📝 Articles Landing',
      }
    },
  },
})


