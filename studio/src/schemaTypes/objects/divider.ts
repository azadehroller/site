import {defineType, defineField} from 'sanity'

/**
 * Divider - a simple visual separator between sections
 * Can show a line or just add spacing
 */

export default defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'showDivider',
      title: 'Show the line',
      type: 'boolean',
      description: 'Display a visible divider line',
      initialValue: true,
    }),
    defineField({
      name: 'dividerType',
      title: 'Divider type',
      type: 'string',
      description: 'Choose the spacing size',
      options: {
        list: [
          {title: 'Tall', value: 'tall'},
          {title: 'Short', value: 'short'},
        ],
        layout: 'radio',
      },
      initialValue: 'short',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      description: 'Set the background color context',
      options: {
        list: [
          {title: 'Light background', value: 'light'},
          {title: 'Dark background', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'darkBackgroundColor',
      title: 'Dark Background Color',
      type: 'string',
      description: 'Choose the dark background color',
      options: {
        list: [
          {title: 'Blue 10 (#011840)', value: 'var(--blue-10)'},
          {title: 'Blue 30 (#033180)', value: 'var(--blue-30)'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'var(--blue-10)',
      hidden: ({parent}) => parent?.background !== 'dark',
    }),
  ],
  preview: {
    select: {
      showDivider: 'showDivider',
      dividerType: 'dividerType',
      background: 'background',
      darkBackgroundColor: 'darkBackgroundColor',
    },
    prepare({showDivider, dividerType, background, darkBackgroundColor}) {
      const lineStatus = showDivider ? 'Line visible' : 'Spacing only'
      const bgLabel = background === 'dark' 
        ? (darkBackgroundColor?.includes('blue-30') ? 'Blue 30' : 'Blue 10')
        : 'Light'
      return {
        title: 'Divider',
        subtitle: `${lineStatus} | ${dividerType || 'short'} | ${bgLabel}`,
      }
    },
  },
})

