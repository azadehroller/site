import {defineType, defineField} from 'sanity'

/**
 * Features Detail - Display features in a grid/list layout with expand/collapse functionality
 * Based on HubSpot module: features-detail.module
 */

const featureItem = {
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'SVG code for the icon (used for default and widget layouts)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'iconAsImage',
      title: 'Icon as Image',
      description: 'Use this field instead of the icon field if you do not have the icon\'s svg code or if the icon does not display properly using the code version. (Used for default and widget layouts)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Image for integration layout',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      placeholder: 'Enter link label text',
      initialValue: 'Read more',
      description: 'Used for default and widget layouts',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          validation: (Rule) => Rule.uri({
            allowRelative: true,
            scheme: ['http', 'https', 'mailto', 'tel'],
          }),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'noFollow',
          title: 'No Follow',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title: title || 'Untitled Feature',
        subtitle: icon ? 'Has icon' : 'No icon',
      }
    },
  },
}

export default defineType({
  name: 'featuresDetail',
  title: 'Features Detail',
  type: 'object',
  icon: () => '📋',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Increase Revenue',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Sell online & in-venue',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Rich text content',
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [featureItem],
      group: 'content',
      validation: (Rule) => Rule.min(1),
    }),
    // Styles group
    defineField({
      name: 'styles',
      title: 'Styles',
      type: 'object',
      group: 'styles',
      fields: [
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          description: 'Choose the layout style',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Widget', value: 'widget'},
              {title: 'Integration', value: 'integration'},
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'contentLayout',
          title: 'Content Layout',
          type: 'string',
          description: 'Choose how content is laid out',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Column Item', value: 'column_item'},
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'spacing',
          title: 'Spacing',
          type: 'object',
          fields: [
            defineField({
              name: 'marginBottom',
              title: 'Margin Bottom',
              type: 'string',
              options: {
                list: [
                  {title: '0px', value: '0px'},
                  {title: '8px', value: '8px'},
                  {title: '16px', value: '16px'},
                  {title: '24px', value: '24px'},
                  {title: '32px', value: '32px'},
                  {title: '48px', value: '48px'},
                  {title: '64px', value: '64px'},
                  {title: '80px', value: '80px'},
                ],
              },
              initialValue: '0px',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'content.title',
      eyebrow: 'content.eyebrow',
      layout: 'styles.layout',
      featureCount: 'features',
    },
    prepare({title, eyebrow, layout, featureCount}) {
      const count = Array.isArray(featureCount) ? featureCount.length : 0
      return {
        title: title || eyebrow || 'Features Detail',
        subtitle: `${count} feature${count !== 1 ? 's' : ''} • Layout: ${layout || 'default'}`,
      }
    },
  },
})
