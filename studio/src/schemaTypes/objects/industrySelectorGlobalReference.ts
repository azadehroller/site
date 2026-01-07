import {defineType, defineField} from 'sanity'

/**
 * Industry Selector Global Reference
 * Allows referencing the global Industry Selector document in columns
 */

export default defineType({
  name: 'industrySelectorGlobalReference',
  title: 'Industry Selector (Global)',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Industry Selector',
      type: 'reference',
      to: [{type: 'industrySelectorGlobalDoc'}],
      description: 'Select the global Industry Selector to display',
    }),
  ],
  preview: {
    select: {
      industries: 'reference.industries',
      theme: 'reference.theme',
    },
    prepare({industries, theme}) {
      const count = industries?.length || 0
      const themeLabel = theme === 'light' ? 'OnDark' : 'OnLight'
      return {
        title: 'Industry Selector (Global Reference)',
        subtitle: `${count} industries • Theme: ${themeLabel}`,
      }
    },
  },
})

