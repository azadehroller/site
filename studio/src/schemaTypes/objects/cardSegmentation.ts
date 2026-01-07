import {defineType, defineField} from 'sanity'

/**
 * Card Segmentation - A grid of feature cards with images, titles, content, and links
 * Features:
 * - Theme options (OnLight, OnDark, GxScore, SMB, Enterprise)
 * - Array of cards with image, title, content, and link
 * - Minimum 3 cards, no maximum
 */

// Card item definition
const cardItem = {
  type: 'object',
  name: 'cardSegmentationItem',
  title: 'Card',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the image',
        },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Card Title',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      initialValue: 'Card Content',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      initialValue: 'Learn more',
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
          initialValue: 'https://www.roller.software/',
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in new tab',
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
      content: 'content',
      media: 'image',
    },
    prepare({title, content, media}) {
      return {
        title: title || 'Card',
        subtitle: content?.substring(0, 50) + (content?.length > 50 ? '...' : ''),
        media: media,
      }
    },
  },
}

export default defineType({
  name: 'cardSegmentation',
  title: 'Card Segmentation',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group - Cards
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [cardItem],
      description: 'Add cards to display (minimum 3)',
      group: 'content',
      validation: (Rule) => Rule.min(3),
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
          {title: 'SMB', value: 'smb'},
          {title: 'Enterprise', value: 'enterprise'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'dark',
      group: 'style',
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
      theme: 'theme',
    },
    prepare({cards, theme}) {
      const count = cards?.length || 0
      const title = `Card Segmentation (${count} ${count === 1 ? 'card' : 'cards'})`
      const themeLabels: Record<string, string> = {
        dark: 'OnLight',
        light: 'OnDark',
        gxscore: 'GxScore',
        smb: 'SMB',
        enterprise: 'Enterprise',
      }
      return {
        title,
        subtitle: `Theme: ${themeLabels[theme] || 'OnLight'}`,
      }
    },
  },
})

