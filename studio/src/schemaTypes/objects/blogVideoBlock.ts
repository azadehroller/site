import {defineType, defineField} from 'sanity'

/**
 * Blog Video Block - inline video embed for blog posts
 * Supports Wistia, YouTube, and Vimeo
 */

export default defineType({
  name: 'blogVideoBlock',
  title: 'Video Block',
  type: 'object',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this block a name (only visible in the editor)',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Wistia', value: 'wistia'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
        ],
        layout: 'radio',
      },
      initialValue: 'wistia',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The video ID (e.g., "9r44t44kxz" for Wistia, "dQw4w9WgXcQ" for YouTube)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Optional title displayed above the video',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9 (Widescreen)', value: '16:9'},
          {title: '4:3 (Standard)', value: '4:3'},
          {title: '1:1 (Square)', value: '1:1'},
        ],
        layout: 'dropdown',
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      description: 'Maximum width (e.g., "540px", "100%")',
      initialValue: '100%',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Start playing automatically (muted)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      videoType: 'videoType',
      videoId: 'videoId',
      title: 'title',
    },
    prepare({label, videoType, videoId, title}) {
      const platform = videoType === 'wistia' ? '🎬 Wistia' : 
                       videoType === 'youtube' ? '▶️ YouTube' : 
                       videoType === 'vimeo' ? '🎥 Vimeo' : '📹 Video'
      return {
        title: label || title || `${platform} Video`,
        subtitle: videoId ? `${platform}: ${videoId}` : 'No video ID set',
      }
    },
  },
})

