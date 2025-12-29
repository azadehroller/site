import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // --------------------
    // Content
    // --------------------
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
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      hidden: ({document}) => document?.isHome === true,
    }),

    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'columnsBlock' },
        { type: 'divider' },
        {
          type: 'reference',
          title: 'Post Reference',
          to: [{ type: 'post' }],
        },
      ],
    }),

    // --------------------
    // Navigation
    // --------------------
    defineField({
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      group: 'navigation',
      to: [{ type: 'page' }],
      description: 'Used to build page hierarchy and menus',
    }),

    defineField({
      name: 'showInMenu',
      title: 'Show in menus',
      type: 'boolean',
      group: 'navigation',
      initialValue: true,
    }),

    defineField({
      name: 'menuLabel',
      title: 'Menu label',
      type: 'string',
      group: 'navigation',
      description: 'Overrides the page title in menus (optional)',
    }),

    defineField({
      name: 'menuOrder',
      title: 'Menu order',
      type: 'number',
      group: 'navigation',
      description: 'Lower numbers appear first',
    }),

    // Order rank for drag-and-drop ordering
    orderRankField({type: 'page', newItemPosition: 'before'}),

    // --------------------
    // Settings
    // --------------------

    defineField({
      name: 'template',
      title: 'Page template',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Landing', value: 'landing' },
          { title: 'Marketing', value: 'marketing' },
        ],
      },
      initialValue: 'default',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isHome: 'isHome',
      parentTitle: 'parent.title',
    },
    prepare({title, slug, isHome, parentTitle}) {
      return {
        title: title || 'Untitled Page',
        subtitle: isHome
          ? '🏠 Homepage'
          : parentTitle
            ? `${parentTitle} → /${slug}`
            : `/${slug}`,
      }
    },
  },
})
