import { defineField, defineType } from 'sanity'

/**
 * Blog Author schema
 * Stores author information imported from HubSpot
 */

export default defineType({
  name: 'blogAuthor',
  title: 'Blog Author',
  type: 'document',
  icon: () => '✍️',
  fields: [
    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Image URL',
          type: 'url',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    
    // Social links
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    
    defineField({
      name: 'twitter',
      title: 'Twitter/X',
      type: 'string',
      description: 'Twitter/X username (without @)',
    }),
    
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
    
    // HubSpot reference ID for matching
    defineField({
      name: 'hubspotId',
      title: 'HubSpot ID',
      type: 'string',
      readOnly: true,
      description: 'Original HubSpot author ID (used for data matching)',
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Author',
        subtitle: subtitle || '',
      }
    },
  },
})

