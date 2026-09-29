import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Wistia video', value: 'wistia'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'wistiaId',
      title: 'Wistia Video ID',
      type: 'string',
      description: 'The Wistia video ID (e.g. "abc123xyz")',
      hidden: ({parent}) => parent?.mediaType !== 'wistia',
    }),
    defineField({
      name: 'posterImage',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Custom thumbnail displayed before the video plays',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'wistia',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      wistiaId: 'wistiaId',
    },
    prepare({mediaType, wistiaId}) {
      return {
        title: mediaType === 'wistia' ? `Wistia: ${wistiaId || 'No ID set'}` : 'Image',
        subtitle: mediaType || 'image',
      }
    },
  },
})
