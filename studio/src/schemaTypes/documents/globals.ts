import {defineType, defineField} from 'sanity'

/**
 * Widget Stats Global Document
 * A singleton document that contains the widget stats data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Stat item definition
const statItem = {
  type: 'object',
  name: 'statItem',
  title: 'Stat',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      description: 'Paste the SVG code for the icon',
      rows: 6,
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The stat value (e.g., "300", "3,000", "24/7", "$4B")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The stat label (e.g., "team members", "customers")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
    },
    prepare({value, label}: {value?: string; label?: string}) {
      return {
        title: `${value || ''} ${label || ''}`,
      }
    },
  },
}

export const widgetStats = defineType({
  name: 'widgetStats',
  title: 'Widget Stats',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Text content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title',
      group: 'content',
      initialValue: 'All-in-one venue management software',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title text',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Supporting your business every step of the way',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'Description text below the title',
      rows: 3,
      group: 'content',
      initialValue:
        'Whether you manage one venue or 100, you need a solution built to help you succeed. At ROLLER, we help operators do just that.',
    }),
    // Stats array
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [statItem],
      description: 'Add statistics to display',
      group: 'content',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    // Style group
    defineField({
      name: 'horizontalLayout',
      title: 'Horizontal Layout',
      type: 'boolean',
      description: 'Display in horizontal layout (2 columns) on large screens',
      group: 'style',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: 'Widget Stats',
        subtitle: title || 'Global widget stats component',
      }
    },
  },
})

/**
 * Widget User Reviews Global Document
 * A singleton document that contains the widget user reviews data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Badge item definition for user reviews
const badgeItem = {
  type: 'object',
  name: 'badgeItem',
  title: 'Badge',
  fields: [
    defineField({
      name: 'image',
      title: 'Badge Image',
      type: 'image',
      description: 'Upload the badge image (e.g., G2, Capterra badge)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Badge Link',
      type: 'url',
      description: 'URL to open when the badge is clicked',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({alt, media}: {alt?: string; media?: string}) {
      return {
        title: alt || 'Badge',
        media,
      }
    },
  },
}

export const widgetUserReviews = defineType({
  name: 'widgetUserReviews',
  title: 'Widget User Reviews',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title',
      group: 'content',
      initialValue: 'CUSTOMIZED TO YOUR VENUE',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title text',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Implementation Services',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Description text below the title',
      rows: 4,
      group: 'content',
      initialValue:
        'Let our team of experts help you get up and running in your new ROLLER account as smoothly as possible. Accelerate your success with best practice advice & guided training sessions to get the most value from ROLLER.',
    }),
    // Badges array
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [badgeItem],
      description: 'Add badge images (e.g., G2, Capterra)',
      group: 'content',
      validation: (Rule) => Rule.max(6),
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'On Dark', value: 'light'},
          {title: 'On Light', value: 'dark'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      group: 'style',
      initialValue: 'dark',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'LEFT'},
          {title: 'Center', value: 'CENTER'},
          {title: 'Right', value: 'RIGHT'},
        ],
        layout: 'radio',
      },
      group: 'style',
      initialValue: 'CENTER',
    }),
    defineField({
      name: 'eyebrowType',
      title: 'Eyebrow Type',
      type: 'string',
      description: 'HTML tag for the eyebrow',
      options: {
        list: [
          {title: 'div', value: 'div'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      group: 'style',
      initialValue: 'div',
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Type',
      type: 'string',
      description: 'HTML tag for the heading',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      group: 'style',
      initialValue: 'h3',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      description: 'Visual size of the heading (can differ from semantic tag)',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'S8', value: 's8'},
        ],
      },
      group: 'style',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
      description: 'Size of the body text',
      options: {
        list: [
          {title: 'S3 (2xl)', value: '2xl'},
          {title: 'S2 (lg)', value: 'lg'},
          {title: 'S1 (base)', value: 'base'},
          {title: 'S0 (sm)', value: 'sm'},
          {title: 'S00 (xs)', value: 'xs'},
        ],
      },
      group: 'style',
      initialValue: 'lg',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: 'Widget User Reviews',
        subtitle: title || 'Global user reviews component',
      }
    },
  },
})

/**
 * Testimonial Carousel Global Document
 * A singleton document that contains testimonial carousel data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Testimonial item definition
const testimonialItem = {
  type: 'object',
  name: 'testimonialItem',
  title: 'Testimonial',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The testimonial quote text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Job title and company (e.g., "Head of Marketing, Company Name")',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Logo of the company',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      description: 'Optional link to customer story or case study',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          description: 'The URL to link to',
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
  ],
  preview: {
    select: {
      author: 'author',
      position: 'position',
      media: 'logo',
    },
    prepare({author, position, media}: {author?: string; position?: string; media?: any}) {
      return {
        title: author || 'Testimonial',
        subtitle: position,
        media,
      }
    },
  },
}

export const testimonialCarousel = defineType({
  name: 'testimonialCarousel',
  title: 'Testimonial Carousel',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    // Content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the carousel (optional)',
      group: 'content',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [testimonialItem],
      description: 'Add testimonials to display in the carousel',
      group: 'content',
      validation: (Rule) => Rule.min(2).max(12),
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      testimonials: 'testimonials',
    },
    prepare({eyebrow, testimonials}: {eyebrow?: string; testimonials?: any[]}) {
      const count = testimonials?.length || 0
      return {
        title: 'Testimonial Carousel',
        subtitle: eyebrow || `${count} testimonial${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

export default widgetStats

