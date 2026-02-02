import {defineType, defineField} from 'sanity'

/**
 * Testimonial Slider Block - A horizontal card slider for customer testimonials
 * Based on HubSpot testimonial-slider module design
 * Each slide shows: company logo, quote, and "Learn more" button
 */

// Slide item definition
const testimonialSlideItem = {
  type: 'object',
  name: 'testimonialSlideItem',
  title: 'Testimonial Slide',
  fields: [
    defineField({
      name: 'content',
      title: 'Quote Content',
      type: 'text',
      description: 'The testimonial quote. Use <strong> tags for bold text.',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo (Upload)',
      type: 'image',
      description: 'Upload a logo image (recommended: 80x44px)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoUrl',
      title: 'Company Logo URL (External)',
      type: 'url',
      description: 'OR paste an external logo URL (e.g., from HubSpot CDN). This takes priority over uploaded logo.',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo image',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      description: 'Link to customer story or case study',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          description: 'The URL to link to',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel'],
            allowRelative: true,
          }),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'noFollow',
          title: 'No Follow',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the "Learn more" button',
      initialValue: 'Learn more',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      logo: 'logo',
    },
    prepare({content, logo}: {content?: string; logo?: any}) {
      const truncated = content ? content.substring(0, 50) + '...' : 'Empty slide'
      return {
        title: truncated,
        media: logo,
      }
    },
  },
}

export default defineType({
  name: 'testimonialSlider',
  title: 'Testimonial Slider',
  type: 'object',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'slides',
      title: 'Testimonial Slides',
      type: 'array',
      of: [testimonialSlideItem],
      description: 'Add testimonial cards to the slider (recommended: 5-12 slides)',
      validation: (Rule) => Rule.min(2).max(20),
    }),
  ],
  preview: {
    select: {
      slides: 'slides',
    },
    prepare({slides}: {slides?: any[]}) {
      const count = slides?.length || 0
      return {
        title: 'Testimonial Slider',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
