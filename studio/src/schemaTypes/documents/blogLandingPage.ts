import {defineField, defineType} from 'sanity'

/**
 * Blog Landing Page schema - Singleton document for the blog index
 */

export default defineType({
  name: 'blogLandingPage',
  title: 'Blog Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Blog',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short description for the blog landing page',
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Posts Per Page',
      type: 'number',
      initialValue: 9,
      validation: (Rule) => Rule.min(1).max(50),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for the blog landing page',
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
        title: '📰 Blog Landing',
      }
    },
  },
})

