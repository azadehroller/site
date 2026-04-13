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
    {name: 'abTesting', title: 'A/B Testing'},
  ],
  fields: [
    // Content fields
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text displayed above the heading',
      group: 'content',
      initialValue: 'Lorem ipsum',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading text',
      group: 'content',
      initialValue: 'Lorem ipsum dolor sit amet',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      description: 'Rich text content - supports formatted text and raw HTML blocks',
      group: 'content',
      initialValue: [
        {
          _type: 'block',
          _key: 'default',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'default-span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
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
      initialValue: 'LEFT',
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
      initialValue: 'red',
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
    defineField({
      name: 'addBorderLine',
      title: 'Add Border Line',
      type: 'boolean',
      description: 'Add a red border line on the left side',
      group: 'styles',
      initialValue: false,
    }),
    // A/B Testing
    defineField({
      name: 'experimentActive',
      title: 'Activate Experiment',
      type: 'boolean',
      group: 'abTesting',
      description:
        'When OFF, the default content fields (Content tab) are always shown. Turn ON to start splitting traffic across the variants below.',
      initialValue: false,
    }),
    defineField({
      name: 'variants',
      title: 'Content Variants',
      type: 'array',
      group: 'abTesting',
      description:
        'Add alternate versions of the eyebrow, title, and text. Traffic is split evenly across control (the default fields in the Content tab) and every variant listed here. Variants are only used when "Activate Experiment" is ON.',
      of: [
        {
          type: 'object',
          name: 'headingVariant',
          title: 'Variant',
          fields: [
            defineField({
              name: 'variantLabel',
              title: 'Variant Label',
              type: 'string',
              description: 'Internal label (not shown on the site)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'targetRegions',
              title: 'Target Regions',
              type: 'array',
              of: [{type: 'string'}],
              description:
                'Leave empty to show to all regions. Select one or more to restrict this variant to visitors from those regions.',
              options: {
                list: [
                  {title: 'Americas (AMER)', value: 'AMER'},
                  {title: 'Europe / Middle East / Africa (EMEA)', value: 'EMEA'},
                  {title: 'Asia Pacific (APAC)', value: 'APAC'},
                  {title: 'United Kingdom (UK)', value: 'UK'},
                  {title: 'United States', value: 'US'},
                  {title: 'Canada', value: 'CA'},
                  {title: 'Germany', value: 'DE'},
                  {title: 'France', value: 'FR'},
                  {title: 'Australia', value: 'AU'},
                  {title: 'India', value: 'IN'},
                  {title: 'Japan', value: 'JP'},
                  {title: 'Brazil', value: 'BR'},
                  {title: 'Mexico', value: 'MX'},
                  {title: 'Singapore', value: 'SG'},
                  {title: 'Netherlands', value: 'NL'},
                  {title: 'Spain', value: 'ES'},
                  {title: 'Italy', value: 'IT'},
                  {title: 'Sweden', value: 'SE'},
                  {title: 'Israel', value: 'IL'},
                  {title: 'South Africa', value: 'ZA'},
                  {title: 'United Arab Emirates', value: 'AE'},
                ],
              },
            }),
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              initialValue: 'Lorem ipsum',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Lorem ipsum dolor sit amet',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'array',
              of: [
                {type: 'block'},
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
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              label: 'variantLabel',
              title: 'title',
              regions: 'targetRegions',
            },
            prepare({label, title, regions}: {label?: string; title?: string; regions?: string[]}) {
              const regionStr = regions?.length ? regions.join(', ') : 'All regions'
              return {
                title: label || 'Unnamed variant',
                subtitle: `${regionStr} — ${title || '(no title override)'}`,
              }
            },
          },
        },
      ],
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

