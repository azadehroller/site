import {defineType, defineField} from 'sanity'

/**
 * Industry Selector - A grid of industry links with icons
 * Based on FeaturesSelector structure
 * Uses HeadingComposition for the header section
 */

// Industry item definition
const industryItem = {
  type: 'object' as const,
  name: 'industryItem',
  title: 'Industry',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 4,
      description: 'Paste SVG code for the industry icon. This will be used if no Lottie animation is provided.',
      hidden: ({parent}) => !!parent?.animationFile,
    }),
    defineField({
      name: 'animationFile',
      title: 'Lottie Animation (JSON)',
      type: 'file',
      description: 'Upload a Lottie animation JSON file. If provided, this will be used instead of the SVG icon.',
      options: {
        accept: '.json,application/json',
      },
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
      hasLottie: 'animationFile',
    },
    prepare(selection: Record<string, unknown>) {
      const hasLottie = !!selection.hasLottie
      return {
        title: (selection.title as string) || 'Industry Item',
        subtitle: hasLottie ? '🎬 Lottie Animation' : '🖼️ SVG Icon',
      }
    },
  },
}

export default defineType({
  name: 'industrySelector',
  title: 'Industry Selector',
  type: 'object',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'industries', title: 'Industries'},
    {name: 'cta', title: 'CTA'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // Theme
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'settings',
      description: 'Choose the visual theme for this component',
      options: {
        list: [
          {title: 'Light (OnDark - Blue background with white text)', value: 'light'},
          {title: 'Dark (OnLight - White background with blue text)', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      validation: (Rule) => Rule.required(),
    }),

    // Heading - uses HeadingComposition type
    defineField({
      name: 'heading',
      title: 'Heading Section',
      type: 'headingComposition',
      group: 'header',
      description: 'Optional header with eyebrow, title, and description.',
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

    // CTA
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'cta',
      description: 'Text for the call-to-action link',
      initialValue: 'See all industries',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          initialValue: '/industries',
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
      headingTitle: 'heading.title',
      headingEyebrow: 'heading.eyebrow',
      industries: 'industries',
    },
    prepare({headingTitle, headingEyebrow, industries}) {
      const count = industries?.length || 0
      const title = headingTitle || headingEyebrow || 'Industry Selector'
      return {
        title,
        subtitle: `${count} industrie${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
