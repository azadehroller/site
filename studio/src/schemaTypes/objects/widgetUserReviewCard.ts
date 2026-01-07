import {defineType, defineField} from 'sanity'

/**
 * Widget User Review Card
 * A styled card component with heading, text, and badge images
 * Displays as a row with content on the left and badges on the right
 */

export default defineType({
  name: 'widgetUserReviewCard',
  title: 'Widget User Review Card',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'badges', title: 'Badges'},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Content fields
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title (optional)',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading text',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'An established partner with a bold outlook',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Description text below the title',
      group: 'content',
      rows: 3,
    }),
    // Badge images
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      group: 'badges',
      of: [
        {
          type: 'object',
          name: 'badge',
          title: 'Badge',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
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
              description: 'Accessibility text for the image',
            }),
            defineField({
              name: 'link',
              title: 'Link URL',
              type: 'url',
              description: 'Optional link when clicking the badge',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'alt',
            },
            prepare({media, title}) {
              return {
                title: title || 'Badge',
                media,
              }
            },
          },
        },
      ],
      description: 'Add badge images to display on the right side',
    }),
    // Style fields
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'Dark (On Dark Background)', value: 'dark'},
          {title: 'Light (On Light Background)', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'Left', value: 'LEFT'},
          {title: 'Center', value: 'CENTER'},
          {title: 'Right', value: 'RIGHT'},
        ],
        layout: 'radio',
      },
      initialValue: 'LEFT',
    }),
    defineField({
      name: 'eyebrowType',
      title: 'Eyebrow Tag',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'DIV', value: 'div'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      initialValue: 'div',
      hidden: ({parent}) => !parent?.eyebrow,
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Tag',
      type: 'string',
      description: 'The HTML tag for the title',
      group: 'styles',
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
      initialValue: 'h3',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      description: 'Visual size of the heading (independent of semantic tag)',
      group: 'styles',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'S8 (Small)', value: 's8'},
        ],
      },
      initialValue: 'h3',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
      description: 'Size of the description text',
      group: 'styles',
      options: {
        list: [
          {title: 'Extra Small', value: 'xs'},
          {title: 'Small', value: 'sm'},
          {title: 'Base', value: 'base'},
          {title: 'Large', value: 'lg'},
          {title: '2XL', value: '2xl'},
        ],
      },
      initialValue: 'lg',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      badges: 'badges',
    },
    prepare({title, eyebrow, badges}) {
      const badgeCount = badges?.length || 0
      return {
        title: title || 'Widget User Review Card',
        subtitle: `${eyebrow ? `${eyebrow} | ` : ''}${badgeCount} badge${badgeCount !== 1 ? 's' : ''}`,
      }
    },
  },
})

