import {defineType, defineField} from 'sanity'

/**
 * Industry Selector - A grid of industry links with icons/animations
 * Based on HubSpot module: industry-selector.module
 *
 * Features:
 * - Header section with eyebrow, title, and description
 * - Theme options (OnDark, OnLight)
 * - Text alignment and typography controls
 * - Array of industries with icons, titles, and links
 * - Optional Lottie animation support
 */

// Industry item definition
const industryItem = {
  type: 'object',
  name: 'industryItem',
  title: 'Industry',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 4,
      description: 'Paste SVG code for the industry icon. Used when animation is disabled.',
    }),
    defineField({
      name: 'animationFile',
      title: 'Animation File URL',
      type: 'url',
      description: 'URL to a Lottie JSON animation file (optional). If provided, will be used instead of the static icon.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Industry Item',
      }
    },
  },
}

export default defineType({
  name: 'industrySelector',
  title: 'Industry Selector',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'styles', title: 'Selector Styles'},
    {name: 'industries', title: 'Industries'},
  ],
  fields: [
    // Embedded HeadingComposition for the header (has its own styling)
    defineField({
      name: 'heading',
      title: 'Heading Section',
      type: 'headingComposition',
      group: 'content',
      description: 'Optional header with eyebrow, title, and description. Has its own styling options.',
    }),

    // Header image (for light theme)
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      group: 'content',
      description: 'Image shown in the header section (used in light theme)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headerImageAlt',
      title: 'Header Image Alt Text',
      type: 'string',
      group: 'content',
    }),

    // Style settings (only for the industry selector, not the heading)
    defineField({
      name: 'theme',
      title: 'Selector Theme',
      type: 'string',
      group: 'styles',
      description: 'Theme for the industry selector container (heading has its own theme)',
      options: {
        list: [
          {title: 'On Dark (Light Text)', value: 'light'},
          {title: 'On Light (Dark Text)', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'useAnimations',
      title: 'Use Lottie Animations',
      type: 'boolean',
      group: 'styles',
      description: 'When enabled, use animation files instead of static icons',
      initialValue: false,
    }),

    // Industries array
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'industries',
      of: [industryItem],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      headingTitle: 'heading.title',
      headingEyebrow: 'heading.eyebrow',
      industries: 'industries',
      theme: 'theme',
    },
    prepare({headingTitle, headingEyebrow, industries, theme}) {
      const count = industries?.length || 0
      const title = headingTitle || headingEyebrow || 'Industry Selector'
      return {
        title,
        subtitle: `${count} industrie${count !== 1 ? 's' : ''} • ${theme === 'light' ? 'On Dark' : 'On Light'}`,
      }
    },
  },
})

