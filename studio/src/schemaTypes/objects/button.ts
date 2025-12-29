import {defineType, defineField} from 'sanity'

/**
 * Button - a single button component
 * Matches HubSpot button.module structure
 * Supports various styles, icons, animations, and alignment
 */

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'icon', title: 'Icon'},
    {name: 'styles', title: 'Styles'},
  ],
  fields: [
    // Button Settings Group
    defineField({
      name: 'settings',
      title: 'Button Settings',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'The text displayed on the button',
          initialValue: 'Add a button link here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              description: 'The link URL',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                }),
            }),
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
    // Icon Group
    defineField({
      name: 'btnIcon',
      title: 'Icon',
      type: 'object',
      group: 'icon',
      fields: [
        defineField({
          name: 'iconFieldSvg',
          title: 'SVG Icon Code',
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
    // Styles Group
    defineField({
      name: 'styles',
      title: 'Styles',
      type: 'object',
      group: 'styles',
      fields: [
        // Background
        defineField({
          name: 'background',
          title: 'Background',
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
                  {title: 'GX Score', value: 'gx_score'},
                  {title: 'Iris', value: 'iris'},
                  {title: 'Alternative', value: 'alternative'},
                  {title: 'Bright Blue', value: 'bright_blue'},
                  {title: 'Transparent', value: 'transparent'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'primary',
            }),
          ],
        }),
        // Alignment
        defineField({
          name: 'alignment',
          title: 'Alignment',
          type: 'object',
          fields: [
            defineField({
              name: 'horizontalAlign',
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
              initialValue: 'LEFT',
            }),
            defineField({
              name: 'buttonWidth',
              title: 'Button Width',
              type: 'string',
              options: {
                list: [
                  {title: 'Auto width on mobile', value: 'auto'},
                  {title: 'Full width on mobile', value: 'full'},
                ],
                layout: 'radio',
              },
              initialValue: 'auto',
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
                  {title: 'ScrollTo', value: 'scrollto'},
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
      buttonText: 'settings.buttonText',
      bgKind: 'styles.background.bgKind',
    },
    prepare({buttonText, bgKind}) {
      return {
        title: buttonText || 'Button',
        subtitle: bgKind ? `Style: ${bgKind}` : 'Style: primary',
      }
    },
  },
})

