import {defineType, defineField} from 'sanity'

/**
 * HubSpot Form Global Document
 * Stores HubSpot form configurations that can be referenced anywhere in the site
 * Each form stores the HubSpot embed configuration (portalId, formId, region)
 */

export const hubspotForm = defineType({
  name: 'hubspotForm',
  title: 'HubSpot Form',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'name',
      title: 'Form Name',
      type: 'string',
      description: 'Internal name for this form (e.g., "Newsletter Form", "Get Started Form")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portalId',
      title: 'Portal ID',
      type: 'string',
      description: 'Your HubSpot Portal ID (e.g., "3375779")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description: 'The HubSpot Form ID (e.g., "ff528f56-d1a6-44a9-b8a6-eb85cf1b6b1d")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'HubSpot region (typically "na1" for North America)',
      options: {
        list: [
          {title: 'North America (na1)', value: 'na1'},
          {title: 'Europe (eu1)', value: 'eu1'},
        ],
      },
      initialValue: 'na1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description of where this form is used or its purpose',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      portalId: 'portalId',
      formId: 'formId',
    },
    prepare({name, portalId, formId}) {
      return {
        title: name || 'HubSpot Form',
        subtitle: `Portal: ${portalId || 'N/A'} | Form: ${formId ? formId.substring(0, 8) + '...' : 'N/A'}`,
      }
    },
  },
})

export default hubspotForm

