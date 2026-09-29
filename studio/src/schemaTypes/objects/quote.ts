import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quoterName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'quoterPosition',
      title: 'Position / Title',
      type: 'string',
    }),
    defineField({
      name: 'quoterLogo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      quoteText: 'quoteText',
      quoterName: 'quoterName',
    },
    prepare({quoteText, quoterName}) {
      const truncated = quoteText?.length > 60
        ? quoteText.substring(0, 60) + '…'
        : quoteText || 'Quote'
      return {
        title: truncated,
        subtitle: quoterName ? `— ${quoterName}` : '',
      }
    },
  },
})
