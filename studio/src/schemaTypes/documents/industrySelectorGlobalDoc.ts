import {defineType, defineField} from 'sanity'

/**
 * Industry Selector Global Document
 * A singleton document that contains the industry selector data
 * This is edited in one place and can be referenced anywhere in the site
 * Features:
 * - HeadingComposition for header (eyebrow, title, text with all styling options)
 * - Array of industry items with icon (SVG), title, and link
 * - CTA button
 * - Theme options (OnLight, OnDark)
 */

// Industry item definition
const industryGlobalItem = {
  type: 'object' as const,
  name: 'industryGlobalDocItem',
  title: 'Industry',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 6,
      description: 'Paste SVG code for the industry icon (48x48 recommended).',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
      title: 'title',
    },
    prepare(selection: Record<string, unknown>) {
      return {
        title: (selection.title as string) || 'Industry Item',
      }
    },
  },
}

export const industrySelectorGlobalDoc = defineType({
  name: 'industrySelectorGlobalDoc',
  title: 'Industry Selector (Global)',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'industries', title: 'Industries'},
    {name: 'cta', title: 'CTA'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Heading - uses HeadingComposition type (same as IndustrySelector)
    defineField({
      name: 'heading',
      title: 'Heading Section',
      type: 'headingComposition',
      group: 'header',
      description: 'Optional header with eyebrow, title, and description.',
    }),

    // Industries array
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'industries',
      of: [industryGlobalItem],
      validation: (Rule) => Rule.min(1),
    }),

    // CTA
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'cta',
      description: 'Text for the call-to-action link',
      initialValue: 'See all industries',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          initialValue: '/industries',
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

    // Theme
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'style',
      options: {
        list: [
          {title: 'OnLight (dark text)', value: 'dark'},
          {title: 'OnDark (light text)', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      headingTitle: 'heading.title',
      headingEyebrow: 'heading.eyebrow',
      industries: 'industries',
      theme: 'theme',
    },
    prepare({headingTitle, headingEyebrow, industries, theme}) {
      const count = industries?.length || 0
      const title = headingTitle || headingEyebrow || 'Industry Selector (Global)'
      const themeLabel = theme === 'light' ? 'OnDark' : 'OnLight'
      return {
        title,
        subtitle: `${count} industries • Theme: ${themeLabel}`,
      }
    },
  },
})
