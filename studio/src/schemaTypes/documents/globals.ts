import {defineType, defineField} from 'sanity'

/**
 * Widget Stats Global Document
 * A singleton document that contains the widget stats data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Stat item definition
const statItem = {
  type: 'object',
  name: 'statItem',
  title: 'Stat',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      description: 'Paste the SVG code for the icon',
      rows: 6,
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The stat value (e.g., "300", "3,000", "24/7", "$4B")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The stat label (e.g., "team members", "customers")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
    },
    prepare({value, label}: {value?: string; label?: string}) {
      return {
        title: `${value || ''} ${label || ''}`,
      }
    },
  },
}

export const widgetStats = defineType({
  name: 'widgetStats',
  title: 'Widget Stats',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Text content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title',
      group: 'content',
      initialValue: 'All-in-one venue management software',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title text',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Supporting your business every step of the way',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'Description text below the title',
      rows: 3,
      group: 'content',
      initialValue:
        'Whether you manage one venue or 100, you need a solution built to help you succeed. At ROLLER, we help operators do just that.',
    }),
    // Stats array
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [statItem],
      description: 'Add statistics to display',
      group: 'content',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    // Style group
    defineField({
      name: 'horizontalLayout',
      title: 'Horizontal Layout',
      type: 'boolean',
      description: 'Display in horizontal layout (2 columns) on large screens',
      group: 'style',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: 'Widget Stats',
        subtitle: title || 'Global widget stats component',
      }
    },
  },
})

/**
 * Widget User Reviews Global Document
 * A singleton document that contains the widget user reviews data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Badge item definition for user reviews
const badgeItem = {
  type: 'object',
  name: 'badgeItem',
  title: 'Badge',
  fields: [
    defineField({
      name: 'image',
      title: 'Badge Image',
      type: 'image',
      description: 'Upload the badge image (e.g., G2, Capterra badge)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Badge Link',
      type: 'url',
      description: 'URL to open when the badge is clicked',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({alt, media}: {alt?: string; media?: string}) {
      return {
        title: alt || 'Badge',
        media,
      }
    },
  },
}

export const widgetUserReviews = defineType({
  name: 'widgetUserReviews',
  title: 'Widget User Reviews',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title',
      group: 'content',
      initialValue: 'CUSTOMIZED TO YOUR VENUE',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title text',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'Implementation Services',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'Description text below the title',
      rows: 4,
      group: 'content',
      initialValue:
        'Let our team of experts help you get up and running in your new ROLLER account as smoothly as possible. Accelerate your success with best practice advice & guided training sessions to get the most value from ROLLER.',
    }),
    // Badges array
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [badgeItem],
      description: 'Add badge images (e.g., G2, Capterra)',
      group: 'content',
      validation: (Rule) => Rule.max(6),
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'On Dark', value: 'light'},
          {title: 'On Light', value: 'dark'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'radio',
      },
      group: 'style',
      initialValue: 'dark',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'LEFT'},
          {title: 'Center', value: 'CENTER'},
          {title: 'Right', value: 'RIGHT'},
        ],
        layout: 'radio',
      },
      group: 'style',
      initialValue: 'CENTER',
    }),
    defineField({
      name: 'eyebrowType',
      title: 'Eyebrow Type',
      type: 'string',
      description: 'HTML tag for the eyebrow',
      options: {
        list: [
          {title: 'div', value: 'div'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      group: 'style',
      initialValue: 'div',
    }),
    defineField({
      name: 'headingType',
      title: 'Heading Type',
      type: 'string',
      description: 'HTML tag for the heading',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      group: 'style',
      initialValue: 'h3',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      description: 'Visual size of the heading (can differ from semantic tag)',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
          {title: 'S8', value: 's8'},
        ],
      },
      group: 'style',
    }),
    defineField({
      name: 'textType',
      title: 'Text Size',
      type: 'string',
      description: 'Size of the body text',
      options: {
        list: [
          {title: 'S3 (2xl)', value: '2xl'},
          {title: 'S2 (lg)', value: 'lg'},
          {title: 'S1 (base)', value: 'base'},
          {title: 'S0 (sm)', value: 'sm'},
          {title: 'S00 (xs)', value: 'xs'},
        ],
      },
      group: 'style',
      initialValue: 'lg',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: 'Widget User Reviews',
        subtitle: title || 'Global user reviews component',
      }
    },
  },
})

/**
 * Testimonial Carousel Global Document
 * A singleton document that contains testimonial carousel data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Testimonial item definition
const testimonialItem = {
  type: 'object',
  name: 'testimonialItem',
  title: 'Testimonial',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The testimonial quote text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Job title and company (e.g., "Head of Marketing, Company Name")',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Logo of the company',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      description: 'Optional link to customer story or case study',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          description: 'The URL to link to',
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
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      author: 'author',
      position: 'position',
      media: 'logo',
    },
    prepare({author, position, media}: {author?: string; position?: string; media?: any}) {
      return {
        title: author || 'Testimonial',
        subtitle: position,
        media,
      }
    },
  },
}

export const testimonialCarousel = defineType({
  name: 'testimonialCarousel',
  title: 'Testimonial Carousel',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    // Content group
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the carousel (optional)',
      group: 'content',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [testimonialItem],
      description: 'Add testimonials to display in the carousel',
      group: 'content',
      validation: (Rule) => Rule.min(2).max(12),
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      testimonials: 'testimonials',
    },
    prepare({eyebrow, testimonials}: {eyebrow?: string; testimonials?: any[]}) {
      const count = testimonials?.length || 0
      return {
        title: 'Testimonial Carousel',
        subtitle: eyebrow || `${count} testimonial${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

/**
 * Logo Set Global Document
 * A singleton document that contains the logo set data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Logo item definition for global logo set
const globalLogoItem = {
  type: 'object',
  name: 'globalLogoItem',
  title: 'Logo',
  fields: [
    defineField({
      name: 'image',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the logo image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({alt, media}: {alt?: string; media?: any}) {
      return {
        title: alt || 'Logo',
        media: media,
      }
    },
  },
}

export const logoSetGlobal = defineType({
  name: 'logoSetGlobal',
  title: 'Logo Set (Global)',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'style', title: 'Style'},
    {name: 'amer', title: 'AMER Logos'},
    {name: 'apac', title: 'APAC Logos'},
    {name: 'emea', title: 'EMEA Logos'},
    {name: 'uk', title: 'UK Logos'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'customTitle',
      title: 'Custom Title',
      type: 'string',
      description: 'Leave empty to use default: "Trusted by over 3,000 venues worldwide"',
      group: 'content',
    }),
    // Style group
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'OnLight', value: 'dark'},
          {title: 'OnDark', value: 'light'},
          {title: 'GxScore', value: 'gxscore'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'dark',
      group: 'style',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      group: 'style',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show Divider',
      type: 'boolean',
      description: 'Show a divider line above the title',
      initialValue: false,
      group: 'style',
    }),
    // AMER Logos
    defineField({
      name: 'amerLogos',
      title: 'AMER Logos',
      type: 'array',
      of: [globalLogoItem],
      description: 'Logos shown for Americas region',
      group: 'amer',
      validation: (Rule) => Rule.min(1),
    }),
    // APAC Logos
    defineField({
      name: 'apacLogos',
      title: 'APAC Logos',
      type: 'array',
      of: [globalLogoItem],
      description: 'Logos shown for Asia-Pacific region',
      group: 'apac',
      validation: (Rule) => Rule.min(1),
    }),
    // EMEA Logos
    defineField({
      name: 'emeaLogos',
      title: 'EMEA Logos',
      type: 'array',
      of: [globalLogoItem],
      description: 'Logos shown for Europe, Middle East, and Africa region',
      group: 'emea',
      validation: (Rule) => Rule.min(1),
    }),
    // UK Logos
    defineField({
      name: 'ukLogos',
      title: 'UK Logos',
      type: 'array',
      of: [globalLogoItem],
      description: 'Logos shown for United Kingdom',
      group: 'uk',
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      customTitle: 'customTitle',
      theme: 'theme',
    },
    prepare({customTitle, theme}: {customTitle?: string; theme?: string}) {
      const themeLabel = theme === 'light' ? '🌙 Dark Background' : theme === 'gxscore' ? '⭐ GxScore' : '☀️ Light Background'
      const title = customTitle || 'Trusted by over 3,000 venues worldwide'
      return {
        title: `Logo Set (${themeLabel})`,
        subtitle: title.substring(0, 50) + (title.length > 50 ? '...' : ''),
      }
    },
  },
})

/**
 * Features Selector Global Document
 * A singleton document that contains the features selector data
 * This is edited in one place and can be referenced anywhere in the site
 */

