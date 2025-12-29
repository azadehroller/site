import {defineType, defineField} from 'sanity'

/**
 * Footer Global Document
 * A singleton document that contains the site footer data
 * This is edited in one place and displays on all pages
 */

// Footer link item definition - exported as a schema type
export const footerLink = defineType({
  type: 'object',
  name: 'footerLink',
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
})

// Quick link with icon - exported as a schema type
export const quickLink = defineType({
  type: 'object',
  name: 'quickLink',
  title: 'Quick Link',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      description: 'Paste the SVG code for the icon',
      rows: 4,
    }),
    defineField({
      name: 'isExternal',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
})

// Footer column with title and links - exported as a schema type
export const footerColumn = defineType({
  type: 'object',
  name: 'footerColumn',
  title: 'Footer Column',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'footerLink'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare({title, links}: {title?: string; links?: unknown[]}) {
      return {
        title: title || 'Column',
        subtitle: `${links?.length || 0} links`,
      }
    },
  },
})

// Platform display names for preview
const platformNames: Record<string, string> = {
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook',
  twitter: 'Twitter/X',
  instagram: 'Instagram',
}

// Social link - exported as a schema type
export const socialLink = defineType({
  type: 'object',
  name: 'socialLink',
  title: 'Social Link',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter/X', value: 'twitter'},
          {title: 'Instagram', value: 'instagram'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon (SVG)',
      description: 'Optional: Paste custom SVG code. Leave empty to use default platform icon.',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({platform, url}: {platform?: string; url?: string}) {
      return {
        title: platform ? (platformNames[platform] || platform) : 'Social Link',
        subtitle: url || 'No URL set',
      }
    },
  },
})

// Main footer document type
export const footerGlobal = defineType({
  name: 'footerGlobal',
  title: 'Footer',
  type: 'document',
  groups: [
    {name: 'newsletter', title: 'Newsletter', default: true},
    {name: 'quickLinks', title: 'Quick Links'},
    {name: 'navigation', title: 'Navigation Columns'},
    {name: 'bottom', title: 'Bottom Bar'},
    {name: 'floatingButton', title: 'Floating Button'},
  ],
  fields: [
    // Newsletter section
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Sign up for our newsletter',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      rows: 2,
      group: 'newsletter',
      initialValue: 'Receive free education, industry tips, and the latest product updates to help you grow your venue.',
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Button Text',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Sign up',
    }),
    defineField({
      name: 'newsletterPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      group: 'newsletter',
      initialValue: 'your email address here',
    }),
    
    // Quick links section
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      description: 'Links shown below the newsletter (e.g., Pricing, Request a demo)',
      type: 'array',
      of: [{type: 'quickLink'}],
      group: 'quickLinks',
    }),
    
    // Navigation columns
    defineField({
      name: 'columns',
      title: 'Navigation Columns',
      type: 'array',
      of: [{type: 'footerColumn'}],
      group: 'navigation',
      validation: (Rule) => Rule.max(5),
    }),
    
    // Bottom bar
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'bottom',
      initialValue: 'ROLLER',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [{type: 'footerLink'}],
      group: 'bottom',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      group: 'bottom',
    }),
    defineField({
      name: 'socialText',
      title: 'Social Section Text',
      type: 'string',
      group: 'bottom',
      initialValue: 'Get to know us',
    }),
    
    // Floating button settings
    defineField({
      name: 'showFloatingButton',
      title: 'Show Floating Button',
      type: 'boolean',
      group: 'floatingButton',
      initialValue: true,
    }),
    defineField({
      name: 'floatingButtonUrl',
      title: 'Floating Button URL',
      type: 'string',
      group: 'floatingButton',
      initialValue: '/get-started',
    }),
    defineField({
      name: 'floatingButtonPrimaryText',
      title: 'Primary Text (Phone Number)',
      type: 'string',
      group: 'floatingButton',
      initialValue: '+61 468 014 312',
    }),
    defineField({
      name: 'floatingButtonSecondaryText',
      title: 'Secondary Text',
      type: 'string',
      group: 'floatingButton',
      initialValue: 'Speak with Sales',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Global footer settings',
      }
    },
  },
})

export default footerGlobal
