import {defineType, defineField} from 'sanity'

/**
 * Widget Stats Reference
 * This object type allows referencing the global Widget Stats document
 * within columns or other content areas
 */

export default defineType({
  name: 'widgetStatsReference',
  title: 'Widget Stats',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Widget Stats',
      type: 'reference',
      to: [{type: 'widgetStats'}],
      description: 'Reference to the global Widget Stats configuration',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Widget Stats',
        subtitle: 'Global widget stats component',
      }
    },
  },
})


