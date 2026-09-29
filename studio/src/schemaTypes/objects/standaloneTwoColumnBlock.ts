import {defineType, defineField, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import {
  STANDALONE_TWO_COLUMN_BACKGROUNDS,
  STANDALONE_TWO_COLUMN_BODY_SIZES,
  STANDALONE_TWO_COLUMN_BUTTON_STYLES,
  STANDALONE_TWO_COLUMN_DEFAULTS,
  STANDALONE_TWO_COLUMN_EYEBROW_COLORS,
  STANDALONE_TWO_COLUMN_HEADING_SIZES,
  STANDALONE_TWO_COLUMN_IMAGE_LOADING,
  STANDALONE_TWO_COLUMN_LAYOUTS,
  STANDALONE_TWO_COLUMN_MEDIA_SIDES,
  STANDALONE_TWO_COLUMN_MEDIA_TYPES,
  STANDALONE_TWO_COLUMN_ROW_MODES,
  STANDALONE_TWO_COLUMN_STAT_PLACEMENTS,
  STANDALONE_TWO_COLUMN_TEXT_COLORS,
  STANDALONE_TWO_COLUMN_THEMES,
  toSanityList,
} from '../../../../astro-app/src/components/standaloneTwoColumn/options'
import {
  ThemeAwareBackgroundInput,
  ThemeAwareEyebrowColorInput,
  ThemeAwareTextColorInput,
} from '../../components/ThemeAwareOptionsInput'

function isColumnLoop(parent: {layout?: string; rowMode?: string} | undefined) {
  return parent?.layout === 'biggerLeft' && parent?.rowMode === 'loop'
}

const contentReferences = [
  {type: 'page'},
  {type: 'feature'},
  {type: 'productPage'},
  {type: 'industry'},
  {type: 'post'},
  {type: 'solution'},
  {type: 'partner'},
  {type: 'competitor'},
  {type: 'landingPage'},
  {type: 'rawHtmlPage'},
  {type: 'homepage'},
  {type: 'getStartedPage'},
  {type: 'industriesLandingPage'},
  {type: 'featuresLandingPage'},
  {type: 'productLandingPage'},
  {type: 'blogLandingPage'},
  {type: 'pricingPage'},
  {type: 'partnersLandingPage'},
  {type: 'competitorsLandingPage'},
]

const linkFields = [
  defineField({
    name: 'urlType',
    title: 'URL Type',
    type: 'string',
    options: {
      list: [
        {title: 'External', value: 'EXTERNAL'},
        {title: 'Email Address', value: 'EMAIL_ADDRESS'},
        {title: 'Content', value: 'CONTENT'},
        {title: 'File', value: 'FILE'},
      ],
      layout: 'dropdown',
    },
    initialValue: 'EXTERNAL',
  }),
  defineField({
    name: 'href',
    title: 'URL',
    type: 'url',
    hidden: ({parent}) => parent?.urlType === 'CONTENT',
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const urlType = (context.parent as {urlType?: string})?.urlType
        if (urlType === 'CONTENT') return true
        if (!value) return 'URL is required'
        return true
      }),
  }),
  defineField({
    name: 'contentReference',
    title: 'Content',
    type: 'reference',
    description: 'Search and select a page or content item',
    hidden: ({parent}) => parent?.urlType !== 'CONTENT',
    to: contentReferences,
    options: {
      filter: '!(_id in path("drafts.**"))',
    },
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
]

export default defineType({
  name: 'standaloneTwoColumnBlock',
  title: 'Standalone Two Column Block',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'layout', title: 'Layout'},
  ],
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'layout',
      description:
        'Light theme uses dark text on a light background. Dark theme uses light text on a dark background. Colour options below follow the theme.',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_THEMES),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.theme,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      group: 'layout',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_BACKGROUNDS),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.background,
      validation: (Rule) => Rule.required(),
      components: {input: ThemeAwareBackgroundInput},
    }),
    defineField({
      name: 'textColor',
      title: 'Text colour',
      type: 'string',
      group: 'layout',
      description: 'Applies to the heading, body, quote, and column loop. Options follow the theme.',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_TEXT_COLORS),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.textColor,
      components: {input: ThemeAwareTextColorInput},
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_LAYOUTS),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.layout,
    }),
    defineField({
      name: 'rowMode',
      title: 'Rows',
      type: 'string',
      group: 'layout',
      description: 'Single is one section. Column loop repeats a slimmer title + text + image row.',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_ROW_MODES),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.rowMode,
      hidden: ({parent}) => parent?.layout !== 'biggerLeft',
    }),
    defineField({
      name: 'mediaSide',
      title: 'Media side (desktop)',
      type: 'string',
      group: 'layout',
      description:
        'Desktop column order. Left is the default — media then sits on top on mobile unless you change the mobile option below.',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_MEDIA_SIDES),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.mediaSide,
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'mediaOnTopMobile',
      title: 'Media on top on mobile',
      type: 'boolean',
      group: 'layout',
      description:
        'On by default when media is on the left. Turn on to put media first on mobile even when it sits on the right on desktop. Turn off to put text first on mobile.',
      initialValue: true,
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      group: 'media',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_MEDIA_TYPES),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.mediaType,
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent) || parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'imageLoading',
      title: 'Image loading',
      type: 'string',
      group: 'media',
      description: 'Lazy is the default. Eager also sets fetchpriority to high automatically.',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_IMAGE_LOADING),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.imageLoading,
      hidden: ({parent}) => isColumnLoop(parent) || parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'wistiaId',
      title: 'Wistia video ID',
      type: 'string',
      group: 'media',
      description: 'The Wistia video ID (e.g. "abc123xyz")',
      hidden: ({parent}) => isColumnLoop(parent) || parent?.mediaType !== 'wistia',
    }),
    defineField({
      name: 'posterImage',
      title: 'Video thumbnail',
      type: 'image',
      group: 'media',
      description: 'Custom thumbnail shown before the video plays',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent) || parent?.mediaType !== 'wistia',
    }),
    defineField({
      name: 'stat',
      title: 'Stat',
      type: 'object',
      group: 'content',
      description: 'Optional. Leave empty to hide.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'number',
          title: 'Number',
          type: 'string',
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'placement',
          title: 'Placement',
          type: 'string',
          options: {
            list: toSanityList(STANDALONE_TWO_COLUMN_STAT_PLACEMENTS),
            layout: 'radio',
          },
          initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.statPlacement,
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'color',
          title: 'Color',
          type: 'string',
          options: {
            list: toSanityList(STANDALONE_TWO_COLUMN_EYEBROW_COLORS),
            layout: 'dropdown',
          },
          initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.eyebrowColor,
          components: {input: ThemeAwareEyebrowColorInput},
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'size',
          title: 'Size',
          type: 'string',
          options: {
            list: toSanityList(STANDALONE_TWO_COLUMN_HEADING_SIZES),
            layout: 'radio',
          },
          initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.headingSize,
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({name: 'href', title: 'URL', type: 'url'}),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'bodySize',
      title: 'Paragraph size',
      type: 'string',
      group: 'content',
      options: {
        list: toSanityList(STANDALONE_TWO_COLUMN_BODY_SIZES),
        layout: 'radio',
      },
      initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.bodySize,
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      group: 'content',
      description: 'Optional. Leave empty to hide.',
      // collapsed:false so click-to-edit on the logo can land on a visible
      // field. A collapsed quote object isn't auto-expanded by Presentation.
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'quoteText',
          title: 'Quote',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'quoterName',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'quoterPosition',
          title: 'Position / title',
          type: 'string',
        }),
        defineField({
          name: 'quoterLogo',
          title: 'Logo',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        }),
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      group: 'content',
      description: 'Optional. Up to two buttons.',
      validation: (Rule) => Rule.max(2),
      of: [
        {
          type: 'object',
          name: 'standaloneTwoColumnButton',
          title: 'Button',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: linkFields,
            }),
            defineField({
              name: 'style',
              title: 'Variation',
              type: 'string',
              description: 'Choose the button look — not a free colour picker.',
              options: {
                list: toSanityList(STANDALONE_TWO_COLUMN_BUTTON_STYLES),
                layout: 'dropdown',
              },
              initialValue: STANDALONE_TWO_COLUMN_DEFAULTS.buttonStyle,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              style: 'style',
            },
            prepare({label, style}) {
              const labels = Object.fromEntries(
                STANDALONE_TWO_COLUMN_BUTTON_STYLES.map((option) => [option.value, option.title]),
              )
              return {
                title: label || 'Button',
                subtitle: labels[style] || style,
              }
            },
          },
        },
      ],
      hidden: ({parent}) => isColumnLoop(parent),
    }),
    defineField({
      name: 'columnLoop',
      title: 'Column loop',
      type: 'array',
      group: 'content',
      description: 'Each item is a title, text, and image in the bigger-left split.',
      hidden: ({parent}) => !isColumnLoop(parent),
      of: [
        {
          type: 'object',
          name: 'standaloneTwoColumnLoopItem',
          title: 'Row',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      eyebrow: 'eyebrow.text',
      firstLoop: 'columnLoop.0.heading',
      layout: 'layout',
      rowMode: 'rowMode',
      theme: 'theme',
      background: 'background',
    },
    prepare({heading, eyebrow, firstLoop, layout, rowMode, theme, background}) {
      const isLoop = layout === 'biggerLeft' && rowMode === 'loop'
      const split = layout === 'biggerLeft' ? 'bigger left' : 'equal'
      const mode = isLoop ? 'column loop' : split
      return {
        title: (isLoop ? firstLoop : heading) || eyebrow || 'Standalone Two Column Block',
        subtitle: `${theme || 'light'} · ${background || 'white'} · ${mode}`,
      }
    },
  },
})
