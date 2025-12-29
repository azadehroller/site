import {defineType, defineField} from 'sanity'

/**
 * Rotating Text Block - animated text with rotating words
 * Used inside Columns block
 */

export default defineType({
  name: 'rotatingTextBlock',
  title: 'Rotating Text',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    // Content fields
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the title (optional)',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main static title text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rotatingText',
      title: 'Rotating Text Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'rotatingTextItem',
          fields: [
            {
              name: 'rotatingTextItem',
              title: 'Text',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'rotatingTextItem',
            },
          },
        },
      ],
      description: 'Words that will rotate/animate after the title',
    }),
    defineField({
      name: 'text',
      title: 'Description Text',
      type: 'text',
      description: 'Optional descriptive text below the rotating title (supports HTML)',
    }),
    // Style fields
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
          {title: 'GX Score', value: 'gxscore'},
        ],
        layout: 'radio',
      },
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
      initialValue: 'CENTER',
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Type',
      type: 'string',
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
      name: 'eyebrowType',
      title: 'Eyebrow Tag',
      type: 'string',
      options: {
        list: [
          {title: 'Div', value: 'div'},
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
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: ''},
          {title: 'H1 Display', value: 'h1'},
          {title: 'H2 Display', value: 'h2'},
          {title: 'H3 Display', value: 'h3'},
          {title: 'H4 Display', value: 'h4'},
          {title: 'H5 Display', value: 'h5'},
          {title: 'H6 Display', value: 'h6'},
          {title: 'S8 Display', value: 's8'},
        ],
      },
      description: 'Override the visual display size',
    }),
    defineField({
      name: 'textType',
      title: 'Description Text Size',
      type: 'string',
      options: {
        list: [
          {title: 'Extra Small', value: 'xs'},
          {title: 'Small', value: 'sm'},
          {title: 'Base', value: 'base'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: '2xl'},
        ],
      },
      hidden: ({parent}) => !parent?.text,
    }),
    defineField({
      name: 'rotatingTextLength',
      title: 'Rotating Text Width (%)',
      type: 'number',
      description: 'Width of the rotating text area (percentage)',
      initialValue: 10,
      validation: (Rule) => Rule.min(1).max(100),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      title: 'title',
      rotatingText: 'rotatingText',
    },
    prepare({label, title, rotatingText}) {
      const rotatingItems = rotatingText?.map((item: any) => item.rotatingTextItem).join(', ') || ''
      return {
        title: label || 'Rotating Text',
        subtitle: `${title}${rotatingItems ? ` + [${rotatingItems}]` : ''}`,
      }
    },
  },
})

