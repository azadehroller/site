import {defineType, defineField} from 'sanity'

/**
 * Stats Set - A component displaying statistics with numbers and text
 * Features:
 * - Multiple stat items with optional tags, numbers, and rich text
 * - Theme options (OnDark, OnLight)
 * - Text size options
 * - Spacing style options (default, small)
 */

// Stats item definition
const statsItem = {
  type: 'object',
  name: 'statsItem',
  title: 'Stat',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Optional tag shown above the number (e.g., "NEW", "HOT")',
    }),
    defineField({
      name: 'statsNumber',
      title: 'Number',
      type: 'string',
      description: 'The statistic number (e.g., "10%", "500+", "3x")',
      initialValue: '10%',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statsText',
      title: 'Text',
      type: 'text',
      description: 'Description text for the statistic (supports basic HTML like <strong>, <a>)',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      number: 'statsNumber',
      text: 'statsText',
      tag: 'tag',
    },
    prepare({number, text, tag}) {
      const title = number || 'Stat'
      const subtitle = tag ? `[${tag}] ${text?.substring(0, 50) || ''}` : text?.substring(0, 50) || ''
      return {
        title,
        subtitle: subtitle + (text?.length > 50 ? '...' : ''),
      }
    },
  },
}

export default defineType({
  name: 'statsSet',
  title: 'Stats Set',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group - Stats items
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [statsItem],
      description: 'Add statistics to display',
      group: 'content',
      validation: (Rule) => Rule.min(1),
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'OnLight', value: 'dark'},
          {title: 'OnDark', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      group: 'style',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
      description: 'Size of the description text',
      options: {
        list: [
          {title: 'S3 (2xl)', value: '2xl'},
          {title: 'S2 (xl)', value: 'xl'},
          {title: 'S1 (base)', value: 'base'},
          {title: 'S0 (sm)', value: 'sm'},
          {title: 'S00 (xs)', value: 'xs'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'xl',
      group: 'style',
    }),
    defineField({
      name: 'spacingStyle',
      title: 'Spacing Style',
      type: 'string',
      description: 'Adjust the spacing between stats',
      options: {
        list: [
          {title: 'Default spacing', value: 'default'},
          {title: 'Less spacing', value: 'small'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      group: 'style',
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
      theme: 'theme',
    },
    prepare({stats, theme}) {
      const count = stats?.length || 0
      const title = `Stats Set (${count} ${count === 1 ? 'stat' : 'stats'})`
      const themeLabel = theme === 'light' ? 'OnDark' : 'OnLight'
      return {
        title,
        subtitle: `Theme: ${themeLabel}`,
      }
    },
  },
})

