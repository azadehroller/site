import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Industry document type - For industry-specific pages
 */

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: () => '🏢', // Building/office icon - better for industry pages
  orderings: [
    orderRankOrdering,
    {
      title: 'Templates First',
      name: 'templatesFirst',
      by: [
        // Sort by isTemplate descending: true values first (templates at top)
        // This should work regardless of draft/published status
        {field: 'isTemplate', direction: 'desc'},
        // Then by _id to ensure consistent ordering (published vs drafts)
        {field: '_id', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    // Order rank for drag-and-drop ordering
    orderRankField({type: 'industry', newItemPosition: 'before'}),
    defineField({
      name: 'isTemplate',
      title: 'Is Template',
      type: 'boolean',
      description: 'Mark this industry page as a template. Templates will appear at the top of the industries list.',
      initialValue: false,
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
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
    // Settings
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'announcementBarSettings',
      group: 'settings',
    }),
    // SEO
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isTemplate: 'isTemplate',
    },
    prepare({title, slug, isTemplate}) {
      return {
        title: isTemplate ? `📋 ${title || 'Untitled Industry'} (Template)` : title || 'Untitled Industry',
        subtitle: `/industries/${slug}`,
      }
    },
  },
})
