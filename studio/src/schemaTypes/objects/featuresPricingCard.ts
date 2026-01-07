import {defineType, defineField} from 'sanity'

/**
 * Features Pricing Card - A pricing tier card component
 * Based on HubSpot module: features-pricing-card.module
 *
 * Features:
 * - Multiple pricing tier cards
 * - Each card has title, subtitle, divider, features list
 * - Optional "Includes:" heading
 * - Alignment options
 */

// Feature item definition
const featureItem = {
  type: 'object',
  name: 'pricingFeatureItem',
  title: 'Feature',
  fields: [
    defineField({
      name: 'text',
      title: 'Feature Text',
      type: 'string',
      description: 'The feature text (e.g., "2 POS/SSK licenses")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tooltip',
      title: 'Tooltip',
      type: 'text',
      rows: 2,
      description: 'Optional tooltip text that appears on hover',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      tooltip: 'tooltip',
    },
    prepare({title, tooltip}: {title?: string; tooltip?: string}) {
      return {
        title: title || 'Feature',
        subtitle: tooltip ? '💡 Has tooltip' : undefined,
      }
    },
  },
}

// Pricing card definition
const pricingCard = {
  type: 'object',
  name: 'pricingCardItem',
  title: 'Pricing Card',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The tier name (e.g., "Lite", "PRO", "PREMIUM")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Description of the tier',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show Divider',
      type: 'boolean',
      description: 'Show a divider line between header and features',
      initialValue: true,
    }),
    defineField({
      name: 'featuresHeading',
      title: 'Features Heading',
      type: 'string',
      description: 'Heading above the features list (e.g., "Includes:")',
      initialValue: 'Includes:',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [featureItem],
      description: 'List of features included in this tier',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional CTA button text',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
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
      subtitle: 'subtitle',
      features: 'features',
    },
    prepare({title, subtitle, features}: {title?: string; subtitle?: string; features?: unknown[]}) {
      const count = features?.length || 0
      return {
        title: title || 'Pricing Card',
        subtitle: `${count} feature${count !== 1 ? 's' : ''} • ${subtitle?.substring(0, 40) || ''}`,
      }
    },
  },
}

export default defineType({
  name: 'featuresPricingCard',
  title: 'Features Pricing Cards',
  type: 'object',
  icon: () => '💰',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Cards array
    defineField({
      name: 'cards',
      title: 'Pricing Cards',
      type: 'array',
      of: [pricingCard],
      group: 'content',
      description: 'Add pricing tier cards',
      validation: (Rule) => Rule.min(1),
    }),
    // Style options
    defineField({
      name: 'alignment',
      title: 'Card Alignment',
      type: 'string',
      group: 'style',
      options: {
        list: [
          {title: 'Left', value: 'LEFT'},
          {title: 'Center', value: 'CENTER'},
          {title: 'Right', value: 'RIGHT'},
        ],
        layout: 'radio',
      },
      initialValue: 'LEFT',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      group: 'style',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Tertiary', value: 'tertiary'},
          {title: 'Ghost', value: 'ghost'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
      alignment: 'alignment',
    },
    prepare({cards, alignment}) {
      const count = cards?.length || 0
      const titles = cards?.map((c: {title?: string}) => c.title).filter(Boolean).join(', ')
      return {
        title: `Pricing Cards (${count})`,
        subtitle: titles || `Alignment: ${alignment || 'LEFT'}`,
      }
    },
  },
})

