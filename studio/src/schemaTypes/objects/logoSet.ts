import {defineType, defineField} from 'sanity'

/**
 * Logo Set - A scrolling logo carousel with regional variants
 * Features:
 * - Custom title or default "Trusted by over 3,000 venues worldwide"
 * - Theme options (OnDark, OnLight, GxScore)
 * - Text alignment
 * - Optional divider
 * - Regional logos (AMER, APAC, EMEA, UK) - all editable as Sanity images
 */

// Logo item definition - uses Sanity image
const logoItem = {
  type: 'object',
  name: 'logoItem',
  title: 'Logo',
  fields: [
    defineField({
      name: 'image',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the logo image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({alt, media}) {
      return {
        title: alt || 'Logo',
        media: media,
      }
    },
  },
}

export default defineType({
  name: 'logoSet',
  title: 'Logo Set',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
    {name: 'amer', title: 'AMER Logos'},
    {name: 'apac', title: 'APAC Logos'},
    {name: 'emea', title: 'EMEA Logos'},
    {name: 'uk', title: 'UK Logos'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'customTitle',
      title: 'Custom Title',
      type: 'string',
      description: 'Leave empty to use default: "Trusted by over 3,000 venues worldwide"',
      group: 'content',
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'OnLight', value: 'dark'},
          {title: 'OnDark', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'dark',
      group: 'style',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      group: 'style',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show Divider',
      type: 'boolean',
      description: 'Show a divider line above the title',
      initialValue: false,
      group: 'style',
    }),
    // AMER Logos
    defineField({
      name: 'amerLogos',
      title: 'AMER Logos',
      type: 'array',
      of: [logoItem],
      description: 'Logos shown for Americas region',
      group: 'amer',
      validation: (Rule) => Rule.min(1),
    }),
    // APAC Logos
    defineField({
      name: 'apacLogos',
      title: 'APAC Logos',
      type: 'array',
      of: [logoItem],
      description: 'Logos shown for Asia-Pacific region',
      group: 'apac',
      validation: (Rule) => Rule.min(1),
    }),
    // EMEA Logos
    defineField({
      name: 'emeaLogos',
      title: 'EMEA Logos',
      type: 'array',
      of: [logoItem],
      description: 'Logos shown for Europe, Middle East, and Africa region',
      group: 'emea',
      validation: (Rule) => Rule.min(1),
    }),
    // UK Logos
    defineField({
      name: 'ukLogos',
      title: 'UK Logos',
      type: 'array',
      of: [logoItem],
      description: 'Logos shown for United Kingdom',
      group: 'uk',
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      customTitle: 'customTitle',
      theme: 'theme',
    },
    prepare({customTitle, theme}) {
      const title = customTitle || 'Trusted by over 3,000 venues worldwide'
      const subtitle = `Theme: ${theme || 'dark'}`
      return {
        title: `Logo Set: ${title.substring(0, 30)}${title.length > 30 ? '...' : ''}`,
        subtitle,
      }
    },
  },
})
