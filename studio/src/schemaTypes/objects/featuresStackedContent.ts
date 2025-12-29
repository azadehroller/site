import {defineType, defineField} from 'sanity'

/**
 * Features Stacked Content - Alternating image/text sections with stats, quotes, and CTAs
 * Based on HubSpot module: features-stacked-content.module
 */

export default defineType({
  name: 'featuresStackedContent',
  title: 'Features Stacked Content',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Style settings
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'On Dark (Light Text)', value: 'light'},
          {title: 'On Light (Dark Text)', value: 'dark'},
          {title: 'GX Score', value: 'gxscore'},
        ],
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
      title: 'Eyebrow Type',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'div', value: 'div'},
        ],
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'eyebrowStyle',
      title: 'Eyebrow Style',
      type: 'string',
      group: 'styles',
      options: {
        list: [
          {title: 'Red', value: 'red'},
          {title: 'Gradient', value: 'gradient'},
        ],
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Type',
      type: 'string',
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
      title: 'Display Type (Heading Style)',
      type: 'string',
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
      initialValue: 'h2',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
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
      initialValue: 'base',
    }),
    // Items array
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            // Text content
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            // Image
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Left (Image on left, text on right)', value: 'left'},
                  {title: 'Right (Image on right, text on left)', value: 'right'},
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            }),
            defineField({
              name: 'imageRatio',
              title: 'Image Ratio',
              type: 'string',
              options: {
                list: [
                  {title: '1:1 (Square)', value: 'aspect-square'},
                  {title: '16:9 (Video)', value: 'aspect-video'},
                ],
              },
              initialValue: 'aspect-square',
            }),
            // Stats section
            defineField({
              name: 'showStats',
              title: 'Show Stats Section',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'statsNumber',
              title: 'Stats Number',
              type: 'string',
              description: 'e.g., "30%", "$2B", "100+"',
              hidden: ({parent}) => !parent?.showStats,
            }),
            defineField({
              name: 'statsText',
              title: 'Stats Description',
              type: 'text',
              description: 'HTML allowed. Use <strong> for emphasis.',
              hidden: ({parent}) => !parent?.showStats,
            }),
            defineField({
              name: 'statsIcon',
              title: 'Stats Icon (SVG)',
              type: 'text',
              description: 'Paste SVG code for the icon',
              hidden: ({parent}) => !parent?.showStats,
            }),
            // Quote section
            defineField({
              name: 'showQuote',
              title: 'Show Quote Section',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'quoteText',
              title: 'Quote Text',
              type: 'text',
              rows: 3,
              hidden: ({parent}) => !parent?.showQuote,
            }),
            defineField({
              name: 'quoteAuthor',
              title: 'Quote Author',
              type: 'string',
              hidden: ({parent}) => !parent?.showQuote,
            }),
            defineField({
              name: 'quoteAuthorTitle',
              title: 'Author Title/Position',
              type: 'string',
              hidden: ({parent}) => !parent?.showQuote,
            }),
            defineField({
              name: 'quoteImageType',
              title: 'Quote Image Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Avatar', value: 'avatar'},
                  {title: 'Logo', value: 'logo'},
                ],
              },
              hidden: ({parent}) => !parent?.showQuote,
            }),
            defineField({
              name: 'quoteImage',
              title: 'Quote Image (Avatar or Logo)',
              type: 'image',
              options: {
                hotspot: true,
              },
              hidden: ({parent}) => !parent?.showQuote,
            }),
            defineField({
              name: 'quoteImageAlt',
              title: 'Quote Image Alt Text',
              type: 'string',
              hidden: ({parent}) => !parent?.showQuote,
            }),
            // CTA section
            defineField({
              name: 'showCta',
              title: 'Show CTA Button',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              hidden: ({parent}) => !parent?.showCta,
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'string',
              hidden: ({parent}) => !parent?.showCta,
            }),
            defineField({
              name: 'ctaOpenInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              hidden: ({parent}) => !parent?.showCta,
              initialValue: false,
            }),
            defineField({
              name: 'ctaIcon',
              title: 'CTA Icon (SVG)',
              type: 'text',
              description: 'Paste SVG code for the button icon',
              hidden: ({parent}) => !parent?.showCta,
            }),
            defineField({
              name: 'ctaIconPosition',
              title: 'Icon Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'right',
              hidden: ({parent}) => !parent?.showCta,
            }),
            defineField({
              name: 'ctaKind',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Tertiary', value: 'tertiary'},
                  {title: 'Ghost', value: 'ghost'},
                  {title: 'GX Score', value: 'gx_score'},
                ],
              },
              initialValue: 'ghost',
              hidden: ({parent}) => !parent?.showCta,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              eyebrow: 'eyebrow',
              media: 'image',
            },
            prepare({title, eyebrow, media}) {
              return {
                title: title || 'Feature Item',
                subtitle: eyebrow,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const itemCount = items?.length || 0
      return {
        title: 'Features Stacked Content',
        subtitle: `${itemCount} feature${itemCount !== 1 ? 's' : ''}`,
      }
    },
  },
})

