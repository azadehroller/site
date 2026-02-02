import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Feature document type - For product features pages
 */

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  icon: () => '✨',
  orderings: [
    {
      title: 'Templates First',
      name: 'templatesFirst',
      by: [
        // Sort by isTemplate descending: true values first (templates at top)
        // This works within each group (published vs drafts)
        {field: 'isTemplate', direction: 'desc'},
        // Then by orderRank for drag-and-drop ordering
        {field: 'orderRank', direction: 'asc'},
        // Finally by title for consistent ordering
        {field: 'title', direction: 'asc'},
      ],
    },
    orderRankOrdering,
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
    orderRankField({type: 'feature', newItemPosition: 'before'}),
    defineField({
      name: 'isTemplate',
      title: 'Is Template',
      type: 'boolean',
      description: 'Mark this feature page as a template. Templates will appear at the top of the features list.',
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
        title: isTemplate ? `📋 ${title || 'Untitled Feature'} (Template)` : title || 'Untitled Feature',
        subtitle: `/features/${slug}`,
      }
    },
  },
})
