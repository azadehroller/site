import { defineField, defineType } from 'sanity'

/**
 * Blog Topic / Category schema
 * Stores topics imported from HubSpot for blog filtering and related articles
 */

export default defineType({
  name: 'blogTopic',
  title: 'Blog Topic',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    
    // HubSpot reference ID for matching
    defineField({
      name: 'hubspotId',
      title: 'HubSpot ID',
      type: 'string',
      readOnly: true,
      description: 'Original HubSpot topic ID (used for data matching)',
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Topic',
        subtitle: slug ? `/blog/topic/${slug}` : 'No slug',
      }
    },
  },
})

