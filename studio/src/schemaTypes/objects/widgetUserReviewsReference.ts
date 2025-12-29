import {defineType, defineField} from 'sanity'

/**
 * Widget User Reviews Reference
 * This object type allows referencing the global Widget User Reviews document
 * within columns or other content areas
 */

export default defineType({
  name: 'widgetUserReviewsReference',
  title: 'Widget User Reviews',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Widget User Reviews',
      type: 'reference',
      to: [{type: 'widgetUserReviews'}],
      description: 'Reference to the global Widget User Reviews configuration',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Widget User Reviews',
        subtitle: 'Global user reviews component',
      }
    },
  },
})

