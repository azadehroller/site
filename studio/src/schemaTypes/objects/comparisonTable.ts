import {defineType, defineField} from 'sanity'

/**
 * Comparison Table - A side-by-side comparison component
 * Based on HubSpot module: comparison-table.module
 *
 * Features:
 * - Two or more comparison columns
 * - Each column can be marked as "competitor" to show X icons instead of checkmarks
 * - Header title for each column
 * - Array of comparison items/features for each column
 */

// Comparison item definition (single item in a comparison column)
const comparisonItem = {
  type: 'object',
  name: 'comparisonItem',
  title: 'Item',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'The comparison item text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'text',
    },
    prepare({title}) {
      return {
        title: title || 'Comparison Item',
      }
    },
  },
}

// Comparison column definition
const comparisonColumn = {
  type: 'object',
  name: 'comparisonColumn',
  title: 'Comparison Column',
  fields: [
    defineField({
      name: 'isCompetitor',
      title: 'Is Competitor Column',
      type: 'boolean',
      description: 'If enabled, shows X icons (negative) instead of checkmarks (positive)',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      description: 'The header title for this comparison column',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Comparison Items',
      type: 'array',
      of: [comparisonItem],
      validation: (Rule) => Rule.min(1).error('At least one item is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isCompetitor: 'isCompetitor',
      items: 'items',
    },
    prepare({title, isCompetitor, items}) {
      const count = items?.length || 0
      return {
        title: title || 'Untitled Column',
        subtitle: `${isCompetitor ? '❌ Competitor' : '✓ Positive'} • ${count} item${count !== 1 ? 's' : ''}`,
      }
    },
  },
}

export default defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    // Comparison columns array
    defineField({
      name: 'columns',
      title: 'Comparison Columns',
      type: 'array',
      of: [comparisonColumn],
      validation: (Rule) => Rule.min(2).max(2).error('Exactly 2 comparison columns are required'),
      description: 'Add comparison columns (typically ROLLER vs Competitors)',
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
    },
    prepare({columns}) {
      const count = columns?.length || 0
      const titles = columns?.map((col: {title?: string}) => col.title).filter(Boolean).join(' vs ') || 'Comparison Table'
      return {
        title: titles,
        subtitle: `${count} column${count !== 1 ? 's' : ''}`,
      }
    },
  },
})


