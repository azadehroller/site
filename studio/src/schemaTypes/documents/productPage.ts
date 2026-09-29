import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Product page — campaign / launch landing pages under /product/:slug.
 */

export default defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  icon: () => '📦',
  orderings: [orderRankOrdering],
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderRankField({type: 'productPage', newItemPosition: 'before'}) as any,
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [{type: 'columnsBlock'}, {type: 'standaloneTwoColumnBlock'}, {type: 'divider'}],
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'announcementBarSettings',
      group: 'settings',
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled product page',
        subtitle: slug ? `/product/${slug}` : 'Set a slug',
      }
    },
  },
})
