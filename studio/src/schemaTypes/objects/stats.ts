import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'e.g. "$2B" or "98%"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      number: 'number',
      label: 'label',
    },
    prepare({number, label}) {
      return {
        title: [number, label].filter(Boolean).join(' — ') || 'Stat',
      }
    },
  },
})
