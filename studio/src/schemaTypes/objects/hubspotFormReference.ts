import {defineType, defineField} from 'sanity'

/**
 * HubSpot Form Reference
 * Based on custom-form.module from HubSpot
 * 
 * This object type allows referencing a global HubSpot Form document
 * within columns or other content areas
 */

export default defineType({
  name: 'hubspotFormReference',
  title: 'HubSpot Form',
  type: 'object',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'form',
      title: 'Select Form',
      type: 'reference',
      to: [{type: 'hubspotForm'}],
      description: 'Select a HubSpot form from the global forms library',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Toggle dark mode for the form (matches module.style.toggle_background)',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      formName: 'form.name',
      theme: 'theme',
    },
    prepare({formName, theme}) {
      return {
        title: 'HubSpot Form',
        subtitle: `${formName || 'No form selected'}${theme === 'dark' ? ' (Dark Mode)' : ''}`,
      }
    },
  },
})

