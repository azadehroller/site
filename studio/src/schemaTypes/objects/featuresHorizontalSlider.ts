import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'

/**
 * Features Horizontal Slider - A Swiper-based slider component
 * Features:
 * - Fade effect between slides with autoplay
 * - Custom pagination with progress bar animation
 * - Each slide has an image, title, content, and CTA link
 * - Theme options (OnDark, OnLight, GxScore)
 */

export default defineType({
  name: 'featuresHorizontalSlider',
  title: 'Features Horizontal Slider',
  type: 'object',
  icon: PlayIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content - Slides array
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      group: 'content',
      description: 'Add up to 4 slides for the horizontal slider',
      validation: (Rule) => Rule.min(1).max(4),
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The slide title displayed in the pagination',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              description: 'The slide description displayed in the pagination',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'The main slide image (1248x520px recommended)',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for accessibility',
                }),
              ],
            }),
            defineField({
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
              description: 'Text for the CTA link',
              initialValue: 'Learn more',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'href',
                  title: 'URL',
                  type: 'string',
                  description: 'The link URL',
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
                  description: 'Add rel="nofollow" to the link',
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({title, media}) {
              return {
                title: title || 'Untitled Slide',
                media,
              }
            },
          },
        },
      ],
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Color theme for the slider',
      group: 'style',
      options: {
        list: [
          {title: 'OnLight', value: 'dark'},
          {title: 'OnDark', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'autoplayDelay',
      title: 'Autoplay Delay (ms)',
      type: 'number',
      description: 'Time between slides in milliseconds',
      group: 'style',
      initialValue: 5000,
      validation: (Rule) => Rule.min(1000).max(15000),
    }),
  ],
  preview: {
    select: {
      slides: 'slides',
      theme: 'theme',
    },
    prepare({slides, theme}) {
      const slideCount = slides?.length || 0
      const themeLabel = theme === 'light' ? 'OnDark' : theme === 'gxscore' ? 'GxScore' : 'OnLight'
      return {
        title: `Features Slider (${slideCount} slide${slideCount !== 1 ? 's' : ''})`,
        subtitle: `Theme: ${themeLabel}`,
        media: PlayIcon,
      }
    },
  },
})

