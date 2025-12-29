import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),

    // External image support
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Image URL',
          type: 'url',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    // Body content - supports both rich text and raw HTML
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        // Standard rich text blocks (for new/editable content)
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        // Raw HTML blocks (for migrated HubSpot content)
        {
          type: 'object',
          name: 'rawHtml',
          title: 'Raw HTML (Migrated Content)',
          options: {
            collapsible: false, // Always show expanded
          },
          fields: [
            defineField({
              name: 'html',
              title: 'HTML Code (Click to edit)',
              type: 'text',
              rows: 30,
              description: 'Raw HTML content migrated from HubSpot. Click in the text area above to edit the HTML directly.',
            }),
          ],
          preview: {
            select: {
              html: 'html',
            },
            prepare({html}: {html?: string}) {
              const stripped = html
                ? html.replace(/<[^>]*>/g, '').substring(0, 80)
                : 'Empty HTML block';
              return {
                title: '🔧 Raw HTML Block (Click to Edit)',
                subtitle: stripped + '...',
              };
            },
          },
        },
        // Image block for adding images
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            defineField({
              name: 'url',
              title: 'Image URL',
              type: 'url',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'alignment',
              title: 'Alignment',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'center',
            }),
          ],
          preview: {
            select: {
              url: 'url',
              alt: 'alt',
              alignment: 'alignment',
            },
            prepare({url, alt, alignment}: {url?: string; alt?: string; alignment?: string}) {
              return {
                title: '🖼️ ' + (alt || 'Image') + (alignment ? ` (${alignment})` : ''),
                subtitle: url || 'No URL set',
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
