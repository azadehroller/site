import {defineType, defineField} from 'sanity'
import {createElement} from 'react'
import {
  DocumentTextIcon,
  BlockContentIcon,
  ImageIcon,
  PlayIcon,
  LinkIcon,
  StackIcon,
  BarChartIcon,
  CommentIcon,
  StarIcon,
  SparklesIcon,
  UsersIcon,
  DocumentIcon,
  EarthGlobeIcon,
  HelpCircleIcon,
  UlistIcon,
  ThListIcon,
  CreditCardIcon,
  DashboardIcon,
  ComposeIcon,
  BulbOutlineIcon,
  SyncIcon,
  CogIcon,
} from '@sanity/icons'

/**
 * Columns Block - a reusable layout component for pages
 * Supports 1, 2, 3, 4 column layouts plus 1/3 and 3/1 asymmetric layouts
 */

// ==========================================
// BLOCK DEFINITIONS - Organized by category
// ==========================================

// Regular Blocks (inline content)
const regularBlocks = [
  // Text & Content
  {type: 'headingComposition', title: '📝 Heading Composition', icon: BlockContentIcon},
  {type: 'textBlock', title: '📄 Text Block', icon: DocumentTextIcon},
  {type: 'rotatingTextBlock', title: '🔄 Rotating Text', icon: SyncIcon},
  // Media
  {type: 'advancedImage', title: '🖼️ Advanced Image', icon: ImageIcon},
  {type: 'image', title: '📷 Image (Simple)', icon: ImageIcon},
  {type: 'imageVideoModal', title: '▶️ Image Video Modal', icon: PlayIcon},
  // Buttons & Links
  {type: 'buttonStack', title: '🔘 Button Stack', icon: StackIcon},
  {type: 'button', title: '🔗 Button (Single)', icon: LinkIcon},
  // Statistics & Data
  {type: 'statsSet', title: '📊 Stats Set', icon: BarChartIcon},
  // Quotes & Testimonials
  {type: 'quoteBlock', title: '💬 Quote Block', icon: CommentIcon},
  // Features & Content
  {type: 'featuresStackedContent', title: '✨ Features Stacked Content', icon: SparklesIcon},
  {type: 'trustedPartner', title: '🤝 Trusted Partner', icon: UsersIcon},
  {type: 'industrySelector', title: '🏢 Industry Selector', icon: EarthGlobeIcon},
  // Lists & Tables
  {type: 'resultsList', title: '📋 Results List', icon: UlistIcon},
  {type: 'faqs', title: '❓ FAQs', icon: HelpCircleIcon},
  {type: 'comparisonTable', title: '📊 Comparison Table', icon: ThListIcon},
  // Sliders
  {type: 'featuresHorizontalSlider', title: '🎠 Features Horizontal Slider', icon: PlayIcon},
  // Cards
  {type: 'featuresPricingCard', title: '💰 Features Pricing Cards', icon: CreditCardIcon},
  {type: 'cardSegmentation', title: '🎴 Card Segmentation', icon: DashboardIcon},
  {type: 'widgetUserReviewCard', title: '⭐ User Review Card', icon: StarIcon},
  // Forms
  {type: 'hubspotFormReference', title: '📝 HubSpot Form', icon: DocumentIcon},
  // Inline variants (not global references)
  {type: 'industrySelectorGlobal', title: '🏢 Industry Selector (Inline)', icon: EarthGlobeIcon},
]

// Global Blocks (references to singleton documents)
const globalBlocks = [
  {type: 'logoSetReference', title: '🏷️ Logo Set (Global)', icon: CogIcon},
  {type: 'widgetStatsReference', title: '📈 Widget Stats (Global)', icon: BarChartIcon},
  {type: 'widgetUserReviewsReference', title: '⭐ Widget User Reviews (Global)', icon: StarIcon},
  {type: 'testimonialCarouselReference', title: '💬 Testimonial Carousel (Global)', icon: CommentIcon},
  {type: 'featuresSelectorGlobalReference', title: '✨ Features Selector (Global)', icon: SparklesIcon},
  {type: 'industrySelectorGlobalReference', title: '🌍 Industry Selector (Global)', icon: EarthGlobeIcon},
  {type: 'statsSetStackedGlobalReference', title: '📊 Stats Set Stacked (Global)', icon: BarChartIcon},
]

