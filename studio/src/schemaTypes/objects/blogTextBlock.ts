import {defineType, defineField} from 'sanity'

/**
 * Blog Text Block - rich text content block for blog posts
 * This is a STANDALONE section that can contain text AND inline images
 * Inline images (e.g., floated images inside paragraphs) are part of this block
 */

export default defineType({
  name: 'blogTextBlock',
  title: 'Text Block',
  type: 'object',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this section a name (only visible in the editor)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
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
              {title: 'Strike', value: 'strike-through'},
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
              // Inline style annotation for preserving HubSpot inline styles
              {
                name: 'inlineStyle',
                type: 'object',
                title: 'Inline Style',
                fields: [
                  {
                    name: 'style',
                    type: 'string',
                    title: 'CSS Style',
                  },
                ],
              },
            ],
          },
        },
        // Inline images (for floated images within text paragraphs)
        {
          type: 'object',
          name: 'inlineImage',
          title: 'Inline Image',
          icon: () => '📷',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Image URL',
              validation: (rule) => rule.required(),
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'width',
              type: 'number',
              title: 'Width',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Height',
            },
            {
              name: 'style',
              type: 'string',
              title: 'Inline Style',
              description: 'CSS style (e.g., float: right; margin-left: 10px;)',
            },
          ],
          preview: {
            select: {
              url: 'url',
              alt: 'alt',
            },
            prepare({url, alt}) {
              return {
                title: alt || 'Inline Image',
                subtitle: url?.substring(0, 50),
              }
            },
          },
        },
      ],
      description: 'Rich text content with inline images',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      content: 'content',
    },
    prepare({label, content}) {
      // Get first block's text for preview subtitle
      const firstBlock = content?.find((block: any) => block._type === 'block')
      const text = firstBlock?.children?.map((child: any) => child.text).join('') || 'Empty text block'
      return {
        title: label || '📝 Text Block',
        subtitle: text.length > 60 ? text.substring(0, 60) + '...' : text,
      }
    },
  },
})

