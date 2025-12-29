import {defineType, defineField} from 'sanity'

/**
 * Heading Composition Block - A versatile heading and text block component
 * Supports eyebrow, title, text content with various styling options
 */

export default defineType({
  name: 'headingComposition',
  title: 'Heading and Text Block',
  type: 'object',
  icon: () => '📝',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Content fields
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text displayed above the heading',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading text',
      group: 'content',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      description: 'Rich text content - supports formatted text and raw HTML blocks',
      group: 'content',
      of: [
        {type: 'block'},
        // Raw HTML blocks for pasting HTML directly
        {
          type: 'object',
          name: 'rawHtml',
          title: 'Raw HTML',
          icon: () => '🔧',
          fields: [
            defineField({
              name: 'html',
              title: 'HTML Code',
              type: 'text',
              rows: 10,
              description: 'Paste raw HTML here. It will be rendered as-is on the page.',
            }),
          ],
          preview: {
            select: {
              html: 'html',
            },
            prepare({html}: {html?: string}) {
              const stripped = html
                ? html.replace(/<[^>]*>/g, '').substring(0, 60)
                : 'Empty HTML block'
              return {
                title: '🔧 Raw HTML Block',
                subtitle: stripped + '...',
              }
            },
          },
        },
      ],
    }),
    // Style fields
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Color theme for the text',
      group: 'styles',
      options: {
        list: [
          {title: 'On Dark (light text)', value: 'light'},
          {title: 'On Light (dark text)', value: 'dark'},
          {title: 'GxScore', value: 'gxscore'},
          {title: 'SMB', value: 'smb'},
          {title: 'Enterprise', value: 'enterprise'},
          {title: 'Industry Report', value: 'industry_report'},
          {title: 'Industry Report OnLight', value: 'industry_report_onlight'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'dark',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      description: 'Horizontal alignment of the content',
      group: 'styles',
      options: {
        list: [
          {title: 'Left', value: 'LEFT'},
          {title: 'Center', value: 'CENTER'},
          {title: 'Right', value: 'RIGHT'},
        ],
        layout: 'radio',
      },
      initialValue: 'CENTER',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowType',
      title: 'Eyebrow Type',
      type: 'string',
      description: 'HTML tag for the eyebrow element',
      group: 'styles',
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
        layout: 'dropdown',
      },
      initialValue: 'div',
    }),
    defineField({
      name: 'eyebrowStyle',
      title: 'Eyebrow Style',
      type: 'string',
      description: 'Color style for the eyebrow text',
      group: 'styles',
      options: {
        list: [
          {title: 'None (inherit from theme)', value: 'none'},
          {title: 'Red', value: 'red'},
          {title: 'Bright Blue', value: 'bright_blue'},
          {title: 'Blue', value: 'blue'},
          {title: 'Iris', value: 'iris'},
          {title: 'Iris Light', value: 'iris_light'},
          {title: 'Gradient', value: 'gradient'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Type',
      type: 'string',
      description: 'HTML tag for the heading element (semantic)',
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
        layout: 'dropdown',
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      description: 'Visual size of the heading (can differ from semantic tag)',
      group: 'styles',
      options: {
        list: [
          {title: 'H1 (largest)', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'S8 (smallest)', value: 's8'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
      description: 'Size of the body text',
      group: 'styles',
      options: {
        list: [
          {title: 'S3 (2xl - largest)', value: '2xl'},
          {title: 'S2 (lg)', value: 'lg'},
          {title: 'S1 (base)', value: 'base'},
          {title: 'S0 (sm)', value: 'sm'},
          {title: 'S00 (xs - smallest)', value: 'xs'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'lg',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      theme: 'theme',
    },
    prepare({title, eyebrow, theme}) {
      return {
        title: title || eyebrow || 'Heading Composition',
        subtitle: `Theme: ${theme || 'dark'}`,
      }
    },
  },
})

