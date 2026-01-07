import {defineType, defineField} from 'sanity'

/**
 * Stats Set Stacked Global Document
 * A singleton document that contains a vertical stacked stats display
 * This is edited in one place and can be referenced anywhere in the site
 * Features:
 * - Multiple stat items with number and description
 * - Vertical stacked layout with dividers
 * - Theme options (OnLight, OnDark)
 */

// Stats item definition for stacked layout
const statsStackedItem = {
  type: 'object' as const,
  name: 'statsStackedGlobalItem',
  title: 'Stat',
  fields: [
    defineField({
      name: 'statsNumber',
      title: 'Number/Value',
      type: 'string',
      description: 'The statistic value (e.g., "$4B transactions", "165M guests")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statsText',
      title: 'Description',
      type: 'string',
      description: 'Description text for the statistic',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      number: 'statsNumber',
      text: 'statsText',
    },
    prepare({number, text}: {number?: string; text?: string}) {
      return {
        title: number || 'Stat',
        subtitle: text || '',
      }
    },
  },
}

export const statsSetStackedGlobalDoc = defineType({
  name: 'statsSetStackedGlobalDoc',
  title: 'Stats Set Stacked (Global)',
  type: 'document',
  icon: () => '📊',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Stats items
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [statsStackedItem],
      description: 'Add statistics to display in a vertical stacked layout',
      validation: (Rule) => Rule.min(1),
    }),

    // Style options
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'style',
      options: {
        list: [
          {title: 'OnLight (dark text)', value: 'dark'},
          {title: 'OnDark (light text)', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
      description: 'Choose the color theme based on the background',
    }),
    defineField({
      name: 'numberColor',
      title: 'Number Color',
      type: 'string',
      group: 'style',
      description: 'Custom color for the stat numbers (e.g., #0960F6)',
      initialValue: '#0960F6',
    }),
    defineField({
      name: 'dividerColor',
      title: 'Divider Color',
      type: 'string',
      group: 'style',
      description: 'Color for the divider lines between stats',
      initialValue: 'navy-80',
      options: {
        list: [
          {title: 'Navy 80', value: 'navy-80'},
          {title: 'White', value: 'white'},
          {title: 'Navy 40', value: 'navy-40'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
      theme: 'theme',
    },
    prepare({stats, theme}) {
      const count = stats?.length || 0
      const title = `Stats Set Stacked (${count} ${count === 1 ? 'stat' : 'stats'})`
      const themeLabel = theme === 'light' ? 'OnDark' : 'OnLight'
      return {
        title,
        subtitle: `Theme: ${themeLabel}`,
      }
    },
  },
})

