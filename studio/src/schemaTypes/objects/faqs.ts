import {defineType, defineField} from 'sanity'

/**
 * FAQs - An accordion-style FAQ component
 * Based on HubSpot module: FAQs.module
 *
 * Features:
 * - Embedded HeadingComposition for header with its own styling
 * - Array of FAQ items with title and text content
 * - Collapsible/expandable accordion behavior
 * - SEO-friendly structured data (JSON-LD)
 * - Theme option for FAQ items
 */

// FAQ item definition
const faqItem = {
  type: 'object',
  name: 'faqItem',
  title: 'FAQ Item',
  fields: [
    defineField({
      name: 'title',
      title: 'Question',
      type: 'string',
      description: 'The FAQ question/title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'The FAQ answer/content',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({title, content}) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: content ? content.substring(0, 80) + '...' : '',
      }
    },
  },
}

export default defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'FAQ Styles'},
  ],
  fields: [
    // Embedded HeadingComposition for the header
    defineField({
      name: 'heading',
      title: 'Heading Section',
      type: 'headingComposition',
      group: 'content',
      description: 'Optional header with eyebrow, title, and description. Has its own styling options.',
    }),

    // FAQ items array
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      group: 'content',
      of: [faqItem],
      validation: (Rule) => Rule.min(1).error('At least one FAQ item is required'),
    }),

    // Style settings (only for the FAQ accordion, not the heading)
    defineField({
      name: 'theme',
      title: 'FAQ Theme',
      type: 'string',
      group: 'styles',
      description: 'Theme for the FAQ accordion items (heading has its own theme)',
      options: {
        list: [
          {title: 'Light (Dark Text)', value: 'light'},
          {title: 'Dark (Light Text)', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'expandFirst',
      title: 'Expand First Item',
      type: 'boolean',
      group: 'styles',
      description: 'Expand the first FAQ item by default',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      headingTitle: 'heading.title',
      headingEyebrow: 'heading.eyebrow',
      items: 'items',
      theme: 'theme',
    },
    prepare({headingTitle, headingEyebrow, items, theme}) {
      const count = items?.length || 0
      const title = headingTitle || headingEyebrow || 'FAQs'
      return {
        title,
        subtitle: `${count} FAQ${count !== 1 ? 's' : ''} • ${theme === 'dark' ? 'Dark Theme' : 'Light Theme'}`,
      }
    },
  },
})

