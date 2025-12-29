import {defineType, defineField} from 'sanity'

/**
 * Quote Block - A component displaying testimonial quotes
 * Features:
 * - Quote text with author name and title
 * - Optional avatar or logo image
 * - Optional customer story link with arrow button
 * - Theme options (OnDark, OnLight, GxScore)
 * - Style variants (Medium - extrabold, Small - regular)
 */

export default defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'image', title: 'Image'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      description: 'The quote text to display',
      group: 'content',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Author',
      type: 'string',
      description: 'Name of the person being quoted',
      group: 'content',
    }),
    defineField({
      name: 'quoteTitle',
      title: 'Title',
      type: 'string',
      description: 'Job title or role of the author',
      group: 'content',
    }),
    defineField({
      name: 'customerStoryLink',
      title: 'Customer Story Link',
      type: 'object',
      description: 'Optional link to the full customer story',
      group: 'content',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          description: 'The link URL',
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
          description: 'Add rel="nofollow" to the link',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description: 'Text for the customer story link (e.g., "Read more")',
      group: 'content',
      initialValue: 'Read more',
      hidden: ({parent}) => !parent?.customerStoryLink?.href,
    }),
    // Image group
    defineField({
      name: 'imageType',
      title: 'Image Type',
      type: 'string',
      description: 'Choose between avatar or logo',
      group: 'image',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Avatar', value: 'avatar'},
          {title: 'Logo', value: 'logo'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Author avatar image (72x72px recommended)',
      group: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.imageType !== 'avatar',
    }),
    defineField({
      name: 'avatarAlt',
      title: 'Avatar Alt Text',
      type: 'string',
      description: 'Alternative text for the avatar image',
      group: 'image',
      hidden: ({parent}) => parent?.imageType !== 'avatar',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Company logo image (148x80px recommended)',
      group: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.imageType !== 'logo',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo image',
      group: 'image',
      hidden: ({parent}) => parent?.imageType !== 'logo',
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Color theme for the quote',
      group: 'style',
      options: {
        list: [
          {title: 'OnLight', value: 'dark'},
          {title: 'OnDark', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'styleVariant',
      title: 'Style Variant',
      type: 'string',
      description: 'Size variant of the quote',
      group: 'style',
      options: {
        list: [
          {title: 'Medium (Large text)', value: 'extrabold'},
          {title: 'Small (Regular text)', value: 'regular'},
        ],
        layout: 'radio',
      },
      initialValue: 'extrabold',
    }),
  ],
  preview: {
    select: {
      quoteText: 'quoteText',
      author: 'quoteAuthor',
      theme: 'theme',
      styleVariant: 'styleVariant',
    },
    prepare({quoteText, author, theme, styleVariant}) {
      const truncatedQuote = quoteText?.length > 50 
        ? quoteText.substring(0, 50) + '...' 
        : quoteText || 'Quote';
      const themeLabel = theme === 'light' ? 'OnDark' : theme === 'gxscore' ? 'GxScore' : 'OnLight';
      const variantLabel = styleVariant === 'extrabold' ? 'Medium' : 'Small';
      return {
        title: truncatedQuote,
        subtitle: `${author ? `By: ${author} | ` : ''}${themeLabel} | ${variantLabel}`,
      }
    },
  },
})