// Combined blocks for column arrays
const allColumnBlocks = [...regularBlocks, ...globalBlocks]

export default defineType({
  name: 'columnsBlock',
  title: 'Columns',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'layout', title: 'Layout'},
    {name: 'background', title: 'Background'},
    {name: 'spacing', title: 'Spacing'},
  ],
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description: 'Choose the column layout',
      group: 'layout',
      options: {
        list: [
          {title: '1 Column (Full Width)', value: '1'},
          {title: '2 Columns (Equal)', value: '2'},
          {title: '3 Columns (Equal)', value: '3'},
          {title: '4 Columns (Equal)', value: '4'},
          {title: '2 Columns (1/3 + 2/3)', value: '1/3'},
          {title: '2 Columns (2/3 + 1/3)', value: '3/1'},
          {title: '2 Columns (1/4 + 3/4)', value: '1/4'},
          {title: '2 Columns (3/4 + 1/4)', value: '4/1'},
        ],
        layout: 'radio',
      },
      initialValue: '2',
      validation: (Rule) => Rule.required(),
    }),
    // Background Settings
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Set the background color for this section',
      group: 'background',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Blue 10 (#011840)', value: 'var(--blue-10)'},
          {title: 'Blue 30 (#033180)', value: 'var(--blue-30)'},
          {title: 'Blue 90 (#CEDFFD)', value: 'var(--blue-90)'},
          {title: 'Blue 95 (#EBF2FE)', value: 'var(--blue-95)'},
          {title: 'Blue 99 (#f5f8ff)', value: 'var(--blue-99)'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Enter a custom hex color (e.g., #ff5500)',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      description: 'Position of the background image',
      group: 'background',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Top Left', value: 'top left'},
          {title: 'Top Right', value: 'top right'},
          {title: 'Bottom Left', value: 'bottom left'},
          {title: 'Bottom Right', value: 'bottom right'},
        ],
      },
      initialValue: 'center',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    defineField({
      name: 'backgroundSize',
      title: 'Background Size',
      type: 'string',
      description: 'How the background image should be sized',
      group: 'background',
      options: {
        list: [
          {title: 'Cover (fill entire area)', value: 'cover'},
          {title: 'Contain (fit within area)', value: 'contain'},
          {title: 'Natural Size (auto)', value: 'auto'},
        ],
      },
      initialValue: 'cover',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    // Background Gradient Settings
    defineField({
      name: 'backgroundGradient',
      title: 'Background Gradient',
      type: 'string',
      description: 'Enable a linear gradient background (top to bottom)',
      group: 'background',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Custom Gradient', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'gradientColorStart',
      title: 'Gradient Start Color (Top)',
      type: 'string',
      description: 'Hex color for the top of the gradient (e.g., #033180)',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundGradient !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {backgroundGradient?: string}
          if (parent?.backgroundGradient === 'custom' && !value) {
            return 'Gradient start color is required when gradient is enabled'
          }
          if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
            return 'Please enter a valid hex color (e.g., #033180)'
          }
          return true
        }),
    }),
    defineField({
      name: 'gradientColorEnd',
      title: 'Gradient End Color (Bottom)',
      type: 'string',
      description: 'Hex color for the bottom of the gradient (e.g., #011840)',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundGradient !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {backgroundGradient?: string}
          if (parent?.backgroundGradient === 'custom' && !value) {
            return 'Gradient end color is required when gradient is enabled'
          }
          if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
            return 'Please enter a valid hex color (e.g., #011840)'
          }
          return true
        }),
    }),
    // Spacing Settings
    defineField({
      name: 'paddingTop',
      title: 'Padding Top (Desktop)',
      type: 'string',
      description: 'Top padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '80px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingTopMobile',
      title: 'Padding Top (Mobile)',
      type: 'string',
      description: 'Top padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '48px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom (Desktop)',
      type: 'string',
      description: 'Bottom padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingBottomMobile',
      title: 'Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingLeft',
      title: 'Padding Left (Desktop)',
      type: 'string',
      description: 'Left padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingLeftMobile',
      title: 'Padding Left (Mobile)',
      type: 'string',
      description: 'Left padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingRight',
      title: 'Padding Right (Desktop)',
      type: 'string',
      description: 'Right padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingRightMobile',
      title: 'Padding Right (Mobile)',
      type: 'string',
      description: 'Right padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'array',
      group: 'content',
      of: allColumnBlocks,
      description: 'Add content blocks to this column',
    }),
    defineField({
      name: 'column1PaddingBottomMobile',
      title: 'Column 1 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 1 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'array',
      group: 'content',
      of: allColumnBlocks,
      description: 'Add content blocks to this column',
      hidden: ({parent}) => parent?.layout === '1',
    }),
    defineField({
      name: 'column2PaddingBottomMobile',
      title: 'Column 2 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 2 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {layout?: string}
          // Only require if field is visible (layout is not '1')
          if (parent?.layout !== '1' && !value) {
            return 'Column 2 Padding Bottom (Mobile) is required'
          }
          return true
        }),
      hidden: ({parent}) => parent?.layout === '1',
    }),
    defineField({
      name: 'column3',
      title: 'Column 3',
      type: 'array',
      group: 'content',
      of: allColumnBlocks,
      description: 'Add content blocks to this column',
      hidden: ({parent}) => !['3', '4'].includes(parent?.layout),
    }),
    defineField({
      name: 'column3PaddingBottomMobile',
      title: 'Column 3 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 3 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {layout?: string}
          // Only require if field is visible (layout is '3' or '4')
          if (['3', '4'].includes(parent?.layout || '') && !value) {
            return 'Column 3 Padding Bottom (Mobile) is required'
          }
          return true
        }),
      hidden: ({parent}) => !['3', '4'].includes(parent?.layout),
    }),
    defineField({
      name: 'column4',
      title: 'Column 4',
      type: 'array',
      group: 'content',
      of: allColumnBlocks,
      description: 'Add content blocks to this column',
      hidden: ({parent}) => parent?.layout !== '4',
    }),
    defineField({
      name: 'column4PaddingBottomMobile',
      title: 'Column 4 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 4 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {layout?: string}
          // Only require if field is visible (layout is '4')
          if (parent?.layout === '4' && !value) {
            return 'Column 4 Padding Bottom (Mobile) is required'
          }
          return true
        }),
      hidden: ({parent}) => parent?.layout !== '4',
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      column1: 'column1',
      column2: 'column2',
      column3: 'column3',
      column4: 'column4',
    },
    prepare({layout, column1, column2, column3, column4}) {
      const layoutLabels: Record<string, string> = {
        '1': '1 Column',
        '2': '2 Columns',
        '3': '3 Columns',
        '4': '4 Columns',
        '1/3': '1/3 + 2/3',
        '3/1': '2/3 + 1/3',
        '1/4': '1/4 + 3/4',
        '4/1': '3/4 + 1/4',
      }

      // Get first block type name from each column
      const getColumnLabel = (col: Array<{_type: string}> | undefined, num: number): string => {
        if (!col || col.length === 0) return ''
        const firstType = col[0]?._type || 'block'
        const count = col.length
        return `Col${num}: ${firstType}${count > 1 ? ` +${count - 1}` : ''}`
      }

      const parts: string[] = []
      if (column1?.length) parts.push(getColumnLabel(column1, 1))
      if (column2?.length) parts.push(getColumnLabel(column2, 2))
      if (column3?.length) parts.push(getColumnLabel(column3, 3))
      if (column4?.length) parts.push(getColumnLabel(column4, 4))

      // Use a static preview image for columnsBlock
      // Save your screenshot to: studio/public/columns-preview.png
      const previewImageUrl = '/columns-preview.png'

      return {
        title: layoutLabels[layout] || 'Columns',
        subtitle: parts.join(' | ') || 'Empty',
        media: createElement('img', {
          src: previewImageUrl,
          alt: 'Columns block',
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }),
      }
    },
  },
})

