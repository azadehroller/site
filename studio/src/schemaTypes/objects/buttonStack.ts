import {defineType, defineField} from 'sanity'

/**
 * Button Stack - a reusable component for displaying multiple buttons
 * Supports various button styles, icons, modals, and video triggers
 */

export default defineType({
  name: 'buttonStack',
  title: 'Button Stack',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Button List - array of buttons
    defineField({
      name: 'buttonList',
      title: 'Button Stack',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'button',
          fields: [
            // Button Settings
            defineField({
              name: 'buttonSettings',
              title: 'Button Settings',
              type: 'object',
              fields: [
                defineField({
                  name: 'modalTrigger',
                  title: 'Modal Form Trigger',
                  type: 'boolean',
                  description: 'Open a form modal when clicked',
                  initialValue: false,
                }),
                defineField({
                  name: 'modalTriggerVideo',
                  title: 'Modal Video',
                  type: 'boolean',
                  description: 'Once enabled this will overwrite the Button link field.',
                  initialValue: false,
                }),
                defineField({
                  name: 'formId',
                  title: 'Form ID',
                  type: 'string',
                  description: 'HubSpot Form ID (if using modal trigger)',
                  hidden: ({parent}) => !parent?.modalTrigger,
                }),
                defineField({
                  name: 'videoId',
                  title: 'Video ID',
                  type: 'string',
                  description: 'Wistia Video ID (e.g., "7m36ou6gdt")',
                  placeholder: 'i.e. 7m36ou6gdt',
                  hidden: ({parent}) => !parent?.modalTriggerVideo,
                }),
                defineField({
                  name: 'btnLabel',
                  title: 'Label',
                  type: 'string',
                  description: 'Button text',
                  initialValue: 'Get started',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'buttonLink',
                  title: 'Button Link',
                  type: 'object',
                  description: 'Link URL for the button',
                  hidden: ({parent}) => parent?.modalTrigger === true || parent?.modalTriggerVideo === true,
                  fields: [
                    defineField({
                      name: 'href',
                      title: 'URL',
                      type: 'url',
                      validation: (Rule) => Rule.required(),
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
                  ],
                }),
              ],
            }),
            // Icon Settings
            defineField({
              name: 'btnIcon',
              title: 'Icon',
              type: 'object',
              fields: [
                defineField({
                  name: 'iconFieldSvg',
                  title: 'SVG icon code',
                  type: 'text',
                  description: 'To remove the icon, leave this field empty.',
                }),
                defineField({
                  name: 'iconPosition',
                  title: 'Position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'left',
                }),
              ],
            }),
            // Button Styles
            defineField({
              name: 'buttonStyles',
              title: 'Button Styles',
              type: 'object',
              fields: [
                defineField({
                  name: 'bgKind',
                  title: 'Kind',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Primary', value: 'primary'},
                      {title: 'Secondary', value: 'secondary'},
                      {title: 'Tertiary', value: 'tertiary'},
                      {title: 'Ghost', value: 'ghost'},
                      {title: 'Primary-Inverted', value: 'primary-inverted'},
                      {title: 'GX Score', value: 'gx_score'},
                      {title: 'GX Score Inverted', value: 'gx_score_inverted'},
                      {title: 'Industry Report', value: 'industry_report'},
                    ],
                    layout: 'dropdown',
                  },
                  initialValue: 'primary',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              label: 'buttonSettings.btnLabel',
              kind: 'buttonStyles.bgKind',
            },
            prepare({label, kind}) {
              return {
                title: label || 'Button',
                subtitle: kind ? `Style: ${kind}` : '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    // Styles Group
    defineField({
      name: 'styles',
      title: 'Styles',
      type: 'object',
      group: 'styles',
      fields: [
        // Layout
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'object',
          fields: [
            defineField({
              name: 'spacing',
              title: 'Spacing',
              type: 'object',
              fields: [
                defineField({
                  name: 'marginTop',
                  title: 'Margin Top',
                  type: 'string',
                  options: {
                    list: [
                      {title: '0px', value: '0px'},
                      {title: '8px', value: '8px'},
                      {title: '16px', value: '16px'},
                      {title: '24px', value: '24px'},
                      {title: '32px', value: '32px'},
                      {title: '48px', value: '48px'},
                      {title: '64px', value: '64px'},
                      {title: '80px', value: '80px'},
                    ],
                  },
                  initialValue: '0px',
                }),
                defineField({
                  name: 'marginBottom',
                  title: 'Margin Bottom',
                  type: 'string',
                  options: {
                    list: [
                      {title: '0px', value: '0px'},
                      {title: '8px', value: '8px'},
                      {title: '16px', value: '16px'},
                      {title: '24px', value: '24px'},
                      {title: '32px', value: '32px'},
                      {title: '48px', value: '48px'},
                      {title: '64px', value: '64px'},
                      {title: '80px', value: '80px'},
                    ],
                  },
                  initialValue: '0px',
                }),
                defineField({
                  name: 'marginLeft',
                  title: 'Margin Left',
                  type: 'string',
                  options: {
                    list: [
                      {title: '0px', value: '0px'},
                      {title: '8px', value: '8px'},
                      {title: '16px', value: '16px'},
                      {title: '24px', value: '24px'},
                      {title: '32px', value: '32px'},
                      {title: '48px', value: '48px'},
                      {title: '64px', value: '64px'},
                      {title: '80px', value: '80px'},
                    ],
                  },
                  initialValue: '0px',
                }),
                defineField({
                  name: 'marginRight',
                  title: 'Margin Right',
                  type: 'string',
                  options: {
                    list: [
                      {title: '0px', value: '0px'},
                      {title: '8px', value: '8px'},
                      {title: '16px', value: '16px'},
                      {title: '24px', value: '24px'},
                      {title: '32px', value: '32px'},
                      {title: '48px', value: '48px'},
                      {title: '64px', value: '64px'},
                      {title: '80px', value: '80px'},
                    ],
                  },
                  initialValue: '0px',
                }),
              ],
            }),
            defineField({
              name: 'alignment',
              title: 'Alignment',
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
          ],
        }),
        // Animation
        defineField({
          name: 'animation',
          title: 'Animation',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'None', value: 'none'},
                  {title: 'Pulse', value: 'pulse'},
                ],
                layout: 'radio',
              },
              initialValue: 'none',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      buttonCount: 'buttonList',
    },
    prepare({buttonCount}) {
      const count = Array.isArray(buttonCount) ? buttonCount.length : 0
      return {
        title: 'Button Stack',
        subtitle: `${count} button${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

