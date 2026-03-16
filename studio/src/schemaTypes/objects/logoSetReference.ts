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
    defineField({
      name: 'pageTitle',
      title: 'Page-specific Title',
      type: 'string',
      description:
        'Override the global title for this page only. Leave blank to use the global title.',
    }),
    defineField({
      name: 'centerPageTitle',
      title: 'Center Title',
      type: 'boolean',
      description: 'Center the title on this page. Works with both the global title and any page-specific title override.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      pageTitle: 'pageTitle',
    },
    prepare({pageTitle}: {pageTitle?: string}) {
      return {
        title: 'Logo Set (Global)',
        subtitle: pageTitle ? `Title override: "${pageTitle}"` : 'Global logo set component',
      }
    },
  },
})

