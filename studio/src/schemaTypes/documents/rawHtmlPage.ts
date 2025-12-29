import { defineField, defineType } from 'sanity'

export const rawHtmlPage = defineType({
  name: 'rawHtmlPage',
  title: 'Raw HTML Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'headDocument',
      title: 'Head Document',
      type: 'text',
      description: 'Custom HTML for the <head> section (tracking scripts, structured data, meta tags, etc.)'
    }),

    defineField({
      name: 'rawHtml',
      title: 'Raw HTML',
      type: 'text',
      description: 'Paste HTML content here (e.g., entire body section)',
      validation: (rule) => rule.required()
    })
  ]
})

export default rawHtmlPage
