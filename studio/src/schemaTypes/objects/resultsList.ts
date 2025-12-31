import {defineType, defineField} from 'sanity'

/**
 * Results List - A component for displaying a list of results/features with icons
 * Based on HubSpot module: results-list.module
 *
 * Features:
 * - Array of items with icon, title, content, and optional link
 * - Optional image on the side
 * - Theme options (light/dark/gxscore)
 * - Optional Lottie animations
 */

// Result item definition
const resultItem = {
  type: 'object',
  name: 'resultItem',
  title: 'Result Item',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 4,
      description: 'SVG code for the icon (used when animations are disabled)',
    }),
    defineField({
      name: 'animationFile',
      title: 'Animation File URL',
      type: 'url',
      description: 'URL to Lottie animation JSON file (used when animations are enabled)',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title/heading for this item',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      description: 'The description/content for this item',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description: 'Label for the link button (leave empty to hide link)',
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
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in new tab',
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
      content: 'content',
    },
    prepare({title, content}: {title?: string; content?: string}) {
      return {
        title: title || 'Untitled Item',
        subtitle: content ? content.substring(0, 60) + '...' : '',
      }
    },
  },
}

export default defineType({
  name: 'resultsList',
  title: 'Results List',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'image', title: 'Image'},
    {name: 'styles', title: 'Styles'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // Items array
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      group: 'content',
      of: [resultItem],
      validation: (Rule) => Rule.min(2).error('At least 2 items are required'),
    }),

    // Optional side image
    defineField({
      name: 'image',
      title: 'Side Image',
      type: 'image',
      group: 'image',
      description: 'Optional image to display on the right side',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      group: 'image',
      description: 'Alt text for the image',
      hidden: ({parent}) => !parent?.image,
    }),

    // Style settings
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'styles',
      description: 'Color theme for the component',
      options: {
        list: [
          {title: 'On Light (Dark Text)', value: 'dark'},
          {title: 'On Dark (Light Text)', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),

    // Settings
    defineField({
      name: 'useAnimations',
      title: 'Use Lottie Animations',
      type: 'boolean',
      group: 'settings',
      description: 'Enable Lottie animations for icons (requires animation file URLs)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      items: 'items',
      theme: 'theme',
      hasImage: 'image',
    },
    prepare({items, theme, hasImage}) {
      const count = items?.length || 0
      const themeLabel = theme === 'light' ? 'On Dark' : theme === 'gxscore' ? 'GxScore' : 'On Light'
      return {
        title: `Results List (${count} items)`,
        subtitle: `${themeLabel}${hasImage ? ' • With Image' : ''}`,
      }
    },
  },
})


