import { defineField, defineType } from 'sanity'

/**
 * Blog Tags Global - Centralized management of blog tags
 */

export default defineType({
  name: 'blogTagsGlobal',
  title: 'Blog Tags',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tag',
          fields: [
            defineField({
              name: 'name',
              title: 'Tag Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              slug: 'slug.current',
            },
            prepare({ title, slug }) {
              return {
                title: title || 'Untitled Tag',
                subtitle: slug || 'No slug',
              }
            },
          },
        },
      ],
      description: 'Manage all blog tags in one place. These can be used across all blog posts.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Blog Tags',
        subtitle: 'Manage all blog tags',
      }
    },
  },
})

