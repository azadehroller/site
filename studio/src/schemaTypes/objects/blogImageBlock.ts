import {defineType, defineField} from 'sanity'

/**
 * Blog Image Block - STANDALONE image section for blog posts
 * This is a page section, not nested inside text blocks
 */

export default defineType({
  name: 'blogImageBlock',
  title: 'Image Block',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Image URL',
      type: 'url',
      description: 'Use this instead of uploading an image (for migrated content)',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text (for external URL)',
      type: 'string',
      hidden: ({parent}) => !parent?.externalUrl,
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image',
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
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (400px)', value: 'small'},
          {title: 'Medium (600px)', value: 'medium'},
          {title: 'Large (800px)', value: 'large'},
          {title: 'Full Width', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'inlineStyle',
      title: 'Inline Style',
      type: 'string',
      description: 'CSS inline styles (e.g., "float: right; margin-left: 10px;")',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Image width in pixels',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Image height in pixels',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      alt: 'image.alt',
      externalUrl: 'externalUrl',
      media: 'image',
    },
    prepare({label, alt, externalUrl, media}) {
      return {
        title: label || alt || '🖼️ Image Block',
        subtitle: externalUrl || 'Sanity image',
        media,
      }
    },
  },
})

