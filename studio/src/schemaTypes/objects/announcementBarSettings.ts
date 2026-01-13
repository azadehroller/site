import {defineField, defineType} from 'sanity'

/**
 * Announcement Bar Settings Object Type
 * Configurable fields for the announcement bar that appears above the header
 * Based on HubSpot announcement.module fields
 */
export default defineType({
  name: 'announcementBarSettings',
  title: 'Announcement Bar Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Announcement Bar',
      type: 'boolean',
      description: 'Show the announcement bar on this page',
      initialValue: false,
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Select the visual style for the announcement bar',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Pulse Report 2025', value: 'new_design'},
          {title: 'Industry Report', value: 'industry_report'},
          {title: 'Product Launch', value: 'product_launch'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'default',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'The main announcement text',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'The call-to-action button/link text',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      hidden: ({parent}) => !parent?.enabled,
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          description: 'The destination URL',
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
          description: 'Add nofollow attribute to the link',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'countdownDate',
      title: 'Countdown Date',
      type: 'datetime',
      description: 'Optional: Show a countdown timer to this date',
      hidden: ({parent}) => !parent?.enabled,
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
      text: 'text',
      theme: 'theme',
    },
    prepare({enabled, text, theme}) {
      return {
        title: enabled ? (text || 'Announcement Bar') : 'Announcement Bar (Disabled)',
        subtitle: enabled ? `Theme: ${theme || 'default'}` : '',
      }
    },
  },
})
