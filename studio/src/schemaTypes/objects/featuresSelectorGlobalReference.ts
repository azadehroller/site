import {defineType, defineField} from 'sanity'

/**
 * Features Selector Global Reference
 * Allows referencing the global features selector document in page sections
 */
export default defineType({
  name: 'featuresSelectorGlobalReference',
  title: 'Features Selector (Global)',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Features Selector',
      type: 'reference',
      to: [{type: 'featuresSelectorGlobal'}],
      description: 'Select the global features selector to display',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'reference.title',
      features: 'reference.features',
    },
    prepare({title, features}: {title?: string; features?: any[]}) {
      const count = features?.length || 0
      return {
        title: 'Features Selector (Global)',
        subtitle: `${title || 'No title'} • ${count} feature${count !== 1 ? 's' : ''}`,
      }
    },
  },
})


