import {defineType, defineField} from 'sanity'

// Reads the block's theme from the full document context.
// Used by card-level fields (mediaSide, mediaOnTopMobile) that need
// to know the enclosing twoColumnSection's columnLayout.
function getBlockField(document: any, field: string): any {
  const sections = (document as any)?.sections || []
  const block = sections.find((s: any) => s._type === 'twoColumnSection')
  return block?.[field]
}

export default defineType({
  name: 'twoColumnSection',
  title: 'Two Column Block',
  type: 'object',
  // `cards` is the default group on purpose: it holds all the editable content
  // (eyebrow, title, body, stats, quote, buttons). Sanity's "Open in Studio"
  // deep-link focus does NOT switch field groups on a cold load — it can only
  // drill into fields that live in the group the block opens on. With `layout`
  // as default, clicking an element in the frontend opened the block on the
  // Layout tab where `cards` isn't visible, so focus stalled there. Defaulting
  // to `cards` lets click-to-edit reach the nested fields.
  groups: [
    {name: 'cards', title: 'Cards', default: true},
    {name: 'layout', title: 'Layout'},
  ],
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columnLayout',
      title: 'Column Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Two equal', value: 'equal'},
          {title: 'Bigger text', value: 'biggerText'},
        ],
        layout: 'radio',
      },
      initialValue: 'equal',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'object',
      group: 'layout',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Colour', value: 'colour'},
              {title: 'Image', value: 'image'},
            ],
            layout: 'radio',
          },
          initialValue: 'none',
        }),
        defineField({
          name: 'colourOptionLight',
          title: 'Colour (light theme)',
          type: 'string',
          options: {
            list: [
              {title: 'Light', value: 'light'},
              {title: 'Light blue', value: 'lightBlue'},
            ],
            layout: 'radio',
          },
          hidden: ({parent, document}) =>
            parent?.type !== 'colour' || getBlockField(document, 'theme') === 'dark',
        }),
        defineField({
          name: 'colourOptionDark',
          title: 'Colour (dark theme)',
          type: 'string',
          options: {
            list: [
              {title: 'Navy', value: 'navy'},
              {title: 'Dark', value: 'dark'},
            ],
            layout: 'radio',
          },
          hidden: ({parent, document}) =>
            parent?.type !== 'colour' || getBlockField(document, 'theme') !== 'dark',
        }),
        defineField({
          name: 'imageOption',
          title: 'Background Image',
          type: 'string',
          options: {
            list: [
              {title: 'Blue blob', value: 'blueBlob'},
              {title: 'Gradient blob', value: 'gradientBlob'},
            ],
            layout: 'radio',
          },
          hidden: ({parent}) => parent?.type !== 'image',
        }),
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      group: 'cards',
      validation: (Rule) => Rule.min(1),
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            // ── MEDIA COLUMN ──
            // collapsed:false so "Open in Studio" click-to-edit lands on a
            // visible field. A collapsed object isn't auto-expanded by the
            // cold-load deep-link focus, so the editor would just see the card.
            defineField({
              name: 'media',
              title: 'Media',
              type: 'media',
              options: {collapsible: true, collapsed: false},
            }),
            defineField({
              name: 'mediaSide',
              title: 'Media Side (desktop)',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
                layout: 'radio',
              },
              initialValue: 'left',
              hidden: ({document}) => getBlockField(document, 'columnLayout') !== 'equal',
            }),
            defineField({
              name: 'mediaOnTopMobile',
              title: 'Media on top on mobile',
              type: 'boolean',
              initialValue: false,
              hidden: ({document}) => getBlockField(document, 'columnLayout') !== 'equal',
            }),
            // ── CONTENT COLUMN (fixed render order) ──
            defineField({
              name: 'richTextBlock',
              title: '📝 Text content',
              description: 'Eyebrow, heading, and body text',
              type: 'richTextBlock',
              options: {collapsible: true, collapsed: false},
            }),
            defineField({
              name: 'stats',
              title: '📊 Stat',
              type: 'stats',
              // collapsed:false — a collapsed object can't be focused by the
              // Presentation "Open in Studio" deep-link (cold load doesn't
              // auto-expand it), so click-to-edit on the stat would show only
              // the card. Keep it open so the field is reachable.
              options: {collapsible: true, collapsed: false},
            }),
            defineField({
              name: 'quote',
              title: '💬 Quote',
              type: 'quote',
              // collapsed:false for the same click-to-edit reason as stats above.
              options: {collapsible: true, collapsed: false},
            }),
            defineField({
              name: 'buttons',
              title: '🔗 Buttons',
              type: 'array',
              of: [{type: 'btn'}],
              validation: (Rule) => Rule.max(2),
              options: {collapsible: true, collapsed: true} as any,
            }),
          ],
          preview: {
            select: {
              titleText: 'richTextBlock.title.text',
              mediaType: 'media.mediaType',
            },
            prepare({titleText, mediaType}) {
              return {
                title: titleText || 'Card',
                subtitle: `Media: ${mediaType || 'image'}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      theme: 'theme',
      columnLayout: 'columnLayout',
    },
    prepare({theme, columnLayout}) {
      const layoutLabel = columnLayout === 'biggerText' ? 'Bigger text' : 'Two equal'
      return {
        title: 'Two Column Block',
        subtitle: `${theme || 'light'} · ${layoutLabel}`,
      }
    },
  },
})
