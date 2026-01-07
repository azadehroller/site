import {defineType, defineField} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

/**
 * Stats Set Stacked Global Reference
 * Reference to the global Stats Set Stacked document for use in columns
 */

export default defineType({
  name: 'statsSetStackedGlobalReference',
  title: 'Stats Set Stacked (Global)',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'statsSetStackedGlobal',
      title: 'Stats Set Stacked Global',
      type: 'reference',
      to: [{type: 'statsSetStackedGlobalDoc'}],
      description: 'Reference to the global Stats Set Stacked component',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Stats Set Stacked (Global)',
        subtitle: 'Displays the global Stats Set Stacked component',
        media: BarChartIcon,
      }
    },
  },
})