// Feature item definition
const featureItem = {
  type: 'object',
  name: 'featureItem',
  title: 'Feature',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 6,
      description: 'Paste SVG code for the feature icon',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Feature Item',
      }
    },
  },
}

export const featuresSelectorGlobal = defineType({
  name: 'featuresSelectorGlobal',
  title: 'Features Selector (Global)',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'features', title: 'Features'},
    {name: 'cta', title: 'CTA'},
  ],
  fields: [
    // Header section - uses HeadingComposition component
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'headingComposition',
      group: 'header',
      description: 'Header section with eyebrow, title, text, and styling options',
    }),

    // Features array
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [featureItem],
      group: 'features',
      description: 'Add features to display in the selector',
      validation: (Rule) => Rule.min(1),
    }),

    // CTA section
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'cta',
      description: 'Label for the call-to-action link',
      initialValue: 'See all features',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          initialValue: '/features',
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
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      features: 'features',
    },
    prepare({title, features}: {title?: string; features?: any[]}) {
      const count = features?.length || 0
      return {
        title: 'Features Selector (Global)',
        subtitle: `${title || 'No title'} • ${count} feature${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

/**
 * Header Global Document
 * A singleton document that contains the header/navigation data
 * This is edited in one place and used site-wide
 */

// Mega menu item (sub-item within a dropdown)
const megaMenuItem = {
  type: 'object',
  name: 'megaMenuItem',
  title: 'Menu Item',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'text',
      rows: 4,
      description: 'Optional SVG icon code',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'topFeatures',
      title: 'Top Features',
      type: 'array',
      description: 'Optional feature tags (for Features menu type)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}: {title?: string; description?: string}) {
      return {
        title: title || 'Menu Item',
        subtitle: description?.substring(0, 50) || '',
      }
    },
  },
}

// Featured item in mega menu
const megaFeaturedItem = {
  type: 'object',
  name: 'megaFeaturedItem',
  title: 'Featured Item',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small label text (e.g., "Product Update")',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}: {title?: string; media?: any}) {
      return {
        title: title || 'Featured Item',
        media,
      }
    },
  },
}

// Mega menu dropdown configuration
const megaMenuDropdown = {
  type: 'object',
  name: 'megaMenuDropdown',
  title: 'Mega Menu',
  fields: [
    defineField({
      name: 'parentLabel',
      title: 'Parent Label',
      type: 'string',
      description: 'The label of the menu item that will have this mega menu (e.g., "Features", "Industries")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          {title: 'Why ROLLER?', value: 'why_roller'},
          {title: 'Features', value: 'features'},
          {title: 'Industries', value: 'industries'},
          {title: 'Solutions', value: 'solutions'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'features',
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
      description: 'Large title shown on the left side of the dropdown',
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro Description',
      type: 'text',
      rows: 2,
      description: 'Description shown below the intro title',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [megaMenuItem],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'featuredLabel',
      title: 'Featured Section Label',
      type: 'string',
      description: 'Label for the featured section (e.g., "What\'s New", "Customer Stories")',
    }),
    defineField({
      name: 'featuredItems',
      title: 'Featured Items',
      type: 'array',
      of: [megaFeaturedItem],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Label for the "See all" link (e.g., "See all features")',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'URL for the "See all" link',
    }),
  ],
  preview: {
    select: {
      parentLabel: 'parentLabel',
      menuType: 'menuType',
    },
    prepare({parentLabel, menuType}: {parentLabel?: string; menuType?: string}) {
      return {
        title: parentLabel || 'Mega Menu',
        subtitle: menuType || 'No type',
      }
    },
  },
}

// Header button
const headerButton = {
  type: 'object',
  name: 'headerButton',
  title: 'Header Button',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Text', value: 'text'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      variant: 'variant',
    },
    prepare({label, variant}: {label?: string; variant?: string}) {
      return {
        title: label || 'Button',
        subtitle: variant || 'primary',
      }
    },
  },
}

// Main nav item (top-level)
const mainNavItem = {
  type: 'object',
  name: 'mainNavItem',
  title: 'Navigation Item',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Leave empty if this item has a dropdown',
    }),
    defineField({
      name: 'hasMegaMenu',
      title: 'Has Mega Menu',
      type: 'boolean',
      description: 'Enable if this item should open a mega dropdown',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      hasMegaMenu: 'hasMegaMenu',
    },
    prepare({label, hasMegaMenu}: {label?: string; hasMegaMenu?: boolean}) {
      return {
        title: label || 'Nav Item',
        subtitle: hasMegaMenu ? '📂 Has Mega Menu' : '',
      }
    },
  },
}

export const headerGlobal = defineType({
  name: 'headerGlobal',
  title: 'Header',
  type: 'document',
  icon: () => '🧭',
  groups: [
    {name: 'logo', title: 'Logo', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'megaMenus', title: 'Mega Menus'},
    {name: 'buttons', title: 'Buttons'},
  ],
  fields: [
    // Logo section
    defineField({
      name: 'logo',
      title: 'Logo (Light Background)',
      type: 'image',
      group: 'logo',
      description: 'Logo shown on light/white backgrounds',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Background)',
      type: 'image',
      group: 'logo',
      description: 'Logo shown on dark backgrounds',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'logo',
      initialValue: 'Roller Logo',
    }),
    defineField({
      name: 'logoLink',
      title: 'Logo Link',
      type: 'string',
      group: 'logo',
      initialValue: '/',
      description: 'URL the logo links to (usually homepage)',
    }),

    // Navigation items
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [mainNavItem],
      group: 'navigation',
      description: 'Main navigation menu items',
      validation: (Rule) => Rule.max(8),
    }),

    // Mega Menu configurations
    defineField({
      name: 'megaMenus',
      title: 'Mega Menu Configurations',
      type: 'array',
      of: [megaMenuDropdown],
      group: 'megaMenus',
      description: 'Configure mega menu dropdowns for navigation items',
    }),

    // Header buttons (CTA)
    defineField({
      name: 'buttons',
      title: 'Header Buttons',
      type: 'array',
      of: [headerButton],
      group: 'buttons',
      description: 'CTA buttons in the header',
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        subtitle: 'Site-wide header configuration',
      }
    },
  },
})

export default widgetStats

