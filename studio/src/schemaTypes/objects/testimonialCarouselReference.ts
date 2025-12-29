import {defineType, defineField} from 'sanity'

/**
 * Testimonial Carousel Reference
 * This object type allows referencing the global Testimonial Carousel document
 * within columns or other content areas
 */

export default defineType({
  name: 'testimonialCarouselReference',
  title: 'Testimonial Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Testimonial Carousel',
      type: 'reference',
      to: [{type: 'testimonialCarousel'}],
      description: 'Reference to the global Testimonial Carousel configuration',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonial Carousel',
        subtitle: 'Global testimonial carousel component',
      }
    },
  },
})

