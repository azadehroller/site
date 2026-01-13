import {defineType, defineField} from 'sanity'

/**
 * Blog Table Data - User-friendly structured table for blog posts
 * Replaces raw HTML tables with a clean, editable data structure
 */

export default defineType({
  name: 'blogTableData',
  title: 'Table (Structured)',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Give this table a name (only visible in the editor)',
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Column header names (e.g., "Metric", "Definition", "Why it matters")',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{type: 'text', rows: 3}],
              description: 'Cell values for this row (match column count)',
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({cells}) {
              const firstCell = cells?.[0] || 'Empty row'
              return {
                title: firstCell.length > 50 ? firstCell.substring(0, 50) + '...' : firstCell,
                subtitle: `${cells?.length || 0} cells`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'showStripes',
      title: 'Show Striped Rows',
      type: 'boolean',
      description: 'Alternate row background colors for better readability',
      initialValue: true,
    }),
    defineField({
      name: 'responsive',
      title: 'Responsive',
      type: 'boolean',
      description: 'Make table scrollable on mobile devices',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      headers: 'headers',
      rows: 'rows',
    },
    prepare({label, headers, rows}) {
      const headerCount = headers?.length || 0
      const rowCount = rows?.length || 0
      return {
        title: label || '📊 Table',
        subtitle: `${headerCount} columns × ${rowCount} rows`,
      }
    },
  },
})
