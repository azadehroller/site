import {defineField, defineType} from 'sanity'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Article document type - For article pages
 */

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: () => '📝',
  groups: [
    {name: 'content', title: 'Content', default: true},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description: 'Add and arrange sections for this article',
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
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Article',
        subtitle: `/articles/${slug}`,
      }
    },
  },
})


