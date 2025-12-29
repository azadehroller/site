import {defineType, defineField} from 'sanity'

/**
 * Trusted Partner Block - A styled card component combining heading/text with user review badges
 * Features a rounded card design with background color/image options
 */

export default defineType({
  name: 'trustedPartner',
  title: 'Trusted Partner',
  type: 'object',
  icon: () => '🤝',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'background', title: 'Background'},
    {name: 'spacing', title: 'Spacing'},
  ],
  fields: [
    // Content: HeadingComposition fields (embedded)
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text displayed above the heading (e.g., "USER REVIEWS")',
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
      type: 'text',
      description: 'Body text content below the heading',
      group: 'content',
      rows: 3,
    }),
    // Style fields (same as HeadingComposition)
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Color theme for the text',
      group: 'content',
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
      initialValue: 'light',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      description: 'Horizontal alignment of the content',
      group: 'content',
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
      group: 'content',
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
      group: 'content',
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
      group: 'content',
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
      group: 'content',
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
      group: 'content',
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
      initialValue: 'base',
    }),
    // Widget User Reviews Reference
    defineField({
      name: 'userReviews',
      title: 'User Reviews',
      type: 'reference',
      to: [{type: 'widgetUserReviews'}],
      description: 'Reference to the Widget User Reviews for displaying badges',
      group: 'content',
    }),
    // Background Settings (same as columnsBlock)
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Set the background color for this section',
      group: 'background',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Blue 10 (#011840)', value: 'var(--blue-10)'},
          {title: 'Blue 30 (#033180)', value: 'var(--blue-30)'},
          {title: 'Blue 99 (#f5f8ff)', value: 'var(--blue-99)'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'var(--blue-10)',
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Enter a custom hex color (e.g., #ff5500)',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      description: 'Position of the background image',
      group: 'background',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Top Left', value: 'top left'},
          {title: 'Top Right', value: 'top right'},
          {title: 'Bottom Left', value: 'bottom left'},
          {title: 'Bottom Right', value: 'bottom right'},
        ],
      },
      initialValue: 'center',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    defineField({
      name: 'backgroundSize',
      title: 'Background Size',
      type: 'string',
      description: 'How the background image should be sized',
      group: 'background',
      options: {
        list: [
          {title: 'Cover (fill entire area)', value: 'cover'},
          {title: 'Contain (fit within area)', value: 'contain'},
          {title: 'Natural Size (auto)', value: 'auto'},
        ],
      },
      initialValue: 'cover',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    // Card internal padding
    defineField({
      name: 'cardPadding',
      title: 'Card Internal Padding',
      type: 'string',
      description: 'Internal padding within the card',
      group: 'spacing',
      options: {
        list: [
          {title: 'Small (16px)', value: '16px'},
          {title: 'Medium (24px)', value: '24px'},
          {title: 'Large (32px)', value: '32px'},
          {title: 'Extra Large (48px)', value: '48px'},
        ],
      },
      initialValue: '24px',
    }),
    // Border radius
    defineField({
      name: 'borderRadius',
      title: 'Card Border Radius',
      type: 'string',
      description: 'Rounded corners for the card',
      group: 'spacing',
      options: {
        list: [
          {title: 'None', value: '0'},
          {title: 'Small (8px)', value: '8px'},
          {title: 'Medium (16px)', value: '16px'},
          {title: 'Large (24px)', value: '24px'},
          {title: 'Extra Large (32px)', value: '32px'},
        ],
      },
      initialValue: '32px',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({title, eyebrow}) {
      return {
        title: title || 'Trusted Partner',
        subtitle: eyebrow || 'Trusted Partner Block',
      }
    },
  },
})

