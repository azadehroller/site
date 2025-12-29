import {defineType, defineField} from 'sanity'

/**
 * Advanced Image - A powerful image component with full control
 * Features:
 * - Image with hotspot support
 * - Alt text for accessibility
 * - Loading type (lazy/eager)
 * - High fetch priority option
 * - Responsive behavior (fluid/fixed)
 * - Custom dimensions
 * - Optional button overlay with link
 * - Alignment options
 * - Border radius options
 * - Shadow options
 */

export default defineType({
  name: 'advancedImage',
  title: 'Advanced Image',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'performance', title: 'Performance'},
    {name: 'dimensions', title: 'Dimensions'},
    {name: 'button', title: 'Button Overlay'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    // Content group
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Select an image from the media library',
      group: 'content',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility (required for SEO)',
      group: 'content',
      validation: (Rule) => Rule.required().warning('Alt text is important for accessibility'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the image',
      group: 'content',
    }),

    // Performance group
    defineField({
      name: 'loading',
      title: 'Loading Type',
      type: 'string',
      description: 'Choose "eager" for above-the-fold images to improve LCP',
      group: 'performance',
      options: {
        list: [
          {title: 'Lazy (default)', value: 'lazy'},
          {title: 'Eager (for above-the-fold images)', value: 'eager'},
        ],
        layout: 'radio',
      },
      initialValue: 'lazy',
    }),
    defineField({
      name: 'fetchpriority',
      title: 'Enable High Fetch Priority',
      type: 'boolean',
      description: 'Adds fetchpriority="high" when loading is set to "eager"',
      group: 'performance',
      initialValue: true,
      hidden: ({parent}) => parent?.loading !== 'eager',
    }),

    // Dimensions group
    defineField({
      name: 'responsiveBehavior',
      title: 'Responsive Behavior',
      type: 'string',
      description: 'How the image should behave responsively',
      group: 'dimensions',
      options: {
        list: [
          {title: 'Fluid (max-width: 100%, height: auto)', value: 'fluid'},
          {title: 'Fixed dimensions', value: 'fixed'},
        ],
        layout: 'radio',
      },
      initialValue: 'fluid',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'number',
      description: 'Maximum width in pixels (for fluid images)',
      group: 'dimensions',
      hidden: ({parent}) => parent?.responsiveBehavior !== 'fluid',
    }),
    defineField({
      name: 'customWidth',
      title: 'Width',
      type: 'number',
      description: 'Fixed width in pixels',
      group: 'dimensions',
      hidden: ({parent}) => parent?.responsiveBehavior !== 'fixed',
    }),
    defineField({
      name: 'customHeight',
      title: 'Height',
      type: 'number',
      description: 'Fixed height in pixels',
      group: 'dimensions',
      hidden: ({parent}) => parent?.responsiveBehavior !== 'fixed',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'Maintain a specific aspect ratio',
      group: 'dimensions',
      options: {
        list: [
          {title: 'Original', value: 'original'},
          {title: '16:9 (Widescreen)', value: '16/9'},
          {title: '4:3 (Standard)', value: '4/3'},
          {title: '1:1 (Square)', value: '1/1'},
          {title: '3:2 (Photo)', value: '3/2'},
          {title: '21:9 (Ultrawide)', value: '21/9'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'original',
    }),

    // Button Overlay group
    defineField({
      name: 'showButton',
      title: 'Show Button Overlay',
      type: 'boolean',
      description: 'Display a button overlay on the image',
      group: 'button',
      initialValue: false,
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'URL for the button overlay',
      group: 'button',
      hidden: ({parent}) => !parent?.showButton,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the button',
      group: 'button',
      hidden: ({parent}) => !parent?.showButton,
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'buttonOpenInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open the link in a new browser tab',
      group: 'button',
      hidden: ({parent}) => !parent?.showButton,
      initialValue: true,
    }),

    // Style group
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      description: 'Horizontal alignment of the image',
      group: 'style',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'string',
      description: 'Roundness of the image corners',
      group: 'style',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small (8px)', value: 'sm'},
          {title: 'Medium (16px)', value: 'md'},
          {title: 'Large (24px)', value: 'lg'},
          {title: 'Extra Large (32px)', value: 'xl'},
          {title: 'Full (rounded)', value: 'full'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'shadow',
      title: 'Shadow',
      type: 'string',
      description: 'Shadow effect for the image',
      group: 'style',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Blue Glow (Light BG)', value: 'blue-light'},
          {title: 'Blue Glow (Dark BG)', value: 'blue-dark'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'objectFit',
      title: 'Object Fit',
      type: 'string',
      description: 'How the image should fit within its container',
      group: 'style',
      options: {
        list: [
          {title: 'Contain (fit inside)', value: 'contain'},
          {title: 'Cover (fill & crop)', value: 'cover'},
          {title: 'Fill (stretch)', value: 'fill'},
          {title: 'None (original size)', value: 'none'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'contain',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
      loading: 'loading',
      showButton: 'showButton',
    },
    prepare({alt, media, loading, showButton}) {
      const features = []
      if (loading === 'eager') features.push('Eager')
      if (showButton) features.push('Button')
      
      return {
        title: alt || 'Advanced Image',
        subtitle: features.length > 0 ? features.join(', ') : 'Lazy loading',
        media,
      }
    },
  },
})

