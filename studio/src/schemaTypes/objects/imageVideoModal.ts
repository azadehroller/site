import {defineType, defineField} from 'sanity'

/**
 * Image Video Modal - a thumbnail image that opens a Wistia video in a modal
 * Only available inside Columns block
 */

export default defineType({
  name: 'imageVideoModal',
  title: 'Image Video Modal',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loading',
      title: 'Image Loading',
      type: 'string',
      description: 'How the browser should load the thumbnail image',
      options: {
        list: [
          {title: 'Lazy', value: 'lazy'},
          {title: 'Eager', value: 'eager'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'lazy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Wistia Video ID',
      type: 'string',
      description: 'The Wistia video ID (e.g., "fw30aqal7w")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'border',
      title: 'Show Border',
      type: 'boolean',
      description: 'Add a blue border around the thumbnail',
      initialValue: false,
    }),
    defineField({
      name: 'lightBackgroundShadow',
      title: 'Light Background Shadow',
      type: 'boolean',
      description: 'Use lighter shadow (for light backgrounds)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      videoId: 'videoId',
      media: 'thumbnail',
    },
    prepare({label, videoId, media}) {
      return {
        title: label || 'Image Video Modal',
        subtitle: videoId ? `Video: ${videoId}` : 'No video set',
        media,
      }
    },
  },
})

