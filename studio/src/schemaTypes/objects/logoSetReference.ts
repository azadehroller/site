import {defineType, defineField} from 'sanity'

/**
 * Logo Set Reference
 * This object type allows referencing the global Logo Set document
 * within columns or other content areas
 */

export default defineType({
  name: 'logoSetReference',
  title: 'Logo Set (Global)',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Logo Set',
      type: 'reference',
      to: [{type: 'logoSetGlobal'}],
      description: 'Reference to the global Logo Set configuration',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Logo Set (Global)',
        subtitle: 'Global logo set component',
      }
    },
  },
})

